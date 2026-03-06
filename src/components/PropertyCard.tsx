"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/residences/${property.id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-[#eaeff3]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${property.image})`,
              backgroundColor: "#dce3ea",
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs tracking-wide bg-[#2f4858] text-white font-medium rounded-sm">
              {property.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-playfair text-lg text-[#131110] mb-1 leading-tight">
            {property.title}
          </h3>
          <p className="text-sm text-[#6b7c8a] mb-4">{property.location}</p>

          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold text-[#2f4858]">
              {property.price}
            </span>
            <div className="flex gap-3 text-sm text-[#6b7c8a]">
              <span>{property.bedrooms} bed</span>
              <span>·</span>
              <span>{property.bathrooms} bath</span>
              <span>·</span>
              <span>{property.sqm} m²</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
