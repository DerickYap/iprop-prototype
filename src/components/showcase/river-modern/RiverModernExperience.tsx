"use client";

import { useRef } from "react";
import { riverModern } from "@/data/projects";
import { useReducedMotion } from "./useReducedMotion";
import { useScrollProgress } from "./useScrollProgress";
import ScrubVideo from "./ScrubVideo";
import Overlay from "./Overlay";
import { Chrome } from "./Chrome";
import Fallback from "./Fallback";

const data = riverModern;

/**
 * River Modern as a scroll-scrubbed film. A tall scroll container drives a damped
 * progress; a sticky full-viewport stage holds the film, the oversized typography,
 * and the chrome — so scrolling glides the camera through the grounds.
 */
export default function RiverModernExperience() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { subscribe } = useScrollProgress(containerRef);

  if (reduced) return <Fallback data={data} />;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${data.scrollLength * 100}vh`, background: data.palette.bg }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: data.palette.bg, color: data.palette.text }}
      >
        <ScrubVideo video={data.video} subscribe={subscribe} />
        <Overlay data={data} subscribe={subscribe} />
        <Chrome subscribe={subscribe} />
      </div>
    </div>
  );
}
