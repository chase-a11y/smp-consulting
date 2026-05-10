import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getCategoryColor } from "@/lib/articles";
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
  "Getting Found": { label: "Strategy", href: "/services/consulting" },
  "Website": { label: "Strategy", href: "/services/consulting" },
  "Lead Gen": { label: "Strategy", href: "/services/consulting" },
  "Local Marketing": { label: "Strategy", href: "/services/consulting" },
  "Social Media": { label: "Strategy", href: "/services/consulting" },
  "Email & Retention": { label: "Strategy", href: "/services/consulting" },
  "AI & Small Business": { label: "Strategy", href: "/services/consulting" },
  "Running the Business": { label: "Strategy", href: "/services/consulting" },
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cta = CATEGORY_CTA[article.category] || {
    label: "our services",
    href: "/services",
  };

  const cat = getCategoryColor(article.category);

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
            <span className="pill" style={{ marginTop: 20, display: "inline-block", background: cat.bg, color: cat.color }}>
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
