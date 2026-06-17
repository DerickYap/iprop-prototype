"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { AnimatePresence, motion } from "motion/react";
import { projects, getProject, formatPrice } from "@/data/projects";
import { themes } from "@/lib/themes";
import { buildTowerFeatures, buildPlotDiscs } from "@/lib/towers";
import type { Project } from "@/data/types";
import { MapOverlay } from "./MapOverlay";
import { ProjectPreviewCard } from "./ProjectPreviewCard";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const TWILIGHT_BG = "#161430";
const BEACON_COLOR = "#f3c178";

// Zoom at/above which every project's name tag is shown (below it, only
// the headline projects are tagged to avoid an overlapping pile).
const TAG_ZOOM = 12;

// Headline developments — tagged even at the wide overview.
const PRIORITY_SLUGS = new Set(
  [...projects]
    .sort((a, b) => b.units - a.units)
    .slice(0, 3)
    .map((p) => p.slug)
);

const OVERVIEW = {
  center: [103.84, 1.25] as [number, number],
  zoom: 10.3,
  pitch: 73,
  bearing: -10,
};

/**
 * Recolor the CARTO dark-matter basemap into a blue-hour scene:
 * gradient twilight sky, warm low sun catching the building tops,
 * teal water, receding indigo land. Called from `style.load`.
 */
function applyTwilight(map: maplibregl.Map) {
  // Gradient sky — purple overhead, warm amber at the horizon. Only
  // visible when the camera is pitched, which it always is here.
  try {
    map.setSky({
      "sky-color": "#3a2f63",
      "horizon-color": "#f4a65c",
      "fog-color": "#e88f7a",
      "sky-horizon-blend": 0.6,
      "horizon-fog-blend": 0.5,
      "fog-ground-blend": 0.4,
      "atmosphere-blend": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        0.9,
        15,
        0.4,
      ],
    });
  } catch {
    // older renderers without sky support — skip silently
  }

  // Warm directional light low on the horizon so extrusions catch a
  // golden side and fall into cool shadow.
  map.setLight({
    anchor: "map",
    color: "#ffd9a0",
    intensity: 0.5,
    position: [1.5, 210, 70],
  });

  const setPaint = (id: string, prop: string, value: unknown) => {
    if (map.getLayer(id)) {
      try {
        map.setPaintProperty(id, prop, value as never);
      } catch {
        /* layer exists but prop unsupported — ignore */
      }
    }
  };

  setPaint("background", "background-color", TWILIGHT_BG);
  setPaint("water", "fill-color", "#0f3a44");
  setPaint("water_shadow", "fill-color", "#0a2a33");

  for (const id of [
    "landcover",
    "landuse",
    "landuse_residential",
    "park_national_park",
    "park_nature_reserve",
  ]) {
    setPaint(id, "fill-color", "#1b1d3a");
    setPaint(id, "fill-opacity", 0.5);
  }

  // Dim the road network into faint warm filaments.
  for (const layer of map.getStyle().layers ?? []) {
    if (layer.type === "line" && /_fill$/.test(layer.id)) {
      setPaint(layer.id, "line-color", "#3a3450");
      setPaint(layer.id, "line-opacity", 0.5);
    }
    if (layer.type === "symbol") {
      setPaint(layer.id, "text-color", "#d9d2e6");
      setPaint(layer.id, "text-halo-color", "#0d0b1f");
      setPaint(layer.id, "text-halo-width", 1.2);
    }
  }
}

export function SingaporeMap() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerEls = useRef<Map<string, HTMLDivElement>>(new Map());
  const [selected, setSelected] = useState<Project | null>(null);
  const [entering, setEntering] = useState<Project | null>(null);
  const [ready, setReady] = useState(false);
  // The global dock sits at the bottom of the top-level window, but is hidden
  // when the map is embedded in the Home teaser iframe. Lift the map's bottom UI
  // to clear the dock only when it's actually present (i.e. not embedded).
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    setEmbedded(window.self !== window.top);
  }, []);
  // When the dock is present, the map's bottom UI must clear it.
  const raised = !embedded;
  // Mirrors for the idle-drift loop (which runs in a once-only effect).
  const selectedRef = useRef<Project | null>(null);
  const enteringRef = useRef<Project | null>(null);
  selectedRef.current = selected;
  enteringRef.current = entering;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: OVERVIEW.center,
      zoom: 9.6,
      pitch: 30,
      bearing: OVERVIEW.bearing,
      minZoom: 9.5,
      maxZoom: 17.5,
      maxPitch: 74,
      maxBounds: [
        [103.4, 0.95],
        [104.3, 1.62],
      ],
      attributionControl: { compact: true },
      canvasContextAttributes: { antialias: true },
    });
    mapRef.current = map;

    map.on("style.load", () => {
      applyTwilight(map);

      const style = map.getStyle();
      const hasExtrusion = style.layers?.some(
        (l) => l.type === "fill-extrusion"
      );
      if (!hasExtrusion) {
        const vectorSource = Object.entries(style.sources ?? {}).find(
          ([, s]) => (s as { type?: string }).type === "vector"
        )?.[0];
        const firstSymbol = style.layers?.find((l) => l.type === "symbol")?.id;
        if (vectorSource) {
          map.addLayer(
            {
              id: "buildings-3d",
              type: "fill-extrusion",
              source: vectorSource,
              "source-layer": "building",
              minzoom: 13,
              paint: {
                // Cool shadow at street level → warm light caught up top.
                "fill-extrusion-color": [
                  "interpolate",
                  ["linear"],
                  ["coalesce", ["get", "render_height"], 0],
                  0,
                  "#1d2742",
                  60,
                  "#3a3a5e",
                  140,
                  "#8d7a86",
                  260,
                  "#caa37a",
                ],
                "fill-extrusion-height": [
                  "coalesce",
                  ["get", "render_height"],
                  ["get", "height"],
                  8,
                ],
                "fill-extrusion-base": [
                  "coalesce",
                  ["get", "render_min_height"],
                  0,
                ],
                "fill-extrusion-vertical-gradient": true,
                "fill-extrusion-opacity": 0.92,
              },
            },
            firstSymbol
          );
        }
      }

      // Project "scale-model" massing — a small cluster of theme-tinted
      // towers per development, exaggerated tall when zoomed out so the
      // model is legible, settling to scale as you zoom in.
      const firstSymbol = style.layers?.find((l) => l.type === "symbol")?.id;
      if (!map.getSource("project-towers")) {
        // Glowing ground disc demarcating each development's plot.
        map.addSource("project-plots", {
          type: "geojson",
          data: buildPlotDiscs(projects),
        });
        map.addLayer(
          {
            id: "project-plots",
            type: "fill",
            source: "project-plots",
            minzoom: 11,
            paint: {
              "fill-color": ["get", "color"],
              "fill-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                0,
                13,
                0.16,
              ],
            },
          },
          firstSymbol
        );

        map.addSource("project-towers", {
          type: "geojson",
          data: buildTowerFeatures(projects),
        });
        map.addLayer(
          {
            id: "project-towers-3d",
            type: "fill-extrusion",
            source: "project-towers",
            minzoom: 9,
            paint: {
              "fill-extrusion-color": ["get", "color"],
              // zoom must be the direct input to interpolate; each stop
              // scales the per-feature height (tall when zoomed out).
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                ["*", ["get", "height"], 4],
                14,
                ["get", "height"],
              ],
              "fill-extrusion-base": 0,
              "fill-extrusion-vertical-gradient": true,
              "fill-extrusion-opacity": 0.95,
            },
          },
          firstSymbol
        );
      }
    });

    map.on("load", () => {
      setReady(true);

      // Returning from a showcase: start zoomed at that project, ease out.
      const lastSlug = sessionStorage.getItem("iprop:last");
      sessionStorage.removeItem("iprop:last");
      const last = lastSlug ? getProject(lastSlug) : undefined;
      if (last) {
        map.jumpTo({
          center: [last.lng, last.lat],
          zoom: 16,
          pitch: 62,
          bearing: 24,
        });
        window.setTimeout(() => {
          map.flyTo({ ...OVERVIEW, duration: 3200, essential: true });
        }, 700);
      } else {
        map.flyTo({ ...OVERVIEW, duration: 3200, essential: true });
      }
    });

    map.on("click", () => setSelected(null));

    const selectProject = (p: Project) => {
      setSelected(p);
      map.easeTo({
        center: [p.lng, p.lat],
        zoom: Math.max(map.getZoom(), 14),
        pitch: 58,
        duration: 1100,
      });
    };

    // Project beacons: label + beam rising from the massing model.
    for (const p of projects) {
      const el = document.createElement("div");
      el.className = "beacon";
      if (PRIORITY_SLUGS.has(p.slug)) el.classList.add("priority");
      el.style.setProperty("--beacon-color", BEACON_COLOR);

      const beam = document.createElement("div");
      beam.className = "beacon-beam";
      const base = document.createElement("div");
      base.className = "beacon-base";

      // Compact name tag sitting atop the beam (the "label on the building").
      const tag = document.createElement("div");
      tag.className = "beacon-tag";
      tag.textContent = p.name;

      // Full card on hover / selection.
      const chip = document.createElement("div");
      chip.className = "beacon-chip";
      const name = document.createElement("span");
      name.className = "beacon-chip-name";
      name.textContent = p.name;
      const price = document.createElement("span");
      price.className = "beacon-chip-price";
      price.textContent = `fr ${formatPrice(p.priceFrom)}`;
      chip.append(name, price);

      el.append(beam, tag, chip, base);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        selectProject(p);
      });

      markerEls.current.set(p.slug, el);
      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([p.lng, p.lat])
        .addTo(map);
    }

    // Clicking the 3D massing selects the project too.
    map.on("click", "project-towers-3d", (e) => {
      const slug = e.features?.[0]?.properties?.slug as string | undefined;
      const p = slug ? getProject(slug) : undefined;
      if (p) {
        (e.originalEvent as MouseEvent).stopPropagation();
        selectProject(p);
      }
    });
    // Hover the massing → pointer + highlight the matching beacon/label.
    let hovered: string | null = null;
    const setHover = (slug: string | null) => {
      if (hovered === slug) return;
      if (hovered) markerEls.current.get(hovered)?.classList.remove("hover");
      if (slug) markerEls.current.get(slug)?.classList.add("hover");
      hovered = slug;
      map.getCanvas().style.cursor = slug ? "pointer" : "";
    };
    map.on("mousemove", "project-towers-3d", (e) => {
      setHover((e.features?.[0]?.properties?.slug as string) ?? null);
    });
    map.on("mouseleave", "project-towers-3d", () => setHover(null));

    // Reveal all name tags once zoomed in past the clustered overview.
    const syncTagZoom = () => {
      const on = map.getZoom() >= TAG_ZOOM;
      for (const el of markerEls.current.values())
        el.classList.toggle("show-tags", on);
    };
    map.on("zoom", syncTagZoom);
    syncTagZoom();

    // Gentle idle auto-rotation: drifts the bearing when the user is
    // idle, pauses the moment they interact or a project is engaged.
    let raf = 0;
    let last = performance.now();
    let idleSince = performance.now();
    let interacting = false;

    const bump = () => {
      idleSince = performance.now();
    };
    const startInteract = () => {
      interacting = true;
      bump();
    };
    const endInteract = () => {
      interacting = false;
      bump();
    };
    map.on("mousedown", startInteract);
    map.on("touchstart", startInteract);
    map.on("wheel", bump);
    map.on("dragstart", startInteract);
    map.on("dragend", endInteract);
    map.on("mouseup", endInteract);

    const drift = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const idleFor = now - idleSince;
      if (
        !interacting &&
        idleFor > 3500 &&
        !selectedRef.current &&
        !enteringRef.current &&
        !map.isMoving()
      ) {
        map.setBearing(map.getBearing() + dt * 1.2);
      }
      raf = requestAnimationFrame(drift);
    };
    raf = requestAnimationFrame(drift);

    return () => {
      cancelAnimationFrame(raf);
      map.remove();
      mapRef.current = null;
      markerEls.current.clear();
    };
  }, []);

  // Reflect selection on marker styling
  useEffect(() => {
    for (const [slug, el] of markerEls.current) {
      el.classList.toggle("selected", selected?.slug === slug);
    }
  }, [selected]);

  const pickProject = (p: Project) => {
    setSelected(p);
    mapRef.current?.easeTo({
      center: [p.lng, p.lat],
      zoom: 13.8,
      pitch: 58,
      duration: 1400,
    });
  };

  const enterShowcase = (p: Project) => {
    const map = mapRef.current;
    if (!map || entering) return;
    setSelected(null);
    sessionStorage.setItem("iprop:last", p.slug);

    // Cinematic descent into the site, then fade through the project's
    // theme color into its showcase page.
    map.flyTo({
      center: [p.lng, p.lat],
      zoom: 16.4,
      pitch: 62,
      bearing: map.getBearing() + 42,
      duration: 2600,
      essential: true,
    });
    window.setTimeout(() => setEntering(p), 1900);
    const target = `/projects/${p.slug}`;
    window.setTimeout(() => {
      // When the map runs inside the Home teaser iframe, navigate the top-level
      // window so the showcase takes the full page instead of loading inside the
      // teaser. A direct /map visit (not embedded) uses normal SPA navigation.
      if (window.self !== window.top && window.top) {
        window.top.location.href = target;
      } else {
        router.push(target);
      }
    }, 2700);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#161430]">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {/* Cinematic framing: corner vignette + top scrim for legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, transparent 55%, rgba(8,6,24,0.55) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,9,28,0.45), transparent)",
        }}
      />

      <MapOverlay
        projects={projects}
        onPick={pickProject}
        hidden={!!entering}
        raised={raised}
      />

      <AnimatePresence>
        {selected && !entering && (
          <ProjectPreviewCard
            key={selected.slug}
            project={selected}
            onClose={() => setSelected(null)}
            onEnter={() => enterShowcase(selected)}
            raised={raised}
          />
        )}
      </AnimatePresence>

      {/* Initial fade-in from black */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-30 bg-[#161430]"
      />

      {/* Veil into the showcase's theme color */}
      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="pointer-events-auto absolute inset-0 z-40"
            style={{ background: themes[entering.themeId].colors.bg }}
          >
            <div className="flex h-full items-center justify-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: themes[entering.themeId].colors.muted }}
              >
                Entering {entering.name}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
