import type { Feature, FeatureCollection, Polygon } from "geojson";
import type { Project, ThemeId } from "@/data/types";

/** Vivid per-theme tints so project massing pops against the dim warm
 *  base buildings — and gives each development its own identity. */
export const THEME_TOWER_COLORS: Record<ThemeId, string> = {
  noir: "#ffd98f",
  botanic: "#5fe08f",
  azure: "#5fb2ff",
  graphite: "#cfe0f2",
};

/** Deterministic 0..1 PRNG seeded from a string, so the generated massing
 *  is stable across renders and matches between server and client. */
function seeded(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

const M_PER_DEG_LAT = 111_320;

/** A rectangle footprint centered at [lng,lat], sized in metres, rotated. */
function rect(
  lng: number,
  lat: number,
  offX: number,
  offY: number,
  w: number,
  d: number,
  rot: number
): [number, number][] {
  const mPerDegLng = M_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180);
  const cx = lng + offX / mPerDegLng;
  const cy = lat + offY / M_PER_DEG_LAT;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const hw = w / 2;
  const hd = d / 2;
  const corners: [number, number][] = [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ].map(([x, y]) => {
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    return [cx + rx / mPerDegLng, cy + ry / M_PER_DEG_LAT];
  });
  corners.push(corners[0]);
  return corners;
}

/**
 * A small cluster of extruded "scale-model" towers per project. Bigger,
 * taller clusters for developments with more units, with seeded variety
 * so no two read the same.
 */
export function buildTowerFeatures(projects: Project[]): FeatureCollection {
  const features: Feature<Polygon>[] = [];

  for (const p of projects) {
    const rng = seeded(p.slug);
    const color = THEME_TOWER_COLORS[p.themeId];

    // Scale ambition by unit count (≈180–1200 across the dataset).
    const scale = Math.min(1.4, Math.max(0.7, p.units / 600));
    const towerCount = 3 + Math.round(rng() * 2 * scale); // 3–5
    const baseHeight = 90 + 130 * scale; // metres (pre zoom-exaggeration)

    for (let i = 0; i < towerCount; i++) {
      // Spread towers around the plot center.
      const angle = rng() * Math.PI * 2;
      const dist = rng() * 90 * scale;
      const offX = Math.cos(angle) * dist;
      const offY = Math.sin(angle) * dist;
      const w = (58 + rng() * 46) * scale;
      const d = (58 + rng() * 46) * scale;
      const rot = rng() * Math.PI;
      // Height floor so project towers stand above neighbouring buildings.
      const height = Math.max(150, baseHeight * (0.6 + rng() * 0.75));

      features.push({
        type: "Feature",
        properties: {
          slug: p.slug,
          name: p.name,
          color,
          height: Math.round(height),
        },
        geometry: {
          type: "Polygon",
          coordinates: [rect(p.lng, p.lat, offX, offY, w, d, rot)],
        },
      });
    }
  }

  return { type: "FeatureCollection", features };
}

/** A glowing ground disc under each development to demarcate the plot
 *  and tie the tower cluster together as one project. */
export function buildPlotDiscs(projects: Project[]): FeatureCollection {
  const features: Feature<Polygon>[] = [];
  const SEGMENTS = 32;

  for (const p of projects) {
    const scale = Math.min(1.4, Math.max(0.7, p.units / 600));
    const radius = 150 + 110 * scale; // metres
    const mPerDegLng = M_PER_DEG_LAT * Math.cos((p.lat * Math.PI) / 180);
    const ring: [number, number][] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const a = (i / SEGMENTS) * Math.PI * 2;
      ring.push([
        p.lng + (Math.cos(a) * radius) / mPerDegLng,
        p.lat + (Math.sin(a) * radius) / M_PER_DEG_LAT,
      ]);
    }
    features.push({
      type: "Feature",
      properties: { slug: p.slug, color: THEME_TOWER_COLORS[p.themeId] },
      geometry: { type: "Polygon", coordinates: [ring] },
    });
  }

  return { type: "FeatureCollection", features };
}
