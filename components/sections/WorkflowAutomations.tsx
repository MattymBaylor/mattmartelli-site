"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FileSignature,
  Video,
  Phone,
  ClipboardList,
  Megaphone,
  Headphones,
  Star,
  Building2,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Complete Workflow Automations
 * -----------------------------
 * End-to-end "living workflow" demos grouped by the department that runs them.
 * The left rail is the menu (every capability visible = breadth at a glance);
 * the right hero embeds the selected workflow and can expand to full height.
 *
 * Each workflow file lives under /public/workflows/*.html and is served over
 * HTTPS. A HEAD probe on load marks which are hosted, so the rail shows live /
 * soon status up front; unhosted ones fall back to an on-brand animated teaser.
 * Green is used ONLY as the highlight / department-label accent.
 */

const GREEN = "#2FB877";

type Dept = { id: string; label: string };
type Workflow = {
  id: string;
  dept: string;
  Icon: LucideIcon;
  name: string;
  sub?: string;
  src?: string;
  frame?: string;
  out: string;
};

const DEPARTMENTS: Dept[] = [
  { id: "internal", label: "Internal processes" },
  { id: "recruitment", label: "Recruitment" },
  { id: "sales", label: "Inside sales · call center" },
  { id: "marketing", label: "Marketing" },
  { id: "care", label: "Customer care" },
  { id: "postsale", label: "Post-sale" },
];

const WORKFLOWS: Workflow[] = [
  {
    id: "contract",
    dept: "internal",
    Icon: FileSignature,
    name: "Contract & e-signature routing",
    sub: "Intake agreement · CLM",
    src: "/workflows/contract-lifecycle.html",
    frame: "apex-advisory · intake-agreement",
    out: "Agreement generated, routed for e-signature, and processed end to end — onboarding kicks off the second it’s signed.",
  },
  {
    id: "recruiting",
    dept: "recruitment",
    Icon: Video,
    name: "Recruiting & applicant tracking",
    sub: "ATS · video interview",
    src: "/workflows/recruiting-interview.dc.html",
    frame: "growth-mindset · video-interview",
    out: "Application in → automated follow-up, AI-scored video interview, and ATS sync. The full candidate journey, end to end.",
  },
  {
    id: "leadform",
    dept: "sales",
    Icon: ClipboardList,
    name: "Automated lead-intake web form",
    sub: "Book · qualify · schedule",
    src: "/workflows/callcenter-speed-to-lead.html",
    frame: "naples-exteriors · lead-intake",
    out: "A guided web form that captures the lead, qualifies with a live service-area check, and self-schedules the estimate in under a minute — the speed-to-lead front door. Hit “Run Auto-Fill” to watch it complete itself.",
  },
  {
    id: "callcenter",
    dept: "sales",
    Icon: Phone,
    name: "Call center workflow",
    sub: "Inbound · outbound",
    out: "Every call answered, qualified, and logged — inbound and outbound, around the clock.",
  },
  {
    id: "lifecycle",
    dept: "marketing",
    Icon: Megaphone,
    name: "30-day lead nurture",
    sub: "Email · SMS · scoring",
    src: "/workflows/marketing-lead-nurture.html",
    frame: "growth-mindset · lead-nurture",
    out: "New lead → 60-second speed-to-lead response, a 30-day multi-channel nurture, live lead scoring, and auto-routing to a rep the moment they’re sales-ready.",
  },
  {
    id: "support",
    dept: "care",
    Icon: Headphones,
    name: "Support & resolution",
    sub: "Omnichannel · CSAT",
    src: "/workflows/customer-care-support.html",
    frame: "growth-mindset · support",
    out: "Any request — email, chat, or phone — becomes one ticket: AI deflection up front, smart routing to the right human, resolution, and a CSAT score on every close.",
  },
  {
    id: "postsale",
    dept: "postsale",
    Icon: Star,
    name: "Reviews & reputation",
    sub: "Google · Yelp · monitoring",
    src: "/workflows/postsale-reviews.html",
    frame: "growth-mindset · reviews",
    out: "After the sale → automated review requests across Google, Yelp, and Facebook, always-on monitoring, and unhappy customers routed to service recovery before they post.",
  },
];

const DEFAULT_ID = "contract";

export function WorkflowAutomations() {
  const [activeId, setActiveId] = useState(DEFAULT_ID);
  const [expanded, setExpanded] = useState(false);
  const [avail, setAvail] = useState<Record<string, boolean>>({});
  const [frameH, setFrameH] = useState(460);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const active = WORKFLOWS.find((w) => w.id === activeId) ?? WORKFLOWS[0];
  const deptLabel = (id: string) =>
    DEPARTMENTS.find((d) => d.id === id)?.label ?? "";

  // Probe every hosted workflow up front so the rail shows accurate live/soon
  // status without waiting for a click.
  useEffect(() => {
    let cancelled = false;
    WORKFLOWS.forEach((w) => {
      if (!w.src) return;
      fetch(w.src, { method: "HEAD" })
        .then((r) => {
          if (!cancelled) setAvail((a) => ({ ...a, [w.id]: r.ok }));
        })
        .catch(() => {
          if (!cancelled) setAvail((a) => ({ ...a, [w.id]: false }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isLive = Boolean(active.src && avail[active.id]);

  const measure = useCallback(() => {
    if (!expanded) {
      setFrameH(460);
      return;
    }
    try {
      const doc = frameRef.current?.contentWindow?.document;
      const h = doc
        ? Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight)
        : 0;
      setFrameH(h > 200 ? h : 1400);
    } catch {
      setFrameH(1400);
    }
  }, [expanded]);

  useEffect(() => {
    measure();
  }, [expanded, activeId, measure]);

  const select = (id: string) => {
    setActiveId(id);
    setExpanded(false);
  };

  return (
    <section
      id="workflow-automations"
      className="section border-t border-line/60"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Complete workflow automations"
          title="Automations across every department"
          sub="End-to-end workflows, grouped by the department that runs them. Pick one to watch it run — expand to see the whole thing."
        />

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-5 lg:grid-cols-[264px_1fr]">
            {/* Left rail — capabilities grouped by department. */}
            <nav
              aria-label="Workflows by department"
              className="rounded-xl border border-line bg-surface-elevated/40 p-2.5"
            >
              {DEPARTMENTS.map((d) => {
                const items = WORKFLOWS.filter((w) => w.dept === d.id);
                if (!items.length) return null;
                return (
                  <div key={d.id}>
                    <p
                      className="px-2 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: GREEN }}
                    >
                      {d.label}
                    </p>
                    <ul className="space-y-1.5">
                      {items.map((w) => {
                        const on = w.id === activeId;
                        const live = Boolean(w.src && avail[w.id]);
                        return (
                          <li key={w.id}>
                            <button
                              type="button"
                              onClick={() => select(w.id)}
                              className="flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition-colors"
                              style={{
                                borderColor: on
                                  ? GREEN
                                  : "rgba(148,163,184,0.12)",
                                background: on
                                  ? "rgba(47,184,119,0.10)"
                                  : "#0f1218",
                                boxShadow: on ? `inset 2px 0 0 ${GREEN}` : undefined,
                              }}
                            >
                              <w.Icon
                                size={17}
                                strokeWidth={1.75}
                                aria-hidden
                                style={{
                                  color: on ? GREEN : "#697586",
                                  marginTop: 1,
                                  flex: "none",
                                }}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block text-[13px] font-medium text-ink">
                                  {w.name}
                                </span>
                                {w.sub && (
                                  <span className="mt-0.5 block text-[11px] text-ink-faint">
                                    {w.sub}
                                  </span>
                                )}
                              </span>
                              <span className="ml-auto flex-none self-center">
                                {live ? (
                                  <span
                                    className="block h-[7px] w-[7px] rounded-full"
                                    style={{
                                      background: GREEN,
                                      boxShadow: `0 0 8px ${GREEN}`,
                                    }}
                                  />
                                ) : (
                                  <span className="rounded-full border border-line px-2 py-[2px] text-[9px] uppercase tracking-wide text-ink-faint">
                                    Soon
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>

            {/* Right hero. */}
            <div>
              <div className="overflow-hidden rounded-xl border border-line bg-surface">
                <div className="flex items-center gap-2 border-b border-line bg-night/60 px-3 py-2.5">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
                    <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
                    <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
                  </span>
                  <span className="ml-1 font-mono text-[11px] text-ink-faint">
                    {isLive ? active.frame : "coming-soon"}
                  </span>
                  <span className="ml-auto flex items-center gap-3">
                    {isLive && (
                      <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                        <span
                          className="h-[7px] w-[7px] rounded-full animate-pulse-soft"
                          style={{
                            background: GREEN,
                            boxShadow: `0 0 8px ${GREEN}`,
                          }}
                        />
                        Live
                      </span>
                    )}
                    {isLive && (
                      <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1 text-[11px] text-ink-muted transition-colors hover:bg-surface-raised"
                      >
                        {expanded ? (
                          <Minimize2 size={13} />
                        ) : (
                          <Maximize2 size={13} />
                        )}
                        {expanded ? "Collapse" : "Expand"}
                      </button>
                    )}
                  </span>
                </div>

                <div
                  className="relative bg-night"
                  style={{
                    height: isLive ? frameH : 380,
                    transition: "height 0.28s ease",
                  }}
                >
                  {isLive ? (
                    <iframe
                      ref={frameRef}
                      key={active.id}
                      src={active.src}
                      title={active.name}
                      onLoad={measure}
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <TeaserFlow
                      caption={
                        active.src
                          ? "Live preview — publishing shortly"
                          : "Coming soon"
                      }
                    />
                  )}
                </div>

                <div className="border-t border-line px-5 py-4">
                  <p
                    className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em]"
                    style={{ color: GREEN }}
                  >
                    {deptLabel(active.dept)}
                  </p>
                  <h3 className="text-lg font-semibold text-ink">
                    {active.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {active.out}
                  </p>
                  {isLive && active.src && (
                    <a
                      href={active.src}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-accent-cyan/40 px-3.5 py-2 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/10"
                    >
                      Open full workflow
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
                <Building2 size={15} aria-hidden style={{ color: GREEN }} />
                Every department on the surface — the whole company automated, no digging.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeaserFlow({ caption }: { caption: string }) {
  const nodes = [34, 112, 190, 268, 346, 426];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
      <svg viewBox="0 0 460 92" className="w-[min(460px,90%)]" aria-hidden>
        <line
          x1="34"
          y1="46"
          x2="426"
          y2="46"
          stroke="#22D3EE"
          strokeOpacity="0.25"
          strokeWidth="3"
        />
        <line
          x1="34"
          y1="46"
          x2="426"
          y2="46"
          stroke="#22D3EE"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 8"
          style={{ animation: "dash 1.2s linear infinite" }}
        />
        {nodes.map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy="46"
            r={i === 2 ? 16 : 14}
            fill="#12141C"
            stroke={i >= 4 ? "#F5A524" : "#22D3EE"}
            strokeWidth={i === 2 ? 4 : 3}
            className="animate-pulse-soft"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
      <p className="text-sm text-ink-muted">{caption}</p>
    </div>
  );
}
