"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { StickyMediaSection as StickyData } from "@/data/types";

/** Pinned image while copy blocks scroll past — the Apple signature move. */
export function StickyMediaSection({ data }: { data: StickyData }) {
  return (
    <section className="relative">
      {/* Mobile: image as a static lead-in */}
      <div className="relative h-[55vh] md:hidden">
        <Image
          src={data.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-7xl md:grid-cols-2">
        <div className="relative hidden md:block">
          <div className="sticky top-0 h-dvh p-8">
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src={data.image}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="px-6 md:px-14">
          {data.blocks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex min-h-[70vh] flex-col justify-center py-16 md:min-h-dvh"
            >
              <span
                className="sc-display text-sm"
                style={{ color: "var(--sc-accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="sc-display mt-3 text-2xl tracking-tight md:text-4xl"
                style={{ color: "var(--sc-text)" }}
              >
                {b.heading}
              </h3>
              <p
                className="mt-5 max-w-md text-base leading-relaxed md:text-lg"
                style={{ color: "var(--sc-muted)" }}
              >
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
