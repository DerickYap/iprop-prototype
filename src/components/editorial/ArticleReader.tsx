import Link from "next/link";
import type { Article, ArticleBlock } from "@/data/articles";
import { getProject, formatPrice } from "@/data/projects";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "subhead":
      return (
        <h2
          className="mt-12 text-2xl text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <figure className="my-12 border-l-2 border-[#f5c66b] pl-6">
          <blockquote
            className="text-2xl leading-snug text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 text-sm uppercase tracking-[0.18em] text-[#f5c66b]">
              {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case "image":
      return (
        <figure className="my-12 overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.caption ?? ""}
            className="w-full object-cover"
          />
          {block.caption && (
            <figcaption className="bg-[#100e22] px-5 py-3 text-sm text-white/55">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return (
        <p className="mt-6 text-lg leading-relaxed text-white/75">
          {block.text}
        </p>
      );
  }
}

/** Reading-page template for /articles/[slug]. */
export function ArticleReader({ article }: { article: Article }) {
  const project = getProject(article.projectSlug);

  return (
    <article className="min-h-dvh bg-[#0b0e14] pb-32 text-white">
      {/* Editorial hero */}
      <header className="relative">
        <div className="absolute inset-0">
          <span
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.cover})` }}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-[#0b0e14]/30"
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-40 sm:pt-56">
          <Link
            href="/articles"
            className="text-sm text-white/60 transition-colors hover:text-[#f5c66b]"
          >
            ← The iProp Edit
          </Link>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#f5c66b]">
            {article.category}
          </p>
          <h1
            className="mt-4 text-4xl leading-[1.08] sm:text-6xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {article.headline}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-white/70">
            {article.dek}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/55">
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <span>{article.readMins} min read</span>
            <span aria-hidden>·</span>
            <span>{article.date}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        {/* View the project CTA */}
        {project && (
          <Link
            href={`/projects/${project.slug}`}
            className="group mt-16 flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#161430] p-6 transition-colors hover:border-[#f5c66b]/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#f5c66b]">
                The project
              </p>
              <p
                className="mt-2 text-2xl text-white"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {project.name}
              </p>
              <p className="mt-1 text-sm text-white/55">
                {project.developer} · {project.district} · from{" "}
                {formatPrice(project.priceFrom)}
              </p>
            </div>
            <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#f5c66b]/40 px-5 py-2.5 text-sm font-semibold text-[#f5c66b] transition-transform group-hover:translate-x-1">
              View the project →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
