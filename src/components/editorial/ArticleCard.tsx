"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Article } from "@/data/articles";

/**
 * Image-backed editorial card. `big` toggles the feature treatment (large
 * headline + visible dek) — driven by the parent's tile size, not the article
 * data. The mosaic grid placement (column/row spans) is applied via `className`.
 * Links through to the article reading page.
 */
export function ArticleCard({
  article,
  className = "",
  big = false,
}: {
  article: Article;
  className?: string;
  big?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative ${className}`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#161430] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)]"
      >
        {/* Cover */}
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          style={{ backgroundImage: `url(${article.cover})` }}
        />
        {/* Twilight scrim for legibility */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/55 to-transparent"
        />

        <div className="relative z-10 flex flex-col gap-3 p-5 sm:p-6">
          <span className="w-fit rounded-full border border-[#f5c66b]/40 bg-[#0b0e14]/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5c66b] backdrop-blur">
            {article.category}
          </span>

          <h3
            className={`text-white ${
              big ? "text-3xl leading-[1.1] sm:text-4xl" : "text-xl leading-snug"
            }`}
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {article.headline}
          </h3>

          {big && (
            <p className="max-w-prose text-sm leading-relaxed text-white/70">
              {article.dek}
            </p>
          )}

          <div className="mt-1 flex items-center gap-2 text-[12px] text-white/55">
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <span>{article.readMins} min read</span>
            <span aria-hidden>·</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
