"use client";

import { useEffect, useRef } from "react";
import type { RiverModern } from "@/data/projects";

/**
 * The 6 beats, layered over the film. Each beat's copy fades + lifts in as the
 * scroll progress nears its `at`, then fades as you move past — the oversized
 * headlines carry the storytelling, the film carries the place.
 */
export default function Overlay({
  data,
  subscribe,
}: {
  data: RiverModern;
  subscribe: (fn: (p: number) => void) => () => void;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    return subscribe((p) => {
      for (let i = 0; i < data.beats.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const t = Math.min(Math.max(1 - Math.abs(p - data.beats[i].at) / 0.13, 0), 1);
        const e = t * t * (3 - 2 * t); // smoothstep
        el.style.opacity = String(e);
        el.style.transform = `translateY(${(1 - e) * 26}px)`;
      }
    });
  }, [subscribe, data]);

  return (
    <div className="absolute inset-0 z-10">
      {data.beats.map((beat, i) => {
        const last = i === data.beats.length - 1;
        const align = beat.align ?? "left";
        const place =
          align === "center"
            ? "items-center justify-center text-center"
            : align === "right"
              ? "items-end justify-end text-right"
              : "items-end justify-start text-left";
        return (
          <section
            key={beat.id}
            className={`absolute inset-0 flex px-8 md:px-20 pb-28 ${place}`}
            style={{ pointerEvents: "none" }}
          >
            <div
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="max-w-xl"
              style={{ opacity: 0 }}
            >
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#e6b873]">
                {beat.eyebrow}
              </p>
              <h2
                className="mt-3 text-6xl md:text-8xl leading-[0.9] tracking-tight whitespace-pre-line [text-shadow:0_4px_40px_rgba(0,0,0,0.55)]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {beat.headline}
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-[#eaf0f2] [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] max-w-md inline-block">
                {beat.body}
              </p>

              {beat.amenities && (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#cdd9df] max-w-md">
                  {beat.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <span className="text-[#e6b873]">—</span> {a}
                    </li>
                  ))}
                </ul>
              )}

              {beat.stats && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4">
                  {beat.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-3xl text-[#f3f1ea]"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {s.value}
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[#9fb0bd]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {last && (
                <button
                  type="button"
                  className="mt-9 inline-flex items-center gap-3 bg-[#e6b873] text-[#0a0f17] px-9 py-4 text-sm uppercase tracking-[0.25em] hover:-translate-y-0.5 transition-transform"
                  style={{ pointerEvents: "auto" }}
                >
                  Register interest
                </button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
