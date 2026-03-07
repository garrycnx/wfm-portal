// WFM Knowledge Base — powers the chatbot

export interface ChatResponse {
  text: string;
  followUps?: string[];
}

// ── Erlang C calculation ────────────────────────────────────────────────────
function erlangC(N: number, A: number): number {
  if (N <= A || A <= 0 || N <= 0) return 1;
  try {
    // Use log-space arithmetic to avoid overflow for large N
    const logA = Math.log(A);
    const logTermN = N * logA - logGamma(N + 1);
    const termN = Math.exp(logTermN);
    const erlangNumerator = termN * (N / (N - A));

    // Poisson CDF sum: P(0..N-1) = e^(-A) * sum(A^k/k!) = poissonCDF(N-1, A)
    const poissonSum = poissonCDF(N - 1, A);
    const denominator = poissonSum * Math.exp(A) + erlangNumerator;

    if (denominator === 0) return 1;
    return erlangNumerator / denominator;
  } catch {
    return 1;
  }
}

function logGamma(n: number): number {
  // Stirling approximation for log(Gamma(n)) = log((n-1)!)
  if (n <= 1) return 0;
  return (n - 0.5) * Math.log(n - 0.5) - (n - 0.5) + 0.5 * Math.log(2 * Math.PI);
}

function poissonCDF(k: number, lambda: number): number {
  // P(X <= k) for Poisson(lambda)
  let sum = 0;
  let term = Math.exp(-lambda);
  for (let i = 0; i <= k; i++) {
    sum += term;
    term *= lambda / (i + 1);
    if (term < 1e-15) break;
  }
  return Math.min(sum, 1);
}

function serviceLevel(N: number, A: number, targetSeconds: number, ahtSeconds: number): number {
  const C = erlangC(N, A);
  return 1 - C * Math.exp(-(N - A) * (targetSeconds / ahtSeconds));
}

function findMinAgents(A: number, targetSL: number, targetSeconds: number, ahtSeconds: number): number {
  let N = Math.ceil(A) + 1;
  for (let i = 0; i < 100; i++) {
    if (serviceLevel(N, A, targetSeconds, ahtSeconds) >= targetSL) return N;
    N++;
  }
  return N;
}

// ── Parse numbers from message ────────────────────────────────────────────
function parseNumbers(msg: string): number[] {
  const matches = msg.match(/\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

// ── Non-WFM topics to block ─────────────────────────────────────────────────
const NON_WFM_KEYWORDS = [
  "weather","temperature","rain","snow","climate","prime minister","president","minister",
  "election","politics","football","cricket","sports","movie","film","song","music","lyrics",
  "recipe","food","restaurant","hotel","flight","travel","visa","passport","stock","share",
  "bitcoin","crypto","invest","covid","vaccine","medicine","hospital","doctor","disease",
  "joke","meme","news","celebrity","actor","actress","country","city","population","history",
  "geography","math","physics","chemistry","biology","science","capital of","who is","what is the",
  "how old is","birthday","girlfriend","boyfriend","wife","husband"
];

function isNonWFM(msg: string): boolean {
  const lower = msg.toLowerCase();
  return NON_WFM_KEYWORDS.some(kw => lower.includes(kw));
}

// ── WFM Knowledge base ──────────────────────────────────────────────────────
const WFM_QA: Array<{ patterns: string[]; response: string; followUps?: string[] }> = [
  {
    patterns: ["what is erlang c", "erlang c formula", "erlang c explained", "erlang c definition"],
    response: `**Erlang C** is the mathematical formula used to calculate the probability that a caller will have to wait before being served in a contact centre.\n\n**Formula:**\n> C(N,A) = [Aᴺ/N! × N/(N-A)] ÷ [Σ(k=0→N-1)(Aᵏ/k!) + Aᴺ/N! × N/(N-A)]\n\nWhere:\n- **N** = number of agents\n- **A** = traffic intensity in Erlangs\n\nOnce you have C(N,A), the **Service Level** is:\n> SL = 1 - C(N,A) × e^(-(N-A) × target_time/AHT)\n\nWant me to **calculate staffing** for your specific scenario? Tell me your call volume, AHT and target SL.`,
    followUps: ["Calculate staffing for 200 calls, AHT 4 min, 80% in 20s", "What is traffic intensity?", "What are Erlang C limitations?"]
  },
  {
    patterns: ["traffic intensity", "what is erlang a", "erlangs", "traffic load"],
    response: `**Traffic Intensity (A)** — also called Erlangs — measures the average workload on the system.\n\n**Formula:**\n> A = (Call Volume × AHT in seconds) ÷ Interval Length in seconds\n\n**Example** — 200 calls in 30 min, AHT = 240 sec:\n> A = (200 × 240) ÷ 1800 = **26.7 Erlangs**\n\nThis means you need **at minimum 27 agents** just to handle the volume — but more to achieve an acceptable SL.\n\n*Rule of thumb: Traffic intensity must always be less than your agent count, otherwise the queue grows infinitely.*`,
    followUps: ["How do I calculate Erlang C?", "What is occupancy?", "Calculate staffing for 200 calls, AHT 4 min"]
  },
  {
    patterns: ["what is shrinkage", "shrinkage formula", "shrinkage calculation", "how to calculate shrinkage", "shrinkage definition", "shrinkage %"],
    response: `**Shrinkage** is the percentage of paid working time when agents are NOT available to handle contacts.\n\n**Formula:**\n> Shrinkage % = (Unavailable Hours ÷ Scheduled Hours) × 100\n\n**Two types:**\n- 🔵 **Internal** — breaks, training, meetings, coaching, system issues\n- 🟠 **External** — annual leave, sick leave, no-shows, public holidays\n\n**Industry benchmark:** 25–35% total shrinkage\n\n**Gross HC Formula:**\n> Gross HC = Net HC ÷ (1 − Shrinkage%)\n\n**Example:** 30 net agents, 25% shrinkage → 30 ÷ 0.75 = **40 agents to schedule**`,
    followUps: ["What is a good shrinkage target?", "How do I reduce shrinkage?", "What is gross vs net HC?"]
  },
  {
    patterns: ["shrinkage benchmark", "good shrinkage", "normal shrinkage", "typical shrinkage"],
    response: `**Shrinkage Industry Benchmarks:**\n\n| Component | Typical Range |\n|-----------|---------------|\n| Breaks & Lunch | 8–12% |\n| Training & Coaching | 3–6% |\n| Meetings & Admin | 2–4% |\n| Annual Leave | 4–6% |\n| Sick Leave | 2–5% |\n| No-shows / Lateness | 1–3% |\n| **Total Shrinkage** | **20–35%** |\n\n**25%** is the most common industry target. Anything above 35% suggests operational issues worth investigating — particularly sick leave patterns (Monday/Friday spikes) and unplanned training.`,
    followUps: ["How do I reduce shrinkage?", "What causes high sick leave?"]
  },
  {
    patterns: ["reduce shrinkage", "lower shrinkage", "improve shrinkage"],
    response: `**How to reduce shrinkage without harming agents:**\n\n1. **Stagger breaks** across intervals — avoid clustering all breaks at :00 or :30\n2. **Schedule training in troughs** — use low-volume periods for L&D\n3. **Track Monday/Friday sick leave** — spikes often signal engagement issues, not illness\n4. **Automate ACW** — CRM automation reduces After-Call Work\n5. **Implement leave management thresholds** — auto-approve leave when coverage is adequate, auto-decline when below threshold\n6. **Flexible scheduling** — giving agents schedule input reduces unplanned absence\n\n*Target: reduce total shrinkage by 3–5% over 6 months through staggered breaks and better training scheduling alone.*`,
    followUps: ["What is schedule adherence?", "How does shrinkage affect staffing?"]
  },
  {
    patterns: ["service level", "what is sl", "service level definition", "sl formula", "80 20 rule", "service level target"],
    response: `**Service Level (SL)** = the percentage of contacts answered within a target time threshold.\n\n**Most common standard:** 80% of calls answered within 20 seconds (written as "80/20")\n\n**Formula:**\n> SL% = (Calls answered within threshold ÷ Total calls offered) × 100\n\n**From Erlang C:**\n> SL = 1 - C(N,A) × e^(-(N-A) × target_sec/AHT)\n\n**Key insight:** Adding just 1 agent can increase SL by 5–15% when you're near the "tipping point" — where traffic intensity is close to agent count.`,
    followUps: ["What is Average Speed of Answer?", "What is the difference between SL and ASA?", "How many agents for 80% SL?"]
  },
  {
    patterns: ["average speed of answer", "asa", "average wait time", "average handle time"],
    response: `**Average Speed of Answer (ASA)** = the average time callers wait before being answered (includes those who wait 0 seconds).\n\n**Formula:**\n> ASA = Erlang C(N,A) × AHT ÷ (N - A)\n\n**Key difference from SL:**\n- **SL** measures the % answered within a threshold\n- **ASA** measures the average wait across ALL calls\n\n**Important:** ASA can be misleading. A low ASA can mask a high % of long waits. For example, if 50% of calls are instant and 50% wait 60 sec, ASA = 30 sec — but SL could still be poor.\n\n*Most contact centres use SL as the primary metric, with ASA as a secondary indicator.*`,
    followUps: ["What is Erlang C?", "What is a good ASA target?", "What is occupancy?"]
  },
  {
    patterns: ["occupancy", "agent occupancy", "what is occupancy", "occupancy formula", "occupancy rate"],
    response: `**Occupancy** = the percentage of time agents are active (on calls or in ACW) vs. available.\n\n**Formula:**\n> Occupancy = Traffic Intensity (A) ÷ Number of Agents (N)\n\n**Or from actuals:**\n> Occupancy = (AHT × Calls Handled) ÷ (Agents × Interval in seconds)\n\n**Industry benchmarks:**\n- **< 75%** — overstaffed (wasted cost)\n- **75–85%** — optimal (SL achievable, agent wellbeing maintained)\n- **85–90%** — high (SL risk, burnout risk)\n- **> 90%** — unsustainable (queue builds, attrition increases)\n\n*High occupancy feels efficient but leads to longer queues, higher abandon rates, and faster agent burnout.*`,
    followUps: ["What is the relationship between occupancy and SL?", "What is AHT?", "How do I calculate traffic intensity?"]
  },
  {
    patterns: ["aht", "average handling time", "what is aht", "aht formula", "handle time"],
    response: `**Average Handling Time (AHT)** = the average time per contact, including talk time and wrap-up.\n\n**Formula:**\n> AHT = Talk Time + After-Call Work (ACW)\n\n**AHT impact on staffing:**\n- A 10% increase in AHT ≈ 10% increase in traffic intensity ≈ 10% more agents needed\n- AHT reduction is one of the highest-leverage actions in WFM\n\n**AHT by channel (typical):**\n| Channel | Typical AHT |\n|---------|-------------|\n| Inbound Voice | 240–360 sec |\n| Live Chat | 600–900 sec |\n| Email | 5–8 min |\n| Social Media | 3–5 min |\n\n*Note: AHT should be measured per skill/queue, not as a single site average — mixing complex and simple calls masks important patterns.*`,
    followUps: ["How does AHT affect staffing?", "What is occupancy?", "How do I forecast call volume?"]
  },
  {
    patterns: ["forecast", "forecasting", "volume forecast", "how to forecast", "wma", "weighted moving average", "forecast accuracy", "mape"],
    response: `**WFM Forecasting** converts historical volume patterns into future staffing requirements.\n\n**Common methods:**\n1. **Weighted Moving Average (WMA)** — recent weeks weighted more heavily\n   > Forecast = (W1 × Week-1) + (W2 × Week-2) + (W3 × Week-3)\n2. **Holt-Winters** — handles trend AND seasonality\n3. **ARIMA** — statistical time-series (needs 2+ years data)\n4. **ML models** — XGBoost, LSTM for large operations\n\n**Accuracy metrics:**\n- **MAPE** (Mean Absolute % Error): Target < 5% weekly\n- **MAE** (Mean Absolute Error): Expressed in calls\n\n**Seasonality adjustments:**\n- Intraday profile (peak hours)\n- Intraweek profile (Mon/Fri higher)\n- Intra-year (seasonal peaks, campaigns, bill cycles)`,
    followUps: ["What is MAPE?", "What is a seasonal index?", "How does forecast accuracy affect staffing?"]
  },
  {
    patterns: ["mape", "forecast error", "forecast accuracy metric"],
    response: `**MAPE (Mean Absolute Percentage Error)** is the standard accuracy metric for WFM forecasting.\n\n**Formula:**\n> MAPE = (1/n) × Σ |Actual - Forecast| / Actual × 100\n\n**Targets:**\n| Horizon | Good | Acceptable |\n|---------|------|------------|\n| Monthly | < 3% | < 7% |\n| Weekly | < 5% | < 10% |\n| Daily | < 8% | < 15% |\n| 30-min interval | < 10% | < 20% |\n\n**MAE (Mean Absolute Error)** = expressed in actual calls (e.g., "off by 50 calls on average") — useful when actual volumes can be zero.\n\n*Tip: Track MAPE by day of week — a model that is accurate on average can hide systematic errors on specific days.*`,
    followUps: ["What causes poor forecast accuracy?", "What is WMA?", "How does forecast accuracy affect SL?"]
  },
  {
    patterns: ["schedule efficiency", "scheduling efficiency", "what is schedule efficiency"],
    response: `**Schedule Efficiency** measures how closely your scheduled staffing matches your actual staffing requirement across every interval.\n\n**Formula:**\n> Efficiency = 1 - (Total Deviation Hours ÷ Total Requirement Hours)\n\n**Benchmarks:**\n- **< 70%** — Poor (large over/understaffing)\n- **70–80%** — Average\n- **80–90%** — Good\n- **> 90%** — World-class\n\n**How to improve:**\n1. Add more shift start time options (every 30 min)\n2. Stagger breaks across 15-min increments\n3. Use part-time shifts for peak shoulders\n4. Analyse demand curve shape before designing shifts`,
    followUps: ["What causes poor schedule efficiency?", "How do I design better shifts?", "What is schedule adherence?"]
  },
  {
    patterns: ["schedule adherence", "adherence", "what is adherence", "adherence formula"],
    response: `**Schedule Adherence** = the percentage of time agents are doing what their schedule requires them to be doing.\n\n**Formula:**\n> Adherence % = (Time in Adherence ÷ Scheduled Time) × 100\n\n**Example:** Agent scheduled for 8 hrs, spends 7.2 hrs on-task → Adherence = 90%\n\n**Target:** 90–95% is the industry standard\n\n**Common causes of poor adherence:**\n- Late log-ins / early log-outs\n- Extended breaks\n- Unplanned off-phone time\n- System issues\n\n*Important distinction: Adherence ≠ Schedule Efficiency. Agents can perfectly follow a badly designed schedule. Fix the schedule design FIRST, then enforce adherence.*`,
    followUps: ["What is schedule efficiency?", "What is an RTA analyst?", "How do I improve adherence?"]
  },
  {
    patterns: ["what is rta", "rta analyst", "real time analyst", "intraday management", "rta role"],
    response: `**RTA (Real-Time Analyst)** monitors live operations and adjusts staffing in real-time to protect SLA.\n\n**Key responsibilities:**\n- Monitor call queues, SL, and agent availability every 15–30 min\n- Compare actual vs. forecast volume\n- Manage intraday shrinkage (pull back breaks, trigger OT)\n- Reforecast end-of-day SL based on current trend\n- Escalate when SL recovery is beyond intraday tools\n\n**Intraday Response Framework:**\n| Level | SL Trigger | Action |\n|-------|-----------|--------|\n| 1 | 75–79% | Pull breaks, defer training |\n| 2 | 65–74% | Offer overtime |\n| 3 | 50–64% | Recall off-shift agents |\n| 4 | < 50% | Escalate to leadership |\n\n*RTA is typically the entry-level WFM role.*`,
    followUps: ["What is the WFM career path?", "What is schedule adherence?", "What tools do RTAs use?"]
  },
  {
    patterns: ["capacity planning", "what is capacity planning", "how to do capacity planning", "headcount planning"],
    response: `**Capacity Planning** projects the headcount needed to meet future demand, accounting for attrition, ramp time, and training.\n\n**Key formula:**\n> Required Gross HC = Net HC from Erlang C ÷ (1 - Shrinkage%)\n\n**Capacity model components:**\n1. **Demand forecast** → staffing requirement (Erlang C)\n2. **Attrition modelling** → expected monthly leavers\n3. **Hire plan** → when to hire to offset attrition + growth\n4. **Ramp period** → new hires not fully productive for 4–8 weeks\n5. **Training throughput** → how many can be onboarded per month\n\n**3 scenarios:** Base | Upside | Downside\n\n*A good capacity model flags hiring decisions 10–12 weeks in advance (ramp + training lead time).*`,
    followUps: ["What is shrinkage?", "How do I calculate headcount?", "What is attrition?"]
  },
  {
    patterns: ["attrition", "what is attrition", "attrition rate", "agent turnover"],
    response: `**Attrition (Turnover)** = the percentage of agents who leave in a given period.\n\n**Formula:**\n> Monthly Attrition = (Leavers in Month ÷ Opening HC) × 100\n> Annual Attrition = 1 - (1 - Monthly Rate)^12\n\n**Industry benchmarks:**\n- BPO/Outsourcing: 30–60% annually\n- Financial Services: 15–25%\n- Retail/E-commerce: 25–40%\n- Healthcare: 20–30%\n\n**Impact on capacity:** At 30% annual attrition in a 100-agent centre, you need to hire 30 replacements just to stay flat — before any growth.\n\n**Key drivers:** poor scheduling flexibility, low pay, lack of career path, high occupancy (burnout).`,
    followUps: ["How does attrition affect capacity planning?", "What is the WFM career path?", "How do I build a capacity model?"]
  },
  {
    patterns: ["wfm career", "career in wfm", "wfm jobs", "wfm roles", "wfm salary", "wfm career path"],
    response: `**WFM Career Ladder:**\n\n| Role | Salary Range | Focus |\n|------|-------------|-------|\n| Real-Time Analyst | $35–55K | Live monitoring, adherence |\n| WFM Analyst | $45–70K | Forecasting, scheduling |\n| Senior WFM Analyst | $60–90K | Capacity planning, multi-skill |\n| WFM Manager | $70–100K | Team leadership, strategy |\n| WFM Director | $100–160K+ | Enterprise planning, P&L |\n\n**Skills that accelerate your career:**\n- Erlang C fluency (can explain it to non-technical stakeholders)\n- Advanced forecasting (WMA, Holt-Winters, ARIMA)\n- WFM platform expertise (NICE IEX, Verint, Genesys)\n- Data skills (Excel, SQL, Python)\n\nCheck out the full **WFM Career Guide** at /resources/wfm-career-guide`,
    followUps: ["What certifications are useful in WFM?", "What is an RTA analyst?", "What skills does a WFM analyst need?"]
  },
  {
    patterns: ["wfm metrics", "key wfm metrics", "wfm kpis", "contact centre metrics", "call centre metrics"],
    response: `**Key WFM Metrics:**\n\n| Metric | Formula | Target |\n|--------|---------|--------|\n| Service Level | Calls in SL ÷ Total Calls | 80% in 20s |\n| ASA | Erlang C × AHT ÷ (N-A) | < 30 sec |\n| Occupancy | A ÷ N | 75–85% |\n| Shrinkage | Unavail hrs ÷ Sched hrs | 25–30% |\n| Adherence | In-adherence time ÷ Scheduled | 90–95% |\n| Forecast MAPE | |Actual-Forecast|/Actual | < 5% weekly |\n| Schedule Efficiency | 1 - Deviation ÷ Requirement | > 85% |\n\nFor full definitions, visit **/terminology/wfm-metrics** on this site.`,
    followUps: ["What is service level?", "What is occupancy?", "What is shrinkage?"]
  },
  {
    patterns: ["abandon rate", "call abandon", "abandonment", "abandoned calls"],
    response: `**Abandon Rate** = the percentage of callers who hang up before being answered.\n\n**Formula:**\n> Abandon Rate = (Abandoned Calls ÷ Total Calls Offered) × 100\n\n**Industry benchmarks:**\n- < 5% — Good\n- 5–8% — Acceptable\n- > 8% — Indicates staffing or SL issues\n\n**Erlang C limitation:** Erlang C assumes NO abandons (infinite patience). In reality, abandons mean:\n- Your actual SL may be slightly better than Erlang C predicts at high occupancy (abandoned callers "leave the queue")\n- But abandon rate itself is a negative CX indicator\n\n*Use Erlang A (not C) if your abandon rate exceeds 10–15%.*`,
    followUps: ["What is Erlang C?", "What is service level?", "What is the difference between Erlang C and Erlang A?"]
  },
  {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "start", "help"],
    response: `👋 **Hello! I'm the WFM Clubs Assistant.**\n\nI can help you with any **Workforce Management** question — calculations, formulas, concepts, or career guidance.\n\n**Try asking me:**\n- "Calculate staffing for 200 calls, 4 min AHT, 80% SL in 20 seconds"\n- "What is Erlang C?"\n- "How do I calculate shrinkage?"\n- "What is a good occupancy target?"\n- "Explain the WFM career path"\n\n*Note: I'm only trained on WFM topics. For anything else, my developer Gurpreet Singh has kept me focused!* 😊`,
    followUps: ["What is Erlang C?", "Calculate staffing for 200 calls, AHT 4 min, 80% SL in 20s", "What is shrinkage?"]
  },
  {
    patterns: ["thank", "thanks", "great", "perfect", "awesome", "helpful", "nice", "good job", "brilliant"],
    response: `You're welcome! 😊 Happy to help with any other WFM questions.\n\n*Remember: you can also check out the **Erlang C Deep Dive** at /erlang, or the **WFM Knowledge Base** at /resources for detailed guides.*`,
    followUps: ["What is service level?", "How do I reduce shrinkage?", "What is the WFM career path?"]
  },
];

// ── Erlang C calculation handler ─────────────────────────────────────────
function handleErlangCalculation(msg: string): ChatResponse | null {
  const lower = msg.toLowerCase();
  const hasCalcIntent = /(\d+)\s*(calls?|contacts?|volumes?)/.test(lower) ||
    /(calculate|how many|agents?|staff|need|require)/.test(lower) ||
    /\d+.*aht|aht.*\d+/.test(lower);

  if (!hasCalcIntent) return null;

  const nums = parseNumbers(msg);
  if (nums.length < 2) return null;

  // Try to extract: volume, AHT (minutes or seconds), target SL, target time
  let volume = 0, ahtSeconds = 0, targetSL = 0.80, targetSeconds = 20, intervalMins = 30, shrinkage = 0.25;

  // Parse volume (largest number that looks like call count, typically 50–5000)
  const callMatch = msg.match(/(\d+)\s*(calls?|contacts?|volumes?|vol)/i);
  if (callMatch) volume = parseInt(callMatch[1]);

  // Parse AHT (look for "X min" or "X seconds" or "AHT X")
  const ahtMinMatch = msg.match(/(\d+\.?\d*)\s*(min|minutes?)\s*(aht)?/i) ||
    msg.match(/aht\s*[=:of]?\s*(\d+\.?\d*)\s*(min|minutes?)/i);
  const ahtSecMatch = msg.match(/(\d+)\s*(sec|seconds?)\s*(aht)?/i) ||
    msg.match(/aht\s*[=:of]?\s*(\d+)\s*(sec|seconds?)/i);

  if (ahtMinMatch) ahtSeconds = parseFloat(ahtMinMatch[1]) * 60;
  else if (ahtSecMatch) ahtSeconds = parseInt(ahtSecMatch[1]);

  // Parse target SL e.g. "80%" or "80/20"
  const slMatch = msg.match(/(\d+)\s*%\s*(sl|service)/i) || msg.match(/(\d+)\s*\/\s*\d+/);
  if (slMatch) targetSL = parseInt(slMatch[1]) / 100;

  // Parse target answer time e.g. "in 20 seconds" or "20s"
  const timeMatch = msg.match(/in\s*(\d+)\s*(sec|s\b)/i) || msg.match(/(\d+)\s*(sec|s)\s*threshold/i);
  if (timeMatch) targetSeconds = parseInt(timeMatch[1]);

  // Parse shrinkage e.g. "25% shrinkage"
  const shrkMatch = msg.match(/(\d+)\s*%\s*shrinkage/i);
  if (shrkMatch) shrinkage = parseInt(shrkMatch[1]) / 100;

  // Fallback: assign numbers by position if we couldn't parse
  if (!volume && nums.length >= 1) volume = nums[0];
  if (!ahtSeconds && nums.length >= 2) ahtSeconds = nums[1] > 30 ? nums[1] : nums[1] * 60;

  if (!volume || !ahtSeconds) return null;

  // Calculate
  const A = (volume * ahtSeconds) / (intervalMins * 60);
  const netAgents = findMinAgents(A, targetSL, targetSeconds, ahtSeconds);
  const SL = serviceLevel(netAgents, A, targetSeconds, ahtSeconds) * 100;
  const occupancy = (A / netAgents) * 100;
  const grossHC = Math.ceil(netAgents / (1 - shrinkage));
  const erlangCVal = erlangC(netAgents, A);
  const asa = erlangCVal > 0 && netAgents > A ? Math.round(erlangCVal * ahtSeconds / (netAgents - A)) : 0;

  return {
    text: `**Erlang C Staffing Calculation:**\n\n**Inputs used:**\n- Volume: ${volume} calls / ${intervalMins} min\n- AHT: ${Math.round(ahtSeconds)}s (${(ahtSeconds/60).toFixed(1)} min)\n- Target: ${Math.round(targetSL*100)}% answered in ${targetSeconds}s\n- Shrinkage: ${Math.round(shrinkage*100)}%\n\n**Results:**\n- Traffic Intensity (A): **${A.toFixed(2)} Erlangs**\n- Net Agents Required: **${netAgents}**\n- Achieved Service Level: **${SL.toFixed(1)}%** ✓\n- Occupancy: **${occupancy.toFixed(1)}%**\n- ASA: **${asa} seconds**\n- Gross HC (with shrinkage): **${grossHC}**\n\n*Gross HC = agents you need on the schedule. Net HC = agents actively taking calls.*`,
    followUps: ["What is occupancy?", "How do I apply shrinkage?", "What is Erlang C?"]
  };
}

// ── Shrinkage calculation handler ────────────────────────────────────────
function handleShrinkageCalc(msg: string): ChatResponse | null {
  const lower = msg.toLowerCase();
  if (!/shrinkage|gross.*hc|net.*hc|headcount.*shrink/.test(lower)) return null;

  // Try: "net X agents, shrinkage Y%"
  const netMatch = msg.match(/(\d+)\s*(net|agents?)/i);
  const shrkMatch = msg.match(/(\d+)\s*%?\s*shrinkage/i) || msg.match(/shrinkage\s*[=:of]?\s*(\d+)/i);

  if (!netMatch || !shrkMatch) return null;

  const net = parseInt(netMatch[1]);
  const shrk = parseInt(shrkMatch[1]) / 100;
  const gross = Math.ceil(net / (1 - shrk));

  return {
    text: `**Shrinkage Calculation:**\n\n- Net Agents (from Erlang C): **${net}**\n- Shrinkage: **${Math.round(shrk*100)}%**\n\n> Gross HC = ${net} ÷ (1 − ${Math.round(shrk*100)}%) = ${net} ÷ ${(1-shrk).toFixed(2)} = **${gross}**\n\nYou need to schedule **${gross} agents** to have ${net} actively available for contacts.`,
    followUps: ["What is shrinkage?", "How do I calculate traffic intensity?", "What is a good shrinkage target?"]
  };
}

// ── Main response function ──────────────────────────────────────────────────
export function getWFMResponse(userMessage: string): ChatResponse {
  const msg = userMessage.trim();
  const lower = msg.toLowerCase();

  // Check for non-WFM content
  if (isNonWFM(msg)) {
    return {
      text: `I appreciate your curiosity! 😊 However, my developer **Gurpreet Singh** has instructed me to only answer questions related to **Workforce Management**.\n\nI can help you with:\n- Erlang C calculations\n- Shrinkage & staffing formulas\n- Forecasting and scheduling\n- WFM metrics and benchmarks\n- Contact centre best practices\n\nWhat WFM topic can I help you with?`,
      followUps: ["What is Erlang C?", "How do I calculate shrinkage?", "What is service level?"]
    };
  }

  // Try dynamic calculations first
  const erlangResult = handleErlangCalculation(msg);
  if (erlangResult) return erlangResult;

  const shrinkageResult = handleShrinkageCalc(msg);
  if (shrinkageResult) return shrinkageResult;

  // Match against knowledge base
  for (const qa of WFM_QA) {
    if (qa.patterns.some(p => lower.includes(p))) {
      return { text: qa.response, followUps: qa.followUps };
    }
  }

  // Fuzzy WFM keyword match
  const wfmKeywords = ["erlang","shrinkage","service level","occupancy","aht","forecast","schedule","adherence",
    "rta","capacity","attrition","headcount","staffing","agent","call centre","contact centre",
    "wfm","workforce","interval","shift","roster","queue","abandon","asi","mape","mae","intraday"];
  if (wfmKeywords.some(kw => lower.includes(kw))) {
    return {
      text: `That's a great WFM question! I may not have a specific answer for "${msg.slice(0, 60)}${msg.length > 60 ? '...' : ''}", but here are some related topics I can help with:`,
      followUps: ["What is Erlang C?", "How do I calculate shrinkage?", "What is service level?", "Explain WFM metrics"]
    };
  }

  // Default response
  return {
    text: `I'm not sure I understand your question, but I'm here to help with any **Workforce Management** topic!\n\nTry asking me something like:\n- "Calculate staffing for 300 calls, AHT 5 minutes, 80/20 SL"\n- "What is Erlang C?"\n- "How do I reduce shrinkage?"\n- "What is a good occupancy target?"`,
    followUps: ["What is Erlang C?", "What is shrinkage?", "What is service level?"]
  };
}

export const QUICK_QUESTIONS = [
  "What is Erlang C?",
  "Calculate agents: 200 calls, 4 min AHT, 80% in 20s",
  "What is a good shrinkage target?",
  "Explain service level",
  "What is occupancy?",
  "What is the WFM career path?",
];
