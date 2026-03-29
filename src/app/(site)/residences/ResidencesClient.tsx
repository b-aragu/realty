"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel, { type FilterState } from "@/components/FilterPanel";
import type { Property } from "@/data/properties";
import type { SiteSettings } from "@/sanity/fetch";

interface ResidencesClientProps {
  properties: Property[];
  settings?: SiteSettings | null;
  locationsCount?: number;
}

function ResidencesContent({ properties, settings, locationsCount = 0 }: ResidencesClientProps) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => ({
    search: searchParams?.get("q") || searchParams?.get("search") || "",
    location: searchParams?.get("location") || "All",
    priceRange: searchParams?.get("budget") || "All",
    bedrooms: searchParams?.get("beds") || "All",
    propertyType: "All",
    status: searchParams?.get("status") || "All",
  }));
  const [sortBy, setSortBy] = useState("Latest First");

  let filteredProperties = properties.filter((p) => {
    // 1. Search Query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !(p.projectName && p.projectName.toLowerCase().includes(q))
      ) {
        return false;
      }
    }

    // 2. Dropdown Filters
    if (filters.location !== "All" && !p.area.includes(filters.location) && !p.location.includes(filters.location))
      return false;
    if (filters.propertyType !== "All" && p.propertyType !== filters.propertyType)
      return false;
    if (filters.status !== "All" && p.status !== filters.status)
      return false;
    if (filters.bedrooms !== "All") {
      const pBedroomsNum = p.bedrooms === "Studio" ? 0 : parseInt(p.bedrooms || "0");
      if (filters.bedrooms === "Studio" && pBedroomsNum !== 0) return false;
      if (filters.bedrooms === "4+" && pBedroomsNum < 4) return false;
      if (filters.bedrooms !== "Studio" && filters.bedrooms !== "4+" && pBedroomsNum !== parseInt(filters.bedrooms))
        return false;
    }
    if (filters.priceRange !== "All") {
      if (filters.priceRange === "Rental" && p.status !== "For Rent") return false;
      if (filters.priceRange === "Under KES 10M" && p.priceNumber >= 10000000) return false;
      if (filters.priceRange === "KES 10M - 20M" && (p.priceNumber < 10000000 || p.priceNumber > 20000000)) return false;
      if (filters.priceRange === "KES 20M - 40M" && (p.priceNumber < 20000000 || p.priceNumber > 40000000)) return false;
      if (filters.priceRange === "Above KES 40M" && p.priceNumber <= 40000000) return false;
    }
    return true;
  });

  // 3. Sorting logic
  filteredProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "Price: Low–High") {
      return a.priceNumber - b.priceNumber;
    }
    if (sortBy === "Price: High–Low") {
      return b.priceNumber - a.priceNumber;
    }
    if (sortBy === "Bedrooms") {
      const getBeds = (val: string) => (val === "Studio" ? 0 : parseInt(val) || 0);
      return getBeds(b.bedrooms) - getBeds(a.bedrooms);
    }
    // Default: "Latest First" (Sanity keeps order, but we can stick to 0 for stability)
    return 0;
  });

  return (
    <>
      {/* Header — editorial two-column */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              {/* Left */}
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">
                  Browse Properties
                </p>
                <h1 className="font-cormorant font-light text-[clamp(3rem,5vw,5.5rem)] leading-[1.04] text-[#1c2340]">
                  {settings?.residencesHeroTitle?.split(" ")[0] || "Resi"}<em className="italic text-[#3a5299]">{settings?.residencesHeroTitle?.split(" ").slice(1).join(" ") || "dences"}</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              {/* Right */}
              <div className="flex flex-col items-start lg:items-end gap-6">
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                  {settings?.residencesHeroTagline || "Browse our full portfolio of properties available for sale, rent, and off-plan investment across Kenya."}
                </p>
                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
                  {[
                    { num: `${properties.length}+`, label: "Properties" },
                    { 
                      num: String(new Set(properties.map(p => p.area).filter(Boolean)).size || 1), 
                      label: "Locations" 
                    },
                    { num: settings?.avgYield || "7-10%", label: "Avg Yield" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                      {i > 0 && <div className="hidden sm:block w-px h-8 bg-[#dde1ee] mr-4 sm:mr-6" />}
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

      {/* Filters + Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="py-8">
              <FilterPanel initialFilters={filters} onFilterChange={setFilters} />
            </div>
          </AnimatedSection>

          {/* Results count & Sort */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#dde1ee] mb-10 transition-all duration-500">
              <span className="text-[0.48rem] tracking-[0.28em] uppercase text-[#8b91a8]">
                {filteredProperties.length} propert{filteredProperties.length === 1 ? "y" : "ies"} found
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[0.48rem] tracking-[0.26em] uppercase text-[#8b91a8] shrink-0">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-b border-[#dde1ee] text-[0.48rem] tracking-[0.22em] uppercase text-[#1c2340] py-1.5 pr-8 outline-none cursor-pointer font-light w-full sm:w-auto hover:border-[#2e4480] transition-colors appearance-none relative"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%238b91a8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: '12px'
                  }}
                >
                  <option>Latest First</option>
                  <option>Price: Low–High</option>
                  <option>Price: High–Low</option>
                  <option>Bedrooms</option>
                </select>
              </div>
            </div>
          </AnimatedSection>

          {filteredProperties.length > 0 ? (
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.92fr_0.92fr] gap-[2px] items-start">
                {filteredProperties.map((property, i) => (
                  <PropertyCard key={property.id} property={property} featured={i === 0} />
                ))}
              </div>
            </AnimatedSection>
          ) : (
            <div className="text-center py-20 border border-[#dde1ee]">
              <span className="text-[#c49a3c] text-2xl mb-4 block">✦</span>
              <p className="font-cormorant font-light text-[1.4rem] text-[#1c2340] mb-2">
                No Properties Found
              </p>
              <p className="text-[0.68rem] text-[#8b91a8]">
                Try adjusting your filters to discover more options.
              </p>
            </div>
          )}

          {/* Footer row */}
          {filteredProperties.length > 0 && (
            <AnimatedSection delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <span className="text-[0.5rem] tracking-[0.28em] uppercase text-[#8b91a8]">
                  Showing {filteredProperties.length} of {properties.length}+ properties
                </span>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-5 py-2.5 transition-all duration-300"
                >
                  <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
                  <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Request Private Viewing</span>
                  <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}

export default function ResidencesClient(props: ResidencesClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f7f4]" />}>
      <ResidencesContent {...props} />
    </Suspense>
  );
}
