"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import Reveal from "@/components/reveal";
import { BUSINESS_TYPES, AREAS, generateSOP, type SOPTemplate } from "./templates";

type Step = "type" | "areas" | "result";

export default function SOPBuilder() {
  const [step, setStep] = useState<Step>("type");
  const [bizType, setBizType] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [sops, setSops] = useState<SOPTemplate[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggleArea = (id: string) =>
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );

  const generate = () => {
    const result = generateSOP(bizType, selectedAreas);
    setSops(result);
    setStep("result");
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const reset = () => {
    setStep("type");
    setBizType("");
    setSelectedAreas([]);
    setSops([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="section" style={{ paddingTop: "clamp(120px, 14vh, 180px)" }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="eyebrow">
              <span className="dot"></span>SOP template builder
            </span>
            <h1 style={{ marginTop: 14, fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              Build a{" "}
              <em style={{ fontStyle: "italic", color: "var(--ochre-deep)" }}>
                starter SOP
              </em>{" "}
              in 60 seconds.
            </h1>
            <p
              className="lede"
              style={{ marginTop: 18, maxWidth: "52ch", marginInline: "auto" }}
            >
              Pick your business type and the areas you need, and we&apos;ll
              generate an operating procedure you can use today. No signup
              required.
            </p>
          </div>
        </Reveal>

        {/* Step indicator */}
        {(() => {
          const stepIdx = step === "type" ? 0 : step === "areas" ? 1 : 2;
          const labels = ["Business type", "Operational areas", "Your SOPs"];
          return (
            <div className="sop-steps">
              {labels.map((label, i) => (
                <div key={label} style={{ display: "contents" }}>
                  {i > 0 && <div className="sop-step-line" />}
                  <div className={"sop-step" + (i === stepIdx ? " on" : i < stepIdx ? " done" : "")}>
                    <span className="sop-step-num">{i + 1}</span>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Step 1: Business type */}
        {step === "type" && (
          <Reveal>
            <div className="tool-card" style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 20, marginBottom: 4 }}>
                What kind of business do you run?
              </h3>
              <p style={{ color: "var(--ink-2)", fontSize: 14, marginBottom: 20 }}>
                This helps us tailor the procedures to your industry.
              </p>
              <div className="opt-grid cols-2">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt.id}
                    className={"opt" + (bizType === bt.id ? " on" : "")}
                    onClick={() => setBizType(bt.id)}
                  >
                    <span className="check" aria-hidden="true">✓</span>
                    <span>{bt.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                <button
                  className="btn btn-amber"
                  disabled={!bizType}
                  style={{ opacity: bizType ? 1 : 0.4 }}
                  onClick={() => setStep("areas")}
                >
                  Next: pick areas
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 2: Operational areas */}
        {step === "areas" && (
          <Reveal>
            <div className="tool-card" style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 20, marginBottom: 4 }}>
                Which areas do you need SOPs for?
              </h3>
              <p style={{ color: "var(--ink-2)", fontSize: 14, marginBottom: 20 }}>
                Select one or more. We&apos;ll generate a template for each.
              </p>
              <div className="opt-grid cols-1">
                {AREAS.map((area) => (
                  <button
                    key={area.id}
                    className={"opt" + (selectedAreas.includes(area.id) ? " on" : "")}
                    onClick={() => toggleArea(area.id)}
                  >
                    <span className="check" aria-hidden="true">✓</span>
                    <span>{area.label}</span>
                  </button>
                ))}
              </div>
              <div className="hc-nav" style={{ marginTop: 24 }}>
                <button className="btn-link" onClick={() => setStep("type")}>
                  ← Back
                </button>
                <button
                  className="btn btn-amber"
                  disabled={selectedAreas.length === 0}
                  style={{ opacity: selectedAreas.length > 0 ? 1 : 0.4 }}
                  onClick={generate}
                >
                  Generate {selectedAreas.length === 1 ? "SOP" : `${selectedAreas.length} SOPs`}
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Step 3: Results */}
        {step === "result" && sops.length > 0 && (
          <div ref={resultRef} style={{ marginTop: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <p style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: ".06em",
                color: "var(--muted)",
              }}>
                {sops.length} {sops.length === 1 ? "template" : "templates"} generated for{" "}
                {BUSINESS_TYPES.find((b) => b.id === bizType)?.label}
              </p>
              <button
                className="btn btn-amber"
                style={{ fontSize: 13, padding: "8px 16px" }}
                onClick={handlePrint}
              >
                Print / save as PDF
              </button>
            </div>

            {sops.map((sop, i) => (
              <div key={i} className="sop-output" id={`sop-${i}`}>
                <div className="sop-output-header">
                  <span className="sop-output-badge">SOP</span>
                  <h3 className="sop-output-title">{sop.title}</h3>
                </div>

                <div className="sop-output-meta">
                  <div>
                    <span className="sop-meta-label">Purpose</span>
                    <p>{sop.purpose}</p>
                  </div>
                  <div>
                    <span className="sop-meta-label">Scope</span>
                    <p>{sop.scope}</p>
                  </div>
                </div>

                <div className="sop-output-steps">
                  {sop.steps.map((step, si) => (
                    <div key={si} className="sop-step-block">
                      <h4 className="sop-step-title">
                        <span className="sop-step-badge">{si + 1}</span>
                        {step.title}
                      </h4>
                      <ul className="sop-checklist">
                        {step.details.map((d, di) => (
                          <li key={di}>
                            <span className="sop-check-box" aria-hidden="true">☐</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {sop.tips.length > 0 && (
                  <div className="sop-tips">
                    <span className="sop-meta-label">Tips</span>
                    <ul>
                      {sop.tips.map((tip, ti) => (
                        <li key={ti}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* CTA */}
            <div className="tool-card" style={{ marginTop: 32, textAlign: "center" }}>
              <h3 style={{ fontSize: 22 }}>
                Need SOPs built for your business?
              </h3>
              <p style={{ color: "var(--ink-2)", maxWidth: "48ch", margin: "8px auto 24px", fontSize: 14 }}>
                These templates are a starting point. We build custom operating
                procedures tailored to how your team actually works — not how
                a textbook says it should.
              </p>
              <Link href="/services/consulting" className="btn btn-amber" style={{ textDecoration: "none" }}>
                Learn about consulting
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>

            <p style={{
              marginTop: 32,
              textAlign: "center",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 12,
              color: "var(--muted)",
              letterSpacing: ".06em",
            }}>
              <Link href="/tools" style={{ textDecoration: "underline" }}>
                ← Back to tools
              </Link>
              {" · "}
              <button
                onClick={reset}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  font: "inherit",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                Build another SOP
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
