"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import PropertyCard from "@/components/PropertyCard";
import FilterPanel, { type FilterState } from "@/components/FilterPanel";
import { properties } from "@/data/properties";

export default function ResidencesPage() {
  const [filters, setFilters] = useState<FilterState>({
    location: "All",
    priceRange: "All",
    bedrooms: "All",
    propertyType: "All",
    status: "All",
  });

  const filteredProperties = properties.filter((p) => {
    if (filters.location !== "All" && !p.area.includes(filters.location) && !p.location.includes(filters.location))
      return false;
    if (filters.propertyType !== "All" && p.propertyType !== filters.propertyType)
      return false;
    if (filters.status !== "All" && p.status !== filters.status)
      return false;
    if (filters.bedrooms !== "All") {
      if (filters.bedrooms === "Studio" && p.bedrooms !== 0) return false;
      if (filters.bedrooms === "4+" && p.bedrooms < 4) return false;
      if (filters.bedrooms !== "Studio" && filters.bedrooms !== "4+" && p.bedrooms !== parseInt(filters.bedrooms))
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

  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              Residences
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              Browse our full portfolio of properties available for sale, rent,
              and off-plan investment across Kenya.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <FilterPanel onFilterChange={setFilters} />
          </div>

          <p className="text-sm text-[#6b7c8a] mb-6">
            {filteredProperties.length} propert
            {filteredProperties.length === 1 ? "y" : "ies"} found
          </p>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, i) => (
                <AnimatedSection key={property.id} delay={i * 0.06}>
                  <PropertyCard property={property} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6b7c8a] text-lg">
                No properties match your filters. Try adjusting your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
