import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, PROJECTS } from "@/lib/projects";
import ProjectContent from "./project-content";

/* ─── Static generation ─── */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/* ─── Per-page metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: project.coverImage }],
    },
  };
}

/* ─── Page ─── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const next = getNextProject(slug);

  return <ProjectContent next={next} project={project} />;
}
