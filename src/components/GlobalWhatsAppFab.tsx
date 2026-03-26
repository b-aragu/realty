"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  buildTrackedAbsoluteUrl,
  buildWhatsAppHref,
  inferIntro,
  inferLeadSource,
} from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/seo";

export default function GlobalWhatsAppFab() {
  const pathname = usePathname() || "/";

  const href = useMemo(() => {
    const source = inferLeadSource(pathname);
    const intro = inferIntro(pathname);
    const absoluteUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${pathname}`
        : `${SITE_URL}${pathname}`;

    return buildWhatsAppHref({
      intro,
      pageUrl: buildTrackedAbsoluteUrl(absoluteUrl, source),
      source,
    });
  }, [pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-14 h-14 bg-[#1c2340] border border-[#c49a3c]/40 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#2e4480] hover:border-[#c49a3c] transition-all duration-400 group focus:outline-none focus:ring-2 focus:ring-[#c49a3c] focus:ring-offset-2 focus:ring-offset-[#f8f7f4]"
      aria-label="Chat on WhatsApp"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  );
}
