"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { CategoryIcon } from "@/components/category-icons";
import type { ArticleMeta } from "@/lib/articles";

// Category accent colors (mirrors getCategoryColor in lib/articles.ts)
const CAT_COLORS: Record<string, { color: string; bg: string }> = {
  "Getting Found":        { color: "#2C5E3F", bg: "rgba(44, 94, 63, 0.10)" },
  "Website":              { color: "#2D4A6B", bg: "rgba(45, 74, 107, 0.10)" },
  "Lead Gen":             { color: "#9A6E2E", bg: "rgba(200, 146, 75, 0.12)" },
  "Local Marketing":      { color: "#7A5A4A", bg: "rgba(122, 90, 74, 0.10)" },
  "Social Media":         { color: "#7A3A60", bg: "rgba(122, 58, 96, 0.10)" },
  "Email & Retention":    { color: "#4A5570", bg: "rgba(74, 85, 112, 0.10)" },
  "AI & Small Business":  { color: "#4A4A6B", bg: "rgba(74, 74, 107, 0.10)" },
  "Running the Business": { color: "#8B6040", bg: "rgba(139, 96, 64, 0.12)" },
};

function getCatColor(cat: string) {
  return CAT_COLORS[cat] || { color: "var(--muted)", bg: "rgba(107, 93, 79, 0.10)" };
}

interface Props {
  articles: ArticleMeta[];
  categories: string[];
}

export default function LibraryGrid({ articles, categories }: Props) {
  const [tab, setTab] = useState("All");
  const tabs = ["All", ...categories];

  const filtered =
    tab === "All" ? articles : articles.filter((a) => a.category === tab);

  return (
    <>
      <div className="lib-tabs" style={{ marginBottom: 32 }}>
        {tabs.map((t) => {
          const catColor = t !== "All" ? getCatColor(t) : null;
          return (
            <button
              key={t}
              className={"lib-tab " + (tab === t ? "active" : "")}
              onClick={() => setTab(t)}
              style={tab === t && catColor ? { background: catColor.color, borderColor: catColor.color } : undefined}
            >
              {t}
              {t !== "All" && (
                <span style={{
                  marginLeft: 6,
                  fontSize: 11,
                  opacity: 0.6,
                }}>
                  {articles.filter((a) => a.category === t).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Reveal threshold={0.02}>
        <div className="lib-grid">
          {filtered.map((article) => {
            const cat = getCatColor(article.category);
            return (
              <Link
                key={article.slug}
                href={`/library/${article.slug}`}
                className="lib-card"
                style={{ textDecoration: "none", color: "inherit", borderLeftColor: cat.color }}
              >
                <div className="lib-card-body">
                  <span className="lib-card-icon" style={{ color: cat.color, opacity: 0.18 }}>
                    <CategoryIcon category={article.category} size={44} />
                  </span>
                  <div className="kind">
                    <span className="pill" style={{ background: cat.bg, color: cat.color }}>{article.category}</span>
                  </div>
                  <h4>{article.title}</h4>
                  <p>{article.meta_description}</p>
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

      {filtered.length === 0 && (
        <p style={{
          textAlign: "center",
          color: "var(--muted)",
          marginTop: 40,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 13,
        }}>
          No articles in this category yet.
        </p>
      )}
    </>
  );
}
