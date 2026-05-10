import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <div className="word">
            <span className="amb">SMP</span> Consulting
          </div>
          <p>
            A consulting practice for startups and small businesses. Available
            nationwide.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 6,
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: ".08em",
              color: "rgba(243,233,200,.45)",
            }}
          >
            <span>EST · MMXXIV</span>
            <span>·</span>
            <span>NO RETAINERS</span>
          </div>
        </div>
        <div className="foot-col">
          <h5>Practice</h5>
          <ul>
            <li>
              <Link href="/services/consulting">Operations & Growth</Link>
            </li>
            <li>
              <Link href="/services/marketing">Customer Acquisition</Link>
            </li>
            <li>
              <Link href="/services/payments">Revenue & Payments</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>Read</h5>
          <ul>
            <li>
              <Link href="/library">The Library</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>Contact</h5>
          <ul>
            <li>hello@smpconsulting.com</li>
            <li>By appointment</li>
            <li>Remote</li>
            <li>
              <Link href="/contact">Start an inquiry →</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 SMP Consulting, LLC</span>
        <span>Built on Main Street</span>
      </div>
    </footer>
  );
}
