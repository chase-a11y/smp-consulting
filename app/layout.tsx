import type { Metadata } from "next";
import { Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SMP Consulting — Startup & small business consulting",
  description:
    "A consulting practice for startups and small businesses. We handle operations, customer acquisition, and revenue so founders can focus on what matters — talking to their customers.",
  openGraph: {
    title: "SMP Consulting — Startup & small business consulting",
    description:
      "We handle operations, customer acquisition, and revenue so founders and small business owners can focus on what matters — their customers.",
    url: "https://smpconsulting.com",
    siteName: "SMP Consulting",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMP Consulting — Startup & small business consulting",
    description:
      "We handle operations, customer acquisition, and revenue so founders and small business owners can focus on what matters — their customers.",
  },
  metadataBase: new URL("https://smpconsulting.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
