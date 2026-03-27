"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import TourLocationGrid from "@/components/TourLocationGrid";
import ROICalculator from "@/components/ROICalculator";
import type { Property } from "@/data/properties";
import ShareButton from "@/components/ShareButton";
import { buildTrackedPageUrl, buildWhatsAppHref } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/seo";

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const propertyPath = `/residences/${property.slug}`;
  const trackedPropertyUrl = buildTrackedPageUrl(propertyPath, "residence_detail");
  const propertyWhatsAppLink = buildWhatsAppHref({
    intro: `Hi, I'm interested in enquiry for ${property.title}.`,
    pageUrl: trackedPropertyUrl,
    source: "residence_detail",
  });

  return (
    <>
      {/* ─── GALLERY ─── */}
      <section className="pt-6 lg:pt-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <Gallery images={property.images} title={property.title} />
          </AnimatedSection>
        </div>
      </section>

      {/* ─── DETAILS & SIDEBAR ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
            {/* Main Content */}
            <div>
              <AnimatedSection>
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dde1ee] pb-8 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#c49a3c]">
                        {property.status}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#dde1ee]" />
                      <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">
                        {property.propertyType}
                      </span>
                    </div>
                    <h1 className="font-cormorant font-light text-[clamp(2rem,3vw,3.2rem)] leading-[1.1] text-[#1c2340] mb-3">
                      {property.title}
                    </h1>
                    <p className="text-[0.68rem] tracking-[0.1em] text-[#8b91a8]">
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-1">
                      {property.status === "For Rent" ? "Monthly Rent" : "Asking Price"}
                    </p>
                    <p className="font-cormorant font-light text-3xl md:text-4xl text-[#1c2340]">
                      {property.price}
                    </p>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {[
                    { value: property.bedrooms, label: "Bedrooms" },
                    { value: property.bathrooms, label: "Bathrooms" },
                    { value: property.sqm, label: "Sq Metres" },
                  ].map((stat) => (
                    <div key={stat.label} className="border-l border-[#dde1ee] pl-6">
                      <p className="font-cormorant font-light text-[2rem] leading-none text-[#1c2340] mb-2">{stat.value}</p>
                      <p className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-12">
                  <h2 className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-6 flex items-center gap-3">
                    <span className="w-4 h-px bg-[#c49a3c]" /> About this property
                  </h2>
                  <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#1c2340]/80">
                    {property.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-12">
                  <h2 className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-6 flex items-center gap-3">
                    <span className="w-4 h-px bg-[#c49a3c]" /> Amenities & Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                    {property.amenities.map((item) => (
                      <div key={item} className="flex items-center gap-3 group">
                        <div className="w-1 h-1 rounded-full bg-[#c49a3c] transition-all duration-300 group-hover:w-2" />
                        <span className="text-[0.68rem] tracking-[0.12em] text-[#1c2340]/70 group-hover:text-[#1c2340] transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video / Virtual Tour if exists */}
                {property.videoUrl && (
                  <div className="mb-20">
                     <h2 className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-6 flex items-center gap-3">
                      <span className="w-4 h-px bg-[#c49a3c]" /> Virtual Tour
                    </h2>
                    <div className="aspect-video bg-[#f8f9fc] rounded-sm overflow-hidden border border-[#dde1ee]">
                       <iframe 
                        src={property.videoUrl.replace('watch?v=', 'embed/')} 
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <aside className="relative">
              <div className="sticky top-32 space-y-8">
                {/* Related Project */}
                {property.projectName && (
                   <div className="bg-[#1c2340] p-8 text-white">
                      <p className="text-[0.46rem] tracking-[0.4em] uppercase text-[#c49a3c] mb-2">Part of Project</p>
                      <h3 className="font-cormorant font-light text-2xl mb-6">{property.projectName}</h3>
                      {property.projectSlug && (
                        <Link 
                          href={`/discover/${property.projectSlug}`}
                          className="inline-flex items-center gap-3 text-[0.46rem] tracking-[0.3em] uppercase group"
                        >
                          View Full Project
                          <span className="w-8 h-px bg-[#c49a3c] transition-all duration-300 group-hover:w-12" />
                        </Link>
                      )}
                   </div>
                )}

                {/* Enquiry Card */}
                <div className="border border-[#dde1ee] p-8 bg-[#fbfcff]">
                  <h3 className="font-cormorant font-light text-2xl text-[#1c2340] mb-4">Interested?</h3>
                  <p className="text-[0.68rem] leading-relaxed text-[#8b91a8] mb-8">
                    Contact our property specialists for a private viewing or further details.
                  </p>
                  
                  <div className="space-y-3">
                    <a
                      href={propertyWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#c49a3c] text-white text-[0.46rem] tracking-[0.4em] uppercase text-center block hover:bg-[#b38a33] transition-colors"
                    >
                      Enquire via WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="w-full py-4 border border-[#1c2340] text-[#1c2340] text-[0.46rem] tracking-[0.4em] uppercase text-center block hover:bg-[#1c2340] hover:text-white transition-all"
                    >
                      General Enquiry
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── LOCATION MAP ─── */}
      <section className="bg-[#f8f9fc] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 bg-white border border-[#dde1ee] overflow-hidden">
              <div className="h-[400px] lg:h-[600px] bg-[#dde1ee]">
                 {/* Map Placeholder - logic for dynamic location */}
                 <div className="w-full h-full flex items-center justify-center text-[#8b91a8] text-[0.46rem] tracking-[0.3em] uppercase">
                    Map visualization coming soon
                 </div>
              </div>
              <div className="p-8 lg:p-12 self-center">
                 <h2 className="text-[0.46rem] tracking-[0.4em] uppercase text-[#c49a3c] mb-4">Location</h2>
                 <h3 className="font-cormorant font-light text-3xl text-[#1c2340] mb-6">{property.location}</h3>
                 
                 {property.nearbyLocations && property.nearbyLocations.length > 0 && (
                   <div className="space-y-6">
                      {property.nearbyLocations.map(loc => (
                        <div key={loc.name} className="flex items-center justify-between border-b border-[#f0f2f8] pb-4">
                           <span className="text-[0.68rem] tracking-[0.05em] text-[#1c2340]/70">{loc.name}</span>
                           <span className="text-[0.62rem] tracking-[0.1em] text-[#8b91a8] font-light">{loc.time}</span>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FLOATING ENQUIRE PILL — Japanese Minimalist Refinement ── */}
      <div className="fixed bottom-24 right-8 z-50 flex items-center bg-[#1c2340]/95 backdrop-blur-md text-white border border-[#c49a3c]/30 shadow-[0_8px_32px_rgba(28,35,64,0.35)] hover:border-[#c49a3c]/60 transition-all duration-400 lg:hidden group/pill overflow-hidden">
        <a
          href={propertyWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 pl-7 pr-4.5 py-4 hover:bg-[#2e4480]/50 transition-colors duration-400"
        >
          <span className="text-[0.46rem] tracking-[0.45em] uppercase font-light">Enquire</span>
        </a>
        <div className="w-px h-5 bg-[#c49a3c]/20 shrink-0" />
        <ShareButton 
          title={property.title} 
          url={typeof window !== 'undefined' ? window.location.href : `${SITE_URL}${propertyPath}`}
          className="flex items-center gap-3 px-6 py-4 hover:bg-[#2e4480]/50 text-white transition-all duration-400"
        />
      </div>
    </>
  );
}
