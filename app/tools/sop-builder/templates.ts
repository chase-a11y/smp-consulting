export interface SOPTemplate {
  businessType: string;
  area: string;
  title: string;
  purpose: string;
  scope: string;
  steps: { title: string; details: string[] }[];
  tips: string[];
}

export const BUSINESS_TYPES = [
  { id: "restaurant", label: "Restaurant / food service" },
  { id: "retail", label: "Retail / shop" },
  { id: "professional", label: "Professional services" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "fitness", label: "Fitness / wellness" },
  { id: "general", label: "General / other" },
];

export const AREAS = [
  { id: "open-close", label: "Daily open/close procedures" },
  { id: "hiring", label: "Hiring & onboarding" },
  { id: "customer-service", label: "Customer service & complaints" },
  { id: "inventory", label: "Inventory & ordering" },
  { id: "financial", label: "Financial close & reporting" },
  { id: "safety", label: "Safety & compliance" },
];

function getTemplate(bizType: string, area: string): SOPTemplate {
  const key = `${bizType}:${area}`;

  const templates: Record<string, SOPTemplate> = {
    "restaurant:open-close": {
      businessType: "Restaurant",
      area: "Daily Open/Close",
      title: "Restaurant Daily Opening & Closing Procedures",
      purpose: "Ensure consistent daily operations, food safety compliance, and a clean handoff between shifts.",
      scope: "All front-of-house and back-of-house staff responsible for opening or closing the restaurant.",
      steps: [
        { title: "Opening — 60 minutes before service", details: [
          "Disarm alarm, turn on lights and HVAC",
          "Walk the floor: check cleanliness, table setup, restroom supplies",
          "Check voicemail and online reservation changes",
          "Review prep list and confirm all stations are stocked",
          "Turn on POS system, verify drawer count, open registers",
          "Review today's specials and 86'd items with staff",
          "Unlock front door at scheduled open time",
        ]},
        { title: "Pre-shift meeting (5 min)", details: [
          "Review covers expected and any large parties",
          "Announce specials, features, and menu changes",
          "Assign sections and sidework",
          "Address any issues from previous shift",
        ]},
        { title: "Closing — after last guest", details: [
          "Lock front door, flip sign, turn off open lights",
          "Complete all sidework checklists by station",
          "Run end-of-day POS report, reconcile cash drawers",
          "Walk coolers: check temps, label and date all prep",
          "Clean and sanitize all food contact surfaces",
          "Take out trash, mop floors, restock supplies",
          "Set alarm, lock all doors, confirm cameras are recording",
        ]},
      ],
      tips: [
        "Post the opening/closing checklist at each station so no one has to memorize it",
        "Rotate who opens and closes so multiple staff know the process",
        "Keep a shift log notebook at the host stand for notes between shifts",
      ],
    },

    "retail:open-close": {
      businessType: "Retail",
      area: "Daily Open/Close",
      title: "Retail Store Daily Opening & Closing Procedures",
      purpose: "Maintain a consistent customer experience, accurate cash handling, and a clean, organized sales floor.",
      scope: "All staff responsible for opening or closing the store.",
      steps: [
        { title: "Opening — 30 minutes before doors open", details: [
          "Disarm alarm, turn on lights, music, and displays",
          "Walk the sales floor: straighten merchandise, restock featured displays",
          "Check fitting rooms for left-behind items",
          "Turn on POS, count cash drawer, verify starting balance",
          "Check email and voicemail for delivery or schedule changes",
          "Review daily sales goal and any promotions running",
          "Unlock front door at scheduled open time",
        ]},
        { title: "Closing — after last customer", details: [
          "Lock front door, turn off window displays",
          "Walk sales floor: rehang, refold, return items to proper sections",
          "Restock shelves from backroom if needed for next day",
          "Run end-of-day POS report, count and reconcile cash drawer",
          "Process any online orders received today",
          "Empty fitting rooms and return items",
          "Take out trash, vacuum/sweep, turn off lights and music",
          "Set alarm and lock all exits",
        ]},
      ],
      tips: [
        "Keep a printed checklist at the register — check off each item before leaving",
        "Take a photo of cash count and attach to daily report",
        "Write tomorrow's priority task on the whiteboard before you leave",
      ],
    },

    "professional:open-close": {
      businessType: "Professional Services",
      area: "Daily Start/End Routine",
      title: "Daily Start & End-of-Day Routine",
      purpose: "Start each day focused on priorities and end each day with a clean handoff to tomorrow.",
      scope: "Firm owner and any support staff.",
      steps: [
        { title: "Morning routine (first 30 minutes)", details: [
          "Review calendar: today's meetings, deadlines, and commitments",
          "Check email and messages — respond only to time-sensitive items",
          "Review task list and identify the top 3 priorities for the day",
          "Block focus time on calendar for deep work",
          "Check project management tool for client updates or pending items",
        ]},
        { title: "End-of-day routine (last 15 minutes)", details: [
          "Review what got done vs what was planned",
          "Update project status for any active engagements",
          "Send any end-of-day client communications",
          "Set top 3 priorities for tomorrow",
          "Clear inbox to under 10 items (archive, defer, or respond)",
          "Log billable hours if applicable",
        ]},
      ],
      tips: [
        "Don't check email first — review your priorities before opening the inbox",
        "Keep a 'waiting on' list so nothing falls through cracks",
        "Schedule a weekly review (Friday afternoon) to plan the next week",
      ],
    },

    "restaurant:hiring": {
      businessType: "Restaurant",
      area: "Hiring & Onboarding",
      title: "Restaurant Hiring & New Employee Onboarding",
      purpose: "Hire the right people consistently and get them productive quickly without overwhelming existing staff.",
      scope: "Managers responsible for hiring and training new front-of-house or back-of-house staff.",
      steps: [
        { title: "Post the position", details: [
          "Write a clear job description with role, hours, pay range, and culture note",
          "Post on Indeed, Poached (if applicable), and local Facebook groups",
          "Set a review deadline (don't leave it open indefinitely)",
        ]},
        { title: "Screen and interview", details: [
          "Review applications within 48 hours (good candidates move fast)",
          "Phone screen for schedule fit, experience, and availability (10 min)",
          "In-person interview: situational questions, walk them through a rush scenario",
          "If possible, do a working interview (paid trial shift)",
        ]},
        { title: "Onboarding — first week", details: [
          "Day 1: Paperwork, tour, introduce to team, review employee handbook",
          "Day 1: Shadow an experienced employee for a full shift",
          "Day 2-3: Hands-on with guidance — let them do the work with a buddy nearby",
          "Day 4-5: Solo with check-ins — manager checks in at start, mid, and end of shift",
          "End of week: Sit down for 15-minute feedback conversation",
        ]},
        { title: "30-day check-in", details: [
          "Review performance: What's going well? What needs work?",
          "Ask them: What's confusing? What would help you do your job better?",
          "Confirm they're a good fit — or address issues directly",
        ]},
      ],
      tips: [
        "The best time to hire is before you desperately need someone",
        "Treat the interview like a two-way conversation — they're evaluating you too",
        "Write down your training process once and reuse it for every new hire",
      ],
    },

    "general:hiring": {
      businessType: "General",
      area: "Hiring & Onboarding",
      title: "Small Business Hiring & Onboarding Process",
      purpose: "Build a repeatable hiring process that finds good people and gets them up to speed without consuming all your time.",
      scope: "Business owner or hiring manager responsible for bringing on new team members.",
      steps: [
        { title: "Define the role", details: [
          "Write down exactly what this person will do in their first 30 days",
          "List must-have skills vs nice-to-have",
          "Set a pay range based on market research (Glassdoor, Indeed data)",
          "Decide: full-time, part-time, or contract?",
        ]},
        { title: "Post and source", details: [
          "Write a job post that sounds like your business (not corporate HR)",
          "Post on 2-3 relevant platforms (Indeed, LinkedIn, industry-specific)",
          "Ask your network — your best hires often come from referrals",
          "Set a deadline to stop accepting applications",
        ]},
        { title: "Interview process", details: [
          "Phone screen (15 min): Can they do the job? Are they available?",
          "In-person interview (30-45 min): Situational questions, culture fit",
          "Optional: Paid trial task or working session",
          "Check references — actually call, don't just collect names",
        ]},
        { title: "Onboarding — first two weeks", details: [
          "Before day 1: Prepare their workspace, accounts, and tools",
          "Day 1: Paperwork, tour, team intro, overview of how things work",
          "Week 1: Shadow you or a senior person, start with small tasks",
          "Week 2: Take on real responsibilities with daily check-ins",
          "End of week 2: Feedback conversation — what's working, what's not",
        ]},
      ],
      tips: [
        "Write a one-page 'how we work' doc — share it before day 1",
        "Assign a buddy for the first two weeks (even if that buddy is you)",
        "Don't skip the 30-day check-in — that's where most fixable issues surface",
      ],
    },

    "general:customer-service": {
      businessType: "General",
      area: "Customer Service & Complaints",
      title: "Customer Service & Complaint Handling Procedure",
      purpose: "Handle customer issues consistently, turn complaints into loyalty opportunities, and prevent recurring problems.",
      scope: "All customer-facing staff.",
      steps: [
        { title: "Acknowledge immediately", details: [
          "Respond within 4 hours for digital inquiries, immediately in person",
          "Thank them for reaching out — even if it's a complaint",
          "Let them know you take it seriously and will follow up",
        ]},
        { title: "Listen and understand", details: [
          "Let them explain fully without interrupting",
          "Ask clarifying questions: What happened? When? What would make it right?",
          "Repeat back what you heard to confirm understanding",
          "Never argue, deflect, or blame the customer",
        ]},
        { title: "Resolve", details: [
          "If you can fix it now, fix it now",
          "If not, give a specific timeline ('I'll have an answer by Friday at 3pm')",
          "Offer something concrete: refund, replacement, discount, or simply a sincere apology",
          "Empower staff to resolve issues up to $X without manager approval",
        ]},
        { title: "Follow up and log", details: [
          "Follow up within 24 hours to confirm the issue is resolved",
          "Log the complaint: date, issue, resolution, customer feedback",
          "Review complaint logs monthly — look for patterns",
          "If the same issue comes up 3+ times, fix the root cause",
        ]},
      ],
      tips: [
        "A resolved complaint creates a more loyal customer than no complaint at all",
        "Give staff a dollar amount they can comp without asking permission — it speeds everything up",
        "Keep a simple spreadsheet of complaints — patterns become obvious fast",
      ],
    },

    "general:inventory": {
      businessType: "General",
      area: "Inventory & Ordering",
      title: "Inventory Management & Ordering Procedure",
      purpose: "Maintain optimal stock levels, prevent stockouts and overstock, and keep ordering predictable.",
      scope: "Staff responsible for inventory tracking and purchase ordering.",
      steps: [
        { title: "Set par levels", details: [
          "For each product/item, set a minimum quantity (par level)",
          "Base par levels on average weekly usage + 20% buffer",
          "Review and adjust par levels monthly based on actual sales",
        ]},
        { title: "Regular counts", details: [
          "Schedule inventory counts: weekly for fast-moving items, monthly for slow",
          "Use a consistent count sheet or app — don't rely on memory",
          "Count at the same time each period (before opening is best)",
          "Record counts and compare to expected quantities",
        ]},
        { title: "Ordering process", details: [
          "When any item hits par level, add to the order list",
          "Consolidate orders by vendor — place orders on set days (e.g., Tuesdays)",
          "Compare prices quarterly across 2-3 vendors for your top items",
          "Confirm delivery dates and check deliveries against invoices",
        ]},
        { title: "Receive and verify", details: [
          "Check delivery against purchase order — quantities, condition, expiration",
          "Immediately flag and document any discrepancies",
          "Store items properly: FIFO (first in, first out)",
          "File invoice and update inventory records",
        ]},
      ],
      tips: [
        "Your top 20% of items generate 80% of revenue — track those closely",
        "Don't over-order to get a volume discount unless you'll actually use it",
        "A simple spreadsheet beats no system — you can upgrade to software later",
      ],
    },

    "general:financial": {
      businessType: "General",
      area: "Financial Close & Reporting",
      title: "Monthly Financial Close & Reporting",
      purpose: "Maintain accurate financial records, understand business performance monthly, and make informed decisions.",
      scope: "Business owner and/or bookkeeper.",
      steps: [
        { title: "Weekly bookkeeping (30 min)", details: [
          "Categorize all transactions in accounting software",
          "Match bank deposits to invoices or sales records",
          "File receipts for any expense over $25",
          "Flag any unusual or unrecognized charges for review",
        ]},
        { title: "Monthly close (by the 10th of next month)", details: [
          "Reconcile all bank and credit card accounts",
          "Review accounts receivable — follow up on anything 30+ days overdue",
          "Review accounts payable — pay or schedule all outstanding bills",
          "Record any accruals, prepayments, or adjustments",
          "Run P&L (profit and loss) and balance sheet reports",
        ]},
        { title: "Monthly review (15 min)", details: [
          "Compare revenue vs last month and vs same month last year",
          "Check gross margin — is it where you expect?",
          "Review top 5 expense categories — any surprises?",
          "Check cash runway: at current burn, how many months can you operate?",
          "Note one insight and one action item from the numbers",
        ]},
      ],
      tips: [
        "If you only track one number, track cash flow — it's what kills businesses",
        "Don't wait until tax time to organize your books — do it weekly",
        "Separate personal and business finances completely — no exceptions",
      ],
    },

    "general:safety": {
      businessType: "General",
      area: "Safety & Compliance",
      title: "Workplace Safety & Compliance Checklist",
      purpose: "Maintain a safe work environment, meet regulatory requirements, and protect the business from liability.",
      scope: "All staff, with primary responsibility on managers and owners.",
      steps: [
        { title: "Daily safety checks", details: [
          "Walk the workspace: check for hazards, spills, blocked exits",
          "Verify emergency exits are clear and accessible",
          "Confirm first aid kit is stocked and accessible",
          "Check that fire extinguishers are visible and not expired",
        ]},
        { title: "Employee safety basics", details: [
          "All employees know the emergency exit route",
          "All employees know where the first aid kit is",
          "Incident reporting process is posted and understood",
          "New employees receive safety orientation on day 1",
        ]},
        { title: "Monthly/quarterly compliance", details: [
          "Review and update any required licenses or permits",
          "Verify insurance coverage is current",
          "Review incident log — any patterns that need addressing?",
          "Update safety signage as needed",
          "Schedule required equipment inspections (fire, HVAC, etc.)",
        ]},
      ],
      tips: [
        "Post emergency numbers and procedures where everyone can see them",
        "Do a quarterly 'what if' drill — what happens if someone gets hurt?",
        "Keep a simple incident log even if regulations don't require it — it protects you",
      ],
    },

    "ecommerce:open-close": {
      businessType: "E-commerce",
      area: "Daily Operations",
      title: "E-commerce Daily Operations Checklist",
      purpose: "Keep orders moving, customers informed, and inventory accurate every single day.",
      scope: "Operations staff responsible for order fulfillment and customer communication.",
      steps: [
        { title: "Morning check (first 30 min)", details: [
          "Review overnight orders — flag any with issues (address, payment, stock)",
          "Check inventory levels for top-selling items",
          "Review customer messages and support tickets — respond to urgent ones",
          "Check shipping carrier status for any in-transit issues",
          "Review any marketplace notifications (Amazon, Etsy, Shopify)",
        ]},
        { title: "Fulfillment", details: [
          "Pick and pack orders received before cutoff time",
          "Print shipping labels, attach to packages, scan for tracking",
          "Update order status in your system",
          "Schedule carrier pickup or drop off packages",
        ]},
        { title: "End of day", details: [
          "Verify all orders shipped have tracking numbers uploaded",
          "Respond to remaining customer inquiries",
          "Review daily sales and compare to target",
          "Update inventory for any manual adjustments",
          "Check for low-stock alerts and reorder if needed",
        ]},
      ],
      tips: [
        "Set a shipping cutoff time and stick to it — customers respect clear expectations",
        "Automate tracking number emails — it cuts support tickets in half",
        "Review your return rate monthly — high returns point to listing or quality issues",
      ],
    },

    "fitness:open-close": {
      businessType: "Fitness / Wellness",
      area: "Daily Open/Close",
      title: "Gym / Studio Daily Opening & Closing Procedures",
      purpose: "Ensure a clean, safe, and welcoming environment for members and maintain equipment standards.",
      scope: "All staff responsible for opening or closing the facility.",
      steps: [
        { title: "Opening — 30 minutes before first class/session", details: [
          "Disarm alarm, turn on lights, HVAC, and music",
          "Walk the floor: check equipment for damage or safety issues",
          "Wipe down high-touch surfaces (handles, counters, check-in kiosk)",
          "Verify class schedule is posted and accurate",
          "Open check-in system, review today's bookings and any cancellations",
          "Restock water, towels, and supplies as needed",
          "Unlock front door at scheduled open time",
        ]},
        { title: "Closing — after last member leaves", details: [
          "Walk the floor: return equipment to proper locations",
          "Wipe down all equipment and surfaces",
          "Check locker rooms: clear lost-and-found, restock supplies",
          "Run end-of-day report: check-ins, sign-ups, revenue",
          "Lock equipment storage and supply rooms",
          "Turn off lights, music, and non-essential HVAC",
          "Set alarm, lock all doors",
        ]},
      ],
      tips: [
        "Keep a maintenance log — track equipment issues before they become injuries",
        "Post the cleaning checklist where members can see it — it builds trust",
        "Review member check-in data weekly to spot attendance trends",
      ],
    },
  };

  // Try exact match first, then fall back to general version
  if (templates[key]) return templates[key];

  const generalKey = `general:${area}`;
  if (templates[generalKey]) {
    return {
      ...templates[generalKey],
      businessType: BUSINESS_TYPES.find((b) => b.id === bizType)?.label || bizType,
    };
  }

  // Fallback for any combination not covered
  const bizLabel = BUSINESS_TYPES.find((b) => b.id === bizType)?.label || bizType;
  const areaLabel = AREAS.find((a) => a.id === area)?.label || area;

  return {
    businessType: bizLabel,
    area: areaLabel,
    title: `${bizLabel} — ${areaLabel}`,
    purpose: `Establish a consistent, repeatable process for ${areaLabel.toLowerCase()} in your ${bizLabel.toLowerCase()} business.`,
    scope: "All relevant staff and management.",
    steps: [
      { title: "Define the current process", details: [
        "Write down how this is done today, step by step",
        "Note where things go wrong or get skipped",
        "Identify who is responsible for each step",
      ]},
      { title: "Standardize", details: [
        "Create a checklist version of the process",
        "Remove unnecessary steps, clarify ambiguous ones",
        "Set a consistent schedule or trigger for when this process runs",
      ]},
      { title: "Train and implement", details: [
        "Walk the team through the new process",
        "Post the checklist where it's visible during the work",
        "Run it for two weeks and collect feedback",
      ]},
      { title: "Review and improve", details: [
        "After 30 days, review: What's working? What's not?",
        "Update the checklist based on real-world experience",
        "Set a quarterly review date to keep it current",
      ]},
    ],
    tips: [
      "Start with your most painful or error-prone process first",
      "Keep SOPs short — a one-page checklist beats a 10-page manual",
      "The best SOP is the one your team actually follows",
    ],
  };
}

export function generateSOP(bizType: string, areas: string[]): SOPTemplate[] {
  return areas.map((area) => getTemplate(bizType, area));
}
