"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/discover/${project.slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative h-[420px] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.heroImage})`,
            backgroundColor: "#dce3ea",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131110]/70 via-[#131110]/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block px-3 py-1 text-xs tracking-wide bg-[#ffc14d] text-[#131110] font-semibold mb-3 rounded-sm">
            {project.completionStatus}
          </span>
          <h3 className="font-playfair text-2xl text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-white/80">{project.location}</p>
          <p className="text-sm text-white/60 mt-1">
            From {project.startingPrice}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
