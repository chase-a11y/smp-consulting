import { getAllArticles, getCategories } from "@/lib/articles";
import LibraryGrid from "./library-grid";

export default function LibraryPage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <>
      <div className="page-header">
        <div className="wrap">
          <span className="eyebrow">
            <span className="dot"></span>The Library
          </span>
          <h1 style={{ marginTop: 14 }}>
            Most of what we know,{" "}
            <em style={{ fontStyle: "italic" }}>free to read</em>
          </h1>
          <p className="lede" style={{ marginTop: 18, maxWidth: "56ch" }}>
            Guides and playbooks we wrote for small business owners. No
            newsletter wall, no &ldquo;download to read more.&rdquo; Just
            straight answers.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="wrap">
          <LibraryGrid articles={articles} categories={categories} />
        </div>
      </div>
    </>
  );
}
