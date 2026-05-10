# Animation Spec Template — The Merchant Guide
## Long-Form Video (5+ Minutes)

Use this template to create a specification file for any long-form animated video. Fill in the beats to match your script, and hand it to Claude with your script. Claude builds the animation from this spec.

**What this is:** A contract between the voiceover and the animation. It makes sure timing, visuals, and emphasis align beat by beat.

**What this is NOT:** Code. Frame numbers. Pixel positions. Component props. Keep it in plain English. Claude handles the technical translation. Giving Claude creative room within clear boundaries produces better results than controlling every detail.

---

## Project

```
Title: [Video title]
Duration: [Estimated total length]
Style: Editorial line art meets warm indie magazine. Clean, minimal, human. Think Monocle or Kinfolk — not TechCrunch.
Audience: Startup founders and small business owners (1–25 people) who are smart but overwhelmed. They know their craft — they just don't have bandwidth for the business side. They're skeptical of agencies and buzzwords. Speak to them like a trusted friend who happens to be good at this stuff.
```

---

## Visual Philosophy

Claude references this section when making design decisions for every scene.

```
Color palette:
  - Background: #f7f1de (warm cream paper)
  - Cream: #f3e9c8 (deeper warm cream, for cards/layers)
  - Amber: #d4a04a (primary accent — golden, warm, the signature color)
  - Amber deep: #b07f2c (darker amber for depth/emphasis)
  - Ink: #1f1d14 (warm near-black for text and line art)
  - Ink 2: #3a3526 (warm dark brown for secondary text)
  - Muted: #6c6750 (warm gray-brown for captions and labels)
  - Olive: #5d6240 (earthy sage green — use sparingly, never dominant)
  - Rust: #b15a32 (occasional warm accent)
  - Avoid: cold blues, purples, neons, high-saturation colors, gradients that feel "tech"

Typography:
  - Headings: Geist Sans — clean, modern, friendly. Not geometric/cold.
  - Body: Geist Sans — same family, lighter weight.
  - Labels/details: Geist Mono — monospace for an editorial, "printed" feel. Uppercase, letter-spaced for eyebrows.
  - Fallback if Geist unavailable: Inter (body), JetBrains Mono (mono).
  - Never use script fonts, decorative fonts, or anything that feels like a wedding invitation.

Animation style:
  - Gentle and natural. Smooth ease-in-out transitions.
  - Elements should feel like they're arriving, not attacking. Fade + gentle slide, not snap or bounce.
  - Build-up reveals preferred — things assemble, grow, unfurl. Not explode or shatter.
  - Hand-drawn stroke animations for line art (stroke-dashoffset reveals).
  - Subtle parallax and breathing motion for ambient scenes.
  - Seamless loops for GIFs and background elements.

Motion principles:
  - Slow: Establishing shots, emotional moments, the founder note, trust-building beats.
  - Medium: Explanations, walkthroughs, showing how things work.
  - Faster: Lists, stats, before/after comparisons. But never frantic.
  - Pause: After a key insight lands. Give the viewer a beat to absorb.
  - Everything should feel unhurried. We're not selling urgency — we're building trust.

Background:
  - Warm cream (#f7f1de) as the base canvas — like quality paper stock.
  - Subtle paper texture is welcome but never heavy or grungy.
  - Section shifts: gentle warm tint changes (cream → slightly deeper cream → latte). No jarring dark/light cuts.
  - If dark background is needed: use warm dark brown (#3a3526), never pure black.

Text on screen:
  - Minimal. Keywords and short phrases only — never full paragraphs.
  - Eyebrow labels in Geist Mono, uppercase, letter-spaced, in muted (#6c6750).
  - Key words/stats in amber (#d4a04a) for emphasis.
  - Numbers and data points can be larger. Let them breathe.
  - Avoid text walls. If it takes more than a glance to read, it's too much.
```

---

## Imagery & Metaphor Library

Reference these when writing beat visuals. They're the recurring symbols of the brand.

```
Trust & relationships:
  - Two people across a small table, leaning in, coffee cups between them
  - A handshake — simple, warm, not corporate
  - An "open" sign on a door
  - A handwritten note or letter

Growth & momentum:
  - A seedling growing, leaves unfurling
  - A simple line chart trending gently upward
  - A storefront going from dark to lit up
  - Boxes being unpacked, a shop being set up

Getting things done:
  - Checklist items getting amber checkmarks one by one
  - Sticky notes landing on a board
  - A receipt with items checking off
  - A browser window loading a clean website

The founder / human touch:
  - A hand writing with a pen (ink flowing)
  - A single coffee cup, steam rising
  - A desk with a notebook, pen, and phone — not cluttered
  - A person looking at their phone/laptop and smiling

Main Street, not Silicon Valley:
  - Small storefronts with awnings
  - Brick walls, wooden counters, chalkboard signs
  - A neighborhood street with a few small shops
  - A "back in 5 minutes" door sign
```

---

## Voice & Tone for Script Writing

```
We sound like:
  - A smart friend giving you advice over coffee
  - Someone who's been there and figured it out
  - Warm but direct — not wishy-washy, not aggressive
  - "Here's what I'd do if I were you" energy

We don't sound like:
  - An agency pitch ("leverage synergies to drive growth")
  - A hype bro ("crush it, scale fast, disrupt")
  - A textbook ("pursuant to industry best practices")
  - Condescending ("as a small business owner, you probably don't know...")

Sentence style:
  - Short sentences. Conversational rhythm.
  - Use "you" and "we" — never "one" or "the client"
  - Contractions always (we're, you'll, don't, can't)
  - End on the human note, not the business note
  - "So you can get back to the work you actually started this for."
```

---

## Beat Map

Each beat is a moment in the video tied to the script. Timestamps align to the voiceover. Claude builds one scene (or sequence of scenes) per beat.

```
## Beat 1: [Title]
Timestamp: 0:00 - 0:15
Script: "[The exact words being spoken during this beat]"
Visual: [What the viewer sees. Describe the animation, graphic, or on-screen element. Reference the imagery library above.]
Emphasis: [What should stand out? A word? A number? A visual element? If a word, it appears in amber.]
Mood: [Energy level — building, calm, intense, reflective]
Transition: [How does this beat end and the next one begin? Gentle crossfade / slide / build-on-top / etc.]

## Beat 2: [Title]
Timestamp: 0:15 - 0:35
Script: "[Exact words]"
Visual: [Description]
Emphasis: [What stands out]
Mood: [Energy]
Transition: [Into next beat]

## Beat 3: [Title]
...
```

**Tips for writing beats:**
- One beat per distinct idea or visual moment. If the visual changes, that's a new beat.
- Keep the script field to the exact words being spoken. This is what Claude uses for timing.
- Visual descriptions should say what appears, not how to code it. "A stack of seven layers building from bottom to top" not "render a flexbox column with seven divs."
- Emphasis tells Claude what the viewer's eye should be drawn to at this moment.
- Mood helps Claude choose animation speed, easing, and intensity.
- Reference the imagery library — "the coffee table conversation" is faster than re-describing it every time.

---

## Key Moments

List the 3-5 moments in the video that absolutely must land. These are the beats where the visual and the words need to hit together perfectly. Claude will prioritize getting these right.

```
1. [Timestamp] — [Description of what must land and why]
2. [Timestamp] — [Description]
3. [Timestamp] — [Description]
```

---

## Audio Sync Points

Specific words or phrases where an animation must trigger at the exact moment the word is spoken.

```
- At "[specific word]" (timestamp): [what should appear or change]
- At "[specific phrase]" (timestamp): [what should appear or change]
- At "[specific word]" (timestamp): [what should appear or change]
```

---

## Technical Notes (Optional)

Only include this section if you have specific technical constraints. Otherwise, let Claude make these decisions based on the visual philosophy.

```
Frame rate: 30fps
Resolution: 1920x1080 (landscape) or 1080x1920 (vertical/social)
Aspect ratio: 16:9 (YouTube/website) or 9:16 (Reels/TikTok/Shorts)
Export: GIF for web embeds, MP4 for social/YouTube
Component reuse: [List any existing components if applicable]
Libraries: [Any specific libraries beyond defaults]
```

---
---

# Animation Spec Template — The Merchant Guide
## Short-Form Video (Under 60 Seconds)

Shorter format. Fewer beats. Faster pacing. Same brand warmth.

---

## Project

```
Title: [Video title]
Duration: [Target length — 15s / 30s / 45s / 60s]
Platform: [Instagram Reel / TikTok / YouTube Short / Website hero / etc.]
Hook: [First 2-3 seconds — what grabs attention. Must be visual + verbal. For TMG: lead with a relatable pain point or a surprising stat.]
Style: Editorial line art, warm cream + amber palette. Clean and human, never flashy.
```

---

## Visual Philosophy

```
Color palette: Warm cream (#f7f1de) background, amber (#d4a04a) accent, ink (#1f1d14) line art. See long-form template for full palette.
Motion: Gentle builds, not hard cuts. Even in short-form, we don't do frantic. Purposeful pacing > rapid fire.
Text: Big, clean keywords in Geist Sans. One phrase per screen max. Key words in amber. Eyebrow labels in Geist Mono uppercase.
Aspect ratio: 9:16 (vertical) for social, 16:9 (landscape) for website embeds
```

---

## Beat Map

Short-form videos typically have 3-6 beats. Every second counts.

```
## Beat 1: Hook
Timestamp: 0:00 - 0:03
Script: "[Opening words — the pain point or attention grab]"
Visual: [What grabs attention immediately. For TMG: start with the problem, not us.]
Emphasis: [The one thing the viewer must read/see]

## Beat 2: Setup
Timestamp: 0:03 - 0:12
Script: "[Words]"
Visual: [Description]
Emphasis: [Key element]

## Beat 3: Payoff
Timestamp: 0:12 - 0:25
Script: "[Words]"
Visual: [Description]
Emphasis: [Key element]

## Beat 4: Close
Timestamp: 0:25 - 0:30
Script: "[Closing words or CTA — for TMG: always end on the human benefit, not the service. 'So you can get back to your customers' > 'Contact us today']"
Visual: [Final frame — TMG wordmark, amber accent, simple CTA. Clean, not busy.]
```

---

## Key Moment

One moment that must land. In short-form, there's usually only one.

```
[Timestamp] — [What must hit and why]
```

---

## Audio Sync

```
- At "[word]" (timestamp): [trigger]
```

---
---

# TMG Spec Generation Prompt

Paste this into Claude when you have a script and want it to generate the first draft of a spec. Edit the output before building.

```
I have a script for a [long-form / short-form] video for The Merchant Guide.
I want you to generate an animation spec from it.

Here is the script:
[paste your script]

Use the TMG animation spec template structure:
- Project section (title, duration, style, audience)
- Visual philosophy (use the TMG brand defaults — warm cream #f7f1de
  background, amber #d4a04a accent, ink #1f1d14 line art, Geist Sans/Mono
  typography, editorial line art style, gentle animation)
- Beat map (one beat per distinct visual moment, with timestamp, script
  excerpt, visual description, emphasis, mood, transition)
- Key moments (3-5 beats that must land perfectly)
- Audio sync points (specific words where animations must trigger)

Reference the TMG imagery library for visual ideas:
- Trust: coffee table conversations, handshakes, open signs, handwritten notes
- Growth: seedlings, upward charts, storefronts lighting up
- Getting things done: checklists with amber checks, sticky notes, receipts
- Human touch: hand writing, coffee steam, clean desk, person smiling
- Main Street: storefronts, awnings, brick walls, neighborhood streets

Brand voice: conversational, warm, direct. Like a smart friend giving advice
over coffee. Short sentences. "You" and "we." End on the human benefit.

Keep all descriptions in plain English. No code, no frame numbers, no pixel
values. Describe what the viewer sees, not how to build it.
```
