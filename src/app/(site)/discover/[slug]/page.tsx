import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/sanity/fetch";
import ProjectPageClient from "./ProjectPageClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: project.title,
    description: project.description || project.tagline || `Discover ${project.title} with Wande Realty.`,
    openGraph: {
      title: `${project.title} | Wande Realty`,
      description: project.description || project.tagline || `Discover ${project.title} with Wande Realty.`,
      images: project.heroImage ? [{ url: project.heroImage, width: 1200, height: 630 }] : undefined,
      type: "website",
    },
  };
}
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
