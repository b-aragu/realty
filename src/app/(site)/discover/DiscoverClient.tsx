"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

interface DiscoverClientProps {
  projects: Project[];
}

export default function DiscoverClient({ projects }: DiscoverClientProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest First");

  const tabs = ["All", "Off-Plan", "Under Construction", "Complete", "Nairobi", "Coast", "Kiambu", "Kajiado"];

  // Filtering
  let filtered = projects.filter((p) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    // 2. Tab Filter
    if (activeTab === "All") return true;
    if (["Off-Plan", "Under Construction", "Complete"].includes(activeTab)) {
      return p.completionStatus === activeTab;
    }
    if (["Nairobi", "Coast"].includes(activeTab)) {
      return p.location.includes(activeTab) || p.description.includes(activeTab);
    }
    return true;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low–High") {
      const priceA = parseInt(a.startingPrice.replace(/[^0-9]/g, "")) || 0;
      const priceB = parseInt(b.startingPrice.replace(/[^0-9]/g, "")) || 0;
      return priceA - priceB;
    }
    if (sortBy === "Price: High–Low") {
      const priceA = parseInt(a.startingPrice?.replace(/[^0-9]/g, "") || "0") || 0;
      const priceB = parseInt(b.startingPrice?.replace(/[^0-9]/g, "") || "0") || 0;
      return priceB - priceA;
    }
    if (sortBy === "Completion Date") {
      const dateA = parseInt(a.completionDate?.match(/\d+/)?.[0] || "9999");
      const dateB = parseInt(b.completionDate?.match(/\d+/)?.[0] || "9999");
      return dateA - dateB;
    }
    // Latest First
    return 0;
  });

  return (
    <>
      {/* Page header — two-column editorial */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              {/* Left */}
              <div>
                <p className="text-[0.46rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">
                  Developments Portfolio
                </p>
                <h1 className="font-cormorant font-light text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.04] text-[#1c2340]">
                  Dis<em className="italic text-[#3a5299]">cover</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              {/* Right */}
              <div className="flex flex-col items-start lg:items-end gap-6">
                <p className="text-[0.6rem] sm:text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                  Our curated portfolio of residential developments across Kenya —
                  from Nairobi&apos;s suburbs to the Indian Ocean coast.
                </p>
                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {[
                    { num: String(projects.length), label: "Developments" },
                    { num: "50+", label: "Units" },
                    { num: "2", label: "Locations" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                      {i > 0 && <div className="w-px h-8 bg-[#dde1ee] mr-4 sm:mr-6" />}
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="font-cormorant font-light text-[1.4rem] sm:text-[1.6rem] text-[#1c2340] leading-none">{stat.num}</span>
                        <span className="text-[0.42rem] sm:text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter strip + Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          
          {/* ── SEARCH & FILTER STRIP ── */}
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 gap-6 border-b border-[#dde1ee] mb-10">
              
              {/* Tabs */}
              <div className="flex items-center flex-nowrap overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 hide-scrollbar" style={{ scrollbarWidth: "none" }}>
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 whitespace-nowrap text-[0.55rem] tracking-[0.26em] uppercase py-3 pr-6 mr-4 transition-colors duration-300 relative ${
                      activeTab === tab
                        ? "text-[#2e4480]"
                        : "text-[#8b91a8] hover:text-[#1c2340]"
                    }`}
                  >
                    {tab}
                    {/* Active Underline */}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-[60%] h-px bg-[#2e4480]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Search & Sort Container */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-auto sm:min-w-[240px]">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b91a8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search developments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#f8f7f4] border border-[#dde1ee] text-[0.58rem] tracking-[0.1em] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors placeholder:text-[#8b91a8]/50"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3 w-full sm:w-auto pl-2 border-l-0 sm:border-l border-[#dde1ee] pt-4 sm:pt-0 border-t sm:border-t-0">
                  <span className="text-[0.46rem] tracking-[0.26em] uppercase text-[#8b91a8] shrink-0">Sort</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-[0.5rem] tracking-[0.22em] uppercase text-[#1c2340] py-2 pr-5 outline-none cursor-pointer font-light w-full border-b border-[#dde1ee]"
                  >
                    <option>Latest First</option>
                    <option>Price: Low–High</option>
                    <option>Price: High–Low</option>
                    <option>Completion Date</option>
                  </select>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── PROJECT GRID ── */}
          <AnimatedSection delay={0.1}>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]">
                {filtered.map((project: Project, i: number) => (
                  <div key={project.slug} className={i === 0 ? "lg:col-span-2" : ""}>
                    <ProjectCard project={project} featured={i === 0} />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-24 flex flex-col items-center justify-center text-center bg-[#f8f7f4] border border-[#dde1ee]">
                <span className="text-[#c49a3c] text-2xl mb-4">✦</span>
                <h3 className="font-cormorant font-light text-2xl text-[#1c2340] mb-2">
                  No developments found
                </h3>
                <p className="text-[0.6rem] tracking-[0.08em] text-[#8b91a8]">
                  Adjust your search or filters to see available projects.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
                  className="mt-6 text-[0.52rem] tracking-[0.2em] uppercase text-[#2e4480] border-b border-[#2e4480] pb-1 hover:text-[#1c2340] hover:border-[#1c2340] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </AnimatedSection>

          {/* ── LOAD MORE / FOOTER NOTE ── */}
          {filtered.length > 0 && (
            <AnimatedSection delay={0.2}>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <span className="text-[0.5rem] tracking-[0.28em] uppercase text-[#8b91a8]">
                  Showing {filtered.length} of {projects.length} developments
                </span>
                <a
                  href="/contact"
                  className="group flex items-center justify-between sm:justify-start gap-4 text-[0.58rem] tracking-[0.28em] uppercase text-[#1c2340] hover:text-[#2e4480] transition-all duration-300 border sm:border-0 border-[#dde1ee] w-full sm:w-auto px-6 sm:px-0 py-3 sm:py-0"
                >
                  Request Private Briefing
                  <span className="block w-4 sm:w-8 h-px bg-current group-hover:w-12 transition-all duration-400" />
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
