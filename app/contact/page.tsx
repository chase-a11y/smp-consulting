import type { Metadata } from "next";
import Inquiry from "@/components/inquiry";

export const metadata: Metadata = {
  title: "Contact — SMP Consulting",
  description:
    "Start an inquiry with SMP Consulting. Tell us about your business and we'll respond within two business days.",
};

export default function ContactPage() {
  return <Inquiry />;
}
