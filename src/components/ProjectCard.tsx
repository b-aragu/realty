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
  // Determine badge style based on completion status
  const badgeStyles: Record<string, string> = {
    "Off-Plan": "bg-[rgba(46,68,128,0.55)] border-[rgba(46,68,128,0.5)]",
    "Under Construction": "bg-[rgba(28,35,64,0.55)] border-white/[0.12]",
    "Complete": "bg-[rgba(30,55,35,0.55)] border-[rgba(80,140,90,0.35)]",
  };
  const dotColors: Record<string, string> = {
    "Off-Plan": "#7a9adf",
    "Under Construction": "#c49a3c",
    "Complete": "#7ac48a",
  };

  return (
    <Link href={`/discover/${project.slug}`} className="block">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="group relative cursor-pointer overflow-hidden bg-[#1c2340]"
      >
        <div className={`relative overflow-hidden ${featured ? "h-[520px]" : "h-[380px]"}`}>
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
            style={{
              backgroundImage: `url(${project.heroImage})`,
              backgroundColor: "#1c2340",
            }}
          />
          {/* Architectural grid texture */}
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(90deg, transparent, transparent calc(20% - 0.5px), rgba(255,255,255,0.02) calc(20% - 0.5px), rgba(255,255,255,0.02) 20%)"
          }} />
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,24,0.92)] via-[rgba(8,12,24,0.45)] to-transparent z-[1]" />
          {/* Cobalt hover tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(46,68,128,0.28)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

          {/* Badge — status with colored dot */}
          <div className={`absolute top-5 left-5 z-[3] flex items-center gap-2 text-[0.44rem] tracking-[0.3em] uppercase text-white/80 backdrop-blur-[10px] px-3 py-1 border ${badgeStyles[project.completionStatus] || badgeStyles["Under Construction"]}`}>
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: dotColors[project.completionStatus] || "#c49a3c" }} />
            {project.completionStatus}
          </div>

          {/* Content */}
          <div className={`absolute bottom-0 left-0 right-0 z-[2] ${featured ? "p-8" : "p-6"}`}>
            {/* Gold rule — grows on hover */}
            <div className="w-0 h-px bg-[#c49a3c] mb-3 group-hover:w-7 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />

            {/* Location */}
            <p className="text-[0.46rem] tracking-[0.3em] uppercase text-white/40 group-hover:text-[rgba(196,154,60,0.75)] transition-colors duration-400 mb-2">
              {project.location}
            </p>

            {/* Name */}
            <h2 className={`font-cormorant font-light leading-[1.15] tracking-[0.01em] text-white/90 group-hover:text-white transition-colors duration-400 mb-3 ${featured ? "text-[2.2rem]" : "text-[1.4rem]"}`}>
              {project.title}
            </h2>

            {/* Metadata row */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className={`font-cormorant font-light text-white/80 leading-none ${featured ? "text-[1.1rem]" : "text-[0.95rem]"}`}>
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
                <span className="text-[0.42rem] tracking-[0.28em] uppercase text-white/30">Available</span>
              </div>
              <div className="w-px h-7 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className={`font-cormorant font-light text-white/80 leading-none ${featured ? "text-[1.1rem]" : "text-[0.95rem]"}`}>
                  {project.completionDate}
                </span>
                <span className="text-[0.42rem] tracking-[0.28em] uppercase text-white/30">Completion</span>
              </div>
              <div className="w-px h-7 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className={`font-cormorant font-light text-white/80 leading-none ${featured ? "text-[1.1rem]" : "text-[0.95rem]"}`}>
                  From {project.startingPrice}
                </span>
                <span className="text-[0.42rem] tracking-[0.28em] uppercase text-white/30">Price</span>
              </div>
            </div>

            {/* Upgrade: Architectural CTA signature */}
            <div className="mt-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <ActionButton 
                label="View Development" 
                eyebrow={project.completionStatus === "Complete" ? "Finished Project" : "Investment Portfolio"}
                variant="light"
                className="scale-[0.85] origin-left"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
