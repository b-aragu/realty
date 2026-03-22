"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  return (
    <Link href={`/residences/${property.id}`} className="block">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="group relative cursor-pointer overflow-hidden"
      >
        {/* Image */}
        <div className={`relative overflow-hidden bg-[#1c2340] ${featured ? "h-[420px]" : "h-[340px]"}`}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
            style={{
              backgroundImage: `url(${property.image})`,
              backgroundColor: "#dde1ee",
            }}
          />
          {/* Hover overlay — dark navy gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,35,64,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

          {/* Cobalt hover tint from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(46,68,128,0.25)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

          {/* Badge — frosted glass pill */}
          <span className="absolute top-5 left-5 z-[3] text-[0.45rem] tracking-[0.32em] uppercase text-white/80 bg-[rgba(28,35,64,0.6)] backdrop-blur-[8px] px-3 py-1.5 border border-white/[0.15]">
            {property.status}
          </span>

          {/* CTA — slides up on hover */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 text-[0.52rem] tracking-[0.26em] uppercase text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-100 z-[3]">
            View Property
            <span className="flex-1 h-px bg-white/40" />
          </div>
        </div>

        {/* Body */}
        <div className="py-5 border-b border-[#dde1ee] group-hover:border-[#2e4480] transition-colors duration-300">
          {/* Location */}
          <p className="text-[0.5rem] tracking-[0.28em] uppercase text-[#8b91a8] mb-2">
            {property.location}
          </p>

          {/* Title */}
          <h3 className="font-cormorant font-light text-[1.2rem] leading-[1.3] tracking-[0.01em] text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300 mb-4">
            {property.title}
          </h3>

          {/* Specs — dot separated */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.5rem] tracking-[0.16em] text-[#8b91a8]">{property.bedrooms} Beds</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#dde1ee]" />
            <span className="text-[0.5rem] tracking-[0.16em] text-[#8b91a8]">{property.bathrooms} Baths</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#dde1ee]" />
            <span className="text-[0.5rem] tracking-[0.16em] text-[#8b91a8]">{property.sqm} m²</span>
          </div>

          {/* Price — editorial */}
          <div className="flex items-baseline gap-2">
            <span className="font-cormorant font-light text-[1.5rem] tracking-[0.02em] text-[#1c2340] leading-none">
              {property.price}
            </span>
            <span className="text-[0.48rem] tracking-[0.22em] uppercase text-[#8b91a8]">
              Asking Price
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
