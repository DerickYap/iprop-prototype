"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { formatPrice } from "@/data/projects";
import { themes } from "@/lib/themes";

export function ProjectPreviewCard({
  project,
  onClose,
  onEnter,
  raised = false,
}: {
  project: Project;
  onClose: () => void;
  onEnter: () => void;
  /** Lift above the global dock when it's on screen. */
  raised?: boolean;
}) {
  const theme = themes[project.themeId];

  return (
    <motion.div
      initial={{ y: 48, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      exit={{ y: 48, x: "-50%", opacity: 0 }}
      transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
      className={`absolute left-1/2 z-20 w-[min(430px,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#101420]/92 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl ${
        raised ? "bottom-28" : "bottom-5"
      }`}
    >
      <div className="relative h-44 w-full">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          sizes="430px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101420] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
          {project.region}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-sm text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="px-5 pt-1 pb-5">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-0.5 text-xs text-white/50">
          {project.district} · by {project.developer}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-white/75">
          {project.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-widest text-white/45 uppercase">
              From
            </p>
            <p className="text-base font-semibold text-white">
              {formatPrice(project.priceFrom)}
            </p>
          </div>
          <button
            onClick={onEnter}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: theme.colors.accent,
              color: theme.colors.accentText,
            }}
          >
            Enter showcase →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
