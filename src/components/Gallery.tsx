"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface GalleryProps {
  images: { url: string; caption?: string }[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
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

  // Layout logic: if 1 image, full width. If 2, split. If 3+, CSS grid.
  const isSingle = images.length === 1;

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
      <div className={`grid gap-[3px] ${isSingle ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"}`}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden cursor-pointer group bg-[#1c2340] ${
              isSingle
                ? "h-[400px] md:h-[600px] col-span-1"
                : i === 0
                ? "col-span-2 row-span-2 h-[300px] sm:h-[400px] md:h-[500px]"
                : "h-[148.5px] sm:h-[198.5px] md:h-[248.5px]"
            }`}
            onClick={() => setLightboxIndex(i)}
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
              style={{ backgroundImage: `url(${img.url})` }}
            />
            {/* Thumbnail Caption */}
            {img.caption && (
               <span className="absolute top-[0.6rem] left-[0.7rem] text-[0.42rem] tracking-[0.32em] text-[#f8f7f4]/80 z-[3] uppercase drop-shadow-md group-hover:text-[#c49a3c] transition-colors duration-300">
                {img.caption}
              </span>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#1c2340] opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
            {/* Expand Icon (only on first image or if single) */}
            {(i === 0 || isSingle) && (
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
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
              alt={`${title} — photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Top Name */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[11]">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/80 drop-shadow-md">
                {title}
              </p>
            </div>

            {/* Bottom Editorial Footnote */}
            <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[11] w-full px-8 text-center pointer-events-none">
              <p className="font-cormorant font-light text-[1.1rem] md:text-[1.3rem] text-white/90 tracking-[0.05em] leading-snug">
                {images[lightboxIndex]?.caption || "Visual Concept"}
              </p>
              <div className="flex items-center gap-4 pt-1.5">
                 <span className="text-[0.42rem] tracking-[0.45em] uppercase text-[#c49a3c]/80">Shot</span>
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
