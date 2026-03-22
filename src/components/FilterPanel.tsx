"use client";

import { useState } from "react";

export interface FilterState {
  search: string;
  location: string;
  priceRange: string;
  bedrooms: string;
  propertyType: string;
  status: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

const filterGroups: { key: keyof FilterState; label: string; options: string[] }[] = [
  { key: "location", label: "Location", options: ["All", "Nairobi", "Kiambu", "Mombasa", "Malindi", "Diani"] },
  { key: "priceRange", label: "Price", options: ["All", "Under KES 10M", "KES 10M - 20M", "KES 20M - 40M", "Above KES 40M", "Rental"] },
  { key: "bedrooms", label: "Bedrooms", options: ["All", "Studio", "1", "2", "3", "4+"] },
  { key: "propertyType", label: "Type", options: ["All", "Apartment", "House", "Villa", "Penthouse", "Townhouse"] },
  { key: "status", label: "Status", options: ["All", "For Sale", "For Rent", "Off-Plan"] },
];

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
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

  return (
    <div className="border border-[#dde1ee] bg-[#f8f7f4] p-5 sm:p-7 w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 sm:gap-5 items-end">
        
        {/* Search Bar */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="block text-[0.46rem] tracking-[0.3em] text-[#8b91a8] uppercase mb-2">
            Search
          </label>
          <div className="relative">
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
              placeholder="Keyword or Ref..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#dde1ee] text-[0.6rem] tracking-[0.12em] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors placeholder:text-[#8b91a8]/50 placeholder:font-light"
            />
          </div>
        </div>

        {/* Dropdowns */}
        {filterGroups.map(({ key, label, options }) => (
          <div key={key}>
            <label className="block text-[0.46rem] tracking-[0.3em] text-[#8b91a8] uppercase mb-2">
              {label}
            </label>
            <select
              value={filters[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#dde1ee] text-[0.6rem] tracking-[0.12em] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors appearance-none cursor-pointer font-light"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

      </div>
    </div>
  );
}
