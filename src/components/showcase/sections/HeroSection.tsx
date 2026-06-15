"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { HeroSection as HeroData } from "@/data/types";

export function HeroSection({ data }: { data: HeroData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative h-dvh overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={data.image}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--sc-bg) 0%, color-mix(in srgb, var(--sc-bg) 35%, transparent) 35%, color-mix(in srgb, var(--sc-bg) 15%, transparent) 100%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28"
      >
        {data.eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--sc-accent)" }}
          >
            {data.eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="sc-display mt-4 text-5xl leading-[1.02] tracking-tight md:text-8xl"
          style={{ color: "var(--sc-text)" }}
        >
          {data.title}
        </motion.h1>
        {data.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--sc-muted)" }}
          >
            {data.subtitle}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border p-1"
          style={{ borderColor: "var(--sc-muted)" }}
        >
          <div
            className="mx-auto h-2 w-1 rounded-full"
            style={{ background: "var(--sc-muted)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
