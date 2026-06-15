import type { CSSProperties } from "react";
import type { FontKey, Theme, ThemeId } from "@/data/types";

const fontVar: Record<FontKey, string> = {
  playfair: "var(--font-playfair)",
  fraunces: "var(--font-fraunces)",
  grotesk: "var(--font-grotesk)",
  inter: "var(--font-inter)",
  manrope: "var(--font-manrope)",
};

export const themes: Record<ThemeId, Theme> = {
  noir: {
    id: "noir",
    name: "Noir Luxe",
    mode: "dark",
    colors: {
      bg: "#0a0a0c",
      surface: "#15151a",
      text: "#f5f1e8",
      muted: "#97917f",
      accent: "#c9a96a",
      accentText: "#0a0a0c",
    },
    fonts: { display: "playfair", body: "inter" },
  },
  botanic: {
    id: "botanic",
    name: "Botanic",
    mode: "light",
    colors: {
      bg: "#f7f5ef",
      surface: "#ffffff",
      text: "#22301f",
      muted: "#6b7263",
      accent: "#2f5d3a",
      accentText: "#f7f5ef",
    },
    fonts: { display: "fraunces", body: "manrope" },
  },
  azure: {
    id: "azure",
    name: "Azure",
    mode: "light",
    colors: {
      bg: "#fafbfd",
      surface: "#ffffff",
      text: "#0e1726",
      muted: "#5d6b80",
      accent: "#0f62fe",
      accentText: "#ffffff",
    },
    fonts: { display: "grotesk", body: "inter" },
  },
  graphite: {
    id: "graphite",
    name: "Graphite",
    mode: "light",
    colors: {
      bg: "#ffffff",
      surface: "#f4f4f5",
      text: "#18181b",
      muted: "#71717a",
      accent: "#18181b",
      accentText: "#ffffff",
    },
    fonts: { display: "grotesk", body: "inter" },
  },
};

/** CSS custom properties consumed by showcase components via var(--sc-*) */
export function themeStyle(theme: Theme): CSSProperties {
  return {
    "--sc-bg": theme.colors.bg,
    "--sc-surface": theme.colors.surface,
    "--sc-text": theme.colors.text,
    "--sc-muted": theme.colors.muted,
    "--sc-accent": theme.colors.accent,
    "--sc-accent-text": theme.colors.accentText,
    "--sc-font-display": fontVar[theme.fonts.display],
    "--sc-font-body": fontVar[theme.fonts.body],
  } as CSSProperties;
}
