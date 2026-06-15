"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/data/types";

export function ShowcaseNav({ project }: { project: Project }) {
  const { scrollY } = useScroll();
  // Surface the bar's background once the hero is mostly scrolled past
  const bgOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const nameOpacity = useTransform(scrollY, [400, 650], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{
          opacity: bgOpacity,
          background:
            "color-mix(in srgb, var(--sc-bg) 82%, transparent)",
          borderColor: "color-mix(in srgb, var(--sc-muted) 25%, transparent)",
        }}
        className="absolute inset-0 border-b backdrop-blur-xl"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-opacity hover:opacity-75"
          style={{
            borderColor: "color-mix(in srgb, var(--sc-muted) 45%, transparent)",
            color: "var(--sc-text)",
            background: "color-mix(in srgb, var(--sc-bg) 55%, transparent)",
            backdropFilter: "blur(8px)",
          }}
        >
          ← Map
        </Link>

        <motion.p
          style={{ opacity: nameOpacity, color: "var(--sc-text)" }}
          className="sc-display absolute left-1/2 hidden -translate-x-1/2 text-base tracking-tight sm:block"
        >
          {project.name}
        </motion.p>

        <a
          href="#register"
          className="rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-[1.04]"
          style={{
            background: "var(--sc-accent)",
            color: "var(--sc-accent-text)",
          }}
        >
          Register
        </a>
      </div>
    </header>
  );
}
