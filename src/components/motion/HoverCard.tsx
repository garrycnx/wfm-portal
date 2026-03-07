"use client";

import { motion } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 24px 60px rgba(0, 180, 255, 0.14), 0 8px 24px rgba(0,0,0,0.1)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
