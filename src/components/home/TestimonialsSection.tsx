"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import FadeInSection from "@/components/motion/FadeInSection";

const testimonials = [
  {
    quote: "WFM Clubs gave me the confidence to ace my capacity planning interview. The Erlang C breakdown alone is worth bookmarking.",
    author: "Senior WFM Analyst",
    company: "Global BPO, APAC Region",
    initials: "SA",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote: "The AI Schedule Generator cut our shift planning time from 6 hours to under 30 minutes. It handles multi-skill blending natively.",
    author: "Senior Scheduler",
    company: "Contact Centre, 500+ Agents",
    initials: "MR",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote: "Finally a forecasting resource that explains the model, not just the output. Every WFM professional needs this in their toolkit.",
    author: "Forecasting Lead",
    company: "Fintech Operations",
    initials: "KP",
    color: "from-green-500 to-teal-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection direction="up">
          <div className="text-center mb-14">
            <p className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-3">Community</p>
            <h2 className="text-4xl font-extrabold text-[#0b1c2d] mb-4">
              Trusted by WFM Professionals
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From RTAs to WFM Directors — professionals across the globe use WFM Clubs to level up.
            </p>
          </div>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative bg-[#f8fafc] rounded-2xl p-7 border border-gray-100 h-full flex flex-col">
                {/* Quote mark */}
                <div className={`text-6xl font-serif font-black leading-none mb-4 bg-gradient-to-r ${t.color} bg-clip-text`} style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  &ldquo;
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0b1c2d] text-sm">{t.author}</p>
                    <p className="text-gray-400 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
