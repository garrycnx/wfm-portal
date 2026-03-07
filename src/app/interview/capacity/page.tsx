const qas = [
  {
    q: "What is capacity planning in a WFM context?",
    a: "Capacity planning is the long-range process of ensuring that an organization has the right number of trained and available agents to meet forecasted demand over a future period — typically months to years ahead. Unlike scheduling (short-term, weeks out) or intraday management (real-time), capacity planning focuses on hiring pipelines, training throughput, and headcount ramp plans to sustain SLA targets over the strategic horizon.",
  },
  {
    q: "What is the difference between short-term and long-term capacity planning?",
    a: "Short-term capacity planning (4–8 weeks out) focuses on adjusting existing headcount through overtime, agency staffing, or cross-skilling. It reacts to nearer-term volume changes. Long-term capacity planning (3–24 months) involves hiring projections, training batch planning, and attrition modeling. It determines when to post job requisitions, how many new-hires to onboard per cohort, and how to ramp them to full productivity.",
  },
  {
    q: "How do you calculate required gross headcount?",
    a: "Step 1: Calculate workload = Forecasted Volume × AHT. Step 2: Determine net headcount required (using Erlang C at target SL or simple workload / productive hours). Step 3: Divide by (1 − Shrinkage) to account for shrinkage. Step 4: Divide by (1 − Attrition) to account for agent exits. Formula: Gross HC = Net HC / ((1 − Shrinkage) × (1 − Attrition)). Example: Net HC = 100, Shrinkage = 25%, Attrition = 10%. Gross HC = 100 / (0.75 × 0.90) ≈ 148.",
  },
  {
    q: "What is training throughput and why does it matter in capacity planning?",
    a: "Training throughput is the percentage of trainees who successfully complete training and become certified agents. Formula: Certified HC / Trainees Started × 100. If throughput is 80%, planning to onboard 50 trainees will yield only 40 productive agents. Capacity planners build this into their models — a low throughput means larger hiring batches are needed to reach the target headcount. It also affects ramp time and training cost.",
  },
  {
    q: "What is attrition and how do you factor it into a capacity plan?",
    a: "Attrition is the rate at which agents leave the team (voluntary/involuntary). Formula: Attrition % = Exits / Average HC × 100. In capacity planning, attrition is applied as a monthly or annual decay rate to the headcount. If you have 200 agents and 15% annual attrition, you lose ~2.5 agents per month. The plan must include a hiring pipeline that replaces these exits plus any incremental growth needed to meet volume growth.",
  },
  {
    q: "What is a headcount ramp model and what does it contain?",
    a: "A headcount ramp model is a month-by-month projection that shows: opening headcount, planned hires, training throughput, new hire ramp (the % of productive capacity new agents deliver while ramping — e.g., 50% in month 1, 75% month 2, 100% month 3), attrition exits, and closing headcount. The output is compared to the staffing requirement to identify surplus or gap by month, driving hiring decisions.",
  },
  {
    q: "What is new hire ramp and how do you account for it?",
    a: "New hire ramp is the period during which a newly trained agent builds efficiency and reaches full productivity. A typical ramp might be 3 months: Month 1 = 50% productive, Month 2 = 75%, Month 3 = 100%. Capacity planners translate this into FTE-equivalent capacity. A cohort of 10 new hires in Month 1 only contributes 5 FTE of effective capacity. Ignoring ramp leads to overestimating actual capacity and SL failures.",
  },
  {
    q: "How do you build a capacity plan when you have multiple skills/queues?",
    a: "For multi-skill environments: (1) Forecast volume separately for each queue. (2) Calculate staffing requirements per queue. (3) Identify which agents are cross-skilled across queues. (4) Model shared capacity — cross-skilled agents can flex between queues, reducing total headcount needed. (5) Define a blending strategy (priority rules for where agents are routed). The capacity model must account for skill-specific attrition and training pipelines.",
  },
  {
    q: "What is the difference between FTE and headcount?",
    a: "Headcount is the raw count of individual employees. FTE (Full Time Equivalent) normalizes headcount to full-time equivalents — a part-time agent working 20 hours per week in a 40-hour environment counts as 0.5 FTE. Capacity models use FTE because it accurately reflects available productive capacity regardless of employment contract type.",
  },
  {
    q: "How do you handle volume uncertainty in a capacity plan?",
    a: "Volume uncertainty is managed through scenario modeling: create a base case, an upside scenario (+X%), and a downside scenario (−X%). For each scenario, calculate the headcount gap or surplus. The hiring plan is typically sized for the base case with a pre-approved contingency (e.g., a second hiring cohort on standby). Capacity planners also track leading indicators (pipeline, marketing campaigns, seasonality) to trigger early hiring decisions.",
  },
  {
    q: "What tools and models do you use for capacity planning?",
    a: "Common tools: Excel (most widely used for capacity models), Google Sheets, and WFM platforms like NICE IEX, Verint, or Genesys that include long-range planning modules. Capacity models typically use: Erlang C tables (or built-in Erlang calculators), headcount ramp templates, attrition curves, and scenario models. Python and R are increasingly used for more sophisticated forecasting and simulation.",
  },
  {
    q: "How do you know when to raise a hiring request?",
    a: "A hiring request is raised when the capacity model projects that the headcount (after accounting for attrition and ramp) will fall below the staffing requirement by a threshold (e.g., more than 5% gap for two or more consecutive months). The lead time for raising the request must account for: recruitment time (4–8 weeks), training duration (4–12 weeks), and new hire ramp (1–3 months). This means the request should often be raised 4–6 months before the projected gap.",
  },
];

export default function CapacityPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#00b4ff]/10 text-[#00b4ff] text-sm font-semibold rounded-full mb-4">
            Interview Preparation
          </span>
          <h1 className="text-4xl font-bold text-[#0b1c2d] mb-3">Capacity Planning Interview Preparation</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Common Capacity Planning interview questions with detailed, expert answers.
          </p>
        </div>

        <div className="space-y-5">
          {qas.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <p className="font-bold text-[#0b1c2d] mb-3 text-base">
                <span className="text-[#00b4ff] mr-2">Q{i + 1}.</span>
                {item.q}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-[#00b4ff]/30 pl-4">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Explore more interview guides</p>
          <p className="text-gray-400 text-sm mb-4">Continue your WFM interview preparation.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/interview/scheduling" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
              ← Scheduler Interview
            </a>
            <a href="/interview/forecasting" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              Forecasting →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
