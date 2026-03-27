"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
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
    // Hide FAB on specific detail pages where a local enquire pill is present
    if (pathname.startsWith("/discover/") || pathname.startsWith("/residences/")) {
      return null;
    }

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
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center gap-3">
      <AnimatePresence mode="wait">
        <motion.a
          key="fab-button"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative flex items-center group"
          aria-label="Chat on WhatsApp"
        >
          {/* Subtle Pulse Rings */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-[#c49a3c]/30"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute inset-0 rounded-full border border-[#c49a3c]/20"
          />

          {/* Main Button */}
          <div className="w-14 h-14 bg-[#1c2340] border border-[#c49a3c]/40 rounded-full flex items-center justify-center shadow-2xl relative z-10 hover:bg-[#2e4480] transition-all duration-500 overflow-hidden">
            <MessageCircle className="w-6 h-6 text-[#c49a3c] transition-transform duration-300 group-hover:scale-110" />
            
            {/* Subtle architectural grid texture inside icon */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 4px, #fff 4px, #fff 5px)"
            }} />
          </div>

          {/* Slide-out Label (Desktop) */}
          <div className="hidden lg:block absolute right-full mr-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 pointer-events-none">
            <div className="bg-[#1c2340]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 whitespace-nowrap shadow-xl">
              <span className="text-[0.62rem] tracking-[0.32em] uppercase text-white/80 font-cormorant font-light">
                Enquire Now
              </span>
            </div>
          </div>
          
          {/* Static Small Label (Mobile) */}
          <div className="lg:hidden absolute bottom-full mb-2 right-0 bg-[#1c2340]/85 px-3 py-1 rounded-sm border border-[#c49a3c]/20">
            <span className="text-[0.45rem] tracking-[0.2em] uppercase text-white/90">Chat</span>
          </div>
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
