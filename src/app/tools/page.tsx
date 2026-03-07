const liveTools = [
  {
    name: "AI Schedule Generator V1.4",
    href: "https://schedule1-4.streamlit.app/",
    desc: "Generate optimized shift schedules with SLA and shrinkage constraints.",
  },
  {
    name: "AI Schedule Generator V1.3",
    href: "https://wfm-schedule1-2.streamlit.app/",
    desc: "Previous version of the AI scheduling engine.",
  },
  {
    name: "Forecasting Engine",
    href: "https://forecastingtool1-2.streamlit.app/",
    desc: "Advanced volume forecasting using statistical and AI models.",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[#0b1c2d] mb-3">AI Tools</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Access live AI-powered workforce management tools below. The What-if Simulator is under active development.
          </p>
        </div>

        {/* Live Tools */}
        <div className="space-y-4 mb-12">
          {liveTools.map((t) => (
            <a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-[#0b1c2d] text-lg">{t.name}</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Live
                  </span>
                </div>
                <p className="text-sm text-gray-500">{t.desc}</p>
              </div>
              <span className="text-gray-400 group-hover:text-[#00b4ff] text-xl transition-colors ml-4">↗</span>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🧪</div>
          <h2 className="text-2xl font-bold text-[#0b1c2d] mb-3">What-if Simulator</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
            Model different staffing scenarios, SLA impacts, and shrinkage assumptions in real-time. Coming soon!
          </p>
          <span className="inline-block px-5 py-2 bg-[#f4f6f8] text-gray-500 font-medium rounded-lg text-sm">
            🚧 In Development
          </span>
        </div>
      </div>
    </div>
  );
}
