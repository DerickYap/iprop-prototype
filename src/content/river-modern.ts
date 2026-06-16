// ============================================================================
// RIVER MODERN — bespoke flagship experience content.
//
// The page is a CINEMATIC FILM the user scrubs by scrolling: a flythrough video
// plays forward/back with scroll, with the copy below layered over it.
// Everything editable lives here:
//   • video   — the scrubbed clip + poster fallback
//   • beats[] — the 6 story beats; each has an `at` (0–1) marking where in the
//               scroll/film its copy peaks, and an `align` for placement.
// Tune `at` to line each beat up with a moment in the film; reorder/edit freely.
// ============================================================================

export interface RiverBeat {
  id: string;
  eyebrow: string;
  /** Oversized display headline shown over the film. \n allowed. */
  headline: string;
  body: string;
  /** Where in the scroll (0=top, 1=bottom) this beat's copy peaks. */
  at: number;
  /** Horizontal placement of the copy over the film. */
  align?: "left" | "center" | "right";
  stats?: { label: string; value: string }[];
  amenities?: string[];
}

export interface RiverVideo {
  /** Primary mp4, served from /public. */
  src: string;
  /** Optional webm alternative. */
  webm?: string;
  /** Poster shown before load / if the video fails. */
  poster: string;
}

export interface RiverModern {
  slug: string;
  name: string;
  developer: string;
  location: string;
  tenure: string;
  units: string;
  priceFrom: string;
  status: string;
  editionNo: string;
  tagline: string;
  summary: string;
  cover: string;
  /** How many viewport-heights of scroll the film is stretched across. */
  scrollLength: number;
  palette: {
    bg: string;
    text: string;
    muted: string;
    accent: string;
    water: string;
  };
  video: RiverVideo;
  beats: RiverBeat[];
}

const riverModern: RiverModern = {
  slug: "river-modern",
  name: "River Modern",
  developer: "Meridian Group",
  location: "Kallang Riverside · District 12",
  tenure: "99-year leasehold",
  units: "320 residences",
  priceFrom: "S$1.9M",
  status: "Now Previewing",
  editionNo: "Flagship",
  tagline: "A life that moves with the water.",
  summary:
    "Set along the Kallang River, River Modern is a journey before it is an address — drifting over the water, through the grounds, and up into the residences.",
  cover: "https://picsum.photos/seed/river-modern-cover/1400/1750",

  // Stretch the ~10s film across 6 viewport-heights of scroll for a slow,
  // luxurious scrub. Increase for an even slower reveal.
  scrollLength: 6,

  palette: {
    bg: "#070b12",
    text: "#f3f1ea",
    muted: "#9fb0bd",
    accent: "#e6b873",
    water: "#16323a",
  },

  video: {
    src: "/river-modern/flythrough.mp4",
    // poster falls back to the cover until a real still is added
    poster: "https://picsum.photos/seed/river-modern-cover/1400/1750",
  },

  // --- The six beats (copy peaks at `at`, spread across the film) -----------
  beats: [
    {
      id: "arrival",
      eyebrow: "Kallang Riverside",
      headline: "River\nModern",
      body: "A life that moves with the water. The journey home begins on the river.",
      at: 0.04,
      align: "center",
    },
    {
      id: "promenade",
      eyebrow: "The approach",
      headline: "Arrive\nslowly",
      body: "A tree-lined promenade traces the river's edge — a long, unhurried approach where the city softens into rustle and reflection.",
      at: 0.24,
      align: "left",
    },
    {
      id: "waterway",
      eyebrow: "Life by the water",
      headline: "On the\nwater",
      body: "Reflecting pools and a 70-metre lap stretch run the length of the grounds, so light and water are never far from the door.",
      at: 0.42,
      align: "right",
      amenities: [
        "70m river-edge pool",
        "Floating pavilions",
        "Hydrotherapy garden",
        "Kayak landing",
      ],
    },
    {
      id: "gardens",
      eyebrow: "The grounds",
      headline: "Into the\ngreen",
      body: "Three hectares of layered planting — rain gardens, fig groves, a quiet boardwalk — designed to be walked through on the way to everywhere.",
      at: 0.6,
      align: "left",
    },
    {
      id: "residences",
      eyebrow: "The residences",
      headline: "Rise",
      body: "Two slender towers lift the homes into the light, terraces deep enough to live on, the river always somewhere below.",
      at: 0.78,
      align: "right",
      stats: [
        { label: "Residences", value: "320" },
        { label: "Tenure", value: "99-year" },
        { label: "From", value: "S$1.9M" },
        { label: "Completion", value: "2030" },
      ],
    },
    {
      id: "skyline",
      eyebrow: "Now previewing",
      headline: "Stay",
      body: "River Modern is now previewing — come and find where you fit in it.",
      at: 0.96,
      align: "center",
    },
  ],
};

export default riverModern;
