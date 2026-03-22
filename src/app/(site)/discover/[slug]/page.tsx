import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/sanity/fetch";
import ProjectPageClient from "./ProjectPageClient";



interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
