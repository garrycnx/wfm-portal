import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free WFM Templates | WFM Clubs",
  description: "Download free WFM spreadsheet templates for capacity planning, shrinkage tracking, schedule efficiency, Erlang C calculation, and forecast modelling.",
};

const templates = [
  {
    title: "Erlang C Staffing Calculator",
    desc: "Calculate net agent requirements from forecasted volume and AHT. Includes service level output, occupancy, and ASA. Pre-built for 30-min and 15-min intervals.",
    tags: ["Erlang C", "Staffing", "Service Level"],
    color: "from-blue-500 to-cyan-500",
    icon: "📊",
    complexity: "Intermediate",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
  {
    title: "Capacity Planning Model",
    desc: "12-month rolling headcount model with attrition curves, training throughput, new hire ramp, and scenario planning (base / upside / downside).",
    tags: ["Capacity", "Headcount", "Attrition"],
    color: "from-purple-500 to-pink-500",
    icon: "🗓",
    complexity: "Advanced",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
  {
    title: "Shrinkage Tracker",
    desc: "Weekly shrinkage dashboard tracking internal (breaks, training, meetings) and external (leave, sick, no-shows) components. Auto-calculates gross vs. net HC.",
    tags: ["Shrinkage", "Dashboard", "Tracking"],
    color: "from-green-500 to-teal-500",
    icon: "📉",
    complexity: "Beginner",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
  {
    title: "Schedule Efficiency Analyser",
    desc: "Upload your interval-level staffing requirement and actual scheduled headcount. Automatically calculates efficiency score, over/understaffing by interval, and weekly trend.",
    tags: ["Schedule", "Efficiency", "Analysis"],
    color: "from-orange-500 to-red-500",
    icon: "⚡",
    complexity: "Intermediate",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
  {
    title: "WFM Forecast Model (WMA + Seasonal Index)",
    desc: "Weighted Moving Average forecasting with seasonal indices for intraday, intraweek, and intra-year patterns. Calculates MAPE and MAE automatically.",
    tags: ["Forecasting", "WMA", "MAPE"],
    color: "from-indigo-500 to-blue-500",
    icon: "📈",
    complexity: "Advanced",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
  {
    title: "RTA Intraday Management Dashboard",
    desc: "Real-time intraday tracker showing actual vs. forecast volume, current SL, occupancy, and projected end-of-day SL. Built for 30-min interval updates.",
    tags: ["RTA", "Intraday", "SL"],
    color: "from-pink-500 to-rose-500",
    icon: "🎯",
    complexity: "Intermediate",
    href: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview",
  },
];

const complexityColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero */}
      <div className="bg-[#0b1c2d] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-[#00b4ff]/20 text-[#00b4ff] text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Free Templates
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">WFM Spreadsheet Templates</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready-to-use Google Sheets templates built by WFM practitioners. Copy to your Drive and start using immediately — no sign-up required.
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="bg-[#00b4ff]/10 border border-[#00b4ff]/30 rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-[#00b4ff] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-[#0b1c2d]">
            All templates open in Google Sheets preview. Click <strong>&quot;Use Template&quot;</strong> to copy to your Google Drive. A Google account is required to save your copy.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div key={t.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Card header gradient */}
              <div className={`h-2 bg-gradient-to-r ${t.color}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${complexityColor[t.complexity]}`}>
                    {t.complexity}
                  </span>
                </div>
                <h3 className="font-bold text-[#0b1c2d] text-base mb-2">{t.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{t.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${t.color} hover:opacity-90 transition-opacity`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Use Template
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Want more?</p>
          <p className="text-gray-400 text-sm mb-5">Explore our AI-powered tools and scheduling engine.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/resources" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">Knowledge Base</Link>
            <a href="https://schedule1-4.streamlit.app/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              AI Schedule Generator →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
