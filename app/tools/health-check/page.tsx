"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";
import { CATEGORIES, getGrade, getLevel } from "./questions";

const TOTAL_CATS = CATEGORIES.length;

export default function HealthCheck() {
  const [catIndex, setCatIndex] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showDetail, setShowDetail] = useState(false);
  const [gateEmail, setGateEmail] = useState("");
  const [gateName, setGateName] = useState("");
  const [gateCompany, setGateCompany] = useState("");
  const [gated, setGated] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const done = catIndex >= TOTAL_CATS;
  const cat = catIndex >= 0 && catIndex < TOTAL_CATS ? CATEGORIES[catIndex] : null;

  const catComplete = cat
    ? cat.questions.every((q) => answers[q.id] !== undefined)
    : false;

  const answer = (qId: string, score: number) =>
    setAnswers((prev) => ({ ...prev, [qId]: score }));

  // Scoring
  const scores = useMemo(() => {
    if (!done) return null;
    const catScores = CATEGORIES.map((c) => {
      const total = c.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const max = c.questions.length * 4;
      const pct = Math.round((total / max) * 100);
      return { ...c, score: pct, level: getLevel(pct) };
    });
    const overall = Math.round(
      catScores.reduce((s, c) => s + c.score, 0) / catScores.length
    );
    const sorted = [...catScores].sort((a, b) => b.score - a.score);
    const strengths = sorted.slice(0, 2);
    const gaps = [...sorted].reverse().slice(0, 2);
    return { catScores, overall, strengths, gaps, grade: getGrade(overall) };
  }, [done, answers]);

  const unlockDetails = async () => {
    if (!gateEmail || !gateName) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        "form-name": "health-check",
        name: gateName,
        email: gateEmail,
        company: gateCompany,
        score: String(scores?.overall || 0),
        grade: scores?.grade.letter || "",
        strengths: scores?.strengths.map((s) => s.name).join(", ") || "",
        gaps: scores?.gaps.map((g) => g.name).join(", ") || "",
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // Netlify will retry
    }
    setSubmitting(false);
    setGated(false);
    setShowDetail(true);
  };

  return (
    <>
      {/* Hidden Netlify form */}
      <form name="health-check" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="health-check" />
        <input name="name" />
        <input name="email" />
        <input name="company" />
        <input name="score" />
        <input name="grade" />
        <input name="strengths" />
        <input name="gaps" />
      </form>

      <section
        className="section"
        style={{ paddingTop: "clamp(120px, 14vh, 180px)" }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
          {/* Intro */}
          {catIndex === -1 && (
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <span className="eyebrow">
                  <span className="dot"></span>Business health check
                </span>
                <h1 style={{ marginTop: 14, fontSize: "clamp(32px, 4.5vw, 52px)" }}>
                  How healthy is your{" "}
                  <em style={{ fontStyle: "italic", color: "var(--amber-deep)" }}>
                    business
                  </em>
                  ?
                </h1>
                <p
                  className="lede"
                  style={{ marginTop: 18, maxWidth: "48ch", marginInline: "auto" }}
                >
                  15 questions across five areas. Takes about 3 minutes. No
                  signup required to see your score.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "center",
                    marginTop: 32,
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <span
                      key={c.id}
                      className="hero-tags"
                      style={{ margin: 0 }}
                    >
                      <span>{c.name}</span>
                    </span>
                  ))}
                </div>

                <button
                  className="btn btn-amber"
                  style={{ marginTop: 36 }}
                  onClick={() => setCatIndex(0)}
                >
                  Start the check
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </Reveal>
          )}

          {/* Questions */}
          {cat && (
            <div>
              {/* Progress */}
              <div className="hc-progress">
                {CATEGORIES.map((c, i) => (
                  <div
                    key={c.id}
                    className={
                      "hc-dot" +
                      (i === catIndex ? " on" : i < catIndex ? " done" : "")
                    }
                  >
                    {c.icon}
                  </div>
                ))}
              </div>

              <div className="hc-cat-label">
                <span className="eyebrow">
                  Category {catIndex + 1} of {TOTAL_CATS}
                </span>
                <h2 style={{ marginTop: 8, fontSize: 28 }}>{cat.name}</h2>
              </div>

              <div className="hc-questions">
                {cat.questions.map((q, qi) => (
                  <div key={q.id} className="hc-question">
                    <p className="hc-q-text">
                      <span className="hc-q-num">{qi + 1}.</span>
                      {q.text}
                    </p>
                    <div className="opt-grid cols-1">
                      {q.options.map((opt) => (
                        <button
                          key={opt.label}
                          className={
                            "opt " + (answers[q.id] === opt.score ? "on" : "")
                          }
                          onClick={() => answer(q.id, opt.score)}
                        >
                          <span className="check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hc-nav">
                <button
                  className={
                    "btn-link " + (catIndex === 0 ? "disabled" : "")
                  }
                  onClick={() => setCatIndex((i) => Math.max(0, i - 1))}
                >
                  ← Back
                </button>
                <button
                  className="btn btn-amber"
                  disabled={!catComplete}
                  style={{ opacity: catComplete ? 1 : 0.4 }}
                  onClick={() => setCatIndex((i) => i + 1)}
                >
                  {catIndex === TOTAL_CATS - 1 ? "See my results" : "Next category"}
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {done && scores && (
            <div>
              {/* Overall score */}
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <span className="eyebrow">
                  <span className="dot"></span>Your results
                </span>
                <div className="hc-overall-score">
                  <div
                    className="hc-grade"
                    style={{ borderColor: scores.grade.color }}
                  >
                    {scores.grade.letter}
                  </div>
                  <div>
                    <div className="hc-score-num">{scores.overall}/100</div>
                    <div className="hc-score-label">Overall business health</div>
                  </div>
                </div>
              </div>

              {/* Category bars */}
              <div className="hc-cat-bars">
                {scores.catScores.map((c) => (
                  <div key={c.id} className="hc-cat-bar">
                    <div className="hc-cat-bar-header">
                      <span className="hc-cat-bar-name">{c.name}</span>
                      <span className="hc-cat-bar-score">{c.score}%</span>
                    </div>
                    <div className="hc-bar">
                      <div
                        className="hc-bar-fill"
                        style={{
                          width: `${c.score}%`,
                          background:
                            c.score >= 75
                              ? "#4f6b34"
                              : c.score >= 50
                              ? "var(--amber)"
                              : "var(--rust)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & gaps */}
              <div className="hc-summary-grid">
                <div className="hc-summary-card">
                  <h3>Your strengths</h3>
                  {scores.strengths.map((s) => (
                    <p key={s.id}>
                      <strong>{s.name}</strong> — {s.score}%
                    </p>
                  ))}
                </div>
                <div className="hc-summary-card gap">
                  <h3>Biggest opportunities</h3>
                  {scores.gaps.map((g) => (
                    <p key={g.id}>
                      <strong>{g.name}</strong> — {g.score}%
                    </p>
                  ))}
                </div>
              </div>

              {/* Gate or detail */}
              {gated ? (
                <div className="tool-card" style={{ marginTop: 32, textAlign: "center" }}>
                  <h3 style={{ fontSize: 22 }}>
                    Get your detailed breakdown
                  </h3>
                  <p style={{ color: "var(--ink-2)", maxWidth: "44ch", margin: "8px auto 24px" }}>
                    See specific recommendations for each category, plus which
                    of our services maps to your biggest gaps.
                  </p>
                  <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "left" }}>
                    <div className="field">
                      <label htmlFor="gate-name">Your name</label>
                      <input
                        id="gate-name"
                        value={gateName}
                        onChange={(e) => setGateName(e.target.value)}
                        placeholder="Jordan Reyes"
                        autoComplete="name"
                      />
                    </div>
                    <div className="field" style={{ marginTop: 12 }}>
                      <label htmlFor="gate-email">Email</label>
                      <input
                        id="gate-email"
                        type="email"
                        value={gateEmail}
                        onChange={(e) => setGateEmail(e.target.value)}
                        placeholder="jordan@yourshop.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="field" style={{ marginTop: 12 }}>
                      <label htmlFor="gate-company">Business name <span style={{ color: "var(--muted)", fontWeight: 400 }}>Optional</span></label>
                      <input
                        id="gate-company"
                        value={gateCompany}
                        onChange={(e) => setGateCompany(e.target.value)}
                        placeholder="Reyes & Co."
                        autoComplete="organization"
                      />
                    </div>
                    <button
                      className="btn btn-amber"
                      style={{
                        marginTop: 20,
                        width: "100%",
                        justifyContent: "center",
                        opacity: gateName && gateEmail ? 1 : 0.4,
                      }}
                      disabled={!gateName || !gateEmail || submitting}
                      onClick={unlockDetails}
                    >
                      {submitting ? "Sending…" : "Unlock detailed results"}
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </div>
                </div>
              ) : null}

              {showDetail && (
                <div style={{ marginTop: 40 }}>
                  <h2 style={{ fontSize: 24, marginBottom: 24 }}>
                    Your recommendations
                  </h2>
                  {scores.catScores.map((c) => (
                    <div key={c.id} className="hc-rec-card">
                      <div className="hc-rec-header">
                        <h4>{c.name}</h4>
                        <span
                          className="hc-rec-badge"
                          style={{
                            background:
                              c.score >= 75
                                ? "rgba(79,107,52,0.12)"
                                : c.score >= 50
                                ? "rgba(212,160,74,0.12)"
                                : "rgba(177,90,50,0.12)",
                            color:
                              c.score >= 75
                                ? "#4f6b34"
                                : c.score >= 50
                                ? "var(--amber-deep)"
                                : "var(--rust)",
                          }}
                        >
                          {c.score}%
                        </span>
                      </div>
                      <p>{c.recommendations[c.level as "low" | "mid" | "high"]}</p>
                      {c.pillar !== "Core" && c.pillar !== "Overall" && (
                        <Link
                          href={c.pillarHref}
                          style={{
                            display: "inline-block",
                            marginTop: 12,
                            fontFamily: "var(--font-mono), ui-monospace, monospace",
                            fontSize: 12,
                            letterSpacing: ".06em",
                            color: "var(--amber)",
                          }}
                        >
                          Learn about our {c.pillar.toLowerCase()} services →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <p
                style={{
                  marginTop: 40,
                  textAlign: "center",
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 12,
                  color: "var(--muted)",
                  letterSpacing: ".06em",
                }}
              >
                <Link href="/tools" style={{ textDecoration: "underline" }}>
                  ← Back to tools
                </Link>
                {" · "}
                <button
                  onClick={() => {
                    setCatIndex(-1);
                    setAnswers({});
                    setShowDetail(false);
                    setGated(true);
                    setGateEmail("");
                    setGateName("");
                    setGateCompany("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Retake the check
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
