"use client";

export default function HeroOptions() {
  return (
    <>
      <style>{`
        .variant-label {
          padding: 20px 0 10px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 14px;
          letter-spacing: .1em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--ochre-deep);
          border-top: 3px solid var(--ochre);
          margin-top: 24px;
        }
        .hero-v.on-dark .hero { color: var(--cream); }
        .hero-v.on-dark h1 { color: var(--cream); }
        .hero-v.on-dark h1 .ital { color: var(--ochre); }
        .hero-v.on-dark .lede { color: rgba(241,236,226,.78); }
        .hero-v.on-dark .eyebrow { color: rgba(241,236,226,.55); }
        .hero-v.on-dark .eyebrow .dot { background: var(--ochre); }
        .hero-v.on-dark .hero-tags span {
          color: rgba(241,236,226,.65);
          border-color: rgba(241,236,226,.2);
          background: rgba(241,236,226,.08);
        }
        .hero-v.on-dark .hero-tags span:hover {
          background: rgba(241,236,226,.15);
          color: var(--cream);
          border-color: rgba(241,236,226,.3);
        }
        .hero-v.on-dark .hero-bar {
          border-color: rgba(241,236,226,.18);
          background: rgba(0,0,0,.12);
        }
        .hero-v.on-dark .hero-bar-item { border-color: rgba(241,236,226,.18); }
        .hero-v.on-dark .hero-bar-item .k { color: rgba(241,236,226,.55); }
        .hero-v.on-dark .hero-bar-item .v { color: var(--cream); }
        .hero-v.on-dark .btn-ghost {
          color: var(--cream);
          border-color: rgba(241,236,226,.3);
        }
        .hero-v.on-dark .btn-ghost:hover {
          background: rgba(241,236,226,.1);
        }
        .hero-v.on-dark .storefront { border-color: rgba(241,236,226,.2); }
        .hero-v.on-dark .sf-caption { color: rgba(241,236,226,.4); }
        .hero-v .hero .eyebrow,
        .hero-v .hero h1,
        .hero-v .hero .lede,
        .hero-v .hero-cta,
        .hero-v .hero-tags,
        .hero-v .storefront,
        .hero-v .hero-bar-item {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      <div style={{
        background: "var(--cream)",
        padding: "48px 0 24px",
        textAlign: "center",
        borderBottom: "1px solid var(--line)",
      }}>
        <h1 style={{ fontSize: 28 }}>Hero Direction — Pick One</h1>
        <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 15 }}>
          Same content, four background treatments. Scroll to compare.
        </p>
      </div>

      {/* A: Olive/Sage */}
      <div className="wrap"><div className="variant-label">A — Olive / Sage</div></div>
      <div className="hero-v on-dark">
        <HeroContent bg="var(--pine)" />
      </div>

      {/* B: Dark Ink */}
      <div className="wrap"><div className="variant-label">B — Dark Ink (Editorial)</div></div>
      <div className="hero-v on-dark">
        <HeroContent bg="var(--ink)" />
      </div>

      {/* C: Photo + Overlay (approximated with gradient) */}
      <div className="wrap"><div className="variant-label">C — Photo + Overlay (placeholder — no image yet)</div></div>
      <div className="hero-v on-dark">
        <HeroContent bg="linear-gradient(135deg, rgba(63,69,40,.92) 0%, rgba(31,29,20,.85) 100%)" />
      </div>

      {/* D: Gradient (Olive → Paper) */}
      <div className="wrap"><div className="variant-label">D — Gradient (Olive → Paper)</div></div>
      <div className="hero-v on-dark">
        <HeroContent bg="linear-gradient(180deg, var(--pine-deep) 0%, var(--pine) 40%, var(--pine-soft) 70%, var(--paper) 100%)" />
      </div>

      <div style={{ height: 80, background: "var(--cream)" }} />
    </>
  );
}

function HeroContent({ bg }: { bg: string }) {
  return (
    <section
      className="hero section"
      style={{ background: bg, borderBottom: "1px solid var(--line)" }}
    >
      <div className="wrap hero-grid">
        <div className="hero-meta">
          <span className="eyebrow">
            <span className="dot"></span>Startup & small business consulting ·
            Est. 2026
          </span>
          <h1>
            Talk to your <span className="ital">customers</span>.
            <br />
            We&apos;ll handle the rest.
          </h1>
          <p className="lede">
            Whether you&apos;re a startup finding your first customers or a small
            business ready to grow — the most important thing you can do is have
            real conversations with the people you serve. We take payments,
            marketing, and operations off your plate so you can focus on what
            moves the needle.
          </p>
          <div className="hero-cta">
            <span className="btn btn-amber">
              Tell us about your business →
            </span>
            <span className="btn btn-ghost">Browse the Blog</span>
          </div>
          <div className="hero-tags">
            <span>Operations & Growth</span>
            <span>Customer Acquisition</span>
            <span>Revenue & Payments</span>
          </div>
        </div>
        <div className="storefront">
          <div className="sf-awning"></div>
          <div className="sf-shop"></div>
          <div className="sf-window l"></div>
          <div className="sf-window r"></div>
          <div className="sf-door"></div>
          <div className="sf-sign">open</div>
          <div className="sf-caption">illustration · main st. shop</div>
        </div>
      </div>
      <div className="wrap">
        <div className="hero-bar">
          <div className="hero-bar-item">
            <div className="k">What we are</div>
            <div className="v">
              A consulting practice for startups & small businesses
            </div>
          </div>
          <div className="hero-bar-item">
            <div className="k">Who we serve</div>
            <div className="v">Founders and owners with 1–25 people</div>
          </div>
          <div className="hero-bar-item">
            <div className="k">How we work</div>
            <div className="v">Project-based, no retainers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
