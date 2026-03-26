"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  url: string;
  className?: string;
};

export default function ShareButton({ title, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className || "inline-flex items-center gap-2.5 text-[0.48rem] tracking-[0.3em] uppercase text-[#8b91a8] hover:text-[#c49a3c] transition-all duration-300"}
      aria-label="Share this page"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      <span className="whitespace-nowrap">{copied ? "Link Copied" : "Share"}</span>
    </button>
  );
}
