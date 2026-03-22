"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRouter } from "next/navigation";
import { Property } from "@/data/properties";

export interface SubLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
  type: string;
  price: string;
  zoom: number;
  properties: Property[];
}

export interface MacroLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
  type: string;
  price: string;
  zoom: number;
  subLocations: SubLocation[];
}

interface MapComponentProps {
  macroLocations?: MacroLocation[];
  singleProperty?: any; // Accepting any object mapping for property/project
  center?: [number, number];
  zoom?: number;
  className?: string;
  splitLayout?: boolean;
  hideDefaultControls?: boolean;
}

type ViewContext = "macro" | "sub" | "property";

export default function MapComponent({
  macroLocations = [],
  singleProperty,
  center = [36.82, -1.29],
  zoom = 6.5,
  className = "",
  splitLayout = false,
  hideDefaultControls = false,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});
  const [loaded, setLoaded] = useState(false);

  const [activeMacro, setActiveMacro] = useState<MacroLocation | null>(null);
  const [activeSub, setActiveSub] = useState<SubLocation | null>(null);

  const router = useRouter();

  const resetView = useCallback(() => {
    setActiveMacro(null);
    setActiveSub(null);
    if (map.current) {
      map.current.flyTo({ center: [37.9, -1.5], zoom: 5.8, duration: 1500 });
    }
  }, []);

  const selectMacro = useCallback((macro: MacroLocation) => {
    setActiveMacro(macro);
    setActiveSub(null);
    if (map.current) {
      const isDesktop = window.innerWidth >= 1024;
      const offset: [number, number] = isDesktop && splitLayout ? [-180, 0] : [0, 0];
      map.current.flyTo({ center: macro.coordinates, zoom: macro.zoom || 11, offset, duration: 1200 });
    }
  }, [splitLayout]);

  const selectSub = useCallback((sub: SubLocation, macro: MacroLocation) => {
    if (activeMacro?.id !== macro.id) setActiveMacro(macro);
    setActiveSub(sub);
    if (map.current) {
      const isDesktop = window.innerWidth >= 1024;
      const offset: [number, number] = isDesktop && splitLayout ? [-180, 0] : [0, 0];
      map.current.flyTo({ center: sub.coordinates, zoom: sub.zoom || 14, offset, duration: 1200 });
    }
  }, [activeMacro, splitLayout]);

  const selectProperty = useCallback((prop: Property) => {
    if (map.current) {
      const isDesktop = window.innerWidth >= 1024;
      const offset: [number, number] = isDesktop && splitLayout ? [-180, 0] : [0, 0];
      map.current.flyTo({
        center: [prop.coordinates.lng, prop.coordinates.lat],
        zoom: 16,
        offset,
        duration: 1000
      });
    }
  }, [splitLayout]);

  const goProperty = useCallback((prop: Property) => {
    router.push(`/residences/${prop.id}`);
  }, [router]);

  // Marker HTML generators — matching the remaster design
  const makeRegionHTML = (name: string, count: number, type: string, isActive: boolean, isMacro: boolean) => {
    // Determine region for color coding
    const isCoast = name.toLowerCase().includes("coast") || name.toLowerCase().includes("mombasa") || 
                   name.toLowerCase().includes("malindi") || name.toLowerCase().includes("diani") || 
                   name.toLowerCase().includes("watamu");
    
    const color = isCoast ? '#c49a3c' : '#2e4480';
    const borderColor = isCoast ? '#c49a3c' : '#2e4480';
    const bgColor = isActive ? (isCoast ? '#1c2340' : '#1c2340') : '#f8f7f4'; // Navy active
    const countColor = isActive ? '#c49a3c' : color;
    const labelColor = isActive ? 'rgba(255,255,255,0.45)' : '#8b91a8';
    const textColor = isActive ? '#f8f7f4' : '#1c2340';
    const arrowColor = isActive ? '#1c2340' : borderColor;
    const scale = isActive ? 'transform:scale(1.08) translateY(-2px);' : '';
    const shadow = isActive
      ? 'box-shadow:0 6px 24px rgba(28,35,64,0.28);'
      : 'box-shadow:0 2px 12px rgba(28,35,64,0.1);';

    const pulse = isActive
      ? `<div style="
          position:absolute;top:50%;left:50%;
          transform:translate(-50%,-50%);
          width:44px;height:44px;border-radius:50%;
          border:1.5px solid rgba(46,68,128,0.35);
          animation:pulseRing 2s ease-out infinite;
          pointer-events:none;
        "></div>`
      : '';

    return `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        ${pulse}
        <div style="
          background:${bgColor};
          border:1.5px solid ${arrowColor};
          color:${textColor};
          font-family:var(--font-sans),sans-serif;
          font-weight:300;
          font-size:10px;
          letter-spacing:0.04em;
          padding:5px 11px;
          white-space:nowrap;
          display:flex;align-items:center;gap:6px;
          position:relative;
          ${shadow}
          ${scale}
          transition:all 0.3s ease;
          cursor:pointer;
        ">
          <span style="
            font-family:var(--font-cormorant),serif;
            font-weight:300;
            font-size:14px;
            color:${countColor};
            line-height:1;
          ">${count}</span>
          <div>
            <div style="font-size:9px;letter-spacing:0.08em;color:${textColor};line-height:1.2;">${name}</div>
            <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:${labelColor};line-height:1;">${type}</div>
          </div>
          <div style="
            position:absolute;bottom:-7px;left:50%;
            transform:translateX(-50%);
            width:0;height:0;
            border-left:5px solid transparent;
            border-right:5px solid transparent;
            border-top:7px solid ${arrowColor};
          "></div>
        </div>
      </div>
    `;
  };

  const makePropertyHTML = (prop: Property) => {
    return `
      <div style="background:#f8f7f4; border:1.5px solid #1c2340; padding:5px 12px 5px 8px; display:flex; align-items:center; gap:7px; box-shadow:0 3px 16px rgba(28,35,64,0.14); position:relative; white-space:nowrap; cursor:pointer;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'" style="transition:transform 0.2s ease;">
        <div style="content:''; position:absolute; bottom:-7.5px; left:50%; transform:translateX(-50%); border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #1c2340;"></div>
        <div style="width:6px; height:6px; border-radius:50%; background:#c49a3c; flex-shrink:0;"></div>
        <div>
          <div style="font-family:var(--font-cormorant),serif; font-weight:300; font-size:12px; color:#1c2340; letter-spacing:0.04em; line-height:1.2;">
            ${prop.projectName || prop.title.split(' ')[0]}
          </div>
          <div style="font-size:8px; letter-spacing:0.14em; text-transform:uppercase; color:#8b91a8; line-height:1; margin-top:1px;">
            ${prop.location.split(',')[0]}
          </div>
        </div>
      </div>
    `;
  };

  const renderMarkers = useCallback(() => {
    if (!map.current || !loaded) return;

    // Clear existing
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    let markersToCreate: { id: string; el: HTMLElement; coords: [number, number]; zIndex: string }[] = [];

    if (singleProperty) {
      const elProp = document.createElement("div");
      elProp.innerHTML = makePropertyHTML(singleProperty);
      elProp.addEventListener("mouseenter", () => selectProperty(singleProperty));
      // Disable click routing if it's already on the detail page
      markersToCreate.push({ id: `prop-${singleProperty.id}`, el: elProp, coords: [singleProperty.coordinates.lng, singleProperty.coordinates.lat], zIndex: "50" });
    } else if (!activeMacro) {
      // LEVEL 0: Show Macro Regions
      macroLocations.forEach(macro => {
        const totalCount = macro.subLocations.reduce((sum, sub) => sum + sub.properties.length, 0);
        const el = document.createElement("div");
        el.innerHTML = makeRegionHTML(macro.name, totalCount, macro.type, false, true);
        el.addEventListener("click", (e) => { e.stopPropagation(); selectMacro(macro); });
        markersToCreate.push({ id: `macro-${macro.id}`, el, coords: macro.coordinates, zIndex: "10" });
      });
    } else if (!activeSub) {
      // LEVEL 1: Show Sub-Locations within active Macro
      activeMacro.subLocations.forEach(sub => {
        const el = document.createElement("div");
        el.innerHTML = makeRegionHTML(sub.name, sub.properties.length, sub.type, false, false);
        el.addEventListener("click", (e) => { e.stopPropagation(); selectSub(sub, activeMacro); });
        markersToCreate.push({ id: `sub-${sub.id}`, el, coords: sub.coordinates, zIndex: "20" });
      });
    } else {
      // LEVEL 2: Show Properties within active Sub-Location + Active Sub-Location Pill
      const elSub = document.createElement("div");
      elSub.innerHTML = makeRegionHTML(activeSub.name, activeSub.properties.length, activeSub.type, true, false);
      markersToCreate.push({ id: `active-sub-${activeSub.id}`, el: elSub, coords: activeSub.coordinates, zIndex: "30" });

      activeSub.properties.forEach(prop => {
        const elProp = document.createElement("div");
        elProp.innerHTML = makePropertyHTML(prop);
        elProp.addEventListener("click", (e) => { e.stopPropagation(); goProperty(prop); });
        elProp.addEventListener("mouseenter", () => selectProperty(prop));
        markersToCreate.push({ id: `prop-${prop.id}`, el: elProp, coords: [prop.coordinates.lng, prop.coordinates.lat], zIndex: "50" });
      });
    }

    markersToCreate.forEach(mtc => {
      mtc.el.style.zIndex = mtc.zIndex;
      const marker = new maplibregl.Marker({ element: mtc.el, anchor: 'bottom' })
        .setLngLat(mtc.coords)
        .addTo(map.current!);
      markersRef.current[mtc.id] = marker;
    });

  }, [loaded, activeMacro, activeSub, macroLocations, singleProperty, selectMacro, selectSub, goProperty, selectProperty]);

  useEffect(() => {
    renderMarkers();
  }, [renderMarkers]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "carto-tiles": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com">CARTO</a>',
          },
        },
        layers: [{ id: "carto-layer", type: "raster", source: "carto-tiles", minzoom: 0, maxzoom: 19 }],
      },
      center: center,
      zoom: zoom,
      minZoom: 4,
      maxZoom: 16,
      scrollZoom: true,
      maxBounds: [[28, -12], [52, 8]],
      attributionControl: false,
    });

    if (!hideDefaultControls) {
      map.current.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    }

    map.current.on("load", () => {
      setLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  const mapElement = (
    <div className={`relative overflow-hidden ${splitLayout ? "h-full" : `rounded-lg border border-[#dde1ee] ${className}`}`}>
      <div ref={mapContainer} className="w-full h-full min-h-[280px] sm:min-h-[400px]" />
      
      {!loaded && (
        <div className="absolute inset-0 bg-[#f8f7f4] flex items-center justify-center z-[100]">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-[#1c2340] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#8b91a8] tracking-wide">Loading map</p>
          </div>
        </div>
      )}

      {/* Breadcrumb / Reset */}
      {splitLayout && (activeMacro || activeSub) && (
        <button 
          onClick={resetView}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur px-4 py-2 border border-[#dde1ee] shadow-sm text-[0.45rem] tracking-[0.2em] uppercase text-[#1c2340] hover:text-[#2e4480] hover:border-[#2e4480] transition-all cursor-pointer"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Kenya Overview
        </button>
      )}

      {!activeMacro && splitLayout && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 border border-[#dde1ee] text-[0.44rem] tracking-[0.2em] uppercase text-[#8b91a8]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#2e4480]" />
            Nairobi Region
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 border border-[#dde1ee] text-[0.44rem] tracking-[0.2em] uppercase text-[#8b91a8]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#c49a3c]" />
            Coast Region
          </div>
        </div>
      )}

      {/* Custom zoom controls */}
      {!hideDefaultControls && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-0.5">
          <button onClick={handleZoomIn} className="w-8 h-8 bg-white/95 border border-[#dde1ee] flex items-center justify-center text-[#1c2340] hover:bg-[#1c2340] hover:text-white transition-colors cursor-pointer">+</button>
          <button onClick={handleZoomOut} className="w-8 h-8 bg-white/95 border border-[#dde1ee] flex items-center justify-center text-[#1c2340] hover:bg-[#1c2340] hover:text-white transition-colors cursor-pointer">−</button>
        </div>
      )}

      <style>{`
        @keyframes pulseRing {
          0% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }
        .maplibregl-ctrl-attrib {
          background: rgba(248,247,244,0.85) !important;
          font-family: var(--font-sans), sans-serif;
          font-size: 9px !important;
          color: #8b91a8 !important;
          letter-spacing: 0.05em;
          padding: 3px 6px !important;
          border: none !important;
        }
      `}</style>
    </div>
  );

  if (!splitLayout) return mapElement;

  const totalProperties = macroLocations.reduce((acc, m) => acc + m.subLocations.reduce((sAcc, s) => sAcc + s.properties.length, 0), 0);
  const totalLocations = macroLocations.reduce((acc, m) => acc + m.subLocations.length, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] h-auto lg:h-[calc(100vh-65px)] lg:max-h-[750px] border border-[#dde1ee] bg-white overflow-hidden shadow-sm">
      {/* ── LEFT PANEL ── */}
      <div className="flex flex-col border-r border-[#dde1ee] bg-white relative">
        <div className="px-8 lg:px-12 pt-12 pb-6 flex flex-col">
          <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-4 font-montserrat font-light">Locations</p>
          <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] leading-[1.08] text-[#1c2340]">
            Explore <em className="italic text-[#3a5299]">Kenya</em>
          </h2>
          <div className="w-8 h-px bg-[#c49a3c] my-6" />
          <p className="text-[0.65rem] leading-[2] tracking-[0.07em] text-[#8b91a8] max-w-[34ch] mb-8 font-montserrat font-light">
            From Nairobi's premium neighbourhoods to the Indian Ocean coastline — click any location to explore available properties.
          </p>
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto px-0 custom-scrollbar-thin">
          {macroLocations.map((macro) => {
            const isActive = activeMacro?.id === macro.id;
            const propertyCount = macro.subLocations.reduce((acc, s) => acc + s.properties.length, 0);

            return (
              <div 
                key={macro.id}
                onClick={() => isActive ? resetView() : selectMacro(macro)}
                className={`relative flex items-start gap-4 py-6 px-8 lg:px-12 border-b border-[#dde1ee] cursor-pointer group transition-all duration-350 overflow-hidden
                  ${isActive ? "pl-14" : "hover:pl-14"}`}
              >
                {/* Active/Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[rgba(46,68,128,0.045)] to-transparent transition-transform duration-500 ease-out 
                  ${isActive ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0"}`} 
                />
                
                {/* Active Left Border */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#2e4480] transition-transform duration-350 origin-bottom
                  ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} 
                />

                {/* Count Bubble */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-cormorant font-light text-[0.75rem] transition-colors duration-300 shrink-0 mt-0.5
                  ${isActive ? "bg-[#2e4480] text-white" : "bg-[#dde1ee] text-[#8b91a8] group-hover:bg-[#2e4480] group-hover:text-white"}`}
                >
                  {propertyCount}
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className={`font-cormorant font-light text-[1.15rem] leading-tight transition-colors duration-300 
                    ${isActive ? "text-[#2e4480]" : "text-[#1c2340] group-hover:text-[#2e4480]"}`}
                  >
                    {macro.name}
                  </h3>
                  <p className="text-[0.52rem] tracking-[0.06em] text-[#8b91a8] mt-1.5 leading-relaxed font-montserrat font-light">
                    {macro.description}
                  </p>
                </div>

                <div className={`relative z-10 font-cormorant font-light text-[0.88rem] text-[#8b91a8] transition-all duration-300 shrink-0 text-right mt-0.5
                  ${isActive ? "opacity-100 translate-x-0 text-[#3a5299]" : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}
                >
                  {macro.price}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="px-8 lg:px-12 py-8 border-t border-[#dde1ee] flex items-center gap-8 mt-auto bg-[#f8f7f4]/50">
          <div className="flex flex-col">
            <span className="font-cormorant font-light text-[1.5rem] text-[#1c2340] leading-none">{totalProperties}+</span>
            <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mt-1 font-montserrat">Properties</span>
          </div>
          <div className="w-px h-8 bg-[#dde1ee]" />
          <div className="flex flex-col">
            <span className="font-cormorant font-light text-[1.5rem] text-[#1c2340] leading-none">{totalLocations}</span>
            <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mt-1 font-montserrat">Locations</span>
          </div>
          <div className="w-px h-8 bg-[#dde1ee]" />
          <div className="flex flex-col">
            <span className="font-cormorant font-light text-[1.5rem] text-[#1c2340] leading-none">{macroLocations.length}</span>
            <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8] mt-1 font-montserrat">Regions</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative h-[450px] lg:h-full">
        {mapElement}
      </div>

      <style>{`
        .custom-scrollbar-thin::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #dde1ee; }
      `}</style>
    </div>
  );
}
