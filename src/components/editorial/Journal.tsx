"use client";

import { motion } from "motion/react";
import {
  CATEGORIES,
  categoryArticles,
  type Article,
  type Category,
} from "@/data/articles";
import { ArticleCard } from "./ArticleCard";
import { PullQuote } from "./PullQuote";

// Deterministic bento templates: each fully tiles a rectangle for a given count,
// so sections never leave holes regardless of how many articles they hold. Class
// strings are LITERAL — Tailwind v4 scans source, so no `grid-cols-${n}`.
const BENTO: Record<number, { cols: string; cells: string[] }> = {
  1: { cols: "md:grid-cols-1", cells: [""] },
  2: { cols: "md:grid-cols-2", cells: ["", ""] },
  3: {
    cols: "md:grid-cols-3",
    cells: ["md:col-span-2 md:row-span-2", "", ""],
  },
  4: {
    cols: "md:grid-cols-3",
    cells: ["md:row-span-2", "", "", "md:col-span-2"],
  },
  5: {
    cols: "md:grid-cols-4",
    cells: ["md:col-span-2 md:row-span-2", "", "", "", ""],
  },
  6: {
    cols: "md:grid-cols-3",
    cells: ["md:col-span-2 md:row-span-2", "", "", "", "", ""],
  },
};

function bentoTemplate(n: number): { cols: string; cells: string[] } {
  if (BENTO[n]) return BENTO[n];
  // Fallback for larger sections: uniform tiles with dense backfill.
  return { cols: "md:grid-cols-4 md:grid-flow-dense", cells: Array(n).fill("") };
}

/** A cell is the oversized feature tile when it spans 2×2. */
const isBigCell = (cell: string) =>
  cell.includes("col-span-2") && cell.includes("row-span-2");

function Mosaic({ items }: { items: Article[] }) {
  const { cols, cells } = bentoTemplate(items.length);
  return (
    <div
      className={`grid grid-cols-1 gap-4 auto-rows-auto md:auto-rows-[220px] md:gap-5 ${cols}`}
    >
      {items.map((a, i) => (
        <ArticleCard
          key={a.slug}
          article={a}
          className={cells[i] ?? ""}
          big={isBigCell(cells[i] ?? "")}
        />
      ))}
    </div>
  );
}

function CategorySection({ id, blurb }: { id: Category; blurb: string }) {
  const items = categoryArticles(id);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-7 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {id}
        </h2>
        <p className="max-w-md text-sm text-white/55 sm:text-right">{blurb}</p>
      </motion.div>
      <Mosaic items={items} />
    </section>
  );
}

/**
 * The full editorial Journal: masthead followed by one section per category, the
 * asymmetric magazine mosaic within each, and a full-bleed pull-quote band
 * breaking up the flow.
 */
export function Journal() {
  return (
    <div className="bg-[#0b0e14] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-14 pt-28 sm:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.24em] text-[#f5c66b]"
        >
          The iProp Edit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          The Journal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60"
        >
          Field notes on the developments reshaping the island — read the story,
          then step inside the project itself.
        </motion.p>
      </header>

      {CATEGORIES.map((cat, i) => (
        <div key={cat.id}>
          <CategorySection id={cat.id} blurb={cat.blurb} />
          {/* Break the flow with a pull-quote after the first section. */}
          {i === 0 && (
            <div className="my-16 sm:my-20">
              <PullQuote attribution="The iProp Edit">
                The map shows you where. These stories tell you why.
              </PullQuote>
            </div>
          )}
          {i > 0 && i < CATEGORIES.length - 1 && (
            <div className="h-16 sm:h-20" />
          )}
        </div>
      ))}

      <div className="h-4" />
    </div>
  );
}
