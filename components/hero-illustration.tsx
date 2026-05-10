"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const CHECKLIST = ["Business audit", "Process mapping", "Vendor review", "Growth plan", "Team alignment"];

export default function HeroIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState([true, true, true, false, false]);
  const [flipped, setFlipped] = useState<string | null>(null);

  const checkedCount = checked.filter(Boolean).length;

  // Mouse-follow parallax tilt
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el || !el.classList.contains("animate")) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 6;
    const rotateX = ((centerY - e.clientY) / rect.height) * 4;

    el.style.setProperty("--rx", `${rotateX}deg`);
    el.style.setProperty("--ry", `${rotateY}deg`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add("animate");
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const toggleFlip = (card: string) => {
    setFlipped((prev) => (prev === card ? null : card));
  };

  return (
    <div ref={ref} className="hero-cards" aria-hidden="true">
      {/* ========== STRATEGY CARD (Checklist) ========== */}
      <div
        className={`hero-card card-checklist${flipped === "checklist" ? " flipped" : ""}`}
        onClick={() => toggleFlip("checklist")}
      >
        <div className="card-front">
          <div className="card-label">Strategy</div>
          <div className="card-inner">
            {CHECKLIST.map((item, i) => (
              <div
                key={item}
                className="check-row"
                onClick={(e) => { e.stopPropagation(); toggleCheck(i); }}
                role="button"
                tabIndex={0}
              >
                <span className={`check-box${checked[i] ? " checked" : ""}`}>
                  {checked[i] && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 3.5L3.5 6L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`check-text${checked[i] ? " done" : ""}`}>{item}</span>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <span className="card-badge">{checkedCount} of 5 complete</span>
            <div className="card-progress">
              <div className="card-progress-fill" style={{ width: `${(checkedCount / 5) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="card-back-icon">&#x2714;</div>
          <div className="card-back-title">Strategy</div>
          <div className="card-back-desc">We map your processes, find the bottlenecks, and build a plan to fix them.</div>
          <div className="card-back-hint">Click to flip back</div>
        </div>
      </div>

      {/* ========== MARGINS CARD (Payment receipt) ========== */}
      <div
        className={`hero-card card-browser${flipped === "browser" ? " flipped" : ""}`}
        onClick={() => toggleFlip("browser")}
      >
        <div className="card-front">
          <div className="card-label">Margins</div>
          <div className="card-inner">
            <div className="payment-amount">$4,280</div>
            <div className="payment-status">
              <span className="payment-dot" />
              Payment received
            </div>
            <div className="receipt-divider" />
            <div className="payment-detail">
              <span>Processing</span>
              <span className="payment-rate">2.4% + $0.10</span>
            </div>
            <div className="payment-detail">
              <span>Fee</span>
              <span className="payment-fee">$102.82</span>
            </div>
            <div className="payment-detail">
              <span>Net deposit</span>
              <span className="payment-net">$4,177.18</span>
            </div>
            <div className="receipt-divider" />
            <div className="payment-saved">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#C8924B" />
                <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You saved $47 vs. old rate
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="card-back-icon">&#x1F4B3;</div>
          <div className="card-back-title">Margins</div>
          <div className="card-back-desc">We audit your processing setup and cut the junk fees you didn&apos;t know about.</div>
          <div className="card-back-hint">Click to flip back</div>
        </div>
      </div>

      {/* ========== PEOPLE CARD (Customer growth) ========== */}
      <div
        className={`hero-card card-receipt${flipped === "receipt" ? " flipped" : ""}`}
        onClick={() => toggleFlip("receipt")}
      >
        <div className="card-front">
          <div className="card-label">People</div>
          <div className="card-inner">
            <div className="revenue-header">
              <span className="revenue-amount">142</span>
              <span className="revenue-change">+23%</span>
            </div>
            <div className="revenue-period">New customers this quarter</div>
            <svg className="revenue-chart" viewBox="0 0 200 80" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--ochre)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--ochre)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 Q20 68 35 62 T70 48 T105 35 T140 22 T175 12 T200 5"
                stroke="var(--ochre)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="chart-line"
              />
              <path
                d="M0 70 Q20 68 35 62 T70 48 T105 35 T140 22 T175 12 T200 5 L200 80 L0 80 Z"
                fill="url(#chartFill)"
                className="chart-area"
              />
            </svg>
            <div className="revenue-months">
              <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="card-back-icon">&#x1F465;</div>
          <div className="card-back-title">People</div>
          <div className="card-back-desc">Websites, SEO, and local presence that actually bring customers through the door.</div>
          <div className="card-back-hint">Click to flip back</div>
        </div>
      </div>

      {/* Floating accent dots */}
      <div className="accent-dot dot-1" />
      <div className="accent-dot dot-2" />
      <div className="accent-dot dot-3" />
    </div>
  );
}
