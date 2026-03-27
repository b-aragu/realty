"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

  if (!href) return null;

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex items-center gap-0 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key="fab-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center pointer-events-auto group"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center pr-[2.5rem] lg:pr-[3.5rem]"
            aria-label="Chat on WhatsApp"
          >
            {/* 1. Glassmorphism Pill (Desktop Only) */}
            <div className="hidden lg:flex items-center h-[3.2rem] pl-8 pr-16 bg-[#1c2340]/40 backdrop-blur-md rounded-full border border-white/20 shadow-2xl overflow-hidden relative translate-x-12 group-hover:bg-[#1c2340]/55 transition-colors duration-500">
               {/* Subtle background architectural pattern */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "12px 12px"
              }} />
              <span className="text-[0.68rem] tracking-[0.38em] uppercase text-[#f8f7f4] font-cormorant font-light whitespace-nowrap z-10">
                Enquire Now
              </span>
            </div>

            {/* 2. Vivid Cobalt Circle Button */}
            <div className="relative w-14 h-14 lg:w-[4rem] lg:h-[4rem] z-20 -ml-14 lg:-ml-12">
              {/* Concentric Gold Pulse Rings */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-[#c49a3c]/30 pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute inset-0 rounded-full border border-[#c49a3c]/15 pointer-events-none"
              />

              {/* Main Vivid Blue Circle */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-full h-full bg-[#002b8a] rounded-full border border-[#c49a3c]/50 flex items-center justify-center shadow-[0_8px_32px_rgba(0,43,138,0.4)] transition-all duration-500 hover:bg-[#0038b3] hover:border-[#c49a3c] group-hover:shadow-[0_12px_44px_rgba(0,43,138,0.55)]"
              >
                {/* Gold Outline Icon (matching image style) */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c49a3c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="8" y1="9" x2="16" y2="9"></line>
                  <line x1="8" y1="13" x2="14" y2="13"></line>
                </svg>
              </motion.div>
            </div>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
