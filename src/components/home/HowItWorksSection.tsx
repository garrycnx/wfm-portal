"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeInSection from "@/components/motion/FadeInSection";

const steps = [
  {
    number: "01",
    title: "Forecast Volume",
    desc: "Use AI forecasting models (WMA, ARIMA, ML) to predict call volume by interval for the next 4–8 weeks with MAPE < 5%.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
    ),
  },
  {
    number: "02",
    title: "Calculate Staffing",
    desc: "Apply Erlang C to convert forecasted volume and AHT into interval-level staffing requirements at your target SLA.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    ),
  },
  {
    number: "03",
    title: "Schedule & Optimize",
    desc: "Build schedules that match your staffing curve, account for shrinkage, and continuously optimize in real-time with RTA monitoring.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
  },
];

function ConnectingLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <div ref={ref} className="hidden md:flex items-center flex-1 mx-4 mt-[-60px]">
      <div className="relative w-full h-0.5 bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00b4ff] to-[#00b4ff]/30 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6 mesh-bg">
      <div className="max-w-6xl mx-auto">
        <FadeInSection direction="up">
          <div className="text-center mb-16">
            <p className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-3">The WFM Cycle</p>
            <h2 className="text-4xl font-extrabold gradient-text mb-4">
              How World-Class WFM Works
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              The three-phase cycle that every high-performing contact centre uses to hit SLA targets consistently.
            </p>
          </div>
        </FadeInSection>

        <div className="flex flex-col md:flex-row items-start md:items-center">
          {steps.map((step, i) => (
            <div key={step.number} className="contents">
              <FadeInSection delay={i * 0.2} className="flex-1 text-center px-4">
                <div className="flex flex-col items-center">
                  {/* Number badge */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/30 flex items-center justify-center text-[#00b4ff]">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#00b4ff] rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">{step.desc}</p>
                </div>
              </FadeInSection>
              {i < steps.length - 1 && <ConnectingLine key={`line-${i}`} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
