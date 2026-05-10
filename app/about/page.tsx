import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About — SMP Consulting",
  description:
    "SMP Consulting brings practical, hands-on consulting to startups and small businesses. Learn about our approach, principles, and how we work.",
};

const principles = [
  {
    title: "We're small on purpose.",
    body: "We're not a big agency with layers of account managers. We keep our client load small so we can give honest answers and real attention to every engagement.",
  },
  {
    title: "Plain-language deliverables.",
    body: "You'll get clear write-ups, working websites, and straightforward recommendations. Not 60-page strategy decks that sit in a drawer.",
  },
  {
    title: "Project-based, not retainer-based.",
    body: "Every engagement has a defined scope, a clear price, and a finish line. No silent monthly charges, no auto-renewing contracts you forgot about.",
  },
  {
    title: "We'll tell you if you don't need us.",
    body: "If there's a free resource that solves your problem, we'll point you to it. If another firm is a better fit, we'll make the introduction. We'd rather earn trust than bill hours.",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We talk. You tell us what's going on, we ask questions, we figure out if we're the right fit.",
  },
  {
    num: "02",
    title: "Scope",
    desc: "We write a clear proposal with what we'll do, what it costs, and when it's done.",
  },
  {
    num: "03",
    title: "Execute",
    desc: "We do the work. Regular check-ins, no disappearing acts.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "You get something you can use — a report, a website, a negotiated contract. Not a deck.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Built to stay small, built to stay"
        titleEmphasis="honest"
        lede="SMP Consulting is a small consulting practice — not a big agency. We work directly with business owners on the stuff that actually matters: operations, customer acquisition, and revenue."
      />

      {/* Origin story */}
      <section className="approach section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>Our story
            </span>
            <h2 style={{ color: "var(--cream)", marginTop: 14 }}>
              How SMP Consulting started
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="honest-card" style={{ marginTop: 36 }}>
              <span className="stamp">The origin</span>
              <p>
                SMP started as a simple comparison tool. Chase
                Morgan had spent years in the payments industry and kept hearing
                the same thing from business owners: &ldquo;I have no idea if
                I&apos;m getting a good deal on processing.&rdquo; So he built a
                resource to help people compare rates, read the fine print, and
                stop overpaying.
              </p>
              <p>
                But the conversations never stayed on payments. Business owners
                would ask about their website, their ad spend, their lease
                negotiations, their hiring process. They didn&apos;t need a
                payments consultant — they needed someone who could sit across
                the table and help them think through the whole business.
              </p>
              <p>
                That&apos;s how SMP Consulting became what it is today: a
                small, hands-on consulting practice that helps small businesses
                make better decisions about the things that cost them the most
                money and time. No big team, no overhead, no fluff. Just direct
                work with people who run businesses.
              </p>
              <div className="signature">
                <div className="avatar">C</div>
                <div>
                  <div className="name">Chase Morgan</div>
                  <div className="role">Founder</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="services section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>Our principles
            </span>
            <h2 style={{ marginTop: 14 }}>How we work</h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 32,
            }}
          >
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="principle-card">
                  <h4 style={{ fontSize: 17, marginBottom: 8 }}>{p.title}</h4>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <div className="page-content">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>The process
            </span>
            <h2 style={{ marginTop: 14 }}>What an engagement looks like</h2>
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

      {/* CTA */}
      <section className="inquiry section">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: "var(--cream)" }}>Ready to talk?</h2>
              <p
                style={{
                  color: "var(--cream-muted, rgba(253,250,243,0.72))",
                  marginTop: 12,
                  fontSize: 17,
                }}
              >
                We read every inquiry personally.
              </p>
              <Link
                href="/contact"
                className="btn btn-on-olive"
                style={{ marginTop: 24 }}
              >
                Start an inquiry <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
