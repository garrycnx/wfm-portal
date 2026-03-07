import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WFM Use Cases | WFM Clubs",
  description: "Real-world WFM use cases — see how workforce management principles solve contact centre challenges across BPOs, retail, fintech, healthcare, and more.",
};

const useCases = [
  {
    tag: "BPO / Outsourcing",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Multi-Client Volume Spikes in a Large BPO",
    challenge: "A 2,000-agent BPO managing 12 client accounts experienced unpredictable daily volume spikes — a promotion for one client would flood the queue and degrade SL for others. Traditional scheduling could not respond fast enough.",
    solution: "The WFM team implemented a cross-skill blending model using real-time agent allocation. Agents were trained across 3–4 compatible client skills, and the intraday team used real-time volume thresholds to re-route agents dynamically. Erlang C was recalculated every 15 minutes per queue.",
    result: "Average SL improved from 71% to 84% within 8 weeks. Cross-skill utilisation reduced total headcount requirement by 6% — equivalent to 120 FTE in cost savings.",
    icon: "🏢",
    color: "border-blue-100",
    highlight: "bg-blue-50",
  },
  {
    tag: "Retail / E-commerce",
    tagColor: "bg-orange-100 text-orange-700",
    title: "Black Friday & Peak Season Capacity Planning",
    challenge: "A UK e-commerce retailer experienced 4× normal contact volume in the two weeks around Black Friday and Christmas. Hiring temp agents proved costly and inefficient — by the time agents were productive, the peak had passed.",
    solution: "The WFM team built a 6-month capacity model with a phased hiring approach: a first cohort brought on 10 weeks before peak (allowing full ramp), a second cohort 6 weeks before, and a third cohort of flexible temp agents 3 weeks before as the volume pattern became clearer. The forecast used 3 years of historical seasonal data with event flags.",
    result: "Peak SL held above 78% (vs. 61% the prior year). Temp agent utilisation improved by 40% and average temp tenure increased from 3 weeks to 7 weeks due to the staggered onboarding approach.",
    icon: "🛍️",
    color: "border-orange-100",
    highlight: "bg-orange-50",
  },
  {
    tag: "Fintech",
    tagColor: "bg-purple-100 text-purple-700",
    title: "RTA-Led Intraday Recovery After System Outage",
    challenge: "A digital bank&apos;s mobile app experienced a 2-hour outage, immediately generating 3× the normal call volume as customers attempted to resolve transactions. The operation had no intraday recovery plan beyond calling agents from their days off.",
    solution: "The WFM team implemented a tiered intraday response framework: Level 1 (shrinkage pull-back: cancel breaks, defer training), Level 2 (overtime requests to current shift), Level 3 (voluntary recall of off-shift agents), Level 4 (defer non-voice workload from back-office teams). RTAs triggered each level based on real-time SL thresholds.",
    result: "SL recovered to 75% within 90 minutes of the framework activation (vs. dropping to 22% before the framework existed). The back-office defer tactic alone freed the equivalent of 15 FTE for voice queues.",
    icon: "💳",
    color: "border-purple-100",
    highlight: "bg-purple-50",
  },
  {
    tag: "Healthcare",
    tagColor: "bg-green-100 text-green-700",
    title: "Reducing Shrinkage in a Clinical Contact Centre",
    challenge: "A healthcare contact centre with 400 agents was running 38% total shrinkage — significantly above the 28% industry benchmark. Sick leave was particularly high at 8.2%, and training shrinkage was unplanned and untracked.",
    solution: "The WFM team conducted a shrinkage audit: categorised all time away from calls, benchmarked against industry, and identified that 4% of shrinkage was from unplanned, ad-hoc coaching sessions booked without WFM coordination. Training and coaching were migrated to a centralised request system. Sick leave was addressed through root cause analysis — a significant portion (2.5%) was Monday/Friday pattern leave, addressed through a flexible schedule option for top performers.",
    result: "Shrinkage reduced from 38% to 31% within 6 months. Gross headcount requirement dropped by 22 FTE at constant net staffing — equivalent to $1.8M annual cost saving on fully loaded costs.",
    icon: "🏥",
    color: "border-green-100",
    highlight: "bg-green-50",
  },
  {
    tag: "Telecom",
    tagColor: "bg-cyan-100 text-cyan-700",
    title: "Improving Forecast Accuracy with Seasonal Modelling",
    challenge: "A telecom provider&apos;s WFM team was producing weekly forecasts with an average MAPE of 18% — roughly double the industry target. The team was using a simple 4-week rolling average with no seasonality adjustment, causing systematic understaffing during bill cycle periods and overstaffing in mid-month troughs.",
    solution: "The forecasting analyst implemented a Holt-Winters model with intraweek and intramonth seasonal indices. Bill cycle patterns were modelled as a recurring event flag, adding a 15–25% uplift in the 3 days following statement dates. Forecast review became a weekly ritual with MAPE reported and root-cause analysed for every outlier above 12%.",
    result: "MAPE improved from 18% to 7.2% over three months. Schedule efficiency improved from 74% to 86% due to more accurate interval-level staffing requirements feeding the scheduling engine.",
    icon: "📡",
    color: "border-cyan-100",
    highlight: "bg-cyan-50",
  },
  {
    tag: "Remote / Work-from-Home",
    tagColor: "bg-indigo-100 text-indigo-700",
    title: "WFM for a Fully Remote Contact Centre",
    challenge: "After transitioning to 100% work-from-home, a financial services contact centre saw schedule adherence drop from 93% to 79% and shrinkage increase by 6 percentage points — largely from unverifiable breaks and login latency not captured in the ACD.",
    solution: "The WFM team implemented a revised adherence measurement framework adapted for remote work: ACD login time was used as the primary adherence marker, and a 5-minute grace period was built into start-of-shift expectations. Virtual team huddles were scheduled during forecast troughs (not over peaks). A recognition programme tied adherence scores to flexible schedule privileges — top adherence performers got first choice on shift bids.",
    result: "Adherence recovered to 89% within 10 weeks. Shrinkage returned to pre-WFH levels within one quarter. The flexible schedule privilege programme reduced voluntary attrition by 14% year-on-year.",
    icon: "🏠",
    color: "border-indigo-100",
    highlight: "bg-indigo-50",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero */}
      <div className="bg-[#0b1c2d] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-[#00b4ff]/20 text-[#00b4ff] text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Real-World
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">WFM Use Cases</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            See how WFM principles solve real contact centre challenges — from BPO scaling to remote team management and peak season planning.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {useCases.map((uc, i) => (
            <div key={i} className={`bg-white rounded-2xl border ${uc.color} overflow-hidden shadow-sm`}>
              <div className="p-7">
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-4xl flex-shrink-0">{uc.icon}</span>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${uc.tagColor} mb-2`}>
                      {uc.tag}
                    </span>
                    <h2 className="text-xl font-bold text-[#0b1c2d]">{uc.title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`rounded-xl p-4 ${uc.highlight}`}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">The Challenge</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{uc.challenge}</p>
                  </div>
                  <div className={`rounded-xl p-4 ${uc.highlight}`}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">The Solution</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{uc.solution}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-[#0b1c2d] text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#00b4ff] mb-2">The Result</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{uc.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Ready to apply these principles?</p>
          <p className="text-gray-400 text-sm mb-5">Start with the Erlang C guide or download a free capacity planning template.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/erlang" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">Erlang C Guide</Link>
            <Link href="/templates" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">Free Templates →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
