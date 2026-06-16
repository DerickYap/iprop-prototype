"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/** Fixed UI over the film: back link, scroll hint (fades), and a progress bar. */
export function Chrome({
  subscribe,
}: {
  subscribe: (fn: (p: number) => void) => () => void;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribe((p) => {
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (hint.current) hint.current.style.opacity = String(Math.max(0, 1 - p * 14));
    });
  }, [subscribe]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="pointer-events-auto text-[12px] uppercase tracking-[0.25em] text-white/85 transition-opacity hover:opacity-70"
        >
          ← Map
        </Link>
        <span className="text-[12px] uppercase tracking-[0.25em] text-white/70">
          Kallang Riverside
        </span>
      </div>

      {/* scroll hint */}
      <div
        ref={hint}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-white/80"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">
          Scroll to play the film
        </span>
        <span className="text-lg animate-bounce">↓</span>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/10">
        <div
          ref={bar}
          className="h-full origin-left bg-[#e6b873]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
