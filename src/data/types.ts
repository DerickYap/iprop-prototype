export type FontKey = "playfair" | "fraunces" | "grotesk" | "inter" | "manrope";

export type ThemeId = "noir" | "botanic" | "azure" | "graphite";

export type Theme = {
  id: ThemeId;
  name: string;
  mode: "dark" | "light";
  colors: {
    bg: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    accentText: string;
  };
  fonts: {
    display: FontKey;
    body: FontKey;
  };
};

export type Region = "CCR" | "RCR" | "OCR";

export type HeroSection = {
  type: "hero";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
};

export type StatementSection = {
  type: "statement";
  eyebrow?: string;
  text: string;
};

export type GalleryImage = {
  src: string;
  caption?: string;
  span?: "wide" | "tall" | "normal";
};

export type GallerySection = {
  type: "gallery";
  heading?: string;
  images: GalleryImage[];
};

export type StickyMediaSection = {
  type: "stickyMedia";
  image: string;
  blocks: { heading: string; body: string }[];
};

export type UnitType = {
  type: string;
  size: string;
  priceFrom: string;
};

export type ResidencesSection = {
  type: "residences";
  heading?: string;
  intro?: string;
  units: UnitType[];
};

export type AmenitiesSection = {
  type: "amenities";
  heading?: string;
  intro?: string;
  items: { name: string; description?: string }[];
};

export type PoiKind = "mrt" | "school" | "mall" | "park" | "other";

export type LocationSection = {
  type: "location";
  heading?: string;
  intro?: string;
  pois: { name: string; distance: string; kind: PoiKind }[];
};

export type FactsCtaSection = {
  type: "factsCta";
  heading?: string;
  facts: { label: string; value: string }[];
  ctaLabel?: string;
};

export type ZoomHeroSection = {
  type: "zoomHero";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
};

export type PinnedScene = {
  image: string;
  heading: string;
  body?: string;
};

export type PinnedScenesSection = {
  type: "pinnedScenes";
  scenes: PinnedScene[];
};

export type HorizontalPanel = {
  image: string;
  title: string;
  caption?: string;
};

export type HorizontalShowcaseSection = {
  type: "horizontal";
  heading?: string;
  panels: HorizontalPanel[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type StatsSection = {
  type: "stats";
  heading?: string;
  stats: Stat[];
};

export type ZoomThroughSection = {
  type: "zoomThrough";
  image: string;
  caption?: string;
};

export type ScrubChapter = {
  heading: string;
  body?: string;
};

export type ScrubFrames = {
  dir: string; // public path, e.g. "/video/sora-frames"
  count: number;
  ext?: string; // default "webp"
  pad?: number; // filename zero-pad width, default 3
};

export type VideoScrubSection = {
  type: "videoScrub";
  /** Preferred: a pre-extracted frame sequence for buttery canvas scrubbing. */
  frames?: ScrubFrames;
  /** Fallback source for the legacy <video> scrub path. */
  src?: string;
  poster: string;
  chapters: ScrubChapter[];
};

export type Section =
  | HeroSection
  | StatementSection
  | GallerySection
  | StickyMediaSection
  | ResidencesSection
  | AmenitiesSection
  | LocationSection
  | FactsCtaSection
  | ZoomHeroSection
  | PinnedScenesSection
  | HorizontalShowcaseSection
  | StatsSection
  | ZoomThroughSection
  | VideoScrubSection;

export type Project = {
  slug: string;
  name: string;
  developer: string;
  tagline: string;
  lat: number;
  lng: number;
  district: string;
  region: Region;
  priceFrom: number;
  tenure: string;
  top: string;
  units: number;
  heroImage: string;
  themeId: ThemeId;
  sections: Section[];
};
