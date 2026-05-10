"use client";

import { useState, useRef, useCallback } from "react";
import { Icon } from "./icons";
import { extractText } from "./pdf-extract";
import { analyzeResume } from "./api";
import type { Job, Candidate } from "./types";

interface UploadStatus {
  fileName: string;
  status: "extracting" | "analyzing" | "done" | "error";
  error?: string;
}

export function UploadZone({
  job,
  onCandidatesReady,
  onClose,
}: {
  job: Job;
  onCandidatesReady: (candidates: Candidate[]) => void;
  onClose: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [statuses, setStatuses] = useState<UploadStatus[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const pdfs = Array.from(newFiles).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
    );
    setFiles((prev) => [...prev, ...pdfs]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);

    const initialStatuses: UploadStatus[] = files.map((f) => ({
      fileName: f.name,
      status: "extracting",
    }));
    setStatuses(initialStatuses);

    const results: Candidate[] = [];
    const baseId = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Extract text
      setStatuses((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "extracting" } : s
        )
      );

      let text: string;
      try {
        text = await extractText(file);
      } catch {
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? { ...s, status: "error", error: "Failed to read PDF" }
              : s
          )
        );
        continue;
      }

      // Analyze with Claude
      setStatuses((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "analyzing" } : s
        )
      );

      try {
        const candidate = await analyzeResume(text, job);
        candidate.id = `c-${baseId + i}`;
        candidate.receivedAt = "just now";
        if (!candidate.source) candidate.source = "Upload";
        results.push(candidate);
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: "done" } : s
          )
        );
      } catch (err) {
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  status: "error",
                  error:
                    err instanceof Error ? err.message : "Analysis failed",
                }
              : s
          )
        );
      }
    }

    if (results.length > 0) {
      onCandidatesReady(results);
    }
    setProcessing(false);
  };

  const doneCount = statuses.filter((s) => s.status === "done").length;
  const errorCount = statuses.filter((s) => s.status === "error").length;
  const isComplete = processing === false && statuses.length > 0;

  return (
    <div className="rt-upload-overlay" onClick={onClose}>
      <div className="rt-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rt-upload-header">
          <h2>Upload resumes</h2>
          <button className="rt-btn rt-btn-ghost rt-btn-sm" onClick={onClose}>
            <Icon kind="x" size={16} />
          </button>
        </div>

        {!processing && statuses.length === 0 && (
          <>
            <div
              className={`rt-drop-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <Icon kind="export" size={32} />
              <p>
                Drop PDF resumes here or <strong>click to browse</strong>
              </p>
              <span className="rt-drop-hint">
                Accepts .pdf files — bulk upload supported
              </span>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
              }}
            />
          </>
        )}

        {files.length > 0 && !processing && statuses.length === 0 && (
          <div className="rt-file-list">
            <div className="rt-file-list-header">
              <span>
                {files.length} resume{files.length !== 1 ? "s" : ""} ready
              </span>
              <button
                className="rt-btn rt-btn-sm rt-btn-ghost"
                onClick={() => setFiles([])}
              >
                Clear
              </button>
            </div>
            {files.map((f, i) => (
              <div key={i} className="rt-file-row">
                <Icon kind="doc" size={14} />
                <span>{f.name}</span>
                <span className="rt-file-size">
                  {(f.size / 1024).toFixed(0)} KB
                </span>
              </div>
            ))}
          </div>
        )}

        {statuses.length > 0 && (
          <div className="rt-file-list">
            <div className="rt-file-list-header">
              <span>
                {doneCount} of {statuses.length} processed
                {errorCount > 0 && ` (${errorCount} failed)`}
              </span>
            </div>
            {statuses.map((s, i) => (
              <div key={i} className="rt-file-row">
                <span
                  className={`rt-status-dot ${s.status}`}
                />
                <span>{s.fileName}</span>
                <span className="rt-file-status">
                  {s.status === "extracting" && "Reading PDF..."}
                  {s.status === "analyzing" && "Analyzing..."}
                  {s.status === "done" && "Done"}
                  {s.status === "error" && (s.error || "Failed")}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="rt-upload-actions">
          {!processing && statuses.length === 0 && (
            <button
              className="rt-btn rt-btn-accent"
              disabled={files.length === 0}
              onClick={handleProcess}
            >
              Analyze {files.length} resume{files.length !== 1 ? "s" : ""}
            </button>
          )}
          {isComplete && (
            <button className="rt-btn rt-btn-accent" onClick={onClose}>
              Done — view results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
