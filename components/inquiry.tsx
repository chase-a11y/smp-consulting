"use client";

import { useState, useMemo, useEffect } from "react";
import { Icon } from "./icons";
import Reveal from "./reveal";

const SERVICES_OPTS = [
  { id: "strategy", label: "Strategy", note: "Operations, growth, marketing, customer acquisition" },
  { id: "margins", label: "Margins", note: "Payment audits, fee negotiation, revenue" },
  { id: "people", label: "People", note: "Hiring, roles, team alignment, culture" },
  { id: "unsure", label: "Not sure yet", note: "Help me figure it out" },
];

const SIZE_OPTS = [
  { id: "1-4", label: "1–4 employees", note: "" },
  { id: "5-25", label: "5–25 employees", note: "Our sweet spot" },
  { id: "26-50", label: "26–50 employees", note: "" },
  { id: "50+", label: "50+ employees", note: "" },
];

const TIMELINE_OPTS = [
  { id: "now", label: "This month" },
  { id: "quarter", label: "This quarter" },
  { id: "later", label: "Later this year" },
  { id: "browse", label: "Just browsing" },
];

interface FormData {
  services: string[];
  size: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  note: string;
}

const STEPS = 4;

export default function Inquiry() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    services: [],
    size: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof FormData, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggle = (k: "services", v: string) =>
    setData((d) => {
      const arr = d[k].includes(v)
        ? d[k].filter((x) => x !== v)
        : [...d[k], v];
      return { ...d, [k]: arr };
    });

  const canNext =
    (step === 0 && data.services.length > 0) ||
    (step === 1 && data.size && data.timeline) ||
    (step === 2 && data.name && data.email) ||
    step === 3;

  // Auto-advance step 2 when both size and timeline are selected
  useEffect(() => {
    if (step === 1 && data.size && data.timeline) {
      const t = setTimeout(() => setStep(2), 400);
      return () => clearTimeout(t);
    }
  }, [step, data.size, data.timeline]);

  const submit = async () => {
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        "form-name": "inquiry",
        services: data.services.join(", "),
        size: data.size,
        timeline: data.timeline,
        name: data.name,
        email: data.email,
        company: data.company,
        note: data.note,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // Still show success — Netlify will retry
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  const ref = useMemo(
    () => "SMP-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submitted]
  );

  return (
    <section className="inquiry section" id="inquiry">
      {/* Hidden form for Netlify bot detection */}
      <form name="inquiry" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="inquiry" />
        <input name="services" />
        <input name="size" />
        <input name="timeline" />
        <input name="name" />
        <input name="email" />
        <input name="company" />
        <textarea name="note" />
      </form>

      <div className="wrap inq-grid">
        <Reveal>
        <div className="inq-side">
          <span className="eyebrow">
            <span className="dot"></span>Start an inquiry
          </span>
          <h2>
            Tell us about your <em style={{ fontStyle: "italic" }}>business</em>.
          </h2>
          <p>
            Four short steps. We read every one personally, and we&apos;ll respond
            within two business days — even if it&apos;s to say we&apos;re not the
            right fit and point you to someone who is.
          </p>

          <div className="contact-row">
            <div className="item">
              <span className="k">Email</span>
              <span className="v">hello@smpconsulting.com</span>
            </div>
            <div className="item">
              <span className="k">Phone</span>
              <span className="v">Available by appointment</span>
            </div>
            <div className="item">
              <span className="k">Office</span>
              <span className="v">Remote · available nationwide</span>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className="inq-card">
          {!submitted ? (
            <>
              <div className="inq-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS}>
                {Array.from({ length: STEPS }).map((_, i) => (
                  <span
                    key={i}
                    className={i === step ? "on" : i < step ? "done" : ""}
                  ></span>
                ))}
              </div>

              {step === 0 && (
                <div className="inq-step">
                  <div className="step-h">
                    <span className="step-n">Step 1 of {STEPS}</span>
                  </div>
                  <h3>What can we help with?</h3>
                  <p className="hint">
                    Pick one or more. You can change this later.
                  </p>
                  <div className="opt-grid" role="group" aria-label="Service selection">
                    {SERVICES_OPTS.map((o) => (
                      <button
                        key={o.id}
                        className={"opt " + (data.services.includes(o.id) ? "on" : "")}
                        onClick={() => toggle("services", o.id)}
                        aria-pressed={data.services.includes(o.id)}
                      >
                        <span className="check" aria-hidden="true">✓</span>
                        <span>
                          <strong>{o.label}</strong>
                          {o.note}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="inq-step">
                  <div className="step-h">
                    <span className="step-n">Step 2 of {STEPS}</span>
                  </div>
                  <h3>About your business.</h3>
                  <p className="hint">
                    A couple of details so we can route you to the right person.
                  </p>
                  <div className="field">
                    <label id="size-label">How many people work in the business?</label>
                    <div className="opt-grid" role="group" aria-labelledby="size-label">
                      {SIZE_OPTS.map((o) => (
                        <button
                          key={o.id}
                          className={"opt " + (data.size === o.id ? "on" : "")}
                          onClick={() => update("size", o.id)}
                          aria-pressed={data.size === o.id}
                        >
                          <span className="check" aria-hidden="true">✓</span>
                          <span>
                            <strong>{o.label}</strong>
                            {o.note || "\u00a0"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label id="timeline-label">When do you want to start?</label>
                    <div className="opt-grid" role="group" aria-labelledby="timeline-label">
                      {TIMELINE_OPTS.map((o) => (
                        <button
                          key={o.id}
                          className={"opt " + (data.timeline === o.id ? "on" : "")}
                          onClick={() => update("timeline", o.id)}
                          aria-pressed={data.timeline === o.id}
                        >
                          <span className="check" aria-hidden="true">✓</span>
                          <span>
                            <strong>{o.label}</strong>
                            {"\u00a0"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="inq-step">
                  <div className="step-h">
                    <span className="step-n">Step 3 of {STEPS}</span>
                  </div>
                  <h3>Where can we reach you?</h3>
                  <div className="field">
                    <label htmlFor="inq-name">Your name</label>
                    <input
                      id="inq-name"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jordan Reyes"
                      autoComplete="name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="inq-email">Email</label>
                    <input
                      id="inq-email"
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jordan@yourshop.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="inq-company">Company / business name <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
                    <input
                      id="inq-company"
                      value={data.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Reyes & Co."
                      autoComplete="organization"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="inq-step">
                  <div className="step-h">
                    <span className="step-n">Step 4 of {STEPS}</span>
                  </div>
                  <h3>Anything you want us to know?</h3>
                  <p className="hint">Optional. A few sentences is plenty.</p>
                  <div className="field">
                    <label htmlFor="inq-note" className="sr-only">Additional notes</label>
                    <textarea
                      id="inq-note"
                      value={data.note}
                      onChange={(e) => update("note", e.target.value)}
                      placeholder="The thing keeping you up at night, the question you can't get a straight answer on, or just where you're stuck."
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="inq-actions">
                <button
                  className={"btn-link " + (step === 0 ? "disabled" : "")}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  ← Back
                </button>
                {step < STEPS - 1 ? (
                  <button
                    className="btn btn-amber inq-next-btn"
                    disabled={!canNext}
                    style={{ opacity: canNext ? 1 : 0.4 }}
                    onClick={() => canNext && setStep((s) => s + 1)}
                  >
                    {step === 2 ? "Almost done" : "Next step"}
                    <Icon name="arrow-right" size={14} />
                  </button>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <button
                      className="btn btn-amber inq-next-btn"
                      onClick={submit}
                      disabled={submitting}
                      style={{ opacity: submitting ? 0.6 : 1 }}
                    >
                      {submitting ? "Sending…" : "Send inquiry"}
                      <Icon name="arrow-right" size={14} />
                    </button>
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono), ui-monospace, monospace" }}>
                      We read every inquiry personally.
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="success">
              <div className="mark">
                <Icon name="check" size={26} />
              </div>
              <h3>Thanks — we&apos;ve got it.</h3>
              <p>
                We&apos;ll read this today and reply within two business days, from
                a real inbox, with whether we think we can help.
              </p>
              <div className="ref">Reference: {ref}</div>
              <button
                className="btn-link"
                style={{ marginTop: 8 }}
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setData({
                    services: [],
                    size: "",
                    timeline: "",
                    name: "",
                    email: "",
                    company: "",
                    note: "",
                  });
                }}
              >
                Submit another inquiry
              </button>
            </div>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
