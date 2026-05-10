import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Operations & Growth — SMP Consulting",
  description:
    "We sit down with business owners and work through operations, hiring, pricing, and planning. Clear next steps — not 80-page decks.",
};

const included = [
  "Operations review & process cleanup",
  "Growth planning & priority setting",
  "Pricing, margins & cash flow analysis",
  "Hiring strategy & first key hires",
  "Vendor evaluation & negotiations",
  "Business plan reviews",
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Initial conversation to understand your business, what's working, and where you're stuck.",
  },
  {
    num: "02",
    title: "Scope",
    desc: "Written proposal with deliverables, cost, and timeline — no surprises.",
  },
  {
    num: "03",
    title: "Work",
    desc: "2–6 week engagement with regular check-ins. We stay in your loop, not a back office.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Actionable output — a plan, a process, a decision framework. Something you can use Monday morning.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations & Growth"
        title="Clear next steps,"
        titleEmphasis="not 80-page decks"
        lede="We sit down with owners of 5–25 person businesses and work through the stuff that's been on the back burner. No jargon, no frameworks for the sake of frameworks — just clear thinking and a plan you'll actually follow."
      />

      <section className="services section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>What&rsquo;s included
            </span>
            <h2 style={{ marginTop: 14 }}>
              Everything you get in a consulting engagement
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <ul className="check-list">
              {included.map((item) => (
                <li key={item}>
                  <span className="check-icon">
                    <Icon name="check" size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="approach section">
        <div className="wrap">
          <Reveal>
            <h2 style={{ color: "var(--cream)" }}>Who it&rsquo;s for</h2>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 20, lineHeight: 1.7 }}>
              Businesses with 5–25 employees that have outgrown the
              &ldquo;figure it out as we go&rdquo; stage but aren&rsquo;t big
              enough for a full-time COO or strategist.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Owners who are wearing too many hats and know something needs to
              change but can&rsquo;t pinpoint what to fix first.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Businesses at an inflection point — adding a location, bringing on
              a key hire, renegotiating a lease, or deciding whether to grow or
              stay lean.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="page-content">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>Process
            </span>
            <h2 style={{ marginTop: 14 }}>
              How a consulting engagement works
            </h2>
          </Reveal>
          <div className="process-steps">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div className="process-step">
                  <div className="step-num">{s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <section className="inquiry section">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: "var(--cream)" }}>Ready to talk?</h2>
              <p
                style={{
                  color: "rgba(243,233,200,0.78)",
                  fontSize: 17,
                  marginTop: 12,
                  marginBottom: 24,
                }}
              >
                The first conversation is free. No pitch, no pressure.
              </p>
              <Link href="/contact" className="btn btn-on-olive">
                Start an inquiry <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
