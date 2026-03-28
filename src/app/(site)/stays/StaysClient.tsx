"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { Stay } from "@/sanity/fetch";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

function StayGallery({ stay, isReverse }: { stay: Stay, isReverse: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  // Normalize images to an array of objects — caption falls back to alt text
  const images = [{ url: stay.mainImage || "", caption: stay.title || "MAIN" }];
  if (stay.gallery) {
    images.push(...stay.gallery.map(g => ({ url: g.url, caption: g.caption || g.alt || "DETAIL" })));
  }

  const hasMultiple = images.length > 1;
  const isTwo = images.length === 2;
  const isThree = images.length === 3;

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else if (info.offset.x > swipeThreshold && lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <>
      <div className={`relative flex items-center justify-center px-0 sm:px-6 lg:pl-16 lg:pr-16 pt-12 pb-12 overflow-hidden bg-[#f8f7f4] ${isReverse ? 'lg:order-2' : ''}`}>
        
        {hasMultiple ? (
          <div className="relative w-[110%] ml-[-5%] sm:ml-0 sm:w-full max-w-[540px] mx-auto h-[320px] sm:h-[400px] lg:h-[450px]">
            
            {/* Img 1: Top Right */}
            {images.length > 0 && (
              <div 
                className={`${isTwo ? 'absolute top-0 right-0 w-[66%] h-[75%] z-[3]' : 'absolute top-0 right-0 w-[66%] h-[56%] z-[3]'} hover:w-full hover:h-full hover:z-[50] transition-all duration-500 overflow-hidden group cursor-pointer shadow-lg`}
                onClick={() => setLightboxIndex(0)}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${images[0].url})` }}
                />
                <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                  {images[0].caption}
                </span>
              </div>
            )}

            {/* Img 2: Tall Left */}
            {images.length > 1 && (
              <div 
                className={`${isTwo ? 'absolute bottom-0 left-0 w-[55%] h-[80%] z-[4]' : isThree ? 'absolute top-[6%] left-0 w-[44%] h-[86%] z-[2]' : 'absolute top-[6%] left-0 w-[44%] h-[64%] z-[2]'} hover:top-0 hover:h-full hover:w-full hover:z-[50] transition-all duration-500 overflow-hidden group cursor-pointer shadow-lg`}
                onClick={() => setLightboxIndex(1)}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${images[1].url})` }}
                />
                <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                  {images[1].caption}
                </span>
              </div>
            )}

            {/* Img 3: Bottom Right */}
            {images.length > 2 && (
              <div 
                className={`${isThree ? 'absolute bottom-0 right-0 w-[56%] h-[46%] z-[4]' : 'absolute bottom-0 right-0 w-[50%] h-[44%] z-[4]'} hover:w-full hover:h-full hover:z-[50] transition-all duration-500 overflow-hidden group cursor-pointer shadow-lg`}
                onClick={() => setLightboxIndex(2)}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${images[2].url})` }}
                />
                <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                  {images[2].caption}
                </span>
              </div>
            )}

            {/* Img 4: Bottom Center Floating */}
            {images.length > 3 && (
              <div 
                className="absolute bottom-[4%] left-[24%] w-[36%] h-[34%] z-[5] hover:left-0 hover:bottom-0 hover:w-full hover:h-full hover:z-[50] transition-all duration-500 overflow-hidden group cursor-pointer shadow-2xl"
                onClick={() => setLightboxIndex(3)}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${images[3].url})` }}
                />
                <span className="absolute top-[0.8rem] left-[0.9rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4] z-[3] uppercase drop-shadow-md">
                  {images[3].caption}
                </span>
              </div>
            )}

          </div>
        ) : (
          /* Fallback Single Image */
          <div className="relative w-[110%] ml-[-5%] sm:ml-0 sm:w-full max-w-[540px] mx-auto h-[320px] sm:h-[400px] lg:h-[450px]">
             <div 
              className="absolute inset-[1rem] sm:inset-[2.5rem] bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] cursor-pointer shadow-xl border border-[#dde1ee]/50"
              style={{ backgroundImage: `url(${images[0].url})` }}
              onClick={() => setLightboxIndex(0)}
            >
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-500" />
            </div>
          </div>
        )}

        {/* Minimalist Japanese-Inspired Gallery Count Overlay Card */}
        <div className="absolute bottom-[-1.5rem] sm:bottom-0 left-[5%] sm:left-0 z-[40]">
          <button
            onClick={() => setLightboxIndex(0)}
            className="group flex flex-col items-start gap-1"
          >
            <span className="flex items-center gap-[1rem] text-[0.5rem] tracking-[0.38em] uppercase text-[#2e4480] transition-colors group-hover:text-[#c49a3c]">
              <span className="block w-[1.5rem] h-px bg-[#c49a3c] shrink-0 transition-all duration-500 group-hover:w-[2.5rem]" />
              View Gallery
            </span>
            <span className="font-cormorant font-extralight text-[1.6rem] text-[#1c2340] tracking-wide ml-[2.5rem] group-hover:text-[#3a5299] transition-colors leading-[1]">
              {images.length} <em className="italic text-[#8b91a8]">shots</em>
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#131110]/98 flex items-center justify-center p-4 backdrop-blur-xl touch-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10 hidden md:flex"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Next */}
            {lightboxIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10 hidden md:flex"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Bottom Editorial Footnote */}
            <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[11] w-full px-8 text-center pointer-events-none">
              <p className="font-cormorant font-light text-[1.1rem] md:text-[1.3rem] text-white/90 tracking-[0.05em] leading-snug">
                {images[lightboxIndex]?.caption || "The Retreat"}
              </p>
              <div className="flex items-center gap-4 pt-1.5">
                 <span className="text-[0.42rem] tracking-[0.45em] uppercase text-[#c49a3c]/80">Retreat Shot</span>
                 <div className="w-1 h-1 rounded-full bg-white/10" />
                 <p className="text-[0.42rem] tracking-[0.32em] uppercase text-white/30">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function StaysClient({ stays }: { stays: Stay[] }) {
  const uniqueLocations = new Set(stays.map(s => s.location).filter(Boolean)).size || 0;

  // Extract digits from price strings to find the mathematical minimum price for the "From XX" display
  const prices = stays.map(s => {
    const num = parseInt(s.pricePerNight?.replace(/\D/g, '') || "0", 10);
    return num > 0 ? num : null;
  }).filter(Boolean) as number[];
  
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const displayPrice = minPrice 
    ? `From ${minPrice >= 1000 ? (minPrice / 1000) + 'K' : minPrice}` 
    : (stays[0]?.pricePerNight || "Contact Us");

  return (
    <>
      {/* ─── HERO ─── FULL BLEED, TWO PANELS */}
      <section className="relative bg-[#f8f7f4] h-auto lg:h-[calc(100vh-68px)] lg:min-h-[600px] overflow-hidden">
        {/* Ghost kanji */}
        <div 
          className="absolute bottom-[-2%] lg:bottom-[-8%] left-[-2%] font-noto-jp font-extralight select-none pointer-events-none z-[0] opacity-50 lg:opacity-100"
          style={{ fontSize: "55vw", lineHeight: 1, color: "rgba(28,35,64,0.03)" }}
          aria-hidden="true"
        >
          泊
        </div>
        
        {/* Vertical Japanese label */}
        <div 
          className="absolute top-1/2 left-[1rem] font-noto-jp font-extralight tracking-[0.45em] text-[0.48rem] pointer-events-none z-[3]"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)", color: "rgba(139,145,168,0.4)" }}
          aria-hidden="true"
        >
          短期滞在 · Across Kenya
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] h-full">
          {/* LEFT CONTENT */}
          <div className="relative z-[2] flex flex-col justify-center px-6 sm:px-12 lg:pl-[4rem] lg:pr-[4.5rem] py-20 lg:py-0 min-h-[70vh] lg:min-h-0">
            <AnimatedSection>
              <div className="w-[2rem] h-px bg-[#c49a3c] mb-[2rem]" />
              <p className="text-[0.5rem] tracking-[0.38em] uppercase text-[#2e4480] mb-[1.6rem]">
                Wande Retreats · Short-Term Rentals
              </p>
              <h1 className="font-cormorant font-extralight text-[clamp(3.5rem,5.5vw,6rem)] leading-[1.04] tracking-[-0.01em] text-[#1c2340]">
                Curated<br />
                <em className="italic text-[#3a5299]">Escapes</em>
              </h1>
              <p className="mt-[2rem] text-[0.67rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[34ch]">
                Our signature spaces — thoughtfully designed short-term residences. Your temporary home, elevated.
              </p>

              {/* Stats strip */}
              <div className="flex items-center justify-between lg:justify-start lg:gap-[2.2rem] mt-[3.5rem] pt-[2rem] border-t border-[#dde1ee]">
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{stays.length}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">Properties</span>
                </div>
                <div className="w-px h-[2rem] bg-[#dde1ee] self-center" />
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{uniqueLocations}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">{uniqueLocations === 1 ? 'Location' : 'Locations'}</span>
                </div>
                <div className="w-px h-[2rem] bg-[#dde1ee] self-center" />
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="font-cormorant font-extralight text-[1.4rem] lg:text-[1.6rem] text-[#1c2340] leading-none">{displayPrice}</span>
                  <span className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-[#8b91a8]">/ Night (KES)</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Scroll hint */}
            <div className="absolute bottom-[2.5rem] left-[4rem] flex items-center gap-[0.8rem] z-[3] animate-pulse">
              <div className="w-[2.5rem] h-px bg-[#dde1ee]" />
              <span className="text-[0.44rem] tracking-[0.35em] uppercase text-[#8b91a8]">Scroll to explore</span>
            </div>
          </div>

          {/* RIGHT — image panel */}
          <div className="relative overflow-hidden hidden lg:block">
            {/* Image fill with Ken Burns & Gradient overlay */}
            <div 
              className="absolute inset-0 animate-[kenBurns_16s_ease-in-out_infinite_alternate]"
              style={{
                background: "linear-gradient(148deg, #c9cfe6 0%, #8898bc 22%, #4d67a0 48%, #2e4480 72%, #1c2340 100%)",
                transform: "scale(1.04)"
              }}
            >
              {/* Grid texture overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    repeating-linear-gradient(90deg, transparent, transparent calc(20% - 0.5px), rgba(255,255,255,0.022) calc(20% - 0.5px), rgba(255,255,255,0.022) 20%),
                    repeating-linear-gradient(0deg, transparent, transparent calc(14.28% - 0.5px), rgba(255,255,255,0.015) calc(14.28% - 0.5px), rgba(255,255,255,0.015) 14.28%)
                  `
                }}
              />
            </div>
            {/* Blend to left navy background to soften seam */}
            <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(90deg, #f8f7f4 0%, transparent 25%)" }} />
            
            {/* Inner Frame */}
            <div className="absolute inset-[1.5rem] border border-white/[0.06] pointer-events-none z-[2]" />
            
            <span className="absolute bottom-[2rem] right-[2.2rem] font-cormorant italic font-extralight text-[0.68rem] tracking-[0.14em] z-[3]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Kilimani, Nairobi
            </span>
          </div>
        </div>
      </section>

      {/* ─── LISTING INTRO ─── */}
      <section className="bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-20 pb-16 lg:pt-[5rem] lg:pb-[4rem] border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-[0.8rem]">Available Now</p>
                <h2 className="font-cormorant font-light text-[clamp(1.8rem,2.5vw,2.4rem)] leading-[1.1] text-[#1c2340]">
                  Our <em className="italic text-[#3a5299]">Residences</em>
                </h2>
                <div className="w-[1.5rem] h-px bg-[#c49a3c] mt-[0.8rem]" />
              </div>
              <p className="mt-8 md:mt-0 text-[0.6rem] leading-[1.9] tracking-[0.08em] text-[#8b91a8] max-w-[36ch] md:text-right">
                Each space is individually designed.<br />
                Flexible check-in and checkout.<br />
                All bookings confirmed via WhatsApp.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── STAY ENTRIES ─── */}
      <section className="bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[4rem]">
          {stays.length > 0 ? (
            stays.map((stay, index) => {
              const isReverse = index % 2 !== 0; // Alternating layout
              
              return (
                <div key={stay._id} className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] border-b border-[#dde1ee] group">
                  {/* Image Side */}
                  <StayGallery stay={stay} isReverse={isReverse} />
                  
                  {/* Content Side */}
                  <div className={`flex flex-col justify-center px-6 py-16 lg:py-0 ${isReverse ? 'lg:pl-[4rem] lg:pr-[4.5rem] lg:order-1' : 'lg:pl-[4.5rem] lg:pr-[4rem]'}`}>
                    <AnimatedSection delay={0.1}>
                      <div className="flex items-center gap-[1.2rem] mb-[1.8rem]">
                        <div className="w-[1.5rem] h-px bg-[#c49a3c] shrink-0" />
                        <span className="text-[0.48rem] tracking-[0.32em] uppercase text-[#2e4480]">{stay.location}</span>
                        <span className="text-[0.48rem] tracking-[0.28em] uppercase text-[#8b91a8] ml-auto">Up to {stay.guests} Guests</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-4 mb-6">
                        <h3 className="font-cormorant font-extralight text-[clamp(2.5rem,4vw,3.2rem)] leading-[1.1] text-[#1c2340]">
                          {stay.title}
                        </h3>
                        {stay.pricePerNight && (
                          <div className="flex items-center gap-3 border-l border-[#dde1ee] pl-4">
                            <span className="font-cormorant font-light text-[1.8rem] text-[#2e4480] leading-none">
                              {stay.pricePerNight}
                            </span>
                            <span className="text-[0.4rem] tracking-[0.3em] uppercase text-[#8b91a8]">/ night</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="font-cormorant italic font-extralight text-[1.1rem] text-[#3a5299] mb-[1.5rem]">
                        {stay.subtitle}
                      </p>
                      
                      <div className="w-full h-px bg-[#dde1ee] mb-[1.8rem]" />
                      <p className="text-[0.66rem] leading-[2.1] tracking-[0.07em] text-[#8b91a8] max-w-[38ch] mb-[2rem]">
                        {stay.description}
                      </p>
                      
                      {/* Amenities Horizontal Tags */}
                      {stay.amenities && stay.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-x-[0.8rem] gap-y-[0.5rem] mb-[2.5rem]">
                          {stay.amenities.map((amenity, idx) => (
                            <span 
                              key={idx}
                              className="text-[0.48rem] tracking-[0.22em] uppercase text-[#8b91a8] border border-[#dde1ee] px-[0.8rem] py-[0.35rem] transition-colors duration-300 group-hover:border-[#2e4480] group-hover:text-[#3a5299]"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-[3rem] pt-[2rem] border-t border-[#dde1ee]">
                        <a 
                          href={buildWhatsAppHref({
                             intro: `Hi, I'm interested in booking *${stay.title}*.\n\nCould I request the availability and current rates for this stay?`,
                             pagePath: "/stays",
                             source: `stay_booking_${stay.title.toLowerCase().replace(/\s+/g, '_')}`
                          })}
                          target="_blank" rel="noopener noreferrer" 
                          className="inline-flex items-center gap-[0.9rem] text-[0.58rem] tracking-[0.28em] uppercase text-[#1c2340] transition-all duration-300 hover:text-[#2e4480] hover:gap-[1.4rem]"
                        >
                          Book This Stay
                          <span className="block w-[2rem] h-px bg-[#1c2340] transition-all duration-400" />
                        </a>
                        <a 
                          href={buildWhatsAppHref({
                            intro: "Hi, I have a general enquiry about your short-term stays.",
                            pagePath: "/stays",
                            source: "stays_page_general"
                          })}
                          target="_blank" rel="noopener noreferrer" 
                          className="inline-flex items-center gap-[0.5rem] text-[0.52rem] tracking-[0.24em] uppercase text-[#8b91a8] border-b border-transparent pb-px transition-colors duration-300 hover:text-[#25D366] hover:border-[#25D366]"
                        >
                          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                          Enquire via WhatsApp
                        </a>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-[10rem] text-center max-w-[40ch] mx-auto">
              <p className="font-cormorant font-extralight text-[2rem] text-[#1c2340] mb-[1rem]">More properties launching soon.</p>
              <p className="text-[0.66rem] tracking-[0.07em] text-[#8b91a8]">We are currently preparing new curated spaces for you.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="relative bg-[#f8f7f4] overflow-hidden px-6 lg:px-16 py-[6rem] border-t border-[#dde1ee]">
        <div 
          className="absolute bottom-[-10%] right-[-2%] font-noto-jp font-extralight select-none pointer-events-none z-[0]"
          style={{ fontSize: "35vw", lineHeight: 1, color: "rgba(28,35,64,0.03)" }}
          aria-hidden="true"
        >
          間
        </div>

        <div className="relative z-[2] max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-[6rem] items-start">
          
          <div className="flex flex-col">
            <AnimatedSection>
              <p className="text-[0.5rem] tracking-[0.38em] uppercase text-[#2e4480] mb-[1.2rem]">
                Every Stay Includes
              </p>
              <h2 className="font-cormorant font-extralight text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-[#1c2340]">
                The<br />
                <em className="italic text-[#3a5299]">Standard</em>
              </h2>
              <div className="w-[1.5rem] h-px bg-[#c49a3c] my-[1.2rem]" />
              <p className="text-[0.62rem] leading-[2] tracking-[0.08em] text-[#8b91a8] max-w-[28ch]">
                Every Wande Retreat property is stocked, cleaned, and ready before you arrive. No surprises. Only quiet comfort.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
              
              {/* Item 1 */}
              <div className="p-[1.6rem] pl-0 lg:pl-[1.4rem] border-r border-b border-[#dde1ee] border-solid border-l-0 border-t-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><path d="M1 6l4 4 4-4M1 12l4 4 4-4"/><circle cx="18" cy="12" r="5"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">WiFi</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">High-speed fibre</span>
              </div>
              
              {/* Item 2 */}
              <div className="p-[1.6rem] border-r border-b border-[#dde1ee] border-solid border-l-0 border-t-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">Smart TV</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">Netflix included</span>
              </div>
              
              {/* Item 3 */}
              <div className="p-[1.6rem] lg:border-r-0 border-r border-b border-[#dde1ee] border-solid border-l-0 border-t-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">Workspace</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">Desk + ergonomic chair</span>
              </div>
              
              {/* Item 4 */}
              <div className="p-[1.6rem] pl-0 lg:pl-[1.4rem] border-r lg:border-b-0 border-b border-[#dde1ee] border-solid border-l-0 border-t-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">24/7 Support</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">Direct WhatsApp line</span>
              </div>
              
              {/* Item 5 */}
              <div className="p-[1.6rem] border-r border-[#dde1ee] border-solid border-l-0 border-b-0 border-t-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">Housekeeping</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">On request</span>
              </div>
              
              {/* Item 6 */}
              <div className="p-[1.6rem] border-0 hover:bg-[#2e4480]/[0.03] transition-colors duration-300">
                <svg className="w-[20px] h-[20px] mb-[0.8rem] stroke-[#2e4480] fill-none stroke-[1.2] opacity-70" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="block text-[0.58rem] tracking-[0.16em] uppercase text-[#1c2340] mb-[0.3rem]">Security</span>
                <span className="font-cormorant font-extralight text-[0.85rem] text-[#8b91a8] tracking-[0.05em]">Gated, 24h guard</span>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}
