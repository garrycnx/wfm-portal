import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Erlang C Deep Dive | WFM Clubs",
  description: "Master the Erlang C formula — the mathematical engine behind contact centre staffing. Learn derivation, step-by-step application, and worked examples.",
};

const toc = [
  { id: "what-is-erlang", label: "What is Erlang C?" },
  { id: "traffic-intensity", label: "Traffic Intensity (A)" },
  { id: "erlang-c-formula", label: "The Erlang C Formula" },
  { id: "step-by-step", label: "Step-by-Step Calculation" },
  { id: "worked-example", label: "Worked Example" },
  { id: "sensitivity", label: "Sensitivity Analysis" },
  { id: "limitations", label: "Limitations & When to Use" },
];

export default function ErlangPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero */}
      <div className="bg-[#0b1c2d] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-[#00b4ff] text-sm">Erlang C</span>
          </div>
          <span className="inline-block px-3 py-1 bg-[#00b4ff]/20 text-[#00b4ff] text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Formula Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Erlang C Deep Dive
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            The mathematical engine behind every contact centre staffing calculation — from first principles to practical application.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="lg:flex gap-10">
          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Contents</p>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-500 hover:text-[#00b4ff] py-1 transition-colors border-l-2 border-transparent hover:border-[#00b4ff] pl-3"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Article */}
          <article className="flex-1 min-w-0 prose-wfm">
            {/* What is Erlang C */}
            <section id="what-is-erlang" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>What is Erlang C?</h2>
              <p>
                Erlang C is a probability model developed by Danish engineer <strong>Agner Krarup Erlang</strong> in the early 20th century for telephone networks. It calculates the probability that a caller will have to wait before being served, given a certain traffic intensity and number of agents.
              </p>
              <p>
                In contact centres, Erlang C is the <strong>foundation of staffing requirement calculations</strong>. It answers the core WFM question: <em>"How many agents do I need to answer X% of calls within Y seconds?"</em>
              </p>
              <div className="step-block">
                <strong>Key insight:</strong> Erlang C assumes an infinite queue (no callers abandon) and random call arrivals following a Poisson distribution. These assumptions make it slightly optimistic — in practice, abandon rates mean you may need slightly fewer agents than Erlang C suggests at high traffic, or more when abandons are low.
              </div>
            </section>

            {/* Traffic Intensity */}
            <section id="traffic-intensity" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>Traffic Intensity (A) — The Foundation</h2>
              <p>
                Before applying the Erlang C formula, you must calculate <strong>Traffic Intensity</strong>, also called <strong>Erlang A</strong> or simply <strong>A</strong>. This represents the average workload — in Erlangs — placed on the system per unit time.
              </p>

              <div className="formula-block">
                A = λ × h
                <br />
                <span className="text-gray-400 text-xs mt-2 block">
                  λ (lambda) = call arrival rate per second | h = average handling time in seconds
                </span>
              </div>

              <h3>Practical calculation</h3>
              <p>
                In a contact centre, you typically work in 30-minute or 15-minute intervals. To calculate A for a 30-minute interval:
              </p>
              <div className="formula-block">
                A = (Calls in Interval × AHT in seconds) ÷ (Interval Length in seconds)
                <br /><br />
                <span className="text-gray-400 text-sm">Example: 200 calls in 30 min, AHT = 240 seconds</span>
                <br />
                A = (200 × 240) ÷ 1800 = 26.67 Erlangs
              </div>

              <p>
                An Erlang of traffic intensity means one agent would be continuously busy for one hour handling that workload. If A = 26.67, you need <em>at minimum</em> 27 agents just to handle the workload — and more to achieve an acceptable service level.
              </p>

              <div className="overflow-x-auto mt-4">
                <table>
                  <thead>
                    <tr>
                      <th>Calls per 30 min</th>
                      <th>AHT (seconds)</th>
                      <th>Traffic Intensity (A)</th>
                      <th>Min Agents Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>100</td><td>180</td><td>10.0</td><td>11</td></tr>
                    <tr><td>150</td><td>240</td><td>20.0</td><td>21</td></tr>
                    <tr><td>200</td><td>240</td><td>26.7</td><td>27</td></tr>
                    <tr><td>300</td><td>300</td><td>50.0</td><td>51</td></tr>
                    <tr><td>500</td><td>360</td><td>100.0</td><td>101</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Erlang C Formula */}
            <section id="erlang-c-formula" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>The Erlang C Formula</h2>
              <p>
                The Erlang C formula calculates <strong>C(N, A)</strong> — the probability that a call will need to wait (i.e., all N agents are busy).
              </p>

              <div className="formula-block">
                {"C(N, A) = [ (A^N / N!) × (N / (N - A)) ] ÷ [ Σ(k=0 to N-1)(A^k / k!) + (A^N / N!) × (N / (N - A)) ]"}
              </div>

              <p>Where:</p>
              <ul>
                <li><strong>N</strong> = Number of agents (must be greater than A)</li>
                <li><strong>A</strong> = Traffic intensity in Erlangs</li>
                <li><strong>N!</strong> = N factorial (N × (N−1) × ... × 1)</li>
                <li><strong>Σ</strong> = Sum from k=0 to N−1</li>
              </ul>

              <p>
                Once you have C(N, A), the probability that a call is answered within <strong>t seconds</strong> is:
              </p>

              <div className="formula-block">
                P(wait ≤ t) = 1 − C(N, A) × e^(−(N−A) × t/h)
              </div>

              <p>Where <strong>h</strong> is average handling time in seconds and <strong>e</strong> is Euler&apos;s number (~2.71828).</p>

              <h3>Service Level from Erlang C</h3>
              <p>
                Your Service Level target (e.g., 80% of calls answered within 20 seconds) is achieved when:
              </p>
              <div className="formula-block">
                SL% = 1 − C(N, A) × e^(−(N−A) × (target_seconds / AHT_seconds))
              </div>

              <div className="step-block">
                <strong>Why N must be greater than A:</strong> If N ≤ A, the queue grows infinitely (the system is overloaded). Erlang C only applies when N &gt; A. If your traffic intensity exceeds your agent count, SLA will always fail.
              </div>
            </section>

            {/* Step by Step */}
            <section id="step-by-step" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>Step-by-Step: How to Use Erlang C</h2>

              <div className="space-y-5 mt-4">
                {[
                  {
                    step: "1",
                    title: "Gather your inputs",
                    body: "You need three values: forecasted call volume for the interval, average handling time (AHT) in seconds, and your service level target (e.g., 80% of calls answered within 20 seconds).",
                  },
                  {
                    step: "2",
                    title: "Calculate Traffic Intensity (A)",
                    body: "A = (Volume × AHT) ÷ Interval seconds. For a 30-minute interval: A = (Volume × AHT) ÷ 1800.",
                  },
                  {
                    step: "3",
                    title: "Set N = ceiling(A) + 1 as starting point",
                    body: "Start with N = round up A + 1 to ensure N > A. You will increment N until your SL target is met.",
                  },
                  {
                    step: "4",
                    title: "Calculate C(N, A) — the waiting probability",
                    body: "Apply the Erlang C formula with your current N and A. In practice, use a WFM tool or spreadsheet with a built-in Erlang C function — calculating factorials manually for large N is impractical.",
                  },
                  {
                    step: "5",
                    title: "Calculate the resulting Service Level",
                    body: "SL = 1 − C(N, A) × e^(−(N−A) × (target_seconds/AHT)). If this SL meets your target, N is your net staffing requirement.",
                  },
                  {
                    step: "6",
                    title: "Increment N if needed",
                    body: "If SL is below target, add one agent (N = N+1) and recalculate. Repeat until SL target is met. The minimum N that achieves target SL is your net staffing requirement.",
                  },
                  {
                    step: "7",
                    title: "Apply shrinkage to get gross headcount",
                    body: "Gross HC = Net HC ÷ (1 − Shrinkage%). Example: 28 net agents, 25% shrinkage → 28 ÷ 0.75 = 37.3 → 38 agents scheduled.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b4ff] text-white flex items-center justify-center text-sm font-bold">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0b1c2d] mb-1">{s.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Worked Example */}
            <section id="worked-example" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>Worked Example</h2>
              <p><strong>Scenario:</strong> A contact centre forecasts 180 calls for the 10:00–10:30 AM interval. AHT = 270 seconds. Target: 80% of calls answered within 20 seconds.</p>

              <h3>Step 1: Traffic Intensity</h3>
              <div className="formula-block">
                A = (180 × 270) ÷ 1800 = 48,600 ÷ 1800 = <strong>27.0 Erlangs</strong>
              </div>

              <h3>Step 2: Starting Agent Count</h3>
              <p>N starts at 28 (ceiling of 27.0 + 1 = 28)</p>

              <h3>Step 3–6: Iterate to find N</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Agents (N)</th>
                      <th>C(N, A)</th>
                      <th>Service Level</th>
                      <th>Target Met?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>28</td><td>0.932</td><td>14.3%</td><td>No</td></tr>
                    <tr><td>30</td><td>0.786</td><td>37.9%</td><td>No</td></tr>
                    <tr><td>32</td><td>0.572</td><td>60.1%</td><td>No</td></tr>
                    <tr><td>34</td><td>0.341</td><td>76.5%</td><td>No</td></tr>
                    <tr className="bg-green-50 font-semibold"><td>35</td><td>0.255</td><td>82.1%</td><td>Yes ✓</td></tr>
                  </tbody>
                </table>
              </div>

              <p><strong>Net staffing requirement = 35 agents</strong></p>

              <h3>Step 7: Apply Shrinkage (25%)</h3>
              <div className="formula-block">
                Gross HC = 35 ÷ (1 − 0.25) = 35 ÷ 0.75 = <strong>46.7 → 47 agents scheduled</strong>
              </div>

              <div className="step-block">
                <strong>Interpretation:</strong> You need 47 agents on the schedule for the 10:00–10:30 interval. Of those, 35 will be actively available (taking calls), and 12 will be in shrinkage activities (breaks, training, admin). This gives an 82.1% service level — just above the 80% target.
              </div>
            </section>

            {/* Sensitivity */}
            <section id="sensitivity" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>Sensitivity Analysis — How Variables Affect Staffing</h2>

              <p>Understanding how each input drives staffing requirements is critical for WFM planning decisions.</p>

              <h3>Volume Sensitivity</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Volume Change</th>
                      <th>Traffic Intensity</th>
                      <th>Net Agents Req.</th>
                      <th>Incremental Agents</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>−10% (162 calls)</td><td>24.3</td><td>31</td><td>−4</td></tr>
                    <tr className="bg-blue-50"><td>Baseline (180 calls)</td><td>27.0</td><td>35</td><td>—</td></tr>
                    <tr><td>+10% (198 calls)</td><td>29.7</td><td>39</td><td>+4</td></tr>
                    <tr><td>+20% (216 calls)</td><td>32.4</td><td>43</td><td>+8</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>AHT Sensitivity</h3>
              <p>A 10% increase in AHT has a roughly proportional impact on traffic intensity and therefore agent requirements. This is why AHT reduction is one of the highest-leverage levers in WFM.</p>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>AHT Change</th>
                      <th>AHT (seconds)</th>
                      <th>Traffic Intensity</th>
                      <th>Net Agents Req.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>−10%</td><td>243</td><td>24.3</td><td>31</td></tr>
                    <tr className="bg-blue-50"><td>Baseline</td><td>270</td><td>27.0</td><td>35</td></tr>
                    <tr><td>+10%</td><td>297</td><td>29.7</td><td>39</td></tr>
                    <tr><td>+20%</td><td>324</td><td>32.4</td><td>43</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Service Level Target Sensitivity</h3>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>SL Target</th>
                      <th>Net Agents Req.</th>
                      <th>Incremental Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>70% in 20s</td><td>33</td><td>Lower cost, higher queue risk</td></tr>
                    <tr className="bg-blue-50"><td>80% in 20s</td><td>35</td><td>Standard</td></tr>
                    <tr><td>90% in 20s</td><td>38</td><td>+3 agents vs baseline</td></tr>
                    <tr><td>95% in 20s</td><td>41</td><td>+6 agents vs baseline</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Limitations */}
            <section id="limitations" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
              <h2>Limitations & When to Use Erlang C</h2>

              <h3>Assumptions of Erlang C</h3>
              <ul>
                <li><strong>No abandons:</strong> Erlang C assumes all callers wait indefinitely. In reality, callers hang up — which can make real SL better than Erlang C predicts at high occupancy.</li>
                <li><strong>Poisson arrivals:</strong> Assumes random call arrivals, which is generally a good approximation for voice but less accurate for scheduled callbacks or chat.</li>
                <li><strong>Constant AHT:</strong> Uses a single average AHT. In practice, AHT varies by agent skill, time of day, and contact type.</li>
                <li><strong>Homogeneous agents:</strong> Assumes all agents are equally capable, equally available, and handling one contact type.</li>
                <li><strong>Steady state:</strong> Erlang C models a steady-state equilibrium. It does not model the transient behaviour at the start of an interval.</li>
              </ul>

              <h3>When Erlang C is the right model</h3>
              <ul>
                <li>Inbound voice queues with real-time staffing requirements</li>
                <li>Low-to-moderate abandon rates (below ~15%)</li>
                <li>Single-skill or simple multi-skill environments</li>
                <li>Strategic and tactical staffing decisions (not real-time)</li>
              </ul>

              <h3>When to use alternative models</h3>
              <ul>
                <li><strong>High abandons:</strong> Use Erlang A (extended model that accounts for abandonments)</li>
                <li><strong>Asynchronous channels (email, back-office):</strong> Use workload-based models (volume × AHT ÷ productive hours), not Erlang C</li>
                <li><strong>Chat (concurrent sessions):</strong> Modified Erlang models or simulation</li>
                <li><strong>Very small teams (&lt;5 agents):</strong> Erlang C overestimates SL at small N — use simulation</li>
              </ul>

              <div className="step-block">
                <strong>Practitioner tip:</strong> Erlang C gives a net staffing number — the number of agents in ready state. Always remember to layer shrinkage on top to get to scheduled headcount, and attrition + ramp when building a capacity plan from Erlang outputs.
              </div>
            </section>

            {/* Navigation */}
            <div className="bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
              <p className="font-semibold mb-2">Continue Learning</p>
              <p className="text-gray-400 text-sm mb-4">Explore more WFM resources and tools.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/templates" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
                  Free Templates
                </Link>
                <Link href="/resources" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
                  WFM Knowledge Base →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
