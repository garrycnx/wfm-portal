import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1c2d] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <h3 className="text-white text-xl font-bold mb-3">WFM Clubs</h3>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            AI-powered workforce management tools and deep-dive resources for contact centre professionals worldwide.
          </p>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/gurpreetgarry/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00b4ff] transition-colors text-xs">in</a>
            <a href="https://www.youtube.com/@DataQuest_garry" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00b4ff] transition-colors text-xs">▶</a>
            <a href="https://chat.whatsapp.com/Jwc6CHZsRyR2l7uP6x1N6n" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00b4ff] transition-colors text-xs">💬</a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/erlang" className="hover:text-[#00b4ff] transition-colors">Erlang C Deep Dive</Link></li>
            <li><Link href="/resources" className="hover:text-[#00b4ff] transition-colors">WFM Knowledge Base</Link></li>
            <li><Link href="/templates" className="hover:text-[#00b4ff] transition-colors">Free Templates</Link></li>
            <li><Link href="/use-cases" className="hover:text-[#00b4ff] transition-colors">WFM Use Cases</Link></li>
            <li><Link href="/terminology/wfm-metrics" className="hover:text-[#00b4ff] transition-colors">WFM Metrics Reference</Link></li>
          </ul>
        </div>

        {/* Interview Prep */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Interview Prep</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/interview/rta" className="hover:text-[#00b4ff] transition-colors">RTA Interview Guide</Link></li>
            <li><Link href="/interview/scheduling" className="hover:text-[#00b4ff] transition-colors">Scheduler Interview Guide</Link></li>
            <li><Link href="/interview/capacity" className="hover:text-[#00b4ff] transition-colors">Capacity Planning Guide</Link></li>
            <li><Link href="/interview/forecasting" className="hover:text-[#00b4ff] transition-colors">Forecasting Guide</Link></li>
            <li><Link href="/demo-videos" className="hover:text-[#00b4ff] transition-colors">Demo Videos</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Connect</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="https://chat.whatsapp.com/Jwc6CHZsRyR2l7uP6x1N6n" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00b4ff] transition-colors">
                WhatsApp Community
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/gurpreetgarry/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00b4ff] transition-colors">
                LinkedIn Profile
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@DataQuest_garry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00b4ff] transition-colors">
                YouTube Channel
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/wfmclub?igsh=MTE5Z2ZzYXpra3lnag==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00b4ff] transition-colors">
                Instagram
              </a>
            </li>
            <li><Link href="/contact" className="hover:text-[#00b4ff] transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-6 text-center text-xs text-gray-500">
        © {year} WFM Clubs. Developed by{" "}
        <a href="https://www.linkedin.com/in/gurpreetgarry/" target="_blank" rel="noopener noreferrer" className="text-[#00b4ff] hover:underline font-medium">
          Gurpreet Singh
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
}
