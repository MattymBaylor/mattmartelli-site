"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Signal, Wifi } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type AgentId =
  | "jerry"
  | "newman"
  | "mickey"
  | "puddy"
  | "elaine"
  | "kramer"
  | "peterman"
  | "frank"
  | "george"
  | "jackie"
  | "devola";

type Severity = "ok" | "warn" | "critical" | "win";

type PulseEvent = {
  id: string;
  agent: AgentId;
  agentName: string;
  agentRole: string;
  minutesAgo: number;
  severity: Severity;
  title: string;
  detail: string;
};

/**
 * Curated public-safe samples extracted from the real internal Slack feed.
 * Names, dollar figures, client identifiers, and file paths are stripped at
 * the source. What's preserved is the operating pattern.
 */
const EVENTS: PulseEvent[] = [
  {
    id: "ev-001",
    agent: "newman",
    agentName: "Newman",
    agentRole: "Watchdog",
    minutesAgo: 2,
    severity: "ok",
    title: "Gateway healthy",
    detail: "HTTP 200 · 24d uptime · 198ms response · auto-paged: none",
  },
  {
    id: "ev-002",
    agent: "jerry",
    agentName: "Jerry",
    agentRole: "Conductor",
    minutesAgo: 9,
    severity: "win",
    title: "Daily SHIP — Mickey QA",
    detail:
      "17 audits complete. Accessibility B+, navigation B+, deployment status green.",
  },
  {
    id: "ev-003",
    agent: "puddy",
    agentName: "Puddy",
    agentRole: "Research",
    minutesAgo: 24,
    severity: "win",
    title: "Daily Market Intel",
    detail:
      "Tier-1 outreach candidate identified — local home services. Coverage gap pattern + emergency premium 39-70%.",
  },
  {
    id: "ev-004",
    agent: "newman",
    agentName: "Newman",
    agentRole: "Watchdog",
    minutesAgo: 47,
    severity: "warn",
    title: "5 cron errors detected",
    detail:
      "Auto-paged. Evening pipeline + daily build affected. Patterns logged for review.",
  },
  {
    id: "ev-005",
    agent: "peterman",
    agentName: "Peterman",
    agentRole: "Creative",
    minutesAgo: 119,
    severity: "win",
    title: "Campaign package shipped",
    detail:
      "LinkedIn carousel (8 slides) + TikTok script + Instagram ad — production-ready.",
  },
  {
    id: "ev-006",
    agent: "jerry",
    agentName: "Jerry",
    agentRole: "Conductor",
    minutesAgo: 187,
    severity: "ok",
    title: "Morning Surprise — 3 SaaS candidates",
    detail:
      "InboxConductor / LeadAgent Generator / LocalSEO Watchdog. Email productivity, content marketing, local SEO. Pick one.",
  },
  {
    id: "ev-007",
    agent: "mickey",
    agentName: "Mickey",
    agentRole: "QA",
    minutesAgo: 240,
    severity: "win",
    title: "Pattern observation logged",
    detail:
      "4th 'DONE ≠ operational' instance flagged. Recommending pipeline review for shipped-vs-deployed gap.",
  },
  {
    id: "ev-008",
    agent: "elaine",
    agentName: "Elaine",
    agentRole: "Content",
    minutesAgo: 310,
    severity: "win",
    title: "Blog post shipped",
    detail:
      "'The Real Cost of Missed Calls' — 1,400+ words, SEO optimized, schema markup, ready to deploy.",
  },
  {
    id: "ev-009",
    agent: "kramer",
    agentName: "Kramer",
    agentRole: "Automation",
    minutesAgo: 400,
    severity: "win",
    title: "5 webhook workflows deployed",
    detail:
      "Ping, Slack alerts, SMS bridge — daily monitoring activated. Run on scheduled cron.",
  },
  {
    id: "ev-010",
    agent: "newman",
    agentName: "Newman",
    agentRole: "Watchdog",
    minutesAgo: 480,
    severity: "win",
    title: "System self-recovery",
    detail:
      "7 agents back online after upstream API recovery. Self-healing event logged.",
  },
  {
    id: "ev-011",
    agent: "jerry",
    agentName: "Jerry",
    agentRole: "Conductor",
    minutesAgo: 720,
    severity: "win",
    title: "Revenue Command Center shipped",
    detail:
      "5-tab dashboard: MRR tracker + funnel health + daily activities + lead pipeline + agent status.",
  },
  {
    id: "ev-012",
    agent: "george",
    agentName: "George",
    agentRole: "SEO & Efficiency",
    minutesAgo: 900,
    severity: "ok",
    title: "Daily revenue brief",
    detail:
      "Conversion rates, funnel health, pricing model deltas — summary delivered.",
  },
  {
    id: "ev-013",
    agent: "frank",
    agentName: "Frank",
    agentRole: "Sales",
    minutesAgo: 1080,
    severity: "ok",
    title: "Sales pipeline standup",
    detail: "Pipeline review complete. 3 outreach candidates queued for follow-up.",
  },
];

const VISIBLE_COUNT = 5;
const ADVANCE_INTERVAL_MS = 6500;
const PULSE_DURATION_MS = 1800;

const SEVERITY_DOT: Record<Severity, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  critical: "bg-rose-400",
  win: "bg-accent-cyan",
};

const SEVERITY_RING: Record<Severity, string> = {
  ok: "ring-emerald-400/40",
  warn: "ring-amber-400/40",
  critical: "ring-rose-400/40",
  win: "ring-accent-cyan/40",
};

function relativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return "now";
  if (minutesAgo < 60) return `${minutesAgo}m`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function useClock(active: boolean): string {
  const [time, setTime] = useState<string>("9:41");
  useEffect(() => {
    function update() {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      const h12 = h % 12 === 0 ? 12 : h % 12;
      setTime(`${h12}:${m.toString().padStart(2, "0")}`);
    }
    update();
    if (!active) return;
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [active]);
  return time;
}

type Props = {
  eyebrow: string;
  heading: string;
  body: string;
  stats: readonly { value: string; label: string }[];
  footnote: string;
};

/**
 * LiveAgentFeed — a phone-framed live activity feed showing public-safe
 * samples of the internal multi-agent operations system. Auto-advances
 * every ~6.5s, pauses on hover, supports prefers-reduced-motion (no auto-
 * advance, no slide animations). The phone frame is intentionally generic
 * to avoid Apple trade-dress exposure.
 */
export function LiveAgentFeed({ eyebrow, heading, body, stats, footnote }: Props) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [head, setHead] = useState(0);
  const time = useClock(!reduced);

  // Auto-advance the feed unless paused or reduced motion.
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setHead((h) => (h + 1) % EVENTS.length);
    }, ADVANCE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  // Sliding window of visible events.
  const visible = useMemo(
    () =>
      Array.from({ length: VISIBLE_COUNT }, (_, i) => EVENTS[(head + i) % EVENTS.length]),
    [head]
  );

  // The newest event id — used for the pulse highlight effect.
  const newestId = visible[0]?.id;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-center">
      {/* LEFT: explanatory copy + stat chips */}
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">{heading}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">{body}</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <li
              key={s.label}
              className="rounded-xl border border-line bg-surface-elevated/60 p-4"
            >
              <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-faint">{s.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-2xl text-xs leading-relaxed text-ink-faint">{footnote}</p>
      </div>

      {/* RIGHT: phone frame with live feed */}
      <div
        className="relative mx-auto w-full max-w-[340px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* outer glow */}
        <div className="absolute inset-0 -z-10 translate-y-2 scale-95 rounded-[3rem] bg-accent-cyan/10 blur-3xl" aria-hidden />

        {/* phone bezel */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.4rem] border border-line-strong bg-night shadow-2xl ring-1 ring-white/[0.04]">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-30 h-6 w-28 -translate-x-1/2 rounded-full bg-black" aria-hidden>
            {/* pause indicator slides into the notch on hover */}
            <AnimatePresence>
              {paused && !reduced && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-full bg-accent-cyan/95 text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-night"
                >
                  <Pause size={11} fill="currentColor" strokeWidth={0} aria-hidden />
                  Paused
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-end justify-between px-6 pb-1 font-mono text-[11px] text-white">
            <time className="font-semibold tabular-nums">{time}</time>
            <div className="flex items-center gap-1.5">
              <Signal size={11} aria-hidden />
              <Wifi size={11} aria-hidden />
              <span className="relative inline-block h-2.5 w-5 rounded-[2px] border border-white/80" aria-hidden>
                <span className="absolute inset-0 m-[1px] rounded-[1px] bg-white" />
              </span>
            </div>
          </div>

          {/* channel header */}
          <div className="absolute inset-x-0 top-11 z-10 border-b border-white/10 bg-night/95 px-5 pb-3 pt-2 backdrop-blur">
            <div className="flex items-baseline justify-between">
              <p className="font-display text-sm font-semibold text-white">
                <span className="text-ink-faint">#</span> public-pulse
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent-cyan">
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan">
                  {!reduced && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/60" aria-hidden />
                  )}
                </span>
                Live
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-ink-faint">11 agents · auto-updating</p>
          </div>

          {/* message list */}
          <div
            className="absolute inset-x-0 top-[6.25rem] bottom-0 overflow-hidden px-3 pt-3"
            role="log"
            aria-live="polite"
            aria-label="Live agent activity feed"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((event, idx) => (
                <motion.div
                  key={event.id + "-" + head}
                  layout
                  initial={reduced ? false : { opacity: 0, y: -18, scale: 0.96 }}
                  animate={{
                    opacity: 1 - idx * 0.12,
                    y: 0,
                    scale: 1,
                  }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.95 }}
                  transition={{ duration: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="mb-2.5"
                >
                  <MessageRow
                    event={event}
                    highlighted={!reduced && idx === 0 && event.id === newestId}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {/* bottom fade so older messages fade out gracefully */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night via-night/60 to-transparent" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageRow({ event, highlighted }: { event: PulseEvent; highlighted: boolean }) {
  return (
    <div
      className={[
        "relative rounded-xl border bg-white/[0.03] px-3 py-2.5 transition-all duration-700",
        highlighted
          ? `border-transparent ring-1 ${SEVERITY_RING[event.severity]} shadow-[0_0_24px_-8px_rgba(34,211,238,0.55)]`
          : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start gap-2.5">
        <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
          <Image
            src={`/agents/${event.agent === "devola" ? "devola" : event.agent}.png`}
            alt=""
            fill
            sizes="28px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="truncate text-[11px] font-semibold text-white">
              {event.agentName}
            </span>
            <span className="truncate font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
              {event.agentRole}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[9px] tabular-nums text-ink-faint">
              {relativeTime(event.minutesAgo)}
            </span>
          </div>
          <div className="mt-1 flex items-start gap-1.5">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[event.severity]}`}
              aria-hidden
            />
            <p className="text-[11px] font-semibold leading-snug text-white">
              {event.title}
            </p>
          </div>
          <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-ink-faint">
            {event.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
