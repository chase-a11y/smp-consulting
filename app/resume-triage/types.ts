export interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  workMode: string;
  level: string;
  compRange: string;
  postedAt: string;
  hiringManager: string;
  recruiter: string;
  description: string;
  required: string[];
  niceToHave: string[];
  hardDisqualifiers: { id: string; label: string }[];
  softFlags: { id: string; label: string }[];
}

export interface TriageResult {
  verdict: "escalate" | "maybe" | "disqualify";
  confidence: number;
  summary: string;
  hits: string[];
  misses: string[];
  flags: string[];
}

export interface AutoDQ {
  rule: string;
  ruleLabel: string;
  at: string;
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  location: string;
  relocate: boolean;
  yoe: number;
  currentRole: string;
  currentCompany: string;
  tenure: string;
  stack: string[];
  education: string;
  summary: string;
  receivedAt: string;
  source: string;
  triage: TriageResult;
  autoDQ?: AutoDQ;
}

export interface AuditEntry {
  type: "auto-dq" | "override" | "flagged";
  candidateId: string;
  at: string;
  rule?: string;
  ruleLabel?: string;
  reviewer: string;
  confidence?: number;
  from?: string;
  to?: string;
  note?: string;
}
