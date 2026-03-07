"use client";

import { motion } from "framer-motion";

interface FloatingShapeProps {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  shape?: "circle" | "square" | "ring";
  opacity?: number;
  color?: string;
}

export default function FloatingShape({
  size,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 6,
  shape = "circle",
  opacity = 0.18,
  color = "#00b4ff",
}: FloatingShapeProps) {
  const borderRadius =
    shape === "circle" ? "50%" : shape === "square" ? "12px" : "50%";

  const background =
    shape === "ring"
      ? "transparent"
      : `radial-gradient(circle, ${color}50 0%, ${color}10 70%, transparent 100%)`;

  const border =
    shape === "ring" ? `2px solid ${color}50` : `1px solid ${color}30`;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        borderRadius,
        background,
        border,
        opacity,
      }}
      animate={{
        y: [0, -22, 0],
        rotate: shape === "square" ? [0, 15, 0] : [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
