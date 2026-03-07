"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FloatingShape from "@/components/motion/FloatingShape";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const lineVariant = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#060e18] via-[#0b1c2d] to-[#0d2a4a]">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,180,255,0.07) 0%, transparent 70%)" }} />

      {/* Floating shapes */}
      <FloatingShape size={320} top="5%" left="-6%" delay={0} duration={7} shape="ring" opacity={0.12} color="#00b4ff" />
      <FloatingShape size={180} top="15%" right="8%" delay={1.2} duration={5.5} shape="circle" opacity={0.13} color="#00b4ff" />
      <FloatingShape size={90}  bottom="20%" left="12%" delay={0.6} duration={8} shape="square" opacity={0.1} color="#00b4ff" />
      <FloatingShape size={240} bottom="5%" right="-4%" delay={2} duration={6.5} shape="ring" opacity={0.09} color="#0095d8" />
      <FloatingShape size={60}  top="40%" left="5%" delay={1.8} duration={4.5} shape="circle" opacity={0.15} color="#00b4ff" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00b4ff]/30 bg-[#00b4ff]/10 text-[#00b4ff] text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff] animate-pulse" />
          Workforce Management · AI-Powered Platform
        </motion.div>

        {/* Headline */}
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.h1 variants={lineVariant} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-3">
            Master Workforce
          </motion.h1>
          <motion.h1 variants={lineVariant} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6" style={{ background: "linear-gradient(135deg, #00b4ff 0%, #7dd3f8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Management with AI
          </motion.h1>
          <motion.p variants={lineVariant} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Smarter forecasting, intelligent scheduling, Erlang C expertise, and data-driven workforce decisions — all in one platform.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/login"
              className="inline-block px-9 py-4 bg-[#00b4ff] text-white font-bold rounded-xl text-base glow-blue hover:bg-[#0095d8] transition-colors shadow-2xl"
            >
              Get Started Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/erlang"
              className="inline-block px-9 py-4 glass-card text-white font-semibold rounded-xl text-base hover:bg-white/10 transition-colors"
            >
              Explore Erlang C →
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2.5 bg-[#00b4ff] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
