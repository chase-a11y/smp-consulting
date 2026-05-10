---
name: animation-spec
description: Use when creating animation specs, GIF briefs, or video storyboards for The Merchant Guide. Loads brand kit, visual style, and spec template.
allowed-tools: Read, Write, Edit, Bash(ls:*), Glob, Grep, WebFetch, Task
---

# TMG Animation Spec Generator

Generate an animation specification for The Merchant Guide using the brand kit and spec template.

Input: $ARGUMENTS

## Step 1: Load Brand Context

Read the brand kit and animation spec template:

1. Read `brand-kit.md` at the project root for colors, typography, tone, and visual style.
2. Read `animation-spec-template.md` at the project root for the full template structure, imagery library, and voice guide.

If either file is missing, stop and tell the user.

## Step 2: Determine Format

Based on the user's input ($ARGUMENTS), determine the format:

- **"long"** or **"long-form"** or duration 5+ minutes → Use the long-form template
- **"short"** or **"short-form"** or duration under 60 seconds → Use the short-form template
- **"gif"** or **"loop"** → Use the short-form template with loop-specific defaults (seamless loop, 3-8 second cycle, no audio sync needed)
- **"prompt"** or **"generate prompt"** → Use the spec generation prompt at the bottom of the template to create a spec from a script the user provides
- **No format specified** → Ask the user what they're making

## Step 3: Build the Spec

### If the user provided a script or description:
1. Use the TMG spec generation prompt (from the template) to generate a first draft
2. Pre-fill the Visual Philosophy section with TMG brand defaults (don't make the user repeat brand details)
3. Reference the imagery library when choosing visuals for beats
4. Match the voice & tone guide for any script suggestions
5. Present the draft and ask for feedback

### If the user wants a blank template to fill in:
1. Output the appropriate template (long-form or short-form) with TMG brand defaults already filled in
2. Leave beat map, key moments, and audio sync sections empty for the user to fill

### If the user wants prompts for Claude Design or Midjourney:
1. Generate prompts using the brand kit colors, style, and imagery themes
2. For **Claude Design**: Frame as SVG/CSS animation specs with exact hex codes, animation timing, and loop behavior
3. For **Midjourney**: Use `--style raw --v 6.1` with hex color references and editorial line art direction
4. Include the brand kit summary as a preamble the user can paste before any prompt

## Key Brand Constraints

Always enforce these — never deviate:

- **Colors**: Warm cream (#f7f1de) base, amber (#d4a04a) accent, ink (#1f1d14) text. No cold blues, no neons, no tech gradients.
- **Style**: Editorial line art. Monocle/Kinfolk magazine feel, not TechCrunch.
- **Motion**: Gentle ease-in-out. Things arrive, they don't attack. Build-up reveals, not explosions.
- **Tone**: Smart friend over coffee. Conversational, warm, direct. Never corporate, never hype.
- **Imagery**: Main Street, not Silicon Valley. Storefronts, coffee cups, handshakes, seedlings.
- **Text on screen**: Minimal. Keywords only. Key words in amber. Eyebrows in mono uppercase.
- **Dark backgrounds**: Use warm brown (#3a3526), never pure black.

## Output

Save the completed spec to the project root as `specs/[descriptive-name]-spec.md`. Create the `specs/` directory if it doesn't exist.

Tell the user the file path and summarize what was generated.
