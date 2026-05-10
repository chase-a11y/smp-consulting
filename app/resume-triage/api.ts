import type { Job, Candidate } from "./types";

const API_URL = "/api/analyze-resume";

export async function analyzeResume(
  resumeText: string,
  job: Job
): Promise<Candidate> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resumeText,
      jobDescription: job.description,
      jobTitle: job.title,
      required: job.required,
      niceToHave: job.niceToHave,
      hardDisqualifiers: job.hardDisqualifiers.map((d) => d.label),
      softFlags: job.softFlags.map((f) => f.label),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Analysis failed: ${err}`);
  }

  return res.json();
}
