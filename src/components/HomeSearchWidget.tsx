"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

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

  // 1. Determine active array context
  const relevantItems = useMemo(() => {
    if (activeTab === "Off-Plan") return projects;
    if (activeTab === "For Rent") return properties.filter(p => p.status === "For Rent" || p.status === "To Let");
    if (activeTab === "For Sale") return properties.filter(p => p.status === "For Sale");
    return properties;
  }, [activeTab, properties, projects]);

  // 2. Fetch unique geographical locations strictly present in the active inventory
  const dynamicLocations = useMemo(() => {
    const locs = relevantItems.map(p => p.location || p.area).filter(Boolean);
    return Array.from(new Set(locs)).sort();
  }, [relevantItems]);

  // 3. Extract exact configurations of bedrooms available right now
  const dynamicBeds = useMemo(() => {
    const b = relevantItems.map(p => p.bedrooms?.toString()).filter(Boolean);
    const set = new Set<string>();
    b.forEach(bedStr => {
      if (bedStr.toLowerCase().includes('studio')) set.add('Studio');
      else {
        const num = parseInt(bedStr);
        if (!isNaN(num)) {
          if (num >= 4) set.add("4+");
          else set.add(num.toString());
        }
      }
    });
    return Array.from(set).sort((a,b) => {
      if(a === 'Studio') return -1;
      if(b === 'Studio') return 1;
      if(a === '4+') return 1;
      if(b === '4+') return -1;
      return parseInt(a) - parseInt(b);
    });
  }, [relevantItems]);

  // 4. Derive logical budget brackets, mapping real fetched prices to standardized FilterPanel structures
  const dynamicBudgets = useMemo(() => {
    if (activeTab === "For Rent") return ["Rental"]; // Usually rent prices use different metrics in FilterPanel

    const prices = relevantItems.map(p => {
       const str = p.price || p.startingPrice || "0";
       const num = parseInt(str.toString().replace(/\D/g, ""), 10);
       return isNaN(num) ? 0 : num;
    }).filter(p => p > 0);

    const activeBrackets = new Set<string>();
    prices.forEach(num => {
       if (num < 10000000) activeBrackets.add("Under KES 10M");
       else if (num <= 20000000) activeBrackets.add("KES 10M - 20M");
       else if (num <= 40000000) activeBrackets.add("KES 20M - 40M");
       else activeBrackets.add("Above KES 40M");
    });

    const standardBrackets = ["Under KES 10M", "KES 10M - 20M", "KES 20M - 40M", "Above KES 40M"];
    return standardBrackets.filter(b => activeBrackets.has(b));
  }, [relevantItems, activeTab]);

  // 5. Compute real-time filtered results counter to show on the UI instantly
  const liveCount = useMemo(() => {
    return relevantItems.filter(p => {
      let match = true;
      if (location && location !== "") {
        const loc = p.location || p.area;
        if (!loc || !loc.includes(location)) match = false;
      }
      if (beds && beds !== "") {
        const b = p.bedrooms?.toString() || "";
        if (beds === "Studio" && !b.toLowerCase().includes('studio')) match = false;
        else if (beds === "4+" && parseInt(b) < 4) match = false;
        else if (beds !== "Studio" && beds !== "4+" && parseInt(b) !== parseInt(beds)) match = false;
      }
      if (budget && budget !== "") {
        const num = parseInt((p.price || p.startingPrice || "0").toString().replace(/\D/g, ""));
        if (budget === "Under KES 10M" && num >= 10000000) match = false;
        if (budget === "KES 10M - 20M" && (num < 10000000 || num > 20000000)) match = false;
        if (budget === "KES 20M - 40M" && (num < 20000000 || num > 40000000)) match = false;
        if (budget === "Above KES 40M" && num <= 40000000) match = false;
      }
      if (query && query !== "") {
        const q = query.toLowerCase();
        const t = (p.title || "").toLowerCase();
        const d = (p.description || "").toLowerCase();
        const l = (p.location || p.area || "").toLowerCase();
        if(!t.includes(q) && !d.includes(q) && !l.includes(q)) match = false;
      }
      return match;
    }).length;
  }, [relevantItems, location, beds, budget, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (activeTab) params.append("status", activeTab);
    if (location) params.append("location", location);
    if (beds) params.append("beds", beds);
    if (budget) params.append("budget", budget);

    if (activeTab === "Off-Plan") {
      router.push(`/discover?${params.toString()}`);
    } else {
      router.push(`/residences?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col mb-10 mx-0.5 bg-white border border-[#dde1ee] border-t-2 border-t-[#c49a3c] lg:hidden relative z-40 lg:static sticky lg:top-auto top-[56px] shadow-[0_12px_40px_-15px_rgba(28,35,64,0.1)]"
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
            onClick={() => {
              setActiveTab(tab);
              setLocation(""); setBeds(""); setBudget(""); setQuery("");
            }}
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
      <div className="flex items-stretch px-2 sm:px-3 border-b border-[#dde1ee] relative bg-[#f8f7f4] shrink-0 min-h-[50px]">
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

        {/* Sharp Action Button with dynamic label scaling */}
        <button
          type="submit"
          className="group flex flex-col justify-center bg-[#1c2340] hover:bg-[#c49a3c] transition-colors duration-400 my-1 px-4 sm:px-5 shrink-0 ml-1 border-b-[2px] border-[#c49a3c] hover:border-b-[#1c2340]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[0.48rem] tracking-[0.2em] uppercase text-white font-light mt-[0.5px]">
              {liveCount > 0 ? liveCount : 0} <span className="hidden sm:inline">Found</span>
            </span>
            <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] stroke-[#c49a3c] group-hover:stroke-white fill-none stroke-[1.5] group-hover:translate-x-1 transition-all duration-300">
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="13 5 20 12 13 19" />
            </svg>
          </div>
        </button>
      </div>

      {/* Bottom Dropdowns Row Contextually Rendered */}
      <div className="grid grid-cols-3 divide-x divide-[#dde1ee] bg-white shrink-0">
        {/* Locations */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="flex items-center gap-[0.35rem] text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[3px] leading-none">
            <svg viewBox="0 0 24 24" className="w-[9px] h-[9px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0 transform -translate-y-[0.5px]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location
          </span>
          <select
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate -ml-0.5"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">{dynamicLocations.length ? "Any Region" : "N/A"}</option>
            {dynamicLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Beds */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="flex items-center gap-[0.35rem] text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[3px] leading-none">
            <svg viewBox="0 0 24 24" className="w-[9px] h-[9px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0 transform -translate-y-[0.5px]">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Beds
          </span>
          <select
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate -ml-0.5"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          >
            <option value="">{dynamicBeds.length ? "Any Size" : "N/A"}</option>
            {dynamicBeds.map((b) => (
              <option key={b} value={b}>
                {b === 'Studio' ? b : `${b} Bed`}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="flex flex-col px-3 py-2.5">
          <span className="flex items-center gap-[0.35rem] text-[0.34rem] tracking-[0.2em] uppercase text-[#8b91a8] mb-[3px] leading-none">
            <svg viewBox="0 0 24 24" className="w-[9px] h-[9px] stroke-[#8b91a8] fill-none stroke-[1.5] shrink-0 transform -translate-y-[0.5px]">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            Budget
          </span>
          <select
            className="w-full bg-transparent border-none outline-none font-montserrat font-light text-[0.52rem] tracking-[0.04em] text-[#1c2340] appearance-none cursor-pointer truncate -ml-0.5"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">{dynamicBudgets.length ? "Any Limit" : "N/A"}</option>
            {dynamicBudgets.map((bdg) => (
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
