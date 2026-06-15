"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { HorizontalShowcaseSection as HorizontalData } from "@/data/types";

/**
 * Vertical scroll drives a horizontal track of large panels —
 * the Apple "swipe through the features" rail, scroll-powered.
 */
export function HorizontalShowcaseSection({ data }: { data: HorizontalData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Measure how far the track must shift so the last panel lands fully
  // in view, whatever the breakpoint's panel width is.
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setShift(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.08, 0.95], [0, -shift]);
  const trackProgress = useTransform(scrollYProgress, [0.08, 0.95], [0, 1]);

  if (reduced) {
    return (
      <section className="px-6 py-24">
        {data.heading && (
          <h2 className="sc-display mx-auto max-w-6xl text-3xl md:text-5xl" style={{ color: "var(--sc-text)" }}>
            {data.heading}
          </h2>
        )}
        <div className="mx-auto mt-10 flex max-w-6xl snap-x gap-6 overflow-x-auto">
          {data.panels.map((p) => (
            <div key={p.title} className="relative h-96 w-80 shrink-0 snap-start overflow-hidden rounded-3xl">
              <Image src={p.image} alt={p.title} fill sizes="320px" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                <h3 className="sc-display text-xl text-white">{p.title}</h3>
                {p.caption && <p className="mt-1 text-sm text-white/70">{p.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        {data.heading && (
          <h2
            className="sc-display mx-auto mb-8 w-full max-w-6xl px-6 text-3xl tracking-tight md:mb-12 md:text-5xl"
            style={{ color: "var(--sc-text)" }}
          >
            {data.heading}
          </h2>
        )}

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-[4vw] px-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {data.panels.map((panel, i) => (
            <div
              key={panel.title}
              className="relative h-[58vh] w-[86vw] shrink-0 overflow-hidden rounded-3xl md:h-[62vh] md:w-[72vw] lg:w-[56vw]"
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-7 md:p-10">
                <p
                  className="sc-display text-sm"
                  style={{ color: "var(--sc-accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="sc-display mt-2 text-2xl tracking-tight text-white md:text-4xl">
                  {panel.title}
                </h3>
                {panel.caption && (
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                    {panel.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Track progress */}
        <div className="mx-auto mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-current/15 md:mt-12">
          <motion.div
            style={{
              scaleX: trackProgress,
              background: "var(--sc-accent)",
            }}
            className="h-full w-full origin-left"
          />
        </div>
      </div>
    </section>
  );
}
