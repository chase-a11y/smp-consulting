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
    bg: "linear-gradient(135deg, #2C3B2E 0%, #4A6B4E 60%, #6B8F6E 100%)",
    pattern: "cat-grid",
  },
  "Website": {
    bg: "linear-gradient(160deg, #1E2B3A 0%, #2D4A6B 50%, #4A7090 100%)",
    pattern: "cat-code",
  },
  "Lead Gen": {
    bg: "linear-gradient(135deg, #6B4A20 0%, #C8924B 60%, #E0A85A 100%)",
    pattern: "cat-chart",
  },
  "Local Marketing": {
    bg: "linear-gradient(150deg, #3B2E2C 0%, #7A5A4A 40%, #A08060 100%)",
    pattern: "cat-pin",
  },
  "Social Media": {
    bg: "linear-gradient(135deg, #4A2040 0%, #7A3A60 50%, #A05080 100%)",
    pattern: "cat-circles",
  },
  "Email & Retention": {
    bg: "linear-gradient(160deg, #2A3040 0%, #4A5570 50%, #6B7A90 100%)",
    pattern: "cat-lines",
  },
  "AI & Small Business": {
    bg: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4A 50%, #4A4A6B 100%)",
    pattern: "cat-dots",
  },
  "Running the Business": {
    bg: "linear-gradient(150deg, #3A2A1A 0%, #6B4A2A 50%, #8B6040 100%)",
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
