import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* =============================================================================
 * /framework — LAYOUT TEST HARNESS
 *
 * A from-scratch recreation of the *arrangement grammar* we liked on
 * suhasbhairav.com — NOT a copy of his code, copy, or assets. What's borrowed
 * is the structural language only (all legal, standard web-layout convention):
 *
 *   - numbered section rhythm (01 / 02 / 03 …)
 *   - split hero with inline stat callouts
 *   - "Selected Systems" card grid: numbered badge + tag pills + Explore link
 *   - domain / capability pill rows
 *   - numbered principle cards
 *
 * Everything below uses OUR tokens (tailwind.config.ts) and OUR content. It is
 * isolated at this route so we can A/B it against the live homepage before
 * deciding what — if anything — to promote into components/sections/*.
 *
 * Swap the CONTENT constants below to retune; swap the presentational
 * subcomponents to restyle. Nothing here imports from the live homepage, so
 * you can throw the whole route away with zero blast radius.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "Layout Framework — Matt Martelli",
  robots: { index: false, follow: false }, // test route: keep it out of search
};

// --- CONTENT (edit freely — this is scaffolding, not final copy) -------------

const HERO_STATS = [
  { value: "15+", label: "years building revenue + ops systems" },
  { value: "30+", label: "agents in a live multi-agent operating system" },
  { value: "24/7", label: "voice agents answering, qualifying, booking" },
];

const CAPABILITIES = [
  {
    n: "01",
    title: "Agentic systems",
    body: "Orchestrated fleets of specialized agents — a conductor routing work to sub-agents, self-healing, with a human in the loop where it counts.",
  },
  {
    n: "02",
    title: "Voice AI",
    body: "Real-time voice agents that answer, qualify, and book — wired into the CRM and calendar so a conversation becomes a booked outcome.",
  },
  {
    n: "03",
    title: "Marketing & revenue ops",
    body: "The plumbing behind growth: lead hygiene, enrichment, routing, and reporting — the unglamorous automation that makes the top line move.",
  },
];

const DOMAINS = [
  "Voice agents",
  "Multi-agent orchestration",
  "Marketing ops",
  "Lead hygiene / CRM",
  "Coaching & personal dev",
  "Home services",
];

const SYSTEMS = [
  {
    n: "01",
    title: "Voice-agent orchestration",
    tags: ["Retell", "Twilio", "n8n"],
    body: "An inbound voice agent that greets, qualifies, and books straight into the calendar — then hands warm context to the human on pickup.",
    href: "/#voice-ai",
  },
  {
    n: "02",
    title: "OpenClaw operating system",
    tags: ["Multi-agent", "Self-healing", "Conductor"],
    body: "A live operating system of 30+ agents with a conductor bot routing work, a daily surprise loop, and credentials handled off-chat by design.",
    href: "/#agentic-systems",
  },
  {
    n: "03",
    title: "Lead hygiene & routing",
    tags: ["Enrichment", "Dedupe", "Routing"],
    body: "A generic capability demo: messy inbound leads cleaned, enriched, deduped, and routed to the right owner with a full audit trail.",
    href: "/#marketing-ops",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Useful before autonomous",
    body: "Ship something that helps a human today, then earn more autonomy. A visibly useful assistant beats a magical black box that nobody trusts.",
  },
  {
    n: "02",
    title: "Systems before prompts",
    body: "A clever prompt is a party trick. Durable value lives in the wiring: the routing, the memory, the retries, the human handoffs around it.",
  },
  {
    n: "03",
    title: "Honest before impressive",
    body: '"Designed to" not "deployed for" until it ships. Every careful claim compounds trust — and upgrades itself the day the thing goes live.',
  },
];

// --- PRESENTATIONAL PRIMITIVES (restyle here) --------------------------------

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line-strong bg-surface-raised/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </span>
  );
}

/** The reusable "01 / title / body" unit — Suhas uses this everywhere. */
function NumberedCard({
  n,
  title,
  body,
  className = "",
}: {
  n: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`surface-card p-6 sm:p-7 ${className}`}>
      <span className="font-mono text-sm text-accent-cyan/70">{n}</span>
      <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

/** "Selected Systems" showcase card: numbered badge, tags, title, Explore. */
function SystemCard({ system }: { system: (typeof SYSTEMS)[number] }) {
  return (
    <Link
      href={system.href}
      className="surface-card group flex flex-col p-6 transition hover:border-line-strong hover:shadow-glow sm:p-7"
    >
      {/* Media placeholder — drop a screenshot/diagram here later. */}
      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-grid-faint [background-size:22px_22px]">
        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-md bg-night/70 font-mono text-xs text-accent-cyan ring-1 ring-line-strong">
          {system.n}
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {system.tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-ink">{system.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{system.body}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
        Explore
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

// --- PAGE ---------------------------------------------------------------------

export default function FrameworkPage() {
  return (
    <main className="min-h-screen bg-night text-ink">
      {/* 1 — HERO: split, headline + inline stat callouts ------------------- */}
      <section className="section pt-28 sm:pt-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow mb-4">AI Systems Architect</p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              AI that <span className="accent-text">works in the real world</span> — not just in the demo.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              I design and ship the systems behind AI that earns its keep: voice
              agents that book real appointments, agent fleets that run real
              operations, and the automation plumbing that makes revenue move.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-night shadow-glow"
              >
                <Mail className="h-4 w-4" /> Get in touch
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-raised/60"
              >
                <Github className="h-4 w-4" /> See the live site
              </Link>
            </div>

            {/* Inline stat callouts — the Suhas hero move */}
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold text-ink sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-faint">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Right rail — portrait / diagram slot */}
          <Reveal delay={0.1}>
            <div className="surface-card relative aspect-[4/5] w-full overflow-hidden bg-grid-faint [background-size:24px_24px]">
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                  portrait / system diagram
                </span>
              </div>
              <span className="absolute bottom-4 left-4 rounded-md bg-night/70 px-3 py-1.5 font-mono text-[11px] text-accent-cyan ring-1 ring-line-strong">
                swap this slot
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — DOMAIN PILL ROW ---------------------------------------------- */}
      <section className="border-y border-line bg-surface/40 py-8">
        <div className="container-x flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Where it runs</span>
          {DOMAINS.map((d) => (
            <Pill key={d}>{d}</Pill>
          ))}
        </div>
      </section>

      {/* 3 — CAPABILITIES: numbered 01/02/03 ------------------------------ */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="What I build"
            title="Three things, done properly"
            sub="Every engagement is some mix of these. The arrangement changes; the discipline doesn't."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.08}>
                <NumberedCard n={c.n} title={c.title} body={c.body} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — SELECTED SYSTEMS: card grid ---------------------------------- */}
      <section className="section bg-surface/30">
        <div className="container-x">
          <SectionHeading
            eyebrow="Selected systems"
            title="Things I've actually wired together"
            sub="A few representative builds. Each is a real pattern, framed honestly — deployed work, capability demos, and personal infrastructure."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <SystemCard system={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — OPERATING PRINCIPLES: numbered cards ------------------------- */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="How I work"
            title="Operating principles"
            sub="The rules that survive contact with a real deadline."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <NumberedCard n={p.n} title={p.title} body={p.body} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — CLOSING CTA -------------------------------------------------- */}
      <section className="section border-t border-line bg-surface/40">
        <div className="container-x flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Want the system, not the slideware?
            </h2>
            <p className="mt-2 max-w-xl text-ink-muted">
              This is a layout test route. When we lock the arrangement, it graduates into the real homepage.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-gradient px-6 py-3 text-sm font-semibold text-night shadow-glow"
          >
            <Mail className="h-4 w-4" /> Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
