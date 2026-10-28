"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Sanftes, einmaliges Einblenden beim Scrollen. Bei reduzierter Bewegung sofort sichtbar.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.28, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
