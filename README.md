# Matt Martelli — AI Systems Architect

A recruiter-facing personal website built as an **interactive demonstration of expertise**. The single takeaway every visitor should leave with: _this person understands how to architect real-world AI systems that deliver measurable business outcomes._

Primary message: **"I don't specialize in AI tools. I specialize in designing business systems powered by AI."**

---

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens live in `tailwind.config.ts`
- **Framer Motion** — section reveals, staggered hero, panel transitions (all gated behind `prefers-reduced-motion`)
- **@xyflow/react** (React Flow) — the three interactive architecture diagrams
- **lucide-react** — icons
- `next/font` for typography (Space Grotesk · Inter · JetBrains Mono), `next/og` for the social card
- No CMS, no database. All content lives in typed TS files under `/content`.

Deployable to **Vercel with zero config**.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

### Contact form (optional)

The contact form works out of the box by falling back to a `mailto:` link. To wire it to a real
endpoint (e.g. [Formspree](https://formspree.io)), copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

No secrets are hardcoded; the form posts directly to the configured endpoint.

---

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel — framework preset **Next.js** is detected automatically.
3. (Optional) add the `NEXT_PUBLIC_CONTACT_ENDPOINT` environment variable.
4. Deploy. No other configuration required.

Update the production URL in `content/site.ts` (`meta.url`) if the domain ever changes — it
drives canonical URLs, Open Graph tags, the sitemap, and `robots.txt`.

---

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD Person schema, skip link
  page.tsx              Homepage — composes all 10 sections in order
  globals.css           Tailwind layers, focus styles, React Flow theming, reduced-motion rules
  recruiter/page.tsx    /recruiter fast-path route
  sitemap.ts            /sitemap.xml
  robots.ts             /robots.txt
  icon.svg              Favicon
  opengraph-image.tsx   Generated 1200×630 social card

content/                ← EDIT COPY HERE (typed, no components)
  site.ts               All narrative copy, nav, hero, sections 2–6, contact, footer
  diagrams.ts           The three React Flow systems (nodes + edges + per-node detail copy)
  projects.ts           Featured Projects
  recruiter.ts          Recruiter fast-path content

components/
  nav/                  Header (sticky nav + Recruiter/Contact CTAs) and Footer
  hero/                 ConstellationBackground (animated canvas node network)
  sections/             One component per homepage section
  flow/                 SystemDiagram (React Flow canvas), SystemNode, DetailPanel
  ui/                   Reveal, SectionHeading, Explorable (selectable chips)

lib/
  useReducedMotion.ts   prefers-reduced-motion hook

tailwind.config.ts      Design tokens: colors, fonts, radii, shadows, gradients
```

The 10 sections, in order: Hero · What I Do · Agentic Systems · AI Orchestration & Frameworks ·
Voice AI · Marketing Operations & CRM · Interactive Proof of Work · Featured Projects ·
Recruiter Fast Path · Contact.

---

## Content-editing guide

Everything readable is data-driven. You almost never need to touch a component to change copy.

### Change site copy (hero, sections 2–6, contact, nav)
Edit **`content/site.ts`**. It is one typed object — find the section key (`hero`, `whatIDo`,
`agentic`, `orchestration`, `voice`, `marketing`, `contact`, …) and edit the strings. Examples:

- Hero headline / sub-line / intro → `site.hero`
- The four "What I Do" pillars → `site.whatIDo.pillars`
- Agentic example applications (the selectable chips) → `site.agentic.applications`
- Framework / tooling list → `site.orchestration.tools` (and the priority list in `site.orchestration.emphasis`)
- Voice platforms & capabilities → `site.voice`
- Marketing stack → `site.marketing.stack`
- Email / LinkedIn / domain → `site.meta`

### Change the interactive diagrams (section 7)
Edit **`content/diagrams.ts`**. Each diagram is an entry in the `diagrams` array with:

- `tab` / `title` / `summary` — labels and the intro line
- `nodes[]` — each node has a `label`, a `kind` (controls color/icon: `input`, `agent`,
  `system`, `data`, `action`, `human`, `outcome`), a `function` line (what happens here), and an
  `impact` line (the business outcome shown in the detail panel)
- `edges[]` — connect nodes by `id`, with an optional short `label`

Nodes lay themselves out left-to-right automatically — just keep them in order and wire the edges.
To add a stage, add a node and an edge pointing to it. To add a whole new diagram, add another
object to the `diagrams` array; the tab control updates automatically.

### Change Featured Projects (section 8)
Edit **`content/projects.ts`**. Each project has an `outcome` (business-impact lead), a
`description`, a `flow[]` (short mono labels rendered as a mini-architecture motif), optional
`skills[]`, and an optional `link`. Set `flagship: true` on the one project that should get the
prominent full-width treatment. To add a real demo/repo link, fill in the `link` field; leave it
`undefined` to render a "coming soon" slot.

### Change the Recruiter Fast Path (section 9 + /recruiter)
Edit **`content/recruiter.ts`** — executive summary, accomplishments, condensed projects, and
links. Drop the real résumé at **`public/resume.pdf`** (a placeholder is included).

### Retune the design system
Edit **`tailwind.config.ts`** — colors (`base`, `surface`, `accent`, `warm`), radii, shadows,
and the accent gradient are all defined there and used consistently across the site.

---

## Accessibility & performance notes

- **Keyboard:** every interactive control is operable by keyboard. The diagrams expose a roving-
  tabindex tab/rail with arrow-key navigation; the segmented control and explorable chips follow
  the same pattern. A "Skip to content" link is the first focusable element, and focus styles are
  visible site-wide.
- **Reduced motion:** the `prefers-reduced-motion` media query disables the hero animation, edge
  animation, and all reveal/transition motion. The diagrams remain fully interactive without motion.
- **Performance:** React Flow is dynamically imported (`ssr: false`) so it stays out of the
  first-paint bundle; the hero canvas is DPR-capped and pauses when scrolled offscreen.
- **SEO:** metadata + Open Graph + Twitter tags, a JSON-LD `Person` schema, a generated OG image,
  `sitemap.xml`, and `robots.txt` are all included.
