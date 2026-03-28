"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActionButtonProps {
  href?: string;
  label: string;
  eyebrow?: string;
  className?: string;
  variant?: "primary" | "secondary" | "light";
  showArrow?: boolean;
}

export default function ActionButton({ 
  href, 
  label, 
  eyebrow, 
  className, 
  variant = "primary",
  showArrow = true 
}: ActionButtonProps) {
  const isExternal = href?.startsWith("http") || href?.startsWith("tel:") || href?.startsWith("mailto:");

  const isDark = variant === "light";

  const content = (
    <span
      className={cn(
        "group/ab relative inline-flex items-center gap-4 cursor-pointer transition-all duration-400",
        // Border & background
        isDark 
          ? "border border-white/15 hover:border-[#c49a3c]/60 bg-white/[0.03] hover:bg-white/[0.06]" 
          : "border border-[#dde1ee] hover:border-[#c49a3c]",
        // Padding
        "px-5 sm:px-6 py-3 sm:py-3.5",
        className
      )}
    >
      {/* Gold left accent bar */}
      <span className={cn(
        "w-[2px] self-stretch shrink-0 transition-all duration-400",
        isDark 
          ? "bg-[#c49a3c]/60 group-hover/ab:bg-[#c49a3c]" 
          : "bg-[#c49a3c]"
      )} />

      {/* Text content */}
      <span className="flex flex-col items-start min-w-0">
        {eyebrow && (
          <span className={cn(
            "text-[0.38rem] tracking-[0.28em] uppercase mb-0.5 transition-colors duration-300",
            isDark ? "text-white/25 group-hover/ab:text-[#c49a3c]/60" : "text-[#8b91a8]/70 group-hover/ab:text-[#c49a3c]/80"
          )}>
            {eyebrow}
          </span>
        )}
        <span className={cn(
          "text-[0.52rem] sm:text-[0.56rem] tracking-[0.22em] uppercase transition-colors duration-300 whitespace-nowrap",
          isDark 
            ? "text-white/80 group-hover/ab:text-white" 
            : "text-[#1c2340] group-hover/ab:text-[#2e4480]"
        )}>
          {label}
        </span>
      </span>

      {/* Arrow */}
      {showArrow && (
        <span className={cn(
          "ml-auto text-[0.65rem] transition-all duration-300 shrink-0",
          isDark 
            ? "text-white/25 group-hover/ab:text-[#c49a3c] group-hover/ab:translate-x-0.5" 
            : "text-[#8b91a8] group-hover/ab:text-[#c49a3c] group-hover/ab:translate-x-0.5"
        )}>
          →
        </span>
      )}
    </span>
  );

  if (!href) {
    return content;
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  );
}
