import { Inter, Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";
import "./resume-triage.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rt-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-rt-serif",
});

export const metadata: Metadata = {
  title: "Recap \u2014 Resume Triage",
};

export default function ResumeTriageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${sourceSerif.variable}`} style={{ fontFamily: inter.style.fontFamily }}>
      {children}
    </div>
  );
}
