"use client";

import { motion } from "motion/react";
import type { AmenitiesSection as AmenitiesData } from "@/data/types";

export function AmenitiesSection({ data }: { data: AmenitiesData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="sc-display text-3xl tracking-tight md:text-5xl"
          style={{ color: "var(--sc-text)" }}
        >
          {data.heading ?? "Amenities"}
        </h2>
        {data.intro && (
          <p
            className="mt-4 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--sc-muted)" }}
          >
            {data.intro}
          </p>
        )}
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {data.items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.09 }}
            className="rounded-2xl p-6 md:p-8"
            style={{ background: "var(--sc-surface)" }}
          >
            <div
              className="h-1.5 w-8 rounded-full"
              style={{ background: "var(--sc-accent)" }}
            />
            <h3
              className="sc-display mt-5 text-lg tracking-tight md:text-xl"
              style={{ color: "var(--sc-text)" }}
            >
              {item.name}
            </h3>
            {item.description && (
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--sc-muted)" }}
              >
                {item.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
