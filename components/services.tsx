import Link from "next/link";
import Reveal from "./reveal";

const SERVICES = [
  {
    n: "01",
    glyph: "C",
    title: "Operations & Growth",
    href: "/services/consulting",
    desc: "The operational work that pulls founders away from their customers. We help with hiring, pricing, planning, and process \u2014 so you can get back to the conversations that matter.",
    items: [
      "Operations review & process cleanup",
      "Growth planning & priority setting",
      "Pricing, margins & cash flow analysis",
      "Hiring strategy & first key hires",
    ],
  },
  {
    n: "02",
    glyph: "M",
    title: "Customer Acquisition",
    href: "/services/marketing",
    desc: "A website that brings customers to you, SEO that gets you found, and marketing that works while you\u2019re busy actually running your business.",
    items: [
      "Website design & development",
      "Local SEO & Google Business Profile",
      "Lead generation & conversion optimization",
      "Email marketing & customer retention",
    ],
  },
  {
    n: "03",
    glyph: "P",
    title: "Revenue & Payments",
    href: "/services/payments",
    desc: "Where SMP started. We know payment processing inside and out \u2014 so you stop bleeding money to hidden fees and spend that energy on your customers instead.",
    items: [
      "Processor comparison & selection",
      "Statement audits & fee negotiation",
      "POS & hardware evaluation",
      "Surcharging & cash discount programs",
    ],
  },
];

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="wrap">
        <Reveal>
        <div className="svc-head">
          <div>
            <span className="eyebrow">
              <span className="dot"></span>What we do
            </span>
            <h2 style={{ marginTop: 14 }}>
              Three things we take off <em style={{ fontStyle: "italic" }}>your plate</em>.
            </h2>
          </div>
          <p className="lede">
            Every hour you spend untangling payments, chasing SEO, or sorting
            out operations is an hour not spent with customers. We handle these
            so you can focus on the conversations that grow your business.
          </p>
        </div>
        </Reveal>

        <Reveal delay={150}>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article key={s.n} className="svc-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="glyph">{s.glyph}</div>
                <div className="num">{s.n} / 03</div>
              </div>
              <h3>{s.title}</h3>
              <p className="desc">{s.desc}</p>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>
                    <span className="tick">→</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={s.href}
                style={{
                  marginTop: "auto",
                  paddingTop: 16,
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 12,
                  letterSpacing: ".06em",
                  color: "var(--amber)",
                  textDecoration: "none",
                }}
              >
                Learn more →
              </Link>
            </article>
          ))}
        </div>
        </Reveal>

      </div>
    </section>
  );
}
