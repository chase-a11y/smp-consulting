import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog — SMP Consulting",
  description:
    "Lessons, observations, and the occasional rant from working with small businesses. Posts coming soon.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Dispatches from"
        titleEmphasis="Main Street"
        lede="Lessons, observations, and the occasional rant from working with small businesses."
      />

      <div className="page-content">
        <div className="wrap">
          <Reveal>
          <div className="empty-state">
            <div className="icon-wrap">
              <Icon name="doc" size={28} />
            </div>
            <h3>We&apos;re working on our first posts.</h3>
            <p>
              We&apos;ve got a few drafts in the works. In the meantime, check out
              our free guides and templates on the Blog.
            </p>
            <Link href="/library" className="btn btn-ghost">
              Browse the Blog
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
