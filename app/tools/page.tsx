import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Free Tools — SMP Consulting",
  description:
    "Free tools for startups and small businesses. Check your business health, build SOPs, and find out if you're overpaying on payment processing.",
};

const TOOLS = [
  {
    n: "01",
    glyph: "S",
    title: "Business Health Check",
    href: "/tools/health-check",
    desc: "A 3-minute self-assessment across five areas of your business. Find out where you're strong — and where you're leaking time and money.",
    tag: "15 questions · 3 min",
  },
  {
    n: "02",
    glyph: "M",
    title: "Payment Fee Estimator",
    href: "/tools/fee-estimator",
    desc: "See what you're paying in processing fees vs what you should be paying. Upload your statement for a free audit.",
    tag: "Free statement audit",
  },
  {
    n: "03",
    glyph: "P",
    title: "SOP Template Builder",
    href: "/tools/sop-builder",
    desc: "Pick your business type and operational area, and get a starter operating procedure you can use today. No signup required.",
    tag: "Instant download",
  },
];

export default function ToolsHub() {
  return (
    <section className="services section" style={{ paddingTop: "clamp(120px, 14vh, 180px)" }}>
      <div className="wrap">
        <Reveal>
          <div className="svc-head">
            <div>
              <span className="eyebrow">
                <span className="dot"></span>Free tools
              </span>
              <h1 style={{ marginTop: 14, fontSize: "clamp(32px, 4vw, 52px)" }}>
                Figure it out <em style={{ fontStyle: "italic" }}>before</em> you
                call anyone.
              </h1>
            </div>
            <p className="lede">
              We built these because every founder deserves straight answers —
              even before they hire a consultant. Use them, share them, come back
              when you&apos;re ready.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="svc-grid">
            {TOOLS.map((t) => (
              <Link
                key={t.n}
                href={t.href}
                className="svc-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div className="glyph">{t.glyph}</div>
                  <div className="num">{t.n} / 03</div>
                </div>
                <h3>{t.title}</h3>
                <p className="desc">{t.desc}</p>
                <span
                  style={{
                    marginTop: "auto",
                    paddingTop: 16,
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 12,
                    letterSpacing: ".06em",
                    color: "var(--ochre)",
                  }}
                >
                  {t.tag} →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
