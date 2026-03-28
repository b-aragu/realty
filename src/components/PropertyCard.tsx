"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const dotColor = property.status === "For Rent" ? "#6898d4" : property.status === "Off-Plan" ? "#4caf82" : "#c49a3c";

  return (
    <Link href={`/residences/${property.slug || property.id}`} className="block">
      <div className="group flex flex-col bg-[#f8f7f4] transition-all duration-300">
        {/* Image Portion */}
        <div 
          className={cn(
            "relative overflow-hidden bg-[#1c2340] flex-shrink-0 transition-all duration-500",
            featured ? "aspect-[3/4]" : "aspect-[4/3]"
          )}
        >
          {/* Main Image */}
          <div
            className="absolute inset-0 transition-transform duration-[900ms] cubic-bezier(0.4,0,0.2,1) group-hover:scale-105"
            style={{
              backgroundImage: `url(${property.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent calc(16.666% - 0.5px), #fff calc(16.666% - 0.5px), #fff 16.666%)"
            }} />
          </div>

          {/* Frosted Badge */}
          <div className="absolute top-4 left-4 z-[3] flex items-center gap-2 px-3 py-1.5 bg-[rgba(248,247,244,0.15)] backdrop-blur-[10px] border border-white/20">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
            <span className="text-[0.4rem] tracking-[0.26em] uppercase text-white/75">
              {property.status}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 z-[2] bg-[rgba(28,35,64,0.42)] opacity-0 transition-opacity duration-400 flex items-center justify-center group-hover:opacity-100">
            <div className="flex items-center gap-3 text-[0.48rem] tracking-[0.28em] uppercase text-white/85 opacity-0 translate-y-1.5 transition-all duration-300 delay-[60ms] group-hover:opacity-100 group-hover:translate-y-0">
              View Property
              <div className="w-5 h-px bg-[#c49a3c] transition-all duration-400 group-hover:w-8" />
            </div>
          </div>
        </div>

        {/* Info Below */}
        <div className="py-6 lg:py-7 border-b border-[#dde1ee] group-hover:border-[#2e4480] transition-colors duration-400">
          {/* Gold rule */}
          <div className="w-6 h-px bg-[#c49a3c] mb-3 transition-all duration-450 cubic-bezier(0.4,0,0.2,1) group-hover:w-10" />

          <p className="text-[0.44rem] tracking-[0.24em] uppercase text-[#8b91a8] mb-1.5">
            {property.location}
          </p>

          <h3 className="font-cormorant font-light text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.2] text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300 mb-4">
            {property.title}
          </h3>

          {/* Specs Row */}
          <div className="flex items-center border-t border-b border-[#dde1ee] py-3.5 mb-4">
            <div className="flex flex-col gap-0.5 pr-4.5">
              <span className="text-[0.38rem] tracking-[0.24em] uppercase text-[#8b91a8]">Beds</span>
              <span className="font-cormorant font-light text-[0.9rem] text-[#1c2340] leading-none">
                {property.bedrooms} Bed
              </span>
            </div>
            <div className="w-px h-6 bg-[#dde1ee]" />
            <div className="flex flex-col gap-0.5 px-4.5">
              <span className="text-[0.38rem] tracking-[0.24em] uppercase text-[#8b91a8]">Baths</span>
              <span className="font-cormorant font-light text-[0.9rem] text-[#1c2340] leading-none">
                {property.bathrooms} Bath
              </span>
            </div>
            <div className="w-px h-6 bg-[#dde1ee]" />
            <div className="flex flex-col gap-0.5 pl-4.5">
              <span className="text-[0.38rem] tracking-[0.24em] uppercase text-[#8b91a8]">Size</span>
              <span className="font-cormorant font-light text-[0.9rem] text-[#1c2340] leading-none">
                {property.sqm} m²
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-[0.38rem] tracking-[0.24em] uppercase text-[#8b91a8]">
              {property.status === "For Rent" ? "Asking" : "From"}
            </span>
            <span className="font-cormorant font-light text-[1.25rem] text-[#1c2340] leading-none tracking-tight">
              {property.price}
            </span>
            {property.status === "For Rent" && (
              <span className="text-[0.44rem] tracking-[0.16em] text-[#8b91a8] font-light">
                / month
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

