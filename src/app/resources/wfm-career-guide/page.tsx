import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WFM Career Guide: From RTA to WFM Director | WFM Clubs",
  description: "A complete roadmap for building a career in workforce management — role progression, key skills at each level, salary benchmarks, and certifications.",
};

const roles = [
  {
    level: "01",
    title: "Real-Time Analyst (RTA)",
    salary: "$35K–$55K",
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-500",
    skills: ["Schedule adherence monitoring", "Intraday management", "ACD/WFM tool proficiency", "Clear communication under pressure"],
    typical: "0–2 years WFM experience. Often first step into WFM from operations or floor staff.",
  },
  {
    level: "02",
    title: "WFM Analyst",
    salary: "$45K–$70K",
    color: "border-purple-200 bg-purple-50",
    badge: "bg-purple-500",
    skills: ["Forecasting (WMA, seasonality)", "Scheduling and shift design", "Erlang C and staffing calculations", "Excel/Google Sheets modelling"],
    typical: "1–4 years WFM experience. Core WFM practitioner role in most operations.",
  },
  {
    level: "03",
    title: "Senior WFM Analyst",
    salary: "$60K–$90K",
    color: "border-green-200 bg-green-50",
    badge: "bg-green-500",
    skills: ["Capacity planning models", "Multi-skill scheduling", "Stakeholder reporting", "WFM platform configuration"],
    typical: "3–7 years. Often specialists in forecasting, scheduling, or capacity planning.",
  },
  {
    level: "04",
    title: "WFM Team Leader / Manager",
    salary: "$70K–$100K",
    color: "border-orange-200 bg-orange-50",
    badge: "bg-orange-500",
    skills: ["Team management and coaching", "Process improvement", "Strategic capacity planning", "Vendor management (WFM platforms)"],
    typical: "5–10 years. Manages a team of analysts and reports to WFM Director or Ops Director.",
  },
  {
    level: "05",
    title: "WFM Director / Head of WFM",
    salary: "$100K–$160K+",
    color: "border-red-200 bg-red-50",
    badge: "bg-red-500",
    skills: ["Executive stakeholder management", "WFM technology strategy", "Enterprise capacity planning", "P&L and budget ownership"],
    typical: "10+ years. Strategic leadership role, often reporting to VP Operations or COO.",
  },
];

export default function WFMCareerGuidePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="bg-[#0b1c2d] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Link href="/resources" className="hover:text-white transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-[#00b4ff]">Career Guide</span>
          </div>
          <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-bold rounded-full uppercase tracking-widest mb-5">Career · 12 min read</span>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">WFM Career Guide: From RTA to Director</h1>
          <p className="text-gray-300 text-base leading-relaxed">Your complete roadmap for building a high-impact career in workforce management — with salary benchmarks, skill ladders, and certifications.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 prose-wfm">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>The WFM Career Ladder</h2>
          <p>
            Workforce management offers a clear, structured career path from entry-level Real-Time Analyst to senior leadership. Unlike many operations roles, WFM rewards <strong>technical depth and business acumen</strong> in equal measure — making it one of the most transferable skill sets in the contact centre industry.
          </p>
        </div>

        <div className="space-y-5 mb-6">
          {roles.map((r) => (
            <div key={r.level} className={`rounded-2xl p-6 border ${r.color}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-8 h-8 rounded-full ${r.badge} text-white text-xs font-bold flex items-center justify-center`}>{r.level}</span>
                    <h3 className="font-bold text-[#0b1c2d] text-lg m-0">{r.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{r.typical}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {r.skills.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-400 mb-1">Salary Range</p>
                  <p className="font-bold text-[#0b1c2d] text-sm">{r.salary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Essential Technical Skills at Every Level</h2>

          <h3>Core WFM skills (RTA → Senior Analyst)</h3>
          <ul>
            <li><strong>Erlang C:</strong> Understanding and applying the formula is non-negotiable for scheduling and capacity roles</li>
            <li><strong>Forecasting methods:</strong> WMA, Holt-Winters, seasonality adjustment, event modelling</li>
            <li><strong>Shrinkage and occupancy:</strong> Calculation, benchmarking, and management</li>
            <li><strong>Service level dynamics:</strong> How SL responds to volume, AHT, staffing, and interval granularity</li>
            <li><strong>Schedule adherence:</strong> Measurement, reporting, and coaching framework</li>
          </ul>

          <h3>Advanced skills (Manager → Director)</h3>
          <ul>
            <li><strong>Capacity planning models:</strong> Headcount ramp, attrition curves, training throughput, scenario planning</li>
            <li><strong>Multi-site and multi-skill modelling:</strong> Network efficiency, cross-site skilling strategies</li>
            <li><strong>WFM technology:</strong> Configuration and administration of NICE IEX, Verint, Genesys, Aspect, or Calabrio</li>
            <li><strong>Data analytics:</strong> Python or R for advanced modelling, SQL for data extraction</li>
            <li><strong>Change management:</strong> Implementing new scheduling models, driving adoption of WFM tools</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Certifications That Matter</h2>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Certification</th>
                  <th>Provider</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>CWPP (Certified Workforce Planning Professional)</td><td>SWPP</td><td>Core WFM practitioners, all levels</td></tr>
                <tr><td>CCXP (Certified CX Professional)</td><td>CXPA</td><td>Senior WFM + CX strategy roles</td></tr>
                <tr><td>Six Sigma Green Belt</td><td>Various</td><td>WFM managers focused on process improvement</td></tr>
                <tr><td>NICE IEX Certification</td><td>NICE</td><td>Platform-specific roles, BPO environments</td></tr>
                <tr><td>Verint Certification</td><td>Verint</td><td>Platform-specific roles, enterprise environments</td></tr>
                <tr><td>Google Data Analytics Certificate</td><td>Coursera/Google</td><td>Analysts moving into data-driven WFM</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>How to Accelerate Your WFM Career</h2>
          <ul>
            <li><strong>Build your Erlang C fluency:</strong> If you can explain Erlang C and its limitations to a non-technical stakeholder, you are ahead of 80% of WFM professionals.</li>
            <li><strong>Own a metric:</strong> Volunteer to own and improve one key metric — schedule efficiency, forecast MAPE, or shrinkage. Results are your best promotion case.</li>
            <li><strong>Cross-train:</strong> If you are an RTA, learn forecasting. If you are a scheduler, learn capacity planning. Breadth commands a premium in smaller teams.</li>
            <li><strong>Present your work:</strong> Build a habit of documenting and presenting WFM insights to operations leadership. Visibility matters.</li>
            <li><strong>Join the WFM community:</strong> SWPP, Workforce Connect, and WFM Clubs are your networks. The WFM world is smaller than you think — relationships accelerate careers.</li>
          </ul>
        </div>

        <div className="bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Ready to level up?</p>
          <p className="text-gray-400 text-sm mb-5">Prepare for your next WFM interview or explore our free templates.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/interview/rta" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">Interview Prep</Link>
            <Link href="/templates" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">Free Templates →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
