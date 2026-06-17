import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";
import { ArticleReader } from "@/components/editorial/ArticleReader";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.headline} | The iProp Edit`,
    description: article.dek,
    openGraph: {
      title: article.headline,
      description: article.dek,
      images: [article.cover],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticleReader article={article} />;
}
