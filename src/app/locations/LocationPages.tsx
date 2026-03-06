import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import PropertyCard from "@/components/PropertyCard";
import CTAButton from "@/components/ui/CTAButton";
import { properties } from "@/data/properties";

interface LocationPageProps {
  location: string;
  area: string;
  title: string;
  description: string;
}

function LocationPage({ location, area, title, description }: LocationPageProps) {
  const locationProperties = properties.filter(
    (p) => p.area === area || p.location.includes(location)
  );

  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">{title}</h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">{description}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {locationProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationProperties.map((prop, i) => (
                <AnimatedSection key={prop.id} delay={i * 0.08}>
                  <PropertyCard property={prop} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6b7c8a] text-lg mb-6">
                New listings in {location} coming soon.
              </p>
              <CTAButton href="/residences" variant="outline">
                Browse All Properties
              </CTAButton>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function NairobiPage() {
  return <LocationPage location="Nairobi" area="Nairobi" title="Properties in Nairobi" description="Explore apartments, penthouses, and houses for sale and rent across Nairobi's most sought-after neighbourhoods." />;
}

export function KilimaniPage() {
  return <LocationPage location="Kilimani" area="Nairobi" title="Properties in Kilimani" description="Premium apartments and penthouses in Kilimani — Nairobi's most dynamic residential and commercial hub." />;
}

export function LavingtonPage() {
  return <LocationPage location="Lavington" area="Nairobi" title="Properties in Lavington" description="Serene residential living in Lavington — one of Nairobi's leafy, most established neighbourhoods." />;
}

export function MombasaPage() {
  return <LocationPage location="Mombasa" area="Mombasa" title="Properties in Mombasa" description="Beachfront villas and coastal apartments along Kenya's stunning Indian Ocean coastline." />;
}

export function MalindiPage() {
  return <LocationPage location="Malindi" area="Mombasa" title="Properties in Malindi" description="Luxury beachfront homes and investment villas in the historic town of Malindi on Kenya's north coast." />;
}
