"use client";

import { useState, useMemo } from "react";
import { Sidebar, Topbar } from "./components";
import { JDPane, QueuePane, TriageCard } from "./triage-views";
import { BulkView, AuditLogView, ExportModal, NotesView } from "./other-views";
import { UploadZone } from "./upload-zone";
import { JOB, CANDIDATES, AUDIT_LOG_SEED } from "./data";
import type { Candidate, AuditEntry } from "./types";

export default function ResumeTriagePage() {
  const [view, setView] = useState("triage");
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [selectedId, setSelectedId] = useState("c-001");
  const [filter, setFilter] = useState("all");
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(AUDIT_LOG_SEED);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const candidatesById = useMemo(
    () => Object.fromEntries(candidates.map((c) => [c.id, c])),
    [candidates]
  );
  const selected = candidatesById[selectedId];
  const exporting = exportingId ? candidatesById[exportingId] : null;

  const counts = {
    queue: candidates.filter((c) => !c.autoDQ).length,
    total: candidates.length,
    audit: auditLog.length,
  };

  const setVerdict = (id: string, verdict: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const prevV = c.triage.verdict;
        if (prevV !== verdict) {
          setAuditLog((log) => [
            {
              type: "override",
              candidateId: id,
              at: "just now",
              from: prevV,
              to: verdict,
              note: "Manual override by reviewer.",
              reviewer: "Marcus Chen",
            },
            ...log,
          ]);
        }
        return {
          ...c,
          triage: {
            ...c.triage,
            verdict: verdict as Candidate["triage"]["verdict"],
          },
          autoDQ: undefined,
        };
      })
    );
  };

  const restore = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              autoDQ: undefined,
              triage: { ...c.triage, verdict: "maybe" as const },
            }
          : c
      )
    );
    setAuditLog((log) => [
      {
        type: "override",
        candidateId: id,
        at: "just now",
        from: "disqualify",
        to: "maybe",
        note: "Restored from auto-DQ for human review.",
        reviewer: "Marcus Chen",
      },
      ...log,
    ]);
  };

  const bulkSetVerdict = (ids: string[], verdict: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        ids.includes(c.id)
          ? {
              ...c,
              triage: {
                ...c.triage,
                verdict: verdict as Candidate["triage"]["verdict"],
              },
              autoDQ: undefined,
            }
          : c
      )
    );
    setAuditLog((log) => [
      {
        type: "override",
        candidateId: ids[0],
        at: "just now",
        from: "bulk",
        to: verdict,
        note: `Bulk action: ${ids.length} candidates set to ${verdict}.`,
        reviewer: "Marcus Chen",
      },
      ...log,
    ]);
  };

  const handleNewCandidates = (newCandidates: Candidate[]) => {
    setCandidates((prev) => [...newCandidates, ...prev]);
    setAuditLog((log) => [
      {
        type: "flagged",
        candidateId: newCandidates[0]?.id || "",
        at: "just now",
        reviewer: "System",
        note: `${newCandidates.length} resume${newCandidates.length !== 1 ? "s" : ""} uploaded and analyzed.`,
      },
      ...log,
    ]);
    if (newCandidates.length > 0) {
      setSelectedId(newCandidates[0].id);
    }
  };

  return (
    <div className="rt-app">
      <Sidebar view={view} setView={setView} counts={counts} onUpload={() => setShowUpload(true)} />
      <div className="rt-main">
        <Topbar
          view={view}
          candidate={selected}
          onExport={() => setExportingId(selectedId)}
        />
        {view === "triage" && (
          <div className="rt-workspace">
            <JDPane job={JOB} />
            <QueuePane
              candidates={candidates}
              selectedId={selectedId}
              onSelect={setSelectedId}
              filter={filter}
              setFilter={setFilter}
            />
            <TriageCard
              candidate={selected}
              job={JOB}
              onSetVerdict={setVerdict}
              onRestore={restore}
              onExport={() => setExportingId(selectedId)}
            />
          </div>
        )}
        {view === "bulk" && (
          <BulkView
            candidates={candidates}
            onSelect={(id) => {
              setSelectedId(id);
              setView("triage");
            }}
            onBulkSetVerdict={bulkSetVerdict}
          />
        )}
        {view === "audit" && (
          <AuditLogView log={auditLog} candidatesById={candidatesById} />
        )}
        {view === "notes" && <NotesView />}
      </div>

      {exporting && (
        <ExportModal
          candidate={exporting}
          job={JOB}
          onClose={() => setExportingId(null)}
        />
      )}

      {showUpload && (
        <UploadZone
          job={JOB}
          onCandidatesReady={handleNewCandidates}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
