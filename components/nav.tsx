"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Icon } from "./icons";
import LogoMark from "./logo-mark";

const SECTIONS = ["services", "approach", "library", "work", "inquiry"];

const links = [
  { href: "/services", label: "Services" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/library", label: "Library" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const jump = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const offset = 120;
      let current = "";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < offset) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link
          className="brand"
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              jump("top");
            }
          }}
        >
          <LogoMark size={28} fill="var(--cream)" />
          <span className="word">
            <span className="amb">SMP</span> Consulting
          </span>
        </Link>

        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`} role="menubar">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href || pathname.startsWith(l.href + "/") ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            className="btn btn-amber nav-cta"
            style={{ padding: "10px 18px", fontSize: 13 }}
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Start an inquiry
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
