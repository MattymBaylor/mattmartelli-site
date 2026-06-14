// "Capabilities at a glance" — recruiter-facing capability matrix.
// Uses the site's existing design tokens (surface-card, accent-cyan, font-mono, ink-muted).
// Server component (no hooks). Edit the `capabilities` array to update content;
// <strong> tags inside `proof` are highlighted via the [&_strong] arbitrary variant.

const capabilities: { title: string; desc: string; proof: string }[] = [
  {
    title: "AI Agents & Multi-Agent Systems",
    desc: "Orchestrate systems where specialized agents plan, route, execute, and self-check across departments.",
    proof:
      "Built a multi-agent operating system (Claude + OpenClaw) coordinating <strong>marketing, sales, recruiting, analytics, and ops</strong> — one framework spanning <strong>8 departmental silos</strong>.",
  },
  {
    title: "AI Voice Agents",
    desc: "Production voice agents that answer, qualify, book, and follow up around the clock — never to voicemail.",
    proof:
      "Handle <strong>60+ simultaneous calls</strong>, trained on <strong>10,000+ transcripts</strong>, cutting appointment cancellations <strong>38%</strong>.",
  },
  {
    title: "Marketing Automation & Lifecycle",
    desc: "End-to-end nurture, onboarding, retention, and reactivation programs across email and SMS.",
    proof:
      "<strong>+40%</strong> customer lifetime value, <strong>+35%</strong> engagement, and <strong>+25%</strong> retention from multi-touch lifecycle workflows.",
  },
  {
    title: "CRM & Data Architecture",
    desc: "Database structure, naming, tagging, segmentation, and data hygiene that keep reporting clean as you scale.",
    proof:
      "Managed databases of <strong>500,000+ records</strong> with segmentation, lifecycle automation, and TCPA/CAN-SPAM compliance.",
  },
  {
    title: "Platform Migration",
    desc: "Lead CRM and automation migrations with parallel-run validation — without breaking active campaigns.",
    proof:
      "<strong>Zero-downtime</strong> Zapier-to-n8n migration of <strong>300,000+ monthly tasks</strong>, saving <strong>$90K+/yr</strong>; multiple HubSpot implementations.",
  },
  {
    title: "Integration & Orchestration",
    desc: "Connect CRM, funnel, voice, analytics, and lead sources through durable, API-first workflows.",
    proof:
      "API-driven orchestration across <strong>HubSpot, Salesforce, n8n, Twilio, Supabase, Five9</strong> and more.",
  },
  {
    title: "Reporting & Revenue Attribution",
    desc: "Restore real-time visibility and tie automation directly to pipeline and revenue.",
    proof:
      "Custom Supabase/Postgres analytics layer cut reporting <strong>from hours to seconds</strong>; <strong>$750K+/month</strong> in attributed pipeline.",
  },
  {
    title: "Lead Scoring & Speed-to-Lead",
    desc: "Predictive scoring, routing, and speed-to-lead automation that put reps on the highest-value pipeline first.",
    proof:
      "<strong>+28%</strong> conversion from predictive lead scoring and <strong>50% faster</strong> lead response.",
  },
];

const stack = [
  "HubSpot",
  "Salesforce",
  "n8n",
  "Claude / OpenAI / Gemini",
  "CrewAI · OpenClaw",
  "Retell AI · ElevenLabs",
  "Supabase",
];

export function Capabilities() {
  return (
    <div className="mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {capabilities.map((c, i) => (
          <div key={c.title} className="surface-card p-5">
            <p className="mb-2.5 font-mono text-[11px] tracking-[0.08em] text-accent-cyan">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-semibold leading-snug">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
            <p
              className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-accent-cyan"
              dangerouslySetInnerHTML={{ __html: c.proof }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan">
          Stack
        </span>
        {stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
