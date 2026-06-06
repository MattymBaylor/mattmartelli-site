# Image Gaps & Visual Findings

Log-only — no visual changes were made without approval. Two parts:

1. **Part F** — bare/dark sections and diagram-reference verification (observe-and-log).
2. **Part E2 punch list** — image optimization deferred to you (per request); recommended targets below. No image files were resized, compressed, or modified.

---

## Part F — bare / dark sections

- ~~**Marketing Operations & CRM** (`#marketing-ops`) — was bare (heading + chips + link only).~~ **RESOLVED:** added an inline `lead → revenue` pipeline diagram (`components/sections/MarketingOpsDiagram.tsx`) as the section's visual anchor; the full interactive "Marketing Operations Engine" still lives in Proof of Work.
- **AI Orchestration & Frameworks** (`components/sections/Orchestration.tsx`, `#orchestration`) — has two text cards (the ordered "what matters" list + the dashed "tooling layer" grid) and a single `Boxes` icon, but no diagram/imagery. Reads as text-dense rather than truly bare. — suggest (optional): a small "system core ← orbiting tools" diagram would reinforce the "system first, tooling follows" thesis visually.

### Promised diagrams — verified present (no gap)

- `site.ts → voice.diagramRef` ("…interactive diagram below") — **renders.** A "Voice AI Architecture" React-Flow diagram exists in Proof of Work (`content/diagrams.ts` id `voice-ai`), and an interactive voice stage diagram renders immediately below at `#voice-capabilities` (`InteractiveVoiceCapabilities.tsx`). Minor UX note: the link target is `#proof-of-work`, which scrolls past the nearer `#voice-capabilities` diagram.
- `site.ts → marketing.diagramRef` ("…Marketing Operations Engine below") — **renders.** The "Marketing Operations Engine" tab exists in Proof of Work (`content/diagrams.ts` id `marketing-ops`). It is two sections "below," not immediately adjacent, but the diagram does exist and is reachable.

---

## Part E2 — image optimization punch list (deferred, do later)

Heavy originals in `/public` ship at full resolution. Card display is ~33vw, so these are far larger than needed. Recommended: resize to ≤1600px on the long edge and ≤250 KB. **No `projects.ts` `width`/`height` changes were made** — the files are unchanged, so the recorded intrinsic dimensions still match. Update those dims only when you actually resize.

| File | Current | Current size | Recommended target | projects.ts dims to update after resize |
|------|---------|--------------|--------------------|------------------------------------------|
| `/yelp-dashboard.png` | 3668×3181 | ~1.1 MB | ≤1600px long edge, ≤250 KB | `width`/`height` (e.g. 1600×1387 at 1600 long edge) |
| `/retell-voice-agent.png` | 4112×2336 | ~992 KB | ≤1600px long edge, ≤250 KB | `width`/`height` (e.g. 1600×909) |
| `/workflow-viral-video.png` | 3700×1902 | ~579 KB | ≤1600px long edge, ≤250 KB | `width`/`height` (e.g. 1600×822) |

Notes from a trial run (reverted): plain downscale-to-1600 PNG landed at ~534 KB / ~410 KB / ~316 KB — still over budget. Converting the downscaled versions to JPEG q82 hit 220 KB / 248 KB / 128 KB and looked visually identical on the card. If you go the JPEG route, rename to `.jpg` and update the three `src` values in `content/projects.ts` (only file referencing them) plus the `width`/`height`.

Already reasonable — leave as-is: `matt-maya-show.jpg` (1400×951), `ai-brief.png` (1280×720), `voice-ecosystem.png` / `revenue-recovery.png` (1600×1000).

### next/image tuning (also deferred under E2)
- Consider `quality={82}` on the heaviest/flagship card + modal images in `components/sections/Projects.tsx` and the demo image in `app/seinfeld-hq/page.tsx` (default 75 is fine elsewhere).
- `loading="lazy"`: all `next/image` calls here are below-the-fold and none set `priority`, so they already lazy-load by default. No change needed.
- Do NOT change the responsive `sizes` attr or grid breakpoints — they're correct.

---

## Suggested visuals & assets you can provide (punch list)

Areas that would benefit from a real asset. For each I've noted what it is, where it goes, and the ideal format/spec so you can drop it in. Nothing here is wired up yet — flag which you want and I'll add them.

### Missing / placeholder (will look unfinished until filled)
- **Marketing Automation Transformation** — `content/projects.ts` (`id: marketing-transformation`) currently renders the `FlowMotif` placeholder (`image.placeholder: true`, empty `src`). — provide: a screenshot of a CRM/lifecycle dashboard, journey builder, or attribution report (HubSpot/Salesforce/Marketo). Target ~1600×1000, ≤250 KB. Redact client names. Then set `src`, drop `placeholder`, and add a real `alt`.
- ~~**Marketing Operations & CRM section** is visually bare.~~ **RESOLVED** with an inline code-only diagram (see above). No asset needed; a screenshot could still replace it later if you prefer a real-data visual.

### Optional upgrades (work today, would land harder with a real image)
- **AI Voice Agent Ecosystem** — `voice-ecosystem.png` (1600×1000) is a product landing screenshot. Fine as-is; if you have a cleaner call-flow graphic or a Retell/AI dashboard shot, it would read more "system" than "marketing page."
- **Revenue Recovery Platform** — `revenue-recovery.png` (1600×1000) is the speed-to-lead landing page. The card alt now cites the sourced 391%/78%/21× figures; if you have an actual recovery-workflow screenshot (n8n run, dashboard), that would be stronger proof than the landing page.
- **AI Orchestration** section (`#orchestration`) — text-dense, no imagery. No asset needed; I can add a small "system core ← orbiting tools" diagram (code-only) if you want a visual there.
- **Seinfeld HQ org chart** — agent portraits exist (`/public/agents/*.png`). No gap; noting it's already covered.

### Heavy originals to optimize (same files as the E2 table above)
- `/yelp-dashboard.png`, `/retell-voice-agent.png`, `/workflow-viral-video.png` — see the punch-list table above for current vs. target. If you'd rather I batch-optimize these once you confirm, I can do it in one pass (resize + JPEG q82 + update `projects.ts` dims/src). Currently untouched per your instruction.

### How to hand assets back
Drop files in `/public` (or share links) and tell me the project id + a one-line caption; I'll wire `src`/`alt`/`width`/`height` and place any inline diagrams.
