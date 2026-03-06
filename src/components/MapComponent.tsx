"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapLocation {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  description?: string;
  href?: string;
}

interface MapComponentProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function MapComponent({
  locations,
  center = [36.82, -1.29],
  zoom = 6.5,
  className = "",
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // CARTO free basemap — no API key needed (via mapcn approach)
      style: {
        version: 8,
        sources: {
          "carto-light": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "carto-light-layer",
            type: "raster",
            source: "carto-light",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center,
      zoom,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    map.current.on("load", () => {
      setLoaded(true);

      // Add markers
      locations.forEach((loc) => {
        const el = document.createElement("div");
        el.className = "wande-marker";
        el.style.width = "28px";
        el.style.height = "28px";
        el.style.borderRadius = "50%";
        el.style.background = "#2f4858";
        el.style.border = "3px solid #ffc14d";
        el.style.cursor = "pointer";
        el.style.boxShadow = "0 2px 8px rgba(47,72,88,0.3)";
        el.style.transition = "transform 0.3s";
        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.3)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
        });

        const popup = new maplibregl.Popup({
          offset: 20,
          closeButton: false,
          className: "wande-popup",
        }).setHTML(`
          <div style="font-family: Inter, sans-serif; padding: 4px 0;">
            <strong style="color: #2f4858; font-size: 14px;">${loc.name}</strong>
            ${loc.description ? `<p style="color: #6b7c8a; font-size: 12px; margin: 4px 0 0;">${loc.description}</p>` : ""}
          </div>
        `);

        new maplibregl.Marker({ element: el })
          .setLngLat(loc.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [locations, center, zoom]);

  return (
    <div className={`relative rounded-sm overflow-hidden ${className}`}>
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-[#eaeff3] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#2f4858] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-[#6b7c8a]">Loading map…</p>
          </div>
        </div>
      )}
    </div>
  );
}
