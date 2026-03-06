"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <Link href={`/journal/${article.slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
      >
        <div className="relative h-52 overflow-hidden bg-[#eaeff3]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${article.image})`,
              backgroundColor: "#dce3ea",
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs tracking-wide bg-[#2f4858] text-white font-medium rounded-sm">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-playfair text-lg text-[#131110] mb-2 leading-snug group-hover:text-[#5a73d7] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-[#6b7c8a] line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[#6b7c8a]">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
