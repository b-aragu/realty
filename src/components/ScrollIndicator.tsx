"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If within 150px of the bottom, shift to "Top" mode
      if (documentHeight - scrollPosition < 150) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-[5.5rem] right-[3.2rem] lg:bottom-[7.5rem] lg:right-[4.2rem] md:flex flex-col items-center gap-[0.4rem] z-40 transition-opacity duration-500 hidden"
      style={{ animation: "fadeIn 1s ease 2.8s both" }}
      aria-hidden="true"
    >
      {isAtBottom ? (
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center gap-[0.4rem] cursor-pointer group outline-none"
          aria-label="Scroll to top"
        >
          <span 
            className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.38em] uppercase text-[#8b91a8] mb-1 transition-colors duration-300 group-hover:text-[#c49a3c]" 
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Top
          </span>
          <div 
            className="w-px h-8 lg:h-10 bg-gradient-to-t from-[#8b91a8] to-transparent transition-colors duration-300 group-hover:from-[#c49a3c]" 
            style={{ animation: "scrollPulseUp 2.2s ease-in-out infinite" }} 
          />
        </button>
      ) : (
        <div className="flex flex-col items-center gap-[0.4rem]">
          <div 
            className="w-px h-8 lg:h-10 bg-gradient-to-b from-[#8b91a8] to-transparent" 
            style={{ animation: "scrollPulse 2.2s ease-in-out 3s infinite" }} 
          />
          <span 
            className="text-[0.4rem] lg:text-[0.44rem] tracking-[0.38em] uppercase text-[#8b91a8] mt-1" 
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      )}
    </div>
  );
}
