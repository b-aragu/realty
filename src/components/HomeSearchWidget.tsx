"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Constant arrays extracted exactly from FilterPanel to ensure 100% routing synchronization.
const PREDEFINED_LOCATIONS = ["Nairobi", "Kiambu", "Kajiado", "Mombasa", "Malindi", "Diani", "Coast"];
const PREDEFINED_BUDGETS = ["Under KES 10M", "KES 10M - 20M", "KES 20M - 40M", "Above KES 40M", "Rental"];

export default function HomeSearchWidget({
  properties = [],
  projects = [],
}: {
  properties?: any[];
  projects?: any[];
}) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("For Sale");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (activeTab) params.append("status", activeTab);
    if (location) params.append("location", location);
    if (beds) params.append("beds", beds);
    if (budget) params.append("budget", budget);

    router.push(`/residences?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col mb-10 mx-0.5 bg-white border border-[#dde1ee] border-t-2 border-t-[#c49a3c] lg:hidden"
    >
      {/* Title */}
      <span className="text-[0.4rem] tracking-[0.32em] uppercase text-[#2e4480] px-4 pt-3 pb-1.5 block shrink-0">
        Property Search
      </span>

      {/* Tabs Row */}
      <div className="flex border-b border-[#dde1ee] overflow-hidden">
        {["For Sale", "For Rent", "Off-Plan"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 sm:py-2 text-[0.4rem] sm:text-[0.45rem] tracking-[0.2em] uppercase font-montserrat transition-colors ${
              activeTab === tab
                ? "text-[#2e4480] font-normal"
                : "text-[#8b91a8] hover:text-[#2e4480] font-extralight"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar + Action Button Row */}
      <div className="flex items-stretch px-2 sm:px-3 border-b border-[#dde1ee] relative bg-[#f8f7f4]/40 shrink-0 min-h-[50px]">
        {/* Input */}
        <div className="flex-1 flex items-center gap-3 py-1 px-2">
          <svg
            viewBox="0 0 24 24"
            className="w-[12px] h-[12px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search keyword or building..."
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.68rem] tracking-[0.02em] text-[#1c2340] placeholder:text-[#8b91a8]/60 placeholder:font-extralight"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Sharp Action Button inside the row */}
        <button
          type="submit"
          className="group flex flex-col items-center justify-center bg-[#1c2340] hover:bg-[#c49a3c] transition-colors duration-400 my-2 px-5 shrink-0 ml-1 border-b border-b-[#c49a3c] hover:border-b-[#1c2340]"
        >
          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] stroke-white fill-none stroke-[1.5] group-hover:translate-x-1 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Bottom Dropdowns Row */}
      <div className="grid grid-cols-3 divide-x divide-[#dde1ee] bg-[#f8f7f4] shrink-0">
        {/* Locations */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">
            <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location
          </span>
          <select
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Any Region</option>
            {PREDEFINED_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Beds */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">
            <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Beds
          </span>
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
          <span className="flex items-center gap-1.5 text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[2px]">
            <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            Budget
          </span>
          <select
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Any Limit</option>
            {PREDEFINED_BUDGETS.map((bdg) => (
              <option key={bdg} value={bdg}>
                {bdg}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
