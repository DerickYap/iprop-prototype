import Link from "next/link";
import { featuredArticles, latestArticles } from "@/data/articles";
import { ArticleCard } from "@/components/editorial/ArticleCard";

export default function Home() {
  // Lead + two — fills a clean 2×2 block beside the oversized lead card.
  const featured = featuredArticles().slice(0, 3);
  const latest = latestArticles(3);

  return (
    <main className="min-h-dvh bg-[#0b0e14] pb-32 text-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-28 sm:pt-36">
        <p className="text-sm uppercase tracking-[0.26em] text-[#f5c66b]">
          iProp · The New-Launch Edit
        </p>
        <h1
          className="mt-6 max-w-4xl text-5xl leading-[1.04] sm:text-7xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Singapore’s new launches, mapped and written.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          Explore every development on an interactive 3D map of the island, then
          read the stories behind them — and step straight into each project’s
          showcase.
        </p>
      </section>

      {/* ── Interactive map teaser ───────────────────────────── */}
      <section className="mx-auto mt-14 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#161430] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]">
          <iframe
            src="/map"
            title="Explore Singapore new launches in 3D"
            className="h-[62vh] min-h-[420px] w-full border-0"
            loading="eager"
          />
          {/* Caption bar over the live map */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0b0e14]/85 to-transparent p-6">
            <p className="max-w-sm text-sm text-white/75">
              Pan, tilt and zoom across the island. Tap any tower to step inside
              its showcase.
            </p>
            <Link
              href="/map"
              className="pointer-events-auto whitespace-nowrap rounded-full border border-[#f5c66b]/40 bg-[#0b0e14]/60 px-5 py-2.5 text-sm font-semibold text-[#f5c66b] backdrop-blur transition-colors hover:bg-[#f5c66b]/10"
            >
              Explore the map →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-6 sm:mt-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#f5c66b]">
              The iProp Edit
            </p>
            <h2
              className="mt-3 text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Featured
            </h2>
          </div>
          <Link
            href="/articles"
            className="whitespace-nowrap text-sm font-semibold text-[#f5c66b] transition-colors hover:text-white"
          >
            Read the journal →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 auto-rows-auto md:grid-cols-3 md:auto-rows-[230px] md:gap-5">
          {featured.map((a, i) => (
            <ArticleCard
              key={a.slug}
              article={a}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              big={i === 0}
            />
          ))}
        </div>
      </section>

      {/* ── Latest ───────────────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-6xl px-6 sm:mt-28">
        <div className="flex items-end justify-between gap-4">
          <h2
            className="text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Latest
          </h2>
          <Link
            href="/articles"
            className="whitespace-nowrap text-sm font-semibold text-[#f5c66b] transition-colors hover:text-white"
          >
            All stories →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 auto-rows-auto sm:grid-cols-3 sm:auto-rows-[260px] sm:gap-5">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </main>
  );
}
