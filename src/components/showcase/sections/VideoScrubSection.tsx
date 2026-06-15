"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type {
  ScrubChapter,
  ScrubFrames,
  VideoScrubSection as VideoScrubData,
} from "@/data/types";

function Chapter({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: ScrubChapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const first = index === 0;
  const last = index === count - 1;
  const FADE = 0.16; // fraction of the chapter's own band

  // Function form (not keyframe arrays): clamp progress into this
  // chapter's band and fade at its edges.
  const opacity = useTransform(progress, (p) => {
    const local = (p - start) / (end - start);
    if (local <= 0) return first ? 1 : 0;
    if (local >= 1) return last ? 1 : 0;
    const fadeIn = first ? 1 : Math.min(local / FADE, 1);
    const fadeOut = last ? 1 : Math.min((1 - local) / FADE, 1);
    return Math.min(fadeIn, fadeOut);
  });
  const y = useTransform(progress, (p) => {
    const local = Math.max(0, Math.min(1, (p - start) / (end - start)));
    return local < FADE
      ? 40 - (local / FADE) * 40
      : (-20 * (local - FADE)) / (1 - FADE);
  });

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28"
      >
        <p className="sc-display text-sm" style={{ color: "var(--sc-accent)" }}>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
        <h3 className="sc-display mt-3 max-w-2xl text-3xl tracking-tight text-white md:text-6xl">
          {chapter.heading}
        </h3>
        {chapter.body && (
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:text-lg">
            {chapter.body}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Owns all video state so its re-renders (load/in-view flips) never
 * touch the parent that holds the chapter scroll transforms.
 */
function ScrubVideo({
  src,
  poster,
  containerRef,
  progress,
}: {
  src: string;
  poster: string;
  containerRef: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Ken Burns drift for the poster (pre-load and failure states)
  const posterScale = useTransform(progress, [0, 1], [1.05, 1.25]);
  const posterY = useTransform(progress, [0, 1], ["0%", "-6%"]);

  // Scrub loop: lerp currentTime toward the scroll-mapped target.
  useEffect(() => {
    if (videoFailed || !videoReady || !inView) return;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    let raf = 0;
    const tick = () => {
      const target = progress.get() * Math.max(video.duration - 0.05, 0);
      const delta = target - video.currentTime;
      if (Math.abs(delta) > 0.02 && video.seekable.length > 0) {
        video.currentTime =
          Math.abs(delta) < 1 / 24 ? target : video.currentTime + delta * 0.18;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoFailed, videoReady, inView, progress]);

  return (
    <>
      {!videoFailed && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {!videoReady && (
        <motion.div
          style={{ scale: posterScale, y: posterY }}
          className="absolute inset-0"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}
    </>
  );
}

function framePath(frames: ScrubFrames, i: number) {
  const ext = frames.ext ?? "webp";
  const pad = frames.pad ?? 3;
  return `${frames.dir}/frame-${String(i).padStart(pad, "0")}.${ext}`;
}

/**
 * Canvas frame-sequence scrubber — the actual Shopify Editions / Apple
 * technique. Frames are pre-extracted (scripts/extract-frames.mjs) and
 * preloaded as images, so every scroll step is a sub-millisecond
 * drawImage rather than a decoder seek. This is what removes the lag.
 */
function ScrubCanvas({
  frames,
  poster,
  containerRef,
  progress,
}: {
  frames: ScrubFrames;
  poster: string;
  containerRef: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const inView = useInView(containerRef, { margin: "60% 0px 60% 0px" });
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Ken Burns drift for the poster shown until the first frame paints.
  const posterScale = useTransform(progress, [0, 1], [1.05, 1.25]);
  const posterY = useTransform(progress, [0, 1], ["0%", "-6%"]);

  // Preload frames once the section is near the viewport: a coarse pass
  // (every 8th frame) first so scrubbing has full-range coverage almost
  // immediately, then fill in the gaps.
  useEffect(() => {
    if (!inView || imagesRef.current.length) return;
    imagesRef.current = new Array(frames.count);

    let cancelled = false;
    const order: number[] = [];
    const stride = 8;
    for (let i = 0; i < frames.count; i += stride) order.push(i);
    for (let i = 0; i < frames.count; i++) if (i % stride !== 0) order.push(i);

    let loaded = 0;
    const loadNext = (k: number) => {
      if (cancelled || k >= order.length) return;
      const idx = order[k];
      const img = document.createElement("img");
      img.onload = () => {
        imagesRef.current[idx] = img;
        loaded++;
        if (loaded === 1) setFirstFrameReady(true);
        loadNext(k + 1);
      };
      img.onerror = () => loadNext(k + 1);
      img.src = framePath(frames, idx);
    };
    // Two parallel chains keeps the network busy without flooding it.
    loadNext(0);
    loadNext(1);

    return () => {
      cancelled = true;
    };
  }, [inView, frames]);

  // Render loop: damp a float playhead toward the scroll target and draw
  // the nearest loaded frame, cover-fit. Time-based damping keeps the
  // feel identical across refresh rates; redraw only when something changes.
  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let playhead = progress.get() * (frames.count - 1);
    let drawnIdx = -1;
    let drawnW = -1;
    let drawnH = -1;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (w !== canvas.width || h !== canvas.height) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const nearestLoaded = (idx: number) => {
      const imgs = imagesRef.current;
      if (imgs[idx]) return imgs[idx];
      for (let r = 1; r < frames.count; r++) {
        if (imgs[idx - r]) return imgs[idx - r];
        if (imgs[idx + r]) return imgs[idx + r];
      }
      return undefined;
    };

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      sizeCanvas();

      const target = progress.get() * (frames.count - 1);
      // k≈16 → snappy: visually tracks the scroll without trailing,
      // while absorbing wheel-delta quantization. (1-e^-k·dt)
      playhead += (target - playhead) * (1 - Math.exp(-16 * dt));
      if (Math.abs(target - playhead) < 0.01) playhead = target;

      const idx = Math.max(
        0,
        Math.min(frames.count - 1, Math.round(playhead))
      );
      if (idx !== drawnIdx || canvas.width !== drawnW || canvas.height !== drawnH) {
        const img = nearestLoaded(idx);
        if (img) {
          drawCover(img);
          drawnIdx = idx;
          drawnW = canvas.width;
          drawnH = canvas.height;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, progress, frames.count]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          firstFrameReady ? "opacity-100" : "opacity-0"
        }`}
      />
      {!firstFrameReady && (
        <motion.div
          style={{ scale: posterScale, y: posterY }}
          className="absolute inset-0"
        >
          <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
      )}
    </>
  );
}

/**
 * Scroll-scrubbed motion: the section pins and scroll position drives a
 * frame sequence on a canvas (preferred) or video.currentTime (fallback),
 * so scrolling reads as flying through the film — the Shopify Editions /
 * CDL microsite move. Falls back to a scroll-driven Ken Burns on the
 * poster until assets are ready (or if reduced motion is set).
 */
export function VideoScrubSection({ data }: { data: VideoScrubData }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section className="relative">
        {data.chapters.map((c) => (
          <div key={c.heading} className="relative flex h-dvh items-end overflow-hidden">
            <Image src={data.poster} alt={c.heading} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
              <h3 className="sc-display text-3xl text-white md:text-6xl">{c.heading}</h3>
              {c.body && <p className="mt-4 max-w-lg text-white/75">{c.body}</p>}
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
      style={{ height: `${(data.chapters.length + 1) * 120}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-black">
        {data.frames ? (
          <ScrubCanvas
            frames={data.frames}
            poster={data.poster}
            containerRef={ref}
            progress={scrollYProgress}
          />
        ) : data.src ? (
          <ScrubVideo
            src={data.src}
            poster={data.poster}
            containerRef={ref}
            progress={scrollYProgress}
          />
        ) : (
          <Image
            src={data.poster}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/15" />

        {data.chapters.map((chapter, i) => (
          <Chapter
            key={chapter.heading}
            chapter={chapter}
            index={i}
            count={data.chapters.length}
            progress={scrollYProgress}
          />
        ))}

        {/* Playhead */}
        <div className="absolute right-6 bottom-20 hidden h-28 w-0.5 overflow-hidden rounded-full bg-white/20 md:block">
          <motion.div
            style={{ scaleY: barScale, background: "var(--sc-accent)" }}
            className="h-full w-full origin-top"
          />
        </div>
        <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/45 uppercase">
          Scroll to fly through
        </p>
      </div>
    </section>
  );
}
