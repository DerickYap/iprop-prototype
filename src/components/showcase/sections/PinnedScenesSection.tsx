"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type {
  PinnedScene,
  PinnedScenesSection as PinnedScenesData,
} from "@/data/types";

function Scene({
  scene,
  index,
  count,
  progress,
}: {
  scene: PinnedScene;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  // Each scene owns an equal band of the scroll; crossfade at the edges.
  const start = index / count;
  const end = (index + 1) / count;
  const fade = 0.18 / count;

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - fade, end]
      : index === count - 1
        ? [start, start + fade, end]
        : [start, start + fade, end - fade, end],
    index === 0
      ? [1, 1, 0]
      : index === count - 1
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1.12, 1]);
  const textY = useTransform(progress, [start, start + fade, end], [48, 0, -24]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={scene.image}
          alt={scene.heading}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28"
      >
        <p
          className="sc-display text-sm"
          style={{ color: "var(--sc-accent)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h3 className="sc-display mt-3 max-w-2xl text-3xl tracking-tight text-white md:text-6xl">
          {scene.heading}
        </h3>
        {scene.body && (
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:text-lg">
            {scene.body}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Scroll-scrubbed pinned sequence: the viewport pins while scroll
 * crossfades through full-bleed scenes — Apple's canvas-scrub move,
 * built from stills.
 */
export function PinnedScenesSection({ data }: { data: PinnedScenesData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section>
        {data.scenes.map((s) => (
          <div key={s.heading} className="relative flex h-dvh items-end overflow-hidden">
            <Image src={s.image} alt={s.heading} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
              <h3 className="sc-display text-3xl text-white md:text-6xl">{s.heading}</h3>
              {s.body && <p className="mt-4 max-w-lg text-white/75">{s.body}</p>}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${(data.scenes.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-black">
        {data.scenes.map((scene, i) => (
          <Scene
            key={scene.heading}
            scene={scene}
            index={i}
            count={data.scenes.length}
            progress={scrollYProgress}
          />
        ))}

        {/* Scrub progress indicator */}
        <div className="absolute right-6 bottom-20 hidden h-28 w-0.5 overflow-hidden rounded-full bg-white/20 md:block">
          <motion.div
            style={{ scaleY: barScale, background: "var(--sc-accent)" }}
            className="h-full w-full origin-top"
          />
        </div>
      </div>
    </section>
  );
}
