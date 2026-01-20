"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type MenuName =
  | "home"
  | "tools"
  | "terminology"
  | "about"
  | "contact"
  | null;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const { data: session } = useSession();

  const toggleMenu = (menu: MenuName) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const closeMenu = () => setOpenMenu(null);

  return (
    <header className="navbar">
      <div className="navbar-logo">WFM Clubs</div>

      <nav className="navbar-menu">
        {/* HOME */}
        <Dropdown
          label="Home"
          isOpen={openMenu === "home"}
          onToggle={() => toggleMenu("home")}
          onClose={closeMenu}
        >
          <DropdownItem href="/" onClick={closeMenu}>
            Overview
          </DropdownItem>
          <DropdownItem href="/" onClick={closeMenu}>
            Why Data Quest
          </DropdownItem>
        </Dropdown>

        {/* AI TOOLS */}
        <Dropdown
          label="AI Tools"
          isOpen={openMenu === "tools"}
          onToggle={() => toggleMenu("tools")}
          onClose={closeMenu}
        >
          <ExternalDropdownItem
            href="https://wfm-schedule1-2.streamlit.app/"
            onClick={closeMenu}
          >
            AI Schedule Generator V1.3
          </ExternalDropdownItem>

          <ExternalDropdownItem
            href="https://schedule1-4.streamlit.app/"
            onClick={closeMenu}
          >
            AI Schedule Generator V1.4
          </ExternalDropdownItem>

          <ExternalDropdownItem
            href="https://forecastingtool1-2.streamlit.app/"
            onClick={closeMenu}
          >
            Forecasting Engine
          </ExternalDropdownItem>

          <DropdownItem href="/tools" onClick={closeMenu}>
            What-if Simulator
          </DropdownItem>

          <DropdownItem href="/demo-videos" onClick={closeMenu}>
            Demo Videos
          </DropdownItem>
        </Dropdown>

        {/* TERMINOLOGY */}
        <Dropdown
          label="Templates | Terminology"
          isOpen={openMenu === "terminology"}
          onToggle={() => toggleMenu("terminology")}
          onClose={closeMenu}
        >
          <DropdownItem
            href="/terminology/wfm-metrics"
            onClick={closeMenu}
          >
            WFM Metrics
          </DropdownItem>
        </Dropdown>

        {/* ABOUT */}
        <Dropdown
          label="About Us"
          isOpen={openMenu === "about"}
          onToggle={() => toggleMenu("about")}
          onClose={closeMenu}
        >
          <DropdownItem href="/about" onClick={closeMenu}>
            Company
          </DropdownItem>
          <DropdownItem href="/about" onClick={closeMenu}>
            Leadership
          </DropdownItem>
          <DropdownItem href="/about" onClick={closeMenu}>
            Careers
          </DropdownItem>
        </Dropdown>

        {/* CONTACT */}
        <Dropdown
          label="Contact Us"
          isOpen={openMenu === "contact"}
          onToggle={() => toggleMenu("contact")}
          onClose={closeMenu}
        >
          <DropdownItem href="/contact" onClick={closeMenu}>
            Contact Us
          </DropdownItem>

          <ExternalDropdownItem
            href="https://chat.whatsapp.com/Jwc6CHZsRyR2l7uP6x1N6n"
            onClick={closeMenu}
          >
            📱 Whatsapp Group
          </ExternalDropdownItem>

          <ExternalDropdownItem
            href="https://www.linkedin.com/in/gurpreetgarry/"
            onClick={closeMenu}
          >
            💼 Linkedin
          </ExternalDropdownItem>

          <ExternalDropdownItem
            href="https://www.youtube.com/@DataQuest_garry"
            onClick={closeMenu}
          >
            ▶️ YouTube Channel
          </ExternalDropdownItem>
        </Dropdown>

        {/* 🔐 AUTH SECTION */}
        <div className="auth-section">
          {!session ? (
            <button className="login-btn" onClick={() => signIn("google")}>
              Login
            </button>
          ) : (
            <div className="profile-menu">
              <img
                src={session.user?.image || "/user.png"}
                alt="User"
                className="profile-pic"
              />

              <div className="profile-dropdown">
                <p className="user-name">{session.user?.name}</p>
                <p className="user-email">{session.user?.email}</p>

                <hr />

                <button
                  className="logout-btn"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

/* ---------- DROPDOWN ---------- */

function Dropdown({
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
    <div className="dropdown">
      <div className="dropdown-btn" onClick={onToggle}>
        {label} <span className="arrow">▼</span>
      </div>

      {isOpen && <div className="dropdown-menu">{children}</div>}
    </div>
  );
}

/* ---------- DROPDOWN ITEM ---------- */

function DropdownItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} className="dropdown-item" onClick={onClick}>
      {children}
    </Link>
  );
}

function ExternalDropdownItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      className="dropdown-item"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
