"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AnimatedSection from "./AnimatedSection";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#f8f7f4] flex flex-col items-center justify-center min-h-[480px]">
      <div className="w-6 h-6 border-2 border-[#1c2340] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs text-[#8b91a8] tracking-wide">Loading interactive map</p>
    </div>
  ),
});

/**
 * Parses YouTube and TikTok URLs into embeddable iframe sources.
 * Returns null if the URL format isn't recognized.
 */
function getEmbedUrl(url: string, autoplay=true): { src: string; platform: string } | null {
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") {
      let videoId: string | null = null;
      if (u.hostname === "youtu.be") {
        videoId = u.pathname.slice(1);
      } else if (u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.split("/shorts/")[1];
      } else if (u.pathname.startsWith("/embed/")) {
        videoId = u.pathname.split("/embed/")[1];
      } else {
        videoId = u.searchParams.get("v");
      }
      if (videoId) {
        videoId = videoId.split(/[?#&]/)[0];
        return {
          src: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`,
          platform: "YouTube",
        };
      }
    }

    // TikTok
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) {
        return {
          src: `https://www.tiktok.com/embed/v2/${match[1]}`,
          platform: "TikTok",
        };
      }
    }
  } catch {
    // invalid URL
  }
  return null;
}

interface TourLocationProps {
  title: string;
  location: string;
  videoUrl?: string;
  coordinates: { lat: number; lng: number };
  projectName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawObject: any;
}

export default function TourLocationGrid({ title, location, videoUrl, coordinates, projectName, rawObject }: TourLocationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embed = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div className="w-full">
      <AnimatedSection>
        {/* HEADER */}
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <p className="text-[0.46rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3.5">Explore the Property</p>
            <h2 className="font-cormorant font-light text-[clamp(1.8rem,2.2vw,2.4rem)] leading-[1.1] text-[#1c2340]">
              Tour &amp; <em className="italic text-[#3a5299]">Location</em>
            </h2>
            <div className="w-[1.2rem] h-px bg-[#c49a3c] mt-3.5" />
          </div>
        </div>

        {/* GRID */}
        <div className={`flex flex-col lg:grid ${embed ? 'lg:grid-cols-2' : ''} gap-4 lg:gap-[2px] bg-[#dde1ee]`}>
            
            {/* ── VIDEO (conditional, if no video Map takes full width below) ── */}
            {embed ? (
              <div className="flex flex-col bg-[#1c2340] relative overflow-hidden min-h-[300px] sm:min-h-[480px]">
                {embed.platform === "TikTok" ? (
                  /* TikTok aspect scaling logic */
                  <div className="relative flex-1 w-full max-w-[340px] mx-auto overflow-hidden bg-[#0c112a] aspect-[9/16] cursor-pointer group" onClick={() => setIsPlaying(true)}>
                    {renderVideoThumb(isPlaying, embed.platform, projectName, title, embed.src)}
                  </div>
                ) : (
                  /* YouTube wide aspect scaling logic */
                  <div className="relative flex-1 overflow-hidden cursor-pointer group" onClick={() => setIsPlaying(true)}>
                    {renderVideoThumb(isPlaying, embed.platform, projectName, title, embed.src)}
                  </div>
                )}

                {/* Footer Bar */}
                <div className="flex items-center justify-between px-6 lg:px-7 py-4 border-t border-white/5 bg-[#0c112a]/40 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-px bg-[#c49a3c]/50" />
                    <span className="text-[0.46rem] tracking-[0.26em] uppercase text-white/25">{embed.platform} · {projectName || title}</span>
                  </div>
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[0.46rem] tracking-[0.26em] uppercase text-white/30 hover:text-white/65 transition-all duration-300 group/vlink">
                    Open in {embed.platform}
                    <span className="block w-5 h-px bg-current group-hover/vlink:w-8 transition-all duration-300" />
                  </a>
                </div>
              </div>
            ) : null}

            {/* ── MAP ── */}
            <div className={`flex flex-col relative overflow-hidden min-h-[480px] bg-white ${!embed ? 'lg:col-span-2' : ''}`}>
              {/* Header Strip */}
              <div className="flex items-center justify-between px-6 lg:px-7 py-4 border-b border-[#dde1ee] bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-px bg-[#c49a3c]" />
                  <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#2e4480]">Location</span>
                </div>
                <span className="font-cormorant font-light text-[0.88rem] text-[#8b91a8] tracking-[0.04em] text-right truncate pl-4">
                  {projectName ? `${projectName} · ` : ''}{location.split(',')[0]}
                </span>
              </div>

              {/* Map Container */}
              <div className="flex-1 relative">
                <MapComponent
                  singleProperty={rawObject}
                  center={[coordinates.lng, coordinates.lat]}
                  zoom={16}
                  className="w-full h-full rounded-none border-none"
                  hideDefaultControls={true}
                />
              </div>

              {/* Nearby Context */}
              <div className="absolute bottom-[1.4rem] left-[1.4rem] z-[500] bg-[#f8f7f4] backdrop-blur-md px-[1.2rem] py-4 border-t border-[#c49a3c] shadow-lg hidden sm:block">
                <p className="text-[0.46rem] tracking-[0.28em] uppercase text-[#2e4480] mb-2.5">Nearby</p>
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-2 text-[0.5rem] tracking-[0.1em] text-[#8b91a8]">
                    <span className="w-[0.8rem] h-px bg-[#dde1ee] shrink-0" /> Nairobi CBD · 15 mins
                  </span>
                  <span className="flex items-center gap-2 text-[0.5rem] tracking-[0.1em] text-[#8b91a8]">
                    <span className="w-[0.8rem] h-px bg-[#dde1ee] shrink-0" /> Hub & Junction · 10 mins
                  </span>
                  <span className="flex items-center gap-2 text-[0.5rem] tracking-[0.1em] text-[#8b91a8]">
                    <span className="w-[0.8rem] h-px bg-[#dde1ee] shrink-0" /> Int'l Airport · 35 mins
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </AnimatedSection>
        <div dangerouslySetInnerHTML={{ __html: "<style> @keyframes playPulse { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } } </style>" }} />
      </div>
  );
}

// Extracted thumb renderer to keep JSX clean
function renderVideoThumb(isPlaying: boolean, platform: string, projectName?: string, title?: string, src?: string) {
  if (isPlaying && src) {
    return (
      <div className="absolute inset-0 z-30">
        <iframe
          src={src}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full border-none"
        />
      </div>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(148deg,#c9cfe6_0%,#8898bc_22%,#4d67a0_48%,#2e4480_72%,#1c2340_100%)] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]">
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent calc(16.666% - 0.5px), rgba(255,255,255,0.022) calc(16.666% - 0.5px), rgba(255,255,255,0.022) 16.666%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#0c112a] to-transparent opacity-90" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-white/15 animate-[playPulse_2.4s_ease-out_infinite] z-0 pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-white/30 bg-[#f8f7f4]/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 group-hover:bg-[#c49a3c]/15 group-hover:border-[#c49a3c]/40 group-hover:scale-110">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white/80 ml-1" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 z-20 pointer-events-none">
        <p className="text-[0.44rem] tracking-[0.3em] uppercase text-white/40 mb-1.5">Video Tour · {projectName || title}</p>
        <p className="font-cormorant font-light text-base text-white/75 tracking-[0.04em]">{title}</p>
      </div>
    </>
  );
}
