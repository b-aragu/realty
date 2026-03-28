"use client";

import dynamic from "next/dynamic";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import PropertyCard from "@/components/PropertyCard";
import BlogCard from "@/components/BlogCard";
import type { Project } from "@/data/projects";
import type { Property } from "@/data/properties";
import type { Article } from "@/data/articles";
import type { Stay, SiteSettings, MacroRegion } from "@/sanity/fetch";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useMemo, useRef, useEffect } from "react";
import ActionButton from "@/components/ui/ActionButton";
import { motion, useScroll, useTransform } from "framer-motion";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#f5f8fa] rounded-lg flex items-center justify-center min-h-[300px]">
      <div className="w-6 h-6 border-2 border-[#2f4858] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const generateMacroLocations = (properties: Property[], macroRegions: MacroRegion[]) => {
  if (!macroRegions || macroRegions.length === 0) return [];

  return macroRegions.map((region) => {
    // Find all properties whose 'area' strictly matches this macroRegion's name
    const regionProperties = properties.filter((p) => p.area === region.name);

    return {
      id: region.id || region.name.toLowerCase().replace(/\s+/g, '-'),
      name: region.name,
      coordinates: (region.coordinates 
        ? [region.coordinates.lat, region.coordinates.lng] 
        : [-1.2921, 36.8219]) as [number, number],
      description: region.description || "Premium Locations",
      type: "Macro Region",
      price: region.price || "Contact for Details",
      zoom: region.zoom || 11,
      subLocations: [
        {
          id: `${region.name.toLowerCase()}-all`,
          name: `${region.name} Properties`,
          coordinates: (region.coordinates 
            ? [region.coordinates.lat, region.coordinates.lng] 
            : [-1.2921, 36.8219]) as [number, number],
          description: "All properties in this region",
          type: "Curated Selection",
          price: region.price || "See listings",
          zoom: (region.zoom || 11) + 2,
          properties: regionProperties,
        }
      ].filter(sub => sub.properties.length > 0)
    };
  }).filter((r) => r.subLocations.length > 0); // Only show Macro Regions that actually have active properties
};

const getLifestyleCategories = (settings?: SiteSettings | null) => {
  return [
    { title: "Urban Living", description: "Modern apartments in Nairobi's vibrant neighbourhoods", image: settings?.urbanLivingImage || "/images/lifestyle/urban.jpg", href: "/residences" },
    { title: "Beachfront Escapes", description: "Coastal villas along Kenya's Indian Ocean shoreline", image: settings?.beachfrontImage || "/images/lifestyle/beach.jpg", href: "/residences" },
    { title: "Family Homes", description: "Spacious residences designed for growing families", image: settings?.familyHomesImage || "/images/lifestyle/family.jpg", href: "/residences" },
    { title: "Investment Properties", description: "High-yield opportunities for savvy investors", image: settings?.investmentImage || "/images/lifestyle/investment.jpg", href: "/invest" },
  ];
};

export default function HomeClient({ projects, properties, articles, stays = [], settings, macroRegions = [] }: { projects: Project[], properties: Property[], articles: Article[], stays?: Stay[], settings?: SiteSettings | null, macroRegions?: MacroRegion[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeLifestyleIndex, setActiveLifestyleIndex] = useState(0);
  const lifestyleRef = useRef<HTMLDivElement>(null);
  const heroImage = settings?.heroImage || "/images/hero.jpg";
  const lifestyleCategories = getLifestyleCategories(settings);

  useEffect(() => {
    const el = lifestyleRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.offsetWidth;
      // Since we show ~2 per view on mobile, calculate index based on item width
      const newIndex = Math.round(scrollLeft / (width / 2));
      setActiveLifestyleIndex(newIndex);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const generatedMacroLocations = useMemo(() => generateMacroLocations(properties, macroRegions), [properties, macroRegions]);

  // Dynamic Stays mathematical aggregations
  const staysLocationsCount = new Set(stays.map(s => s.location).filter(Boolean)).size || 0;
  
  const stayPrices = stays.map(s => {
    const num = parseInt(s.pricePerNight?.replace(/\D/g, '') || "0", 10);
    return num > 0 ? num : null;
  }).filter(Boolean) as number[];
  
  const staysMinPrice = stayPrices.length > 0 ? Math.min(...stayPrices) : null;
  const staysDisplayPrice = staysMinPrice 
    ? `From ${staysMinPrice >= 1000 ? (staysMinPrice / 1000) + 'K' : staysMinPrice}` 
    : (stays[0]?.pricePerNight || "Contact Us");

  const filteredProperties = useMemo(() => {
    if (activeFilter === "All") return properties;
    if (activeFilter === "For Sale") return properties.filter(p => p.status === "For Sale");
    if (activeFilter === "Off-Plan") return properties.filter(p => p.status === "Off-Plan" || p.status === "Under Construction");
    if (activeFilter === "To Let") return properties.filter(p => p.status === "For Rent");
    if (activeFilter === "Nairobi") return properties.filter(p => p.area === "Nairobi");
    if (activeFilter === "Coast") return properties.filter(p => p.area === "Mombasa");
    return properties;
  }, [activeFilter, properties]);

  return (
    <>
      {/* ─── HERO ─── Split layout on desktop, stacked on mobile */}
      <section className="relative h-auto min-h-screen lg:h-screen overflow-hidden flex flex-col lg:block bg-white">
        
        {/* Ghost kanji — 居 meaning "to dwell" (Desktop only) */}
        <div
          className="absolute bottom-[-4%] left-[-2%] font-noto-jp font-extralight select-none pointer-events-none z-0 hidden lg:block"
          style={{ fontSize: "40vw", lineHeight: 1, color: "rgba(28,35,64,0.04)" }}
          aria-hidden="true"
        >
          居
        </div>

        {/* Mid decorative line (Desktop) */}
        <div
          className="absolute top-1/2 left-16 w-12 h-px bg-[#dde1ee] z-[3] hidden lg:block"
          style={{ animation: "expandRule 0.8s ease 1.7s both", transformOrigin: "left" }}
          aria-hidden="true"
        />

        {/* ─ MOBILE HERO IMAGE BLOCK ─ (Visible only on mobile/tablet) */}
        <div className="relative w-full h-[45vh] sm:h-[55vh] block lg:hidden overflow-hidden mt-16 sm:mt-20 z-[2]">
          {/* Hero image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, animation: "kenBurns 14s ease-in-out 2s infinite alternate" }}
          />
          {/* Navy-to-cobalt gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9cfe6]/70 via-[#7a8fba]/50 to-[#1c2340]/60 mix-blend-multiply" />
          {/* Base gradient fade to text */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 z-[1]" />
          
          {/* Inset frame */}
          <div className="absolute inset-4 border border-white/[0.15] pointer-events-none z-[2]" />
          
          {/* Year */}
          <span
            className="absolute top-6 right-6 text-[0.48rem] tracking-[0.35em] text-white/40 z-[3]"
            style={{ animation: "fadeIn 1s ease 0.4s both" }}
          >
            EST. 2024
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-full flex-1">
          {/* ─ LEFT PANEL (Text & CTAs) ─ */}
          <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-10 pb-24 lg:py-0 z-[2]">
            {/* Vertical Japanese label */}
            <div
              className="absolute top-1/2 left-4 -translate-y-1/2 font-noto-jp font-extralight text-[#8b91a8] tracking-[0.45em] hidden lg:block"
              style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)", fontSize: "0.5rem", animation: "fadeIn 1.2s ease 2s both" }}
              aria-hidden="true"
            >
              ナイロビ &nbsp;·&nbsp; ケニア海岸
            </div>

            {/* Accent rule */}
            <div
              className="w-9 h-px bg-[#2e4480] mb-6 lg:mb-8"
              style={{ animation: "expandRule 0.7s ease 0.8s both", transformOrigin: "left" }}
            />

            {/* Eyebrow */}
            <p
              className="text-[0.48rem] sm:text-[0.56rem] tracking-[0.32em] uppercase text-[#2e4480] mb-4 sm:mb-6 font-light"
              style={{ animation: "fadeUp 0.9s ease 1s both" }}
            >
              Curated Residences &amp; Investments
            </p>

            {/* Headline — Cormorant Garamond */}
            <h1
              className="font-cormorant font-light leading-[1.06] tracking-[-0.01em] text-[#1c2340]"
              style={{ fontSize: "clamp(2.5rem, 5.2vw, 5.8rem)", animation: "fadeUp 1s ease 1.1s both" }}
            >
              {settings?.homeHeroTitle?.split(" ").slice(0, 2).join(" ") || "Find Your"}
              <br />
              <em className="italic text-[#3a5299]">{settings?.homeHeroTitle?.split(" ").slice(2).join(" ") || "Space"}</em> in Kenya
            </h1>

            {/* Subtext */}
            <p
              className="mt-6 sm:mt-8 text-[0.62rem] sm:text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[30ch]"
              style={{ animation: "fadeUp 0.9s ease 1.3s both" }}
            >
              {settings?.homeHeroTagline || "Nairobi, the Coast & beyond — properties selected for those who value quiet, lasting distinction."}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4"
              style={{ animation: "fadeUp 0.9s ease 1.5s both" }}
            >
              <ActionButton 
                href="/residences" 
                label="Explore Residences"
                eyebrow="Portfolio"
                className="w-full sm:w-auto"
              />
              <ActionButton 
                href="/discover" 
                label="View Developments"
                eyebrow="Projects"
                variant="secondary"
                className="w-full sm:w-auto"
              />
            </div>

            {/* Stats — clean grid for mobile, inline for desktop */}
            <div
              className="mt-auto pt-10 lg:pt-14 grid grid-cols-3 gap-0 border-t border-[#dde1ee]/60 lg:border-0"
              style={{ animation: "fadeIn 1s ease 2s both" }}
            >
              {[
                { value: String(properties.length) + "+", label: "Properties" },
                { value: String(projects.length), label: "Developments" },
                { value: settings?.avgYield || "7–10%", label: "Avg Yield" },
              ].map((stat, i) => (
                <div key={stat.label} className={`flex flex-col items-center lg:items-start py-4 lg:py-0 ${i > 0 ? "border-l border-[#dde1ee]/60 lg:border-0 lg:pl-8 lg:ml-8" : ""}`}>
                  <span className="font-cormorant font-light text-[1.2rem] sm:text-[1.5rem] leading-none text-[#1c2340] tracking-wide">{stat.value}</span>
                  <span className="text-[0.4rem] sm:text-[0.46rem] tracking-[0.22em] lg:tracking-[0.3em] uppercase text-[#8b91a8] mt-1.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─ RIGHT PANEL — Hero image with brand overlay (Desktop Only) ─ */}
          <div className="relative overflow-hidden hidden lg:block">
            <div
              className="absolute top-[6%] left-[6%] right-0 bottom-0 overflow-hidden"
              style={{ animation: "revealRight 1.4s cubic-bezier(0.77, 0, 0.18, 1) 0.5s both" }}
            >
              {/* Hero image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})`, animation: "kenBurns 14s ease-in-out 2s infinite alternate" }}
              />
              {/* Navy-to-cobalt gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9cfe6]/70 via-[#7a8fba]/50 to-[#1c2340]/60 mix-blend-multiply" />

              {/* Architectural grid */}
              <div className="absolute inset-0" style={{
                background: `
                  repeating-linear-gradient(90deg, transparent, transparent calc(16.666% - 0.5px), rgba(255,255,255,0.035) calc(16.666% - 0.5px), rgba(255,255,255,0.035) 16.666%),
                  repeating-linear-gradient(0deg, transparent, transparent calc(12.5% - 0.5px), rgba(255,255,255,0.025) calc(12.5% - 0.5px), rgba(255,255,255,0.025) 12.5%)
                `,
              }} />

              {/* Vignette */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 35% 55%, transparent 35%, rgba(28,35,64,0.4) 100%)" }} />

              {/* Inset frame */}
              <div className="absolute inset-5 border border-white/[0.07] pointer-events-none z-[2]" />

              {/* Caption */}
              <span
                className="absolute bottom-8 right-8 font-cormorant italic font-light text-[0.68rem] tracking-[0.14em] text-white/35 z-[3]"
                style={{ animation: "fadeIn 1s ease 2.2s both" }}
              >
                Nairobi, Kenya
              </span>

              {/* Year */}
              <span
                className="absolute top-8 right-8 text-[0.48rem] tracking-[0.35em] text-white/20 z-[3]"
                style={{ animation: "fadeIn 1s ease 2.4s both" }}
              >
                EST. 2024
              </span>
            </div>
          </div>
        </div>


      </section>

      {/* ─── FEATURED DEVELOPMENTS ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Our Portfolio</p>
                <h2 className="font-cormorant font-light text-[clamp(2.2rem,3vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Featured <em className="italic text-[#3a5299]">Developments</em>
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mt-4" />
              </div>
              <a
                href="/discover"
                className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
              >
                <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">View All Developments</span>
                <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── EXPLORE BY LIFESTYLE ─── Asymmetric editorial grid */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Header — left title, right description */}
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Lifestyle</p>
                <h2 className="font-cormorant font-light text-[clamp(2.2rem,3vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Find Your<br /><em className="italic text-[#3a5299]">Way of Living</em>
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mt-4" />
              </div>
              <p className="text-[0.65rem] leading-[2] tracking-[0.07em] text-[#8b91a8] max-w-[32ch] lg:text-right">
                Four distinct lifestyles.<br />One country of possibility.
              </p>
            </div>
          </AnimatedSection>

          {/* Asymmetric grid — Carousel on mobile */}
          <AnimatedSection delay={0.2}>
            <div 
              ref={lifestyleRef}
              className="flex md:grid md:grid-cols-3 gap-[3px] overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory" 
              style={{ gridTemplateRows: "340px 300px" }}
            >
              {lifestyleCategories.map((cat, i) => {
                const gridClasses = [
                  "md:col-span-1 md:row-span-2",     // Card 1: tall left
                  "md:col-span-2 md:row-span-1",     // Card 2: wide top right
                  "md:col-span-1 md:row-span-1",     // Card 3: bottom middle
                  "md:col-span-1 md:row-span-1",     // Card 4: bottom right
                ][i] || "";

                return (
                  <a 
                    key={cat.title} 
                    href={cat.href} 
                    className={`group relative block overflow-hidden shrink-0 w-[calc(50vw-1.5px)] md:w-auto h-[320px] md:h-auto snap-start ${gridClasses}`}
                  >
                    {/* Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url(${cat.image})`, backgroundColor: "#1c2340" }}
                    />
                    {/* Architectural texture */}
                    <div className="absolute inset-0" style={{
                      background: "repeating-linear-gradient(90deg, transparent, transparent calc(20% - 0.5px), rgba(255,255,255,0.025) calc(20% - 0.5px), rgba(255,255,255,0.025) 20%)"
                    }} />
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,20,0.88)] via-[rgba(8,10,20,0.4)] to-transparent z-[1]" />
                    {/* Cobalt hover tint */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(46,68,128,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

                    {/* Index */}
                    <span className="absolute top-5 right-6 font-cormorant font-light text-[0.8rem] tracking-[0.1em] text-white/25 group-hover:text-white/50 transition-colors duration-400 z-[2]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8 z-[2]">
                      {/* Gold rule — grows on hover */}
                      <div className="w-0 h-px bg-[#c49a3c] mb-3 group-hover:w-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                      <p className="text-[0.42rem] sm:text-[0.46rem] tracking-[0.36em] uppercase text-white/45 group-hover:text-[rgba(196,154,60,0.85)] transition-colors duration-400 mb-2">
                        {cat.title === "Urban Living" ? "Nairobi" : cat.title === "Beachfront Escapes" ? "The Coast" : cat.title === "Family Homes" ? "Kiambu · Suburbs" : "7–10% Avg Yield"}
                      </p>
                      <h3 className={`font-cormorant font-light leading-[1.15] tracking-[0.01em] text-white/90 group-hover:text-white transition-colors duration-400 mb-2 ${i === 0 ? "text-[1.8rem] sm:text-[2rem]" : i === 1 ? "text-[1.6rem] sm:text-[1.8rem]" : "text-[1.4rem] sm:text-[1.5rem]"}`}>
                        {cat.title}
                      </h3>
                      {/* Description — hidden, fades in on hover */}
                      <p className="text-[0.58rem] leading-[1.9] tracking-[0.08em] text-transparent max-h-0 overflow-hidden group-hover:text-white/60 group-hover:max-h-16 group-hover:mb-3 transition-all duration-400 delay-100 hidden sm:block">
                        {cat.description}
                      </p>
                      {/* CTA — slides up on hover */}
                      <div className="flex items-center gap-3 text-[0.45rem] sm:text-[0.5rem] tracking-[0.3em] uppercase text-transparent opacity-0 translate-y-1.5 group-hover:text-white/70 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-150">
                        Explore
                        <span className="w-6 group-hover:w-10 h-px bg-white/50 transition-all duration-400" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Dots indicator */}
          <AnimatedSection delay={0.4}>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[0.5rem] tracking-[0.26em] uppercase text-[#8b91a8]">4 distinct lifestyles available</span>
              <div className="flex gap-2.5">
                {lifestyleCategories.map((_, i) => (
                  <div key={i} className={`w-[6px] h-[6px] rounded-full transition-all duration-500 ease-out ${activeLifestyleIndex === i ? "bg-[#2e4480] scale-[1.3]" : "bg-[#dde1ee] scale-100"}`} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── LATEST LISTINGS ─── */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="text-[0.480rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Curated Selection</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,3rem)] leading-[1.1] text-[#1c2340]">
                  Latest <em className="italic text-[#3a5299]">Listings</em>
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mt-4" />
              </div>
              <a
                href="/residences"
                className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
              >
                <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">View All Properties</span>
                <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
              </a>
            </div>
          </AnimatedSection>

          {/* Filter strip */}
          <AnimatedSection delay={0.1}>
            <div className="flex items-center flex-nowrap border-b border-[#dde1ee] mb-10 overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: "none" }}>
              {["All", "For Sale", "Off-Plan", "To Let", "Nairobi", "Coast"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`shrink-0 whitespace-nowrap text-[0.52rem] tracking-[0.28em] uppercase py-3.5 pr-8 mr-8 border-b -mb-px transition-all duration-300 ${
                    activeFilter === tab
                      ? "text-[#2e4480] border-[#2e4480]"
                      : "text-[#8b91a8] border-transparent hover:text-[#1c2340]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Asymmetric grid — first card taller */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.92fr_0.92fr] gap-[2px] items-start">
              {filteredProperties.slice(0, 6).map((prop, i) => (
                <PropertyCard key={prop.id} property={prop} featured={i === 0} />
              ))}
            </div>
          </AnimatedSection>

          {/* Load more row */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <span className="text-[0.48rem] sm:text-[0.5rem] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#8b91a8] text-center">
                Showing {Math.min(6, filteredProperties.length)} of {filteredProperties.length}+ properties
              </span>
              <a
                href="/residences"
                className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
              >
                <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Explore All Residences</span>
                <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── WANDE RETREATS ─── */}
      <section className="relative bg-[#f8f7f4] overflow-hidden">
        {/* Ghost kanji: 泊 = "to lodge / to stay overnight" */}
        <div 
          className="absolute top-1/2 left-[-3%] -translate-y-1/2 font-noto-jp font-extralight select-none pointer-events-none z-[1]"
          style={{ fontSize: "50vw", lineHeight: 1, color: "rgba(28,35,64,0.03)" }}
          aria-hidden="true"
        >
          泊
        </div>

        <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 max-w-[1440px] mx-auto">
          
          {/* LEFT — COLLAGE */}
          <div className="relative flex items-center justify-center px-0 sm:px-6 lg:pl-16 lg:pr-16 pt-12 pb-4 lg:py-20 lg:min-h-[700px] overflow-hidden">
            {/* Cobalt corner accent */}
            <div className="absolute top-[4.5rem] left-[3.5rem] w-[2px] h-[3rem] opacity-50 hidden lg:block" style={{ background: "linear-gradient(to bottom, #c49a3c, transparent)" }} />
            
            <AnimatedSection className="w-full relative z-[5]">
              <div className="relative w-[110%] ml-[-5%] sm:ml-0 sm:w-full max-w-[540px] mx-auto h-[320px] sm:h-[400px] lg:h-[450px]">
                {/* Img 1: Large main image — top right */}
                <div className="absolute top-0 right-0 w-[66%] h-[56%] z-[3] overflow-hidden group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${stays[0]?.mainImage || '/images/stays/nandwa-2bed.png'})` }}
                  />
                  <div className="absolute inset-[0.6rem] border border-[#c49a3c]/20 pointer-events-none z-[2]" />
                  <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                    {stays[0]?.title || "Interior · Nandwa Ivy"}
                  </span>
                </div>

                {/* Img 2: Tall left image */}
                <div className="absolute top-[6%] left-0 w-[44%] h-[72%] z-[2] overflow-hidden group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${stays[1]?.mainImage || '/images/stays/cozy-1bed.png'})` }}
                  />
                  <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                    {stays[1]?.title || "Living · Curated Suite"}
                  </span>
                </div>

                {/* Img 3: Bottom right */}
                <div className="absolute bottom-0 right-0 w-[50%] h-[44%] z-[4] overflow-hidden group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${stays[2]?.mainImage || '/images/stays/studio-quiet.png'})` }}
                  />
                  <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                    {stays[2]?.title || "View · Westlands"}
                  </span>
                </div>

                {/* Img 4: Bottom center — overlapping */}
                <div className="absolute bottom-[4%] left-[24%] w-[36%] h-[34%] z-[5] overflow-hidden group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${stays[3]?.mainImage || stays[0]?.gallery?.[0]?.url || '/images/stays/detail-shot.png'})` }}
                  />
                  <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                    {stays[3]?.title || "Detail"}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="flex flex-col justify-center px-6 lg:pl-12 lg:pr-16 pb-16 pt-6 lg:py-[5.5rem] lg:border-l lg:border-[#dde1ee]">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-[1.2rem] mb-[1.6rem]">
                <div className="w-[2rem] h-px bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.38em] uppercase text-[#2e4480]">Wande Retreats</span>
              </div>

              <h2 className="font-cormorant font-extralight text-[clamp(2.8rem,4vw,4.2rem)] leading-[1.06] tracking-[-0.01em] text-[#1c2340]">
                Short-Term<br />
                <em className="italic text-[#3a5299]">Escapes</em>
              </h2>

              <p className="mt-[2rem] text-[0.66rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[38ch]">
                Our signature spaces — thoughtfully curated for business travellers and serene weekend retreats. Every detail considered, nothing superfluous.
              </p>

              {/* Stats strip */}
              <div className="flex items-center justify-between lg:justify-start lg:gap-[2.2rem] mt-[2.5rem] pt-[2rem] border-t border-[#dde1ee]">
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{stays.length}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">Properties</span>
                </div>
                <div className="w-px h-[2rem] bg-[#dde1ee] self-center" />
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{staysLocationsCount}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">{staysLocationsCount === 1 ? 'Location' : 'Locations'}</span>
                </div>
                <div className="w-px h-[2rem] bg-[#dde1ee] self-center" />
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{staysDisplayPrice}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">/ Night (KES)</span>
                </div>
              </div>

              {/* STAY CARDS (Dynamic via Sanity) */}
              <div className="mt-[3rem] flex flex-col gap-[3px]">
                
                {stays.slice(0, 3).map((stay, index) => (
                  <a key={stay._id || index} href="/stays" className="group flex flex-col sm:flex-row items-stretch no-underline border border-[#dde1ee] overflow-hidden transition-colors duration-300 hover:border-[#c49a3c]/30">
                    <div className="hidden sm:block w-[3px] shrink-0 bg-[#2e4480]/20 transition-colors duration-350 group-hover:bg-[#2e4480]" />
                    <div className="w-full sm:w-[90px] h-[120px] sm:h-auto shrink-0 overflow-hidden relative">
                      <div className="w-full h-full min-h-[90px] transition-transform duration-500 bg-cover bg-center group-hover:scale-[1.08] relative z-[0]" style={{ backgroundImage: `url(${stay.mainImage || '/images/stays/studio-quiet.png'})` }} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-[0.4rem] px-[1rem] sm:px-[1.4rem] py-[1rem] sm:py-[1.2rem]">
                      <span className="text-[0.42rem] tracking-[0.32em] uppercase text-[#2e4480]">{stay.subtitle || "Premium Stay"} · {stay.location}</span>
                      <span className="font-cormorant font-light text-[1rem] text-[#1c2340] tracking-[0.02em] transition-colors duration-300 group-hover:text-[#3a5299]">{stay.title}</span>
                      <div className="flex items-center gap-[0.5rem] sm:gap-[0.7rem] mt-[0.2rem] flex-wrap">
                        <span className="text-[0.45rem] sm:text-[0.48rem] tracking-[0.18em] text-[#8b91a8] uppercase">Sleeps {stay.guests || 2}</span>
                        {stay.amenities?.slice(0, 2).map((amenity: string, i: number) => (
                          <div key={i} className="flex items-center gap-[0.5rem] sm:gap-[0.7rem]">
                            <div className="w-[2px] h-[2px] rounded-full bg-[#dde1ee]" />
                            <span className="text-[0.45rem] sm:text-[0.48rem] tracking-[0.18em] text-[#8b91a8] uppercase">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Price and Book CTA */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-[0.5rem] shrink-0 px-[1rem] sm:px-[1.4rem] pb-[1rem] sm:pb-[1.2rem] sm:pt-[1.2rem] border-t sm:border-t-0 border-[#dde1ee]/50 sm:border-transparent mt-2 sm:mt-0">
                      <div className="flex flex-col sm:items-end gap-[0.1rem]">
                         <span className="font-cormorant font-light text-[1rem] sm:text-[1.1rem] text-[#1c2340] leading-none">{stay.pricePerNight}</span>
                         <span className="text-[0.42rem] tracking-[0.24em] uppercase text-[#8b91a8]">per night</span>
                      </div>
                      <div className="flex items-center gap-[0.4rem] text-[0.44rem] tracking-[0.28em] uppercase text-[#1c2340] sm:mt-[0.3rem] transition-all duration-300 group-hover:text-[#2e4480]">
                        Book
                        <span className="block w-[1rem] h-px bg-[#1c2340] transition-all duration-400 group-hover:w-[1.6rem] group-hover:bg-[#2e4480]" />
                      </div>
                    </div>
                  </a>
                ))}

              </div>

              {/* CTA ROW */}
              <div className="mt-[2.8rem] pt-[2rem] border-t border-[#dde1ee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <a href="/stays" className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300">
                  <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                  <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Explore All Stays</span>
                  <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
                </a>
                <span className="text-[0.48rem] tracking-[0.24em] uppercase text-[#8b91a8]">{stays.length} {stays.length === 1 ? 'property' : 'properties'} available</span>
              </div>

            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Thin divider before Journal */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #dde1ee 30%, #dde1ee 70%, transparent 100%)" }} />

      {/* ─── JOURNAL ─── Editorial grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Header */}
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 pb-8 border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Insights & Perspectives</p>
                <h2 className="font-cormorant font-light text-[clamp(2.2rem,3vw,3rem)] leading-[1.1] text-[#1c2340]">
                  From the <em className="italic text-[#3a5299]">Journal</em>
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mt-4" />
              </div>
              <a
                href="/journal"
                className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
              >
                <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">All Articles</span>
                <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
              </a>
            </div>
          </AnimatedSection>

          {/* Editorial grid: feature left (spans 2 rows) + 2 secondary right */}
          <AnimatedSection delay={0.1}>
            {articles.length >= 3 ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[3px]">
                <div className="lg:row-span-2">
                  <BlogCard article={articles[0]} variant="image" imageHeight="h-[320px] lg:h-[520px]" />
                </div>
                <div>
                  <BlogCard article={articles[1]} variant="image" imageHeight="h-[258px]" />
                </div>
                <div>
                  <BlogCard article={articles[2]} variant="image" imageHeight="h-[258px]" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
                {articles.slice(0, 2).map((article) => (
                  <BlogCard key={article.slug} article={article} variant="image" imageHeight="h-[300px]" />
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Text list row */}
          {articles.length > 3 && (
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-[#dde1ee]">
                {articles.slice(3).map((article) => (
                  <BlogCard key={article.slug} article={article} variant="list" />
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Footer note */}
          <AnimatedSection delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[0.5rem] tracking-[0.26em] uppercase text-[#8b91a8]">
                {articles.length} articles · Updated weekly
              </span>
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
              >
                <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Subscribe to the Journal</span>
                <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── MAP DISCOVERY ─── Interactive split layout */}
      <section className="py-20 lg:py-28 bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <MapComponent
              macroLocations={generatedMacroLocations}
              center={[38.2, -1.8]}
              zoom={6.4}
              splitLayout={true}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── Two-column split: content left, atmospheric panel right */}
      <section className="relative bg-[#1c2340] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* LEFT — content */}
          <div className="relative flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-24 z-[2]">
            <AnimatedSection>
              <div className="w-8 h-px bg-[#c49a3c] mb-8" />
              <p className="text-[0.5rem] tracking-[0.38em] uppercase text-[rgba(196,154,60,0.8)] mb-5">
                Private Consultations Available
              </p>
              <h2 className="font-cormorant font-extralight text-[clamp(2.6rem,4vw,4rem)] leading-[1.08] tracking-[-0.01em] text-white/90 mb-6">
                Begin Your<br />
                <em className="italic text-[rgba(196,154,60,0.85)]">Property</em><br />
                Journey
              </h2>
              <p className="text-[0.66rem] leading-[2.1] tracking-[0.08em] text-white/40 max-w-[36ch] mb-10">
                Schedule a private viewing or speak directly
                with one of our property consultants.
                Discretion and personalised service, always.
              </p>

              {/* CTA actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mt-8 mb-10">
                <ActionButton 
                  href="/contact" 
                  label="Book a Viewing" 
                  eyebrow="Private"
                  variant="light"
                  className="w-full sm:w-auto"
                />
                
                <ActionButton 
                  href="/contact" 
                  label="Speak to a Consultant" 
                  eyebrow="Advisory"
                  variant="light"
                  className="w-full sm:w-auto"
                />
              </div>

              {/* Contact detail strip */}
              <div className="border-t border-white/[0.07] pt-6 flex flex-wrap items-center gap-8">
                <div className="flex flex-col gap-1">
                  <span className="font-cormorant font-light text-[0.95rem] text-white/70 tracking-[0.04em]">
                    +254 140 530 539
                  </span>
                  <span className="text-[0.44rem] tracking-[0.3em] uppercase text-white/25">Direct Line</span>
                </div>
                <div className="w-px h-8 bg-white/[0.07]" />
                <div className="flex flex-col gap-1">
                  <span className="font-cormorant font-light text-[0.95rem] text-white/70 tracking-[0.04em]">
                    info@wanderealty.com
                  </span>
                  <span className="text-[0.44rem] tracking-[0.3em] uppercase text-white/25">Email</span>
                </div>
                <div className="w-px h-8 bg-white/[0.07]" />
                <div className="flex flex-col gap-1">
                  <span className="font-cormorant font-light text-[0.95rem] text-white/70 tracking-[0.04em]">
                    Kilimani, Nairobi
                  </span>
                  <span className="text-[0.44rem] tracking-[0.3em] uppercase text-white/25">Office</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT — atmospheric cobalt panel */}
          <div className="relative hidden lg:block overflow-hidden">
            {/* Gradient fill */}
            <div
              className="absolute inset-0 animate-[ctaKenBurns_16s_ease-in-out_infinite_alternate]"
              style={{
                background: "linear-gradient(145deg, #3a5090 0%, #2a3870 25%, #1c2858 55%, #101838 100%)",
                transform: "scale(1.03)",
              }}
            />
            {/* Architectural grid texture */}
            <div className="absolute inset-0" style={{
              background: `repeating-linear-gradient(90deg, transparent, transparent calc(16.666% - 0.5px), rgba(255,255,255,0.025) calc(16.666% - 0.5px), rgba(255,255,255,0.025) 16.666%),
                           repeating-linear-gradient(0deg, transparent, transparent calc(12.5% - 0.5px), rgba(255,255,255,0.018) calc(12.5% - 0.5px), rgba(255,255,255,0.018) 12.5%)`
            }} />
            {/* Left gradient blend */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #1c2340 0%, transparent 30%)" }} />
            {/* Ghost kanji — 住 meaning "to reside" */}
            <div
              className="absolute top-1/2 right-[-5%] -translate-y-1/2 font-noto-jp font-extralight select-none pointer-events-none z-[1]"
              style={{ fontSize: "28vw", lineHeight: 1, color: "rgba(255,255,255,0.025)" }}
              aria-hidden="true"
            >
              住
            </div>
            {/* Inset frame */}
            <div className="absolute inset-6 border border-white/[0.05] z-[2] pointer-events-none" />
            {/* Location tag */}
            <span className="absolute bottom-8 right-8 font-cormorant font-extralight italic text-[0.7rem] tracking-[0.14em] text-white/25 z-[3]">
              Nairobi, Kenya
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
