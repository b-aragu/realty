"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/residences", label: "Residences" },
  { href: "/stays", label: "Stays" },
  { href: "/invest", label: "Invest" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_24px_rgba(28,35,64,0.06)]" : ""
      }`}
      style={{
        background: "rgba(248,247,244,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #dde1ee",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo with gold dot */}
          <Link href="/" className="flex items-center">
            <span className="font-cormorant font-light text-[0.88rem] tracking-[0.45em] uppercase text-[#1c2340]">
              Wande Realty
            </span>
            <span className="text-[#c49a3c] text-[1.1em] ml-[0.15em] leading-none" aria-hidden="true">·</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative h-[68px] flex items-center px-5 text-[0.56rem] tracking-[0.24em] uppercase transition-colors duration-300 ${
                    isActive ? "text-[#1c2340]" : "text-[#8b91a8] hover:text-[#1c2340]"
                  }`}
                >
                  {link.label}
                  {/* Underline from center */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[#2e4480] transition-all duration-350 ${
                      isActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Contact — visually distinct as a button */}
            <div className="flex items-center h-[68px] ml-4 pl-6 border-l border-[#dde1ee]">
              <Link
                href="/contact"
                className={`py-2 px-6 rounded-sm text-[0.54rem] tracking-[0.28em] uppercase transition-all duration-400 border ${
                  pathname === "/contact" 
                    ? "bg-[#1c2340] text-white border-[#1c2340]" 
                    : "bg-transparent text-[#2e4480] border-[#c49a3c]/30 hover:border-[#c49a3c] hover:bg-[#1c2340]/[0.02]"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile architectural toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 relative overflow-hidden"
            aria-label="Toggle menu"
          >
            {/* Real Estate Inspired SVG (Minimalist House / Doorway) */}
            <motion.svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c2340" strokeWidth="1.2"
              className="absolute pointer-events-none"
              initial={false}
              animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0, scale: isOpen ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M3 10L12 3L21 10" />
              <path d="M5 10V21H19V10" />
              <path d="M9 21V11H15V21" />
            </motion.svg>

            {/* Close 'X' State */}
            <motion.svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c2340" strokeWidth="1.2"
              className="absolute pointer-events-none"
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, rotate: isOpen ? 0 : -90, scale: isOpen ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed top-[68px] left-0 right-0 overflow-y-auto border-t border-[#dde1ee]"
            style={{ background: "#f8f7f4" }}
          >
            <div className="px-8 py-12 flex flex-col gap-8 min-h-[calc(100vh-68px)]">
              {/* Menu Links */}
              <div className="flex flex-col gap-6 mt-4">
                {[...navLinks, { href: "/contact", label: "Contact" }].map((link, i) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 font-cormorant font-light text-[2rem] transition-colors duration-300 ${
                          isActive ? "text-[#1c2340]" : "text-[#8b91a8] hover:text-[#1c2340]"
                        }`}
                      >
                        <span className={`w-6 h-px transition-all duration-300 ${isActive ? "bg-[#c49a3c]" : "bg-transparent"}`} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom detail for real estate feel */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-auto pt-10 border-t border-[#dde1ee] flex flex-col gap-3 pb-8"
              >
                <p className="text-[0.5rem] tracking-[0.3em] uppercase text-[#8b91a8]">Wande Realty Nairobi</p>
                <a href="mailto:info@wanderealty.com" className="font-cormorant italic text-[1.1rem] text-[#1c2340]">info@wanderealty.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
