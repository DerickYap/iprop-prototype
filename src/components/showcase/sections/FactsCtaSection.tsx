"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { FactsCtaSection as FactsData, Project } from "@/data/types";

export function FactsCtaSection({
  data,
  project,
}: {
  data: FactsData;
  project: Project;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7 }}
        className="sc-display text-3xl tracking-tight md:text-5xl"
        style={{ color: "var(--sc-text)" }}
      >
        {data.heading ?? "At a glance"}
      </motion.h2>

      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-16 md:grid-cols-3">
        {data.facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--sc-muted)" }}
            >
              {fact.label}
            </p>
            <p
              className="sc-display mt-2 text-xl tracking-tight md:text-2xl"
              style={{ color: "var(--sc-text)" }}
            >
              {fact.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7 }}
        id="register"
        className="mt-20 scroll-mt-24 rounded-3xl p-10 text-center md:mt-28 md:p-16"
        style={{ background: "var(--sc-surface)" }}
      >
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "var(--sc-accent)" }}
        >
          {project.name}
        </p>
        <h3
          className="sc-display mx-auto mt-4 max-w-2xl text-2xl tracking-tight md:text-4xl"
          style={{ color: "var(--sc-text)" }}
        >
          See it for yourself.
        </h3>
        <p
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed md:text-base"
          style={{ color: "var(--sc-muted)" }}
        >
          Leave your details and the {project.developer} sales team will be in
          touch with floor plans, pricing and preview slots.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            className="rounded-full px-7 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "var(--sc-accent)",
              color: "var(--sc-accent-text)",
            }}
          >
            {data.ctaLabel ?? "Register interest"}
          </button>
          <Link
            href="/"
            className="rounded-full border px-7 py-3 text-sm font-semibold transition-colors"
            style={{
              borderColor:
                "color-mix(in srgb, var(--sc-muted) 45%, transparent)",
              color: "var(--sc-text)",
            }}
          >
            ← Back to the map
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
