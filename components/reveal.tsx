"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add("reveal-visible"), delay);
          } else {
            el.classList.add("reveal-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={`reveal-hidden ${className}`.trim()}>
      {children}
    </Tag>
  );
}
