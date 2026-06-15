"use client";

import { motion } from "motion/react";
import type { ResidencesSection as ResidencesData } from "@/data/types";

export function ResidencesSection({ data }: { data: ResidencesData }) {
  return (
    <section
      className="py-24 md:py-36"
      style={{ background: "var(--sc-surface)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
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
            {data.heading ?? "The residences"}
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

        <div className="mt-12 md:mt-16">
          {data.units.map((unit, i) => (
            <motion.div
              key={unit.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="grid grid-cols-2 items-baseline gap-2 border-t py-6 md:grid-cols-3 md:py-8"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--sc-muted) 30%, transparent)",
              }}
            >
              <h3
                className="sc-display text-xl tracking-tight md:text-2xl"
                style={{ color: "var(--sc-text)" }}
              >
                {unit.type}
              </h3>
              <p
                className="text-right text-sm md:text-left md:text-base"
                style={{ color: "var(--sc-muted)" }}
              >
                {unit.size}
              </p>
              <p
                className="col-span-2 text-sm font-semibold md:col-span-1 md:text-right md:text-base"
                style={{ color: "var(--sc-accent)" }}
              >
                From {unit.priceFrom}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
