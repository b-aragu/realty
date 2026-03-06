"use client";

import dynamic from "next/dynamic";
import AnimatedSection from "@/components/AnimatedSection";
import CTAButton from "@/components/ui/CTAButton";
import ProjectCard from "@/components/ProjectCard";
import PropertyCard from "@/components/PropertyCard";
import BlogCard from "@/components/BlogCard";
import { projects } from "@/data/projects";
import { properties } from "@/data/properties";
import { articles } from "@/data/articles";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-[#eaeff3] rounded-sm flex items-center justify-center">
      <p className="text-sm text-[#6b7c8a]">Loading map…</p>
    </div>
  ),
});

const mapLocations = [
  { name: "Nairobi", coordinates: [36.82, -1.29] as [number, number], description: "Capital city — Kilimani, Lavington, Westlands" },
  { name: "Kiambu", coordinates: [36.83, -1.17] as [number, number], description: "Suburban living near Nairobi" },
  { name: "Mombasa", coordinates: [39.66, -4.04] as [number, number], description: "Coastal city — beach properties" },
  { name: "Malindi", coordinates: [40.12, -3.22] as [number, number], description: "Beachfront villas & retreats" },
];

const lifestyleCategories = [
  { title: "Urban Living", description: "Modern apartments in Nairobi's vibrant neighbourhoods", image: "/images/lifestyle/urban.jpg", href: "/residences" },
  { title: "Beachfront Escapes", description: "Coastal villas along Kenya's Indian Ocean shoreline", image: "/images/lifestyle/beach.jpg", href: "/residences" },
  { title: "Family Homes", description: "Spacious residences designed for growing families", image: "/images/lifestyle/family.jpg", href: "/residences" },
  { title: "Investment Properties", description: "High-yield opportunities for savvy investors", image: "/images/lifestyle/investment.jpg", href: "/invest" },
];

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── Japanese-inspired with clean gradient */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero.jpg)", backgroundColor: "#c5d0d8" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f8fa]/95 via-[#f5f8fa]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <AnimatedSection delay={0.2}>
            <div className="jp-divider" />
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[#2f4858] leading-tight max-w-2xl">
              Find Your Space
              <br />
              <span className="text-[#5a73d7]">in Kenya</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <p className="mt-6 text-lg md:text-xl text-[#6b7c8a] max-w-lg leading-relaxed">
              Curated residences and investments in Nairobi, the Coast &amp; beyond.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.6}>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton href="/residences" variant="primary">
                Explore Residences
              </CTAButton>
              <CTAButton href="/discover" variant="outline">
                View Developments
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FEATURED DEVELOPMENTS ─── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Our Portfolio</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-4">
                Featured Developments
              </h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPLORE BY LIFESTYLE ─── */}
      <section className="py-24 lg:py-32 bg-[#eaeff3]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Lifestyle</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-4">
                Explore by Lifestyle
              </h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleCategories.map((cat, i) => (
              <AnimatedSection key={cat.title} delay={i * 0.1}>
                <a href={cat.href} className="group block">
                  <div className="relative h-72 rounded-sm overflow-hidden bg-[#dce3ea]">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${cat.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131110]/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-playfair text-xl text-white mb-1">{cat.title}</h3>
                      <p className="text-sm text-white/70">{cat.description}</p>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP DISCOVERY ─── Real MapLibre map */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Locations</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-4">
                Explore Kenya
              </h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 h-[450px]">
                <MapComponent
                  locations={mapLocations}
                  center={[37.9, -1.5]}
                  zoom={5.8}
                  className="h-full shadow-sm"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                {properties.slice(0, 3).map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── LATEST LISTINGS ─── */}
      <section className="py-24 lg:py-32 bg-[#eaeff3]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-2">Properties</p>
                <h2 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-2">Latest Listings</h2>
              </div>
              <CTAButton href="/residences" variant="outline">View All</CTAButton>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((prop, i) => (
              <AnimatedSection key={prop.id} delay={i * 0.08}>
                <PropertyCard property={prop} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNAL ─── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Insights</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-4">Insights &amp; Articles</h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {articles.slice(0, 2).map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.1}>
                <BlogCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── Wande deep teal with gold accent */}
      <section className="py-24 lg:py-32 bg-[#2f4858]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="jp-divider mx-auto !bg-[#ffc14d]" />
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4 mt-6">
              Ready to Find Your Home?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-10">
              Schedule a private viewing or speak with one of our property consultants today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact" variant="gold">
                Book a Viewing
              </CTAButton>
              <CTAButton href="/contact" variant="outline" className="!border-white/30 !text-white hover:!bg-white hover:!text-[#2f4858]">
                Contact an Agent
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
