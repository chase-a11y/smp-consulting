"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

type ScrollEffect = "zoom-in" | "parallax" | "reveal-up";

interface ScrollImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  effect?: ScrollEffect;
  className?: string;
  priority?: boolean;
}

export default function ScrollImage({
  src,
  alt,
  width,
  height,
  effect = "zoom-in",
  className = "",
  priority = false,
}: ScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 when element enters bottom of viewport, 1 when it exits top
      const raw = 1 - (rect.top + rect.height) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const style = getTransformStyle(effect, progress);

  return (
    <div
      ref={containerRef}
      className={`scroll-image scroll-image--${effect} ${className}`.trim()}
    >
      <div className="scroll-image-inner" style={style}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 960px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

function getTransformStyle(
  effect: ScrollEffect,
  progress: number
): React.CSSProperties {
  switch (effect) {
    case "zoom-in": {
      const scale = 1.08 - progress * 0.08;
      return { transform: `scale(${scale})` };
    }
    case "parallax": {
      const y = (0.5 - progress) * 40;
      return { transform: `translateY(${y}px)` };
    }
    case "reveal-up": {
      const y = Math.max(0, (1 - progress * 2.5) * 30);
      const opacity = Math.min(1, progress * 2.5);
      return { transform: `translateY(${y}px)`, opacity };
    }
    default:
      return {};
  }
}
