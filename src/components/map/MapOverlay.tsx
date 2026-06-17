"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Project, Region } from "@/data/types";
import { formatPrice } from "@/data/projects";

const REGIONS: ("All" | Region)[] = ["All", "CCR", "RCR", "OCR"];

export function MapOverlay({
  projects,
  onPick,
  hidden,
  raised = false,
}: {
  projects: Project[];
  onPick: (p: Project) => void;
  hidden: boolean;
  /** Lift bottom-anchored UI above the global dock when it's on screen. */
  raised?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<"All" | Region>("All");

  const visible = projects.filter(
    (p) => region === "All" || p.region === region
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Brand */}
      <div className="absolute top-5 left-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          iProp<span className="text-sky-400">.</span>
        </h1>
        <p className="mt-0.5 text-[11px] tracking-[0.22em] text-white/55 uppercase">
          New launches · Singapore
        </p>
      </div>

      {/* Hint */}
      <p className="absolute bottom-5 left-5 hidden text-[11px] text-white/40 md:block">
        Drag to orbit · Scroll to zoom · Click a beacon to preview
      </p>

      {/* Panel toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto absolute top-5 right-5 rounded-full border border-white/15 bg-[#101420]/85 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-[#1a2030]"
      >
        {open ? "Close" : `Projects (${projects.length})`}
      </button>

      {/* Project list panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className={`pointer-events-auto absolute top-17 right-5 flex w-[min(330px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101420]/90 backdrop-blur-xl ${
              raised ? "bottom-28" : "bottom-5"
            }`}
          >
            <div className="flex gap-1.5 p-3 pb-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    region === r
                      ? "bg-white text-[#0b0e14]"
                      : "bg-white/8 text-white/65 hover:bg-white/15"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-3">
              {visible.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => {
                    onPick(p);
                    setOpen(false);
                  }}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl border border-transparent bg-white/4 p-2.5 text-left transition hover:border-white/15 hover:bg-white/8"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={p.heroImage}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {p.name}
                    </p>
                    <p className="truncate text-[11px] text-white/50">
                      {p.district}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-white/80">
                      From {formatPrice(p.priceFrom)}
                      <span className="ml-2 text-[10px] text-white/40">
                        {p.region}
                      </span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
