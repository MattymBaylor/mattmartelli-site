"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Diagram = {
  id: string;
  title: string;
  industry: string;
  blurb: string;
  file: string;
};

/**
 * Architecture showcase — a simple dropdown that swaps between self-contained
 * system-diagram HTML files (served from /public/architecture). Each is a real
 * multi-agent architecture mapped for a different industry/use case. Client and
 * person names are scrubbed to generic stand-ins before publish.
 */
const DIAGRAMS: Diagram[] = [
  {
    id: "tiger-team",
    title: "Tiger Team — Adversarial Org Audit",
    industry: "AI evaluation · reward engineering",
    blurb: "A model-diverse red-team that audits my own agent org — three rival LLMs attack the design, a reward engine pays only for verified, cited findings (and docks fabrication -5), then emits a ready-to-run fix. Evaluation rigor, built as a system.",
    file: "/architecture/tiger-team-canvas.html",
  },
  {
    id: "lead-hygiene-canvas",
    title: "Lead Hygiene & Compliance Pipeline",
    industry: "RevOps · TCPA compliance",
    blurb: "The architecture canvas — every lead consent-checked, validated, scored, and quarantined before it can touch the CRM. Compliance enforced at the gate and audited end to end.",
    file: "/architecture/lead-hygiene-canvas.html",
  },
  {
    id: "lead-hygiene",
    title: "Lead Hygiene & Migration Plan",
    industry: "RevOps · CRM migration",
    blurb: "The full executive plan behind the canvas — 6-week migration roadmap, compliance layer, cost model, and operating model.",
    file: "/architecture/lead-hygiene.html",
  },
  {
    id: "crew",
    title: "Field Crew Operations",
    industry: "Home services",
    blurb: "The full agent crew running a field-service enterprise — dispatch, jobs, follow-up.",
    file: "/architecture/crew-operations.html",
  },
  {
    id: "recruit",
    title: "AI Recruitment Pipeline",
    industry: "Hiring & HR",
    blurb: "Sourcing → screening → scheduling, run end-to-end by agents.",
    file: "/architecture/recruitment-pipeline.html",
  },
  {
    id: "mission",
    title: "Mission Control",
    industry: "Live operations",
    blurb: "A real-time flight-ops view of every agent, job, and alert.",
    file: "/architecture/mission-control.html",
  },
  {
    id: "voice",
    title: "Voice AI Confirmation",
    industry: "Voice AI",
    blurb: "Automated appointment confirmation, handled by a voice agent.",
    file: "/architecture/voice-confirmation.html",
  },
  {
    id: "moa",
    title: "Mixture of Agents",
    industry: "AI architecture",
    blurb: "A multi-model adversarial council that debates before it commits.",
    file: "/architecture/mixture-of-agents.html",
  },
  {
    id: "funnel",
    title: "Founder-Led Marketing Funnel",
    industry: "Coaching / founder GTM",
    blurb: "The founder-led funnel model — content to conversion.",
    file: "/architecture/founder-funnel.html",
  },
];

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState(DIAGRAMS[0].id);
  const active = DIAGRAMS.find((d) => d.id === activeId) ?? DIAGRAMS[0];

  return (
    <section id="architecture" className="section relative overflow-x-clip border-b border-line/60 bg-surface/30">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Architecture</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              System blueprints, by industry
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              The actual architectures behind the work — multi-agent systems mapped out for
              different industries and use cases. Pick one to see how it&rsquo;s wired.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-5xl">
            {/* selector */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  Select
                </span>
                <select
                  value={activeId}
                  onChange={(e) => setActiveId(e.target.value)}
                  aria-label="Select an architecture diagram"
                  className="rounded-md border border-line-strong bg-surface-elevated px-4 py-2.5 text-sm font-medium text-ink outline-none transition-colors hover:border-accent-cyan/50 focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
                >
                  {DIAGRAMS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} — {d.industry}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-sm leading-relaxed text-ink-muted sm:max-w-md sm:text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan/80">
                  {active.industry}
                </span>
                <span className="ml-2">{active.blurb}</span>
              </p>
            </div>

            {/* viewer */}
            <div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface shadow-glow">
              <iframe
                key={active.id}
                src={active.file}
                title={active.title}
                className="h-[72vh] min-h-[540px] w-full"
                loading="lazy"
              />
            </div>

            <p className="mt-5 text-center text-sm text-ink-faint">
              And my own operation:{" "}
              <a
                href="/seinfeld-hq"
                className="inline-flex items-center gap-1 text-accent-cyan transition-colors hover:text-accent-cyan/80"
              >
                the Seinfeld HQ agent org chart
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
