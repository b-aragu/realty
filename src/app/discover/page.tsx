import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Discover Developments",
  description:
    "Explore premier residential developments by Wande Realty. Off-plan apartments, completed homes, and upcoming projects across Kenya.",
};

export default function DiscoverPage() {
  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              Discover
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              Explore our curated portfolio of residential developments across
              Kenya — from Nairobi&apos;s suburbs to the Indian Ocean coast.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
