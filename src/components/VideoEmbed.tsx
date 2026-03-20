"use client";

import AnimatedSection from "@/components/AnimatedSection";

/**
 * Parses YouTube and TikTok URLs into embeddable iframe sources.
 * Returns null if the URL format isn't recognized.
 */
function getEmbedUrl(url: string): { src: string; platform: string } | null {
  try {
    const u = new URL(url);

    // YouTube — youtube.com/watch?v=ID or youtu.be/ID or youtube.com/shorts/ID
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") {
      let videoId: string | null = null;
      if (u.hostname === "youtu.be") {
        videoId = u.pathname.slice(1);
      } else if (u.pathname.startsWith("/shorts/")) {
        videoId = u.pathname.split("/shorts/")[1];
      } else {
        videoId = u.searchParams.get("v");
      }
      if (videoId) {
        return {
          src: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
          platform: "YouTube",
        };
      }
    }

    // TikTok — tiktok.com/@user/video/ID
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
      <div className="mb-12">
        <h2 className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-6 flex items-center gap-3">
          <span className="w-4 h-px bg-[#c49a3c]" /> Video Tour
        </h2>
        <div className="relative w-full border border-[#dde1ee] overflow-hidden bg-[#12172a]" style={{ paddingBottom: embed.platform === "TikTok" ? "177%" : "56.25%" }}>
          <iframe
            src={embed.src}
            title={title ? `${title} — ${embed.platform} Tour` : `${embed.platform} Video Tour`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="flex items-center justify-between mt-3">
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
