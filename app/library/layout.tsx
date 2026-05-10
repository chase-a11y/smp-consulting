import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — SMP Consulting",
  description:
    "Free guides, teardowns, and templates for small business owners. Payment processing, local SEO, hiring, and more — no email gate required.",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
