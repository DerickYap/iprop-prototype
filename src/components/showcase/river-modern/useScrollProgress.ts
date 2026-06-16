"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

type Sub = (current: number) => void;

/**
 * Drives a normalized scroll progress (0→1) over a tall container, damped in a
 * single rAF loop so scrubbing is buttery rather than jumpy. Consumers subscribe
 * and update their own DOM via refs each frame (no per-frame React re-render).
 */
export function useScrollProgress(containerRef: RefObject<HTMLElement | null>) {
  const progress = useRef({ current: 0, target: 0 });
  const subs = useRef<Set<Sub>>(new Set());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -el.getBoundingClientRect().top;
        const target = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
        progress.current.target = target;
      }
      const p = progress.current;
      // critically-damped-ish lerp toward the scroll target
      p.current += (p.target - p.current) * 0.1;
      if (Math.abs(p.target - p.current) < 0.0002) p.current = p.target;
      subs.current.forEach((fn) => fn(p.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [containerRef]);

  const subscribe = useCallback((fn: Sub) => {
    subs.current.add(fn);
    return () => {
      subs.current.delete(fn);
    };
  }, []);

  return { progress, subscribe };
}
