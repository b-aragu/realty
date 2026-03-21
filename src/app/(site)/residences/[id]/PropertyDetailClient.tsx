"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import TourLocationGrid from "@/components/TourLocationGrid";
import ROICalculator from "@/components/ROICalculator";
import type { Property } from "@/data/properties";

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
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
                    <span className="w-4 h-px bg-[#c49a3c]" /> Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                    {property.amenities.map((a: string) => (
                      <div key={a} className="flex items-center gap-3 text-[0.6rem] tracking-[0.08em] text-[#1c2340]/80">
                        <span className="text-[#c49a3c] text-[0.8em]">✦</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tour & Location Grid */}
                <div className="mb-16">
                  <TourLocationGrid 
                    title={property.title}
                    location={property.location}
                    videoUrl={property.videoUrl}
                    coordinates={property.coordinates}
                    projectName={property.projectName}
                    rawObject={property}
                  />
                </div>

                {/* Investment Calculator */}
                {property.status !== "For Rent" && (
                  <div className="mb-8">
                    <ROICalculator defaultInvestment={property.priceNumber} />
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* ─── SIDEBAR ─── */}
            <div className="relative">
              <AnimatedSection delay={0.2}>
                <div className="sticky top-28 bg-[#f8f7f4] border border-[#dde1ee] p-8 lg:p-10">
                  <p className="text-[0.46rem] tracking-[0.38em] uppercase text-[#c49a3c] mb-4">
                    Private Consultation
                  </p>
                  <h3 className="font-cormorant font-light text-[1.8rem] leading-[1.1] text-[#1c2340] mb-4">
                    Interested in this <em className="italic text-[#3a5299]">property?</em>
                  </h3>
                  <p className="text-[0.6rem] leading-[1.9] tracking-[0.08em] text-[#8b91a8] mb-8">
                    Contact our advisory team to arrange a viewing or request a detailed investment dossier.
                  </p>

                  <div className="space-y-4 mb-8">
                    <a
                      href="/contact"
                      className="group flex items-center justify-between w-full border border-[#1c2340] bg-[#1c2340] text-white px-6 py-4 text-[0.56rem] tracking-[0.24em] uppercase hover:bg-[#2e4480] hover:border-[#2e4480] transition-colors duration-300"
                    >
                      Arrange a Viewing
                      <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                    </a>
                    <a
                      href="/contact"
                      className="group flex items-center justify-between w-full border border-[#dde1ee] bg-transparent text-[#1c2340] px-6 py-4 text-[0.56rem] tracking-[0.24em] uppercase hover:border-[#1c2340] transition-colors duration-300"
                    >
                      Request Dossier
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/254140530539?text=Hi, I'm interested in ${property.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full border border-[#c49a3c]/30 bg-transparent text-[#1c2340] px-6 py-4 text-[0.56rem] tracking-[0.24em] uppercase hover:border-[#c49a3c] hover:bg-[#c49a3c]/5 transition-colors duration-300 mb-6"
                  >
                    <span className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Speak on WhatsApp
                    </span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#c49a3c]">→</span>
                  </a>

                  {property.projectName && property.projectSlug && (
                    <div className="group/dev">
                      <p className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-2">
                        Part of Development
                      </p>
                      <Link
                        href={`/discover/${property.projectSlug}`}
                        className="inline-block font-cormorant text-[1.2rem] text-[#1c2340] hover:text-[#3a5299] transition-colors border-b border-transparent hover:border-[#3a5299] pb-0.5"
                      >
                        {property.projectName}
                      </Link>
                    </div>
                  )}

                  {/* Phone */}
                  <div className="pt-2 border-t border-[#dde1ee] mt-6">
                    <p className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-1">
                      Call Us Directly
                    </p>
                    <a
                      href="tel:+254140530539"
                      className="font-cormorant font-light text-base text-[#1c2340] hover:text-[#3a5299] transition-colors"
                    >
                      +254 140 530 539
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING ENQUIRE PILL ── */}
      <a
        href={`https://wa.me/254140530539?text=Hi, I'm interested in ${encodeURIComponent(property.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-[#1c2340] text-white pl-6 pr-5 py-3.5 shadow-[0_4px_24px_rgba(28,35,64,0.35)] hover:bg-[#2e4480] transition-all duration-300 hover:shadow-[0_6px_32px_rgba(28,35,64,0.5)] lg:hidden"
      >
        <span className="text-[0.5rem] tracking-[0.3em] uppercase">Enquire</span>
        <span className="w-px h-4 bg-white/20" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
