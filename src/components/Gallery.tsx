"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden cursor-pointer group rounded-sm ${
              i === 0 ? "col-span-2 row-span-2 h-80 md:h-[420px]" : "h-40 md:h-52"
            }`}
            onClick={() => setLightboxIndex(i)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${img})`,
                backgroundColor: "#dce3ea",
              }}
            />
            <div className="absolute inset-0 bg-[#131110]/0 group-hover:bg-[#131110]/20 transition-colors duration-300" />
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
            className="fixed inset-0 z-[60] bg-[#131110]/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl z-10"
            >
              ×
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-6 text-white/60 hover:text-white text-4xl z-10"
              >
                ‹
              </button>
            )}

            {lightboxIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-6 text-white/60 hover:text-white text-4xl z-10"
              >
                ›
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightboxIndex]}
              alt={`${title} — photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
