import Link from "next/link";
import Reveal from "./reveal";
import ScrollImage from "./scroll-image";

const FOCUS_AREAS = [
  {
    title: "Chargebacks & processing fees eating your margins?",
    desc: "Most business owners have no idea what they\u2019re actually paying in processing fees \u2014 or that they could be paying less. We audit your setup, cut the junk fees, and get you on a system that works.",
    cta: "Get a payment audit",
  },
  {
    title: "Customers can\u2019t find you online?",
    desc: "You\u2019re doing great work, but nobody\u2019s seeing it. We build fast, conversion-focused websites and local marketing strategies that actually get the right people through your door.",
    cta: "Fix your online presence",
  },
  {
    title: "Team out of sync?",
    desc: "Misalignment kills small businesses quietly. We work with you on team structure, role clarity, and communication \u2014 so your people are pulling in the same direction instead of around each other.",
    cta: "Align your team",
  },
];

export default function Work() {
  return (
    <section className="work section" id="work">
      <div className="wrap">
        <Reveal>
        <div className="svc-head" style={{ marginBottom: 32 }}>
          <div>
            <span className="eyebrow">
              <span className="dot"></span>Our work
            </span>
            <h2 style={{ marginTop: 14 }}>
              Sound <em style={{ fontStyle: "italic" }}>familiar</em>?
            </h2>
          </div>
          <p className="lede">
            These are the problems we hear about every day. If any of them hit
            close to home, you&apos;re exactly who we built this for.
          </p>
        </div>
        </Reveal>

        <Reveal delay={100}>
          <ScrollImage
            src="/images/desk-journal.webp"
            alt="Rustic desk with open journal, coffee, and vintage camera in warm light"
            width={1024}
            height={1024}
            effect="reveal-up"
            className="work-image"
          />
        </Reveal>

        <Reveal delay={150}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.title}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "background 0.2s",
              }}
            >
              <h3 style={{ fontSize: 20 }}>{area.title}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
                {area.desc}
              </p>
              <Link href="/contact" style={{
                marginTop: "auto",
                paddingTop: 12,
                borderTop: "1px dashed var(--line)",
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 11,
                color: "var(--ochre-deep)",
                letterSpacing: ".06em",
                display: "flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}>
                {area.cta} →
              </Link>
            </div>
          ))}
        </div>
        </Reveal>

        <p style={{
          marginTop: 32,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 12,
          color: "var(--muted)",
          letterSpacing: ".06em",
          textAlign: "center",
        }}>
          Want to be one of our first published case studies?{" "}
          <Link href="/contact" style={{ textDecoration: "underline" }}>
            Let&apos;s talk →
          </Link>
        </p>
      </div>
    </section>
  );
}
