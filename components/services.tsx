import Link from "next/link";
import Reveal from "./reveal";

const SERVICES = [
  {
    n: "01",
    glyph: "S",
    title: "Strategy",
    subtitle: "Operations & Customer Acquisition",
    href: "/services/consulting",
    desc: "The operational and growth work that pulls founders away from what matters. We handle planning, marketing, and process \u2014 so you can get back to the conversations that grow your business.",
    items: [
      "Operations review & process cleanup",
      "Growth planning & priority setting",
      "Website, SEO & lead generation",
      "Marketing strategy & customer acquisition",
    ],
  },
  {
    n: "02",
    glyph: "M",
    title: "Margins",
    subtitle: "Revenue & Payments",
    href: "/services/payments",
    desc: "Where SMP started. We know payment processing inside and out \u2014 so you stop bleeding money to hidden fees and spend that energy on your customers instead.",
    items: [
      "Processor comparison & selection",
      "Statement audits & fee negotiation",
      "POS & hardware evaluation",
      "Surcharging & cash discount programs",
    ],
  },
  {
    n: "03",
    glyph: "P",
    title: "People",
    subtitle: "Team & Culture",
    href: "/services/people",
    desc: "Your team is your business. We help you hire the right people, define roles that make sense, and build a culture that keeps good people around.",
    items: [
      "Hiring strategy & first key hires",
      "Role definition & org structure",
      "Employee onboarding & retention",
      "Team alignment & culture building",
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
              <div style={{ fontFamily: "var(--font-mono), ui-monospace, monospace", fontSize: 11, letterSpacing: "0.06em", color: "var(--muted)", marginTop: -10 }}>{s.subtitle}</div>
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
                  color: "var(--ochre)",
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
