import Link from "next/link";
import type { RiverModern } from "@/data/projects";

/* eslint-disable @next/next/no-img-element */
/**
 * Static, no-WebGL / reduced-motion version of River Modern. Same story, told as
 * a calm scrolling article so the page always works.
 */
export default function Fallback({ data }: { data: RiverModern }) {
  const p = data.palette;
  return (
    <main
      style={{ background: p.bg, color: p.text, fontFamily: "var(--font-inter)" }}
      className="min-h-screen"
    >
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-md"
        style={{ background: `${p.bg}cc` }}>
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.25em] opacity-85 transition-opacity hover:opacity-60"
        >
          ← Map
        </Link>
        <span className="text-[12px] uppercase tracking-[0.25em]" style={{ color: p.muted }}>
          Kallang Riverside
        </span>
      </div>

      {/* Hero */}
      <header className="relative h-[80vh] overflow-hidden">
        <img src={data.cover} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${p.bg}33, ${p.bg})` }} />
        <div className="absolute bottom-0 p-8 md:p-16 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: p.accent }}>
            {data.location}
          </p>
          <h1 className="mt-4 text-6xl md:text-8xl leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {data.name}
          </h1>
          <p className="mt-5 text-lg md:text-xl" style={{ color: p.muted }}>
            {data.summary}
          </p>
        </div>
      </header>

      {/* Beats */}
      {data.beats.map((beat, i) => (
        <section
          key={beat.id}
          className="px-6 md:px-16 py-20 md:py-28 border-t"
          style={{ borderColor: `${p.muted}22` }}
        >
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: p.accent }}>
              {beat.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl tracking-tight whitespace-pre-line"
              style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {beat.headline}
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: p.muted }}>
              {beat.body}
            </p>
            {beat.amenities && (
              <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
                {beat.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span style={{ color: p.accent }}>—</span> {a}
                  </li>
                ))}
              </ul>
            )}
            {beat.stats && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                {beat.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                      {s.value}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em]" style={{ color: p.muted }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {i === data.beats.length - 1 && (
              <button
                type="button"
                className="mt-10 inline-flex items-center gap-3 px-9 py-4 text-sm uppercase tracking-[0.25em]"
                style={{ background: p.accent, color: p.bg }}
              >
                Register interest
              </button>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
