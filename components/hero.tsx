import Link from "next/link";
import { Icon } from "./icons";
import HeroIllustration from "./hero-illustration";

export default function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="wrap hero-grid">
        <div className="hero-meta">
          <span className="eyebrow">
            <span className="dot"></span>Startup & small business consulting · Est.
            2026
          </span>
          <h1>
            <span className="ital">Strategy</span>.{" "}
            <span className="mono-word">Margins</span>.{" "}
            <span className="human">People</span>.
          </h1>
          <p className="lede">
            Whether you&apos;re a startup finding your first customers or a small
            business ready to grow — the most important thing you can do is have
            real conversations with the people you serve. We take strategy,
            margins, and people off your plate so you can focus on what moves
            the needle.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-amber" href="/contact">
              Tell us about your business
              <Icon name="arrow-right" size={14} />
            </Link>
            <Link className="btn btn-ghost" href="/library">
              Browse the Blog
            </Link>
          </div>
          <div className="hero-tags">
            <span>Strategy & Operations</span>
            <span>Revenue & Margins</span>
            <span>Team & People</span>
          </div>
        </div>

        <HeroIllustration />
      </div>

      <div className="wrap">
        <div className="hero-bar">
          <div className="hero-bar-item">
            <div className="k">What we are</div>
            <div className="v">A consulting practice for startups & small businesses</div>
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
