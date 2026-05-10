import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Team & People — SMP Consulting",
  description:
    "Hiring strategy, role definition, org structure, onboarding, and team alignment for small businesses. Build a team that stays.",
};

const included = [
  "Hiring strategy & first key hires",
  "Role definition & org structure",
  "Employee onboarding & retention",
  "Team alignment & culture building",
  "Compensation benchmarking",
  "Performance review setup",
];

const steps = [
  {
    num: "01",
    title: "Team snapshot",
    desc: "We map your current team — who does what, where the gaps are, and what's working. No judgment, just clarity.",
  },
  {
    num: "02",
    title: "Scope",
    desc: "Written proposal — whether that's a hiring plan, role restructure, or onboarding overhaul.",
  },
  {
    num: "03",
    title: "Work",
    desc: "We build the job descriptions, interview frameworks, org charts, and onboarding docs. You stay focused on your team.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "A clear people plan — who to hire, when, in what order, and how to keep the good ones around.",
  },
];

export default function PeoplePage() {
  return (
    <>
      <PageHeader
        eyebrow="Team & People"
        title="Your team is your"
        titleEmphasis="business"
        lede="The right people in the right seats changes everything. We help you hire well, define roles that make sense, and build a culture where good people want to stay."
      />

      <section className="services section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>What&rsquo;s included
            </span>
            <h2 style={{ marginTop: 14 }}>
              Everything you get in a people engagement
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
              Founders making their first few hires and wanting to get it
              right — not just fill a seat.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Small business owners whose team has outgrown their original
              structure — roles are blurry, people are wearing too many hats,
              and nobody has a clear job description.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Anyone who keeps losing good employees and wants to figure out
              why — before they lose the next one.
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
              How a people engagement works
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
