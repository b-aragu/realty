"use client";

import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import TourLocationGrid from "@/components/TourLocationGrid";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Project, UnitType } from "@/data/projects";

export default function ProjectPageClient({ project }: { project: Project }) {
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
                    <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#1c2340]">{project.completionStatus}</span>
                  </div>
                  <span className="text-[0.44rem] tracking-[0.28em] uppercase text-[#8b91a8] pl-4">Est. Completion {project.completionDate}</span>
                </div>
              </div>
            </div>

            <h1 className="font-cormorant font-light text-[clamp(3rem,5.5vw,5.5rem)] leading-[1.04] text-[#1c2340] tracking-[-0.01em] mb-3">
              {project.title.split(' ').map((word, i) => (
                <span key={i}>{word}<br/></span>
              ))}
            </h1>
            <p className="text-[0.58rem] tracking-[0.28em] uppercase text-[#8b91a8] mb-12">{project.location}</p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-y-6 items-center pt-8 border-t border-[#dde1ee]">
              <div className="flex flex-col gap-1.5 pr-8 lg:pr-10 border-r border-[#dde1ee]">
                <span className="font-cormorant font-light text-2xl lg:text-3xl text-[#1c2340] leading-none">{project.totalUnits || project.unitTypes.length}+</span>
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
            style={{ backgroundImage: `url(${project.heroImage})` }}
          />
          <div className="absolute inset-0 bg-[#1c2340]/20" />
          <div className="absolute top-6 bottom-6 left-6 right-6 border border-white/20 pointer-events-none z-10" />
          
          <span className="absolute top-1/2 left-4 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-noto font-extralight text-[0.46rem] tracking-[0.45em] text-white/30 pointer-events-none">
             プロジェクト · ナイロビ
          </span>
          <span className="absolute bottom-8 right-8 font-cormorant italic font-light text-[0.68rem] tracking-[0.14em] text-white/60 z-10">
            {project.title}
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
                  {project.tagline}
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mb-6" />
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[38ch] mb-10">
                  {project.description}
                </p>
                <div className="grid grid-cols-3 border-t border-[#dde1ee] pt-10">
                  <div className="pr-6 border-r border-[#dde1ee]">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.completionDate.split(' ')[1] || "2026"}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">Completion</span>
                  </div>
                  <div className="px-6 border-r border-[#dde1ee]">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.location.split(',')[0]}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">District</span>
                  </div>
                  <div className="pl-6">
                    <span className="block font-cormorant font-light text-2xl text-[#1c2340] leading-none mb-1.5">{project.unitTypes.length}</span>
                    <span className="block text-[0.46rem] tracking-[0.28em] uppercase text-[#8b91a8]">Options</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="pt-2">
              <AnimatedSection delay={0.2}>
                <p className="text-[0.75rem] leading-[2.2] tracking-[0.06em] text-[#1c2340]/75 mb-8">
                  {project.story}
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
            <Gallery images={project.gallery} title={project.title} />

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
            {project.unitTypes.map((unit: UnitType, i: number) => (
              <AnimatedSection key={unit.name} delay={i * 0.1}>
                <div className="bg-[#f8f7f4] p-10 relative group hover:bg-[#2e4480]/[0.025] transition-colors cursor-pointer h-full border border-transparent">
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
                  
                  <div className="inline-flex items-center gap-3 mt-4 text-[0.52rem] tracking-[0.26em] uppercase text-[#3a5299] group/link">
                    Request Floor Plan
                    <span className="block w-6 h-px bg-[#3a5299] group-hover/link:w-9 transition-all duration-300" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
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
              {project.amenities.map((a: string, i: number) => (
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
            title={project.title}
            location={project.location}
            videoUrl={project.videoUrl}
            coordinates={project.coordinates}
            projectName={project.title}
            rawObject={{
              id: project.slug,
              title: project.title,
              location: project.location,
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
              projectName: project.title
            }}
          />
        </div>
      </section>

      {/* ══ INVESTMENT ══ */}
      {project.investmentHighlights && (
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
                {project.investmentHighlights.map((h: string, i: number) => (
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

      {/* ══ CTA ══ */}
      <section className="py-28 border-b border-[#dde1ee]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <AnimatedSection>
              <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#3a5299] mb-4">Interested in {project.title}?</p>
              <h2 className="font-cormorant font-light text-[clamp(2.2rem,3.5vw,3.4rem)] leading-[1.1] text-[#1c2340]">
                Begin Your<br/><em className="italic text-[#3a5299]">Journey</em><br/>Here
              </h2>
              <div className="w-8 h-px bg-[#c49a3c] my-6" />
              <p className="text-[0.68rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[36ch]">
                Our team will walk you through pricing, floor plans, payment schedules, and arrange a private site visit.
              </p>
              
              <div className="mt-11 flex flex-col sm:flex-row sm:items-center gap-8 lg:gap-12">
                <a href="/contact" className="group inline-flex items-center gap-3.5 text-[0.6rem] tracking-[0.28em] uppercase text-[#1c2340] hover:text-[#3a5299] transition-all duration-300">
                  Book a Site Visit
                  <span className="block w-8 h-px bg-[#1c2340] group-hover:bg-[#3a5299] group-hover:w-12 transition-all duration-400" />
                </a>
                <a href={`https://wa.me/254140530539?text=Hi, I'm interested in ${project.title}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.54rem] tracking-[0.24em] uppercase text-[#8b91a8] hover:text-[#25D366] transition-colors border-b border-transparent hover:border-[#25D366] pb-px">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-0 border-t border-[#dde1ee]">
                <div className="flex flex-col py-5 border-b border-[#dde1ee] gap-1">
                  <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">Phone</span>
                  <a href="tel:+254140530539" className="font-cormorant font-light text-base text-[#1c2340] hover:text-[#3a5299] transition-colors w-fit">+254 140 530 539</a>
                </div>
                <div className="flex flex-col py-5 border-b border-[#dde1ee] gap-1">
                  <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">Email</span>
                  <a href="mailto:hello@wanderealty.co.ke" className="font-cormorant font-light text-base text-[#1c2340] hover:text-[#3a5299] transition-colors w-fit">hello@wanderealty.co.ke</a>
                </div>
                <div className="flex flex-col py-5 border-b border-[#dde1ee] gap-1">
                  <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">Sales Office</span>
                  <span className="font-cormorant font-light text-base text-[#1c2340]">Yaya Centre, Kilimani, Nairobi</span>
                </div>
                <div className="flex flex-col py-5 border-b border-[#dde1ee] gap-1">
                  <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">Office Hours</span>
                  <span className="font-cormorant font-light text-base text-[#1c2340]">Mon – Sat, 8am – 6pm</span>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ══ FLOATING ENQUIRE PILL ══ */}
      <a
        href={`https://wa.me/254140530539?text=Hi, I'm interested in ${project.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-[#1c2340] text-white pl-6 pr-5 py-3.5 shadow-[0_4px_24px_rgba(28,35,64,0.35)] hover:bg-[#2e4480] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(28,35,64,0.5)]"
      >
        <span className="text-[0.5rem] tracking-[0.3em] uppercase">Enquire</span>
        <span className="w-px h-4 bg-white/20" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

    </div>
  );
}
