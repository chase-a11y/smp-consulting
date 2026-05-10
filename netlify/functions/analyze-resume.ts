import type { Context } from "@netlify/functions";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export default async function handler(req: Request, _context: Context) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY not configured", { status: 500 });
  }

  const {
    resumeText,
    jobDescription,
    jobTitle,
    required,
    niceToHave,
    hardDisqualifiers,
    softFlags,
  } = await req.json();

  if (!resumeText) {
    return new Response("Missing resumeText", { status: 400 });
  }

  const systemPrompt = `You are an expert technical recruiter AI. Analyze resumes against job requirements and return structured JSON assessments.

You MUST respond with ONLY valid JSON matching this exact schema:
{
  "name": "string (full name from resume)",
  "headline": "string (current title + company, e.g. 'Senior Backend Engineer at Stripe')",
  "location": "string (city, state/country)",
  "relocate": boolean,
  "yoe": number (years of experience),
  "currentRole": "string",
  "currentCompany": "string",
  "tenure": "string (e.g. '2y 4mo')",
  "stack": ["string array of technologies"],
  "education": "string (degree + school)",
  "summary": "string (2-3 sentence resume summary)",
  "source": "Upload",
  "triage": {
    "verdict": "escalate" | "maybe" | "disqualify",
    "confidence": number (0.0 to 1.0),
    "summary": "string (1 sentence explaining verdict)",
    "hits": ["string array of strengths matching requirements"],
    "misses": ["string array of gaps or missing requirements"],
    "flags": ["string array of soft concerns"]
  }
}

Verdict guidelines:
- "escalate": Strong match. Meets most/all required qualifications, relevant experience, good stack overlap. Confidence typically 0.75-0.95.
- "maybe": Partial match. Some requirements met but gaps exist, or experience is adjacent. Needs human review. Confidence typically 0.45-0.70.
- "disqualify": Clear mismatch. Missing critical requirements, insufficient experience, or triggers hard disqualifiers. Confidence typically 0.70-0.95.

Check these HARD DISQUALIFIERS (instant disqualify if triggered):
${hardDisqualifiers.map((d: string) => `- ${d}`).join("\n")}

Check these SOFT FLAGS (note but don't auto-disqualify):
${softFlags.map((f: string) => `- ${f}`).join("\n")}`;

  const userPrompt = `## Job: ${jobTitle}

### Description
${jobDescription}

### Required qualifications
${required.map((r: string) => `- ${r}`).join("\n")}

### Nice to have
${niceToHave.map((n: string) => `- ${n}`).join("\n")}

---

## Resume text (extracted from PDF):

${resumeText}

---

Analyze this resume against the job requirements. Return ONLY the JSON object.`;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(`Claude API error: ${err}`, { status: 502 });
    }

    const data = await response.json();
    const text = data.content[0].text;

    // Extract JSON from response (handle potential markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response("Failed to parse Claude response", { status: 502 });
    }

    const candidate = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(candidate), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Error: ${message}`, { status: 500 });
  }
}
