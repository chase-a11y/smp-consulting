import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Services — SMP Consulting",
  description:
    "Operations & growth, customer acquisition, and revenue & payments expertise. Three practices, one team — built for businesses with 5–25 employees.",
};

const services = [
  {
    glyph: "C",
    num: "01/03",
    title: "Operations & Growth",
    desc: "We sit down with you and work through the stuff that's been on the back burner — operations, hiring, pricing, planning.",
    href: "/services/consulting",
    items: [
      "Operations review",
      "Growth planning",
      "Pricing & margins",
      "Hiring strategy",
    ],
  },
  {
    glyph: "M",
    num: "02/03",
    title: "Customer Acquisition",
    desc: "Websites that bring in leads, SEO that gets you found locally, and marketing that actually makes sense for a business your size.",
    href: "/services/marketing",
    items: [
      "Website design",
      "Local SEO",
      "Lead generation",
      "Email marketing",
    ],
  },
  {
    glyph: "P",
    num: "03/03",
    title: "Revenue & Payments",
    desc: "Where SMP started. We know payment processing inside and out — the fees, the contracts, and the games processors play.",
    href: "/services/payments",
    items: [
      "Statement audits",
      "Fee negotiation",
      "POS evaluation",
      "Contract reviews",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Three practices,"
        titleEmphasis="one team"
        lede="We started in payments and kept getting pulled into bigger conversations. Now we help small businesses with the three things that cost them the most time and money: operations, marketing, and processing."
      />

      <section className="services section">
        <div className="wrap">
          <Reveal>
            <div className="svc-grid">
              {services.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article className="svc-card">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="glyph">{svc.glyph}</div>
                      <span className="num">{svc.num}</span>
                    </div>
                    <h3>{svc.title}</h3>
                    <p className="desc">{svc.desc}</p>
                    <ul>
                      {svc.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-mono), ui-monospace, monospace",
                        fontSize: 13,
                        marginTop: "auto",
                      }}
                    >
                      Learn more &rarr;
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="inquiry section">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: "var(--cream)" }}>
                Not sure which service you need?
              </h2>
              <p
                style={{
                  color: "rgba(243,233,200,0.78)",
                  fontSize: 17,
                  marginTop: 12,
                  marginBottom: 24,
                }}
              >
                Tell us about your business and we&rsquo;ll point you in the
                right direction.
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
