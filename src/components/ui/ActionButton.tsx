"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  href: string;
  label: string;
  className?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary";
}

export default function ActionButton({ href, label, className, showIcon = true, variant = "primary" }: ActionButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  const content = (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "relative flex items-center justify-between gap-6 px-7 py-4 backdrop-blur-md border transition-all duration-700 overflow-hidden group",
        variant === "primary" 
          ? "bg-[#1c2340] border-[#c49a3c]/40 hover:bg-[#2e4480] hover:border-[#c49a3c] shadow-[0_4px_20px_rgba(28,35,64,0.1)]" 
          : "bg-white/05 border-[#c49a3c]/25 hover:bg-white/10 hover:border-[#c49a3c]/60",
        className
      )}
    >
      {/* Subtle architectural grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      {/* Ambient Gold Glow (Subtle pulse) */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 border border-[#c49a3c]/10 rounded-sm pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-[-25deg]" />
      </div>

      {/* Sliding Gold Accent */}
      <div className="absolute bottom-0 left-0 h-[2.5px] bg-[#c49a3c] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" />
      
      {/* Label */}
      <span className={cn(
        "relative z-10 text-[0.6rem] lg:text-[0.68rem] tracking-[0.38em] uppercase font-cormorant font-light transition-colors duration-500",
        variant === "primary" ? "text-white/90 group-hover:text-white" : "text-[#1c2340] group-hover:text-[#1c2340]"
      )}>
        {label}
      </span>

      {/* Icon / Arrow */}
      {showIcon && (
        <div className="relative z-10 flex items-center gap-2">
          <div className={cn(
            "w-6 h-px transition-all duration-500",
            variant === "primary" ? "bg-[#c49a3c]/40 group-hover:bg-[#c49a3c] group-hover:w-10" : "bg-[#c49a3c]/30 group-hover:bg-[#c49a3c] group-hover:w-10"
          )} />
          <motion.svg 
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"
            className={cn(
              "transition-colors duration-500",
              variant === "primary" ? "text-[#c49a3c] group-hover:text-white" : "text-[#c49a3c] group-hover:text-[#1c2340]"
            )}
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </motion.svg>
        </div>
      )}

      {/* Decorative Corners — Architectural Touch */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#c49a3c]/50" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#c49a3c]/50" />
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn("block", className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn("block", className)}>
      {content}
    </Link>
  );
}
