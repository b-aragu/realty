"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  const content = (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={cn(
        "relative inline-flex items-stretch group cursor-pointer",
        className
      )}
    >
      {/* Gold Left Bar signature */}
      <motion.div 
        variants={{
          initial: { width: "3px" },
          hover: { width: "5px" }
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="bg-[#c49a3c] flex-shrink-0"
      />

      {/* Main Body */}
      <motion.div
        variants={{
          initial: { backgroundColor: variant === "light" ? "transparent" : "#f8f7f4" },
          hover: { backgroundColor: variant === "primary" ? "#1c2340" : variant === "secondary" ? "#2e4480" : "rgba(255,255,255,0.07)" }
        }}
        className={cn(
          "flex items-center gap-7 lg:gap-14 px-5 lg:px-7 py-3 lg:py-4 border border-l-0 transition-colors duration-400 w-full",
          variant === "primary" && "border-[#1c2340]",
          variant === "secondary" && "border-[#2e4480]",
          variant === "light" && "border-white/20 group-hover:border-white/40"
        )}
      >
        <div className="flex flex-col items-start text-left">
          {eyebrow && (
            <span className={cn(
              "font-montserrat font-extralight text-[0.42rem] tracking-[0.32em] uppercase mb-1.5 transition-colors duration-350",
              variant === "light" ? "text-white/30 group-hover:text-white/40" : "text-[#8b91a8] group-hover:text-white/30"
            )}>
              {eyebrow}
            </span>
          )}
          <span className={cn(
            "font-cormorant font-light text-[1rem] lg:text-[1.12rem] tracking-[0.06em] leading-tight transition-colors duration-350",
            variant === "light" ? "text-white/85 group-hover:text-white" : "text-[#1c2340] group-hover:text-white"
          )}>
            {label}
          </span>
        </div>

        {showArrow && (
          <div className="flex items-center flex-shrink-0 ml-auto pt-1">
            <motion.div 
              variants={{
                initial: { width: "1.8rem", backgroundColor: variant === "light" ? "rgba(255,255,255,0.3)" : "#8b91a8" },
                hover: { width: "2.8rem", backgroundColor: "#c49a3c" }
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="h-px"
            />
            <motion.div 
              variants={{
                initial: { borderColor: variant === "light" ? "rgba(255,255,255,0.3)" : "#8b91a8", x: -1 },
                hover: { borderColor: "#c49a3c", x: 1, y: -1 }
              }}
              className="w-1.5 h-1.5 border-r border-t rotate-45 flex-shrink-0 transition-colors duration-350"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  if (!href) {
    return content;
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
