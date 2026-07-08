# Build Log — mattmartelli.com

Operational memory + deck source material. Logs the *moves* (judgment calls, decisions, reusable patterns), not every commit. Deck-worthy beats tagged `[DECK]`.

---

## 2026-06-18 — Architecture showcase, GA4, Seinfeld org chart, podcast

**Shipped to production (mattmartelli.com), verified live:**

- **Architecture showcase section** replaced the weak "Explore the Systems" (ProofOfWork) section on the homepage. A simple dropdown that swaps between six self-contained system-diagram HTMLs (served from `/public/architecture/`), each a real multi-agent architecture mapped to a different industry — field crew ops, AI recruitment pipeline, mission control, voice-AI confirmation, mixture-of-agents, founder-led funnel. `components/sections/ArchitectureShowcase.tsx`, anchor `#architecture`.
  - `[DECK]` **Scrub-before-publish discipline.** Every diagram was scrubbed of confidential client identifiers (HomeGenius/HGE, David Bayer, real $ figures, logos) and replaced with realistic generic stand-ins *before* going public. The honest-framing principle applied to artifacts, not just copy — the architectures are real, the names are not.
  - `[DECK]` **Verify after structural removal.** Deleting the old section orphaned its `#proof-of-work` anchor — the nav item, hero CTA, and two in-body links all silently pointed at a section that no longer existed. Caught it in post-deploy verification (grep on the live HTML), repointed everything to `#architecture`, relabeled, and re-shipped. The move: removing a section is never just a deletion; you chase its inbound links.

- **GA4 analytics** wired onto the site (`app/layout.tsx`, `next/script`, id `G-K90LREJCJF` — currently the growthmindset.ai tag reused; pools into that property, split by hostname until a dedicated mattmartelli.com stream exists).
  - `[DECK]` **Eat the dog food** — instrumenting his own portfolio with the same analytics discipline he'd sell a client.

- **Seinfeld HQ org chart** section added to `/seinfeld-hq` (under the live agent feed), rendering the full agent org chart (`AgentOrgChart`).

- **The Matt & Maya Show** podcast section added to the homepage (before Contact, anchor `#podcast`). `components/sections/PodcastSection.tsx` embeds Buzzsprout's large player (feed `2625238`) via `next/script`. RSS-backed, so new episodes appear automatically — no redeploy needed. Framed in a rounded/glow card so Buzzsprout's white player reads as an intentional element on the dark theme. Verified the player actually injects + renders both episodes (S1E1, S1E2) via a Playwright trusted-browser check before shipping.
  - `[DECK]` **Co-hosting a podcast with an AI** is itself proof-of-thesis — the portfolio's "Listen" section is a live demonstration of human-instinct-meets-machine, not a claim about it.

- `[DECK]` **Recruiter-safe tagline via a judge panel.** The opener was "Human mess meets elegant logic" — charming for the show, a liability on a *hiring* page. Rather than guess a replacement, ran a 9-agent panel: 5 lenses generate candidates → 3 judges score independently on hire-ability / memorability / honesty → 1 synthesizer. 24 candidates considered; unanimous winner across all three judges: **"Human instinct meets elegant logic"** — a one-word swap (*mess → instinct*) that keeps the cadence and flips the framing from liability to "partners with AI." "Human mess" retained on the show's own graphic; only the recruiter-facing copy changed. The persona/judge-panel method (a sellable pattern) applied to a real copy decision — $1 of compute vs. a guess.

- **The Matt & Maya Show added to the link hubs.** `mattandmayashow.com` now appears in both the footer and the Contact section's property list, alongside LinkedIn / YouTube / growthmindset.ai. URL wired through `site.meta.podcast` (single source).

- `[DECK]` **Podcast player: caught + fixed an SPA-embed collapse.** First shipped with Buzzsprout's JS loader embed (`next/script`). Matt found that leaving the page and returning via in-app navigation left the player collapsed — a classic Next App Router × third-party-script trap: the one-time loader doesn't re-run, so the re-rendered container is empty. Switched to Buzzsprout's *iframe* form of the same large player (re-mounts and reloads cleanly on every navigation), tuned to 380px, and reproduced + verified the exact leave-and-return path with a Playwright trusted-click round-trip before shipping. The move: a third-party embed in an SPA has to survive re-mount, not just first paint.

- **Architecture showcase now hosts a client-facing artifact as its lead item.** Added the "Lead Hygiene & Migration System" plan (`public/architecture/lead-hygiene.html`) as the **first / default** diagram — a full pre-CRM hygiene + 6-week migration roadmap + compliance + cost-model + hiring-plan artifact Matt will use with a client. Vetted for branding/confidential tells before publish (none: no client name, no logos, no revenue figures). Flagged two soft *industry* tells to Matt (a niche compliance feed + Infusionsoft source CRM that could hint at the client&rsquo;s vertical) — worth generalizing for others. **[Corrected 2026-06-18 — see later entry: the specific vertical inference was wrong; all vertical-specific tells have since been stripped from this doc.]** The showcase now doubles as a live host for client deliverables, not just internal diagrams.

- **Built the detailed "Lead Hygiene & CRM Integration" architecture canvas** (`public/architecture/lead-hygiene-canvas.html`) from a pasted spec — house-style, self-contained: color-coded flow columns, PASS/FAIL routing split, cost/time badges, compliance + custom-field callouts, dotted observability band, dashed parallel migration lane, line-style legend. Verified rendering at desktop + mobile via the preview server; ran a 3-lens adversarial audit (spec-completeness, honest-framing, CSS/a11y) and folded the valid fixes — "deterministic" softened to attach only to the rule-based Quality Gate (two agents use an LLM), "TCPA-compliant" → "TCPA-aware," and the "nothing reaches the CRM unreviewed" failsafe corrected since PASS records auto-write.
  - `[DECK]` **Caught a confabulated vertical before it shipped.** The spec framed the whole system as an *immigration* lead pipeline (`visa_type`, `case_status`, `priority_date`, USCIS feeds). Matt flagged it: the client has nothing to do with immigration — almost certainly "**integration**" mis-dictated as "immigration" (voice workflow), which an AI then elaborated into a full immigration domain on top of the typo. Traced every tell and stripped them from the canvas, the existing showcase doc (`lead-hygiene.html` carried *USCIS alerts RSS* + *Federal Register API* under compliance inputs — confirmed **still live on prod** via fetch), and this log. The honest-framing principle working as a tripwire: one wrong word in a voice prompt can silently grow into a fabricated specialty on a recruiter-facing portfolio. Fixed at source; the live tell awaits a redeploy to clear from production.

- `[DECK]` **Made the compliance artifact quotable — a vanity `/tcpa` route.** Matt fields the TCPA question from prospects constantly; the canvas answers it visually, but `…/architecture/lead-hygiene-canvas.html` isn't something you can say out loud. Added a Next rewrite (`next.config.mjs`) so **`mattmartelli.com/tcpa`** serves the canvas with the clean URL intact — Matt can now verbally point anyone at it ("go look at slash-TCPA"). The work becomes the sales collateral. Deployed + verified live (`dpl_6QwiEQKGGeC4ACyjWvCsKdPbCjRb`).

**Deploy:** all of the above shipped via Vercel CLI (`vercel --prod`), the project's "push it live" path (git push alone does not update the live site). **Redeployed 2026-06-18 after the immigration cleanup** — pushed the immigration→compliance fix to `lead-hygiene.html`, the new `lead-hygiene-canvas.html` (now the **default** item in the architecture dropdown, compliance-forward), and the corrected compliance feeds (TCPA / FCC / FTC Telemarketing Sales Rule / CAN-SPAM / DNC). Verified live on prod via fetch: canvas H1 = "Lead Hygiene & CRM Integration Pipeline", zero immigration/USCIS tells anywhere; doc compliance inputs now show the correct telemarketing/email sources. Deployment `dpl_BpvBdpevpsQStQjoAqh32Coj6WKo`, aliased to mattmartelli.com.

## 2026-07-03 — Podcast subscribe badges + canonical-listing audit (two sites)

**Ask:** add "where to subscribe" (Spotify, Apple, etc.) to mattandmayashow.com; then Matt asked for a consistency double-check against the badges already on mattmartelli.com.

- **Found the show site's home.** mattandmayashow.com is GitHub Pages from `MattymBaylor/matt-maya-show` (single `index.html`, CNAME, push-to-main deploys) — established from response headers + `gh api pages`, no guessing. Recorded in memory so it never has to be re-found.

- `[DECK]` **Verified every badge target before linking — and caught a duplicate Spotify show.** Instead of pasting standard badge URLs, resolved each directory listing from the source of truth (Buzzsprout feed `2625238` → iTunes lookup API → Spotify search). Found **two** Spotify listings carrying the same two episodes: "Matt & Maya Show" (`033Ah8biairbAIrgFI0A6O`) and "Matt and Maya Show" (`033eA9NTuNMrGo6Wt6NjGl`). Matched channel descriptions against the RSS to identify the canonical Buzzsprout-fed one — and discovered **mattmartelli.com had been linking the duplicate** since 2026-06-18. Fixed. Also checked iHeart (no listing → no badge; no dead links) and confirmed the Amazon listing resolves. The move: a "just add badges" task is really a data-integrity task; the links are claims.

- **mattandmayashow.com Listen & Subscribe shipped.** Platform badge row (Apple / Spotify / Amazon / RSS) using the exact logo artwork from mattmartelli.com's PodcastSection restyled into the show site's gold/blue pill language — cross-property consistency without cross-property sameness. Retired the stale pre-launch copy ("Launching Soon" → "Now Streaming", "Get Notified" → "Listen Now", "Don't Miss the Launch" → "Listen & Subscribe"). Verified rendering via local server + Playwright screenshot before push.

- **Ops note:** first GitHub Pages deploy attempt failed with a transient GitHub-side error ("Deployment failed, try again later"); re-ran the workflow rather than re-pushing.

**Follow-ups logged:** (1) remove the duplicate Spotify listing at the source; (2) the show site's "Notify Me" email form is decorative — it fakes success and stores nothing; wire it to a real capture or drop it.

## 2026-07-03 (later) — Email capture wired + duplicate Spotify listing deleted

- `[DECK]` **"Wire up the email form" turned out to be a find, not a build.** Before building a capture backend, checked the n8n instance — a "Matt & Maya - Email Subscriber" workflow (webhook → Google Sheet) had existed since May 10, active, never connected to the site. Look-before-commission again. But testing it end-to-end exposed that it was **silently broken**: the Google Sheet's header row had drifted from the workflow's column schema, so every submission would have 500'd. Fixed the headers *through n8n's own Google credential* (temp workflow → Sheets API → deleted), verified webhook → sheet → response, then wired the site form with honest success/error states and tested the real form in a browser before shipping. The move: an existing integration isn't "done" until you've run one real payload through it.

- **Duplicate Spotify listing deleted at the source.** The "Matt and Maya Show" duplicate (033eA9NTuNMrGo6Wt6NjGl) was Spotify-for-Creators-hosted (Spotify-only — Apple/Amazon had single listings, which is what fingered the origin). Drove Matt's logged-in Creators session by browser automation: settings → Delete podcast → confirmed against the show name + ID + stats (1 follower, 2 plays — negligible loss). Removal propagates over several days; Spotify emails confirmation within 10. Both sites already pointed at the canonical listing, so the audience now funnels to one show.

## 2026-07-03 (later) — Portrait image-SEO: alt-tag check became an entity-graph fix (two sites)

**Ask:** "make sure the alt tag on my image has Matt Martelli." It already did — both the growthmindset.ai About portrait ("Matt Martelli, founder of growthmindset.ai") and the recruiter-page headshot ("Matt Martelli") were correct in code and live. The real gap was one level up: neither site's structured data tied the photos to the *person entity*.

- **Fixed the entity layer, not the alt layer.** Added `image: /headshot.jpg` to mattmartelli.com's Person schema, and a `founder` Person block (name / About URL / matt.webp / LinkedIn) to growthmindset.ai's Organization schema. Both entities now cross-reference the same LinkedIn — the strongest merge signal Google's knowledge graph takes for "these two sites are the same person."
- **Judgment call — did NOT rename `matt.webp` → `matt-martelli.webp`.** Descriptive filenames are a minor image-SEO signal, but renaming changes the URL and resets any indexing the image already has. Kept the URL, strengthened the metadata around it instead.
- Deployed both sites via Vercel CLI (`--prod`), verified the new JSON-LD serving live on both domains via curl. gms repo needed a rebase first (two remote PRs from the seinfeld-chat proxy session had landed).
- **Follow-up logged in open-commitments:** check Google Images for "Matt Martelli" association ~2026-07-17.

---

## 2026-07-03 — The HQ goes interactive: talk-to-the-agents ships inside the tablet

**Shipped to production (mattmartelli.com), verified live end-to-end:**

- **The Seinfeld HQ demo (pixel map + 8 chat-enabled character agents) moved home** from growthmindset.ai (where it was orphaned — no Seinfeld on the B2B site) into the case-study page's HQ Cam screen. The static floor-plan tab now carries a **"● Go live — talk to the agents"** facade; click it and the tablet screen becomes the actual interactive HQ (`/seinfeld-hq/index.html` in an iframe), splash screen reading as a boot sequence. Mobile links out to the new vanity route **`/hq`** instead (tablet screen too short to chat in).
- Backend chain fixed the same day: dead Supabase proxy → n8n webhook (gpt-4o) via one-line PR on the gms repo; webhook CORS locked from `*` down to exactly the four production origins (growthmindset.ai + mattmartelli.com, apex + www).
- `[DECK]` **The facade is the engineering.** The demo captures wheel/touch for map pan-zoom and weighs ~4.4 MB — auto-embedding it would scroll-jack the page and tax every visitor. The click-to-go-live facade means zero cost and zero capture until a visitor opts in. Pattern name: *don't mount the theme park until someone buys a ticket.*
- `[DECK]` **Red-team caught the premise, not just the bugs.** A design red-team pass before implementation caught (a) the target component wasn't on the homepage at all (screenshot was the case-study page — plan corrected before any code), and (b) a subtle CORS landmine: adding `sandbox` to the iframe would send `Origin: null` and silently kill the chat. Both would have shipped broken under "just wing it."
- `[DECK]` **Beat the canned-fallback trap.** The demo degrades gracefully to scripted replies on fetch failure — which means "the chat replied" proves nothing. Verification watched the network layer on production: POST to the n8n webhook → 200 → Jerry answered the actual question asked. Receipts, not vibes.
- Follow-up landed on the gms side: `/seinfeld-hq` de-listed from the B2B sitemap (page stays live for existing links). OpenAI key rotation decision still parked in open commitments (surfaces 2026-07-10).
- Closes the parked "Interactive iPad v2 — talk to the agents" commitment in **chat form**; voice personas remain the future upgrade.

### 2026-07-03 (later) — HQ Cam goes one-click + the demo gets a hard budget

- **HQ Cam tab now goes straight to live** — dropped the intermediate "Go live" button per Matt; selecting the tab is the opt-in. Mobile keeps the static plan + `/hq` link-out. Verified on production, desktop + mobile paths.
- **Security question answered with receipts:** "if a visitor tells an agent to do something, does it touch my real systems?" No — the demo's whole backend is webhook → one OpenAI text completion → reply. No tools, no OpenClaw, no memory; re-scanned the page (one endpoint total) and the workflow (no OpenClaw nodes). The only real resource it consumes is OpenAI credits — on a key shared by 12 workflows (3 active).
- **Hard monthly budget cap shipped** (Matt's call: "keep it at a very small budget"). A Quota Gate (Code node, workflow static data) now fronts the OpenAI call in the n8n workflow: 1,000 calls/month ≈ **<$5/month worst case**; over budget → in-character canned reply ("the whole gang's down at Monk's until the 1st"), zero OpenAI spend; auto-resets on the 1st. Limit is one constant in the Quota Gate node.
- `[DECK]` **Budget enforcement without touching a key.** The obvious fix (dedicated OpenAI project key + dashboard budget) means minting and ferrying a secret. The workflow-layer counter delivers the same guarantee — bounded worst-case spend, demo degrades gracefully — with zero credential handling, built and verified through the n8n API in one session: tested under-limit (real reply), tripped the cap live (canned reply proves the counter persists), restored. Three states, three receipts.
- Key-rotation decision still parked (2026-07-10); the cap removes the urgency — abuse of the open webhook is now bounded regardless of which key sits behind it.

### 2026-07-03 (later still) — The Penske File ships

- **Matt's idea:** give the demo a fake in-universe project so recruiters see "a project actually taking place" when they ask characters what they're working on. Canon pick: **the Penske File** (George's legendary do-nothing project).
- **Implementation:** one shared operation brief appended to all 8 character prompts (each with their own assignment — Jerry qualifying inbound, Kramer wiring "three connectors, one unauthorized," George "restructuring the file" for three weeks…), plus a one-click **TRY: "What's the status on the Penske file?"** chip above the chat input. In-prompt guardrail: never claim it's a real client.
- `[DECK]` **The gag demos the thesis.** Because every agent carries the same brief, answers corroborate — ask George and he references Jerry's, Elaine's, and Kramer's assignments unprompted. A recruiter poking the demo experiences "agents sharing operational context" firsthand, disguised as a joke. Verified live: George's first production reply cross-referenced three teammates' assignments, quibbled with the "80% complete" number, and ended in SERENITY NOW.
- The chip fixes the blank-canvas problem — visitors don't know what to ask an open chat; one click delivers the magic moment.
- Note: only the canonical mattmartelli.com copy carries the Penske File; the legacy growthmindset.ai copy stays vanilla. Brief adds ~230 input tokens/call — negligible against the monthly cap.
- Side catch: site-wide missing favicon (console 404 on every page) — spun off as a separate task chip.

## 2026-07-04 — YouTube thought-leadership section (the video wall)

**What:** New homepage section for The 60-Second AI Brief, placed between Projects and the Matt & Maya Show. Concept chosen from a 3-option wireframe panel (video wall / briefing monitor / intelligence ticker) — Matt picked the wall.

**The move [DECK]:** The wall is built from the channel's public RSS feed (`youtube.com/feeds/videos.xml?channel_id=…`) — latest 15 video thumbnails, zero API keys, ISR-revalidated hourly. Publish a Short, the homepage updates itself. Same zero-maintenance pattern as the Buzzsprout podcast embed, and another step toward the "never see another API key" north star.

**Judgment call [DECK]:** First render looked muddy — the channel is Shorts (vertical), and YouTube's `hqdefault.jpg` pillarboxes vertical video in a 4:3 frame with black bars. Fix: portrait 9:16 tiles + `object-cover`, which crops away exactly the bar width (360×9/16 = 202px = the video strip). One aspect-ratio change turned a black wall into a wall of revenue-number briefs.

**Verification note:** Occluded-window screenshot gotcha struck again (frozen compositor, paused rAF). Bypass: headless Chrome via Python Playwright with `reduced_motion="reduce"`, which the site's own Reveal component honors by skipping animation entirely.

Commit: 818253a. Not yet deployed — awaiting "push it live."

**Update, same day:** Matt swapped the wall for the Option C ticker — auto-scrolling row of portrait Shorts tiles, sorted most-popular-first via the RSS view counts. View badges deliberately withheld while counts are seed-stage (honest framing works both directions). Commits 818253a → b8bb332, deployed + verified on prod, GitHub synced.

**Update 2, same day [DECK]:** Ticker was ranking a bulk-upload day, not the channel — the channel RSS feed is only the *latest 15*. Fix with zero user action: YouTube auto-maintains a hidden "popular uploads" playlist per channel (UC→PU prefix swap), whose RSS feed is the all-time top 15 by views. Matt asked "do I need to create a playlist?" — answer was no, YouTube already keeps one. Commit 6dff411, live + screenshot-verified on prod.

## 2026-07-08 — Field Note Nº 01 (game theory) video lands on the recruiter page

**Shipped (committed local, not yet deployed):** New section on `/recruiter` between Target Roles and the Seinfeld flagship card — eyebrow "Field Note Nº 01 · Game Theory," title "The game gets exactly what it rewards," two-line recruiter framing, and the new video (`X5q5sgkwMP4`, "The Battle for Your Company's Profitability," 60 Second AI Brief channel) in the same `DeferredYouTubeEmbed` treatment as the homepage Tiger film. Content data-driven via `recruiter.fieldNote` in `content/recruiter.ts`.

**Judgment call:** The section sits between a compact pill list and a big glowing featured card, so it got the middle treatment — warm mono eyebrow + display h2 (the flagship/playbook heading grammar) but no card wrapper, letting the player's built-in glow border carry the visual weight without competing with the flagship card below. Spacing locked to the page's existing `mt-8` rhythm (measured 32px above and below at desktop and mobile).

**Small platform fix:** moved the reduced-motion autoplay guard *inside* `DeferredYouTubeEmbed` so server components (like the recruiter page) can request autoplay without wiring the client hook themselves. Homepage behavior unchanged.

**Debugging beat [DECK]:** First verification showed YouTube's "This video is unavailable (152-18)" inside the embed — on a video whose `playableInEmbed` flag was *true*. A/B-swapped the iframe src live (www vs nocookie domain, with/without `origin`, with/without autoplay params) and every variant played, including the exact original URL minutes later: the failure was transient fresh-upload propagation on YouTube's side, not code. The move: when a third-party embed fails right after upload, isolate domain/params empirically before redesigning anything — the five-minute A/B saved ripping out the privacy-enhanced domain for nothing.

Verified with headless Playwright (desktop 1280 + mobile 375: placement, 32/32 spacing, no horizontal overflow, zero console errors, embed actually playing). Commit: bedeb65. Awaiting "push it live."

## 2026-07-08 (afternoon) — Field note goes to work: paper launch, hover audio, and a queue-stall bypass under fire

**Shipped to production (mattmartelli.com/recruiter), verified live:** the field-note section matured into a full research-lead unit in one afternoon — headline "Is your architecture Battle Tested?", Matt's three-paragraph "Who audits the robots?" framing run full container width to the video margin, a yellow fast-path CTA to download **"No One Was Watching"** (the Who Audits the Robots? series prologue PDF, scanned clean of client tells before hosting at `/no-one-was-watching.pdf`), and the 100-second video with hover-to-hear audio.

**Hover-to-hear audio rolled out site-wide [DECK]:** hovering any autoplaying video unmutes it; leaving re-mutes; the visitor's own controls take over permanently on first click (detected via window-blur → iframe focus, the only cross-origin signal there is); a "Hover for sound" chip teaches the gesture and retires itself. Same contract on two player types — the YouTube embeds via the iframe API postMessage channel, and the native mp4 via a small `HoverAudioVideo` counterpart. Touch taps deliberately excluded (a tap is aimed at the controls), and a recovery timer restores the muted loop if the browser blocks audible playback pre-interaction. Also suppressed YouTube's auto-junk captions on muted autoplay (the "Heat." artifact) by deselecting the caption track at player boot — CC button stays for people who want it.

**Judgment call [DECK] — bypassing a stalled build queue with a client watching:** mid-launch, Vercel's build queue jammed twice — first a deployment stuck in "Initializing" blocking the single build slot, then four builds sitting "Queued" with none starting, while Matt had a big client actively viewing the half-updated page. Instead of waiting on the platform: stopped the dev server (the `.next` corruption rule), built locally with `vercel build`, and shipped the artifacts directly with `vercel deploy --prebuilt --prod` — prebuilt deploys skip the build queue entirely and promoted in ~11 seconds. Fix was serving before the queue ever unstuck. The move: when the platform's pipeline is the bottleneck, carry the finished artifact past it.

**Ops discipline notes:** permission guardrails correctly blocked both deleting the stuck production deployment and an auto-redeploy loop — settled on detection-only regression watching (60s polls for the style marker on prod) with human-in-the-loop redeploy, which timed out clean with zero regressions. Every stage verified on the live domain by content markers, not deploy status.

Commits: 1981ef1 → 0f772f1 → 2bc0bae → 429718f. GitHub synced. All queue stragglers completed harmlessly; prod holds the final build.
