"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import type { Stat, StatsSection as StatsData } from "@/data/types";

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <span ref={ref}>
      {stat.prefix}
      {display.toLocaleString()}
      {stat.suffix}
    </span>
  );
}

/** Apple-style spec wall: oversized numerals that count up in view. */
export function StatsSection({ data }: { data: StatsData }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-44">
      {data.heading && (
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7 }}
          className="sc-display mb-16 text-3xl tracking-tight md:mb-24 md:text-5xl"
          style={{ color: "var(--sc-text)" }}
        >
          {data.heading}
        </motion.h2>
      )}

      <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4">
        {data.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <p
              className="sc-display text-6xl tracking-tight tabular-nums md:text-7xl lg:text-8xl"
              style={{ color: "var(--sc-accent)" }}
            >
              <CountUp stat={stat} />
            </p>
            <p
              className="mt-3 text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: "var(--sc-muted)" }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
