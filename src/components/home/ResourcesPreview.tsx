import Link from "next/link";
import FadeInSection from "@/components/motion/FadeInSection";

const resources = [
  {
    href: "/erlang",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889" />
      </svg>
    ),
    tag: "Formula Guide",
    tagColor: "bg-blue-50 text-blue-600",
    title: "Erlang C Deep Dive",
    desc: "Understand the math behind contact centre staffing — from formula derivation to practical application with worked examples.",
    accentColor: "group-hover:text-blue-500",
    borderColor: "group-hover:border-blue-200",
  },
  {
    href: "/resources",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    tag: "Articles",
    tagColor: "bg-purple-50 text-purple-600",
    title: "WFM Knowledge Base",
    desc: "In-depth articles on shrinkage calculation, forecasting models, schedule efficiency, and WFM career progression.",
    accentColor: "group-hover:text-purple-500",
    borderColor: "group-hover:border-purple-200",
  },
  {
    href: "/templates",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5A1.125 1.125 0 0118 5.625M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625" />
      </svg>
    ),
    tag: "Free Templates",
    tagColor: "bg-green-50 text-green-600",
    title: "WFM Spreadsheet Templates",
    desc: "Ready-to-use Google Sheets templates for capacity planning, shrinkage tracking, schedule efficiency, and forecast modelling.",
    accentColor: "group-hover:text-green-500",
    borderColor: "group-hover:border-green-200",
  },
  {
    href: "/use-cases",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    tag: "Real-World",
    tagColor: "bg-orange-50 text-orange-600",
    title: "WFM Use Cases",
    desc: "See how WFM principles solve real contact centre challenges — from BPO scaling to retail peak planning and remote team management.",
    accentColor: "group-hover:text-orange-500",
    borderColor: "group-hover:border-orange-200",
  },
];

export default function ResourcesPreview() {
  return (
    <section className="py-24 px-6 bg-[#f4f6f8]">
      <div className="max-w-6xl mx-auto">
        <FadeInSection direction="up">
          <div className="text-center mb-14">
            <p className="text-[#00b4ff] text-xs font-bold uppercase tracking-widest mb-3">Resources</p>
            <h2 className="text-4xl font-extrabold text-[#0b1c2d] mb-4">
              Everything You Need to Master WFM
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Deep-dive guides, free templates, and real-world use cases — built by WFM practitioners for WFM practitioners.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((r, i) => (
            <FadeInSection key={r.href} direction="up" delay={i * 0.08}>
              <Link
                href={r.href}
                className={`group flex gap-5 bg-white rounded-2xl p-6 border border-gray-100 ${r.borderColor} transition-all duration-300 hover:shadow-lg h-full`}
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 ${r.accentColor} transition-colors duration-300`}>
                  {r.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${r.tagColor} mb-2 w-fit`}>
                    {r.tag}
                  </span>
                  <h3 className="font-bold text-[#0b1c2d] text-base mb-1.5 group-hover:text-[#00b4ff] transition-colors duration-200">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
