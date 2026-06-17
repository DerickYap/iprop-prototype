"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { relatedArticles } from "@/data/articles";

/**
 * "Related reading" row for a project showcase. Styled entirely through the
 * showcase theme variables (`--sc-*`), so it adopts whatever theme wraps it —
 * the standard ShowcaseRenderer themes or River Modern's mapped palette.
 */
export function RelatedArticles({ slug }: { slug: string }) {
  const items = relatedArticles(slug, 3);
  if (items.length === 0) return null;

  const muted = "color-mix(in srgb, var(--sc-muted) 25%, transparent)";

  return (
    <section
      className="border-t px-6 py-16 sm:py-24"
      style={{ borderColor: muted }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="text-sm uppercase tracking-[0.2em]"
          style={{ color: "var(--sc-accent)" }}
        >
          The iProp Edit
        </p>
        <h2
          className="mt-3 text-3xl sm:text-4xl"
          style={{
            fontFamily: "var(--sc-font-display)",
            color: "var(--sc-text)",
          }}
        >
          Related reading
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {items.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                href={`/articles/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors"
                style={{
                  borderColor: muted,
                  background: "var(--sc-surface)",
                }}
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${a.cover})` }}
                  />
                </span>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--sc-accent)" }}
                  >
                    {a.category}
                  </span>
                  <h3
                    className="text-lg leading-snug"
                    style={{
                      fontFamily: "var(--sc-font-display)",
                      color: "var(--sc-text)",
                    }}
                  >
                    {a.headline}
                  </h3>
                  <div
                    className="mt-auto flex items-center gap-2 pt-2 text-[12px]"
                    style={{ color: "var(--sc-muted)" }}
                  >
                    <span>{a.readMins} min read</span>
                    <span aria-hidden>·</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
