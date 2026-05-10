export interface BusinessType {
  id: string;
  label: string;
  note: string;
  benchmarkLow: number;
  benchmarkHigh: number;
  benchmarkMid: number;
}

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "restaurant",
    label: "Restaurant / food service",
    note: "Card-present, high volume",
    benchmarkLow: 2.1,
    benchmarkHigh: 2.5,
    benchmarkMid: 2.3,
  },
  {
    id: "retail",
    label: "Retail / shop",
    note: "Card-present, mixed tickets",
    benchmarkLow: 2.2,
    benchmarkHigh: 2.6,
    benchmarkMid: 2.4,
  },
  {
    id: "professional",
    label: "Professional services",
    note: "Invoices, mixed card types",
    benchmarkLow: 2.5,
    benchmarkHigh: 2.9,
    benchmarkMid: 2.7,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    note: "Card-not-present, higher risk",
    benchmarkLow: 2.7,
    benchmarkHigh: 3.1,
    benchmarkMid: 2.9,
  },
  {
    id: "fitness",
    label: "Fitness / wellness",
    note: "Recurring billing, memberships",
    benchmarkLow: 2.3,
    benchmarkHigh: 2.7,
    benchmarkMid: 2.5,
  },
  {
    id: "other",
    label: "Other",
    note: "General benchmark",
    benchmarkLow: 2.4,
    benchmarkHigh: 2.8,
    benchmarkMid: 2.6,
  },
];

export const DEFAULT_RATE = 3.2; // assumed rate when user doesn't know
