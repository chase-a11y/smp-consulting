import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Revenue & Payments — SMP Consulting",
  description:
    "Payment processing expertise — processor comparisons, statement audits, fee negotiations, POS evaluation, and contract reviews. Where SMP started.",
};

const included = [
  "Processor comparison & selection",
  "Statement audits & fee negotiation",
  "POS & hardware evaluation",
  "Surcharging & cash discount programs",
  "Contract reviews & exit planning",
  "Chargeback management",
];

const steps = [
  {
    num: "01",
    title: "Statement review",
    desc: "Send us a recent processing statement. We'll break down what you're actually paying and whether it makes sense.",
  },
  {
    num: "02",
    title: "Scope",
    desc: "Written proposal — whether that's a full audit, a contract renegotiation, or a processor switch.",
  },
  {
    num: "03",
    title: "Work",
    desc: "We handle the comparison shopping, the negotiations, and the paperwork. You stay focused on running the business.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "A clear recommendation with numbers attached — what to switch, what to negotiate, and how much you'll save.",
  },
];

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Revenue & Payments"
        title="Where SMP"
        titleEmphasis="started"
        lede="We know payment processing inside and out — the fees, the contracts, the hidden rate bumps, and the games processors play. This is the thing we've done the longest, and it's still one of the fastest ways we save businesses money."
      />

      <section className="services section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>What&rsquo;s included
            </span>
            <h2 style={{ marginTop: 14 }}>
              Everything you get in a payments engagement
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
              Businesses paying too much in processing fees — or owners who
              suspect they are but can&rsquo;t tell from the statement.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Owners who don&rsquo;t understand their processing statements and
              want someone to translate the line items into plain English.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Businesses locked into bad contracts with early termination fees,
              equipment leases, or rate structures that quietly increase over
              time. Anyone shopping for a new POS system and wanting an honest
              comparison — not a sales pitch from the rep.
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
              How a payments engagement works
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
