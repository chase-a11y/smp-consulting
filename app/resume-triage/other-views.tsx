"use client";

import { useState, useMemo, useCallback } from "react";
import { Icon } from "./icons";
import { VerdictPill } from "./components";
import type { Job, Candidate, AuditEntry } from "./types";

export function BulkView({
  candidates,
  onSelect,
  onBulkSetVerdict,
}: {
  candidates: Candidate[];
  onSelect: (id: string) => void;
  onBulkSetVerdict: (ids: string[], verdict: string) => void;
}) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "received",
    dir: "asc",
  });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    const list = candidates.filter((c) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(s) ||
        c.currentCompany.toLowerCase().includes(s) ||
        c.location.toLowerCase().includes(s) ||
        c.stack.join(" ").toLowerCase().includes(s)
      );
    });
    const verdictOrder: Record<string, number> = {
      escalate: 0,
      maybe: 1,
      disqualify: 2,
    };
    return [...list].sort((a, b) => {
      let r = 0;
      switch (sort.key) {
        case "name":
          r = a.name.localeCompare(b.name);
          break;
        case "verdict":
          r =
            (verdictOrder[a.triage.verdict] ?? 0) -
            (verdictOrder[b.triage.verdict] ?? 0);
          break;
        case "yoe":
          r = a.yoe - b.yoe;
          break;
        case "company":
          r = a.currentCompany.localeCompare(b.currentCompany);
          break;
        case "confidence":
          r = a.triage.confidence - b.triage.confidence;
          break;
        case "received":
          r = candidates.indexOf(a) - candidates.indexOf(b);
          break;
        default:
          r = 0;
      }
      return sort.dir === "asc" ? r : -r;
    });
  }, [candidates, sort, search]);

  const toggleSort = (key: string) => {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selected.size === sorted.length) setSelected(new Set());
    else setSelected(new Set(sorted.map((c) => c.id)));
  };

  const sortIcon = (k: string) =>
    sort.key === k ? (sort.dir === "asc" ? " \u2191" : " \u2193") : "";

  const setCheckboxRef = useCallback(
    (el: HTMLInputElement | null) => {
      if (el)
        el.indeterminate =
          selected.size > 0 && selected.size < sorted.length;
    },
    [selected.size, sorted.length]
  );

  return (
    <>
      <div className="rt-table-toolbar">
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 8,
              top: 7,
              color: "var(--rt-ink-3)",
              pointerEvents: "none",
            }}
          >
            <Icon kind="search" size={13} />
          </span>
          <input
            className="rt-search-input"
            style={{ paddingLeft: 28 }}
            placeholder="Search name, company, stack\u2026"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="rt-btn rt-btn-sm">
          <Icon kind="filter" size={13} /> Filter
        </button>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 12,
            color: "var(--rt-ink-3)",
          }}
        >
          Showing {sorted.length} of {candidates.length}
        </div>
      </div>
      <div className="rt-table-wrap">
        <table className="rt-bulk">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input
                  type="checkbox"
                  className="rt-bulk-checkbox"
                  checked={
                    selected.size === sorted.length && sorted.length > 0
                  }
                  ref={setCheckboxRef}
                  onChange={toggleAll}
                />
              </th>
              <th onClick={() => toggleSort("name")}>
                Candidate{sortIcon("name")}
              </th>
              <th onClick={() => toggleSort("verdict")}>
                Verdict{sortIcon("verdict")}
              </th>
              <th onClick={() => toggleSort("yoe")} style={{ width: 80 }}>
                YoE{sortIcon("yoe")}
              </th>
              <th onClick={() => toggleSort("company")}>
                Company{sortIcon("company")}
              </th>
              <th>Stack</th>
              <th>Location</th>
              <th
                onClick={() => toggleSort("confidence")}
                style={{ width: 90 }}
              >
                Conf.{sortIcon("confidence")}
              </th>
              <th
                onClick={() => toggleSort("received")}
                style={{ width: 100 }}
              >
                Received{sortIcon("received")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr
                key={c.id}
                className={c.autoDQ ? "dimmed" : ""}
                onClick={() => onSelect(c.id)}
              >
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(c.id);
                  }}
                >
                  <input
                    type="checkbox"
                    className="rt-bulk-checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => {}}
                  />
                </td>
                <td className="rt-cand-cell">
                  {c.name}
                  <div className="rt-sub">{c.currentRole}</div>
                </td>
                <td>
                  <VerdictPill verdict={c.triage.verdict} />
                </td>
                <td className="rt-tab-num">{c.yoe}y</td>
                <td>{c.currentCompany}</td>
                <td>
                  <div className="rt-stack-chips">
                    {c.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rt-stack-chip"
                        style={{ fontSize: 10, padding: "1px 6px" }}
                      >
                        {s}
                      </span>
                    ))}
                    {c.stack.length > 3 && (
                      <span
                        style={{ fontSize: 11, color: "var(--rt-ink-3)" }}
                      >
                        +{c.stack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ fontSize: 12, color: "var(--rt-ink-3)" }}>
                  {c.location}
                </td>
                <td className="rt-tab-num">
                  {Math.round(c.triage.confidence * 100)}%
                </td>
                <td className="rt-tab-num">{c.receivedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected.size > 0 && (
        <div className="rt-bulk-action-bar">
          <span className="rt-selected-count">{selected.size} selected</span>
          <span style={{ opacity: 0.5 }}>&middot;</span>
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => {
              onBulkSetVerdict([...selected], "escalate");
              setSelected(new Set());
            }}
          >
            Escalate all
          </button>
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => {
              onBulkSetVerdict([...selected], "maybe");
              setSelected(new Set());
            }}
          >
            Mark Maybe
          </button>
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => {
              onBulkSetVerdict([...selected], "disqualify");
              setSelected(new Set());
            }}
          >
            Disqualify
          </button>
          <div style={{ flex: 1 }} />
          <button
            className="rt-btn rt-btn-sm"
            onClick={() => setSelected(new Set())}
          >
            Clear selection
          </button>
        </div>
      )}
    </>
  );
}

export function AuditLogView({
  log,
  candidatesById,
}: {
  log: AuditEntry[];
  candidatesById: Record<string, Candidate>;
}) {
  const [filter, setFilter] = useState("all");

  const counts: Record<string, number> = {
    all: log.length,
    "auto-dq": log.filter((l) => l.type === "auto-dq").length,
    override: log.filter((l) => l.type === "override").length,
    flagged: log.filter((l) => l.type === "flagged").length,
  };
  const filtered =
    filter === "all" ? log : log.filter((l) => l.type === filter);

  const lowConfidenceCount = log.filter(
    (l) => l.type === "auto-dq" && l.confidence != null && l.confidence < 0.85
  ).length;

  return (
    <div className="rt-scroll-y" style={{ overflow: "auto" }}>
      <div className="rt-audit-wrap">
        <div className="rt-audit-header">
          <div>
            <h1>Auto-disqualifier audit log</h1>
            <div className="rt-sub">
              Every auto-disqualify, override, and flagged decision for this
              role. Reviewable, undoable.
            </div>
          </div>
          <button className="rt-btn">
            <Icon kind="export" size={13} /> Export CSV
          </button>
        </div>

        <div className="rt-audit-stats">
          <div className="rt-audit-stat">
            <div className="rt-num">{counts["auto-dq"]}</div>
            <div className="rt-lbl">Auto-disqualified</div>
          </div>
          <div className="rt-audit-stat">
            <div className="rt-num">{counts["override"]}</div>
            <div className="rt-lbl">Reviewer overrides</div>
          </div>
          <div className="rt-audit-stat">
            <div
              className="rt-num"
              style={{
                color: lowConfidenceCount ? "var(--rt-maybe)" : "inherit",
              }}
            >
              {lowConfidenceCount}
            </div>
            <div className="rt-lbl">Low confidence (&lt;85%)</div>
          </div>
          <div className="rt-audit-stat">
            <div className="rt-num">
              {Math.round(
                (100 * counts["override"]) /
                  Math.max(1, counts["auto-dq"])
              )}
              %
            </div>
            <div className="rt-lbl">Override rate</div>
          </div>
        </div>

        <div className="rt-audit-filters">
          {(
            [
              { id: "all", label: "All events" },
              { id: "auto-dq", label: "Auto-DQ" },
              { id: "override", label: "Overrides" },
              { id: "flagged", label: "Flagged for review" },
            ] as const
          ).map((p) => (
            <span
              key={p.id}
              className={`rt-filter-pill ${filter === p.id ? "active" : ""}`}
              onClick={() => setFilter(p.id)}
            >
              {p.label} <span className="rt-count">{counts[p.id]}</span>
            </span>
          ))}
        </div>

        <div className="rt-audit-table">
          <div className="rt-audit-row head">
            <div>Time</div>
            <div>Type</div>
            <div>Candidate</div>
            <div>Reason / note</div>
            <div>Confidence</div>
            <div>Action</div>
          </div>
          {filtered.length === 0 && (
            <div className="rt-empty">No events match this filter.</div>
          )}
          {filtered.map((l, i) => {
            const cand = candidatesById[l.candidateId];
            return (
              <div key={i} className="rt-audit-row">
                <div className="rt-at">{l.at}</div>
                <div>
                  <span className={`rt-audit-type-pill ${l.type}`}>
                    {l.type === "auto-dq" ? "Auto-DQ" : l.type}
                  </span>
                </div>
                <div>
                  <div className="rt-candname">
                    {cand?.name || l.candidateId}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--rt-ink-3)",
                      marginTop: 1,
                    }}
                  >
                    {cand?.currentCompany}
                  </div>
                </div>
                <div style={{ color: "var(--rt-ink-2)", fontSize: 13 }}>
                  {l.ruleLabel && (
                    <strong style={{ fontWeight: 500 }}>
                      {l.ruleLabel}
                    </strong>
                  )}
                  {l.from && l.to && (
                    <>
                      <strong style={{ fontWeight: 500 }}>{l.from}</strong>{" "}
                      &rarr;{" "}
                      <strong style={{ fontWeight: 500 }}>{l.to}</strong>
                    </>
                  )}
                  {l.note && (
                    <div
                      style={{
                        color: "var(--rt-ink-3)",
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {l.note}
                    </div>
                  )}
                </div>
                <div
                  className={`rt-conf ${l.confidence != null && l.confidence < 0.85 ? "low" : ""}`}
                >
                  {l.confidence != null
                    ? `${Math.round(l.confidence * 100)}%`
                    : "\u2014"}
                </div>
                <div>
                  {l.type === "auto-dq" && (
                    <button className="rt-btn rt-btn-sm">Review</button>
                  )}
                  {l.type === "override" && (
                    <span
                      style={{ fontSize: 11, color: "var(--rt-ink-3)" }}
                    >
                      by {l.reviewer}
                    </span>
                  )}
                  {l.type === "flagged" && (
                    <span
                      style={{ fontSize: 11, color: "var(--rt-ink-3)" }}
                    >
                      resolved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function buildExports(candidate: Candidate, job: Job) {
  const {
    name,
    headline,
    location,
    yoe,
    currentRole,
    currentCompany,
    stack,
    source,
    triage,
    autoDQ,
  } = candidate;
  const verdictLabel: Record<string, string> = {
    escalate: "ESCALATE",
    maybe: "MAYBE",
    disqualify: "DISQUALIFY",
  };
  const vl = verdictLabel[triage.verdict] || triage.verdict;

  const md = `# ${name} \u2014 ${vl}
**Role:** ${job.title} (${job.id}) \u00b7 **Confidence:** ${Math.round(triage.confidence * 100)}%

## Snapshot
- ${headline}
- ${currentRole} at **${currentCompany}**
- ${yoe} years \u00b7 ${location}
- Source: ${source}
- Stack: ${stack.join(", ")}

## Verdict rationale
${triage.summary}

${triage.hits.length ? `### Strengths\n${triage.hits.map((h) => `- ${h}`).join("\n")}` : ""}

${triage.misses.length ? `### Gaps\n${triage.misses.map((h) => `- ${h}`).join("\n")}` : ""}

${triage.flags.length ? `### Soft flags\n${triage.flags.map((h) => `- ${h}`).join("\n")}` : ""}

${autoDQ ? `\n> \u26a0 Auto-disqualified by rule: *${autoDQ.ruleLabel}*` : ""}

\u2014 Triaged by Recap, reviewed by Marcus Chen`;

  const txt = `${name} \u2014 ${vl} (${Math.round(triage.confidence * 100)}% confidence)
Role: ${job.title} (${job.id})

${headline}
${currentRole} at ${currentCompany} \u00b7 ${yoe}y \u00b7 ${location}
Stack: ${stack.join(", ")}

Verdict: ${triage.summary}

Strengths:
${triage.hits.map((h) => `  + ${h}`).join("\n") || "  (none flagged)"}

Gaps:
${triage.misses.map((h) => `  - ${h}`).join("\n") || "  (none flagged)"}

${triage.flags.length ? `Soft flags:\n${triage.flags.map((h) => `  ! ${h}`).join("\n")}\n` : ""}${autoDQ ? `\n[Auto-DQ: ${autoDQ.ruleLabel}]` : ""}`;

  const csv = `name,verdict,confidence,role,company,yoe,location,stack,summary
"${name}","${vl}",${triage.confidence.toFixed(2)},"${currentRole}","${currentCompany}",${yoe},"${location}","${stack.join("; ")}","${triage.summary.replace(/"/g, '""')}"`;

  return { md, txt, csv };
}

export function ExportModal({
  candidate,
  job,
  onClose,
}: {
  candidate: Candidate;
  job: Job;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"md" | "txt" | "csv">("md");
  const [copied, setCopied] = useState(false);
  const exports = useMemo(
    () => buildExports(candidate, job),
    [candidate, job]
  );
  const content = exports[tab];

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rt-modal-backdrop" onClick={onClose}>
      <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rt-modal-head">
          <Icon kind="export" size={18} />
          <h2>Send {candidate.name} to engineering</h2>
          <button className="rt-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="rt-format-tabs">
          {(
            [
              { id: "md" as const, label: "Markdown" },
              { id: "txt" as const, label: "Plain text" },
              { id: "csv" as const, label: "CSV" },
            ]
          ).map((t) => (
            <span
              key={t.id}
              className={`rt-format-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </span>
          ))}
        </div>
        <div className="rt-export-preview">{content}</div>
        <div className="rt-modal-foot">
          <span className={`rt-copied ${copied ? "show" : ""}`}>
            &#10003; Copied to clipboard
          </span>
          <button className="rt-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="rt-btn">
            <Icon kind="copy" size={13} /> Download .{tab}
          </button>
          <button className="rt-btn rt-btn-accent" onClick={copy}>
            <Icon kind="copy" size={13} /> Copy to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

export function NotesView() {
  return (
    <div className="rt-scroll-y" style={{ overflow: "auto" }}>
      <div className="rt-notes-wrap">
        <h1>Design notes</h1>
        <div className="rt-lede">
          How Recap turns a JD + a stack of resumes into a triage card a
          non-technical coordinator can act on &mdash; and how the
          auto-disqualifier audit log keeps the system honest.
        </div>

        <h2>The user and their job</h2>
        <p>
          Marcus is a recruiting coordinator at a 600-person fintech. He is not
          an engineer. Each new req brings 40&ndash;200 inbound resumes per
          week. His job is to filter, summarise, and forward the strongest
          candidates to the hiring manager &mdash; politely deflect the rest,
          and never waste an engineer&rsquo;s time.
        </p>
        <p>
          He has three failure modes today: (1) accidentally sending
          unqualified candidates to engineering, (2) accidentally rejecting
          strong candidates because of surface signals, and (3) being slow.
          Recap is built around reducing all three.
        </p>

        <h2>Verdict model</h2>
        <p>
          Three tiers &mdash; kept deliberately small so a non-technical user
          can hold them in their head:
        </p>
        <ul>
          <li>
            <strong>Escalate</strong> &mdash; strong match, send to hiring
            manager today.
          </li>
          <li>
            <strong>Maybe</strong> &mdash; worth a 15-minute phone screen;
            ambiguous on at least one axis.
          </li>
          <li>
            <strong>Disqualify</strong> &mdash; clear miss on a hard
            requirement; polite decline.
          </li>
        </ul>
        <p>
          Each verdict carries a <code>confidence</code> score (0.0&ndash;1.0)
          so the UI can flag low-confidence decisions for human review &mdash;
          particularly important for auto-disqualifies, where the cost of a
          false negative (rejecting a strong candidate) is much higher than a
          false positive.
        </p>

        <h2>The triage data shape</h2>
        <p>For each candidate, the LLM emits:</p>
        <pre>{`{
  verdict: "escalate" | "maybe" | "disqualify",
  confidence: 0.0\u20131.0,
  summary: string,
  hits: string[],
  misses: string[],
  flags: string[],
  autoDQ?: {
    rule: string,
    ruleLabel: string,
    triggeredAt: ISO8601
  }
}`}</pre>

        <h2>Edge cases the design handles</h2>
        <ul>
          <li>
            <strong>Explained gaps</strong> &mdash; Sana Iqbal (c-008) has an
            18-month gap but a returnship and on-resume explanation. The card
            surfaces the context; she escalates rather than auto-DQs.
          </li>
          <li>
            <strong>Title regressions</strong> &mdash; Marcus Brennan (c-004)
            is an EM applying to an IC role. Flagged, not DQ&rsquo;d; surfaces
            &ldquo;confirm motivation&rdquo; for the screen.
          </li>
          <li>
            <strong>Job hopping</strong> &mdash; James Whitfield (c-007) hits
            the tenure threshold; verdict is &ldquo;maybe&rdquo; with the
            pattern in flags.
          </li>
          <li>
            <strong>Stack ambiguity</strong> &mdash; JD says &ldquo;Go OR
            Python&rdquo;. Beatrice Lin (c-013) has Python only &mdash;
            that&rsquo;s a match, not a miss.
          </li>
        </ul>

        <h2>Auto-disqualifier audit log</h2>
        <p>
          The audit log is the trust layer. Every auto-DQ is reviewable,
          undoable, and timestamped. The override rate (top-right stat) tells
          when the rules need retuning.
        </p>

        <h2>What&rsquo;s next</h2>
        <ul>
          <li>
            Inline &ldquo;explain this verdict&rdquo; pop-up showing which JD
            clause + resume sentence drove each hit/miss.
          </li>
          <li>
            Per-role rule editor for fine-tuning auto-DQ thresholds per req.
          </li>
          <li>
            Calibration dashboard: override rate over time, broken out by rule.
          </li>
        </ul>
      </div>
    </div>
  );
}
