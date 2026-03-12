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
  {
    q: "How do you calculate the monthly hiring target when you have both growth and attrition?",
    a: "Monthly hiring target = (Required FTE end-of-month − Current FTE start-of-month) + Expected attrition during month + Training pipeline adjustment. Example: Required end-of-month = 220 FTE, current = 200 FTE, expected attrition = 5 agents (≈2.5% monthly), training throughput 85% (need to start 12 trainees to net 10 certified). Target = (220 − 200) + 5 + (adjustment for ramp loss) ≈ 25–30 hires to start. This ensures net gain covers growth while backfilling exits. Track actual vs. target monthly and adjust for variance.",
  },
  {
    q: "What is the role of 'effective FTE' in a capacity plan with ramping new hires?",
    a: "Effective FTE accounts for partial productivity during ramp-up. Formula per cohort: Effective FTE = Number certified × Ramp productivity %. Example: 20 new hires complete training in Month 1; ramp = 50% Month 1, 75% Month 2, 100% Month 3. Month 1 contribution = 20 × 0.50 = 10 FTE; Month 2 = 20 × 0.75 = 15 FTE; Month 3 = 20 × 1.00 = 20 FTE. The capacity model sums effective FTE from all cohorts + tenured staff to compare against required FTE. Ignoring effective FTE overstates capacity by 20–40% in high-growth periods.",
  },
  {
    q: "How do you model the impact of changing training duration from 6 weeks to 8 weeks?",
    a: "Increasing training from 6 to 8 weeks delays productive capacity. Impact calculation: (1) Calculate lost productive weeks — 2 extra weeks per cohort. (2) Multiply by cohort size and average productivity during those weeks (e.g., if 50% productive in week 7–8, lost = cohort × 2 × 0.50 FTE-weeks). Example: 30 trainees/month → 30 × 2 × 0.50 = 30 FTE-weeks lost per month. (3) Annualize impact: ~120–150 FTE-weeks/year lost → equivalent to ~3–4 fewer agents full-year. (4) Offset by higher quality/lower attrition (if justified). Recommend increasing hiring volume or starting cohorts earlier to compensate.",
  },
  {
    q: "What is a 'hiring pipeline funnel' and how do you build one in capacity planning?",
    a: "The hiring pipeline funnel maps stages from job posting to productive agent with conversion rates and lead times. Typical stages: Applications → Interviews → Offers → Acceptances → Background checks → Training start → Certification → Ramp complete. Example funnel (monthly): 500 applications → 150 interviews (30%) → 60 offers (40%) → 48 acceptances (80%) → 40 start training (83%) → 34 certified (85%) → 34 productive after ramp. Lead times: 4 weeks to offer, 2 weeks onboarding, 6 weeks training, 8 weeks full ramp. Capacity planners back-calculate from required certified agents to determine how many postings/applications needed 4–6 months ahead.",
  },
  {
    q: "How do you incorporate seasonal hiring freezes or budget constraints into a capacity plan?",
    a: "Seasonal/budget constraints: (1) Identify restricted periods (e.g., Q4 hiring freeze). (2) Front-load hiring before freeze — accelerate cohorts 2–3 months prior. (3) Build larger buffers (extra 5–10% headcount) entering freeze period to cover attrition. (4) Model 'what-if' scenarios: delay hiring vs. use agency temps vs. OT. Example: If freeze Dec–Feb, hire 40 in Oct–Nov instead of spreading evenly; maintain 8% buffer through Q1. (5) Present trade-offs to leadership: 'Delaying 20 hires to Q2 creates 12-agent gap Jan–Mar → SL risk 5–8% or ₹X OT cost'. Ensures continuity despite constraints.",
  },
  {
    q: "What is the difference between steady-state and growth capacity planning?",
    a: "Steady-state planning assumes flat or minimal volume growth — focus is replacing attrition and maintaining current SL (hiring ≈ monthly attrition + buffer). Growth planning adds incremental headcount for forecasted volume increases (hiring = attrition replacement + net growth FTE). Example: Steady-state 200 FTE, 2% monthly attrition → hire ~4/month. Growth +5% annual volume → add ~10 FTE/year net → hire ~5–6/month. Growth plans require earlier lead times (recruit + train + ramp = 4–9 months) and scenario sensitivity to volume upside/downside.",
  },
  {
    q: "How do you calculate the cost of delayed hiring in a capacity plan?",
    a: "Delayed hiring cost = Lost productive FTE-weeks × Weekly cost per FTE. Example: Delay 20 hires by 2 months (8 weeks). During delay: 0 FTE from cohort. If ramp starts after delay, lost = 20 hires × 8 weeks × average ramp productivity (e.g., 40% first 8 weeks) = 64 FTE-weeks lost. Weekly FTE cost (salary + overhead) ₹15,000 → total ≈ ₹9.6 lakh. Add SL risk cost (e.g., 5% SL drop × customer value). Present as: '2-month delay costs ₹10–12 lakh + SL erosion'. Drives urgency for timely requisitions.",
  },
  {
    q: "What is 'backlog capacity planning' and when do you use it?",
    a: "Backlog capacity planning models how long it takes to clear accumulated work when headcount is below requirement (e.g., post-attrition gap). Formula: Backlog days = Accumulated handle minutes / Daily surplus capacity once staffed. Example: 10-agent gap = 400 handle hours backlog (assuming 8 hr/agent/day). Once gap filled, surplus 2 agents/day (after covering daily demand) → clear in 200 days. Used when SL allows backlog (e.g., email/non-real-time queues). In voice: usually unacceptable — triggers urgent hiring/agency. Helps quantify risk of delayed recruitment.",
  },
  {
    q: "How do you plan capacity for a new site launch or geographic expansion?",
    a: "New site capacity plan: (1) Define target volume share (e.g., 30% of total). (2) Calculate standalone requirements — forecast volume × AHT → Erlang FTE per skill. (3) Add site-specific factors: higher initial attrition (20–30% first year), longer ramp (local hiring/training), local shrinkage (e.g., regional holidays). (4) Build phased ramp: Month 1–3 = 50–70% target FTE, Month 4–6 = 100%. (5) Include recruitment lead time (longer in new market) and training logistics. (6) Model risk — parallel run with existing sites during ramp. (7) Present phased headcount chart and cost buildup to leadership.",
  },
  {
    q: "What is the impact of changing target occupancy from 82% to 88% on capacity requirements?",
    a: "Higher occupancy target reduces required headcount but increases burnout risk. Impact: Required FTE ≈ Workload / (Available hours × Target occupancy × (1 − Shrinkage)). Example: Workload 100,000 handle min/month, 160 productive hours/agent, 30% shrinkage → at 82% occupancy: FTE = 100,000 / (160 × 0.82 × 0.70) ≈ 1,085 agents. At 88%: FTE ≈ 1,010 agents → saving ~75 agents (7%). Cost saving ≈ ₹4–6 crore/year. Trade-off: higher occupancy → AHT +5–10%, quality drop, attrition +10–15%. Recommend only if offset by automation/training improvements.",
  },
  {
    q: "How do you model the capacity impact of introducing a new self-service channel that deflects 15% of calls?",
    a: "Self-service deflection: (1) Forecast deflection curve — e.g., 5% Month 1, 15% by Month 6 (S-curve adoption). (2) Reduce net volume for voice queue accordingly. (3) Calculate new FTE requirement post-deflection (Erlang on reduced volume). Example: Original 200 FTE for 100k calls/month; 15% deflection → 85k calls → new FTE ≈ 170 (15% reduction). (4) Phase headcount reduction via attrition/VTO (avoid layoffs). (5) Monitor actual deflection rate monthly — if slower/faster, adjust hiring pipeline. (6) Add back-office capacity if deflected calls shift to email/chat.",
  },
  {
    q: "What is a 'risk-adjusted capacity plan' and why use it?",
    a: "Risk-adjusted plan builds buffers for uncertainty: (1) Add forecast error buffer (e.g., +5–10% FTE for volume upside). (2) Increase attrition assumption (e.g., base 18% → risk 22%). (3) Lower training throughput (e.g., 85% → 75%). (4) Include contingency hiring queue (e.g., 10% extra requisitions pre-approved). Example: Base plan 220 FTE; risk-adjusted 235–245 FTE. Used in volatile environments (e.g., seasonal, competitive). Trade-off: higher cost vs. SL protection. Present as scenarios: base vs. risk (probability-weighted).",
  },
  {
    q: "How do you calculate the lead time for capacity adjustments in different scenarios?",
    a: "Lead time breakdown: (1) Recruitment = 4–8 weeks (job post to offer). (2) Onboarding/background = 2–4 weeks. (3) Training/certification = 4–12 weeks. (4) Ramp to full productivity = 4–12 weeks. Total: 14–36 weeks depending on role complexity. Example: Entry-level voice = 4+2+6+8 = 20 weeks lead time. Complex skills (e.g., technical support) = 30–36 weeks. Capacity planners back-schedule from required date: if need 50 agents by July 1, start recruitment Feb–Mar. Shorter lead times require agency temps or OT as bridge.",
  },
  {
    q: "What is the capacity planning implication of reducing AHT by 10% through process improvement?",
    a: "AHT reduction directly lowers workload. Impact: New FTE ≈ Old FTE × (New AHT / Old AHT). Example: Current 200 FTE at 240s AHT; reduce to 216s (−10%) → new FTE ≈ 200 × 0.90 = 180 FTE (20 saved). (1) Phase reduction via natural attrition/VTO. (2) Reallocate saved capacity to growth or back-office. (3) Validate actual AHT post-change — if only 7% reduction, adjust plan. (4) Monitor quality/CSAT — aggressive AHT cuts can increase repeats (+5–10% volume). Net saving: ~₹1–1.5 crore/year per 20 FTE.",
  },
  {
    q: "How do you plan capacity when attrition is seasonal (e.g., higher in summer/post-bonus)?",
    a: "Seasonal attrition modeling: (1) Break annual attrition into monthly rates (e.g., base 1.5%, summer 3%, post-bonus 4%). (2) Apply higher decay in peak months to headcount projection. (3) Front-load hiring before high-attrition periods (e.g., hire extra in April–May for summer). (4) Build larger buffer entering high-risk months (8–12% vs. 5%). (5) Scenario test: 'What if post-bonus attrition hits 25% vs. 18%?' → adjust requisitions. (6) Monitor leading indicators (engagement surveys, exit interviews). Prevents coverage gaps during predictable high-exit windows.",
  },
  {
    q: "What is the difference between 'required FTE' and 'authorized headcount' in capacity planning?",
    a: "Required FTE is mathematically derived from workload, SL target, shrinkage, and ramp (what you need to meet demand). Authorized headcount is the budget-approved ceiling (what finance/leadership allows). Gap analysis: if required 220 FTE but authorized 200 → shortfall of 20 FTE → risks SL drop or OT reliance. Planners present required vs. authorized monthly, with impact quantification (e.g., '20 FTE gap = 8% SL risk or ₹X OT cost'). Used to negotiate budget increases or prioritize queues. Alignment gap often causes most capacity crises.",
  },
  {
    q: "How do you incorporate part-time or contingent workers into a capacity plan?",
    a: "Part-time/contingent integration: (1) Define productive hours (e.g., part-time 20 hr/week = 0.5 FTE). (2) Assign to peak coverage or valleys (lower benefits cost). (3) Model mix optimization — minimize total cost while meeting SL (part-time cheaper but higher turnover/training). Example: 200 full-time + 40 part-time (0.5 FTE each) = 220 FTE at 15% lower cost than 220 full-time. (4) Factor higher attrition (20–30% for contingents). (5) Plan onboarding pipeline separately. Ideal for peaked demand or seasonal spikes.",
  },
  {
    q: "What steps do you take when the capacity model shows a growing surplus headcount?",
    a: "Surplus headcount actions: (1) Validate model — check forecast accuracy, attrition assumptions. (2) If real: offer voluntary attrition programs (severance, early retirement). (3) Use surplus for cross-training, back-office, quality initiatives. (4) Freeze/redirect hiring requisitions. (5) Phase VTO or reduced hours. (6) Worst case: managed layoffs with outplacement. (7) Communicate transparently to maintain morale. Goal: avoid forced reductions — surplus often temporary due to self-service or efficiency gains.",
  },
  {
    q: "How do you model capacity for omnichannel with different concurrency levels?",
    a: "Omnichannel capacity: (1) Forecast volume per channel. (2) Apply channel-specific AHT and concurrency (voice=1, chat=2–4, email=6–8). (3) Calculate weighted workload = Σ (Volume × AHT / Concurrency). (4) Run Erlang or simulation per channel or blended. (5) Model agent skill matrix — voice-only vs. multi-channel. Example: 100 voice + 200 chat contacts; voice AHT 300s (1 conc), chat 120s (3 conc) → voice workload 100 × 300s, chat 200 × 40s effective → blended FTE lower due to concurrency. (6) Adjust for channel priorities and routing rules. Prevents overstaffing voice while understaffing digital.",
  },
  {
    q: "What is 'churn-adjusted capacity planning' and why is it important?",
    a: "Churn-adjusted planning factors customer churn into volume forecasts. If churn rises (e.g., due to poor SL), future volume drops → lower capacity needed. Steps: (1) Link SL/CSAT to churn rate (industry: 1% SL drop → 0.3–0.8% churn increase). (2) Model future volume = Current base × (1 − Churn rate)^months. (3) Adjust hiring pipeline downward if high churn projected. Example: 5% churn vs. 2% → 3% lower volume in 12 months → ~6–8 fewer FTE needed. Important for retention-focused centres — poor capacity planning can create vicious cycle of understaffing → low SL → higher churn → further volume drop.",
  },
  {
    q: "How do you calculate the break-even point between hiring full-time agents vs. using staffing agencies?",
    a: "Agency vs. full-time breakeven: Agency cost = ₹800–1,200/hour (including margin). Full-time = ₹450–600/hour + benefits/training (~₹700 all-in). Breakeven duration: Agency cheaper for short-term (<3–6 months). Example: 10-agent gap, agency ₹1,000/hr × 160 hr/month = ₹16 lakh/month. Full-time hire cost ₹1.1 lakh/month after ramp → breakeven after ~6 months. Add quality/SL risk (agency often lower tenure). Use agency for spikes/absences; convert to full-time for recurring gaps >6 months.",
  },
  {
    q: "What is the capacity planning impact of increasing target service level from 80/20 to 85/20?",
    a: "SL increase from 80/20 to 85/20 typically requires 8–15% more agents (non-linear due to Erlang curve). Example: 80/20 needs 100 FTE; 85/20 needs ~110–115 FTE (steep part of curve). Cost impact: +10–15 FTE × ₹50,000/month = ₹5–7.5 lakh/month extra. Benefits: lower abandons (−20–30%), higher CSAT, reduced callbacks. Planners present trade-off: incremental cost vs. customer lifetime value gain. Often justified for premium clients; otherwise target 80/20 with tight intraday management.",
  },
  {
    q: "How do you plan capacity when introducing automation (e.g., chatbot deflecting 20% of chats)?",
    a: "Automation deflection planning: (1) Forecast phased deflection (e.g., 5% Month 1 → 20% Month 6). (2) Reduce digital queue volume accordingly. (3) Calculate new FTE requirement (Erlang on reduced workload). (4) Model remaining complex chats with higher AHT (+10–20%). (5) Phase headcount reduction via attrition/VTO. (6) Reallocate saved agents to voice or back-office. (7) Monitor actual deflection — if slower, delay reductions. (8) Add bot maintenance/training capacity. Net: 15–18% digital FTE saving, offset by quality monitoring needs.",
  },
  {
    q: "What is a 'capacity gap analysis report' and what does it include?",
    a: "Capacity gap analysis report compares projected supply vs. demand monthly/quarterly. Includes: (1) Required FTE by month (from forecast + SL target). (2) Projected supply: opening HC + hires − attrition − ramp loss. (3) Gap/surplus by month. (4) Risk assessment: SL impact, OT cost estimate, agency reliance. (5) Action plan: hiring requisitions needed, training starts, mitigation (VTO, overflow). (6) Scenarios: base/upside/downside. Presented to leadership monthly. Drives timely decisions and budget alignment.",
  },
  {
    q: "How do you adjust capacity plans when actual attrition is 20% higher than forecasted?",
    a: "Higher-than-expected attrition adjustment: (1) Recalculate headcount projection with new rate (e.g., 18% → 21.6%). (2) Identify accelerated gap (e.g., 12 months → 8 months to shortfall). (3) Immediate actions: increase hiring volume 20–30%, accelerate requisitions. (4) Short-term bridge: agency temps, OT pre-approval. (5) Root cause analysis (exit interviews, engagement survey) to address drivers. (6) Update future forecasts with revised attrition curve. (7) Report variance impact (e.g., 'Attrition +3.6% creates 15 FTE gap Q3 — hiring increased 25%'). Prevents cascading SL failures.",
  },
  {
    q: "What is the capacity planning role in merger or acquisition integration?",
    a: "M&A capacity planning: (1) Forecast combined volume (synergies + cannibalization). (2) Assess acquired staff — retention risk (20–40% first year), skill overlap. (3) Calculate net FTE need post-rationalization. (4) Plan phased integration: retain key talent, cross-train, harmonize processes. (5) Model attrition spike during integration. (6) Align training pipelines and site consolidations. (7) Present synergy savings (e.g., '15% headcount reduction via overlap') vs. integration cost/risk. Critical for realizing cost synergies without SL collapse.",
  },
  {
    q: "How do you calculate the ROI of investing in better training to improve throughput from 75% to 90%?",
    a: "Training ROI: (1) Current: 100 trainees → 75 certified. (2) Improved: 100 → 90 certified → need only 83 trainees for same output (17 saved). (3) Cost savings: recruitment + onboarding + training cost per trainee (e.g., ₹50,000) × 17 = ₹8.5 lakh/month. (4) Add faster ramp (higher throughput → better quality → lower early attrition). (5) Investment: extra training resources (₹2–3 lakh/month). ROI = (Savings − Investment) / Investment ≈ 180–300%. (6) Present payback period (3–6 months). Justifies investment in quality training programs.",
  },
  {
    q: "What is 'attrition elasticity' in capacity modeling and why track it?",
    a: "Attrition elasticity measures how sensitive headcount is to small changes in attrition rate. Formula: % change in FTE / % change in attrition rate. Example: 1% attrition increase → 4–6% FTE shortfall over 12 months (due to compounding). Tracked because high elasticity environments (long ramp, high growth) require tighter attrition control. If elasticity >4, invest in retention (engagement, pay, career paths). Used in scenario planning: 'If attrition rises 3%, need 18 extra hires next year'. Guides where to allocate budget (hiring vs. retention).",
  },
  {
    q: "How do you plan capacity for back-office or non-real-time work (e.g., email, claims processing)?",
    a: "Back-office capacity: (1) Forecast volume and AHT separately (often less volatile). (2) Use simpler staffing: Workload / Available hours per agent (no Erlang needed unless queued). (3) Apply shrinkage and ramp. (4) Model concurrency if blended with voice. (5) Prioritize lower than real-time SL (e.g., email 95% within 24 hr). (6) Use surplus voice agents during valleys. (7) Plan separately but reconcile total FTE. Allows cost-efficient use of part-time or offshore resources for non-voice work.",
  },
  {
    q: "What is the capacity planning impact of increasing agent tenure through retention programs?",
    a: "Higher tenure benefits: (1) Lower effective attrition (e.g., from 20% to 15% → 25% less replacement hiring). (2) Higher average productivity (experienced agents 10–20% faster AHT, better quality). (3) Reduced training load. Example: Tenure from 12 to 18 months average → attrition drops 5%, AHT −8% → FTE need −10–12%. Cost: retention program (₹5–10 lakh/year bonuses/training) vs. saving 20–30 FTE (₹1–1.5 crore/year). ROI typically 3–5x. Planners model long-term curve — retention compounds over years.",
  },
  {
    q: "How do you create a 3-year rolling capacity plan?",
    a: "3-year rolling plan: (1) Year 1: detailed monthly (hires, cohorts, ramp, attrition). (2) Year 2: quarterly with scenarios. (3) Year 3: annual directional. Inputs: volume forecast (trend + seasonality + initiatives), SL target, shrinkage/attrition assumptions, training throughput, ramp curves. Outputs: headcount by month/quarter, hiring starts, budget implications, risk gaps. Update quarterly — roll forward and refine. Used for strategic budgeting, site decisions, and leadership alignment. Example: 'Year 3 requires 320 FTE vs. current 280 → need +40 net hires over 24 months'.",
  },
  {
    q: "What is the capacity planning role during a recession or volume downturn?",
    a: "Downturn planning: (1) Downward volume scenarios (−10–30%). (2) Model natural attrition absorption — let headcount decline via exits rather than layoffs. (3) Freeze hiring, redirect requisitions. (4) Use VTO, reduced hours, sabbaticals to manage surplus. (5) Cross-train for flexibility. (6) Maintain minimum buffer for quick rebound. (7) Present cost-saving scenarios (e.g., '−20% volume → 40 FTE surplus → ₹2 crore annual saving via attrition'). (8) Monitor leading indicators (marketing spend, economic data) for recovery signal. Protects margins while preserving talent for upturn.",
  },
  {
    q: "How do you calculate the training capacity needed for a growth plan?",
    a: "Training capacity calculation: (1) Determine net hires needed per month from capacity model. (2) Divide by throughput (e.g., net 20 certified → start 20 / 0.85 = 23.5 trainees). (3) Multiply by training weeks and batch size constraints (e.g., max 25 per trainer). (4) Add buffer for no-shows/dropouts. Example: 30 net hires/month, 85% throughput, 8-week training → start 35–40 trainees/month → need 2–3 parallel batches. (5) Factor trainer availability and facilities. Ensures training doesn’t bottleneck growth.",
  },
  {
    q: "What is 'scenario-weighted capacity planning' and when is it used?",
    a: "Scenario-weighted planning assigns probabilities to different futures and computes expected headcount need. Example: Base (60% prob): 220 FTE; Upside +15% volume (25%): 253 FTE; Downside −10% (15%): 198 FTE. Expected FTE = (220 × 0.6) + (253 × 0.25) + (198 × 0.15) ≈ 224 FTE. Hire to ~230 with buffer. Used in high-uncertainty environments (new product launches, economic volatility, regulatory changes). Provides risk-adjusted view — better than single-point planning.",
  },
  {
    q: "How do you plan capacity when introducing a new product line that requires specialized agents?",
    a: "New product line planning: (1) Forecast product-specific volume (initial spike + stabilization). (2) Calculate specialized FTE need (Erlang on new AHT/skill). (3) Define training path — additional 2–4 weeks for specialization. (4) Model cross-training vs. dedicated agents (dedicated better quality but higher cost). (5) Phase ramp: start with 50% dedicated, flex rest from general pool. (6) Build separate attrition/training pipeline for specialists. (7) Monitor product adoption — adjust if slower/faster. (8) Present incremental cost vs. revenue potential to leadership.",
  },
  {
    q: "What is the capacity planning impact of moving to a 4-day workweek model?",
    a: "4-day week impact: (1) Agents work 4×10h = same weekly hours but fewer calendar days. (2) Coverage challenge — fewer agents per day → need 8–12% more headcount for same daily FTE (168 hr/week coverage / 40 hr/agent = 4.2 FTE/day → 4-day requires more bodies). (3) Cost neutral on payroll but higher training/onboarding. (4) Benefits: lower attrition (−10–15%), higher satisfaction. (5) Model: 200 FTE → 220–225 needed. (6) Pilot with 20% of staff, measure SL/cost/attrition before full rollout. Trade-off: coverage vs. retention.",
  },
  {
    q: "In the situation of a sudden 25% volume increase due to a competitor exit, how do you adjust your 12-month capacity plan?",
    a: "Competitor exit scenario: (1) Immediately re-forecast volume with +25% uplift for next 6–12 months (use market share data + early actuals). (2) Run updated Erlang requirements — original 250 FTE becomes ~312 FTE. (3) Calculate accelerated gap: current pipeline covers only 40 new hires in next 6 months → shortfall of 22 FTE. (4) Actions: raise emergency requisitions (+30% hiring volume), accelerate training batches (start 2 extra cohorts), engage agency for 3-month bridge. (5) Model scenarios (base 20% uplift vs. 30%). (6) Present to leadership: 'Gap creates 9% SL risk Q2; accelerated hiring + agency adds ₹45 lakh but protects ₹2 crore revenue'. (7) Monitor actual migration weekly and taper plan if uplift stabilizes lower.",
  },
  {
    q: "How do you calculate the exact number of extra hires needed when training throughput drops from 88% to 72%?",
    a: "Throughput drop calculation: Original: 100 hires/month → 88 certified. New: 72 certified → shortfall 16/month. To maintain same output: Required starts = 100 / 0.72 ≈ 139 (39 extra). Annual impact: 468 extra starts × ₹45,000 (recruit + train cost) = ₹2.1 crore additional budget. Steps: (1) Validate root cause (quality of hires, curriculum). (2) Build contingency: temporary agency + increased starts for 3 months. (3) Invest in fixes (better screening, mentorship) to restore 85%+. Present as: 'Throughput drop requires 39 extra monthly hires at ₹1.76 crore/year until resolved'.",
  },
  {
    q: "In the situation of a government regulation mandating 30% local hires in a new state, how do you revise your capacity plan?",
    a: "Regulatory local-hire mandate: (1) Segment plan by location — new state target 120 FTE. (2) Adjust recruitment funnel: local sourcing yield drops 40% (longer lead time 10–12 weeks vs. 6). (3) Increase total starts: need 170 applicants for 120 certified (vs. 140 previously). (4) Add relocation/visa buffer cost (+15%). (5) Model phased ramp: delay full capacity by 8 weeks → temporary agency 25 FTE. (6) Scenario test: if local yield only 60%, shortfall 18 FTE → escalate for budget exception. (7) Track compliance monthly (report % local hires). Prevents legal risk while maintaining SL.",
  },
  {
    q: "How do you calculate the cost-benefit of cross-training 40% of agents across two skills?",
    a: "Cross-training ROI: (1) Baseline: two separate teams (100 voice + 80 chat = 180 FTE). (2) Cross-trained: 40% overlap → pooled requirement drops to ~155 FTE (Erlang pooling efficiency +15%). Savings: 25 FTE × ₹50,000/month = ₹12.5 lakh/month. (3) Cost: training 72 agents × ₹18,000 = ₹12.96 lakh one-time. (4) Payback: 1.04 months. (5) Add benefits: lower attrition (−8%), better occupancy. (6) Risk: initial quality dip (model 5% AHT rise first 3 months). Recommendation: phase 20% first, measure SL impact before full rollout. Net annual saving ₹1.4 crore after costs.",
  },
  {
    q: "In the situation of a 15% annual volume decline due to successful digital transformation, how do you right-size capacity without forced layoffs?",
    a: "Digital decline right-sizing: (1) Update forecast: volume drops 15% over 12 months. (2) Model natural attrition absorption (18% annual attrition covers 80% of reduction). (3) Freeze new hires immediately. (4) Accelerate VTO and internal transfers to back-office. (5) Phase training pipeline reduction (delay 2 cohorts). (6) Target 12% surplus buffer by month 6 via attrition only. (7) Monitor SL monthly — if decline faster, offer voluntary severance packages. (8) Communicate: 'Natural attrition + VTO covers gap; no forced exits'. Saves ₹1.8 crore/year while protecting morale and SL.",
  },
  {
    q: "Calculate the additional headcount buffer required when forecast error standard deviation is 12% and you want 95% SL confidence.",
    a: "Statistical buffer: Use z-score for 95% confidence (1.96). Buffer FTE = Required FTE × (z × forecast error SD). Example: base required 200 FTE, SD 12% → buffer = 200 × (1.96 × 0.12) ≈ 47 FTE. Total planned = 247 FTE. Steps: (1) Validate SD from historical MAPE. (2) Apply only to variable portion (80% of volume). (3) Adjust for shrinkage/attrition. (4) Cost: ₹23.5 lakh/month extra. (5) Alternative: lower to 90% confidence (z=1.28) → buffer 31 FTE. Present trade-off: '95% confidence costs ₹2.8 crore/year but reduces SL breach risk from 25% to 5%'.",
  },
  {
    q: "In the situation of a site closure announcement, how do you reallocate capacity across remaining locations?",
    a: "Site closure reallocation: (1) Calculate displaced volume (e.g., 25% of total). (2) Distribute to other sites based on spare capacity and skill match (e.g., Site A +12%, Site B +13%). (3) Model ramp: 8-week transition with temporary OT buffer (+8% headcount). (4) Cross-train 30% of displaced agents for new sites. (5) Adjust attrition (spike 25% first quarter). (6) Update Erlang per site and run scenario for SL risk. (7) Present phased plan: '3-month OT bridge + hiring acceleration maintains 82% SL'. Minimizes customer impact and cost overrun.",
  },
  {
    q: "How do you calculate the break-even headcount where agency staffing becomes cheaper than full-time hires for a 6-month peak?",
    a: "Agency breakeven: Agency all-in ₹1,100/hour vs. full-time ₹680/hour (including benefits). Monthly cost: agency 40 FTE = ₹17.6 lakh; full-time = ₹10.88 lakh + ₹4 lakh training/onboarding = ₹14.88 lakh. Breakeven at 5.8 months. Steps: (1) Add ramp loss (agency instant productivity). (2) Factor quality risk (+10% for agency). (3) For 6-month peak: agency cheaper by ₹1.8 lakh total. (4) Recommendation: use agency for peaks <6 months, convert to full-time for recurring. Saves ₹8–12 lakh per project when applied correctly.",
  },
  {
    q: "In the situation of a new union agreement increasing paid leave by 5 days per year, how do you adjust long-term capacity?",
    a: "Union leave increase: (1) New shrinkage rises 1.4% (5 days / 250 workdays). (2) Gross FTE multiplier changes from 1 / (1−0.30) = 1.43 to 1 / (1−0.314) = 1.46. (3) For 300 FTE requirement: additional 9 gross agents needed. (4) Annual cost: 9 × ₹50,000/month = ₹54 lakh. (5) Mitigate: optimize scheduling (more part-time), increase training throughput. (6) Model phased impact over contract years. (7) Present to leadership: 'Net +3% headcount need; recommend ₹20 lakh efficiency offset via rostering'. Ensures compliance without SL erosion.",
  },
  {
    q: "How do you calculate the capacity impact of introducing AI that reduces AHT by 18% but increases training time by 4 weeks?",
    a: "AI impact net: (1) AHT reduction: workload drops 18% → base FTE saving 18%. (2) Training extension: +4 weeks delays productivity of new hires (lost 4 × 0.5 ramp = 2 FTE-weeks per hire). (3) Annual cohort 120 hires → lost 240 FTE-weeks ≈ 5 FTE permanent drag. (4) Net saving: 18% − 2.1% drag = 15.9% FTE reduction. Example: 250 FTE base → new 210 FTE. (5) Cost: extra training ₹15 lakh/year. (6) ROI: ₹2.1 crore annual saving. (7) Phase rollout — pilot on 20% volume first. Balances efficiency gain with onboarding friction.",
  },
  {
    q: "In the situation of a 20% budget cut mandated by finance, how do you prioritize capacity reductions while protecting SL?",
    a: "Budget cut prioritization: (1) Identify lowest-impact areas: non-core queues, low-revenue clients, back-office. (2) Model SL risk per 5% headcount cut (Erlang sensitivity: +1% SL drop per 4% cut in peak). (3) Phase reductions: 50% via attrition/VTO first 6 months. (4) Increase occupancy target 3–4% (82% → 86%). (5) Accelerate automation/self-service. (6) Present ranked options: 'Cut low-priority queue first: 8% SL risk vs. core queue 18%'. (7) Monitor weekly — trigger reversal if SL <78%. Protects revenue-critical SL while meeting budget.",
  },
  {
    q: "Calculate the headcount savings from moving 30% of volume to a lower-cost offshore partner with 12% higher shrinkage.",
    a: "Offshore savings: (1) 30% volume = 90 FTE onshore equivalent. (2) Offshore shrinkage 42% vs. 30% onshore → gross multiplier 1.72 vs. 1.43. (3) Offshore FTE needed: 90 / (1−0.42) ≈ 155 gross. (4) Cost differential: offshore ₹28,000/month vs. onshore ₹52,000 → saving per gross FTE ₹24,000. (5) Net saving: 155 × ₹24,000 = ₹37.2 lakh/month. (6) Offset: 8% quality buffer (+12 FTE onshore oversight). Final net: ₹32 lakh/month. (7) Ramp time 3 months + knowledge transfer cost. Breakeven 5 months. Justify if SL maintained via strict SLAs.",
  },
  {
    q: "In the situation of a major client contract renewal with stricter 90/30 SL instead of 80/20, how do you update the 18-month capacity plan?",
    a: "Stricter SL renewal: (1) Recalculate Erlang requirements: 90/30 typically needs 12–18% more agents than 80/20. (2) For 120 FTE client queue: new requirement ≈ 140 FTE. (3) Adjust pipeline: accelerate 25 extra hires over next 9 months. (4) Increase buffer to 12% for confidence. (5) Model cost: +20 FTE × ₹50,000 = ₹10 lakh/month extra. (6) Negotiate with client: higher SL = premium pricing offset. (7) Phase: 6-month ramp with OT bridge. (8) Track monthly gap closure. Prevents contract loss while quantifying incremental investment.",
  },
  {
    q: "How do you calculate the optimal mix of full-time vs. part-time agents in a highly seasonal business?",
    a: "Seasonal mix optimization: (1) Identify peak vs. valley demand ratio (e.g., 2.5:1). (2) Full-time covers base (valley) load. (3) Part-time covers peak delta. Example: valley 120 FTE, peak 300 FTE → base 120 full-time + 180 part-time (0.6 FTE avg). (4) Cost: part-time saves 25% benefits. Total cost lower by 12%. (5) Adjust for higher part-time attrition (25% vs. 15%). (6) Model: 70/30 full/part-time optimal for this ratio. (7) Validate with coverage simulation. Reduces annual cost ₹1.2 crore while maintaining SL in peaks.",
  },
  {
    q: "In the situation of a new compliance requirement adding 15% more after-call work, how do you revise the long-term plan?",
    a: "Compliance ACW increase: (1) Effective AHT rises 15% (workload +15%). (2) New FTE requirement: original 180 × 1.15 = 207 FTE. (3) Gap: 27 FTE over 12 months. (4) Actions: accelerate hiring 25%, increase training slots. (5) Offset: automate 40% of new ACW via templates (reduces net impact to 9%). (6) Cost: ₹1.35 crore/year extra. (7) Present phased plan: 'Year 1 +15 FTE, Year 2 automation saves 12 FTE'. (8) Monitor actual ACW monthly. Ensures compliance without SL breach.",
  },
  {
    q: "Calculate the capacity buffer needed when forecast error is normally distributed with SD = 18% and you target 98% service level confidence.",
    a: "98% confidence buffer: z-score = 2.33. Buffer % = z × SD = 2.33 × 0.18 = 42%. Applied to variable workload. Example: base required 150 FTE (80% variable) → buffer on variable = 150 × 0.8 × 0.42 ≈ 50 FTE. Total planned = 200 FTE. Cost: ₹25 lakh/month. (1) Validate SD from 12-month history. (2) Reduce via better forecasting (ML) to SD 12% → buffer drops to 28 FTE. (3) Present: '98% confidence adds ₹3 crore/year; recommend investing ₹40 lakh in forecasting to cut buffer 40%'. Balances risk and cost.",
  },
  {
    q: "In the situation of a sudden economic downturn reducing volume 22% in Q2, how do you revise the hiring pipeline mid-year?",
    a: "Downturn revision: (1) Update forecast immediately (−22% Q2–Q4). (2) Pause all non-committed requisitions (save 35 planned starts). (3) Accelerate natural attrition (target 18% annual). (4) Offer VTO and internal mobility to 15% surplus. (5) Delay training cohorts 8 weeks. (6) Model new gap: original surplus 28 FTE → now 45 FTE buffer. (7) Re-run scenarios monthly. (8) Communicate: 'Hiring paused; no impact on SL due to attrition absorption'. Protects cash flow without quality loss.",
  },
  {
    q: "How do you calculate the training capacity required when introducing a new product that needs 25% of the workforce specialized?",
    a: "New product specialization: (1) Total workforce 400 FTE → 100 need specialization. (2) Training batch size 25, duration 5 weeks. (3) Pipeline: 100 / 0.88 throughput = 114 starts. (4) Batches needed: 114 / 25 = 5 batches (parallel or sequential). (5) Trainer requirement: 2 trainers (1 per 12 trainees). (6) Timeline: 12 weeks to complete. (7) Capacity drag during training: 114 × 0.4 ramp loss ≈ 46 FTE-weeks. (8) Plan extra 12 generalist hires as bridge. Ensures product launch without coverage gap.",
  },
  {
    q: "In the situation of a client requesting 24×7 coverage for the first time, how do you build the incremental capacity plan?",
    a: "24×7 expansion: (1) Current 12-hr coverage 180 FTE → 24-hr requires 360 FTE gross (double + 15% night premium shrinkage). (2) Incremental: 195 FTE. (3) Model night differential (+30% cost) and higher attrition (22%). (4) Hiring: start 220 to account for ramp. (5) Phased: 50% in Month 1–3, full by Month 6. (6) Cost: ₹9.8 crore/year incremental. (7) Offset: higher billing rate. (8) Scenario test weekend vs. weekday. (9) Present ROI: 'Incremental revenue ₹14 crore vs. cost ₹9.8 crore = 43% margin'. Secures contract while protecting margins.",
  },
  {
    q: "Calculate the long-term capacity savings from reducing agent attrition from 28% to 18% through retention initiatives.",
    a: "Attrition reduction savings: (1) Original: 200 FTE base, 28% annual = 56 exits/year → 56 replacement hires. (2) New 18% = 36 exits → 20 fewer hires. (3) Annual saving: 20 × ₹65,000 (full cycle cost) = ₹13 lakh. (4) Add productivity gain: average tenure +6 months → AHT −7% → 14 FTE equivalent saving. (5) Total: ₹25 lakh/year direct + ₹7 lakh indirect. (6) Investment: retention program ₹8 lakh/year. (7) ROI 275%. (8) Model compounding over 3 years: Year 3 cumulative saving ₹95 lakh. Justifies investment in engagement and career path programs.",
  },
  {
    q: "In the situation of a merger where the acquired company has 40% higher AHT, how do you harmonize capacity over 9 months?",
    a: "Merger AHT harmonization: (1) Combined volume 300k calls/month. (2) Acquired AHT 320s vs. legacy 210s → blended AHT 248s initially. (3) Phase process alignment: Month 1–3 retain separate queues, Month 4–6 standardize scripts. (4) FTE impact: initial 280 FTE needed, drops to 235 by Month 9 (−16%). (5) Bridge: temporary agency 25 FTE + cross-training 60 agents. (6) Model attrition spike (25% acquired). (7) Present: '9-month plan saves ₹3.2 crore vs. maintaining dual structure'. Ensures SL continuity during integration.",
  },
  {
    q: "How do you calculate the capacity needed when introducing a new language skill that represents 8% of total volume?",
    a: "New language capacity: (1) 8% volume = 24k calls/month. (2) Erlang at 80/20 SL + 35% shrinkage → 18 gross FTE. (3) Add ramp buffer: first 6 months 25% extra (4.5 FTE). (4) Recruitment: 22 starts at 82% throughput. (5) Total Year 1: 25 FTE budget. (6) Cost: ₹1.25 crore. (7) Offset: revenue from new market. (8) Model risk: if volume hits 12%, need +9 FTE contingency. Present phased ramp chart and hiring timeline to secure budget approval.",
  },
  {
    q: "In the situation of a 10% across-the-board salary increase, how do you revise your 3-year capacity budget?",
    a: "Salary increase revision: (1) All-in cost rises 10% (₹50,000 → ₹55,000/month). (2) Current plan 280 FTE Year 1 → new cost +₹16.8 lakh/month. (3) Offset options: reduce headcount 6% via efficiency (automation + rostering), increase part-time mix. (4) Model 3-year impact: cumulative ₹6.1 crore extra. (5) Present scenarios: 'Maintain headcount = +₹6.1 crore; efficiency route = +₹2.8 crore'. (6) Recommend retention offset (higher pay reduces attrition 4%). Ensures budget alignment without SL compromise.",
  },
  {
    q: "Calculate the training investment required to support 25% annual growth while maintaining 85% throughput.",
    a: "Growth training investment: (1) Base 200 FTE +25% = 50 net new/year. (2) Throughput 85% → 59 starts/year. (3) Training cost per start ₹42,000 → ₹24.78 lakh/year. (4) Add trainer overhead (2 trainers × ₹8 lakh) = ₹16 lakh. (5) Total annual ₹40.78 lakh. (6) ROI: new agents generate ₹1.2 crore revenue/year. Payback <4 months. (7) Scale with growth: Year 3 needs 78 starts. (8) Recommend phased facility expansion. Secures funding by linking directly to revenue growth.",
  },
  {
    q: "In the situation of a regulatory change requiring bilingual agents for 35% of calls, how do you adjust the 18-month hiring plan?",
    a: "Bilingual mandate adjustment: (1) 35% volume = 105 FTE bilingual need. (2) Current bilingual pool 25% → gap 55 FTE. (3) Recruitment: target 68 starts (82% throughput). (4) Add 4-week language module → extend training 25%. (5) Timeline: start 2 specialized cohorts immediately. (6) Bridge: agency bilinguals 20 FTE first 6 months. (7) Cost: +₹2.8 crore over 18 months. (8) Monitor % bilingual coverage monthly. (9) Present: 'Compliance gap closed by Month 9; SL maintained via agency bridge'. Ensures regulatory compliance without volume loss.",
  },
  {
    q: "How do you calculate the optimal float pool size for a multi-site operation with 15% unplanned shrinkage?",
    a: "Multi-site float calculation: (1) Total scheduled 450 agents. (2) Unplanned shrinkage 15% = 67.5 daily gaps. (3) Add 10% peak buffer = 74. (4) Float pool = 74 cross-trained agents (0.5 FTE each = 37 FTE). (5) Cost: ₹18.5 lakh/month. (6) Savings: reduces OT by 65% (₹28 lakh/month avoided). (7) Allocate 40% per site + central 20%. (8) Model utilization: target 75% deployment. (9) ROI: 52% annual. Prevents 90% of understaffing incidents across sites.",
  },
  {
    q: "In the situation of a 12% increase in average handle time due to complex new product queries, how do you revise the annual capacity budget?",
    a: "AHT increase revision: (1) Workload rises 12% → base 250 FTE becomes 280 FTE. (2) Annual cost impact: 30 extra FTE × ₹50,000 = ₹1.5 crore. (3) Mitigate: automate 25% of new queries (reduces net to 9% or 22.5 FTE). (4) Accelerate hiring 20 extra starts Q1–Q2. (5) Offset: process improvements target −6% AHT by Q4. (6) Present phased budget: 'Q1–Q2 +₹75 lakh, Q3–Q4 net neutral via automation'. (7) Monitor actual AHT weekly. Maintains SL while controlling cost overrun.",
  },
  {
    q: "Calculate the capacity savings from implementing a 4-day compressed workweek for 60% of the workforce.",
    a: "Compressed week savings: (1) 60% agents = 120 FTE on 4×10h. (2) Coverage impact: same weekly hours but 15% fewer bodies per day → need +18 FTE to maintain daily coverage. (3) Net headcount increase: +18 FTE. (4) Cost: +₹9 lakh/month. (5) Offset: attrition reduction 12% (saving 14 replacement hires/year = ₹70 lakh). (6) Productivity gain: −5% AHT from better work-life. (7) Net annual saving: ₹55 lakh after headcount adjustment. (8) Pilot 20% first. Balances coverage with retention ROI.",
  },
  {
    q: "In the situation of a client requesting capacity commitment 18 months in advance with volume uncertainty ±20%, how do you structure the plan?",
    a: "Long-lead commitment with uncertainty: (1) Base plan at midpoint forecast. (2) Build +20% upside buffer (pre-approved contingent hires). (3) Downside clause: volume <80% allows 15% headcount reduction via VTO. (4) Milestone reviews every 6 months with true-up. (5) Model scenarios: base, +20%, −20%. (6) Cost: buffer adds ₹2.2 crore/year contingency. (7) Present: 'Guaranteed SL with flexible exit clause; buffer funded at 50% client share'. (8) Secure contract with shared risk. Protects both parties while locking revenue.",
  },
  {
    q: "How do you calculate the training pipeline size needed to support 18% annual growth while keeping training utilization at 85%?",
    a: "Growth pipeline calculation: (1) Net growth 18% on 250 FTE = 45 net hires/year. (2) Throughput 85% → 53 starts/year. (3) Training utilization 85% (max 25 per batch, 6 batches/year) → capacity 127.5 starts/year available (surplus). (4) Required batches: 53 / 25 = 3 batches. (5) Trainer need: 2 (at 85% load). (6) Cost: ₹22.5 lakh/year. (7) Buffer for attrition spike: +8 starts. (8) Scale to Year 3: 68 starts. Ensures training never bottlenecks growth.",
  },
  {
    q: "In the situation of a 15% increase in unplanned shrinkage due to higher sick leave post-pandemic, how do you adjust the 2-year plan?",
    a: "Shrinkage increase adjustment: (1) New shrinkage 38% vs. 30% → gross multiplier 1.61 vs. 1.43. (2) For 280 FTE requirement: extra 35 gross agents. (3) Annual cost: ₹17.5 lakh extra. (4) Mitigate: wellness programs target −4% shrinkage (save 11 FTE). (5) Accelerate hiring 25 extra starts Year 1. (6) Model scenarios with 35–40% range. (7) Present: 'Net +8% headcount need; wellness ROI recovers 35% cost in 18 months'. (8) Monitor monthly unplanned rate. Maintains SL coverage despite health trend.",
  },
  {
    q: "Calculate the headcount reduction possible from increasing maximum occupancy from 82% to 87% across a 350-agent operation.",
    a: "Occupancy increase savings: (1) Current: workload / (hours × 0.82). (2) New: / (hours × 0.87) → 5.8% fewer FTE. (3) 350 agents × 5.8% = 20.3 FTE saved. (4) Annual saving: 20 × ₹50,000 = ₹1 crore. (5) Risk offset: +8% AHT rise and +10% attrition (add back 6 FTE). (6) Net: 14 FTE / ₹70 lakh/year. (7) Recommend pilot 30% of agents first. (8) Monitor quality and burnout metrics. Provides quick cost relief but requires careful change management.",
  },
  {
    q: "In the situation of a new premium client contract requiring dedicated 90/30 SL agents, how do you ring-fence capacity in the overall plan?",
    a: "Premium client ring-fence: (1) Dedicated queue: 65 FTE at 90/30 SL (15% premium over standard). (2) Ring-fence 72 gross FTE (shrinkage buffer). (3) Separate pipeline: specialized training + lower attrition target. (4) Overall plan: add 72 FTE without sharing. (5) Cost: +₹36 lakh/year premium. (6) Offset: higher billing rate. (7) Model cross-training contingency for peaks. (8) Present: 'Dedicated capacity protects SLA penalties; ROI via 22% margin uplift'. Secures high-value contract while isolating risk.",
  },
  {
    q: "How do you calculate the capacity impact of a 10% increase in part-time agents in a peaked operation?",
    a: "Part-time increase impact: (1) Shift mix 40% part-time (0.5 FTE) vs. 30%. (2) Peak coverage gain: +12% flexibility. (3) Required full-time reduction: 18 FTE. (4) Cost saving: part-time benefits 35% lower → ₹9 lakh/month. (5) Attrition penalty: +8% turnover (add 5 replacement hires). (6) Net: 13 FTE equivalent saving / ₹6.5 lakh/month. (7) Validate with coverage simulation (peak fill rate 94% vs. 88%). (8) Recommend 45% max part-time to balance flexibility and stability.",
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
