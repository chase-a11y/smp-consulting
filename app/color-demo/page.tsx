"use client";

import { useEffect } from "react";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Approach from "@/components/approach";
import Work from "@/components/work";
import Inquiry from "@/components/inquiry";

export default function ColorDemo() {
  useEffect(() => {
    document.body.classList.add("warm-mode");
    return () => document.body.classList.remove("warm-mode");
  }, []);

  return (
    <>
      <style>{WARM_CSS}</style>
      <Hero />
      <Services />
      <Approach />
      {/* Library section removed — uses server-only fs module */}
      <Work />
      <Inquiry />
    </>
  );
}

const WARM_CSS = `
/* ================================================================
   WARM & APPROACHABLE — Coffee-shop feel
   One continuous warm room. Gentle tints instead of dark/light
   alternations. Amber as the accent. No jarring transitions.
   ================================================================ */

/* --- Base: keep the warm cream foundation --- */
body.warm-mode {
  --paper: #f7f1de;
  --paper-2: #f3ecce;
  background: #f7f1de !important;
}

/* --- Nav: warm and transparent --- */
body.warm-mode .nav {
  background: rgba(247, 241, 222, 0.92);
  backdrop-filter: blur(12px);
  border-bottom-color: rgba(31, 29, 20, 0.06);
}

/* --- Hero: subtle warm golden wash --- */
body.warm-mode .hero {
  background: linear-gradient(
    180deg,
    #f0e4c0 0%,
    #f4ebd0 40%,
    #f7f1de 100%
  ) !important;
  border-bottom-color: rgba(31, 29, 20, 0.06);
}
body.warm-mode .hero h1 .ital { color: var(--amber); }
body.warm-mode .hero-bar {
  background: rgba(212, 160, 74, 0.06);
  border-color: rgba(31, 29, 20, 0.08);
}
body.warm-mode .hero-bar-item { border-color: rgba(31, 29, 20, 0.08); }
body.warm-mode .storefront { border-color: rgba(31, 29, 20, 0.08); }

/* --- Services: clean warm cream, cards get a soft lift --- */
body.warm-mode .services {
  background: #f7f1de !important;
  border-bottom: none;
}
body.warm-mode .svc-grid {
  background: rgba(212, 160, 74, 0.04);
  border-color: rgba(31, 29, 20, 0.06);
}
body.warm-mode .svc-card {
  background: #faf5e4;
  border: 1px solid rgba(31, 29, 20, 0.05);
}
body.warm-mode .svc-card:hover {
  background: #fff9ec;
  box-shadow: 0 4px 20px rgba(212, 160, 74, 0.1);
}
body.warm-mode .svc-card .glyph { background: var(--amber); color: #2b1f08; }
body.warm-mode .svc-card .tick { color: var(--amber); }
body.warm-mode .svc-card a { color: var(--amber-deep) !important; }

/* --- Approach: warm latte instead of olive --- */
body.warm-mode .approach {
  background: #ede3c3 !important;
  color: var(--ink);
  border-bottom: 1px solid rgba(31, 29, 20, 0.06);
}
body.warm-mode .approach h2 { color: var(--ink) !important; }
body.warm-mode .approach .lede { color: var(--ink-2) !important; }
body.warm-mode .approach .eyebrow { color: var(--muted) !important; }
body.warm-mode .honest-card {
  background: rgba(247, 241, 222, 0.7);
  border-color: rgba(31, 29, 20, 0.08);
}
body.warm-mode .honest-card .stamp { background: var(--amber); color: #2b1f08; }
body.warm-mode .honest-card h4 { color: var(--ink) !important; }
body.warm-mode .honest-card p { color: var(--ink-2); }
body.warm-mode .signature { border-top-color: rgba(31, 29, 20, 0.08); }
body.warm-mode .signature .avatar { background: var(--amber); color: #2b1f08; }
body.warm-mode .signature .name { color: var(--ink); }
body.warm-mode .signature .role { color: var(--muted); }
body.warm-mode .principle { border-bottom-color: rgba(31, 29, 20, 0.08); }
body.warm-mode .principle .pn { color: rgba(31, 29, 20, 0.25); }
body.warm-mode .principle h4 { color: var(--ink) !important; }
body.warm-mode .principle p { color: var(--ink-2) !important; }
body.warm-mode .approach a { color: var(--amber-deep) !important; }

/* --- Library: back to base warm cream --- */
body.warm-mode .library {
  background: #f7f1de !important;
  border-bottom-color: rgba(31, 29, 20, 0.06);
}
body.warm-mode .lib-tab {
  border-color: rgba(31, 29, 20, 0.12);
  color: var(--muted);
}
body.warm-mode .lib-tab.active {
  background: var(--amber);
  color: #2b1f08;
  border-color: var(--amber);
}
body.warm-mode .lib-card {
  background: #faf5e4;
  border-color: rgba(31, 29, 20, 0.06);
}
body.warm-mode .lib-card:hover {
  background: #fff9ec;
  box-shadow: 0 4px 20px rgba(212, 160, 74, 0.1);
}
body.warm-mode .lib-card .kind .pill { background: var(--amber); color: #2b1f08; }
body.warm-mode .lib-card.feature {
  background: #faf5e4;
  border-color: rgba(31, 29, 20, 0.08);
  box-shadow: 0 4px 24px rgba(212, 160, 74, 0.12);
}
body.warm-mode .lib-card.feature .feature-art {
  background: var(--amber);
}

/* --- Work: gentle warm tint (matches approach) --- */
body.warm-mode .work {
  background: #f3ecce !important;
  border-bottom-color: rgba(31, 29, 20, 0.06);
}
body.warm-mode .work-row { border-bottom-color: rgba(31, 29, 20, 0.06); }
body.warm-mode .work-row:hover { background: rgba(212, 160, 74, 0.06); }
body.warm-mode .work-row .arrow {
  border-color: rgba(31, 29, 20, 0.15);
  color: var(--ink);
}
body.warm-mode .work-row:hover .arrow {
  background: var(--amber);
  color: #2b1f08;
  border-color: var(--amber);
}
body.warm-mode .work a { color: var(--amber-deep); }

/* --- Inquiry: warm sand instead of olive-deep --- */
body.warm-mode .inquiry {
  background: #e8dfc0 !important;
  color: var(--ink);
}
body.warm-mode .inquiry .eyebrow { color: var(--muted); }
body.warm-mode .inquiry h2 { color: var(--ink); }
body.warm-mode .inq-side p { color: var(--ink-2); }
body.warm-mode .contact-row .item {
  border-top-color: rgba(31, 29, 20, 0.08);
}
body.warm-mode .contact-row .item:last-child {
  border-bottom-color: rgba(31, 29, 20, 0.08);
}
body.warm-mode .contact-row .item .k { color: var(--muted); }
body.warm-mode .contact-row .item .v { color: var(--ink); }

/* Form card: slightly lighter island */
body.warm-mode .inq-card {
  background: #f7f1de;
  color: var(--ink);
}
body.warm-mode .inq-progress span.done { background: var(--amber); }

/* --- Footer: warm dark brown, not pure black --- */
body.warm-mode .foot {
  background: #3a3526;
  color: rgba(243, 233, 200, 0.82);
  border-top: 1px solid rgba(31, 29, 20, 0.06);
}
body.warm-mode .foot a { color: rgba(243, 233, 200, 0.82); }
body.warm-mode .foot a:hover { color: var(--cream); }
body.warm-mode .foot-brand .word { color: var(--cream); }
body.warm-mode .foot-brand .word .amb { color: var(--amber); }
body.warm-mode .foot-brand p { color: rgba(243, 233, 200, 0.5); }
body.warm-mode .foot-col h5 { color: rgba(243, 233, 200, 0.45); }
body.warm-mode .foot-bottom {
  border-top-color: rgba(243, 233, 200, 0.08);
  color: rgba(243, 233, 200, 0.35);
}

/* --- Buttons: amber primary, warm ghost --- */
body.warm-mode .btn-on-olive {
  background: var(--amber);
  color: #2b1f08;
  border-color: var(--amber);
}
body.warm-mode .btn-ghost {
  color: var(--ink);
  border-color: rgba(31, 29, 20, 0.18);
}
body.warm-mode .btn-ghost:hover {
  background: rgba(212, 160, 74, 0.08);
  border-color: rgba(212, 160, 74, 0.3);
}
`;
