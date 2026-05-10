interface CategoryIconProps {
  category: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size = 44, color }: CategoryIconProps) {
  const stroke = color || "currentColor";
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "category-icon",
  };

  switch (category) {
    // Magnifying glass
    case "Getting Found":
      return (
        <svg {...props}>
          <circle cx="21" cy="21" r="10" />
          <path d="M28 28l9 9" />
          <path d="M17 18h8" strokeWidth={1.2} />
          <path d="M21 14v8" strokeWidth={1.2} />
        </svg>
      );

    // Browser window
    case "Website":
      return (
        <svg {...props}>
          <rect x="6" y="8" width="36" height="28" rx="3" />
          <path d="M6 16h36" />
          <circle cx="11" cy="12" r="1.2" fill={stroke} stroke="none" />
          <circle cx="15.5" cy="12" r="1.2" fill={stroke} stroke="none" />
          <circle cx="20" cy="12" r="1.2" fill={stroke} stroke="none" />
          <path d="M16 26l5-5 3 3 5-5" strokeWidth={1.3} />
        </svg>
      );

    // Funnel / target
    case "Lead Gen":
      return (
        <svg {...props}>
          <path d="M10 10h28l-8 11v10l-4 3V21z" />
          <circle cx="35" cy="14" r="5" strokeWidth={1.2} />
          <circle cx="35" cy="14" r="2" fill={stroke} stroke="none" />
        </svg>
      );

    // Storefront
    case "Local Marketing":
      return (
        <svg {...props}>
          <path d="M8 18h32v20H8z" />
          <path d="M6 10h36l-2 8H8z" />
          <path d="M20 28h8v10h-8z" />
          <path d="M12 24h5v5h-5z" />
          <path d="M31 24h5v5h-5z" />
          <path d="M16 14v4M24 14v4M32 14v4" strokeWidth={1.2} />
        </svg>
      );

    // Chat bubbles
    case "Social Media":
      return (
        <svg {...props}>
          <rect x="6" y="8" width="22" height="16" rx="3" />
          <path d="M12 24v5l5-5" />
          <rect x="22" y="16" width="20" height="14" rx="3" />
          <path d="M36 30v4l-4-4" />
          <path d="M12 15h10" strokeWidth={1.2} />
          <path d="M12 19h6" strokeWidth={1.2} />
          <path d="M28 22h8" strokeWidth={1.2} />
          <path d="M28 26h5" strokeWidth={1.2} />
        </svg>
      );

    // Envelope with heart/star
    case "Email & Retention":
      return (
        <svg {...props}>
          <rect x="6" y="12" width="36" height="24" rx="3" />
          <path d="M6 15l18 12 18-12" />
          <circle cx="36" cy="12" r="7" fill="var(--paper-2, #FDFBF5)" />
          <path
            d="M36 16.5l-1.5-1.5a2.1 2.1 0 0 0-3 3L36 22l4.5-4a2.1 2.1 0 0 0-3-3z"
            strokeWidth={1.3}
          />
        </svg>
      );

    // Lightbulb with circuit lines
    case "AI & Small Business":
      return (
        <svg {...props}>
          <path d="M18 34h12" />
          <path d="M19 38h10" />
          <path d="M20 42h8" />
          <path d="M30 34v-4a10 10 0 1 0-12 0v4" />
          <circle cx="24" cy="20" r="2" fill={stroke} stroke="none" />
          <path d="M24 14v-4M18 20h-4M30 20h4" strokeWidth={1.2} />
          <path d="M20 16l-2-2M28 16l2-2" strokeWidth={1.2} />
        </svg>
      );

    // Briefcase with chart
    case "Running the Business":
      return (
        <svg {...props}>
          <rect x="6" y="14" width="36" height="24" rx="3" />
          <path d="M18 14v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
          <path d="M6 24h36" strokeWidth={1} />
          <path d="M16 30l4-4 4 3 6-6" strokeWidth={1.3} />
          <circle cx="30" cy="23" r="1.5" fill={stroke} stroke="none" />
        </svg>
      );

    default:
      return null;
  }
}
