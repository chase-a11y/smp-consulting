"use client";

const svgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({ kind, size = 16 }: { kind: string; size?: number }) {
  const props = { ...svgProps, width: size, height: size };
  switch (kind) {
    case "queue":
      return (
        <svg {...props}>
          <path d="M3 6h18M3 12h18M3 18h12" />
        </svg>
      );
    case "table":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 4v16" />
        </svg>
      );
    case "audit":
      return (
        <svg {...props}>
          <path d="M9 12h6M9 8h6M9 16h4" />
          <rect x="5" y="3" width="14" height="18" rx="2" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12c0 .7-.1 1.4-.3 2l2 1.4-2 3.5-2.4-1a7 7 0 0 1-3.5 2L12 22h-4l-.8-2.1a7 7 0 0 1-3.5-2l-2.4 1-2-3.5 2-1.4A7 7 0 0 1 1 12c0-.7.1-1.4.3-2l-2-1.4 2-3.5 2.4 1a7 7 0 0 1 3.5-2L8 2h4l.8 2.1a7 7 0 0 1 3.5 2l2.4-1 2 3.5-2 1.4c.2.6.3 1.3.3 2z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6" />
        </svg>
      );
    case "export":
      return (
        <svg {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "filter":
      return (
        <svg {...props}>
          <path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      );
    case "copy":
      return (
        <svg {...props}>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "external":
      return (
        <svg {...props}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
        </svg>
      );
    default:
      return null;
  }
}
