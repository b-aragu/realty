"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const phoneNumber = "254712678334";
  const emailAddress = "hello@wanderealty.co.ke";

  const { whatsappUrl, emailUrl } = useMemo(() => {
    const source = inferLeadSource(pathname);
    const intro = inferIntro(pathname);
    const absoluteUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${pathname}`
        : `${SITE_URL}${pathname}`;

    const trackedUrl = buildTrackedAbsoluteUrl(absoluteUrl, source);

    const wa = buildWhatsAppHref({
      intro,
      pageUrl: trackedUrl,
      source,
    });

    const subject = encodeURIComponent(`Property Enquiry — ${pathname === '/' ? 'Wande Realty' : pathname.split('/').pop()?.replace(/-/g, ' ')}`);
    const body = encodeURIComponent(
      `Hi Wande Realty,\n\nI would like to enquire about a property.\n\nSource: ${trackedUrl}\n\nThank you.`
    );
    const mail = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    return { whatsappUrl: wa, emailUrl: mail };
  }, [pathname]);

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3 font-montserrat" ref={containerRef}>
      
      {/* ── EXPANDED MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex flex-col items-end gap-2.5 mb-2"
          >
            {/* Call */}
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-3.5 group">
              <span className="bg-[#f8f7f4]/95 backdrop-blur-md border border-[#dde1ee] border-t-[#c49a3c] px-4 py-2 text-[0.5rem] tracking-[0.26em] uppercase text-[#1c2340] shadow-sm transform transition-all group-hover:text-[#2e4480]">
                Call Us
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-[#dde1ee] flex items-center justify-center transition-all group-hover:bg-[#2e4480]/5 group-hover:border-[#2e4480]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#8b91a8] stroke-[1.4] transition-colors group-hover:stroke-[#2e4480]">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
            </a>

            {/* Email */}
            <a href={emailUrl} className="flex items-center gap-3.5 group">
              <span className="bg-[#f8f7f4]/95 backdrop-blur-md border border-[#dde1ee] border-t-[#c49a3c] px-4 py-2 text-[0.5rem] tracking-[0.26em] uppercase text-[#1c2340] shadow-sm transform transition-all group-hover:text-[#2e4480]">
                Send Email
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-[#dde1ee] flex items-center justify-center transition-all group-hover:bg-[#2e4480]/5 group-hover:border-[#2e4480]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#8b91a8] stroke-[1.4] transition-colors group-hover:stroke-[#2e4480]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
            </a>

            {/* WhatsApp */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 group">
              <span className="bg-[#f8f7f4]/95 backdrop-blur-md border border-[#dde1ee] border-t-[#c49a3c] px-4 py-2 text-[0.5rem] tracking-[0.26em] uppercase text-[#1c2340] shadow-sm transform transition-all group-hover:text-[#25D366] group-hover:border-t-[#25D366]">
                WhatsApp
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-[#dde1ee] flex items-center justify-center transition-all group-hover:bg-[#25D366]/5 group-hover:border-[#25D366]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#8b91a8] transition-colors group-hover:fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TRIGGER ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative h-[50px] rounded-[25px] transition-all duration-350 flex items-center shadow-[0_4px_24px_rgba(28,35,64,0.22)] border border-white/10 group ${
          isOpen ? "bg-[#2e4480] px-[1.4rem] justify-center" : "bg-[#1c2340] pl-2.5 pr-[1.6rem] justify-start hover:bg-[#2e4480] hover:-translate-y-1"
        }`}
      >
        {/* Gold top arc */}
        {!isOpen && <div className="absolute top-[-1px] left-[28%] right-[28%] h-[1px] bg-[#c49a3c] opacity-65 rounded-[1px]" />}
        
        {/* Pulsing outer ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [0.96, 1.07], opacity: [0.8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute -inset-1.5 rounded-[31px] border border-[#c49a3c]/20 pointer-events-none"
          />
        )}

        {/* Content */}
        {!isOpen ? (
          <>
            <div className="w-9 h-9 rounded-full bg-[#c49a3c]/15 border border-[#c49a3c]/30 flex items-center justify-center mr-3.5 transition-all group-hover:bg-[#c49a3c]/25 group-hover:scale-105 group-hover:-rotate-6">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#c49a3c] stroke-[1.4]">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div className="flex flex-col items-start gap-0.5 text-left">
              <span className="text-[0.48rem] tracking-[0.28em] uppercase text-white/90 leading-tight">Enquire Now</span>
              <span className="text-[0.4rem] tracking-[0.2em] uppercase text-white/30 leading-tight">We respond within 1hr</span>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] ml-3.5"
            />
          </>
        ) : (
          <div className="relative w-3.5 h-3.5">
            <div className="absolute top-1/2 left-1/2 w-3.5 h-[1px] bg-white/75 -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-3.5 h-[1px] bg-white/75 -translate-x-1/2 -translate-y-1/2 -rotate-45" />
          </div>
        )}
      </button>
    </div>
  );
}
