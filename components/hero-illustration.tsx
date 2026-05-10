"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const CHECKLIST = ["Business audit", "Process mapping", "Vendor review", "Growth plan", "Team alignment"];
const CARD_KEYS = ["checklist", "browser", "receipt"] as const;
const CARD_LABELS = ["Strategy", "Margins", "People"];

export default function HeroIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState([true, true, true, false, false]);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkedCount = checked.filter(Boolean).length;

  // Auto-cycle every 5s when not flipped
  useEffect(() => {
    if (flipped) return;
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(t);
  }, [flipped]);

  // Entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add("animate"), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const toggleFlip = () => {
    setFlipped((prev) => (prev === CARD_KEYS[activeIdx] ? null : CARD_KEYS[activeIdx]));
  };

  const go = useCallback((dir: 1 | -1) => {
    setFlipped(null);
    setActiveIdx((i) => (i + dir + 3) % 3);
  }, []);

  return (
    <div ref={ref} className="hero-cards" aria-hidden="true">
      {/* Carousel track */}
      <div className="carousel-track">
        {/* Strategy card */}
        <div
          className={`hero-card card-checklist${activeIdx === 0 ? " active" : ""}${flipped === "checklist" ? " flipped" : ""}${activeIdx === 1 ? " next" : ""}${activeIdx === 2 ? " prev" : ""}`}
          onClick={activeIdx === 0 ? toggleFlip : undefined}
        >
          <div className="card-front">
            <div className="card-label">Strategy</div>
            <div className="card-inner">
              {CHECKLIST.map((item, i) => (
                <div
                  key={item}
                  className="check-row"
                  onClick={(e) => { e.stopPropagation(); if (activeIdx === 0) toggleCheck(i); }}
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

        {/* Margins card */}
        <div
          className={`hero-card card-browser${activeIdx === 1 ? " active" : ""}${flipped === "browser" ? " flipped" : ""}${activeIdx === 2 ? " next" : ""}${activeIdx === 0 ? " prev" : ""}`}
          onClick={activeIdx === 1 ? toggleFlip : undefined}
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

        {/* People card */}
        <div
          className={`hero-card card-receipt${activeIdx === 2 ? " active" : ""}${flipped === "receipt" ? " flipped" : ""}${activeIdx === 0 ? " next" : ""}${activeIdx === 1 ? " prev" : ""}`}
          onClick={activeIdx === 2 ? toggleFlip : undefined}
        >
          <div className="card-front">
            <div className="card-label">People</div>
            <div className="card-inner">
              <div className="team-roster">
                <div className="team-row">
                  <div className="team-avatar" style={{ background: "var(--pine)" }}>JR</div>
                  <div className="team-info">
                    <span className="team-name">Jordan Reyes</span>
                    <span className="team-role">Operations Lead</span>
                  </div>
                  <span className="team-status active">Active</span>
                </div>
                <div className="team-row">
                  <div className="team-avatar" style={{ background: "var(--ochre)" }}>KL</div>
                  <div className="team-info">
                    <span className="team-name">Kim Lee</span>
                    <span className="team-role">Sales Manager</span>
                  </div>
                  <span className="team-status active">Active</span>
                </div>
                <div className="team-row">
                  <div className="team-avatar" style={{ background: "var(--muted)" }}>DP</div>
                  <div className="team-info">
                    <span className="team-name">Dana Park</span>
                    <span className="team-role">Marketing</span>
                  </div>
                  <span className="team-status hiring">Hiring</span>
                </div>
              </div>
              <div className="receipt-divider" />
              <div className="payment-saved">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#C8924B" />
                  <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                3 roles defined, 1 open
              </div>
            </div>
          </div>
          <div className="card-back">
            <div className="card-back-icon">&#x1F465;</div>
            <div className="card-back-title">People</div>
            <div className="card-back-desc">Hire the right people, define roles that make sense, and build a team that stays.</div>
            <div className="card-back-hint">Click to flip back</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="carousel-nav">
        <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous card">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="carousel-dots">
          {CARD_LABELS.map((label, i) => (
            <button
              key={label}
              className={`carousel-dot${activeIdx === i ? " active" : ""}`}
              onClick={() => { setFlipped(null); setActiveIdx(i); }}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next card">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
