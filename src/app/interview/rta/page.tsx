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
