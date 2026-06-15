"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { ZoomThroughSection as ZoomThroughData } from "@/data/types";

/**
 * Transition beat: an image starts as a small centered card and scales
 * past full-bleed as you scroll through — the dive into the next chapter.
 */
export function ZoomThroughSection({ data }: { data: ZoomThroughData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1.12]);
  const radius = useTransform(scrollYProgress, [0, 0.85], [40, 0]);
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.75, 0.95],
    [0, 1, 1, 0]
  );

  if (reduced) {
    return (
      <section className="relative h-[60vh] overflow-hidden">
        <Image src={data.image} alt={data.caption ?? ""} fill sizes="100vw" className="object-cover" />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden"
        >
          <Image
            src={data.image}
            alt={data.caption ?? ""}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
        {data.caption && (
          <motion.p
            style={{ opacity: captionOpacity }}
            className="sc-display absolute max-w-3xl px-6 text-center text-2xl leading-snug tracking-tight text-white drop-shadow-md md:text-5xl"
          >
            {data.caption}
          </motion.p>
        )}
      </div>
    </section>
  );
}
