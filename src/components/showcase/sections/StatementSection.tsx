"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import type { StatementSection as StatementData } from "@/data/types";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Apple-style scroll-linked word-by-word reveal. */
export function StatementSection({ data }: { data: StatementData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = data.text.split(" ");

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-6 py-32 md:py-44">
      {data.eyebrow && (
        <p
          className="mb-8 text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "var(--sc-accent)" }}
        >
          {data.eyebrow}
        </p>
      )}
      <p
        className="sc-display text-3xl leading-snug tracking-tight md:text-[2.75rem] md:leading-[1.25]"
        style={{ color: "var(--sc-text)" }}
      >
        {words.map((w, i) => (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
          />
        ))}
      </p>
    </section>
  );
}
