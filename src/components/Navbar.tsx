"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">Data Quest</div>

      <nav className="navbar-menu">
        <Dropdown label="Home">
          <DropdownItem href="/">Overview</DropdownItem>
          <DropdownItem href="/">Why Data Quest</DropdownItem>
        </Dropdown>

        <Dropdown label="AI Tools">
          <DropdownItem href="/tools">AI Schedule Generator</DropdownItem>
          <DropdownItem href="/tools">Forecasting Engine</DropdownItem>
          <DropdownItem href="/tools">What-if Simulator</DropdownItem>
        </Dropdown>

        <Dropdown label="About Us">
          <DropdownItem href="/about">Company</DropdownItem>
          <DropdownItem href="/about">Leadership</DropdownItem>
          <DropdownItem href="/about">Careers</DropdownItem>
        </Dropdown>

        <Dropdown label="Contact Us">
          <DropdownItem href="/contact">Contact Form</DropdownItem>
          <DropdownItem href="/contact">Support</DropdownItem>
        </Dropdown>
      </nav>
    </header>
  );
}

/* ---------- DROPDOWN COMPONENTS ---------- */

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="dropdown-btn">
        {label} <span className="arrow">▼</span>
      </button>

      {open && <div className="dropdown-menu">{children}</div>}
    </div>
  );
}

function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="dropdown-item">
      {children}
    </Link>
  );
}
