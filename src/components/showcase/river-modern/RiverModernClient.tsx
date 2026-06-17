"use client";

import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import { riverModern } from "@/data/projects";
import { RelatedArticles } from "../RelatedArticles";

// WebGL must never run on the server → load the experience client-only.
const Experience = dynamic(() => import("./RiverModernExperience"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0" style={{ background: riverModern.palette.bg }} />
  ),
});

// Map River Modern's bespoke palette onto the showcase theme variables so the
// shared RelatedArticles section renders natively in its dark, cormorant look.
const p = riverModern.palette;
const riverThemeVars = {
  "--sc-bg": p.bg,
  "--sc-surface": `color-mix(in srgb, #ffffff 6%, ${p.bg})`,
  "--sc-text": p.text,
  "--sc-muted": p.muted,
  "--sc-accent": p.accent,
  "--sc-accent-text": p.bg,
  "--sc-font-display": "var(--font-cormorant)",
  "--sc-font-body": "var(--font-inter)",
} as CSSProperties;

export default function RiverModernClient() {
  return (
    <>
      <Experience />
      <div style={{ ...riverThemeVars, background: p.bg, color: p.text }}>
        <RelatedArticles slug="river-modern" />
      </div>
    </>
  );
}
