"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInSection from "@/components/motion/FadeInSection";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 mesh-bg relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/5 absolute" />
        <div className="w-[900px] h-[900px] rounded-full border border-white/5 absolute" />
        <div className="w-[1200px] h-[1200px] rounded-full border border-white/5 absolute" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeInSection direction="up">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00b4ff]/30 bg-[#00b4ff]/10 text-[#00b4ff] text-sm font-semibold mb-8"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00b4ff] animate-pulse" />
            Join 1,000+ WFM Professionals
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 gradient-text leading-tight">
            Level Up Your WFM Career Today
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get weekly WFM insights, formula breakdowns, and career tips delivered straight to your inbox.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#00b4ff]/60 focus:bg-white/15 transition-all text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 bg-[#00b4ff] hover:bg-[#0095d8] text-white font-bold rounded-xl transition-colors text-sm glow-blue whitespace-nowrap"
              >
                Get Free Access
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You&apos;re in! Check your inbox for a confirmation email.
            </motion.div>
          )}

          <p className="text-gray-500 text-xs mt-4">No spam. Unsubscribe any time. 100% free.</p>
        </FadeInSection>
      </div>
    </section>
  );
}
