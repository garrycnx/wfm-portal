"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type MenuName =
  | "home"
  | "tools"
  | "resources"
  | "terminology"
  | "interview"
  | "about"
  | "contact"
  | null;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = (menu: MenuName) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b1c2d] text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide text-white hover:text-[#00b4ff] transition-colors">
          WFM Clubs
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavDropdown label="Home" isOpen={openMenu === "home"} onToggle={() => toggleMenu("home")} onClose={closeAll}>
            <DropdownItem href="/" onClick={closeAll}>Overview</DropdownItem>
          </NavDropdown>

          <NavDropdown label="AI Tools" isOpen={openMenu === "tools"} onToggle={() => toggleMenu("tools")} onClose={closeAll}>
            <ExternalItem href="https://wfm-schedule1-2.streamlit.app/" onClick={closeAll}>AI Schedule Generator V1.3</ExternalItem>
            <ExternalItem href="https://schedule1-4.streamlit.app/" onClick={closeAll}>AI Schedule Generator V1.4</ExternalItem>
            <ExternalItem href="https://github.com/garrycnx/wfm-portal/releases/download/v2.1/AI_Schedule_Generator.exe" onClick={closeAll}>AI Scheduling Desktop App V2.1</ExternalItem>
            <ExternalItem href="https://forecastingtool1-2.streamlit.app/" onClick={closeAll}>Forecasting Engine</ExternalItem>
            <DropdownItem href="/tools" onClick={closeAll}>What-if Simulator</DropdownItem>
            <DropdownItem href="/demo-videos" onClick={closeAll}>Demo Videos</DropdownItem>
          </NavDropdown>

          <NavDropdown label="Resources" isOpen={openMenu === "resources"} onToggle={() => toggleMenu("resources")} onClose={closeAll}>
            <DropdownItem href="/erlang" onClick={closeAll}>Erlang C Deep Dive</DropdownItem>
            <DropdownItem href="/resources" onClick={closeAll}>WFM Knowledge Base</DropdownItem>
            <DropdownItem href="/templates" onClick={closeAll}>Free Templates</DropdownItem>
            <DropdownItem href="/use-cases" onClick={closeAll}>WFM Use Cases</DropdownItem>
            <DropdownItem href="/terminology/wfm-metrics" onClick={closeAll}>WFM Metrics Reference</DropdownItem>
          </NavDropdown>

          <NavDropdown label="Interview Preparation" isOpen={openMenu === "interview"} onToggle={() => toggleMenu("interview")} onClose={closeAll}>
            <DropdownItem href="/interview/rta" onClick={closeAll}>RTA Interview</DropdownItem>
            <DropdownItem href="/interview/scheduling" onClick={closeAll}>Scheduler Interview</DropdownItem>
            <DropdownItem href="/interview/capacity" onClick={closeAll}>Capacity Planning Interview</DropdownItem>
            <DropdownItem href="/interview/forecasting" onClick={closeAll}>Forecasting Interview</DropdownItem>
          </NavDropdown>

          <NavDropdown label="About Us" isOpen={openMenu === "about"} onToggle={() => toggleMenu("about")} onClose={closeAll}>
            <DropdownItem href="/about" onClick={closeAll}>About the Founder</DropdownItem>
          </NavDropdown>

          <NavDropdown label="Contact" isOpen={openMenu === "contact"} onToggle={() => toggleMenu("contact")} onClose={closeAll}>
            <DropdownItem href="/contact" onClick={closeAll}>Contact Us</DropdownItem>
            <ExternalItem href="https://chat.whatsapp.com/Jwc6CHZsRyR2l7uP6x1N6n" onClick={closeAll}>📱 WhatsApp Group</ExternalItem>
            <ExternalItem href="https://www.linkedin.com/in/gurpreetgarry/" onClick={closeAll}>💼 LinkedIn</ExternalItem>
            <ExternalItem href="https://www.youtube.com/@DataQuest_garry" onClick={closeAll}>▶️ YouTube</ExternalItem>
            <ExternalItem href="https://www.instagram.com/wfmclub?igsh=MTE5Z2ZzYXpra3lnag==&utm_source=ig_contact_invite" onClick={closeAll}>📸 Instagram</ExternalItem>
          </NavDropdown>
        </nav>

        {/* Auth + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Auth */}
          <div className="hidden lg:block">
            <AuthSection session={session} onClose={closeAll} />
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded text-white hover:bg-white/10 transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0f2438] border-t border-white/10 px-4 pb-4">
          <MobileSection label="Home">
            <MobileItem href="/" onClick={closeAll}>Overview</MobileItem>
          </MobileSection>

          <MobileSection label="AI Tools">
            <MobileItem href="https://wfm-schedule1-2.streamlit.app/" external onClick={closeAll}>AI Schedule Generator V1.3</MobileItem>
            <MobileItem href="https://schedule1-4.streamlit.app/" external onClick={closeAll}>AI Schedule Generator V1.4</MobileItem>
            <MobileItem href="https://forecastingtool1-2.streamlit.app/" external onClick={closeAll}>Forecasting Engine</MobileItem>
            <MobileItem href="/tools" onClick={closeAll}>What-if Simulator</MobileItem>
            <MobileItem href="/demo-videos" onClick={closeAll}>Demo Videos</MobileItem>
          </MobileSection>

          <MobileSection label="Resources">
            <MobileItem href="/erlang" onClick={closeAll}>Erlang C Deep Dive</MobileItem>
            <MobileItem href="/resources" onClick={closeAll}>Knowledge Base</MobileItem>
            <MobileItem href="/templates" onClick={closeAll}>Free Templates</MobileItem>
            <MobileItem href="/use-cases" onClick={closeAll}>WFM Use Cases</MobileItem>
            <MobileItem href="/terminology/wfm-metrics" onClick={closeAll}>WFM Metrics</MobileItem>
          </MobileSection>

          <MobileSection label="Interview Preparation">
            <MobileItem href="/interview/rta" onClick={closeAll}>RTA Interview</MobileItem>
            <MobileItem href="/interview/scheduling" onClick={closeAll}>Scheduler Interview</MobileItem>
            <MobileItem href="/interview/capacity" onClick={closeAll}>Capacity Planning</MobileItem>
            <MobileItem href="/interview/forecasting" onClick={closeAll}>Forecasting</MobileItem>
          </MobileSection>

          <MobileSection label="About & Contact">
            <MobileItem href="/about" onClick={closeAll}>About the Founder</MobileItem>
            <MobileItem href="/contact" onClick={closeAll}>Contact Us</MobileItem>
          </MobileSection>

          <div className="pt-3 border-t border-white/10 mt-2">
            <AuthSection session={session} onClose={closeAll} mobile />
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- AUTH SECTION ---------- */

function AuthSection({
  session,
  onClose,
  mobile = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  onClose: () => void;
  mobile?: boolean;
}) {
  if (!session) {
    return (
      <button
        onClick={() => { signIn("google"); onClose(); }}
        className={`px-4 py-2 rounded-md bg-white text-[#0b1c2d] font-semibold text-sm hover:bg-[#00b4ff] hover:text-white transition-colors ${mobile ? "w-full" : ""}`}
      >
        Login
      </button>
    );
  }

  return (
    <div className="group relative">
      <img
        src={session.user?.image || "/user-avatar.png"}
        alt="User"
        className="w-9 h-9 rounded-full border-2 border-white cursor-pointer object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute right-0 top-11 w-64 bg-white text-gray-900 rounded-xl shadow-2xl p-3 hidden group-hover:block z-50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={session.user?.image || "/user-avatar.png"}
            className="w-11 h-11 rounded-full object-cover"
            alt="user"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-semibold text-sm">{session.user?.name}</p>
            <p className="text-xs text-gray-500">{session.user?.email}</p>
          </div>
        </div>
        <hr className="my-2" />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/* ---------- DESKTOP DROPDOWN ---------- */

function NavDropdown({
  label,
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseLeave={onClose}>
      <button
        className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-[#00b4ff] hover:bg-white/10 transition-colors"
        onClick={onToggle}
        onMouseEnter={onToggle}
      >
        {label}
        <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-xl shadow-2xl py-1 min-w-[220px] z-50 border border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00b4ff] transition-colors">
      {children}
    </Link>
  );
}

function ExternalItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[#00b4ff] transition-colors">
      {children}
    </a>
  );
}

/* ---------- MOBILE MENU ---------- */

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center py-2 text-sm font-semibold text-white"
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && <div className="pl-3">{children}</div>}
    </div>
  );
}

function MobileItem({ href, children, onClick, external = false }: { href: string; children: React.ReactNode; onClick: () => void; external?: boolean }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  );
}
