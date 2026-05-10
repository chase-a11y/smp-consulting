"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import type { ArticleMeta } from "@/lib/articles";

// Mirrors CATEGORY_VISUALS from lib/articles.ts (can't import fs-dependent module in client)
const CAT_VIS: Record<string, { bg: string; pattern: string }> = {
  "Getting Found": { bg: "linear-gradient(135deg, #3d4030 0%, #5d6240 60%, #7a8050 100%)", pattern: "cat-grid" },
  "Website": { bg: "linear-gradient(160deg, #2a3325 0%, #4a5a3a 50%, #5d6240 100%)", pattern: "cat-code" },
  "Lead Gen": { bg: "linear-gradient(135deg, #4a3a20 0%, #8b6f3a 50%, #d4a04a 100%)", pattern: "cat-chart" },
  "Local Marketing": { bg: "linear-gradient(150deg, #3d4030 0%, #5d6240 40%, #8b7d50 100%)", pattern: "cat-pin" },
  "Social Media": { bg: "linear-gradient(135deg, #3a3020 0%, #6b5a40 50%, #a08050 100%)", pattern: "cat-circles" },
  "Email & Retention": { bg: "linear-gradient(160deg, #2d3328 0%, #4a5040 50%, #6b7d5a 100%)", pattern: "cat-lines" },
  "AI & Small Business": { bg: "linear-gradient(135deg, #1f2a1f 0%, #3a4a3a 50%, #5d6a50 100%)", pattern: "cat-dots" },
  "Running the Business": { bg: "linear-gradient(150deg, #2d2515 0%, #5a4a30 50%, #8b7040 100%)", pattern: "cat-blocks" },
};

function getVis(cat: string) {
  return CAT_VIS[cat] || { bg: "linear-gradient(135deg, #3d4030 0%, #5d6240 100%)", pattern: "cat-grid" };
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
        {tabs.map((t) => (
          <button
            key={t}
            className={"lib-tab " + (tab === t ? "active" : "")}
            onClick={() => setTab(t)}
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
        ))}
      </div>

      <Reveal>
        <div className="lib-grid">
          {filtered.map((article) => {
            const vis = getVis(article.category);
            return (
              <Link
                key={article.slug}
                href={`/library/${article.slug}`}
                className="lib-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="lib-card-img" style={{ background: vis.bg }}>
                  <div className={`lib-card-pattern ${vis.pattern}`} />
                </div>
                <div className="lib-card-body">
                  <div className="kind">
                    <span className="pill">{article.category}</span>
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
