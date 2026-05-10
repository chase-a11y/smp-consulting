export interface Option {
  label: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  pillar: string;
  pillarHref: string;
  questions: Question[];
  recommendations: {
    low: string;
    mid: string;
    high: string;
  };
}

export const CATEGORIES: Category[] = [
  {
    id: "operations",
    name: "Operations",
    icon: "C",
    pillar: "Operations & Growth",
    pillarHref: "/services/consulting",
    questions: [
      {
        id: "ops-1",
        text: "How documented are your core business processes (opening, closing, onboarding, etc.)?",
        options: [
          { label: "Nothing is written down — it's all in my head", score: 1 },
          { label: "A few things are documented, but most aren't", score: 2 },
          { label: "Most processes are documented but need updating", score: 3 },
          { label: "Clear SOPs that the team follows consistently", score: 4 },
        ],
      },
      {
        id: "ops-2",
        text: "If you took two weeks off, how would the business run?",
        options: [
          { label: "It would basically stop", score: 1 },
          { label: "Things would get done but poorly", score: 2 },
          { label: "Most things would be fine, a few would suffer", score: 3 },
          { label: "It would run smoothly without me", score: 4 },
        ],
      },
      {
        id: "ops-3",
        text: "How do you make decisions about what to work on each week?",
        options: [
          { label: "Whatever feels most urgent or whoever yells loudest", score: 1 },
          { label: "I have a rough mental list but it shifts constantly", score: 2 },
          { label: "Weekly priorities based on goals, but I get pulled away", score: 3 },
          { label: "Clear priorities tied to quarterly goals, reviewed weekly", score: 4 },
        ],
      },
    ],
    recommendations: {
      low: "Your business depends too heavily on you. Start by documenting your top 3 daily processes and delegating one task this week. We can help you build the operational foundation to get your time back.",
      mid: "You've got the basics but there are gaps. Focus on creating SOPs for your most repeated tasks and building a simple priority system. A few hours of consulting can save you months of spinning.",
      high: "Your operations are solid. Look for optimization opportunities — can you automate any recurring tasks? Consider whether your processes scale with the growth you're planning.",
    },
  },
  {
    id: "online-presence",
    name: "Online Presence",
    icon: "M",
    pillar: "Customer Acquisition",
    pillarHref: "/services/marketing",
    questions: [
      {
        id: "web-1",
        text: "When someone Googles your business name, what do they find?",
        options: [
          { label: "Nothing useful — or nothing at all", score: 1 },
          { label: "An outdated website or just a social media page", score: 2 },
          { label: "A decent website but it could be better", score: 3 },
          { label: "A professional site that reflects who we are today", score: 4 },
        ],
      },
      {
        id: "web-2",
        text: "How do new customers typically find you?",
        options: [
          { label: "Almost entirely word of mouth", score: 1 },
          { label: "Mostly referrals, occasionally online", score: 2 },
          { label: "Mix of online and offline — some organic search", score: 3 },
          { label: "Multiple channels working together (search, social, referral)", score: 4 },
        ],
      },
      {
        id: "web-3",
        text: "Do you have a Google Business Profile and is it up to date?",
        options: [
          { label: "I don't have one / don't know what that is", score: 1 },
          { label: "I think I claimed it but haven't updated it", score: 2 },
          { label: "Yes, it's set up with basic info", score: 3 },
          { label: "Yes, updated regularly with photos, hours, and posts", score: 4 },
        ],
      },
    ],
    recommendations: {
      low: "You're invisible online — which means you're leaving customers to your competitors. Start with a Google Business Profile and a simple one-page website. We can get you set up in a week.",
      mid: "You have a foundation but you're not getting the traffic you could. Focus on local SEO, updating your website copy, and making it easy for visitors to contact you or buy.",
      high: "Your online presence is working for you. Consider optimizing for conversion — are visitors actually becoming customers? Look into email marketing and content to deepen the relationship.",
    },
  },
  {
    id: "payments",
    name: "Payments & Cash Flow",
    icon: "P",
    pillar: "Revenue & Payments",
    pillarHref: "/services/payments",
    questions: [
      {
        id: "pay-1",
        text: "Do you know your effective payment processing rate?",
        options: [
          { label: "No idea — I just know money goes out", score: 1 },
          { label: "I have a rough sense but haven't calculated it", score: 2 },
          { label: "I know the percentage but not the fee breakdown", score: 3 },
          { label: "I know exactly what I pay and have compared options", score: 4 },
        ],
      },
      {
        id: "pay-2",
        text: "When was the last time you reviewed your processing statement?",
        options: [
          { label: "I've never looked at it", score: 1 },
          { label: "Over a year ago", score: 2 },
          { label: "Within the past year", score: 3 },
          { label: "I review it quarterly or more often", score: 4 },
        ],
      },
      {
        id: "pay-3",
        text: "How confident are you that you're getting a fair rate?",
        options: [
          { label: "Not confident at all — probably overpaying", score: 1 },
          { label: "I suspect I could do better but haven't looked into it", score: 2 },
          { label: "Fairly confident but open to a second opinion", score: 3 },
          { label: "Very confident — I've negotiated or compared recently", score: 4 },
        ],
      },
    ],
    recommendations: {
      low: "You're almost certainly overpaying on processing — most businesses in your position are by 0.5–1.0%. A free statement audit takes 10 minutes of your time and could save you thousands per year.",
      mid: "You're aware but haven't optimized. Request a statement audit to see exactly where your fees are going. Even a small rate improvement compounds fast at your volume.",
      high: "You're on top of your payments. Stay vigilant — processors quietly raise rates. Consider whether your POS hardware is still the best fit and whether surcharging makes sense for your model.",
    },
  },
  {
    id: "customers",
    name: "Customer Engagement",
    icon: "★",
    pillar: "Core",
    pillarHref: "/about",
    questions: [
      {
        id: "cust-1",
        text: "How often do you have direct conversations with customers about their experience?",
        options: [
          { label: "Rarely or never — too busy with everything else", score: 1 },
          { label: "Occasionally, when a problem comes up", score: 2 },
          { label: "Regularly, but informally", score: 3 },
          { label: "Systematically — we actively seek feedback and act on it", score: 4 },
        ],
      },
      {
        id: "cust-2",
        text: "If your best customer left tomorrow, would you know why?",
        options: [
          { label: "Probably not — I'd find out after the fact", score: 1 },
          { label: "I might hear about it but wouldn't have seen it coming", score: 2 },
          { label: "I'd likely know — we have a decent read on satisfaction", score: 3 },
          { label: "Yes — we track satisfaction and address issues proactively", score: 4 },
        ],
      },
      {
        id: "cust-3",
        text: "What happens after a customer's first purchase or engagement?",
        options: [
          { label: "Nothing — we hope they come back", score: 1 },
          { label: "Maybe a thank-you email, but nothing consistent", score: 2 },
          { label: "We have some follow-up but it's manual and inconsistent", score: 3 },
          { label: "Automated follow-up, feedback request, and retention system", score: 4 },
        ],
      },
    ],
    recommendations: {
      low: "This is the biggest lever in your business. Every other improvement means nothing if you're not talking to customers. Start with 3 conversations this week — just ask what's working and what's not.",
      mid: "You're connected but not systematic about it. Build a simple habit: one customer conversation per day, and a quarterly check-in for your top 10 accounts. The insights will drive every other decision.",
      high: "You're doing the most important thing a business can do. Keep it up and look for ways to turn customer insights into product/service improvements and referral opportunities.",
    },
  },
  {
    id: "growth",
    name: "Growth Readiness",
    icon: "↗",
    pillar: "Overall",
    pillarHref: "/services/consulting",
    questions: [
      {
        id: "grow-1",
        text: "Do you have clear revenue goals for the next 12 months?",
        options: [
          { label: "No — I'm focused on surviving, not growing", score: 1 },
          { label: "I have a vague target but no real plan", score: 2 },
          { label: "Yes, and I know roughly how to get there", score: 3 },
          { label: "Yes, with milestones, metrics, and a plan I review regularly", score: 4 },
        ],
      },
      {
        id: "grow-2",
        text: "What's your biggest bottleneck right now?",
        options: [
          { label: "Me — I'm the bottleneck for everything", score: 1 },
          { label: "Cash flow — we can't invest in growth yet", score: 2 },
          { label: "Finding and keeping good people", score: 3 },
          { label: "We're ready to grow — just need a plan", score: 4 },
        ],
      },
      {
        id: "grow-3",
        text: "How would you describe your pricing strategy?",
        options: [
          { label: "I picked a number and haven't changed it", score: 1 },
          { label: "I match competitors but haven't done the math on margins", score: 2 },
          { label: "Priced based on costs with reasonable margins", score: 3 },
          { label: "Value-based pricing reviewed regularly against market", score: 4 },
        ],
      },
    ],
    recommendations: {
      low: "You're in survival mode — which is normal early on, but you need a path out. Start with a simple 90-day plan: what are the 3 things that would make the biggest difference? Focus there.",
      mid: "You have direction but need structure. A growth plan doesn't have to be complex — clear goals, simple metrics, and a weekly check-in goes a long way. This is exactly what our consulting engagements cover.",
      high: "You're ready to accelerate. The question isn't whether to grow but how to grow smart — without losing what makes your business special. Consider whether your ops and team can handle the next stage.",
    },
  },
];

export function getGrade(score: number): { letter: string; color: string } {
  if (score >= 85) return { letter: "A", color: "#4f6b34" };
  if (score >= 70) return { letter: "B", color: "var(--ochre-deep)" };
  if (score >= 50) return { letter: "C", color: "var(--ochre)" };
  return { letter: "D", color: "var(--rust)" };
}

export function getLevel(score: number): "low" | "mid" | "high" {
  if (score >= 75) return "high";
  if (score >= 50) return "mid";
  return "low";
}
