"use client";

import AnimatedCounter from "@/components/motion/AnimatedCounter";
import FadeInSection from "@/components/motion/FadeInSection";

const stats = [
  { target: 15, suffix: "+", label: "Years WFM Experience", icon: "🏆" },
  { target: 1000, suffix: "+", label: "Community Members", icon: "👥" },
  { target: 4, suffix: "", label: "AI-Powered Tools", icon: "⚡" },
  { target: 33, suffix: "", label: "WFM Metrics Defined", icon: "📊" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#0b1c2d] border-y border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <FadeInSection key={stat.label} delay={i * 0.12} direction="up">
            <div className="text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-extrabold text-white mb-1">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2.2}
                />
              </div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
