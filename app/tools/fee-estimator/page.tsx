"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";
import { BUSINESS_TYPES, DEFAULT_RATE } from "./rate-data";

export default function FeeEstimator() {
  // Calculator state
  const [volume, setVolume] = useState("");
  const [avgTicket, setAvgTicket] = useState("");
  const [rateInput, setRateInput] = useState("");
  const [dontKnowRate, setDontKnowRate] = useState(false);
  const [bizType, setBizType] = useState("");

  // Upload state
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [auditName, setAuditName] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditCompany, setAuditCompany] = useState("");
  const [auditNote, setAuditNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Calculator logic
  const calc = useMemo(() => {
    const vol = parseFloat(volume.replace(/[,$]/g, ""));
    const rate = dontKnowRate ? DEFAULT_RATE : parseFloat(rateInput);
    const biz = BUSINESS_TYPES.find((b) => b.id === bizType);

    if (!vol || vol <= 0 || !rate || rate <= 0 || !biz) return null;

    const currentMonthly = vol * (rate / 100);
    const benchmarkMonthly = vol * (biz.benchmarkMid / 100);
    const monthlySavings = Math.max(0, currentMonthly - benchmarkMonthly);
    const annualSavings = monthlySavings * 12;
    const pctBar = Math.min(100, (biz.benchmarkMid / rate) * 100);

    return {
      currentMonthly,
      benchmarkMonthly,
      monthlySavings,
      annualSavings,
      benchmarkRate: biz.benchmarkMid,
      benchmarkRange: `${biz.benchmarkLow}–${biz.benchmarkHigh}%`,
      effectiveRate: rate,
      pctBar,
      overpaying: rate > biz.benchmarkHigh,
    };
  }, [volume, rateInput, dontKnowRate, bizType]);

  // File drop handlers
  const addFile = (files: FileList | null) => {
    if (!files?.length) return;
    const f = files[0];
    const valid = /\.(pdf|png|jpe?g)$/i.test(f.name);
    if (valid && f.size <= 10 * 1024 * 1024) setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFile(e.dataTransfer.files);
  };

  // Form submission
  const canSubmit = auditName && auditEmail && auditCompany && file;

  const submitAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("form-name", "statement-audit");
      formData.append("name", auditName);
      formData.append("email", auditEmail);
      formData.append("company", auditCompany);
      formData.append("note", auditNote);
      if (file) formData.append("statement", file);
      if (calc) {
        formData.append("estimated-rate", `${calc.effectiveRate}%`);
        formData.append("monthly-volume", volume);
        formData.append("business-type", bizType);
      }

      await fetch("/", {
        method: "POST",
        body: formData,
      });
    } catch {
      // Netlify will retry
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <>
      {/* Hidden form for Netlify bot detection */}
      <form name="statement-audit" data-netlify="true" hidden encType="multipart/form-data">
        <input type="hidden" name="form-name" value="statement-audit" />
        <input name="name" />
        <input name="email" />
        <input name="company" />
        <textarea name="note" />
        <input name="statement" type="file" />
        <input name="estimated-rate" />
        <input name="monthly-volume" />
        <input name="business-type" />
      </form>

      {/* Header */}
      <section className="section" style={{ paddingTop: "clamp(120px, 14vh, 180px)", paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">
              <span className="dot"></span>Payment fee estimator
            </span>
            <h1 style={{ marginTop: 14, fontSize: "clamp(32px, 4.5vw, 56px)" }}>
              Are you overpaying on{" "}
              <em style={{ fontStyle: "italic", color: "var(--amber-deep)" }}>processing</em>?
            </h1>
            <p className="lede" style={{ marginTop: 18, maxWidth: "56ch" }}>
              Most businesses are. Plug in your numbers and see how your rate
              compares — then send us your statement for a free, no-strings audit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Calculator */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <Reveal>
            <div className="tool-card">
              <h2 style={{ fontSize: 24, marginBottom: 24 }}>Quick estimate</h2>

              <div className="tool-grid-2">
                {/* Inputs */}
                <div className="tool-fields">
                  <div className="field">
                    <label htmlFor="fe-volume">Monthly card processing volume</label>
                    <input
                      id="fe-volume"
                      type="text"
                      inputMode="numeric"
                      placeholder="$25,000"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="fe-ticket">Average transaction size</label>
                    <input
                      id="fe-ticket"
                      type="text"
                      inputMode="numeric"
                      placeholder="$45"
                      value={avgTicket}
                      onChange={(e) => setAvgTicket(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="fe-rate">
                      Current effective rate
                      {dontKnowRate && (
                        <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                          {" "}— using {DEFAULT_RATE}% estimate
                        </span>
                      )}
                    </label>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <input
                        id="fe-rate"
                        type="text"
                        inputMode="decimal"
                        placeholder="3.2%"
                        value={dontKnowRate ? "" : rateInput}
                        onChange={(e) => { setRateInput(e.target.value); setDontKnowRate(false); }}
                        disabled={dontKnowRate}
                        style={{ opacity: dontKnowRate ? 0.4 : 1 }}
                      />
                      <button
                        type="button"
                        className={"opt " + (dontKnowRate ? "on" : "")}
                        style={{ whiteSpace: "nowrap", padding: "10px 14px", fontSize: 13 }}
                        onClick={() => setDontKnowRate(!dontKnowRate)}
                      >
                        <span className="check" aria-hidden="true">✓</span>
                        <span><strong>I don&apos;t know</strong></span>
                      </button>
                    </div>
                  </div>
                  <div className="field">
                    <label>Business type</label>
                    <div className="opt-grid cols-2">
                      {BUSINESS_TYPES.map((b) => (
                        <button
                          key={b.id}
                          className={"opt " + (bizType === b.id ? "on" : "")}
                          onClick={() => setBizType(b.id)}
                        >
                          <span className="check" aria-hidden="true">✓</span>
                          <span>
                            <strong>{b.label}</strong>
                            {b.note}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="tool-results">
                  {calc ? (
                    <>
                      <div className="result-row">
                        <span className="result-label">Your estimated monthly fees</span>
                        <span className="result-value">{fmt(calc.currentMonthly)}</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">
                          Benchmark for your business type
                          <span className="result-hint">{calc.benchmarkRange}</span>
                        </span>
                        <span className="result-value muted">{fmt(calc.benchmarkMonthly)}</span>
                      </div>

                      {/* Visual bar */}
                      <div className="result-bar-wrap">
                        <div className="result-bar">
                          <div
                            className="result-bar-fill benchmark"
                            style={{ width: `${calc.pctBar}%` }}
                          />
                          <div className="result-bar-fill current" style={{ width: "100%" }} />
                        </div>
                        <div className="result-bar-labels">
                          <span>Benchmark {calc.benchmarkRate}%</span>
                          <span>You {calc.effectiveRate}%</span>
                        </div>
                      </div>

                      {calc.overpaying ? (
                        <div className="result-savings">
                          <div className="savings-amount">{fmt(calc.annualSavings)}</div>
                          <div className="savings-label">estimated annual savings</div>
                          <p className="savings-note">
                            That&apos;s {fmt(calc.monthlySavings)}/month you could put back into
                            your business — or into talking to your customers.
                          </p>
                        </div>
                      ) : (
                        <div className="result-savings good">
                          <div className="savings-label">Your rate looks competitive</div>
                          <p className="savings-note">
                            You&apos;re within the benchmark range for your business type.
                            A statement audit can still catch hidden fees, but you&apos;re
                            in decent shape.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="result-empty">
                      <p>Fill in your details to see your estimate.</p>
                      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
                        Don&apos;t know your rate? Check the box — we&apos;ll use
                        the industry average.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Statement Audit Upload */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="tool-card" style={{ background: "var(--cream)" }}>
              {!submitted ? (
                <>
                  <span className="eyebrow" style={{ marginBottom: 8 }}>
                    <span className="dot"></span>Free statement audit
                  </span>
                  <h2 style={{ fontSize: 28 }}>
                    Want the real number? Send us your statement.
                  </h2>
                  <p style={{ color: "var(--ink-2)", maxWidth: "60ch", marginTop: 8 }}>
                    The calculator gives you a ballpark. A statement audit gives you
                    the truth — every fee, every markup, every hidden charge.
                    We&apos;ll review it and send you a plain-English breakdown
                    within two business days.
                  </p>

                  <form onSubmit={submitAudit} style={{ marginTop: 32 }}>
                    <div className="tool-grid-2">
                      <div className="tool-fields">
                        <div className="field">
                          <label htmlFor="audit-name">Your name</label>
                          <input
                            id="audit-name"
                            value={auditName}
                            onChange={(e) => setAuditName(e.target.value)}
                            placeholder="Jordan Reyes"
                            autoComplete="name"
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="audit-email">Email</label>
                          <input
                            id="audit-email"
                            type="email"
                            value={auditEmail}
                            onChange={(e) => setAuditEmail(e.target.value)}
                            placeholder="jordan@yourshop.com"
                            autoComplete="email"
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="audit-company">Business name</label>
                          <input
                            id="audit-company"
                            value={auditCompany}
                            onChange={(e) => setAuditCompany(e.target.value)}
                            placeholder="Reyes & Co."
                            autoComplete="organization"
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="audit-note">
                            Anything we should know?
                            <span style={{ color: "var(--muted)", fontWeight: 400 }}> Optional</span>
                          </label>
                          <textarea
                            id="audit-note"
                            value={auditNote}
                            onChange={(e) => setAuditNote(e.target.value)}
                            placeholder="Current processor, biggest pain point, or questions you have."
                            rows={3}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{
                          display: "block",
                          fontFamily: "var(--font-mono), ui-monospace, monospace",
                          fontSize: 11,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}>
                          Upload your statement
                        </label>
                        <div
                          className={"upload-zone" + (dragOver ? " drag-over" : "") + (file ? " has-file" : "")}
                          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          onClick={() => fileRef.current?.click()}
                        >
                          <input
                            ref={fileRef}
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => addFile(e.target.files)}
                            hidden
                          />
                          {file ? (
                            <div className="upload-file-info">
                              <Icon name="check" size={20} />
                              <div>
                                <strong>{file.name}</strong>
                                <span>{(file.size / 1024).toFixed(0)} KB</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                style={{ marginLeft: "auto", color: "var(--muted)", cursor: "pointer", background: "none", border: "none", fontSize: 13 }}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <>
                              <div style={{ fontSize: 32, opacity: 0.3 }}>↑</div>
                              <p><strong>Drop your statement here</strong> or click to browse</p>
                              <p style={{ fontSize: 12, color: "var(--muted)" }}>
                                PDF, PNG, or JPG · Max 10 MB
                              </p>
                            </>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-amber"
                          disabled={!canSubmit || submitting}
                          style={{
                            marginTop: 20,
                            width: "100%",
                            justifyContent: "center",
                            opacity: canSubmit && !submitting ? 1 : 0.4,
                          }}
                        >
                          {submitting ? "Sending…" : "Request free audit"}
                          <Icon name="arrow-right" size={14} />
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "var(--amber)", color: "#2b1f08",
                    display: "grid", placeItems: "center",
                    margin: "0 auto 20px",
                  }}>
                    <Icon name="check" size={26} />
                  </div>
                  <h3 style={{ fontSize: 24 }}>Got it — we&apos;ll review your statement.</h3>
                  <p style={{ color: "var(--ink-2)", marginTop: 10, maxWidth: "44ch", margin: "10px auto 0" }}>
                    Expect a plain-English breakdown within two business days,
                    from a real person, at{" "}
                    <strong>hello@smpconsulting.com</strong>.
                  </p>
                  <Link
                    href="/tools"
                    style={{
                      display: "inline-block",
                      marginTop: 24,
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontSize: 12,
                      letterSpacing: ".06em",
                      color: "var(--amber)",
                    }}
                  >
                    ← Back to tools
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
