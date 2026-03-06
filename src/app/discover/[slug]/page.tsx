"use client";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import CTAButton from "@/components/ui/CTAButton";
import { projects } from "@/data/projects";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-[#eaeff3] rounded-sm flex items-center justify-center">
      <p className="text-sm text-[#6b7c8a]">Loading map…</p>
    </div>
  ),
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectPageClient project={project} />;
}

function ProjectPageClient({ project }: { project: (typeof projects)[0] }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})`, backgroundColor: "#dce3ea" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131110]/70 via-[#131110]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-12">
          <span className="inline-block px-3 py-1 text-xs tracking-wide bg-[#ffc14d] text-[#131110] font-semibold mb-4 rounded-sm">
            {project.completionStatus}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
            {project.title}
          </h1>
          <p className="text-lg text-white/80">{project.location}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] mb-3 font-medium">The Vision</p>
            <h2 className="font-playfair text-2xl md:text-3xl text-[#2f4858] mb-6">{project.tagline}</h2>
            <p className="text-[#6b7c8a] leading-relaxed text-lg">{project.story}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-[#eaeff3]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <Gallery images={project.gallery} title={project.title} />
          </AnimatedSection>
        </div>
      </section>

      {/* Unit Types */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Floor Plans</p>
              <h2 className="font-playfair text-3xl text-[#2f4858]">Unit Types</h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.unitTypes.map((unit, i) => (
              <AnimatedSection key={unit.name} delay={i * 0.1}>
                <div className="bg-white border border-[#eaeff3] rounded-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-playfair text-lg text-[#2f4858] mb-2">{unit.name}</h3>
                  <div className="text-sm text-[#6b7c8a] space-y-1 mb-4">
                    <p>{unit.size}</p>
                    <p>{unit.bedrooms} Bed · {unit.bathrooms} Bath</p>
                  </div>
                  <p className="text-lg font-semibold text-[#131110]">{unit.price}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 lg:py-24 bg-[#eaeff3]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Features</p>
              <h2 className="font-playfair text-3xl text-[#2f4858]">Amenities</h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {project.amenities.map((a, i) => (
              <AnimatedSection key={a} delay={i * 0.05}>
                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-[#eaeff3] rounded-sm">
                  <span className="text-[#ffc14d]">✦</span>
                  <span className="text-sm text-[#131110]">{a}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Location</p>
              <h2 className="font-playfair text-3xl text-[#2f4858]">Where to Find Us</h2>
              <div className="jp-divider mx-auto" />
            </div>
            <div className="h-80">
              <MapComponent
                locations={[
                  {
                    name: project.title,
                    coordinates: [project.coordinates.lng, project.coordinates.lat],
                    description: project.location,
                  },
                ]}
                center={[project.coordinates.lng, project.coordinates.lat]}
                zoom={14}
                className="h-full shadow-sm"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Investment Highlights */}
      {project.investmentHighlights && (
        <section className="py-16 lg:py-24 bg-[#eaeff3]/40">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] mb-3 font-medium">Investment</p>
              <h2 className="font-playfair text-3xl text-[#2f4858] mb-8">Why Invest Here</h2>
              <ul className="space-y-3">
                {project.investmentHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="text-[#ffc14d] mt-0.5">✦</span>
                    <span className="text-[#6b7c8a]">{h}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#2f4858]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="jp-divider mx-auto !bg-[#ffc14d]" />
            <h2 className="font-playfair text-3xl text-white mb-4 mt-6">
              Interested in {project.title}?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Get in touch with our team for pricing, floor plans, and to schedule a site visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact" variant="gold">
                Book a Site Visit
              </CTAButton>
              <CTAButton
                href={`https://wa.me/254712678334?text=Hi, I'm interested in ${project.title}`}
                variant="outline"
                className="!border-white/30 !text-white hover:!bg-white hover:!text-[#2f4858]"
              >
                WhatsApp Us
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
