import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/sanity/fetch";
import ProjectPageClient from "./ProjectPageClient";
import type { Metadata } from "next";
import { buildNotFoundMetadata, buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const safeSlug = slug?.trim();
    if (!safeSlug) {
      return buildNotFoundMetadata("/discover");
    }

    const project = await getProjectBySlug(safeSlug);
    if (!project) {
      return buildNotFoundMetadata(`/discover/${safeSlug}`);
    }

    const description = project.description?.trim() || project.tagline?.trim() || `Discover ${project.title} with Wande Realty.`;

    return buildPageMetadata({
      title: `${project.title} | Wande Realty`,
      description,
      path: `/discover/${safeSlug}`,
      images: project.heroImage ? [project.heroImage] : undefined,
    });
  } catch (error) {
    console.error("Failed to generate project metadata:", error);
    return buildPageMetadata({
      title: "Developments & Off-Plan Projects | Wande Realty Kenya",
      description:
        "Explore premier residential developments by Wande Realty across Nairobi and the Kenyan Coast.",
      path: "/discover",
    });
  }
}
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
