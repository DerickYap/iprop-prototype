"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { ZoomHeroSection as ZoomHeroData } from "@/data/types";

/**
 * iPhone-style pinned hero: a slow push-in on the image while the
 * oversized title lifts away, then the image settles into a rounded
 * inset card with a closing line over it.
 */
export function ZoomHeroSection({ data }: { data: ZoomHeroData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0 → 0.35): title lifts away while the image pushes in.
  // Phase 2 (0.55 → 1): image settles into a framed card, closing line appears.
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.18, 0.92]
  );
  const frameRadius = useTransform(scrollYProgress, [0.55, 1], [0, 28]);
  const frameInset = useTransform(scrollYProgress, [0.55, 1], [0, 28]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -130]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.92]);
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0.25, 0.05, 0.05, 0.45]
  );
  const closerOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const closerY = useTransform(scrollYProgress, [0.72, 0.92], [36, 0]);

  if (reduced) {
    return (
      <section className="relative flex h-dvh items-end overflow-hidden">
        <Image src={data.image} alt={data.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24">
          {data.eyebrow && (
            <p className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--sc-accent)" }}>
              {data.eyebrow}
            </p>
          )}
          <h1 className="sc-display mt-4 text-5xl text-white md:text-8xl">{data.title}</h1>
          {data.subtitle && <p className="mt-6 max-w-xl text-white/80">{data.subtitle}</p>}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div
          style={{
            scale: imageScale,
            borderRadius: frameRadius,
            top: frameInset,
            right: frameInset,
            bottom: frameInset,
            left: frameInset,
          }}
          className="absolute overflow-hidden"
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <motion.div
            style={{ opacity: veilOpacity }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>

        {/* Title block — lifts away on scroll */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
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
            className="sc-display mt-4 text-5xl leading-[1.02] tracking-tight text-white drop-shadow-lg md:text-8xl"
          >
            {data.title}
          </motion.h1>
        </motion.div>

        {/* Closing line — fades in as the image settles into its frame */}
        {data.subtitle && (
          <motion.div
            style={{ opacity: closerOpacity, y: closerY }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <p className="sc-display max-w-3xl text-center text-2xl leading-snug tracking-tight text-white drop-shadow-md md:text-5xl">
              {data.subtitle}
            </p>
          </motion.div>
        )}

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ opacity: titleOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="h-9 w-5 rounded-full border border-white/50 p-1"
          >
            <div className="mx-auto h-2 w-1 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
