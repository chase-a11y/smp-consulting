"use client";

import { Icon } from "./icons";
import type { Candidate } from "./types";

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function VerdictPill({
  verdict,
  size,
}: {
  verdict: string;
  size?: "lg";
}) {
  const labels: Record<string, string> = {
    escalate: "Escalate",
    maybe: "Maybe",
    disqualify: "Disqualify",
    unreviewed: "Pending",
  };
  return (
    <span
      className={`rt-verdict-pill ${verdict}`}
      style={size === "lg" ? { fontSize: 12, padding: "3px 10px" } : undefined}
    >
      {labels[verdict] || verdict}
    </span>
  );
}

export function Tag({
  children,
  dot,
}: {
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <span className="rt-tag">
      {dot && <span className={`rt-tag-dot ${dot}`} />}
      {children}
    </span>
  );
}

export function Sidebar({
  view,
  setView,
  counts,
  onUpload,
}: {
  view: string;
  setView: (v: string) => void;
  counts: { queue: number; total: number; audit: number };
  onUpload?: () => void;
}) {
  const items = [
    { id: "triage", label: "Triage queue", icon: "queue", count: counts.queue },
    { id: "bulk", label: "Bulk view", icon: "table", count: counts.total },
    { id: "audit", label: "Audit log", icon: "audit", count: counts.audit },
    { id: "notes", label: "Design notes", icon: "doc", count: undefined },
  ];

  return (
    <aside className="rt-sidebar">
      <div className="rt-brand">
        <div className="rt-logo">R</div>
        Recap
      </div>

      <div className="rt-section-label">Active role</div>
      <div
        className="rt-nav-item active"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "8px 8px 10px",
          gap: 2,
          height: "auto",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          Sr. Backend Eng.
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--rt-ink-3)",
            fontFamily: "var(--rt-mono)",
            lineHeight: 1.3,
          }}
        >
          JOB-2847 &middot; Payments
        </div>
      </div>

      <div className="rt-section-label">Workspace</div>
      {items.map((it) => (
        <div
          key={it.id}
          className={`rt-nav-item ${view === it.id ? "active" : ""}`}
          onClick={() => setView(it.id)}
        >
          <span className="rt-ico">
            <Icon kind={it.icon} size={14} />
          </span>
          {it.label}
          {it.count != null && <span className="rt-count">{it.count}</span>}
        </div>
      ))}

      {onUpload && (
        <div
          className="rt-nav-item rt-upload-btn"
          onClick={onUpload}
        >
          <span className="rt-ico">
            <Icon kind="export" size={14} />
          </span>
          Upload resumes
        </div>
      )}

      <div className="rt-sidebar-footer">
        <div className="rt-avatar">MC</div>
        <div>
          <div style={{ color: "var(--rt-ink)" }}>Marcus Chen</div>
          <div>Recruiter</div>
        </div>
      </div>
    </aside>
  );
}

export function Topbar({
  view,
  onExport,
  candidate,
}: {
  view: string;
  onExport: () => void;
  candidate: Candidate | undefined;
}) {
  const titles: Record<string, string[]> = {
    triage: ["Roles", "JOB-2847", "Triage"],
    bulk: ["Roles", "JOB-2847", "Bulk view"],
    audit: ["Roles", "JOB-2847", "Audit log"],
    notes: ["Design notes"],
  };
  const t = titles[view] || [];

  return (
    <div className="rt-topbar">
      <div className="rt-crumbs">
        {t.map((s, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <span className={i === t.length - 1 ? "rt-here" : ""}>{s}</span>
            {i < t.length - 1 && <span className="rt-sep">/</span>}
          </span>
        ))}
      </div>
      <div className="rt-topbar-actions">
        {view === "triage" && candidate && (
          <button className="rt-btn" onClick={onExport}>
            <Icon kind="export" size={13} /> Export to engineering
          </button>
        )}
        {view === "triage" && (
          <button className="rt-btn rt-btn-ghost" title="Settings">
            <Icon kind="settings" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
