"use client";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery from "@/components/Gallery";
import CTAButton from "@/components/ui/CTAButton";
import { properties } from "@/data/properties";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-[#eaeff3] rounded-sm flex items-center justify-center">
      <p className="text-sm text-[#6b7c8a]">Loading map…</p>
    </div>
  ),
});

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  return <PropertyPageClient property={property} />;
}

function PropertyPageClient({ property }: { property: (typeof properties)[0] }) {
  return (
    <>
      {/* Gallery */}
      <section className="pt-6 lg:pt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <Gallery images={property.images} title={property.title} />
          </AnimatedSection>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs tracking-wide bg-[#2f4858] text-white font-medium rounded-sm">
                    {property.status}
                  </span>
                  <span className="px-3 py-1 text-xs tracking-wide bg-[#eaeff3] text-[#6b7c8a] rounded-sm">
                    {property.propertyType}
                  </span>
                </div>
                <h1 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-2">
                  {property.title}
                </h1>
                <p className="text-[#6b7c8a] text-lg mb-2">{property.location}</p>
                <p className="text-2xl font-semibold text-[#131110] mb-8">{property.price}</p>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#eaeff3] mb-8">
                  {[
                    { value: property.bedrooms, label: "Bedrooms" },
                    { value: property.bathrooms, label: "Bathrooms" },
                    { value: property.sqm, label: "Sq Metres" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-semibold text-[#2f4858]">{stat.value}</p>
                      <p className="text-xs text-[#6b7c8a] uppercase tracking-wide mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h2 className="font-playfair text-xl text-[#2f4858] mb-4">About this property</h2>
                <p className="text-[#6b7c8a] leading-relaxed mb-8">{property.description}</p>

                <h2 className="font-playfair text-xl text-[#2f4858] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 px-4 py-3 bg-[#f5f8fa] border border-[#eaeff3] rounded-sm">
                      <span className="text-[#ffc14d]">✦</span>
                      <span className="text-sm text-[#131110]">{a}</span>
                    </div>
                  ))}
                </div>

                <h2 className="font-playfair text-xl text-[#2f4858] mb-4">Location</h2>
                <div className="h-64">
                  <MapComponent
                    locations={[
                      {
                        name: property.title,
                        coordinates: [property.coordinates.lng, property.coordinates.lat],
                        description: property.location,
                      },
                    ]}
                    center={[property.coordinates.lng, property.coordinates.lat]}
                    zoom={14}
                    className="h-full shadow-sm"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="sticky top-28 bg-white border border-[#eaeff3] rounded-sm p-8 shadow-sm">
                  <h3 className="font-playfair text-xl text-[#2f4858] mb-2">Interested?</h3>
                  <p className="text-sm text-[#6b7c8a] mb-6">
                    Contact our team to schedule a viewing or request more details.
                  </p>
                  <div className="space-y-4 mb-6">
                    <CTAButton href="/contact" variant="primary" className="w-full">
                      Schedule Viewing
                    </CTAButton>
                    <CTAButton href="/contact" variant="outline" className="w-full">
                      Request Info
                    </CTAButton>
                  </div>
                  <a
                    href={`https://wa.me/254712678334?text=Hi, I'm interested in ${property.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white text-sm rounded-sm hover:bg-[#1fb855] transition-colors"
                  >
                    <span>💬</span> Chat on WhatsApp
                  </a>
                  {property.projectName && (
                    <div className="mt-6 pt-6 border-t border-[#eaeff3]">
                      <p className="text-xs text-[#6b7c8a] uppercase tracking-wide mb-1">Development</p>
                      <p className="text-sm font-medium text-[#131110]">{property.projectName}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
