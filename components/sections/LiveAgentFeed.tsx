"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Network, Pause, Radio, Signal, Wifi } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { AgentOrgChart } from "@/components/flow/AgentOrgChart";

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

/**
 * War-room channel — strategic / coordination chatter, not the routine
 * status pings of #public-pulse. Same 11-agent cast, different conversation:
 * decisions, sprint sequencing, account moves, cross-agent handoffs.
 * Public-safe by the same rule as PUBLIC_PULSE: names / dollar figures /
 * client identifiers / paths stripped at the source.
 */
const WAR_ROOM_EVENTS: PulseEvent[] = [
  {
    id: "wr-001",
    agent: "jerry",
    agentName: "Jerry",
    agentRole: "Conductor",
    minutesAgo: 3,
    severity: "win",
    title: "Daily decision queue cleared",
    detail: "6 priority calls reviewed, routed, and acknowledged. Devola taking it from here.",
  },
  {
    id: "wr-002",
    agent: "devola",
    agentName: "Joe Devola",
    agentRole: "Traffic Manager",
    minutesAgo: 7,
    severity: "ok",
    title: "Sprint cycle 14 — 100% sequenced",
    detail: "23 tasks across 8 agents. Parallel where safe, serial where dependencies require it.",
  },
  {
    id: "wr-003",
    agent: "frank",
    agentName: "Frank",
    agentRole: "Sales",
    minutesAgo: 14,
    severity: "ok",
    title: "Outbound day plan locked",
    detail: "Top 5 accounts segmented by trigger event. Sequences staged for personalization pass.",
  },
  {
    id: "wr-004",
    agent: "puddy",
    agentName: "Puddy",
    agentRole: "Research",
    minutesAgo: 22,
    severity: "win",
    title: "ICP refresh — 12 verticals scanned",
    detail: "Coverage gaps and entry triggers documented. Top-3 candidates promoted to Frank.",
  },
  {
    id: "wr-005",
    agent: "kramer",
    agentName: "Kramer",
    agentRole: "Automation",
    minutesAgo: 35,
    severity: "win",
    title: "HubSpot ↔ Slack ↔ Retell bridge live",
    detail: "Closed-deal trigger fires welcome sequence + onboard board + scheduled intro call. End-to-end tested.",
  },
  {
    id: "wr-006",
    agent: "elaine",
    agentName: "Elaine",
    agentRole: "Content",
    minutesAgo: 48,
    severity: "ok",
    title: "Voice piece in pipeline — stage 2 of 3",
    detail: "Draft → brand-voice pass complete. Handed to Mickey for QA before publish.",
  },
  {
    id: "wr-007",
    agent: "george",
    agentName: "George",
    agentRole: "SEO & Efficiency",
    minutesAgo: 62,
    severity: "win",
    title: "Pricing tier remix — 14% margin lift",
    detail: "Modeled across 3 ARR brackets. Sensitivity analysis attached. Awaiting Jerry's call.",
  },
  {
    id: "wr-008",
    agent: "peterman",
    agentName: "Peterman",
    agentRole: "Creative",
    minutesAgo: 85,
    severity: "ok",
    title: "Quarterly visual system audit",
    detail: "Color refresh proposed across deck templates. Three direction concepts in review.",
  },
  {
    id: "wr-009",
    agent: "mickey",
    agentName: "Mickey",
    agentRole: "QA",
    minutesAgo: 102,
    severity: "win",
    title: "Pre-deploy checklist — all green",
    detail: "22 audits across 4 agents. No blockers. Cleared for production push.",
  },
  {
    id: "wr-010",
    agent: "newman",
    agentName: "Newman",
    agentRole: "Watchdog",
    minutesAgo: 145,
    severity: "ok",
    title: "P0 alert drill — 11s response time",
    detail: "Synthetic page fired, paged off, all dependent routes recovered. Drill log archived.",
  },
  {
    id: "wr-011",
    agent: "jackie",
    agentName: "Jackie",
    agentRole: "Operations",
    minutesAgo: 220,
    severity: "ok",
    title: "Weekly ops digest filed",
    detail: "Agent hours, decisions made, ships shipped, blockers. Distributed to leadership thread.",
  },
  {
    id: "wr-012",
    agent: "jerry",
    agentName: "Jerry",
    agentRole: "Conductor",
    minutesAgo: 340,
    severity: "win",
    title: "Strategic pivot logged",
    detail: "Vertical doubling-down approved. Roadmap updated, specialists re-briefed for new focus.",
  },
  {
    id: "wr-013",
    agent: "devola",
    agentName: "Joe Devola",
    agentRole: "Traffic Manager",
    minutesAgo: 480,
    severity: "ok",
    title: "Parallel batch dispatched",
    detail: "6 agents working same brief. Results merge at 17:00 for Jerry's QA pass before delivery.",
  },
  {
    id: "wr-014",
    agent: "frank",
    agentName: "Frank",
    agentRole: "Sales",
    minutesAgo: 600,
    severity: "win",
    title: "Voice agent demo set — Tuesday 10:00",
    detail: "Decision team confirmed. Frank pre-briefed; Puddy supplying account dossier 24h prior.",
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
 * useAgentFeedRotation — shared state machine for any surface that wants to
 * render the auto-advancing public-pulse feed (phone, laptop, iPad, etc.).
 * Owns: the rotating window of events, hover/focus pause, the wall clock,
 * and reduced-motion handling. Surface components just consume + style.
 */
function useAgentFeedRotation(visibleCount: number, events: PulseEvent[] = EVENTS) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [head, setHead] = useState(0);
  const time = useClock(!reduced);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setHead((h) => (h + 1) % events.length);
    }, ADVANCE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced, paused, events.length]);

  const visible = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, i) => events[(head + i) % events.length]),
    [head, visibleCount, events]
  );

  return {
    reduced,
    paused,
    setPaused,
    head,
    time,
    visible,
    newestId: visible[0]?.id,
  };
}

/**
 * LiveAgentFeedPhone — phone frame with the auto-advancing feed.
 * Dropped into both the Problem section (as a "war room in your pocket"
 * teaser) and as a callable component anywhere a compact device-framed
 * feed is wanted.
 */
export function LiveAgentFeedPhone() {
  const { reduced, paused, setPaused, head, time, visible, newestId } =
    useAgentFeedRotation(VISIBLE_COUNT);

  return (
    <div
      className="relative mx-auto w-full max-w-[340px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Backlight stack — three layers create depth: a large soft halo,
          a mid-range cyan wash, and a tight rim glow on the bezel itself.
          The phone reads as illuminated, not pasted onto the page. */}
      <div
        className="pointer-events-none absolute -inset-16 -z-30 rounded-[6rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),rgba(99,102,241,0.10)_45%,transparent_75%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-6 -z-20 rounded-[3.5rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent_70%)] blur-xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[2.5rem] bg-gradient-to-b from-accent-cyan/40 via-accent-indigo/20 to-transparent opacity-70 blur-[2px]"
        aria-hidden
      />

      {/* phone bezel */}
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.4rem] border border-line-strong bg-night shadow-[0_30px_60px_-15px_rgba(34,211,238,0.45),0_0_0_1px_rgba(255,255,255,0.04)_inset] ring-1 ring-white/[0.04]">
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
  );
}

/**
 * LiveAgentFeed — a phone-framed live activity feed showing public-safe
 * samples of the internal multi-agent operations system. Auto-advances
 * every ~6.5s, pauses on hover, supports prefers-reduced-motion (no auto-
 * advance, no slide animations). The phone frame is intentionally generic
 * to avoid Apple trade-dress exposure.
 */
export function LiveAgentFeed({ eyebrow, heading, body, stats, footnote }: Props) {
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
      <LiveAgentFeedPhone />
    </div>
  );
}

/**
 * LiveAgentFeedTablet — the auto-advancing feed rendered as a landscape
 * tablet (iPad-style) chrome: thin silver rim, edge-to-edge screen, no
 * window chrome. The page's main "ops command" surface, full container
 * width with a 3-channel view-switcher pill beneath it.
 *
 * The screen lifts in with a one-shot rotateX animation when scrolled into
 * view, then runs the feed normally.
 */
const LAPTOP_VISIBLE_COUNT = 8;

type LaptopView = "war-room" | "hq-cam" | "operating-model";

const VIEWS: Record<LaptopView, { label: string; channel: string; icon: typeof Radio }> = {
  "war-room": { label: "War Room", channel: "war-room", icon: Radio },
  "hq-cam": { label: "HQ Cam", channel: "hq-cam", icon: Camera },
  "operating-model": { label: "Operating Model", channel: "operating-model", icon: Network },
};

export function LiveAgentFeedTablet() {
  const { reduced, setPaused, head, visible, newestId } =
    useAgentFeedRotation(LAPTOP_VISIBLE_COUNT, WAR_ROOM_EVENTS);
  const [view, setView] = useState<LaptopView>("war-room");
  const channel = VIEWS[view].channel;

  return (
    <div
      className="relative mx-auto w-full max-w-6xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ perspective: 2000 }}
    >
      {/* Backlight stack — stronger cyan halo so the laptop reads as
          illuminated and "comes off the page". Three layers: huge soft halo,
          mid blue wash, tight pulse glow at the chassis rim. */}
      <div
        className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-30 rounded-[7rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.32),rgba(99,102,241,0.16)_45%,transparent_78%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-20 rounded-[4rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent_72%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[1.5rem] bg-gradient-to-b from-accent-cyan/40 via-accent-indigo/20 to-transparent opacity-70 blur-[2px]"
        aria-hidden
      />
      {!reduced && (
        <div
          className="pointer-events-none absolute -inset-x-20 -bottom-6 -z-20 h-24 animate-pulse rounded-[3rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.30),transparent_70%)] blur-2xl"
          aria-hidden
        />
      )}

      {/* iPad body — thin silver rim wrapping an edge-to-edge screen.
          Animates in on scroll with a subtle lift. */}
      <motion.div
        initial={reduced ? false : { rotateX: -20, y: 24, opacity: 0 }}
        whileInView={reduced ? undefined : { rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformOrigin: "center bottom", transformStyle: "preserve-3d" }}
        className="relative aspect-[1.43] w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#0b1118] to-[#070a10] ring-1 ring-white/25 shadow-[0_40px_80px_-20px_rgba(34,211,238,0.50),0_0_0_1px_rgba(255,255,255,0.10)_inset,0_0_0_2px_rgba(0,0,0,0.4)]"
      >
        {/* tiny front camera dot, centered on the top edge */}
        <span
          className="pointer-events-none absolute left-1/2 top-1.5 z-40 h-1 w-1 -translate-x-1/2 rounded-full bg-white/30"
          aria-hidden
        />

        {/* Channel header — sits at the very top, no macOS title bar above it */}
        <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-night/95 px-6 pb-4 pt-4 backdrop-blur">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-lg font-semibold text-white">
              <span className="text-ink-faint">#</span> {channel}
            </p>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-cyan">
              <span className="relative inline-block h-2 w-2 rounded-full bg-accent-cyan">
                {!reduced && (
                  <span
                    className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/60"
                    aria-hidden
                  />
                )}
              </span>
              Live · 11 agents · auto-updating
            </span>
          </div>
        </div>

        {/* Screen content — swapped by the view buttons below. */}
        <div className="absolute inset-x-0 bottom-0 top-[4.5rem] overflow-hidden">
          {view === "war-room" && (
            <div
              className="absolute inset-0 overflow-hidden px-4 pt-4 sm:px-5"
              role="log"
              aria-live="polite"
              aria-label="Live agent activity feed — war-room channel"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {visible.map((event, idx) => (
                    <motion.div
                      key={event.id + "-" + head}
                      layout
                      initial={reduced ? false : { opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1 - idx * 0.04, y: 0, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
                      transition={{ duration: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <LaptopMessageRow
                        event={event}
                        highlighted={!reduced && idx === 0 && event.id === newestId}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* bottom fade */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night via-night/60 to-transparent"
                aria-hidden
              />
            </div>
          )}

          {view === "hq-cam" && (
            <div
              className="absolute inset-0 grid place-items-center bg-black/40 p-4"
              aria-label="HQ camera view — apartment floor plan"
            >
              <Image
                src="/seinfeld-apartment.png"
                alt="Top-down pixel-art floor plan of the Seinfeld HQ: Jerry's apartment, George Costanza's office (Yankees Ops), and Monk's Cafe (Field Ops & Intel)."
                width={1024}
                height={765}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="h-full w-full object-contain"
                priority={false}
              />
              {/* scanline shimmer to sell the "live camera" read */}
              {!reduced && (
                <div
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(255,255,255,0.025)_2px_3px)]"
                  aria-hidden
                />
              )}
              {/* corner timestamp / cam tag */}
              <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-rose-300">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                REC · CAM 01
              </div>
            </div>
          )}

          {view === "operating-model" && (
            <div
              className="absolute inset-0 overflow-y-auto bg-night px-4 py-4 sm:px-5"
              aria-label="Operating model — interactive agent org chart"
            >
              <AgentOrgChart />
            </div>
          )}
        </div>
      </motion.div>

      {/* Drop shadow under the iPad — soft, just enough to lift it off the
          page so it doesn't look like a flat rectangle. */}
      <div
        className="mx-auto h-2 w-[60%] -translate-y-1 rounded-full bg-night/70 opacity-60 blur-md"
        aria-hidden
      />

      {/* View switcher — three "channels" the tablet can show. Centered. */}
      <div className="mt-8 flex justify-center">
        <div
          role="tablist"
          aria-label="Switch HQ view"
          className="inline-flex max-w-md items-center justify-center gap-1 rounded-full border border-line bg-surface-elevated/70 p-1 backdrop-blur"
        >
          {(Object.keys(VIEWS) as LaptopView[]).map((key) => {
            const v = VIEWS[key];
            const active = view === key;
            const Icon = v.icon;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setView(key)}
                className={[
                  "flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all",
                  active
                    ? "bg-accent-gradient text-night shadow-glow"
                    : "text-ink-muted hover:text-ink",
                ].join(" ")}
              >
                <Icon size={13} aria-hidden />
                <span className="hidden sm:inline">{v.label}</span>
                <span className="sm:hidden">{v.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LaptopMessageRow({ event, highlighted }: { event: PulseEvent; highlighted: boolean }) {
  return (
    <div
      className={[
        "relative rounded-xl border bg-white/[0.03] px-4 py-3 transition-all duration-700",
        highlighted
          ? `border-transparent ring-1 ${SEVERITY_RING[event.severity]} shadow-[0_0_24px_-8px_rgba(34,211,238,0.55)]`
          : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
          <Image
            src={`/agents/${event.agent === "devola" ? "devola" : event.agent}.png`}
            alt=""
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-sm font-semibold text-white">{event.agentName}</span>
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
              {event.agentRole}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-ink-faint">
              {relativeTime(event.minutesAgo)}
            </span>
          </div>
          <div className="mt-1 flex items-start gap-2">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[event.severity]}`}
              aria-hidden
            />
            <p className="text-sm font-semibold leading-snug text-white">{event.title}</p>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-ink-faint">{event.detail}</p>
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
