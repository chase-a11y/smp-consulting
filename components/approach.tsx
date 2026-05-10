import Link from "next/link";
import Reveal from "./reveal";
import ScrollImage from "./scroll-image";

const PRINCIPLES = [
  {
    n: "P1",
    h: "We're small on purpose.",
    p: "We're not a big agency with junior staff doing the work. When you hire us, you get us. That means smaller client loads, more attention, and honest answers about what we can and can't do.",
  },
  {
    n: "P2",
    h: "Plain-language deliverables.",
    p: "Every project ends with something you can actually use \u2014 a clear write-up, a working website, a negotiated contract. Not a 60-page strategy doc that collects dust.",
  },
  {
    n: "P3",
    h: "Project-based, not retainer-based.",
    p: "We work in defined engagements with clear scope and a clear end date. No silent monthly charges, no vague \u2018strategic partnerships\u2019 that bill forever.",
  },
  {
    n: "P4",
    h: "We'll tell you if you don't need us.",
    p: "If a free resource solves your problem, we'll point you to it. If another firm is a better fit, we'll say so. We'd rather earn trust than invoice hours.",
  },
];

export default function Approach() {
  return (
    <section className="approach section" id="approach">
      <div className="wrap approach-grid">
        <Reveal>
        <div>
          <span className="eyebrow">
            <span className="dot"></span>How we work
          </span>
          <h2 style={{ marginTop: 14 }}>
            Built to stay small, built to stay{" "}
            <em style={{ fontStyle: "italic" }}>honest</em>.
          </h2>
          <p className="lede" style={{ marginTop: 18 }}>
            We&apos;re not trying to scale into a 50-person agency. We&apos;re
            trying to be the consultant who helps you get back to the work you
            started this for.
          </p>

          <ScrollImage
            src="/images/storefront-neighborhood.png"
            alt="Neighborhood shop with bicycle and hanging plants"
            width={1024}
            height={1024}
            effect="parallax"
            className="approach-image"
          />

          <div className="honest-card" style={{ marginTop: 36 }}>
            <span className="stamp">A note from the founders</span>
            <h4>
              &ldquo;We&apos;d rather do great work for a few businesses than
              mediocre work for a lot of them.&rdquo;
            </h4>
            <p>
              SMP started as a tool to help businesses compare payment
              processors. The more we talked to founders and owners, the more
              we realized: they didn&apos;t have a strategy problem. They had a
              bandwidth problem. They knew what mattered — talking to customers,
              closing deals, building something real — they just couldn&apos;t
              get to it because everything else was in the way. So we built a
              practice around clearing the path.
            </p>
            <div className="signature">
              <div className="avatar">S</div>
              <div>
                <div className="name">Simpson, Morgan &amp; Powell</div>
                <div className="role">Cofounders · SMP Consulting</div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className="principles">
          {PRINCIPLES.map((pr) => (
            <div className="principle" key={pr.n}>
              <div className="pn">{pr.n}</div>
              <div>
                <h4>{pr.h}</h4>
                <p>{pr.p}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                color: "var(--ochre)",
                textDecoration: "none",
              }}
            >
              More about us →
            </Link>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
