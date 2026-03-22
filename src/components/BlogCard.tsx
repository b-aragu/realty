"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

interface BlogCardProps {
  article: Article;
  /** If true, renders as a large image card with overlay content. Used in editorial grids. */
  variant?: "image" | "list";
  /** Height class for image variant */
  imageHeight?: string;
}

export default function BlogCard({ article, variant = "image", imageHeight = "h-[300px]" }: BlogCardProps) {
  // ── LIST VARIANT — text-only article row ──
  if (variant === "list") {
    return (
      <Link
        href={`/journal/${article.slug}`}
        className="group relative block py-7 px-0 border-b border-[#dde1ee] transition-all duration-300 overflow-hidden"
      >
        {/* Left border reveal on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2e4480] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-350" />

        <div className="pl-0 group-hover:pl-4 transition-all duration-300">
          {/* Category with gold line prefix */}
          <p className="flex items-center gap-2 text-[0.44rem] tracking-[0.34em] uppercase text-[#2e4480] mb-2">
            <span className="w-4 h-px bg-[#c49a3c]" />
            {article.category}
          </p>
          <h4 className="font-cormorant font-light text-[1.05rem] leading-[1.35] text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300 mb-3">
            {article.title}
          </h4>
          <div className="flex items-center gap-3">
            <span className="text-[0.46rem] tracking-[0.2em] text-[#8b91a8]">{article.date}</span>
            <span className="w-[2px] h-[2px] rounded-full bg-[#dde1ee]" />
            <span className="text-[0.46rem] tracking-[0.2em] text-[#8b91a8]">{article.readTime}</span>
          </div>
          {/* Arrow CTA on hover */}
          <div className="flex items-center gap-2 mt-3 text-[0.48rem] tracking-[0.26em] uppercase text-[#8b91a8] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#2e4480] transition-all duration-300">
            Read
            <span className="w-5 group-hover:w-8 h-px bg-current transition-all duration-400" />
          </div>
        </div>
      </Link>
    );
  }

  // ── IMAGE VARIANT — full bleed image card with overlay ──
  return (
    <Link href={`/journal/${article.slug}`} className="block">
      <motion.article
        whileHover={{ y: -1 }}
        transition={{ duration: 0.3 }}
        className={`group relative cursor-pointer overflow-hidden bg-[#1c2340] ${imageHeight}`}
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
          style={{
            backgroundImage: `url(${article.image})`,
            backgroundColor: "#1c2340",
          }}
        />
        {/* Subtle grain texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)"
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,20,0.95)] via-[rgba(8,10,20,0.5)] to-transparent z-[1]" />
        {/* Cobalt hover tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(46,68,128,0.25)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-[2]">
          {/* Category with gold line prefix */}
          <p className="flex items-center gap-2 text-[0.44rem] tracking-[0.36em] uppercase text-white/45 group-hover:text-[rgba(196,154,60,0.9)] transition-colors duration-400 mb-3">
            <span className="w-5 h-px bg-[#c49a3c] opacity-70" />
            {article.category}
          </p>

          {/* Title */}
          <h3 className="font-cormorant font-light text-[1.2rem] leading-[1.2] tracking-[0.01em] text-white/90 group-hover:text-white transition-colors duration-400 mb-3">
            {article.title}
          </h3>

          {/* Excerpt — hidden, fades in on hover */}
          <p className="text-[0.6rem] leading-[1.9] tracking-[0.07em] text-transparent max-h-0 overflow-hidden group-hover:text-white/50 group-hover:max-h-16 transition-all duration-400 delay-100">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[0.46rem] tracking-[0.22em] text-white/30">{article.date}</span>
            <span className="w-[2px] h-[2px] rounded-full bg-white/20" />
            <span className="text-[0.46rem] tracking-[0.22em] text-white/30">{article.readTime}</span>
          </div>

          {/* CTA arrow — slides up on hover */}
          <div className="flex items-center gap-2 mt-3 text-[0.48rem] tracking-[0.28em] uppercase text-transparent opacity-0 translate-y-1.5 group-hover:text-white/70 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-[120ms]">
            Read Article
            <span className="w-5 group-hover:w-9 h-px bg-white/40 transition-all duration-400" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
