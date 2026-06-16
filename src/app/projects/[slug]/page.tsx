import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { ShowcaseRenderer } from "@/components/showcase/ShowcaseRenderer";
import RiverModernClient from "@/components/showcase/river-modern/RiverModernClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline} | iProp`,
    description: `${project.name} by ${project.developer}. ${project.tagline}. New launch in ${project.district}, Singapore.`,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  // River Modern has a bespoke cinematic flythrough instead of the section system.
  if (slug === "river-modern") return <RiverModernClient />;
  return <ShowcaseRenderer project={project} />;
}
