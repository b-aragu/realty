"use client";

import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import TourLocationGrid from "@/components/TourLocationGrid";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Project, UnitType } from "@/data/projects";
import ShareButton from "@/components/ShareButton";
import { buildTrackedPageUrl, buildWhatsAppHref } from "@/lib/whatsapp";
import EnquiryPanel from "@/components/EnquiryPanel";
import { SITE_URL } from "@/lib/seo";

export default function ProjectPageClient({ project }: { project: Project }) {
  const {
    title: projectTitle,
    location: projectLocation,
    completionDate: projectCompletionDate,
    unitTypes: projectUnitTypes,
    tagline: projectTagline,
    description: projectDescription,
    story: projectStory,
    amenities: projectAmenities = [],
    nearbyLocations: projectNearbyLocations = [],
    investmentHighlights: projectHighlights = [],
  } = project;

  const projectPath = `/discover/${project.slug}`;
  const trackedProjectUrl = buildTrackedPageUrl(projectPath, "project_detail");
  const projectWhatsAppLink = buildWhatsAppHref({
    intro: `Hi, I'm interested in enquiry for ${projectTitle}.`,
    pageUrl: trackedProjectUrl,
    source: "project_detail",
  });

  return (
    <div className="bg-[#f8f7f4] font-montserrat font-extralight tracking-[0.04em] text-[#1c2340] overflow-x-hidden">
      
      {/* ══ HERO — LIGHT TWO-COLUMN ══ */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[52%_48%] min-h-[100svh] overflow-hidden bg-[#f8f7f4] pt-24 lg:pt-0">
        <div className="absolute -bottom-[6%] -left-[1%] font-noto font-extralight text-[52vw] leading-none text-[#1c2340]/[0.028] pointer-events-none select-none z-0">居</div>

        {/* LEFT content */}
        <div className="relative z-10 flex flex-col justify-center px-6 lg:pl-16 lg:pr-18 py-16 lg:py-0">
          
          <AnimatedSection>
            {/* STATUS BADGE — Japanese editorial style */}
            <div className="inline-flex flex-col w-fit mb-10 relative before:block before:w-full before:h-px before:bg-[#c49a3c] before:mb-3 after:block after:w-full after:h-px after:bg-[#dde1ee] after:mt-3">
              <div className="flex items-center gap-6">
                <span className="font-noto font-extralight text-[0.55rem] tracking-[0.5em] text-[#c49a3c]/60 [writing-mode:vertical-rl] leading-none">工事中</span>
                <div className="w-px h-9 bg-[#dde1ee] shrink-0" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] shrink-0 animate-pulse" />
                    <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#1c2340]">{project.completionStatus || "Upcoming"}</span>
                  </div>
                  <span className="text-[0.44rem] tracking-[0.28em] uppercase text-[#8b91a8] pl-4">Est. Completion {projectCompletionDate}</span>
                </div>
              </div>
            </div>

            <h1 className="font-cormorant font-light text-[clamp(3rem,5.5vw,5.5rem)] leading-[1.04] text-[#1c2340] tracking-[-0.01em] mb-3">
              {projectTitle.split(" ").map((word, i) => (
                <span key={i}>{word}<br/></span>
              ))}
            </h1>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-[#8b91a8] mb-12">{projectLocation}</p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-y-6 items-center pt-8 border-t border-[#dde1ee]">
              <div className="flex flex-col gap-1.5 pr-8 lg:pr-10 border-r border-[#dde1ee]">
                <span className="font-cormorant font-light text-2xl lg:text-3xl text-[#1c2340] leading-none">{project.totalUnits || projectUnitTypes.length}+</span>
                <span className="text-[0.44rem] tracking-[0.3em] uppercase text-[#8b91a8]">Total Units</span>
              </div>
              <div className="flex flex-col gap-1.5 pl-8 lg:pl-10 pr-8 lg:pr-10 border-r border-[#dde1ee]">
                <span className="font-cormorant font-light text-2xl lg:text-3xl text-[#1c2340] leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#1c2340] to-[#3a5299]">{project.floors || "G+10"}</span>
                <span className="text-[0.44rem] tracking-[0.3em] uppercase text-[#8b91a8]">Floors</span>
              </div>
               <div className="flex flex-col gap-1.5 pl-8 lg:pl-10">
                <span className="font-cormorant font-light text-2xl lg:text-3xl text-[#1c2340] leading-none">{project.sqmRange || "50–150"}</span>
                <span className="text-[0.44rem] tracking-[0.3em] uppercase text-[#8b91a8]">sqm Range</span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* RIGHT — image panel */}
        <div className="relative overflow-hidden h-[50vh] lg:h-auto">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${project.heroImage || "/images/projects/blossom-ivy-hero.jpg"})` }}
          />
          <div className="absolute inset-0 bg-[#1c2340]/20" />
          <div className="absolute top-6 bottom-6 left-6 right-6 border border-white/20 pointer-events-none z-10" />
          
          <span className="absolute top-1/2 left-4 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-noto font-extralight text-[0.46rem] tracking-[0.45em] text-white/30 pointer-events-none">
             プロジェクト · ナイロビ
          </span>
          <span className="absolute bottom-8 right-8 font-cormorant italic font-light text-[0.68rem] tracking-[0.14em] text-white/60 z-10">
            {projectTitle}
          </span>
        </div>
      </section>

      {/* ══ THE VISION ══ */}
      <section className="py-24 lg:py-28 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <div className="lg:sticky lg:top-32">
              <AnimatedSection>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">The Vision</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] text-[#1c2340] mb-6">
                  {projectTagline}
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mb-6" />
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[38ch] mb-10">
                  {projectDescription}
                </p>

                <div className="grid grid-cols-2 lg:flex lg:items-center py-8 border-y border-[#dde1ee] mb-12 gap-y-10 lg:gap-y-0">
                  <div className="pr-6 border-r border-[#dde1ee]">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.startingPrice}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">From</span>
                  </div>
                  <div className="pl-6 lg:px-6 lg:border-r border-[#dde1ee]">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.completionStatus}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">Completion</span>
                  </div>
                  <div className="pr-6 border-r border-[#dde1ee] lg:px-6">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.location.split(',')[0]}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">District</span>
                  </div>
                  <div className="pl-6">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{projectUnitTypes.length}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">Options</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="pt-2">
              <AnimatedSection delay={0.2}>
                <p className="text-[0.75rem] leading-[2.2] tracking-[0.06em] text-[#1c2340]/75 mb-8">
                  {projectStory}
                </p>
                <div className="pl-8 py-8 border-l-2 border-[#c49a3c] my-10">
                  <p className="font-cormorant font-light italic text-[1.4rem] leading-[1.55] text-[#3a5299] tracking-[0.01em]">
                    "{project.pullQuote || "Creating homes that balance comfort, elegance, and architectural excellence in Nairobi's most desirable districts."}"
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section className="py-24 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">The Development</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Visual <em className="italic text-[#3a5299]">Overview</em>
                </h2>
              </div>
            </div>
            
            {/* Standard Shared Component Reused */}
            <Gallery images={project.gallery || []} title={projectTitle} />

          </AnimatedSection>
        </div>
      </section>

      {/* Visual media now combined into Tour & Location at the bottom */}
      {/* ══ UNIT TYPES ══ */}
      <section className="py-24 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">Floor Plans</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Unit <em className="italic text-[#3a5299]">Types</em>
                </h2>
              </div>
              <p className="text-[0.6rem] leading-[1.9] tracking-[0.07em] text-[#8b91a8] max-w-[30ch] md:text-right">
                {project.unitTypesNote || "Flexible payment plans available.\nContact us for detailed floor plans."}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#dde1ee]">
            {projectUnitTypes.map((unit: UnitType, i: number) => {
              const CardWrapper = (unit.linkedPropertySlug || unit.linkedPropertyId) ? Link : "div";
              const wrapperProps = (unit.linkedPropertySlug || unit.linkedPropertyId) 
                ? { href: `/residences/${unit.linkedPropertySlug || unit.linkedPropertyId}` } 
                : {};

              return (
                <AnimatedSection key={unit.name} delay={i * 0.1}>
                  {/* @ts-ignore - Polymorphic component bypass */}
                  <CardWrapper {...wrapperProps} className="block bg-[#f8f7f4] p-10 relative group hover:bg-[#2e4480]/[0.025] transition-colors cursor-pointer h-full border border-transparent">
                    <div className="absolute top-0 left-0 h-px bg-[#c49a3c] w-8 group-hover:w-full transition-all duration-400 ease-in-out" />
                    
                    <p className="font-cormorant font-light text-[0.75rem] text-[#dde1ee] tracking-[0.1em] mb-7">0{i+1}</p>
                    <h3 className="font-cormorant font-light text-[1.4rem] text-[#1c2340] leading-[1.15] mb-1.5">{unit.name}</h3>
                    <p className="text-[0.52rem] tracking-[0.2em] uppercase text-[#3a5299] mb-7">{unit.subName || "Premium · Configuration"}</p>
                    
                    <div className="flex flex-col gap-2.5 py-5.5 border-t border-b border-[#dde1ee] mb-7">
                      <div className="flex justify-between items-center">
                        <span className="text-[0.48rem] tracking-[0.2em] uppercase text-[#8b91a8]">Size</span>
                        <span className="font-cormorant font-light text-[0.95rem] text-[#1c2340]">{unit.size}</span>
                      </div>
                      {unit.occupancy && (
                        <div className="flex justify-between items-center">
                          <span className="text-[0.48rem] tracking-[0.2em] uppercase text-[#8b91a8]">Occupancy</span>
                          <span className="font-cormorant font-light text-[0.95rem] text-[#1c2340]">{unit.occupancy}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-[0.48rem] tracking-[0.2em] uppercase text-[#8b91a8]">Configuration</span>
                        <span className="font-cormorant font-light text-[0.95rem] text-[#1c2340]">{unit.bedrooms} Bed · {unit.bathrooms} Bath</span>
                      </div>
                    </div>
                    
                    <p className="text-[0.44rem] tracking-[0.28em] uppercase text-[#8b91a8] mb-1">Starting Price</p>
                    <p className="font-cormorant font-light text-[1.7rem] text-[#1c2340] leading-none mb-6">{unit.price}</p>
                    
                    {!unit.linkedPropertyId ? (
                      <a 
                        href={`https://wa.me/254140530539?text=${encodeURIComponent(`Hi, I'd like to request the floor plan for ${unit.name} at ${project.title}. Page Link: ${typeof window !== 'undefined' ? window.location.href : 'https://wanderealty.com/discover/' + project.slug}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 mt-4 text-[0.52rem] tracking-[0.26em] uppercase text-[#3a5299] group/link hover:text-[#c49a3c] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Request Floor Plan
                        <span className="block w-6 h-px bg-[#3a5299] group-hover/link:w-9 group-hover/link:bg-[#c49a3c] transition-all duration-300" />
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-3 mt-4 text-[0.52rem] tracking-[0.26em] uppercase text-[#3a5299] group/link">
                        View Property
                        <span className="block w-6 h-px bg-[#3a5299] group-hover/link:w-9 transition-all duration-300" />
                      </div>
                    )}
                  </CardWrapper>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ AMENITIES ══ */}
      <section className="py-24 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[36%_64%] gap-12 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <AnimatedSection>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">Features</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Building<br/><em className="italic text-[#3a5299]">Amenities</em>
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] my-6" />
                <p className="text-[0.65rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[28ch]">
                  {project.amenitiesSubtitle || "Every detail considered — from the rooftop to the basement. Designed to complement the way you live."}
                </p>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {projectAmenities.map((a: string, i: number) => (
                <AnimatedSection key={a} delay={i * 0.05}>
                  <div className="p-6 border-b border-[#dde1ee] sm:odd:border-r hover:bg-[#2e4480]/[0.025] transition-colors flex items-start gap-4 h-full group">
                    <div className="w-5 h-px bg-[#c49a3c] mt-3 shrink-0 group-hover:w-8 transition-all duration-400" />
                    <span className="text-[0.65rem] leading-[1.6] tracking-[0.06em] text-[#1c2340] pt-1">{a}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TOUR & LOCATION ══ */}
      <section className="py-24 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <TourLocationGrid
            title={projectTitle}
            location={projectLocation}
            videoUrl={project.videoUrl}
            coordinates={project.coordinates}
            projectName={projectTitle}
            nearbyLocations={projectNearbyLocations}
            rawObject={{
              id: project.slug,
              title: projectTitle,
              location: projectLocation,
              area: "",
              price: project.startingPrice,
              priceNumber: 0,
              bedrooms: 0,
              bathrooms: 0,
              sqm: 0,
              propertyType: "Project",
              status: "Off-Plan",
              description: "",
              image: "",
              images: [],
              amenities: [],
              coordinates: project.coordinates,
              projectName: projectTitle
            }}
          />
        </div>
      </section>

      {/* ══ INVESTMENT ══ */}
      {projectHighlights.length > 0 && (
        <section className="relative py-24 bg-[#f8f7f4] border-b border-[#dde1ee] overflow-hidden">
          <div className="absolute -bottom-[8%] -right-[1%] font-noto font-extralight text-[40vw] leading-none text-[#1c2340]/[0.025] pointer-events-none select-none z-0">投</div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-16 lg:gap-24 items-start">
              
              <div>
                <AnimatedSection>
                  <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">Why Invest</p>
                  <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-[#1c2340]">
                    A Compelling<br/><em className="italic text-[#3a5299]">Opportunity</em>
                  </h2>
                  <div className="w-8 h-px bg-[#c49a3c] my-5" />
                  <p className="text-[0.65rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[34ch]">
                    {project.investmentDescription || "This location has consistently outperformed the broader property market — driven by its dense professional population and limited land supply."}
                  </p>
                  <div className="mt-10 pt-8 border-t border-[#dde1ee]">
                    <p className="font-cormorant font-light text-5xl text-[#1c2340] leading-none">
                      {project.rentalYield || "7–10"}<span className="text-[#c49a3c]">%</span>
                    </p>
                    <p className="text-[0.48rem] tracking-[0.3em] uppercase text-[#8b91a8] mt-2">Projected Annual Rental Yield</p>
                  </div>
                </AnimatedSection>
              </div>

              <div className="flex flex-col pt-2">
                {projectHighlights.map((h: string, i: number) => (
                  <AnimatedSection key={h} delay={0.1 * i}>
                    <div className="flex items-start gap-6 py-6 border-b border-[#dde1ee] first:border-t hover:pl-2 transition-all duration-350 cursor-default">
                      <span className="font-cormorant font-light text-base text-[#dde1ee] shrink-0 min-w-[1.8rem] pt-0.5">0{i+1}</span>
                      <div>
                        <p className="text-[0.58rem] leading-[1.8] tracking-[0.06em] text-[#8b91a8]">{h}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ══ ENQUIRY PANEL ══ */}
      <section className="py-24 lg:py-32 border-b border-[#dde1ee] bg-[#fbfcff]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex justify-center">
          <EnquiryPanel 
            property={{
              title: projectTitle,
              location: projectLocation,
              unitType: "Premium Development",
              price: project.startingPrice,
              slug: project.slug,
              isProject: true
            }}
          />
        </div>
      </section>

      {/* ══ FLOATING ENQUIRE PILL — Japanese Minimalist Refinement ══ */}
      <div className="fixed bottom-24 right-8 z-50 flex items-center bg-[#1c2340]/95 backdrop-blur-md text-white border border-[#c49a3c]/30 shadow-[0_8px_32px_rgba(28,35,64,0.35)] hover:border-[#c49a3c]/60 hover:shadow-[0_12px_44px_rgba(28,35,64,0.5)] transition-all duration-400 group/pill overflow-hidden">
        <a
          href={projectWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 pl-7 pr-5 py-4 hover:bg-[#2e4480]/50 transition-colors duration-400"
        >
          <span className="text-[0.46rem] tracking-[0.45em] uppercase font-light">Enquire</span>
        </a>
        <div className="w-px h-5 bg-[#c49a3c]/20 shrink-0" />
        <ShareButton 
          title={projectTitle} 
          url={typeof window !== 'undefined' ? window.location.href : `${SITE_URL}${projectPath}`}
          className="flex items-center gap-3 px-6 py-4 hover:bg-[#2e4480]/50 text-white transition-all duration-400"
        />
      </div>

    </div>
  );
}
