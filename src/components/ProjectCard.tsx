"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ActionButton from "@/components/ui/ActionButton";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/discover/${project.slug}`} className="block">
      <div
        className={cn(
          "group relative overflow-hidden bg-[#1c2340] transition-all duration-500",
          featured ? "aspect-[3/4]" : "aspect-[3/4]"
        )}
      >
        {/* Image Fill */}
        <div
          className="absolute inset-0 transition-transform duration-[900ms] cubic-bezier(0.4,0,0.2,1) group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            background: "repeating-linear-gradient(90deg, transparent, transparent calc(16.666% - 0.5px), #fff calc(16.666% - 0.5px), #fff 16.666%)"
          }} />
        </div>

        {/* Scrim Gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(12,17,42,0.93)] via-[rgba(12,17,42,0.5)] via-[42%] to-[rgba(12,17,42,0.08)] to-[68%] lg:to-transparent" />

        {/* Frosted Badge */}
        <div className="absolute top-4 left-4 z-[3] flex items-center gap-2 px-3 py-1.5 bg-[rgba(28,35,64,0.55)] backdrop-blur-[10px] border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] animate-pulse" />
          <span className="text-[0.4rem] tracking-[0.26em] uppercase text-white/70">
            {project.completionStatus}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[2] p-6 lg:p-7">
          {/* Growing Gold Rule */}
          <div className="w-6 h-px bg-[#c49a3c] mb-3 transition-all duration-400 cubic-bezier(0.4,0,0.2,1) group-hover:w-10" />
          
          <p className="text-[0.43rem] tracking-[0.22em] uppercase text-white/40 mb-1.5">
            {project.location}
          </p>
          
          <h3 className="font-cormorant font-light text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.15] text-white/90 mb-4">
            {project.title}
          </h3>

          {/* Specs Row */}
          <div className="flex items-center border-t border-b border-white/10 py-3 mb-4">
            <div className="flex flex-col gap-0.5 pr-4">
              <span className="text-[0.37rem] tracking-[0.24em] uppercase text-white/25">Available</span>
              <span className="font-cormorant font-light text-[0.82rem] text-white/70 leading-none">
                {(() => {
                  const beds = Array.from(new Set(project.unitTypes.map(u => u.bedrooms)))
                    .map(b => parseInt(b))
                    .sort((a, b) => a - b);
                  if (beds.length === 0) return "—";
                  if (beds.length === 1) return `${beds[0]} Bed`;
                  const last = beds.pop();
                  return `${beds.join(", ")} & ${last} Bed`;
                })()}
              </span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col gap-0.5 pl-4">
              <span className="text-[0.37rem] tracking-[0.24em] uppercase text-white/25">Completion</span>
              <span className="font-cormorant font-light text-[0.82rem] text-white/70 leading-none">
                {project.completionDate}
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[0.38rem] tracking-[0.22em] uppercase text-white/25">From</span>
            <span className="font-cormorant font-light text-[1.15rem] text-white/85 leading-none">
              {project.startingPrice}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[0.44rem] tracking-[0.24em] uppercase text-white/45 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            View Development
            <div className="w-6 h-px bg-[#c49a3c] transition-all duration-400 group-hover:w-10" />
          </div>
        </div>
      </div>
    </Link>
  );
}

