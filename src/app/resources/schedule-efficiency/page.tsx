import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schedule Efficiency: How to Measure and Improve It | WFM Clubs",
  description: "Learn how to measure schedule efficiency, identify root causes of poor efficiency, and build shift patterns that closely track your demand curve.",
};

export default function ScheduleEfficiencyPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="bg-[#0b1c2d] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Link href="/resources" className="hover:text-white transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-[#00b4ff]">Schedule Efficiency</span>
          </div>
          <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full uppercase tracking-widest mb-5">Scheduling · 7 min read</span>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">Schedule Efficiency: How to Measure and Improve It</h1>
          <p className="text-gray-300 text-base leading-relaxed">The true test of your scheduling quality — and the levers to improve it.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 prose-wfm">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>What is Schedule Efficiency?</h2>
          <p>
            Schedule efficiency measures how closely your <strong>scheduled staffing matches your staffing requirements</strong> across every interval of the day. A highly efficient schedule minimises both overstaffing (wasted cost) and understaffing (SLA failures).
          </p>
          <p>
            A simple definition:
          </p>
          <div className="formula-block">
            Schedule Efficiency % = 1 − (Total Deviation from Requirement ÷ Total Requirement) × 100
          </div>
          <p>
            Practically, most operations measure it as the <strong>percentage of intervals where scheduled staffing is within ±X% of requirement</strong> (e.g., within ±5%).
          </p>
          <div className="step-block">
            <strong>Target:</strong> World-class schedules achieve 85–90%+ of intervals within ±5% of staffing requirement. The industry average is closer to 70–80%.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Root Causes of Poor Schedule Efficiency</h2>

          <h3>1. Rigid shift patterns</h3>
          <p>
            Fixed 8-hour or 9-hour shifts starting at the same time each day create a flat staffing curve — regardless of whether the demand curve is flat. If your peak is 10 AM–2 PM and your trough is 7 AM and 5 PM, identical shift start times serve no one.
          </p>

          <h3>2. Insufficient shift start time options</h3>
          <p>
            Offering only 3–4 start times (e.g., 8 AM, 9 AM, 10 AM, 11 AM) limits the scheduler&apos;s ability to fine-tune coverage. Adding 30-minute increments (e.g., 9:30 AM, 10:30 AM) significantly improves the fit.
          </p>

          <h3>3. Break clustering</h3>
          <p>
            Putting all breaks at the top of the hour (e.g., :00 and :30) creates artificial troughs in staffing. Staggering break schedules to 15-minute intervals smooths out the coverage curve.
          </p>

          <h3>4. Ignoring part-time and split shifts</h3>
          <p>
            Part-time agents (4-hour or 6-hour shifts) are highly effective for covering peak shoulders without incurring the cost of a full 8-hour shift. Many operations under-utilise part-time contracts.
          </p>

          <h3>5. Over-reliance on adherence to fix efficiency</h3>
          <p>
            Managers often chase adherence (agents following their schedule) when the real problem is schedule design. A perfectly followed bad schedule is still a bad schedule.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Measuring Schedule Efficiency</h2>

          <h3>Interval-level overstaffing and understaffing analysis</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Interval</th>
                  <th>Requirement</th>
                  <th>Scheduled</th>
                  <th>Variance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>09:00–09:30</td><td>22</td><td>24</td><td>+2</td><td>Overstaffed</td></tr>
                <tr><td>09:30–10:00</td><td>26</td><td>27</td><td>+1</td><td>On target</td></tr>
                <tr><td>10:00–10:30</td><td>32</td><td>29</td><td>−3</td><td>Understaffed</td></tr>
                <tr><td>10:30–11:00</td><td>35</td><td>35</td><td>0</td><td>On target</td></tr>
                <tr><td>11:00–11:30</td><td>33</td><td>37</td><td>+4</td><td>Overstaffed</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Efficiency score calculation</h3>
          <div className="formula-block">
            {"Total requirement hours = Σ(Requirement × 0.5 hrs per interval) = 148 × 0.5 = 74 hrs\nTotal deviation hours = Σ|Variance| × 0.5 = 10 × 0.5 = 5 hrs\nEfficiency = 1 − (5 ÷ 74) = 93.2%"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Improving Schedule Efficiency: Practical Steps</h2>

          <div className="space-y-5">
            {[
              { title: "Analyse your demand curve shape", body: "Plot your average staffing requirement by interval. Identify the peak width, shoulder periods, and troughs. This shapes your shift portfolio." },
              { title: "Design a varied shift portfolio", body: "Create shifts of different durations (4-hr, 6-hr, 8-hr, 10-hr) and start times (every 30 min from first contact to 2 hrs before last contact). Run an optimisation to find the best combination." },
              { title: "Stagger break schedules", body: "Assign breaks in 15-minute increments across the day rather than clustering at the top of each hour. Small changes can improve interval-level coverage by 3–7%." },
              { title: "Run weekly efficiency reports", body: "After each published week, compare scheduled staffing vs. requirement by interval. Present the efficiency score to the scheduling team and set targets." },
              { title: "Optimise part-time usage", body: "Model whether adding part-time agents on peak shoulders (e.g., 10 AM–2 PM) improves efficiency vs. the cost of employing and training them." },
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b4ff] text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <div>
                  <p className="font-semibold text-[#0b1c2d] mb-1">{s.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Continue Reading</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/resources/forecasting-models" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">← Forecasting Models</Link>
            <Link href="/resources/wfm-career-guide" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">WFM Career Guide →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
