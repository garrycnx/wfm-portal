import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Complete Guide to Shrinkage Calculation | WFM Clubs",
  description: "Master shrinkage calculation — the formula, internal vs external components, industry benchmarks, and best practices for reducing shrinkage without compromising agent experience.",
};

export default function ShrinkagePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="bg-[#0b1c2d] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Link href="/resources" className="hover:text-white transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-[#00b4ff]">Shrinkage</span>
          </div>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-widest mb-5">Operations · 8 min read</span>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">The Complete Guide to Shrinkage Calculation</h1>
          <p className="text-gray-300 text-base leading-relaxed">Master the two components of shrinkage and learn how to calculate, track, and strategically reduce it.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 prose-wfm">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>What is Shrinkage?</h2>
          <p>
            Shrinkage is the percentage of paid working time during which agents are <strong>unavailable to handle contacts</strong>. It is one of the most critical inputs in WFM — getting it wrong leads to systematic understaffing or overstaffing, regardless of how accurate your forecast is.
          </p>
          <p>
            The core formula:
          </p>
          <div className="formula-block">
            Shrinkage % = (Total Unavailable Hours ÷ Total Scheduled Hours) × 100
          </div>
          <div className="step-block">
            <strong>Rule of thumb:</strong> If your shrinkage is 25%, you need to schedule 33% more agents than your Erlang C net staffing requirement (1 ÷ 0.75 = 1.33×). Most contact centres run between 25–35% shrinkage.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Internal vs External Shrinkage</h2>
          <p>Shrinkage is split into two categories — understanding this distinction is essential for root cause analysis and reduction strategies.</p>

          <h3>Internal Shrinkage (On-site, planned)</h3>
          <p>These are activities that happen <em>at the workplace</em> and are largely within the control of the WFM or operations team:</p>
          <ul>
            <li><strong>Scheduled breaks</strong> — morning tea, lunch, afternoon breaks</li>
            <li><strong>Team meetings and huddles</strong></li>
            <li><strong>Training and coaching sessions</strong></li>
            <li><strong>After-call work (ACW)</strong> — if treated as offline time rather than part of AHT</li>
            <li><strong>System downtime / log-in issues</strong></li>
            <li><strong>Outbound callbacks or admin tasks</strong></li>
          </ul>

          <h3>External Shrinkage (Out-of-office, harder to control)</h3>
          <p>These activities remove agents from the schedule entirely:</p>
          <ul>
            <li><strong>Planned annual leave / vacation</strong></li>
            <li><strong>Sick leave / unplanned absence</strong></li>
            <li><strong>Public holidays</strong></li>
            <li><strong>Maternity / paternity leave</strong></li>
            <li><strong>No-shows</strong></li>
            <li><strong>Lateness and early departures</strong></li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Calculating Shrinkage: Step by Step</h2>

          <h3>Method 1: Interval-level (for scheduling)</h3>
          <div className="formula-block">
            {"For each 30-min interval:\nShrinkage = Agents off-task ÷ Agents scheduled\n\nExample: 10 agents on break out of 40 scheduled = 25% shrinkage"}
          </div>

          <h3>Method 2: Weekly/Monthly (for capacity planning)</h3>
          <div className="formula-block">
            {"Total scheduled hours = Headcount × Weekly contracted hours\nUnavailable hours = Breaks + Leave + Training + Sick + Other\nShrinkage = Unavailable hours ÷ Scheduled hours × 100\n\nExample: 50 agents × 40 hrs = 2,000 scheduled hours\nUnavailable: 350 hrs (breaks: 200, training: 80, sick: 70)\nShrinkage = 350 ÷ 2,000 × 100 = 17.5%"}
          </div>

          <h3>Gross Headcount Formula</h3>
          <p>Once you have shrinkage, apply it to convert net staffing requirement (from Erlang C) to gross scheduled headcount:</p>
          <div className="formula-block">
            Gross HC = Net HC ÷ (1 − Shrinkage%)
          </div>

          <div className="overflow-x-auto mt-4">
            <table>
              <thead><tr><th>Net HC</th><th>Shrinkage</th><th>Gross HC Needed</th></tr></thead>
              <tbody>
                <tr><td>20</td><td>20%</td><td>25</td></tr>
                <tr><td>20</td><td>25%</td><td>26.7 → 27</td></tr>
                <tr><td>20</td><td>30%</td><td>28.6 → 29</td></tr>
                <tr><td>20</td><td>35%</td><td>30.8 → 31</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Industry Benchmarks</h2>
          <div className="overflow-x-auto">
            <table>
              <thead><tr><th>Component</th><th>Typical Range</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td>Breaks & Lunch</td><td>8–12%</td><td>Regulated by employment law in most countries</td></tr>
                <tr><td>Training & Coaching</td><td>3–6%</td><td>Higher in high-attrition or product-change environments</td></tr>
                <tr><td>Meetings & Admin</td><td>2–4%</td><td>Often underestimated</td></tr>
                <tr><td>Annual Leave</td><td>4–6%</td><td>Varies by country (EU higher than US)</td></tr>
                <tr><td>Sick Leave</td><td>2–5%</td><td>Seasonal spikes in winter</td></tr>
                <tr><td>No-shows / Late</td><td>1–3%</td><td>Highly correlated with engagement scores</td></tr>
                <tr className="font-semibold bg-blue-50"><td>Total Shrinkage</td><td>20–35%</td><td>25% is a common industry target</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Reducing Shrinkage Without Harming Agents</h2>
          <ul>
            <li><strong>Stagger breaks:</strong> Spread breaks across intervals rather than clustering at the top of the hour. Even a 10-minute shift in break times can improve coverage by 5%.</li>
            <li><strong>Schedule training in troughs:</strong> Use forecast troughs (low-volume periods) for training and meetings rather than peak hours.</li>
            <li><strong>Reduce avoidable sick leave:</strong> Track patterns — Monday/Friday sick leave spikes often signal engagement issues, not illness. Coaching and flexible scheduling can help.</li>
            <li><strong>Automate ACW:</strong> Reducing average after-call work (e.g., through CRM automation) reduces the internal shrinkage component if ACW is tracked separately from AHT.</li>
            <li><strong>Review leave management:</strong> Implement leave request systems with auto-approval rules based on coverage thresholds — this improves leave predictability.</li>
          </ul>
        </div>

        <div className="bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Continue Reading</p>
          <p className="text-gray-400 text-sm mb-5">Explore more WFM knowledge base articles.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/resources" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">← Knowledge Base</Link>
            <Link href="/resources/forecasting-models" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">Forecasting Models →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
