import Link from "next/link";
import Reveal from "./reveal";
import ScrollImage from "./scroll-image";

export default function Approach() {
  return (
    <section className="approach section" id="approach">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <Reveal>
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
            src="/images/storefront-neighborhood.webp"
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
            <div className="signature">
              <div className="avatar">S</div>
              <div>
                <div className="name">Simpson, Morgan &amp; Powell</div>
                <div className="role">Cofounders · SMP Consulting</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
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
        </Reveal>
      </div>
    </section>
  );
}
