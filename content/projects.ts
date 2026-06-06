/**
 * projects.ts — the single, unified list powering the Projects section.
 *
 * Every project uses the SAME shape: an image on the card, a one-line
 * `outcome`, and a README-style `description` shown in the click-to-open modal.
 * This keeps the whole section consistent.
 *
 * To add/replace a project image: drop the file in /public and set
 * `image.src` + `image.width`/`image.height` (pixel dimensions). Set
 * `image.placeholder: true` to render a "screenshot coming soon" panel until a
 * real image is ready. Optional: `callouts` (numbered "how it works"),
 * `flow` (short architecture labels), `tech`, `skills`, and a `link`.
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
  /** Marks a primary demonstration (subtle badge). */
  flagship?: boolean;
  /** One-line, business-outcome-first — shown on the card. */
  outcome: string;
  /** README-style description — shown in the modal. */
  description: string;
  image: ProjectImage;
  /** Numbered "how it works" steps (workflow/dashboard projects). */
  callouts?: ProjectCallout[];
  /** Short architecture labels (conceptual projects). */
  flow?: string[];
  tech?: string[];
  skills?: string[];
  link?: ProjectLink;
}

export const projects: Project[] = [
  {
    id: "yelp-dashboard",
    title: "Yelp Interactive Dashboard",
    outcome:
      "Gives clients a simple, visual way to see and manipulate their results — without ever touching the automation behind it.",
    description:
      "An interactive marketing-performance dashboard built front-end-first: a single pane that surfaces the metrics operators actually watch day to day and renders them as a live, layered performance view rather than a static report. Delivery, click, response, bounce, and opt-out rates with trend deltas; a weekly performance chart layering every channel; a conversion funnel; and live campaign status — all in a dark, executive-grade UI with gradient data visualizations. An example of production front-end development that hands the client clarity, not complexity.",
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
    link: {
      label: "View on GitHub",
      href: "https://github.com/MattymBaylor/yelp-interactive-dashboard",
    },
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
  {
    id: "retell-voice-agent",
    title: "Retell Voice AI — Revenue-Recovery Agent",
    outcome:
      "A production voice agent that recovers missed revenue — engaging callers, qualifying, booking, and handing off warm leads.",
    description:
      "A production Retell voice agent built to recover missed revenue: it engages callers naturally, captures intent and context in real time, qualifies the opportunity, books appointments against live availability, and hands a warm, fully-briefed lead to the team. This is the actual agent — its role prompt, dynamic call context, conversation logic, speech tuning, and live simulation environment.",
    image: {
      src: "/retell-voice-agent.png",
      alt: "Retell AI agent builder showing a production revenue-recovery voice agent — its role prompt, dynamic call context, speech settings, and real-time simulation environment.",
      width: 4112,
      height: 2336,
    },
    callouts: [
      { n: 1, label: "Voice agent opens the conversation naturally" },
      { n: 2, label: "Captures intent and context in real time" },
      { n: 3, label: "Qualifies the opportunity against the script" },
      { n: 4, label: "Books appointments against live availability" },
      { n: 5, label: "Logs structured call data to CRM" },
      { n: 6, label: "Triggers SMS confirmation and follow-up" },
      { n: 7, label: "Recovers missed-revenue opportunities" },
      { n: 8, label: "Warm handoff to the human team" },
    ],
    tech: ["Retell AI", "OpenAI Realtime", "Twilio", "n8n", "CRM", "Google Calendar"],
  },
  {
    id: "seinfeld-hq",
    title: "Seinfeld HQ: Multi-Agent Command Center",
    flagship: true,
    outcome:
      "A working demonstration that orchestration, routing, memory, and QA can run real workflows end to end — a system, not a prototype.",
    description:
      "An interactive AI environment demonstrating agent orchestration, specialized worker agents, routing, memory, QA validation, and real-world workflow execution. It shows — rather than tells — how a multi-agent system divides a business problem, delegates to the right specialist, validates the work, and executes, with humans in the loop where it matters.",
    image: {
      src: "/seinfeld-hq.png",
      alt: "GrowthMindset.ai feature: 'I Run My Whole Company on a Cast of Seinfeld Characters' — a multi-agent system named after Seinfeld characters, illustrated as a lineup of characters.",
      width: 1600,
      height: 1000,
    },
    flow: ["Router", "Worker Agents", "Memory", "QA Validation", "Execution"],
    link: {
      label: "Read the story",
      href: "https://growthmindset.ai/blog/seinfeld-ai-agents",
    },
    skills: [
      "Agent orchestration",
      "Multi-agent architecture",
      "Workflow design",
      "State management",
      "Tool integration",
      "Human-in-the-loop systems",
      "Technical storytelling",
      "UX design",
    ],
  },
  {
    id: "command-center",
    title: "Interactive Multi-Agent Command Center",
    outcome:
      "Shows decision-makers, in real time, how specialized agents divide and conquer a business problem.",
    description:
      "A fully interactive environment demonstrating how specialized AI agents collaborate to solve business problems — a coordinator decomposing the goal, specialists owning each stage, and a visible path from request to result.",
    image: {
      src: "",
      alt: "Interactive multi-agent command center — screenshot coming soon.",
      width: 1600,
      height: 1000,
      placeholder: true,
    },
    flow: ["Coordinator", "Specialists", "Collaboration", "Result"],
    skills: ["Agent collaboration", "Routing", "Orchestration", "Interactive UX"],
  },
  {
    id: "voice-ecosystem",
    title: "AI Voice Agent Ecosystem",
    outcome:
      "Turns missed and after-hours calls into qualified, scheduled, revenue-generating conversations.",
    description:
      "Voice AI systems that answer calls, qualify leads, schedule appointments, and recover revenue opportunities around the clock — connecting the voice layer to CRM, scheduling, and follow-up so no call goes to waste.",
    image: {
      src: "",
      alt: "AI voice agent ecosystem — screenshot coming soon.",
      width: 1600,
      height: 1000,
      placeholder: true,
    },
    flow: ["Call", "Voice Agent", "CRM", "Scheduler", "Follow-Up"],
    skills: ["Voice AI", "Realtime systems", "CRM integration", "Scheduling"],
  },
  {
    id: "revenue-recovery",
    title: "Revenue Recovery Platform",
    outcome:
      "Recaptures revenue that normally leaks away — missed calls, after-hours inquiries, and slow follow-up.",
    description:
      "Automation that detects missed opportunities — missed calls, after-hours inquiries, and delayed follow-up — and re-engages them automatically to reclaim revenue that would otherwise be lost.",
    image: {
      src: "",
      alt: "Revenue recovery platform — screenshot coming soon.",
      width: 1600,
      height: 1000,
      placeholder: true,
    },
    flow: ["Detect", "Re-engage", "Qualify", "Recover"],
    skills: ["Workflow automation", "Revenue operations", "Event detection"],
  },
  {
    id: "marketing-transformation",
    title: "Marketing Automation Transformation",
    outcome:
      "Large-scale lifecycle and CRM programs that turned fragmented data into measurable, attributable pipeline.",
    description:
      "Large-scale CRM and lifecycle marketing initiatives focused on lead management, customer journeys, reporting, and operational efficiency — turning fragmented data into a measurable, attributable pipeline across enterprise marketing and revenue operations.",
    image: {
      src: "",
      alt: "Marketing automation transformation — screenshot coming soon.",
      width: 1600,
      height: 1000,
      placeholder: true,
    },
    flow: ["Lead Mgmt", "Journeys", "Scoring", "Reporting", "Efficiency"],
    skills: ["Lifecycle marketing", "CRM architecture", "Lead scoring", "Revenue attribution"],
  },
];
