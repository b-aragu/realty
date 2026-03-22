"use client";

import AnimatedSection from "@/components/AnimatedSection";

/**
 * Parses YouTube and TikTok URLs into embeddable iframe sources.
 * Returns null if the URL format isn't recognized.
 */
function getEmbedUrl(url: string): { src: string; platform: string } | null {
  try {
    const u = new URL(url);

    // YouTube — handles youtube.com, m.youtube.com, youtu.be, and direct /embed/ links
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
        // Strip any extra params from videoId if they exist (e.g. ?t=10s)
        videoId = videoId.split(/[?#&]/)[0];
        return {
          src: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
          platform: "YouTube",
        };
      }
    }

    // Instagram — handles /p/, /reel/, /reels/, /tv/
    if (u.hostname.includes("instagram.com")) {
      const match = u.pathname.match(/\/(p|reels?|tv)\/([^/?#&]+)/);
      if (match) {
        return {
          // Instagram embed URL format: https://www.instagram.com/[p|reel|reels|tv]/[ID]/embed/
          src: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`,
          platform: "Instagram",
        };
      }
    }
  } catch {
    // invalid URL
  }
  return null;
}

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export default function VideoEmbed({ url, title }: VideoEmbedProps) {
  const embed = getEmbedUrl(url);

  if (!embed) {
    // Fallback: render as a styled external link
    return (
      <AnimatedSection>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-[0.56rem] tracking-[0.24em] uppercase text-[#3a5299] hover:text-[#1c2340] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Watch Video Tour
          <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
        </a>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection>
      <div className="flex flex-col h-full">
        <h2 className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-6 flex items-center gap-3">
          <span className="w-4 h-px bg-[#c49a3c]" /> Video Tour
        </h2>
        
        {embed.platform === "TikTok" || embed.platform === "Instagram" ? (
          <div className="relative mx-auto w-full max-w-[340px] border border-[#dde1ee] overflow-hidden bg-[#12172a] aspect-[9/16]">
            <iframe
              src={embed.src}
              title={title ? `${title} — ${embed.platform} Tour` : `${embed.platform} Video Tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className="relative w-full border border-[#dde1ee] overflow-hidden bg-[#12172a] aspect-video">
            <iframe
              src={embed.src}
              title={title ? `${title} — ${embed.platform} Tour` : `${embed.platform} Video Tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}

        <div className={`flex items-center justify-between mt-3 ${embed.platform === "TikTok" || embed.platform === "Instagram" ? "max-w-[340px] mx-auto w-full" : ""}`}>
          <span className="text-[0.44rem] tracking-[0.28em] uppercase text-[#8b91a8]">
            {embed.platform} · {title || "Property Tour"}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.44rem] tracking-[0.24em] uppercase text-[#3a5299] hover:text-[#1c2340] transition-colors border-b border-transparent hover:border-[#3a5299] pb-px"
          >
            Open in {embed.platform} →
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
