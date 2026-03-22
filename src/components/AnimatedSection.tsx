"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const directionOffsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  const offset = directionOffsets[direction];
  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0, x: 0 }
    : { opacity: 0, y: offset.y, x: offset.x };

  const animate = prefersReducedMotion
    ? { opacity: 1, y: 0, x: 0 }
    : isInView
      ? { opacity: 1, y: 0, x: 0 }
      : {};

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] as const };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
