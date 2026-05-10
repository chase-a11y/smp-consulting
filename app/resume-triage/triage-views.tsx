"use client";

import { useMemo } from "react";
import { Icon } from "./icons";
import { initials, VerdictPill, Tag } from "./components";
import type { Job, Candidate } from "./types";

export function JDPane({ job }: { job: Job }) {
  return (
    <div className="rt-pane rt-scroll-y">
      <div className="rt-pane-header">
        <div className="rt-pane-title-row">
          <h2>Job description</h2>
          <button className="rt-btn rt-btn-sm rt-btn-ghost" title="Edit JD">
            <Icon kind="external" size={12} />
          </button>
        </div>
      </div>
      <div className="rt-jd">
        <div className="rt-role-id">
          {job.id} &middot; {job.team}
        </div>
        <h1>{job.title}</h1>
        <div className="rt-jd-meta">
          <Tag dot="green">{job.location}</Tag>
          <Tag>{job.workMode}</Tag>
          <Tag>{job.level}</Tag>
          <Tag>{job.compRange}</Tag>
        </div>

        <div className="rt-jd-section">
          <h3>About the role</h3>
          {job.description.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="rt-jd-section">
          <h3>Required</h3>
          <ul className="rt-jd-list">
            {job.required.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="rt-jd-section">
          <h3>Nice to have</h3>
          <ul className="rt-jd-list">
            {job.niceToHave.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="rt-jd-section">
          <h3>Auto-disqualify rules</h3>
          {job.hardDisqualifiers.map((r) => (
            <div key={r.id} className="rt-rule-row">
              <span className="rt-rule-icon">DQ</span>
              <span>{r.label}</span>
              <span className="rt-rule-id">{r.id}</span>
            </div>
          ))}
        </div>

        <div className="rt-jd-section">
          <h3>Soft flags</h3>
          {job.softFlags.map((r) => (
            <div key={r.id} className="rt-rule-row soft">
              <span className="rt-rule-icon">!</span>
              <span>{r.label}</span>
              <span className="rt-rule-id">{r.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QueuePane({
  candidates,
  selectedId,
  onSelect,
  filter,
  setFilter,
}: {
  candidates: Candidate[];
  selectedId: string;
  onSelect: (id: string) => void;
  filter: string;
  setFilter: (f: string) => void;
}) {
  const counts = useMemo(
    () => ({
      all: candidates.length,
      escalate: candidates.filter((c) => c.triage.verdict === "escalate")
        .length,
      maybe: candidates.filter((c) => c.triage.verdict === "maybe").length,
      disqualify: candidates.filter((c) => c.triage.verdict === "disqualify")
        .length,
    }),
    [candidates]
  );

  const filtered = useMemo(() => {
    let list = candidates;
    if (filter !== "all")
      list = list.filter((c) => c.triage.verdict === filter);
    return list;
  }, [candidates, filter]);

  return (
    <div className="rt-pane rt-scroll-y">
      <div className="rt-pane-header" style={{ paddingBottom: 0 }}>
        <div className="rt-pane-title-row">
          <h2>
            Queue &middot; {filtered.length} of {candidates.length}
          </h2>
        </div>
      </div>
      <div className="rt-queue-filters">
        {(
          [
            { id: "all", label: "All", count: counts.all },
            { id: "escalate", label: "Escalate", count: counts.escalate },
            { id: "maybe", label: "Maybe", count: counts.maybe },
            { id: "disqualify", label: "Disqualify", count: counts.disqualify },
          ] as const
        ).map((p) => (
          <span
            key={p.id}
            className={`rt-filter-pill ${filter === p.id ? "active" : ""}`}
            onClick={() => setFilter(p.id)}
          >
            {p.label} <span className="rt-count">{p.count}</span>
          </span>
        ))}
      </div>
      <div>
        {filtered.length === 0 && (
          <div className="rt-empty">No candidates match this filter.</div>
        )}
        {filtered.map((c) => (
          <div
            key={c.id}
            className={`rt-candidate-row ${selectedId === c.id ? "selected" : ""} ${c.autoDQ ? "dimmed" : ""}`}
            onClick={() => onSelect(c.id)}
          >
            <div className="rt-cand-avatar">{initials(c.name)}</div>
            <div>
              <div className="rt-cand-name">{c.name}</div>
              <div className="rt-cand-headline">{c.headline}</div>
              <div className="rt-cand-meta">
                <span>{c.location}</span>
                <span className="rt-dot">&middot;</span>
                <span>{c.receivedAt}</span>
                {c.autoDQ && (
                  <>
                    <span className="rt-dot">&middot;</span>
                    <span style={{ color: "var(--rt-dq)" }}>auto-DQ</span>
                  </>
                )}
              </div>
            </div>
            <VerdictPill verdict={c.triage.verdict} />
          </div>
        ))}
      </div>
    </div>
  );
}

const VERDICT_META: Record<
  string,
  { icon: string; label: string; cta: string }
> = {
  escalate: {
    icon: "\u2191",
    label: "Escalate to engineering",
    cta: "Send to hiring manager",
  },
  maybe: {
    icon: "?",
    label: "Maybe \u2014 needs review",
    cta: "Move to phone screen",
  },
  disqualify: {
    icon: "\u00d7",
    label: "Disqualify",
    cta: "Send polite decline",
  },
};

export function TriageCard({
  candidate,
  job,
  onSetVerdict,
  onRestore,
  onExport,
}: {
  candidate: Candidate | undefined;
  job: Job;
  onSetVerdict: (id: string, verdict: string) => void;
  onRestore: (id: string) => void;
  onExport: () => void;
}) {
  if (!candidate) {
    return (
      <div className="rt-pane rt-scroll-y">
        <div className="rt-empty">Select a candidate from the queue.</div>
      </div>
    );
  }

  const { triage } = candidate;
  const meta = VERDICT_META[triage.verdict];
  const requiredStack = ["Go", "Python", "Postgres", "Kafka"];

  return (
    <div className="rt-pane rt-scroll-y">
      <div className="rt-card-pane">
        <div className="rt-card-head">
          <div className="rt-lg-avatar">{initials(candidate.name)}</div>
          <div>
            <h2>{candidate.name}</h2>
            <div className="rt-sub">{candidate.headline}</div>
            <div className="rt-sub" style={{ marginTop: 4, fontSize: 12 }}>
              Received {candidate.receivedAt} via {candidate.source}
            </div>
          </div>
          <div className="rt-card-head-actions">
            <button className="rt-btn rt-btn-sm">
              <Icon kind="external" size={12} /> Open resume
            </button>
          </div>
        </div>

        {candidate.autoDQ && (
          <div className="rt-auto-dq-banner">
            <span className="rt-badge">Auto-DQ</span>
            <span>
              Triggered <strong>{candidate.autoDQ.at}</strong> by rule:{" "}
              <em>{candidate.autoDQ.ruleLabel}</em>
            </span>
            <span
              className="rt-restore"
              onClick={() => onRestore(candidate.id)}
            >
              Restore to queue
            </span>
          </div>
        )}

        <div className={`rt-verdict-banner ${triage.verdict}`}>
          <div className="rt-v-icon">{meta.icon}</div>
          <div>
            <div className="rt-v-label">{meta.label}</div>
            <div className="rt-v-summary">{triage.summary}</div>
          </div>
          <div className="rt-confidence">
            confidence
            <br />
            <span style={{ color: "var(--rt-ink)", fontSize: 14 }}>
              {Math.round(triage.confidence * 100)}%
            </span>
          </div>
        </div>

        <div className="rt-card-grid">
          <div className="rt-card-section">
            <h4>Quick facts</h4>
            <div>
              <div className="rt-fact-row">
                <span className="rt-key">Years experience</span>
                <span className="rt-val">{candidate.yoe}y</span>
              </div>
              <div className="rt-fact-row">
                <span className="rt-key">Current role</span>
                <span className="rt-val">{candidate.currentRole}</span>
              </div>
              <div className="rt-fact-row">
                <span className="rt-key">Company</span>
                <span className="rt-val">
                  {candidate.currentCompany} &middot; {candidate.tenure}
                </span>
              </div>
              <div className="rt-fact-row">
                <span className="rt-key">Location</span>
                <span className="rt-val">
                  {candidate.location}
                  {candidate.relocate ? " \u00b7 open to relocate" : ""}
                </span>
              </div>
              <div className="rt-fact-row">
                <span className="rt-key">Education</span>
                <span className="rt-val">{candidate.education}</span>
              </div>
            </div>
          </div>
          <div className="rt-card-section">
            <h4>Stack</h4>
            <div className="rt-stack-chips" style={{ marginBottom: 12 }}>
              {candidate.stack.map((s) => (
                <span
                  key={s}
                  className={`rt-stack-chip ${requiredStack.includes(s) ? "match" : ""}`}
                >
                  {s}
                </span>
              ))}
            </div>
            <h4 style={{ marginTop: 18 }}>Resume summary</h4>
            <div
              style={{
                fontSize: 13,
                color: "var(--rt-ink-2)",
                lineHeight: 1.55,
              }}
            >
              {candidate.summary}
            </div>
          </div>
        </div>

        <div
          className="rt-card-grid"
          style={{
            gridTemplateColumns: triage.flags.length
              ? "1fr 1fr 1fr"
              : "1fr 1fr",
          }}
        >
          {triage.hits.length > 0 && (
            <div className="rt-card-section">
              <h4>Strengths &middot; {triage.hits.length}</h4>
              <ul className="rt-signal-list hits">
                {triage.hits.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          {triage.misses.length > 0 && (
            <div className="rt-card-section">
              <h4>Gaps &middot; {triage.misses.length}</h4>
              <ul className="rt-signal-list misses">
                {triage.misses.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          {triage.flags.length > 0 && (
            <div className="rt-card-section">
              <h4>Soft flags &middot; {triage.flags.length}</h4>
              <ul className="rt-signal-list flags">
                {triage.flags.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rt-action-bar">
          <button
            className="rt-btn rt-btn-danger rt-btn-sm"
            onClick={() => onSetVerdict(candidate.id, "disqualify")}
          >
            Disqualify
          </button>
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => onSetVerdict(candidate.id, "maybe")}
          >
            Mark Maybe
          </button>
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => onSetVerdict(candidate.id, "escalate")}
          >
            Escalate
          </button>
          <div className="rt-spacer" />
          <button className="rt-btn rt-btn-accent" onClick={onExport}>
            {meta.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
