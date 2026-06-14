"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ExternalLink,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
  Contrast,
  AlertTriangle,
} from "lucide-react";

type MatrixCard = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  buttonLabel: string;
  url: string;
};

const CARDS: MatrixCard[] = [
  {
    id: "n8n",
    category: "Migration & Integration",
    categoryColor:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20",
    title: "Zapier to n8n Migration",
    description:
      "Migrated a 300,000+ task/month footprint to self-hosted n8n, saving over $90K/year. Managed zero-downtime transition via parallel runs and a 6-agent Human-in-the-Loop Slack monitoring system.",
    problem:
      "300,000+ monthly Zapier tasks were creating escalating costs and limiting workflow flexibility.",
    solution:
      "Migrated the automation ecosystem to self-hosted n8n with parallel-run validation and a Human-in-the-Loop monitoring system.",
    outcome: "$90K+ annual savings with zero downtime during migration.",
    buttonLabel: "View Live n8n Engine",
    url: "https://mattmartelli.com",
  },
  {
    id: "yelp",
    category: "Restore Reporting Layer",
    categoryColor:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/20",
    title: "Interactive Dashboard",
    description:
      "Custom-engineered visual analytics interface decoupled from slow native CRM reporting pipelines using an independent, high-speed database layer (Supabase/Postgres).",
    problem:
      "Native CRM reporting was too slow and inflexible to provide real-time visibility into lead and marketing performance.",
    solution:
      "Built a custom analytics layer using Supabase/Postgres to deliver real-time reporting independent of CRM limitations.",
    outcome:
      "Reduced reporting latency from hours to seconds and provided a single source of truth for marketing and sales performance.",
    buttonLabel: "View Interactive Dashboard",
    url: "https://growthmindset.cloud",
  },
  {
    id: "retell",
    category: "Plug Into AI Roadmap",
    categoryColor:
      "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-500/10 dark:text-violet-200 dark:border-violet-500/20",
    title: "Voice AI Agents",
    description:
      "Production voice agent trained on 10,000 real call center transcripts to master 30+ buyer objections, supporting 60+ concurrent active telephone lines via Retell AI.",
    problem:
      "Call centers lose revenue when agents can't answer every call, handle every objection, or scale during peak demand.",
    solution:
      "Developed production Voice AI agents trained on 10,000+ call transcripts capable of handling objections and supporting high-volume inbound conversations.",
    outcome:
      "Enabled 24/7 coverage without increasing headcount and created a framework for automated lead qualification and appointment generation.",
    buttonLabel: "View recent blog article",
    url: "https://growthmindset.ai/blog/missed-call-problem",
  },
  {
    id: "agentic",
    category: "Multi-Agent Orchestration",
    categoryColor:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/20",
    title: "Multi-Agent Business Operating System",
    description:
      "I've built several full agentic systems using multiple platforms and tools, including Crew AI, OpenClaw, ClaudeClaw v2, and several others.",
    problem:
      "Organizations struggle to coordinate work across departments because knowledge, decisions, and workflows are scattered across multiple systems.",
    solution:
      "Built a multi-agent operating system using Claude orchestration and OpenClaw execution, enabling specialized AI agents to collaborate across marketing, sales, recruiting, analytics, and operations.",
    outcome:
      "Reduced cross-functional coordination overhead and established a scalable framework for autonomous business operations.",
    buttonLabel: "View recent case study",
    url: "case-study://multi-agent-agentic",
  },
  {
    id: "journey",
    category: "Journey Orchestration",
    categoryColor:
      "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/20",
    title: "Customer Journey Automation",
    description:
      "Designed and deployed multi-channel customer journeys across HubSpot, SMS, CRM, and call center systems to automate lead nurturing and follow-up.",
    problem:
      "Lead nurturing and follow-up were inconsistent across multiple channels and systems.",
    solution:
      "Designed and deployed multi-channel customer journeys across HubSpot, SMS, CRM, and call center systems.",
    outcome:
      "Generated $750K+/month in attributed pipeline while reducing manual intervention.",
    buttonLabel: "View case study",
    url: "case-study://customer-journey-automation",
  },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (localStorage.getItem("mm-theme") as "light" | "dark" | null)) ||
      "dark";
    const storedHc =
      typeof window !== "undefined" && localStorage.getItem("mm-hc") === "1";
    setTheme(stored);
    setHighContrast(storedHc);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("mm-theme", next);
    } catch {
      /* ignore */
    }
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    try {
      localStorage.setItem("mm-hc", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  return { theme, toggle, highContrast, toggleContrast };
}

export default function Playbook() {
  const [active, setActive] = useState<MatrixCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [caseStudyId, setCaseStudyId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { theme, toggle, highContrast, toggleContrast } = useTheme();

  const handleSelect = (card: MatrixCard) => {
    setCaseStudyId(null);
    setLoading(true);
    setLoadError(false);
    setProgress(0);
    setActive(card);
  };

  const handleShowOverview = () => {
    setActive(null);
    setLoading(false);
    setLoadError(false);
    setCaseStudyId(null);
  };

  const handleViewCaseStudy = (card: MatrixCard) => {
    setActive(null);
    setLoading(false);
    setLoadError(false);
    setCaseStudyId(card.id);
  };

  // If the iframe never fires onLoad (e.g. blocked by X-Frame-Options /
  // frame-ancestors CSP), surface an error state instead of an endless spinner.
  useEffect(() => {
    if (!active || !loading) return;
    const timer = window.setTimeout(() => {
      setLoading(false);
      setLoadError(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [active, loading]);

  // Simulated progress: ease toward ~90% while waiting on the iframe; jump to
  // 100% when it finishes loading.
  useEffect(() => {
    if (!active) return;
    if (!loading) {
      if (!loadError) setProgress(100);
      return;
    }
    setProgress(8);
    const interval = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.max(1, (92 - p) * 0.08)));
    }, 180);
    return () => window.clearInterval(interval);
  }, [active, loading, loadError]);

  const rootClass = [
    "flex min-h-screen flex-col bg-black",
    theme === "dark" ? "dark" : "",
    theme === "dark" && highContrast ? "hc" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main id="main" className={rootClass}>
      {/* Header */}
      <header className="border-b border-slate-800 bg-black text-white dark:border-slate-800/80 dark:bg-black/80">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-5 sm:gap-6">
          <Link href="/" className="min-w-0 flex-1 outline-none focus-visible:opacity-80">
            <h1 className="truncate text-2xl font-extrabold uppercase tracking-[0.1em] text-white antialiased sm:text-3xl">
              Matt Martelli
            </h1>
            <p className="mt-1.5 truncate text-sm font-medium tracking-[0.04em] text-slate-200 antialiased sm:text-base sm:tracking-[0.05em]">
              AI Systems Architect | Marketing Automation | Revenue Operations | Multi-Agent Systems
            </p>
          </Link>
          <div className="grid shrink-0 grid-cols-1 gap-1 text-right text-xs text-slate-200 dark:text-slate-300 sm:text-sm">
            <a
              href="mailto:matt@growthmindset.ai"
              className="flex items-center justify-end gap-2 hover:text-white dark:hover:text-slate-100"
            >
              <Mail className="h-3.5 w-3.5" />
              matt@growthmindset.ai
            </a>
            <a
              href="tel:+12146088290"
              className="flex items-center justify-end gap-2 hover:text-white dark:hover:text-slate-100"
            >
              <Phone className="h-3.5 w-3.5" />
              (214) 608-8290
            </a>
          </div>
          {theme === "dark" ? (
            <button
              type="button"
              onClick={toggleContrast}
              role="switch"
              aria-checked={highContrast}
              aria-label={
                highContrast
                  ? "Disable extra contrast mode"
                  : "Enable extra contrast mode for improved readability"
              }
              title={highContrast ? "Disable extra contrast" : "Enable extra contrast"}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                highContrast
                  ? "border-amber-200 bg-amber-300/30 text-amber-50 hover:bg-amber-300/40 focus-visible:ring-amber-200"
                  : "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white focus-visible:ring-amber-300"
              }`}
            >
              <Contrast className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">
                Extra contrast {highContrast ? "on" : "off"}
              </span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggle}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      {/* Workspace */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 px-6 py-8 lg:flex-row lg:gap-8">
        {/* Left column */}
        <section className="flex flex-col gap-6 lg:h-[calc(100vh-140px)] lg:w-3/5 lg:overflow-y-auto lg:pr-2">
          <div
            className={`rounded-xl border bg-white p-6 shadow-sm transition dark:bg-slate-800/40 ${
              !active && !caseStudyId
                ? "border-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.25),0_8px_30px_-6px_rgba(251,191,36,0.45)] ring-2 ring-amber-300/60 dark:border-amber-400/60 dark:shadow-[0_0_0_3px_rgba(251,191,36,0.18),0_8px_30px_-6px_rgba(251,191,36,0.35)] dark:ring-amber-400/40"
                : "border-slate-200 dark:border-slate-800/70"
            }`}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider leading-none text-white dark:bg-slate-200 dark:text-slate-900">
              Overview
            </div>
            <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">
              Overview — Matt Martelli
            </h2>
            <p className="mt-3 text-sm leading-[1.7] text-slate-600 dark:text-slate-400">
              Overview of the systems and tools I use, including examples of my work.
            </p>
            <div className="mt-5">
              <button
                onClick={handleShowOverview}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold leading-none tracking-wide text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
              >
                <ExternalLink className="h-4 w-4" />
                View overview
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/70 dark:bg-slate-800/40">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-slate-500 dark:text-slate-500">
              Select Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "HubSpot",
                "Salesforce",
                "n8n",
                "OpenAI",
                "Claude",
                "Gemini",
                "Five9",
                "Hatch SMS",
                "Supabase",
                "Postgres",
                "Zapier",
                "ActiveProspect",
                "Retell AI",
                "Crew AI",
                "OpenClaw",
              ].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold leading-none tracking-wide text-slate-700 dark:bg-slate-700/40 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {CARDS.map((card) => {
            const isActive = active?.id === card.id;
            const isCaseStudy =
              card.id === "n8n" || card.id === "agentic" || card.id === "journey";
            const isStudyOpen = caseStudyId === card.id;
            return (
              <article
                key={card.id}
                className={`rounded-xl border bg-white p-6 shadow-sm transition dark:bg-slate-800/40 ${
                  isActive || isStudyOpen
                    ? "border-slate-900 ring-1 ring-slate-900 dark:border-slate-300/60 dark:ring-slate-300/40"
                    : "border-slate-200 dark:border-slate-800/70"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${card.categoryColor}`}
                  >
                    {card.category}
                  </span>
                  {card.id === "n8n" && (
                    <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1.5 text-[15px] font-bold uppercase tracking-[0.12em] leading-none text-amber-800 dark:bg-amber-400/20 dark:text-amber-200">
                      Saved company 90k/yr with zero downtime!
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">
                  {card.title}
                </h3>
                <div className="mt-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-rose-700 dark:text-rose-300">
                    Problem
                  </div>
                  <p className="mt-1 text-sm leading-[1.7] text-slate-700 dark:text-slate-300">
                    {card.problem}
                  </p>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-emerald-700 dark:text-emerald-300">
                    Solution
                  </div>
                  <p className="mt-1 text-sm leading-[1.7] text-slate-700 dark:text-slate-300">
                    {card.solution}
                  </p>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-sky-700 dark:text-sky-300">
                    Outcome
                  </div>
                  <p className="mt-1 text-sm leading-[1.7] text-slate-700 dark:text-slate-300">
                    {card.outcome}
                  </p>
                </div>
                <div className="mt-5">
                  {isCaseStudy ? (
                    <>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-slate-500 dark:text-slate-500">
                        Case Study
                      </div>
                      <button
                        onClick={() => handleViewCaseStudy(card)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold leading-none tracking-wide text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View case study
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-slate-500 dark:text-slate-500">
                        Interactive Evidence
                      </div>
                      <button
                        onClick={() => handleSelect(card)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold leading-none tracking-wide text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {card.buttonLabel}
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Right column */}
        <aside className="flex flex-col lg:h-[calc(100vh-140px)] lg:w-2/5">
          <div className="flex h-full min-h-[60vh] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-emerald-900/70 dark:bg-emerald-900/40">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5 dark:border-emerald-900/70 dark:bg-emerald-950/60">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 dark:bg-green-400/70" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] leading-none text-slate-500 dark:text-white">
                  Live System Interaction Panel
                </div>
                <div className="truncate font-mono text-xs text-slate-700 dark:text-white">
                  {caseStudyId === "agentic"
                    ? "case-study://multi-agent-agentic"
                    : caseStudyId === "n8n"
                      ? "case-study://zapier-to-n8n"
                      : active
                        ? active.url
                        : "overview://matt-martelli"}
                </div>
              </div>
            </div>

            <div className="relative flex-1 bg-slate-50 dark:bg-emerald-950">
              {caseStudyId ? (
                <div className="absolute inset-0 overflow-y-auto bg-white px-6 py-6 dark:bg-emerald-950">
                  <div className="mb-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-xs font-semibold leading-none tracking-wide text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-white">
                    Case Study
                  </div>
                  {caseStudyId === "agentic" ? (
                    <>
                      <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                        Full Multi-Agent Agentic System
                      </h3>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Challenge
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        Organizations often struggle to coordinate work across departments because information is scattered between CRMs, project management systems, communication platforms, and operational databases. Traditional automation can move data between systems, but it cannot reason about priorities, assign ownership, coordinate teams, or adapt when conditions change.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        The objective was to create an autonomous operational framework capable of coordinating multiple specialized AI agents while maintaining human oversight and accountability.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Solution
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        I designed and deployed a multi-agent orchestration system using OpenClaw as the execution layer and Claude as the strategic reasoning engine. Rather than relying on a single AI assistant, the platform was structured as a collection of specialized agents, each responsible for a specific business function.
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-white">
                        Example agent roles included:
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Executive Leadership Agent</li>
                        <li>Marketing Strategy Agent</li>
                        <li>Sales Operations Agent</li>
                        <li>Customer Success Agent</li>
                        <li>Recruiting Agent</li>
                        <li>Data &amp; Analytics Agent</li>
                        <li>Workflow Automation Agent</li>
                        <li>Project Management Agent</li>
                      </ul>
                      <p className="mt-3 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        Claude acted as the primary orchestration layer, analyzing objectives, assigning work to specialized agents, consolidating outputs, identifying conflicts, and coordinating next actions. OpenClaw provided the operational environment for agent execution, tool access, memory management, and inter-agent communication.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        Human-in-the-loop approval checkpoints were implemented for high-impact decisions, ensuring business stakeholders maintained control over strategic direction and execution.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Results
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Coordinated multiple specialized AI agents within a unified operational framework</li>
                        <li>Reduced manual cross-functional coordination requirements</li>
                        <li>Automated task delegation and prioritization workflows</li>
                        <li>Created persistent organizational memory across agents</li>
                        <li>Improved visibility into ownership, dependencies, and project status</li>
                        <li>Established a scalable foundation for future autonomous business operations</li>
                      </ul>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Technical Highlights
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Claude-based orchestration and reasoning</li>
                        <li>OpenClaw multi-agent framework</li>
                        <li>Role-based agent architecture</li>
                        <li>Shared organizational memory</li>
                        <li>Autonomous task routing</li>
                        <li>Human-in-the-loop approvals</li>
                        <li>Multi-system tool integrations</li>
                        <li>Cross-agent communication and collaboration</li>
                      </ul>

                      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                        <h4 className="text-sm font-bold uppercase tracking-wider leading-none text-emerald-800 dark:text-white">
                          Key Takeaway
                        </h4>
                        <p className="mt-2 text-sm leading-[1.7] text-emerald-700 dark:text-white">
                          Most organizations use AI as a collection of disconnected tools. This project demonstrated how specialized agents can operate as a coordinated digital workforce, collaborating across business functions while maintaining human oversight. The result is an operational model that scales decision-making, execution, and organizational knowledge far beyond traditional workflow automation.
                        </p>
                      </div>
                    </>
                  ) : caseStudyId === "journey" ? (
                    <>
                      <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                        Customer Journey Automation
                      </h3>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Challenge
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        A national home improvement company generated thousands of leads each month through digital advertising, events, referral programs, and strategic partnerships.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        While lead volume remained strong, follow-up efforts were inconsistent across channels. Prospects often received disconnected experiences between CRM workflows, email campaigns, SMS outreach, inside sales teams, and appointment scheduling systems.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        The organization needed a unified customer journey capable of engaging leads consistently, increasing appointment volume, and improving overall conversion rates while reducing manual intervention.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Solution
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        I designed and deployed a multi-channel customer journey automation framework that orchestrated communications across HubSpot, SMS platforms, CRM systems, call center operations, and appointment scheduling tools.
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-white">
                        The framework included:
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Speed-to-Lead automation</li>
                        <li>Automated lead qualification workflows</li>
                        <li>Multi-channel email and SMS nurturing</li>
                        <li>Appointment confirmation and reminder sequences</li>
                        <li>Re-engagement campaigns for inactive leads</li>
                        <li>Cancellation recovery workflows</li>
                        <li>Customer segmentation and lifecycle routing</li>
                        <li>Performance tracking and attribution reporting</li>
                      </ul>
                      <p className="mt-3 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        Every interaction was designed to move prospects toward the next stage of the buying journey while ensuring messaging remained consistent across all communication channels.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Results
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Generated more than $750,000 per month in attributed pipeline</li>
                        <li>Reduced manual follow-up requirements across sales and marketing teams</li>
                        <li>Improved speed-to-lead response times</li>
                        <li>Increased appointment-setting efficiency</li>
                        <li>Created a scalable customer engagement framework capable of supporting multiple markets and business units</li>
                        <li>Improved visibility into customer journey performance and attribution</li>
                      </ul>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Technical Highlights
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>HubSpot Marketing Hub</li>
                        <li>HubSpot Operations Hub</li>
                        <li>CRM lifecycle automation</li>
                        <li>SMS and email orchestration</li>
                        <li>Lead scoring and segmentation</li>
                        <li>Automated appointment workflows</li>
                        <li>Attribution reporting</li>
                        <li>Customer journey mapping</li>
                        <li>Workflow automation and routing</li>
                      </ul>

                      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                        <h4 className="text-sm font-bold uppercase tracking-wider leading-none text-emerald-800 dark:text-white">
                          Key Takeaway
                        </h4>
                        <p className="mt-2 text-sm leading-[1.7] text-emerald-700 dark:text-white">
                          Most organizations automate individual tasks. This project focused on automating the entire customer journey. By connecting marketing, sales, scheduling, and customer communications into a unified lifecycle framework, the business created a predictable system for converting leads into revenue while reducing operational complexity.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                        Zapier to n8n Migration
                      </h3>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Challenge
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        A national home improvement company relied on Zapier to orchestrate critical lead management, CRM synchronization, appointment scheduling, marketing automation, and call center workflows.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        As automation usage expanded, the organization grew to more than 300,000 workflow executions per month. Costs continued to rise while workflow complexity increased, making long-term scalability a concern.
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        The business needed a more flexible automation platform capable of supporting growth without introducing operational risk.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Solution
                      </h4>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        I led the migration of the company's automation infrastructure from Zapier to a self-hosted n8n environment.
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-white">
                        The migration included:
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Audit and documentation of existing automation architecture</li>
                        <li>Recreation and optimization of production workflows in n8n</li>
                        <li>Parallel-run validation to compare outputs before cutover</li>
                        <li>Human-in-the-loop monitoring system for exception handling</li>
                        <li>Slack-based operational visibility and alerting</li>
                        <li>Phased migration strategy to eliminate downtime</li>
                      </ul>
                      <p className="mt-3 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        To reduce risk, both systems operated simultaneously during validation, allowing workflow outputs to be compared before production traffic was fully transitioned.
                      </p>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Results
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Migrated more than 300,000 workflow executions per month</li>
                        <li>Eliminated dependency on high-volume Zapier task pricing</li>
                        <li>Reduced annual automation costs by more than $90,000</li>
                        <li>Achieved zero downtime during migration</li>
                        <li>Improved workflow visibility and troubleshooting</li>
                        <li>Created a scalable automation foundation for future AI and agentic workflow initiatives</li>
                      </ul>

                      <h4 className="mt-5 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                        Technical Highlights
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-slate-600 dark:text-white">
                        <li>Zapier → n8n migration</li>
                        <li>Self-hosted workflow infrastructure</li>
                        <li>CRM integrations</li>
                        <li>Lead routing and qualification</li>
                        <li>Slack monitoring and alerting</li>
                        <li>Human-in-the-loop exception management</li>
                        <li>Parallel-run deployment strategy</li>
                      </ul>

                      <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                        <h4 className="text-sm font-bold uppercase tracking-wider leading-none text-emerald-800 dark:text-white">
                          Key Takeaway
                        </h4>
                        <p className="mt-2 text-sm leading-[1.7] text-emerald-700 dark:text-white">
                          The project demonstrated that enterprise-scale automation systems can be migrated from consumption-based platforms to self-hosted infrastructure without disrupting business operations. The result was a more flexible automation ecosystem, lower operating costs, and greater control over mission-critical workflows.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : active ? (
                <>
                  {!loadError && (
                    <iframe
                      key={active.id}
                      src={active.url}
                      title={active.title}
                      onLoad={() => {
                        setLoading(false);
                        setLoadError(false);
                      }}
                      onError={() => {
                        setLoading(false);
                        setLoadError(true);
                      }}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="microphone; camera; autoplay; clipboard-write"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    />
                  )}
                  {loading && !loadError && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-slate-50/95 backdrop-blur-sm dark:bg-emerald-950/95">
                      <Loader2 className="h-8 w-8 animate-spin text-slate-900 dark:text-white" />
                      <div className="w-full max-w-sm px-6 text-center">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          Loading {active.title}
                        </div>
                        <div className="mt-1 font-mono text-xs text-slate-500 dark:text-white/80">
                          Establishing secure connection to {active.url}…
                        </div>
                        <div
                          role="progressbar"
                          aria-label={`Loading ${active.title}`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(progress)}
                          className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                        >
                          <div
                            className="h-full rounded-full bg-slate-900 transition-[width] duration-200 ease-out dark:bg-emerald-400"
                            style={{ width: `${Math.min(100, Math.max(4, progress))}%` }}
                          />
                        </div>
                        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/60">
                          {Math.round(Math.min(100, progress))}%
                        </div>
                      </div>
                    </div>
                  )}

                  {loadError && (
                    <div
                      role="alert"
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center"
                    >
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <div className="max-w-sm">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          Unable to embed {active.title}
                        </div>
                        <p className="mt-2 text-xs leading-[1.7] text-slate-600 dark:text-white">
                          This destination refused to load inside the preview frame — usually due to{" "}
                          <code className="font-mono">X-Frame-Options</code> or a{" "}
                          <code className="font-mono">frame-ancestors</code> policy. Open it in a new tab to view the
                          live system.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <a
                            href={active.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold leading-none tracking-wide text-white shadow-sm transition hover:bg-slate-800 dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-600"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open in new tab
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setLoadError(false);
                              setLoading(true);
                            }}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold leading-none tracking-wide text-slate-700 transition hover:bg-slate-50 dark:border-emerald-800 dark:bg-emerald-900 dark:text-white dark:hover:bg-emerald-800"
                          >
                            Retry
                          </button>
                        </div>
                        <div className="mt-3 truncate font-mono text-[10px] text-slate-500 dark:text-white">
                          {active.url}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 overflow-y-auto bg-white px-6 py-6 dark:bg-emerald-950">
                  <div className="mb-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider leading-none text-white dark:bg-emerald-700 dark:text-white">
                    Overview
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    Matt Martelli
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-white">
                    AI Systems Architect | Marketing Automation | Revenue Operations | Multi-Agent Systems
                  </p>
                  <p className="mt-3 text-sm leading-[1.7] text-slate-600 dark:text-white">
                    Welcome. This interactive presentation walks through the systems, tools, and case studies behind my work in automation, AI, and revenue operations. Select any card on the left to load its live demo or case study in this panel.
                  </p>

                  <h4 className="mt-6 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                    What you'll find here
                  </h4>
                  <ul className="mt-2 space-y-3 text-sm leading-[1.7] text-slate-700 dark:text-white">
                    {CARDS.map((card) => (
                      <li key={card.id} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-yellow-300" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {card.title}
                          </div>
                          <div className="text-slate-600 dark:text-white">
                            {card.solution}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-6 text-sm font-bold uppercase tracking-wider leading-none text-slate-900 dark:text-white">
                    How to use this panel
                  </h4>
                  <p className="mt-2 text-sm leading-[1.7] text-slate-600 dark:text-white">
                    Each card on the left has a button — "View Live …", "View case study", or "View recent blog article". Click any of them and the corresponding system or case study loads right here, replacing this overview. Click "View overview" any time to come back to this page.
                  </p>

                  <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-emerald-800/60 dark:bg-emerald-900/60">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white dark:bg-emerald-200 dark:text-emerald-950">
                        <Terminal className="h-4 w-4" />
                      </div>
                      <div className="text-xs text-slate-600 dark:text-white">
                        Tip: every system below is production-deployed. Try the live n8n engine, the Yelp leads dashboard, or read the most recent case studies.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
