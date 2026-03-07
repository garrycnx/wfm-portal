import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const stats = [
    { label: "AI Tools", value: "3 Available", color: "text-[#00b4ff]" },
    { label: "Templates", value: "1 Ready", color: "text-purple-500" },
    { label: "Status", value: "Active", color: "text-green-500" },
  ];

  const quickLinks = [
    { label: "AI Schedule Generator", href: "https://schedule1-4.streamlit.app/", external: true },
    { label: "Forecasting Engine", href: "https://forecastingtool1-2.streamlit.app/", external: true },
    { label: "WFM Metrics", href: "/terminology/wfm-metrics", external: false },
    { label: "Interview Prep", href: "/interview/rta", external: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-start justify-center py-16 px-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-5 mb-6">
            <img
              src={session.user?.image || "/user.png"}
              alt="User"
              className="w-16 h-16 rounded-full border-4 border-[#0b1c2d] object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{session.user?.name}</h2>
              <p className="text-gray-500 text-sm">{session.user?.email}</p>
            </div>
          </div>

          <hr className="mb-6 border-gray-100" />

          <h3 className="text-xl font-semibold text-gray-900 mb-1">Welcome to WFM Portal 🎯</h3>
          <p className="text-gray-500 text-sm mb-6">
            You are successfully logged in. Access your tools, dashboards, and analytics below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#f4f6f8] rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="font-bold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-[#f4f6f8] rounded-xl text-sm font-medium text-gray-700 hover:bg-[#00b4ff] hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="text-gray-400 group-hover:text-white">↗</span>
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center justify-between px-4 py-3 bg-[#f4f6f8] rounded-xl text-sm font-medium text-gray-700 hover:bg-[#00b4ff] hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="text-gray-400 group-hover:text-white">→</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
