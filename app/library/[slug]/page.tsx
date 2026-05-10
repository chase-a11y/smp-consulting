import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getCategoryVisual } from "@/lib/articles";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — SMP Consulting`,
    description: article.meta_description,
  };
}

// Map categories to relevant service pages
const CATEGORY_CTA: Record<string, { label: string; href: string }> = {
  "Getting Found": { label: "customer acquisition", href: "/services/marketing" },
  "Website": { label: "customer acquisition", href: "/services/marketing" },
  "Lead Gen": { label: "customer acquisition", href: "/services/marketing" },
  "Local Marketing": { label: "customer acquisition", href: "/services/marketing" },
  "Social Media": { label: "customer acquisition", href: "/services/marketing" },
  "Email & Retention": { label: "customer acquisition", href: "/services/marketing" },
  "AI & Small Business": { label: "operations & growth", href: "/services/consulting" },
  "Running the Business": { label: "operations & growth", href: "/services/consulting" },
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cta = CATEGORY_CTA[article.category] || {
    label: "our services",
    href: "/services",
  };

  const vis = getCategoryVisual(article.category);

  return (
    <article className="article-page">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <Reveal>
          <div className="article-header">
            <Link
              href="/library"
              className="article-back"
            >
              &larr; The Library
            </Link>
            <div className="article-hero-img" style={{ background: vis.bg }}>
              <div className={`lib-card-pattern ${vis.pattern}`} />
            </div>
            <span className="pill" style={{ marginTop: 20, display: "inline-block" }}>
              {article.category}
            </span>
            <h1 className="article-title">{article.title}</h1>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="article-cta">
            <p>
              Need help with this?
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={cta.href} className="btn btn-amber" style={{ textDecoration: "none" }}>
                Learn about {cta.label}
                <Icon name="arrow-right" size={14} />
              </Link>
              <Link href="/contact" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                Start an inquiry
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="article-footer">
          <Link href="/library">
            &larr; Back to the Library
          </Link>
        </div>
      </div>
    </article>
  );
}
