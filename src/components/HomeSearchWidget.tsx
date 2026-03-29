"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchWidget({ properties = [], projects = [] }: { properties?: any[], projects?: any[] }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("For Sale");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const extractedLocations = Array.from(
    new Set([
      ...properties.map(p => p.location?.area || p.location),
      ...projects.map(p => p.location?.area || p.location)
    ])
  ).filter(loc => typeof loc === "string" && loc.length > 0) as string[];

  const locations = extractedLocations.length > 0 
    ? extractedLocations 
    : ["Nairobi — Kilimani", "Nairobi — Lavington", "Coast — Diani", "Kiambu"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (activeTab) params.append("status", activeTab);
    if (location) params.append("location", location);
    if (beds) params.append("beds", beds);
    if (budget) params.append("budget", budget);
    
    router.push(`/residences?${params.toString()}`);
  }

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex flex-col mx-0.5 mb-10 bg-white shadow-[0_12px_40px_rgba(28,35,64,0.06)] rounded border border-[#dde1ee]/50 overflow-hidden lg:hidden"
    >
      {/* Tabs Row */}
      <div className="flex items-center gap-6 px-5 pt-3 border-b border-[#dde1ee]/40 bg-[#fbfbfb]">
        {["For Sale", "For Rent", "Off-Plan"].map((tab) => (
          <button 
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative py-3 text-[0.42rem] tracking-[0.22em] uppercase transition-colors ${
              activeTab === tab 
                ? "text-[#1c2340] font-medium" 
                : "text-[#8b91a8] font-light hover:text-[#2e4480]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c49a3c] rounded-t-[1px]" />
            )}
          </button>
        ))}
      </div>

      {/* Primary Search Row (Input + Action Button) */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-[#dde1ee]/40 relative">
        <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#8b91a8]/70 fill-none stroke-[1.5] shrink-0 ml-1">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input 
          type="text"
          placeholder="Where do you want to live?"
          className="flex-1 bg-transparent border-none outline-none font-montserrat font-light text-[0.7rem] sm:text-[0.75rem] tracking-[0.02em] text-[#1c2340] placeholder:text-[#8b91a8]/60 placeholder:font-extralight py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* The Premium Gold Action Button replacing the massive bottom block */}
        <button 
          type="submit"
          className="w-9 h-9 shrink-0 bg-[#c49a3c] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#b08833] transition-colors hover:scale-105 active:scale-95 ml-2"
        >
          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-white fill-none stroke-[2]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Compressed Editorial Filters Row */}
      <div className="grid grid-cols-3 divide-x divide-[#dde1ee]/40 bg-[#f8f7f4]/30">
        {/* Location */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="text-[0.32rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">Location</span>
          <select 
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="text-[0.32rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">Beds</span>
          <select 
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Studio">Studio</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4+">4+ Beds</option>
          </select>
        </div>

        {/* Budget */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="text-[0.32rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">Budget</span>
          <select 
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Limit</option>
            <option value="Under 5M">{`< 5M`}</option>
            <option value="5M-15M">5M-15M</option>
            <option value="15M-30M">15M-30M</option>
            <option value="30M-50M">30M-50M</option>
            <option value="Above 50M">{`> 50M`}</option>
          </select>
        </div>
      </div>
    </form>
  )
}
