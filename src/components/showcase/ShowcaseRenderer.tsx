"use client";

import { motion } from "motion/react";
import type { Project, Section } from "@/data/types";
import { themes, themeStyle } from "@/lib/themes";
import { ShowcaseNav } from "./ShowcaseNav";
import { RelatedArticles } from "./RelatedArticles";
import { HeroSection } from "./sections/HeroSection";
import { StatementSection } from "./sections/StatementSection";
import { GallerySection } from "./sections/GallerySection";
import { StickyMediaSection } from "./sections/StickyMediaSection";
import { ResidencesSection } from "./sections/ResidencesSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { LocationSection } from "./sections/LocationSection";
import { FactsCtaSection } from "./sections/FactsCtaSection";
import { ZoomHeroSection } from "./sections/ZoomHeroSection";
import { PinnedScenesSection } from "./sections/PinnedScenesSection";
import { HorizontalShowcaseSection } from "./sections/HorizontalShowcaseSection";
import { StatsSection } from "./sections/StatsSection";
import { ZoomThroughSection } from "./sections/ZoomThroughSection";
import { VideoScrubSection } from "./sections/VideoScrubSection";

function renderSection(section: Section, project: Project, key: number) {
  switch (section.type) {
    case "hero":
      return <HeroSection key={key} data={section} />;
    case "statement":
      return <StatementSection key={key} data={section} />;
    case "gallery":
      return <GallerySection key={key} data={section} />;
    case "stickyMedia":
      return <StickyMediaSection key={key} data={section} />;
    case "residences":
      return <ResidencesSection key={key} data={section} />;
    case "amenities":
      return <AmenitiesSection key={key} data={section} />;
    case "location":
      return <LocationSection key={key} data={section} project={project} />;
    case "factsCta":
      return <FactsCtaSection key={key} data={section} project={project} />;
    case "zoomHero":
      return <ZoomHeroSection key={key} data={section} />;
    case "pinnedScenes":
      return <PinnedScenesSection key={key} data={section} />;
    case "horizontal":
      return <HorizontalShowcaseSection key={key} data={section} />;
    case "stats":
      return <StatsSection key={key} data={section} />;
    case "zoomThrough":
      return <ZoomThroughSection key={key} data={section} />;
    case "videoScrub":
      return <VideoScrubSection key={key} data={section} />;
  }
}

export function ShowcaseRenderer({ project }: { project: Project }) {
  const theme = themes[project.themeId];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{
        ...themeStyle(theme),
        background: "var(--sc-bg)",
        color: "var(--sc-text)",
      }}
      className="sc-body min-h-dvh"
    >
      <ShowcaseNav project={project} />

      {project.sections.map((s, i) => renderSection(s, project, i))}

      <RelatedArticles slug={project.slug} />

      <footer
        className="border-t px-6 py-10 text-center"
        style={{
          borderColor: "color-mix(in srgb, var(--sc-muted) 25%, transparent)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--sc-muted)" }}>
          {project.name} · {project.developer} — showcase by iProp. Sample data
          for demonstration; imagery is placeholder and not representative of
          the actual development.
        </p>
      </footer>
    </motion.main>
  );
}
