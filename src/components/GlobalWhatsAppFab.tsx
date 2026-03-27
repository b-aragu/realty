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
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex items-center justify-end pointer-events-none">
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
            className="relative flex items-center"
            aria-label="Chat on WhatsApp"
          >
            {/* 1. Glassmorphism Pill (Desktop Only - Matching Reference Image) */}
            <div className="hidden lg:flex items-center h-[3.4rem] pl-10 pr-16 bg-white/10 backdrop-blur-[12px] rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative translate-x-12 group-hover:bg-white/15 transition-all duration-500">
              <span className="text-[0.62rem] tracking-[0.52em] uppercase text-white font-cormorant font-light whitespace-nowrap z-10 drop-shadow-sm">
                Enquire Now
              </span>
            </div>

            {/* 2. Vivid Cobalt Circle Button & Rings */}
            <div className="relative w-15 h-15 lg:w-[4.2rem] lg:h-[4.2rem] z-20 -ml-12 lg:-ml-12">
              {/* Ultra-Delicate Concentric Gold Pulse Rings */}
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-[0.5px] border-[#c49a3c]/40 pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.85, 1], opacity: [0.15, 0, 0.15] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute inset-0 rounded-full border-[0.5px] border-[#c49a3c]/20 pointer-events-none"
              />

              {/* Main Vivid Blue Circle */}
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="w-full h-full bg-[#002e8a] rounded-full border border-[#c49a3c]/60 flex items-center justify-center shadow-[0_12px_40px_rgba(0,46,138,0.45)] transition-all duration-500 hover:bg-[#0038b3] hover:border-[#c49a3c] relative overflow-hidden"
              >
                {/* Subtle internal architectural shimmer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* EXACT Custom SVG Icon (Three-lined message bubble) */}
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                >
                  <path 
                    d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" 
                    stroke="#c49a3c" 
                    strokeWidth="1.3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path d="M7 8H17" stroke="#c49a3c" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M7 12H15" stroke="#c49a3c" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M7 16H13" stroke="#c49a3c" strokeWidth="1.3" strokeLinecap="round" className="hidden lg:block " />
                </svg>
              </motion.div>
            </div>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
