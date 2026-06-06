"use client";

/**
 * HeroSystemDiagram — a compact, animated "one-glance" summary of the whole
 * system this site is about: the three real pillars (Voice AI, Multi-Agent
 * Orchestration, Marketing Ops) converging on a single orchestration core and
 * flowing out to business outcomes. It mirrors the three interactive diagrams
 * on /seinfeld-hq (see content/diagrams.ts) and is itself one big clickable
 * doorway into that flagship page.
 *
 * Colors come from the same kind-language used across the flow diagrams:
 * cyan = input/system, indigo = agent, warm = outcome.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneIncoming, Bot, BarChart3, Cpu, Trophy, ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const CYAN = "#22D3EE";
const INDIGO = "#6366F1";
const WARM = "#F5A524";

const pillars = [
  { id: "voice", label: "Voice AI", sub: "inbound calls", Icon: PhoneIncoming, color: CYAN, y: 18 },
  { id: "agents", label: "Multi-Agent", sub: "orchestration", Icon: Bot, color: INDIGO, y: 50 },
  { id: "mktg", label: "Marketing Ops", sub: "lead → revenue", Icon: BarChart3, color: CYAN, y: 82 },
] as const;

export function HeroSystemDiagram() {
  const reduced = usePrefersReducedMotion();

  return (
    <Link
      href="/seinfeld-hq"
      aria-label="Open the multi-agent system that runs my company — Seinfeld HQ flagship case study"
      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface-elevated/40 p-5 transition-colors hover:border-accent-cyan/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 sm:p-6"
    >
      {/* Decorative corner ribbon — reinforces the card's single link target.
          Draped across the top-right corner; clipped by the card's overflow-hidden. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-[-64px] top-[34px] z-20 flex w-[240px] rotate-45 items-center justify-center gap-1 whitespace-nowrap bg-[#FACC15] py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-night ${
          reduced
            ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.2),0_0_18px_2px_rgba(250,204,21,0.6),0_2px_5px_-1px_rgba(0,0,0,0.45)]"
            : "animate-ribbon-pulse transition-[transform,filter] duration-200 group-hover:scale-[1.06] group-hover:brightness-110"
        }`}
      >
        See how it works
        <ArrowUpRight size={11} className="shrink-0" aria-hidden />
      </span>

      {/* Header row */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="rounded-md bg-accent-cyan/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan/90">
          Live system
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent-cyan">
          Seinfeld HQ
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>

      {/* Diagram canvas */}
      <div className="relative h-[260px] w-full sm:h-[300px]">
        {/* Animated connector layer */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <marker id="hero-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={CYAN} />
            </marker>
          </defs>
          {/* pillars -> core — stop at the core's left edge (not its center),
              endpoints kept on each line's trajectory so arrowheads touch the box */}
          {[
            { y1: 54, y2: 116 },
            { y1: 150, y2: 150 },
            { y1: 246, y2: 184 },
          ].map((p, i) => (
            <line
              key={`in-${i}`}
              x1="120" y1={p.y1} x2="172" y2={p.y2}
              stroke="rgba(34,211,238,0.28)" strokeWidth="1.5" markerEnd="url(#hero-arrow)"
            />
          ))}
          {/* core -> outcome — start at the core's right edge, stop short of the outcome node */}
          <line x1="232" y1="150" x2="300" y2="150" stroke="rgba(34,211,238,0.28)" strokeWidth="1.5" markerEnd="url(#hero-arrow)" />
          {/* flowing pulses — match the corrected endpoints so dots stop at the nodes */}
          {!reduced && (
            <>
              <circle r="3" fill={CYAN}><animateMotion dur="2.2s" repeatCount="indefinite" path="M120,54 L172,116" /></circle>
              <circle r="3" fill={INDIGO}><animateMotion dur="2.6s" repeatCount="indefinite" path="M120,150 L172,150" /></circle>
              <circle r="3" fill={CYAN}><animateMotion dur="2.4s" repeatCount="indefinite" path="M120,246 L172,184" /></circle>
              <circle r="3.5" fill={WARM}><animateMotion dur="1.8s" repeatCount="indefinite" path="M232,150 L300,150" /></circle>
            </>
          )}
        </svg>

        {/* Pillar nodes (left) */}
        {pillars.map((p, i) => (
          <motion.div
            key={p.id}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            className="absolute -translate-y-1/2"
            style={{ left: "4%", top: `${p.y}%` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                style={{ borderColor: `${p.color}66`, color: p.color, background: `${p.color}14` }}
              >
                <p.Icon size={16} aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium text-ink">{p.label}</span>
                <span className="block text-[10px] text-ink-muted">{p.sub}</span>
              </span>
            </div>
          </motion.div>
        ))}

        {/* Orchestration core (center) */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="flex flex-col items-center gap-1 rounded-xl border border-accent-cyan/50 bg-accent-cyan/10 px-3 py-2.5 shadow-glow">
            <Cpu size={20} className="text-accent-cyan" aria-hidden />
            <span className="text-[11px] font-semibold text-ink">Orchestration</span>
            <span className="text-[9px] uppercase tracking-wider text-ink-muted">the system core</span>
          </span>
        </motion.div>

        {/* Outcome node (right) */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="absolute right-[2%] top-1/2 -translate-y-1/2 text-center"
        >
          <span
            className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-lg border"
            style={{ borderColor: `${WARM}80`, color: WARM, background: `${WARM}14` }}
          >
            <Trophy size={18} aria-hidden />
          </span>
          <span className="block text-xs font-medium text-ink">Business</span>
          <span className="block text-xs font-medium text-ink">outcomes</span>
        </motion.div>
      </div>

      {/* Footer caption */}
      <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-muted">
        <span className="text-ink transition-colors group-hover:text-accent-cyan">The multi-agent system that runs my own company</span>
        {" "}— voice, agents, and marketing ops wired into one operating system.
      </p>
    </Link>
  );
}
