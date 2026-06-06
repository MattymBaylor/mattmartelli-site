"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { caseStudy as cs } from "@/content/caseStudy";

type Agent = {
  id: string;
  name: string;
  role: string;
  duties: string;
  img: string;
};

const oc = cs.orgChart;

// Flat list so the detail panel can resolve any agent by id. The content
// object is `as const` (deeply readonly with literal types), so we widen to
// the structural Agent shape here.
const LEADERSHIP = oc.leadership as readonly Agent[];
const ALL: readonly Agent[] = [
  ...LEADERSHIP,
  ...oc.groups.flatMap((g) => g.agents as readonly Agent[]),
];

/**
 * AgentOrgChart — the interactive centerpiece of the case study.
 *
 * Matt's real internal operating model: two leadership roles (Jerry the
 * conductor, Joe Devola the traffic manager) over nine specialists who execute
 * in parallel. Selecting any agent (hover, tap, focus, or arrow keys) updates
 * the inline detail panel with its portrait, role, and duties. Fully keyboard
 * operable and reduced-motion aware.
 */
export function AgentOrgChart() {
  const [activeId, setActiveId] = useState<string>(LEADERSHIP[0].id);
  const reduced = usePrefersReducedMotion();
  const active = ALL.find((a) => a.id === activeId) ?? LEADERSHIP[0];

  const select = (id: string) => setActiveId(id);

  // Roving arrow-key navigation across the whole roster, in DOM order.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = ALL.findIndex((a) => a.id === activeId);
    const last = ALL.length - 1;
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = idx === last ? 0 : idx + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = idx === 0 ? last : idx - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveId(ALL[next].id);
    (e.currentTarget.closest("[data-orgchart]") as HTMLElement | null)
      ?.querySelector<HTMLButtonElement>(`[data-agent="${ALL[next].id}"]`)
      ?.focus();
  };

  const Node = ({
    agent,
    variant = "specialist",
  }: {
    agent: Agent;
    variant?: "lead" | "specialist";
  }) => {
    const selected = agent.id === active.id;
    const isLead = variant === "lead";
    return (
      <button
        type="button"
        data-agent={agent.id}
        aria-pressed={selected}
        tabIndex={selected ? 0 : -1}
        onClick={() => select(agent.id)}
        onMouseEnter={() => select(agent.id)}
        onFocus={() => select(agent.id)}
        onKeyDown={onKeyDown}
        className={[
          "group/node flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70",
          isLead
            ? selected
              ? "border-accent-indigo/70 bg-surface-raised shadow-glow-indigo"
              : "border-accent-indigo/50 bg-surface-raised hover:border-accent-indigo/70"
            : selected
              ? "border-accent-cyan/70 bg-accent-cyan/[0.06] shadow-glow"
              : "border-line bg-surface-elevated/70 hover:border-accent-cyan/40",
        ].join(" ")}
      >
        <span
          className={[
            "relative h-11 w-11 shrink-0 overflow-hidden rounded-lg ring-1 transition-all",
            selected
              ? isLead
                ? "ring-accent-indigo/70"
                : "ring-accent-cyan/70"
              : "ring-line-strong group-hover/node:ring-accent-cyan/40",
          ].join(" ")}
        >
          <Image
            src={agent.img}
            alt={`${agent.name} — ${agent.role}`}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0">
          <span
            className={[
              "block truncate font-display text-sm font-semibold",
              isLead ? "text-accent-indigo" : "text-ink",
            ].join(" ")}
          >
            {agent.name}
          </span>
          <span className="block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
            {agent.role}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div data-orgchart className="surface-card p-5 sm:p-7">
      {/* hint */}
      <p className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan/80">
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent-cyan" aria-hidden />
        {oc.hint}
      </p>

      <div className="grid gap-7 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-9">
        {/* LEFT: the chart */}
        <div role="group" aria-label="Agent org chart">
          {/* Leadership: conductor + traffic manager */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            {LEADERSHIP.map((agent) => (
              <Node key={agent.id} agent={agent} variant="lead" />
            ))}
          </div>

          {/* connector */}
          <div className="flex justify-center py-2" aria-hidden>
            <ChevronDown size={18} className="text-accent-cyan/60" />
          </div>

          {/* Specialists */}
          {oc.groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                {group.label}
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {group.agents.map((agent) => (
                  <Node key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: detail panel (sticky on desktop so it tracks while exploring) */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-accent-cyan/30 bg-surface-raised/60 p-5 shadow-glow sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center gap-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-accent-cyan/40">
                    <Image
                      src={active.img}
                      alt={`${active.name} — ${active.role}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan/80">
                      {active.role}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-ink">
                      {active.name}
                    </h3>
                  </div>
                </div>
                <p
                  className="mt-4 text-sm leading-relaxed text-ink-muted"
                  aria-live="polite"
                >
                  {active.duties}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* footnote */}
      <p className="mt-6 border-t border-line/60 pt-5 text-sm leading-relaxed text-ink-faint">
        {oc.footnote}
      </p>
    </div>
  );
}
