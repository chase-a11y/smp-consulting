import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "content/library");

export interface ArticleMeta {
  slug: string;
  title: string;
  meta_description: string;
  category: string;
  series: string;
}

export interface Article extends ArticleMeta {
  body: string; // rendered HTML
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        title: data.title || "",
        meta_description: data.meta_description || "",
        category: data.category || "",
        series: data.series || "",
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Strip any leading H1 that duplicates the title
  const cleaned = content.replace(/^#\s+.*\n+/, "").trim();

  const body = marked.parse(cleaned) as string;

  return {
    slug: data.slug || slug,
    title: data.title || "",
    meta_description: data.meta_description || "",
    category: data.category || "",
    series: data.series || "",
    body,
  };
}

// Category → premium abstract CSS visual for card headers
// Each has a unique background + geometric pattern class
const CATEGORY_VISUALS: Record<string, { bg: string; pattern: string }> = {
  "Getting Found": {
    bg: "linear-gradient(135deg, #3d4030 0%, #5d6240 60%, #7a8050 100%)",
    pattern: "cat-grid",
  },
  "Website": {
    bg: "linear-gradient(160deg, #2a3325 0%, #4a5a3a 50%, #5d6240 100%)",
    pattern: "cat-code",
  },
  "Lead Gen": {
    bg: "linear-gradient(135deg, #4a3a20 0%, #8b6f3a 50%, #d4a04a 100%)",
    pattern: "cat-chart",
  },
  "Local Marketing": {
    bg: "linear-gradient(150deg, #3d4030 0%, #5d6240 40%, #8b7d50 100%)",
    pattern: "cat-pin",
  },
  "Social Media": {
    bg: "linear-gradient(135deg, #3a3020 0%, #6b5a40 50%, #a08050 100%)",
    pattern: "cat-circles",
  },
  "Email & Retention": {
    bg: "linear-gradient(160deg, #2d3328 0%, #4a5040 50%, #6b7d5a 100%)",
    pattern: "cat-lines",
  },
  "AI & Small Business": {
    bg: "linear-gradient(135deg, #1f2a1f 0%, #3a4a3a 50%, #5d6a50 100%)",
    pattern: "cat-dots",
  },
  "Running the Business": {
    bg: "linear-gradient(150deg, #2d2515 0%, #5a4a30 50%, #8b7040 100%)",
    pattern: "cat-blocks",
  },
};

export function getCategoryVisual(category: string) {
  return CATEGORY_VISUALS[category] || {
    bg: "linear-gradient(135deg, #3d4030 0%, #5d6240 100%)",
    pattern: "cat-grid",
  };
}

export function getCategories(): string[] {
  const articles = getAllArticles();
  const cats = [...new Set(articles.map((a) => a.category))].filter(Boolean);
  return cats.sort();
}
