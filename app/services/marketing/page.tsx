import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Customer Acquisition — SMP Consulting",
  description:
    "Websites, local SEO, lead generation, and marketing strategy sized for small businesses. No 50-person agency playbook — just what works for your size.",
};

const included = [
  "Website design & development",
  "Local SEO & Google Business Profile",
  "Lead generation & conversion optimization",
  "Email marketing & customer retention",
  "Social media setup & strategy",
  "Analytics & reporting",
];

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "We look at what you have — your site, your listings, your ad spend — and figure out what's working and what's wasting money.",
  },
  {
    num: "02",
    title: "Scope",
    desc: "Written proposal with deliverables, cost, and timeline. You'll know exactly what you're getting.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We build or fix what needs building. Websites, landing pages, SEO foundations, email sequences — whatever the scope calls for.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Everything goes live with tracking in place so you can see what's actually driving results.",
  },
];

export default function MarketingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Customer Acquisition"
        title="Marketing that makes sense"
        titleEmphasis="for your size"
        lede="You don't need a 50-person agency's playbook. You need a website that works, SEO that gets you found locally, and a marketing approach that fits your budget and your business."
      />

      <section className="services section">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>What&rsquo;s included
            </span>
            <h2 style={{ marginTop: 14 }}>
              Everything you get in a marketing engagement
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
              Local businesses that need a web presence that actually works — not
              just a digital business card that hasn&rsquo;t been updated since
              2019.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Businesses spending money on ads but sending traffic to a page that
              doesn&rsquo;t convert. You&rsquo;re paying for clicks — let&rsquo;s
              make them count.
            </p>
            <p style={{ color: "rgba(243,233,200,0.78)", marginTop: 16, lineHeight: 1.7 }}>
              Owners who know they need marketing but don&rsquo;t know where to
              start, what to prioritize, or how much to spend.
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
              How a marketing engagement works
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
