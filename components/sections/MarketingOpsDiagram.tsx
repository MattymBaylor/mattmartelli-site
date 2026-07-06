"use client";

/**
 * MarketingOpsDiagram — a compact, inline "lead → revenue" pipeline for the
 * Marketing Ops section. It's the at-a-glance version of the full interactive
 * "Marketing Operations Engine" in Proof of Work (content/diagrams.ts), giving
 * the section a visual anchor instead of dead space.
 *
 * Kind-language matches the flow diagrams: cyan = system/process, warm = outcome.
 */

import { motion } from "framer-motion";
import {
  UserPlus,
  Database,
  Layers,
  Target,
  Workflow,
  CalendarCheck,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  { id: "lead", label: "Lead", sub: "any source", Icon: UserPlus },
  { id: "crm", label: "CRM", sub: "one record", Icon: Database },
  { id: "segmentation", label: "Segmentation", sub: "right audience", Icon: Layers },
  { id: "scoring", label: "Scoring", sub: "sales-ready", Icon: Target },
  { id: "nurture", label: "Nurture", sub: "move forward", Icon: Workflow },
  { id: "appointment", label: "Appointment", sub: "booked meeting", Icon: CalendarCheck },
  { id: "sale", label: "Sale", sub: "closed revenue", Icon: Trophy, outcome: true },
] as const;

export function MarketingOpsDiagram() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="rounded-xl border border-line bg-surface-elevated/40 p-5 shadow-glow sm:p-6">
      <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan/80">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden />
        Lead → revenue, measured end to end
      </p>

      <ol className="flex flex-wrap items-stretch gap-x-1.5 gap-y-3">
        {steps.map((s, i) => {
          const outcome = "outcome" in s && s.outcome;
          const color = outcome ? "#F5A524" : "#22D3EE";
          return (
            <li key={s.id} className="flex items-center gap-1.5">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.07 }}
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
                style={{
                  borderColor: `${color}55`,
                  background: `${color}12`,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                  style={{ color, background: `${color}1f` }}
                >
                  <s.Icon size={15} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold text-ink">{s.label}</span>
                  <span className="block text-[10px] text-ink-muted">{s.sub}</span>
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-accent-cyan/50"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
