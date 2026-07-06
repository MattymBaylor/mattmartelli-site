/**
 * projects.ts — the single, unified list powering the Projects section.
 *
 * Five builder systems only. Thought leadership (YouTube, podcast) lives in
 * the site footer — not mixed into the project grid.
 */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectCallout {
  n: number;
  label: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: boolean;
}

export interface Project {
  id: string;
  title: string;
  flagship?: boolean;
  outcome: string;
  description: string;
  image: ProjectImage;
  callouts?: ProjectCallout[];
  flow?: string[];
  tech?: string[];
  skills?: string[];
  link?: ProjectLink;
}

export const projects: Project[] = [
  {
    id: "voice-ecosystem",
    title: "AI Voice Agent Ecosystem",
    outcome:
      "Turns missed and after-hours calls into qualified, scheduled, revenue-generating conversations.",
    description:
      "Voice AI systems that answer calls, qualify leads, schedule appointments, and recover revenue opportunities around the clock — connecting the voice layer to CRM, scheduling, and follow-up so no call goes to waste. Productized as a live offering: AI that answers the phone, qualifies the lead, and books the appointment before the caller hangs up. The same pattern applies to any business that books appointments — coaching, medical, B2B, field service.",
    image: {
      src: "/voice-ecosystem.png",
      alt: "Voice AI product landing: 'Every missed call is lost revenue' — AI that answers the phone, qualifies the lead, and books the job, with a call-flow diagram.",
      width: 1600,
      height: 1000,
    },
    flow: ["Call", "Voice Agent", "CRM", "Scheduler", "Follow-Up"],
    skills: ["Voice AI", "Realtime systems", "CRM integration", "Scheduling"],
    link: { label: "View live site", href: "https://growthmindset.ai" },
  },
  {
    id: "revenue-recovery",
    title: "Revenue Recovery Platform",
    outcome:
      "Recaptures revenue that normally leaks away — missed calls, after-hours inquiries, and slow follow-up.",
    description:
      "Automation that detects missed opportunities — missed calls, after-hours inquiries, and delayed follow-up — and re-engages them automatically to reclaim revenue that would otherwise be lost. Built around speed-to-lead: the first responder wins the deal, so the system responds in under 60 seconds, automatically.",
    image: {
      src: "/revenue-recovery.png",
      alt: "Speed-to-lead product: 'Your Leads Are Dying. Every Minute Costs You $47' with metric cards — 78% of jobs go to the first responder, 21x higher conversion under 5 minutes, 391% higher conversion when calling within one minute.",
      width: 1600,
      height: 1000,
    },
    flow: ["Detect", "Re-engage", "Qualify", "Recover"],
    skills: ["Workflow automation", "Revenue operations", "Event detection"],
    link: { label: "View live site", href: "https://speedlead-pi.vercel.app" },
  },
  {
    id: "client-dashboard",
    title: "Custom Client Performance Dashboard",
    outcome:
      "Gives a client a simple, visual way to see and explore their results — without ever touching a CLI or the technical layer underneath.",
    description:
      "A custom front-end I built for a client so they could see everything they care about in one place — no CLI, no config, no wading through technical tooling. An interactive marketing-performance dashboard built front-end-first: a single pane that surfaces the metrics operators actually watch day to day and renders them as a live, layered performance view rather than a static report. Delivery, click, response, bounce, and opt-out rates with trend deltas; a weekly performance chart layering every channel; a conversion funnel; and live campaign status — all in a dark, executive-grade UI with gradient data visualizations. Built for one client, but the pattern works for any business that wants clarity instead of complexity.",
    image: {
      src: "/yelp-dashboard.png",
      alt: "Interactive marketing dashboard: KPI cards for delivery, click, response, bounce and opt-out rates; a weekly performance area chart; a conversion funnel; and active campaign cards — dark UI with gradient data visualization.",
      width: 3668,
      height: 3181,
    },
    callouts: [
      { n: 1, label: "KPI cards: delivery, click, response, bounce, opt-out" },
      { n: 2, label: "Weekly performance chart layering every channel" },
      { n: 3, label: "Conversion funnel: Sent → Delivered → Clicked → Responded" },
      { n: 4, label: "Period toggles for fast time-range switching" },
      { n: 5, label: "Active campaigns with live status and counts" },
      { n: 6, label: "Dark, executive-grade UI with gradient data viz" },
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Interactive charting"],
    skills: ["Front-end engineering", "Data visualization", "Dashboard design", "Interactive UI"],
  },
  {
    id: "seinfeld-hq",
    title: "Multi-Agent Company Operating System",
    flagship: true,
    outcome:
      "A working demonstration that orchestration, routing, memory, and QA can run real workflows end to end — a system, not a prototype.",
    description:
      "A flagship case study in turning complex AI workflows into understandable business systems: agent orchestration, specialized worker agents, routing, memory, QA validation, and real-world workflow execution. It shows — rather than tells — how a multi-agent system divides a business problem, delegates to the right specialist, validates the work, and executes, with humans in the loop where it matters. Themed as a Seinfeld cast to make the org chart legible — but the theme is the wrapper; the architecture is the product.",
    image: {
      src: "/seinfeld-hq.png",
      alt: "GrowthMindset.ai feature: 'I Run My Whole Company on a Cast of Seinfeld Characters' — a multi-agent system named after Seinfeld characters, illustrated as a lineup of characters.",
      width: 1600,
      height: 1000,
    },
    flow: ["Router", "Worker Agents", "Memory", "QA Validation", "Execution"],
    link: {
      label: "View the case study",
      href: "/seinfeld-hq",
    },
    skills: [
      "Agent orchestration",
      "Multi-agent architecture",
      "Workflow design",
      "State management",
      "Tool integration",
      "Human-in-the-loop systems",
    ],
  },
  {
    id: "viral-video-workflow",
    title: "AI Viral Video Workflow",
    outcome:
      "Turns one message into a finished short-form video published across four platforms — fully hands-off.",
    description:
      "Drop a video idea into Telegram and the system writes the script, generates the visuals and video, captions it, and publishes a finished short-form video across TikTok, YouTube, LinkedIn, and X — then logs every result. A complete content engine built in n8n that turns a single message into multi-platform output, with NanoBanana and VEO3 doing the heavy creative lifting and Blotato handling distribution.",
    image: {
      src: "/workflow-viral-video.png",
      alt: "n8n workflow canvas: an idea from Telegram flows through AI script generation, image and video creation with NanoBanana and VEO3, caption rewriting, and multi-platform publishing via Blotato, with results logged to Google Sheets.",
      width: 3700,
      height: 1902,
    },
    callouts: [
      { n: 1, label: "Telegram receives video idea" },
      { n: 2, label: "AI agent generates video script" },
      { n: 3, label: "OpenAI Vision analyzes reference image" },
      { n: 4, label: "NanoBanana creates edited image" },
      { n: 5, label: "VEO3 generates video" },
      { n: 6, label: "GPT-4o rewrites caption" },
      { n: 7, label: "Blotato publishes to TikTok, YouTube, LinkedIn, and X" },
      { n: 8, label: "Google Sheets logs status and results" },
    ],
    tech: [
      "n8n",
      "Telegram",
      "OpenAI",
      "GPT-4o",
      "OpenAI Vision",
      "NanoBanana",
      "VEO3",
      "Blotato",
      "Google Sheets",
      "Google Drive",
    ],
    link: {
      label: "View Live n8n Workflow",
      href: "https://n8n.growthmindsetai.tech/workflow/CwIi4IELhYQA2zyJ",
    },
  },
];