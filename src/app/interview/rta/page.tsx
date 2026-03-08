const qas = [
  {
    q: "What is a Real-Time Analyst (RTA) and what are their core responsibilities?",
    a: "An RTA monitors intraday contact centre performance in real-time, ensuring staffing levels align with actual call volume. Core responsibilities include tracking queue metrics (SL, AHT, occupancy), managing agent adherence, making intraday adjustments (moving agents across queues, calling in overtime), escalating unexpected spikes, and communicating with floor supervisors to maintain SLA targets.",
  },
  {
    q: "What is intraday management and why is it critical?",
    a: "Intraday management is the process of monitoring and adjusting staffing in real-time throughout the workday to maintain service levels. It is critical because no forecast is perfect — volume spikes, unexpected absences, and AHT increases can cause SL to drop rapidly. RTAs use real-time data from WFM tools (e.g., NICE, Verint, Alvaria) to make adjustments before SL degrades significantly.",
  },
  {
    q: "How do you handle a sudden spike in call volume?",
    a: "Step 1: Identify the scale — compare actual vs. forecasted volume in the WFM tool. Step 2: Reduce aux time — pull agents out of non-critical activities (breaks if policy allows, training). Step 3: Move agents from lower-priority queues to the affected queue. Step 4: Notify the supervisor to authorize overtime or call in off-queue agents. Step 5: Communicate the situation to the ops team and forecast group. Step 6: Document the event for post-mortem analysis.",
  },
  {
    q: "What is schedule adherence and how is it calculated?",
    a: "Schedule adherence measures how closely an agent follows their assigned schedule — whether they are in the correct state at the correct time. Formula: (Adherent Time / Scheduled Time) × 100. Example: If an agent is scheduled for 480 minutes and is in the correct state for 450 minutes, adherence = 93.75%. Most operations target 90%+.",
  },
  {
    q: "What is the difference between schedule adherence and schedule conformance?",
    a: "Adherence checks whether the agent is doing the right activity at the right scheduled time — it is time-specific. Conformance checks whether the total minutes worked matches total scheduled minutes, regardless of when it happened. An agent could have high conformance (worked 8 hours total) but low adherence (took breaks at wrong times). RTAs use adherence for real-time monitoring and conformance for end-of-day reporting.",
  },
  {
    q: "What WFM tools have you worked with as an RTA?",
    a: "Common WFM platforms used by RTAs include NICE IEX, Verint Workforce Management, Alvaria (formerly Aspect), Genesys WFM, and Teleopti (Calabrio). RTAs use these tools to view real-time queue dashboards, agent state data, interval-level adherence reports, and to make schedule exceptions or adjustments.",
  },
  {
    q: "What is Erlang C and how does it relate to RTA work?",
    a: "Erlang C is a mathematical formula used to calculate the number of agents needed to handle a given call volume at a specified service level. While the RTA does not typically run Erlang C calculations in real-time, understanding it helps them contextualize why certain staffing levels are set. If Erlang says 20 agents are needed for 80/20 SL and only 15 are online, the RTA knows SL will drop and must act proactively.",
  },
  {
    q: "How do you prioritize which queues to staff when you have limited agents?",
    a: "Prioritization is driven by: (1) SLA thresholds — which queue is closest to breaching SL? (2) Contract requirements — queues with hard client SLA commitments take priority. (3) Volume weight — a high-volume queue dropping 5% affects more customers than a low-volume queue at 0%. Discuss with ops leadership if there is no clear protocol, and document the decision.",
  },
  {
    q: "What is the difference between AHT, ASA, and abandon rate? How do they connect?",
    a: "AHT (Average Handle Time) = avg time per interaction (talk + hold + ACW). ASA (Average Speed of Answer) = avg wait time in queue before answer. Abandon Rate = % of callers who hang up before being answered. They are connected: if AHT rises, agents take longer per call, queues build up, ASA increases, and frustrated callers abandon. RTAs watch all three together — a rising AHT often predicts an SL problem before it appears.",
  },
  {
    q: "How do you handle an agent who is repeatedly out of adherence?",
    a: "The RTA role is monitoring and real-time communication, not disciplinary action. Steps: (1) Alert the agent or their supervisor via chat or floor walk. (2) Log the adherence exception in the WFM tool. (3) If persistent, escalate to the WFM manager or ops supervisor for coaching. (4) Ensure the exception is documented for payroll and performance reporting. The RTA should not penalize directly — they report and escalate.",
  },
  {
    q: "What metrics do you report on at the end of an RTA shift?",
    a: "Typical end-of-shift RTA report includes: interval-level and daily SL performance, abandon rate, ASA, AHT variance vs. forecast, volume (offered vs. forecasted vs. handled), occupancy, adherence summary, any intraday actions taken (queue moves, OT authorizations), and any incidents or escalations. This is sent to the WFM manager, ops leadership, and often the client.",
  },
  {
    q: "What is occupancy and what is the ideal range?",
    a: "Occupancy = (Talk Time + Hold Time + ACW) / Total Logged-in Time × 100. It measures how much of an agent's time is spent handling contacts. The ideal range is typically 80–85%. Below 80% indicates overstaffing or idle time. Above 85–90% risks agent burnout and quality degradation. RTAs monitor occupancy to avoid both extremes, especially during understaffed intervals.",
  },
 {
    q: "What is Service Level (SL) and how is it typically calculated in contact centers?",
    a: "Service Level (SL) is a key performance indicator in contact centers that measures the percentage of incoming interactions (typically calls) that are answered within a predefined time threshold, ensuring customer satisfaction and operational efficiency. Common targets include 80% of calls answered within 20 seconds (80/20 SL) or 90/30, depending on industry standards like telecom (stricter) vs. retail (more lenient). The formula varies slightly by center but is generally: SL = (Number of calls answered within the threshold / (Total calls answered + Abandoned calls after the threshold)) × 100. Short abandons (e.g., <5-10 seconds) are often excluded to avoid penalizing for hang-ups unrelated to queue delays. Example calculation: In a 30-minute interval, 500 calls arrive; 380 are answered within 20 seconds, 80 are answered after 20 seconds, and 40 abandon after 20 seconds. SL = (380 / (380 + 80 + 40)) × 100 = (380 / 500) × 100 = 76%. If SL drops below target (e.g., <80%), RTAs intervene by reallocating agents or deferring breaks. RTAs track SL at 15- or 30-minute intervals using WFM dashboards, correlating it with volume forecasts to predict and prevent breaches, ultimately linking to customer retention metrics.",
  },
  {
    q: "Explain shrinkage and how it impacts intraday staffing.",
    a: "Shrinkage refers to the proportion of scheduled agent time that is unproductive or unavailable for core contact handling due to planned (e.g., scheduled breaks, lunches, training, meetings) and unplanned factors (e.g., sick calls, system outages, coaching sessions). It's a critical buffer in forecasting and staffing models, as ignoring it leads to undercoverage. The formula is: Shrinkage % = (Total non-productive time / Total scheduled time) × 100. Breakdown: Planned shrinkage (60-70% of total) is predictable and built into schedules; unplanned (30-40%) requires real-time monitoring. Example: A team of 50 agents scheduled for 8 hours (28,800 total minutes); 3,600 minutes in planned breaks/training (12.5%), plus 1,200 minutes unplanned absences (4.2%) → Total shrinkage = 15.7%. Impact on intraday: High shrinkage erodes effective headcount (e.g., 50 scheduled becomes ~42 effective), risking SL drops during peaks. RTAs mitigate by tracking real-time shrinkage via adherence reports, overstaffing by 1-2 agents per 10% shrinkage, or pulling from low-priority aux activities. In multi-site ops, shrinkage variances (e.g., higher in remote teams) inform cross-site reallocations. Post-shift, RTAs analyze shrinkage trends to refine future forecasts, potentially reducing costs by 2-5% through better planning.",
  },
  {
    q: "How do you calculate required staffing using basic Erlang principles in real time?",
    a: "Erlang C is a queuing theory model used to estimate the number of agents required to achieve a target SL given call volume, AHT, and desired wait times, accounting for random arrival patterns (Poisson distribution). RTAs don't run full simulations intraday but use simplified Erlang principles for quick assessments in WFM tools. Step 1: Calculate traffic intensity (Erlangs) = (Expected volume × AHT in hours) / Interval length in hours. Step 2: Apply Erlang C table/lookup for agents needed at target SL (e.g., 80/20). Rough rule: Agents ≈ Erlangs + (Erlangs × 0.2-0.3 buffer for queueing). Detailed example for a 30-minute (0.5-hour) interval: Forecast 250 calls, AHT 240 seconds (0.067 hours) → Total handle time = 250 × 0.067 = 16.75 Erlangs. For 80/20 SL, Erlang C might require ~22 agents (using online calculators or tool approximations; buffer ~30% for variability). If only 18 agents are staffed, expect ASA ~45s and SL ~70%—trigger action. RTAs compare this to current occupancy/adherence-adjusted headcount, escalating if gap >10%. This informs decisions like OT calls, ensuring cost-effective staffing without over-reliance on complex spreadsheets during live shifts.",
  },
  {
    q: "What is average occupancy and how do you interpret it intraday?",
    a: "Average occupancy measures the percentage of an agent's logged-in time spent actively handling contacts (talk time + hold time + after-call work/ACW), excluding idle, aux, or break states—it's a proxy for agent utilization and efficiency. Formula: Occupancy = [(Total talk time + Hold time + ACW) / (Total logged-in time - Scheduled non-work time)] × 100. It's calculated per agent, team, or interval in WFM systems. Example: In a 60-minute interval, an agent logs 55 minutes (excluding 5-min break), spends 42 minutes handling (35 talk + 3 hold + 4 ACW) → Occupancy = (42 / 55) × 100 ≈ 76.4%. Interpretation intraday: Target 80-85% balances productivity and burnout; <75% indicates overstaffing (e.g., idle agents costing $X/hour—calculate waste: 10 agents × 20% idle × $25/hr × 0.5hr = $250 loss). >90% signals understaffing, risking errors/attrition (e.g., quality scores drop 5-10% per 5% occupancy rise). RTAs interpret by queue/skill: High occupancy in low-volume queues may need reallocation; trends (e.g., post-lunch spikes) guide break staggering. In omnichannel setups, factor multi-tasking (e.g., chat concurrency boosts occupancy 10-15%). Monitoring prevents SL erosion while optimizing labor costs.",
  },
  {
    q: "Describe how you would respond to a sustained AHT increase of 20% above forecast.",
    a: "A 20% AHT spike (e.g., forecast 200s → actual 240s) amplifies queue buildup, as each agent handles ~17% fewer interactions per hour, directly threatening SL/ASA. Response protocol: Step 1: Validate in real-time dashboard (NICE/Verint)—is it isolated (e.g., one queue) or systemic (e.g., product outage)? Cross-check with sample call reviews. Step 2: Immediate levers: Reduce aux/breaks (e.g., defer 10% of team breaks, adding ~50 handle minutes/interval). Step 3: Reallocate: Shift 4-6 cross-trained agents from overstaffed queues (calculate impact: +5 agents × 60min × (1-0.2 AHT adj) = +240 effective minutes). Step 4: Escalate: Alert supervisors for voluntary OT (target 2-3 agents) and quality team for root cause (e.g., script updates if complex queries). Step 5: Forecast adjustment: If sustained >2 intervals, re-run Erlang with new AHT (+20%)—e.g., original 25 agents needed → now 30, triggering callbacks. Step 6: Monitor recovery (track ASA drop <10s) and document in EOD report (e.g., 'AHT variance caused 8% SL dip; actions recovered 92% target'). Long-term: Feedback to training for AHT coaching, potentially reducing future spikes by 10-15%.",
  },
  {
    q: "What is the impact of high abandon rate on SL, and how do you mitigate it?",
    a: "Abandon rate (% of callers hanging up before answer) directly erodes SL, as post-threshold abandons inflate the denominator in SL formulas, and signals poor customer experience (e.g., >3-5% correlates to 10-20% churn risk). Impact example: Target 80/20 SL, 500 calls: 400 answered <20s, 50 answered >20s, 50 abandons >20s → SL = 400/(400+50+50) = 72.7% (8.3% drop). High abandons also increase callbacks (+15-25% volume) and costs. Mitigation steps: 1) Threshold alerts: Trigger at >5% (dashboard flag). 2) Staffing priority: Divert agents to high-abandon queues (e.g., +3 agents reduces abandons 20-30% per Erlang). 3) AHT/ASA control: Coach on quick dispositions; if ASA >25s, freeze non-essentials. 4) Tech aids: Enable callbacks/virtual hold if ACD supports (recovers 40% abandons). 5) Root cause: Analyze patterns (e.g., IVR issues? → escalate IT). 6) Post-event: Report variance (e.g., '5.2% abandon spiked SL -3%; actions cut to 2.1%'). RTAs balance with occupancy to avoid overreaction, targeting <3% steady-state for optimal efficiency.",
  },
  {
    q: "How do you calculate forecast accuracy intraday, and why monitor it?",
    a: "Forecast accuracy quantifies how well predicted volume/AHT aligns with actuals, guiding intraday trust in schedules. Interval-level: Accuracy % = [1 - (|Actual - Forecast| / Forecast)] × 100 (absolute percentage error, APE). For multi-intervals, use MAPE = Average of APEs. Example: 30-min forecast 180 calls, actual 210 → APE = |30|/180 = 16.7%, Accuracy = 83.3%. If <80% for 3+ intervals, accuracy = 75%. Why monitor: Low accuracy (<85%) erodes SL (e.g., 15% over-forecast wastes $500/staff idle); under-forecast demands reactive OT (+50% premium). RTAs track via WFM variance reports, escalating to planners (e.g., 'PM spike due to promo—adjust tomorrow +10%'). Enables proactive re-forecasting (e.g., +20 calls/interval) and actions like pre-calling agents. In seasonal ops, correlates to historical data for mid-day tweaks, improving overall WFM ROI by 5-10%.",
  },
  {
    q: "Explain real-time adherence (RTA) vs. end-of-day adherence.",
    a: "Real-time adherence (often called 'shrink' or 'state adherence') monitors agent states (Available, AUX, Break) against schedule every 1-5 minutes, flagging deviations for immediate correction to maintain coverage. Formula per interval: (Time in scheduled state / Total scheduled time) × 100. End-of-day adherence aggregates total adherent minutes across shift, used for payroll/scorecards. Key difference: Real-time is proactive (e.g., chat 'Return to queue—SL at 75%'), preventing gaps; EOD is retrospective (e.g., 88% overall but 60% in peak hour). Example: Agent scheduled 480min, real-time: 420min adherent (87.5%), but EOD adjusts for exceptions → 85%. Targets: 88-92% real-time (stricter for peaks), 85% EOD. RTAs use tools like Verint for alerts, coaching low adherers (e.g., <80% → supervisor huddle), linking to occupancy (low adherence = 10-15% coverage loss). In hybrid work, real-time catches VPN lags faster than EOD.",
  },
  {
    q: "What steps do you take when multiple queues are at risk of breaching SL simultaneously?",
    a: "Multi-queue SL risks require triage to protect high-impact areas without total collapse. Step 1: Assess via dashboard—rank by severity (current SL, queue depth/oldest wait, volume weight, client SLA penalties). E.g., Queue A: SL 78%, depth 25, high-priority; Queue B: SL 82%, depth 10, low-volume. Step 2: Quantify impact—use quick Erlang: Gap agents = (Erlangs shortfall × 1.2 buffer). Step 3: Apply shared levers: Defer team-wide breaks (adds 5-10% capacity), cross-skill 20% of agents (e.g., 8 from B to A recovers 4% SL). Step 4: Escalate trade-offs—consult ops lead (e.g., 'Sacrifice B's ASA for A's SLA?'). Step 5: Execute & monitor—log moves in WFM, track 15-min recovery (e.g., A SL to 85%). Step 6: Debrief—EOD report rationale (e.g., 'Prioritized A: +$X revenue risk avoided'). Protocols vary (e.g., AI routing in Genesys auto-balances), but RTAs ensure documentation for audits, minimizing 5-10% potential SL variance.",
  },
  {
    q: "How is ASA calculated, and what is a typical target?",
    a: "Average Speed of Answer (ASA) is the mean wait time for answered calls, a leading indicator of queue health before SL/abandons manifest. Formula: ASA = (Total wait time for all answered calls / Number of answered calls), in seconds. Excludes abandons and IVR time. Example: 400 calls answered, cumulative wait 8,000 seconds → ASA = 20s. Typical targets: 15-25s (e.g., 20s for financial, 30s for support); >30s predicts 2x abandons. RTAs alert at +10s variance, correlating ASA to AHT (high AHT + rising ASA = vicious cycle: queues grow 15-20%/interval). Mitigation: Staffing boosts reduce ASA ~5s per +10% headcount. In reports, trend ASA hourly to forecast peaks, ensuring <target 90% of shift for compliance.",
  },
  {
    q: "What is concurrency in multi-channel environments, and how does it affect RTA decisions?",
    a: "Concurrency is the average number of simultaneous interactions an agent handles (e.g., 1 voice + 1 chat = 2.0), boosting capacity in omnichannel centers but risking quality if mismanaged. Measured as: Concurrency = Total active contacts / Logged-in agents. Example: 50 agents, 60 voice + 30 chats active → 1.8 concurrency. Affects RTA: Higher (1.5-2.0) increases effective occupancy 20-30% (e.g., +15% throughput), but AHT rises 10-20% from context-switching, eroding SL in voice-priority queues. Decisions: Cap at 1.5 during peaks (via ACD rules), monitor channel SL separately (e.g., chat ASA >2min → pause assignments). Example action: If voice SL dips, reduce chat concurrency to 1.0, freeing 10 agents' worth. RTAs balance via dashboards, targeting 1.2-1.8 for efficiency without burnout (quality drops >15% at 2.5+).",
  },
  {
    q: "How do you handle unexpected agent absences in the middle of a shift?",
    a: "Unexpected absences (e.g., illness, no-show) create immediate shortfalls, potentially dropping SL 5-10% per agent/hour. Protocol: Step 1: Quantify—check interval required (Erlang) vs. staffed (adj. for adherence): E.g., 40 needed, 35 staffed post-absence → 12.5% gap. Step 2: Internal fills: Pull 1-2 from training/aux (add 60-120 handle min), re-route low-priority. Step 3: External: Voluntary OT (email blast, +$Y premium), or callbacks (if <2hr notice). Step 4: Escalate if >3 agents—ops approval for mandatory. Step 5: Update WFM exceptions, track adherence impact. Step 6: EOD analysis (e.g., '2 absences cost 3% SL; OT recovered 95%'). Prevent via real-time shrinkage tracking; in large ops, maintain 5% float pool.",
  },
  {
    q: "What is the role of root cause analysis in RTA post-incident review?",
    a: "Root cause analysis (RCA) post-SL breach or spike dissects 'why' beyond symptoms, using tools like 5 Whys or fishbone diagrams to inform preventive actions. RTA role: Document timeline (e.g., volume +15% at 2pm, adherence -10%, response delay 15min), metrics variance (AHT +12%), and levers used/outcomes. Example: Breach to 65% SL—RCA: Why? Queue depth 40; Why? AHT spike; Why? New policy queries; Solution: Quick-reference guide, reducing future AHT 8%. Share with WFM/ops/clients via report (e.g., 'Incident cost $Z; RCA yields +5% accuracy'). Builds protocols (e.g., auto-alerts), cutting recurrence 20-30%, enhancing RTA credibility.",
  },
  {
    q: "Explain staffed time vs. required time in intraday reporting.",
    a: "Required time is the handle minutes needed for target SL (from forecast/Erlang: Volume × AHT). Staffed time is actual available capacity (Headcount × Interval min × Adherence % × (1 - Shrinkage %)). Variance = Staffed - Required; negative flags risk. Example: 30-min interval, forecast 300 calls × 200s AHT = 10,000 handle sec (2.78 hours) required. 25 agents × 30min × 90% adherence × 85% (post-shrink) = ~9,500 sec staffed → -500 sec gap (SL risk ~5%). RTAs report hourly variances, actions (e.g., +2 OT = +3,600 sec recovery), linking to costs (e.g., gap = 2 extra abandons/$W loss). Ensures accountability in EOD summaries.",
  },
  {
    q: "How do you use queue depth and oldest call waiting in real-time decisions?",
    a: "Queue depth (callers waiting) and oldest call waiting (OCW, longest wait time) are proactive metrics—depth predicts volume pressure, OCW flags equity issues. Thresholds: Depth >15-20, OCW >40-60s → alert. Use: If depth 25/OCW 90s, prioritize over SL (which lags). Action: +Agents (reduces depth 20-30%/agent), or VIP routing. Example: Depth 30 → Erlang est. +4 agents needed; act pre-SL drop. Correlate to ASA (depth × AHT/agents ≈ wait). In reports, trends inform forecasting (e.g., recurring 3pm depth spikes → +staffing). Prevents 10-15% abandon uplift.",
  },
  {
    q: "What is the typical target for agent utilization, and how does it differ from occupancy?",
    a: "Agent utilization = (Total productive time / Total paid/shift time) × 100, including all logged activities post-shrinkage (handle + some aux). Differs from occupancy (handle-only / logged time, excluding breaks). Targets: Utilization 75-82% (accounts shrinkage), occupancy 80-85%. Example: 480min shift, 360min paid productive → 75% util; within paid, 288min handle → 80% occupancy. RTAs track: Low util = over-scheduling (cost waste); high = burnout. Use for coaching (e.g., aux optimization +5% util). In EOD, variance explains SL (low util = idle gaps).",
  },
  {
    q: "Describe a scenario where you had to recommend schedule exceptions intraday.",
    a: "Scenario: Mid-morning volume +25% over forecast due to outage, creating 6-agent shortfall 11am-1pm (SL 72%). Recommendation: 1) Exceptions: Extend 10 agents' lunches to 12pm (shifts +300 handle min). 2) Early outs for morning overstaff (saves cost). 3) OT for 5 (adds +600 min, 1.5x pay). Impact calc: Original gap 21,600 handle sec; exceptions +9,000 sec → 58% recovery, SL to 84%. Escalated to manager, documented (outcome: No breach). Builds flexibility in WFM rules.",
  },
  {
    q: "How do you ensure accurate real-time data in your monitoring tools?",
    a: "Data accuracy is foundational—errors amplify bad decisions (e.g., ghost agents inflate staffed 10%). Steps: 1) Integration checks: Sync ACD (e.g., Avaya) with WFM every 1-2min; flag lags >5min. 2) Anomaly scans: Sudden 0% adherence? Verify via spot-checks/calls. 3) Dual sources: Cross-reference telephony logs with agent self-reports. 4) IT escalation: Log discrepancies (e.g., 'Verint delay 3min—caused late OT call'). 5) Audits: Daily sample 5% intervals for variance <2%. In hybrid, VPN metrics ensure remote accuracy. Prevents $X in misguided actions.",
  },
  {
    q: "What metrics would you include in a real-time alert system setup?",
    a: "Alert system thresholds for proactive intervention: 1) SL <78% (2 intervals) → staffing boost. 2) ASA >28s → queue priority. 3) Abandon >4% → callback mode. 4) AHT +18% vs. forecast → quality alert. 5) Adherence <82% team → chat blast. 6) Depth >25/OCW >50s → reallocate. 7) Occupancy >92%/<72% → balance breaks. 8) Shrinkage +5% unplanned → OT prep. Customize per queue (e.g., VIP SL 90%); delivery via Slack/email. Reduces response time 50%, SL variance <3%.",
  },
  {
    q: "How does real-time management contribute to overall contact center cost efficiency?",
    a: "RTA optimizes labor (60-70% of costs) by averting waste: Prevents overstaffing (e.g., 5 idle agents/hr × $25 = $625 loss) via occupancy tweaks; understaffing via preemptive moves (cuts OT 30-50%, abandons -20% callbacks). Example: Intraday actions recover 5% SL, saving $10K/month in churn. Balances SL (revenue guard) with util (80% target = 2-4% cost cut). ROI: 3-6x via reduced premiums/idle. Reports quantify (e.g., 'Q1: $50K saved vs. baseline').",
  },  

];

export default function RtaInterview() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#00b4ff]/10 text-[#00b4ff] text-sm font-semibold rounded-full mb-4">
            Interview Preparation
          </span>
          <h1 className="text-4xl font-bold text-[#0b1c2d] mb-3">RTA Interview Preparation</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Common Real-Time Analyst interview questions with detailed, expert answers.
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
          <p className="font-semibold mb-2">Want more WFM resources?</p>
          <p className="text-gray-400 text-sm mb-4">Check out other interview guides or the WFM Metrics reference.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/terminology/wfm-metrics" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              WFM Metrics
            </a>
            <a href="/interview/scheduling" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
              Scheduler Interview →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
