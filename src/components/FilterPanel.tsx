"use client";

import { useState } from "react";

export interface FilterState {
  location: string;
  priceRange: string;
  bedrooms: string;
  propertyType: string;
  status: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: "All",
    priceRange: "All",
    bedrooms: "All",
    propertyType: "All",
    status: "All",
  });

  const update = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  };

  const selectStyle =
    "w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors appearance-none cursor-pointer";

  return (
    <div className="bg-white rounded-sm border border-[#eaeff3] p-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2 font-medium">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
            className={selectStyle}
          >
            <option>All</option>
            <option>Nairobi</option>
            <option>Kiambu</option>
            <option>Mombasa</option>
            <option>Malindi</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2 font-medium">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
            className={selectStyle}
          >
            <option>All</option>
            <option>Under KES 10M</option>
            <option>KES 10M - 20M</option>
            <option>KES 20M - 40M</option>
            <option>Above KES 40M</option>
            <option>Rental</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2 font-medium">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => update("bedrooms", e.target.value)}
            className={selectStyle}
          >
            <option>All</option>
            <option>Studio</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2 font-medium">
            Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            className={selectStyle}
          >
            <option>All</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Penthouse</option>
            <option>Townhouse</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2 font-medium">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className={selectStyle}
          >
            <option>All</option>
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Off-Plan</option>
          </select>
        </div>
      </div>
    </div>
  );
}
