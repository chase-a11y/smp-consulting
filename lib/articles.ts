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

// Category → accent color for card pills and borders
const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "Getting Found":        { color: "#2C5E3F", bg: "rgba(44, 94, 63, 0.10)" },
  "Website":              { color: "#2D4A6B", bg: "rgba(45, 74, 107, 0.10)" },
  "Lead Gen":             { color: "#9A6E2E", bg: "rgba(200, 146, 75, 0.12)" },
  "Local Marketing":      { color: "#7A5A4A", bg: "rgba(122, 90, 74, 0.10)" },
  "Social Media":         { color: "#7A3A60", bg: "rgba(122, 58, 96, 0.10)" },
  "Email & Retention":    { color: "#4A5570", bg: "rgba(74, 85, 112, 0.10)" },
  "AI & Small Business":  { color: "#4A4A6B", bg: "rgba(74, 74, 107, 0.10)" },
  "Running the Business": { color: "#8B6040", bg: "rgba(139, 96, 64, 0.12)" },
};

export function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || { color: "var(--muted)", bg: "rgba(107, 93, 79, 0.10)" };
}

export function getCategories(): string[] {
  const articles = getAllArticles();
  const cats = [...new Set(articles.map((a) => a.category))].filter(Boolean);
  return cats.sort();
}
