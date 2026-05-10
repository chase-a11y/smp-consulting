import Link from "next/link";
import { Icon } from "./icons";
import Reveal from "./reveal";
import { getAllArticles, getCategoryColor } from "@/lib/articles";

// Show one article from each category for variety on the homepage
const FEATURED_SLUGS = [
  "competitor-ranks-above-me",     // Getting Found
  "people-leave-in-seconds",       // Website
  "ads-not-converting",            // Lead Gen
  "posting-daily-no-results",      // Social Media
  "emails-not-getting-opened",     // Email & Retention
  "guilty-about-raising-prices",   // Running the Business
];

export default function Library() {
  const allArticles = getAllArticles();
  const featured = FEATURED_SLUGS
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter(Boolean);

  const articles = featured.length >= 6
    ? featured.slice(0, 6)
    : [...featured, ...allArticles.filter((a) => !FEATURED_SLUGS.includes(a.slug))].slice(0, 6);

  return (
    <section className="library section" id="library">
      <div className="wrap">
        <Reveal>
          <div className="lib-head">
            <div>
              <div className="tmg-mark">
                <span className="tmg-icon">TMG</span>
                <span className="tmg-label">The Merchant Guide</span>
              </div>
              <h2 style={{ marginTop: 14 }}>
                Most of what we know,{" "}
                <em style={{ fontStyle: "italic" }}>free to read</em>.
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Guides and playbooks we wrote for small business owners. No
                newsletter wall, no &ldquo;download to read more.&rdquo; Just
                straight answers.
              </p>
            </div>
            <div style={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: ".06em",
              color: "var(--muted)",
              alignSelf: "end",
            }}>
              {allArticles.length} articles
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="lib-grid">
            {articles.map((article) => {
              const cat = getCategoryColor(article!.category);
              return (
                <Link
                  key={article!.slug}
                  href={`/library/${article!.slug}`}
                  className="lib-card"
                  style={{ textDecoration: "none", color: "inherit", borderLeftColor: cat.color }}
                >
                  <div className="lib-card-body">
                    <div className="kind">
                      <span className="pill" style={{ background: cat.bg, color: cat.color }}>{article!.category}</span>
                    </div>
                    <h4>{article!.title}</h4>
                    <p>{article!.meta_description}</p>
                    <div className="meta">
                      <span>
                        Read <span className="arr">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>

        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
          <Link href="/library" className="btn btn-ghost">
            Browse the Blog
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
