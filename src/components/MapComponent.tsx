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

  // Marker HTML generators
  const makeRegionHTML = (name: string, count: number, type: string, isActive: boolean, isMacro: boolean) => {
    const isCoast = name === 'The Coast' || name === 'Nyali' || name === 'Malindi' || name === 'Diani';
    const color = isCoast ? '#c49a3c' : '#2e4480';
    const bgColor = isActive ? '#1c2340' : '#f8f7f4';
    const textColor = isActive ? '#f8f7f4' : '#1c2340';
    const accentColor = isActive ? '#c49a3c' : color;
    const shadow = isActive ? 'box-shadow:0 6px 24px rgba(28,35,64,0.28);' : 'box-shadow:0 2px 12px rgba(28,35,64,0.1);';
    const scale = isActive ? 'transform:scale(1.08) translateY(-2px);' : '';
    const pulse = isActive ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(46,68,128,0.35);animation:pulseRing 2s ease-out infinite;pointer-events:none;"></div>` : '';

    return `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
        ${pulse}
        <div style="background:${bgColor};border:1.5px solid ${isActive ? '#1c2340' : color};color:${textColor};font-family:var(--font-sans),sans-serif;font-weight:300;font-size:10px;letter-spacing:0.04em;padding:4px 10px;white-space:nowrap;display:flex;align-items:center;gap:6px;position:relative;${shadow}${scale}transition:all 0.3s ease;">
          <span style="font-family:var(--font-cormorant),serif;font-weight:300;font-size:14px;color:${accentColor};line-height:1;">${count}</span>
          <div>
            <div style="font-size:9px;letter-spacing:0.08em;line-height:1.2;">${name}</div>
            <div style="font-size:7.5px;letter-spacing:0.14em;text-transform:uppercase;color:${isActive ? 'rgba(255,255,255,0.45)' : '#8b91a8'};line-height:1;">${type}</div>
          </div>
          <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:6px solid ${isActive ? '#1c2340' : color};"></div>
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch border border-[#dde1ee] overflow-hidden bg-white h-auto lg:h-[calc(100vh-65px)] lg:max-h-[700px] lg:min-h-[550px]">
      {/* Left panel — Nested Accordion List */}
      <div className="lg:col-span-4 flex flex-col border-r border-[#dde1ee] relative lg:overflow-hidden h-full">
        <div className="px-6 lg:px-8 pt-8 pb-5 border-b border-[#dde1ee] bg-[#f8f7f4] z-10">
          <p className="text-[0.48rem] tracking-[0.34em] uppercase text-[#2e4480] mb-2">Interactive Map</p>
          <h2 className="font-cormorant font-light text-[clamp(1.8rem,2vw,2.2rem)] leading-[1.1] text-[#1c2340]">
            {activeSub ? activeSub.name : activeMacro ? activeMacro.name : "Explore Kenya"}
          </h2>
          {activeSub ? (
            <p className="text-[0.55rem] tracking-[0.08em] mt-2 text-[#8b91a8] leading-relaxed">
              {activeSub.properties.length} Active Properties
            </p>
          ) : (
            <p className="text-[0.55rem] tracking-[0.08em] mt-2 text-[#8b91a8] leading-relaxed">
              Select a region to reveal exact neighbourhoods and property mapping.
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto w-full custom-scrollbar-thin bg-white">
          {macroLocations.map((macro) => {
            const isMacroActive = activeMacro?.id === macro.id;
            const macroCount = macro.subLocations.reduce((acc, sub) => acc + sub.properties.length, 0);

            return (
              <div key={macro.id} className="border-b border-[#dde1ee]">
                {/* Macro Row */}
                <button
                  onClick={() => isMacroActive ? resetView() : selectMacro(macro)}
                  className={`w-full px-6 lg:px-8 py-5 flex items-center justify-between text-left transition-colors duration-300 ${isMacroActive ? "bg-[rgba(46,68,128,0.03)]" : "hover:bg-[#f8f7f4]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-cormorant font-light text-[0.8rem] transition-colors duration-300 ${isMacroActive ? "bg-[#2e4480] text-white" : "bg-white border border-[#dde1ee] text-[#1c2340]"}`}>
                      {macroCount}
                    </div>
                    <div>
                      <h3 className={`font-cormorant font-light text-[1.2rem] ${isMacroActive ? "text-[#2e4480]" : "text-[#1c2340]"}`}>{macro.name}</h3>
                      <p className="text-[0.48rem] tracking-[0.18em] uppercase text-[#8b91a8] mt-0.5">{macro.description}</p>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 text-[#8b91a8] transition-transform duration-300 ${isMacroActive ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Sub-Locations Accordion */}
                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMacroActive ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
                  {macro.subLocations.map((sub) => {
                    const isSubActive = activeSub?.id === sub.id;
                    return (
                      <div key={sub.id} className="border-t border-[#dde1ee]/50 bg-white">
                        <button
                          onClick={() => isSubActive ? selectMacro(macro) : selectSub(sub, macro)}
                          className={`w-full pl-14 pr-6 lg:pr-8 py-4 flex items-center justify-between text-left transition-colors duration-300 ${isSubActive ? "bg-[rgba(196,154,60,0.04)]" : "hover:bg-[#f8f7f4]"}`}
                        >
                          <div>
                            <h4 className={`font-cormorant font-light text-[1.05rem] ${isSubActive ? "text-[#c49a3c]" : "text-[#1c2340]"}`}>{sub.name}</h4>
                            <p className="text-[0.45rem] tracking-[0.15em] uppercase text-[#8b91a8] mt-0.5">{sub.properties.length} Properties</p>
                          </div>
                          {!isSubActive && <span className="text-[0.45rem] text-[#c49a3c] tracking-[0.1em] uppercase">View</span>}
                        </button>

                        {/* Property Leaves nested in Sub */}
                        <div className={`overflow-hidden transition-all duration-400 ${isSubActive ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="py-2 pb-4">
                            {sub.properties.map(prop => (
                              <button
                                key={prop.id}
                                onMouseEnter={() => selectProperty(prop)}
                                onClick={() => goProperty(prop)}
                                className="w-full pl-20 pr-6 lg:pr-8 py-3 flex items-center justify-between text-left hover:bg-[rgba(46,68,128,0.02)] group transition-colors"
                              >
                                <div className="flex-1 min-w-0 pr-4">
                                  <p className="font-sans text-[0.68rem] tracking-[0.05em] text-[#1c2340] truncate group-hover:text-[#2e4480] transition-colors">{prop.projectName || prop.title}</p>
                                  <p className="text-[0.55rem] text-[#8b91a8] mt-0.5">{prop.price}</p>
                                </div>
                                <svg className="w-3 h-3 text-[#c49a3c] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel — map */}
      <div className="lg:col-span-8 h-[500px] lg:h-full relative z-0">
        {mapElement}
      </div>
      
      <style>{`
        .custom-scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb { background: #dde1ee; border-radius: 4px; }
      `}</style>
    </div>
  );
}
