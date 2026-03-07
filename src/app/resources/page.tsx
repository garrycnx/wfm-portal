import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WFM Knowledge Base | WFM Clubs",
  description: "In-depth WFM articles covering shrinkage calculation, forecasting models, schedule efficiency, and career progression in workforce management.",
};

const articles = [
  {
    href: "/resources/shrinkage-calculation",
    tag: "Operations",
    tagColor: "bg-blue-50 text-blue-600",
    title: "The Complete Guide to Shrinkage Calculation",
    excerpt: "Master the two components of shrinkage — internal and external — and learn how to calculate, track, and reduce it without compromising agent wellbeing.",
    readTime: "8 min read",
    topics: ["Formula", "Best Practices", "Benchmarks"],
  },
  {
    href: "/resources/forecasting-models",
    tag: "Forecasting",
    tagColor: "bg-purple-50 text-purple-600",
    title: "WFM Forecasting Models Explained",
    excerpt: "From Weighted Moving Average to ARIMA and ML-based models — understand when to use each approach and how to measure forecast accuracy with MAPE and MAE.",
    readTime: "10 min read",
    topics: ["WMA", "ARIMA", "ML", "MAPE"],
  },
  {
    href: "/resources/schedule-efficiency",
    tag: "Scheduling",
    tagColor: "bg-green-50 text-green-600",
    title: "Schedule Efficiency: How to Measure and Improve It",
    excerpt: "Schedule efficiency is the true test of a WFM team's scheduling quality. Learn how to measure it, identify root causes of poor efficiency, and build shift patterns that track the demand curve.",
    readTime: "7 min read",
    topics: ["Metrics", "Shift Design", "Optimization"],
  },
  {
    href: "/resources/wfm-career-guide",
    tag: "Career",
    tagColor: "bg-orange-50 text-orange-600",
    title: "WFM Career Guide: From RTA to WFM Director",
    excerpt: "A complete roadmap for building a career in workforce management — role progression, skills at each level, salary benchmarks, and the certifications that matter.",
    readTime: "12 min read",
    topics: ["Career Path", "Salaries", "Skills", "Certifications"],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero */}
      <div className="bg-[#0b1c2d] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#00b4ff]/20 text-[#00b4ff] text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">WFM Knowledge Base</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Deep-dive articles on the concepts, formulas, and practices that separate good WFM teams from great ones.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {articles.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group block bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#00b4ff]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${a.tagColor}`}>
                      {a.tag}
                    </span>
                    <span className="text-xs text-gray-400">{a.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#0b1c2d] mb-2 group-hover:text-[#00b4ff] transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {a.topics.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-[#00b4ff] flex-shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Related */}
        <div className="mt-12 bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Want to go deeper?</p>
          <p className="text-gray-400 text-sm mb-5">Explore the Erlang C formula guide or download free WFM templates.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/erlang" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
              Erlang C Guide
            </Link>
            <Link href="/templates" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              Free Templates →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
