"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { GallerySection as GalleryData } from "@/data/types";

export function GallerySection({ data }: { data: GalleryData }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
      {data.heading && (
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7 }}
          className="sc-display mb-12 text-3xl tracking-tight md:mb-16 md:text-5xl"
          style={{ color: "var(--sc-text)" }}
        >
          {data.heading}
        </motion.h2>
      )}

      <div className="grid auto-rows-[240px] grid-cols-2 gap-3 md:auto-rows-[320px] md:grid-cols-4 md:gap-5">
        {data.images.map((image, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl ${
              image.span === "wide"
                ? "col-span-2"
                : image.span === "tall"
                  ? "row-span-2"
                  : ""
            }`}
          >
            <Image
              src={image.src}
              alt={image.caption ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {image.caption && (
              <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/65 to-transparent px-4 pt-10 pb-3 text-xs font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {image.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
