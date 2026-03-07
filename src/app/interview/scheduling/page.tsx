const qas = [
  {
    q: "What is workforce scheduling in a contact centre context?",
    a: "Workforce scheduling is the process of creating agent shift schedules that align staffing supply with forecasted demand across every interval of the day. The goal is to have the right number of agents with the right skills available at the right time — meeting SLA targets while minimizing labor cost. Schedulers balance business needs, contractual constraints, agent preferences, and compliance requirements.",
  },
  {
    q: "What is shrinkage and how do you calculate it?",
    a: "Shrinkage is the percentage of scheduled time that agents are not available to handle contacts. It includes both in-office shrinkage (breaks, meetings, training, coaching, offline tasks) and out-of-office shrinkage (planned leave, sick leave, no-shows). Formula: Shrinkage % = (Total Unavailable Hours / Total Scheduled Hours) × 100. A typical contact centre shrinkage is 25–35%. Schedulers must factor shrinkage into headcount requirements: Gross HC = Net HC / (1 − Shrinkage).",
  },
  {
    q: "How do you build an optimized schedule from a forecast?",
    a: "Step 1: Take the forecasted volume and AHT by interval (usually 30-min or 15-min). Step 2: Run Erlang C to calculate net agents required per interval at the target SL. Step 3: Add shrinkage to get gross staffing requirements. Step 4: Design shift patterns (start times, durations, breaks) to cover the demand curve. Step 5: Assign agents to shifts, aligning their contracted hours, skills, and preferences. Step 6: Validate — run the schedule against the staffing requirements to check over/understaffing intervals. Step 7: Publish and handle exception requests.",
  },
  {
    q: "What is the difference between bidding and assigned scheduling?",
    a: "In bid scheduling, agents rank their preferred shifts and are awarded them based on seniority or a lottery system. This increases agent satisfaction but requires significant admin effort. In assigned scheduling, the scheduler assigns shifts directly based purely on operational need. Most centres use a hybrid approach — defined shift patterns are offered, and agents bid within those options.",
  },
  {
    q: "How do you handle agent schedule change requests (shift swaps, time-off)?",
    a: "Shift swaps must be reviewed to ensure the swap does not create coverage gaps — both agents must have the same skills and the swap cannot leave any interval understaffed. For time-off requests, schedulers check the staffing plan for the requested date. If headcount is above minimum threshold, the leave can be approved. Many WFM tools (NICE, Verint) have self-service portals where agents submit requests automatically validated against coverage rules.",
  },
  {
    q: "What is a staffing requirement and how does it differ from headcount on the floor?",
    a: "A staffing requirement is the number of agents needed in a ready state per interval to meet SLA. Headcount on the floor is the total number of agents scheduled, which is higher because it accounts for shrinkage. Example: If Erlang says you need 20 agents ready at 10:00 AM and shrinkage is 25%, you must schedule 20 / (1 − 0.25) = ~27 agents for that interval.",
  },
  {
    q: "How do SLA and ASA relate to scheduling decisions?",
    a: "SLA (Service Level) defines what % of calls must be answered within X seconds — this is the primary scheduling target. ASA (Average Speed of Answer) is the average wait time, which reflects how close you are to that SL target. Schedulers use the SLA target as input to Erlang C. If the operation consistently misses SL, it signals understaffing in those intervals and the schedule needs to be adjusted for the next planning cycle.",
  },
  {
    q: "What are shift patterns and why do they matter?",
    a: "Shift patterns define the set of possible working schedules — start times, shift durations, break placements, and days off. Well-designed patterns closely follow the volume curve, maximizing coverage during peak hours and minimizing overstaffing during troughs. For example, a centre with a demand peak from 9 AM–6 PM might offer 8-hour shifts starting at 7 AM, 8 AM, 9 AM, and 10 AM to stagger coverage.",
  },
  {
    q: "What is multi-skill scheduling and what are its challenges?",
    a: "Multi-skill scheduling involves assigning agents who can handle multiple queue types (e.g., English voice + chat + email) to different queues throughout their shift. The benefit is higher flexibility — agents can flex between queues as demand shifts. The challenge is complexity: the scheduler must track which agents have which skills, ensure SLA is met across all queues, and avoid over-complicating the schedule. WFM tools with skill-based routing help automate this.",
  },
  {
    q: "How do you manage schedule adherence from a scheduler's perspective?",
    a: "The scheduler publishes schedules and expects agents to follow them. When adherence deviations occur, the RTA handles real-time response, but the scheduler tracks patterns over time. If an agent consistently starts late or takes long breaks, the scheduler can adjust their shift times, alert the supervisor, or recommend coaching. Schedulers also design break placements to support adherence — if breaks are too inconveniently placed, agents take them anyway, causing adherence issues.",
  },
  {
    q: "What is schedule efficiency and how do you measure it?",
    a: "Schedule efficiency measures how closely scheduled staffing matches required staffing across all intervals, minimizing waste. High efficiency = minimal overstaffing and understaffing. It is measured as: 1 − ((Net Scheduled Staff / Required Staff) × Scheduled Inflexibility). Practically, schedulers look at the percentage of intervals where staffing is within an acceptable band (e.g., ±5% of requirement). Poor efficiency is often caused by rigid shift patterns that do not flex with the demand curve.",
  },
  {
    q: "What is the impact of attrition on scheduling?",
    a: "Attrition means agents leave the team, reducing the available headcount pool. Schedulers must track actual headcount vs. planned and update schedules accordingly. High attrition creates coverage gaps, forces remaining agents into overtime, increases occupancy, and may cause SL failures. The scheduler works with the capacity planner to flag if attrition will cause the team to fall below required gross headcount, triggering a hiring request.",
  },
];

export default function SchedulingInterview() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#00b4ff]/10 text-[#00b4ff] text-sm font-semibold rounded-full mb-4">
            Interview Preparation
          </span>
          <h1 className="text-4xl font-bold text-[#0b1c2d] mb-3">Scheduler Interview Preparation</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Common WFM Scheduler interview questions with detailed, expert answers.
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
            <a href="/interview/rta" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
              ← RTA Interview
            </a>
            <a href="/interview/capacity" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              Capacity Planning →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
