"use client";

import { motion } from "motion/react";

/** Full-bleed editorial standfirst that breaks up the mosaic flow. */
export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <section className="border-y border-white/10 bg-[#100e22] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-3xl leading-[1.2] text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          “{children}”
        </motion.blockquote>
        {attribution && (
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#f5c66b]">
            {attribution}
          </p>
        )}
      </div>
    </section>
  );
}
