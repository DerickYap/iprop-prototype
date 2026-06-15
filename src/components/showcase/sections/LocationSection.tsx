"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { motion } from "motion/react";
import type {
  LocationSection as LocationData,
  PoiKind,
  Project,
} from "@/data/types";

const KIND_LABELS: Record<PoiKind, string> = {
  mrt: "MRT",
  school: "School",
  mall: "Retail",
  park: "Park",
  other: "Nearby",
};

function MiniMap({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [project.lng, project.lat],
      zoom: 13.6,
      pitch: 45,
      bearing: -10,
      interactive: false,
      attributionControl: { compact: true },
    });

    const el = document.createElement("div");
    el.className = "project-marker";
    const dot = document.createElement("div");
    dot.className = "marker-dot";
    el.appendChild(dot);
    new maplibregl.Marker({ element: el })
      .setLngLat([project.lng, project.lat])
      .addTo(map);

    return () => map.remove();
  }, [project]);

  return <div ref={ref} className="h-full w-full" />;
}

export function LocationSection({
  data,
  project,
}: {
  data: LocationData;
  project: Project;
}) {
  return (
    <section
      className="py-24 md:py-36"
      style={{ background: "var(--sc-surface)" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="sc-display text-3xl tracking-tight md:text-5xl"
            style={{ color: "var(--sc-text)" }}
          >
            {data.heading ?? "The neighbourhood"}
          </h2>
          {data.intro && (
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--sc-muted)" }}
            >
              {data.intro}
            </p>
          )}

          <ul className="mt-10 space-y-0">
            {data.pois.map((poi, i) => (
              <motion.li
                key={poi.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center justify-between gap-4 border-t py-4"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--sc-muted) 30%, transparent)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                    style={{
                      background:
                        "color-mix(in srgb, var(--sc-accent) 14%, transparent)",
                      color: "var(--sc-accent)",
                    }}
                  >
                    {KIND_LABELS[poi.kind]}
                  </span>
                  <span
                    className="text-sm font-medium md:text-base"
                    style={{ color: "var(--sc-text)" }}
                  >
                    {poi.name}
                  </span>
                </div>
                <span
                  className="shrink-0 text-sm"
                  style={{ color: "var(--sc-muted)" }}
                >
                  {poi.distance}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8 }}
          className="h-80 overflow-hidden rounded-3xl md:h-[460px]"
        >
          <MiniMap project={project} />
        </motion.div>
      </div>
    </section>
  );
}
