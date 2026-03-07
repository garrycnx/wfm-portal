"use client";

import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import HoverCard from "@/components/motion/HoverCard";
import FadeInSection from "@/components/motion/FadeInSection";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
    iconBg: "bg-blue-50 text-blue-600",
    title: "AI Forecasting",
    desc: "Accurate demand forecasting using Weighted Moving Average, ARIMA, Holt-Winters and ML models tailored for contact centres.",
    href: "/resources/forecasting-models",
    tag: "Learn More →",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    iconBg: "bg-purple-50 text-purple-600",
    title: "Intelligent Scheduling",
    desc: "Auto-generate optimized rosters with SLA targets, shrinkage constraints, shift patterns, and agent skill profiles.",
    href: "/interview/scheduling",
    tag: "Interview Prep →",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    iconBg: "bg-green-50 text-green-600",
    title: "Real-time Optimization",
    desc: "Monitor intraday adherence, reforecast at 15-min intervals, and adjust staffing dynamically to protect SLA.",
    href: "/interview/rta",
    tag: "RTA Guide →",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    ),
    iconBg: "bg-cyan-50 text-cyan-600",
    title: "Erlang C Deep Dive",
    desc: "Understand the mathematics behind contact centre staffing — from traffic intensity to queue probability formulas.",
    href: "/erlang",
    tag: "Read the Guide →",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    ),
    iconBg: "bg-orange-50 text-orange-600",
    title: "Interview Preparation",
    desc: "12 Q&As per role for RTA, Scheduler, Capacity Planner, and Forecaster — curated by a 15-year WFM professional.",
    href: "/interview/rta",
    tag: "Start Preparing →",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    ),
    iconBg: "bg-pink-50 text-pink-600",
    title: "WFM Templates",
    desc: "Ready-to-use Google Sheets for forecasting, capacity planning, shrinkage tracking, and Erlang C calculations.",
    href: "/templates",
    tag: "Browse Templates →",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-[#f4f6f8]">
      <div className="max-w-6xl mx-auto">
        <FadeInSection direction="up">
          <div className="text-center mb-16">
            <p className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-4xl font-extrabold text-[#0b1c2d] mb-4">
              Everything you need for modern WFM
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From Erlang C theory to AI-powered tools and career-ready interview prep — the most complete WFM resource platform available.
            </p>
          </div>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <HoverCard className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 flex-shrink-0`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0b1c2d] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>
                <Link href={f.href} className="mt-4 text-[#00b4ff] text-sm font-semibold hover:underline inline-block">
                  {f.tag}
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
