type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "spark"
  | "compass"
  | "chart"
  | "card"
  | "doc"
  | "play"
  | "mail"
  | "phone"
  | "pin"
  | "clock";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 16, strokeWidth = 1.6, ...rest }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };

  switch (name) {
    case "arrow-right":
      return (<svg {...props}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>);
    case "arrow-up-right":
      return (<svg {...props}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>);
    case "check":
      return (<svg {...props}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
    case "spark":
      return (<svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>);
    case "compass":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>);
    case "chart":
      return (<svg {...props}><path d="M4 20V8M10 20V4M16 20v-8M22 20H2" /></svg>);
    case "card":
      return (<svg {...props}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></svg>);
    case "doc":
      return (<svg {...props}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></svg>);
    case "play":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" /></svg>);
    case "mail":
      return (<svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></svg>);
    case "phone":
      return (<svg {...props}><path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3.09a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
    case "pin":
      return (<svg {...props}><path d="M12 22s-7-7.58-7-12a7 7 0 0 1 14 0c0 4.42-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>);
    case "clock":
      return (<svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    default:
      return null;
  }
}
