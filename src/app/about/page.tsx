import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0b1c2d] mb-12 text-center">About the Founder</h1>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Text */}
          <div className="flex-1 bg-[#0b1c2d] rounded-2xl p-8 shadow-2xl text-gray-300 order-2 md:order-1">
            <p className="text-lg leading-relaxed mb-5">
              I am a Workforce Management professional with{" "}
              <span className="text-white font-semibold">15+ years of experience</span> delivering
              forecasting, scheduling, and capacity planning solutions at scale for global enterprises,
              including{" "}
              <span className="text-[#00b4ff]">
                Fidelity Information Services (FIS), TaskUs, Capgemini, Concentrix
              </span>
              , and other industry leaders.
            </p>
            <p className="text-lg leading-relaxed mb-5">
              After years of working inside large operations, I saw how traditional workforce tools
              struggle with real-world complexity. That experience drives my focus on practical,
              scalable, and data-driven workforce solutions that help teams plan better and move faster.
            </p>
            <p className="text-lg leading-relaxed">
              WFM Clubs was born from the belief that WFM knowledge should be accessible, practical,
              and powered by modern AI — not locked behind expensive enterprise tools. Happy Learning!!
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/gurpreetgarry/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#00b4ff] text-white rounded-lg font-semibold text-sm hover:bg-[#0095d8] transition-colors"
              >
                💼 Connect on LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@wfmclubs"
                
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/30 text-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                ▶️ YouTube Channel
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 order-1 md:order-2">
            <Image
              src="/founder.jpg"
              alt="Founder - Gurpreet Singh"
              width={320}
              height={420}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
          {[
            { num: "15+", label: "Years Experience" },
            { num: "5+", label: "Global Enterprises" },
            { num: "AI", label: "Powered Tools" },
            { num: "1K+", label: "Community Members" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <p className="text-3xl font-bold text-[#00b4ff]">{s.num}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
