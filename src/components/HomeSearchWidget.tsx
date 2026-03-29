"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchWidget({ properties = [], projects = [] }: { properties?: any[], projects?: any[] }) {
  const [activeTab, setActiveTab] = useState("For Sale");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  // Safely extract unique locations from properties and projects
  // Format them so they capitalize decently, skipping undefined
  const extractedLocations = Array.from(
    new Set([
      ...properties.map(p => p.location?.area || p.location),
      ...projects.map(p => p.location?.area || p.location)
    ])
  ).filter(loc => typeof loc === "string" && loc.length > 0) as string[];

  // Fallback to basic locations if data array is empty
  const locations = extractedLocations.length > 0 
    ? extractedLocations 
    : ["Nairobi — Kilimani", "Nairobi — Lavington", "Coast — Diani", "Kiambu"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab) params.append("status", activeTab);
    if (location) params.append("location", location);
    if (beds) params.append("beds", beds);
    if (budget) params.append("budget", budget);
    
    router.push(`/residences?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col mb-8 border border-[#dde1ee] border-t-2 border-t-[#c49a3c] bg-white lg:hidden">
      <span className="text-[0.42rem] tracking-[0.32em] uppercase text-[#2e4480] px-4 pt-3 pb-1.5">
        Find a Property
      </span>
      
      {/* Tabs */}
      <div className="flex border-b border-[#dde1ee]">
        {["For Sale", "For Rent", "Off-Plan"].map((tab) => (
          <button 
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[0.44rem] tracking-[0.2em] uppercase transition-colors font-montserrat font-extralight border-b-[1.5px] -mb-[1px] ${
              activeTab === tab 
                ? "text-[#2e4480] border-[#2e4480]" 
                : "text-[#8b91a8] border-transparent hover:text-[#2e4480]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="flex flex-col px-4 py-2">
        {/* Location Dropdown */}
        <div className="flex items-center gap-3 py-2.5 border-b border-[#dde1ee]">
          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-[#8b91a8] fill-none stroke-[1.4] shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <select 
            className="flex-1 bg-transparent border-none outline-none font-montserrat font-extralight text-[0.6rem] tracking-[0.06em] text-[#1c2340] appearance-none cursor-pointer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms Dropdown */}
        <div className="flex items-center gap-3 py-2.5 border-b border-[#dde1ee]">
          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-[#8b91a8] fill-none stroke-[1.4] shrink-0">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <select 
            className="flex-1 bg-transparent border-none outline-none font-montserrat font-extralight text-[0.6rem] tracking-[0.06em] text-[#1c2340] appearance-none cursor-pointer"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">Bedrooms</option>
            <option value="Studio">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4+">4+ Bedrooms</option>
          </select>
        </div>

        {/* Budget Dropdown */}
        <div className="flex items-center gap-3 py-2.5">
          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-[#8b91a8] fill-none stroke-[1.4] shrink-0">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          <select 
            className="flex-1 bg-transparent border-none outline-none font-montserrat font-extralight text-[0.6rem] tracking-[0.06em] text-[#1c2340] appearance-none cursor-pointer"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Budget</option>
            <option value="Under 5M">Under KES 5M</option>
            <option value="5M-15M">KES 5M – 15M</option>
            <option value="15M-30M">KES 15M – 30M</option>
            <option value="30M-50M">KES 30M – 50M</option>
            <option value="Above 50M">Above KES 50M</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button 
        type="submit" 
        className="flex items-stretch mx-4 mt-2 mb-3 bg-[#1c2340] group hover:bg-[#2e4480] transition-colors duration-300"
      >
        <div className="w-0.5 bg-[#c49a3c] shrink-0 group-hover:w-1 transition-all duration-300" />
        <div className="flex-1 flex items-center justify-between px-4 py-2.5 max-h-[44px]">
          <span className="font-cormorant font-light text-[0.92rem] tracking-[0.1em] text-white">Search Properties</span>
          <div className="w-5 h-px bg-[#c49a3c] group-hover:w-8 transition-all duration-300" />
        </div>
      </button>
    </form>
  )
}
