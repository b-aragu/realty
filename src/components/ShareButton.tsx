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
      className={className || "inline-flex items-center gap-2 text-[0.54rem] tracking-[0.24em] uppercase text-[#8b91a8] hover:text-[#2e4480] transition-colors"}
      aria-label="Share this page"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "Link Copied" : "Share"}
    </button>
  );
}
