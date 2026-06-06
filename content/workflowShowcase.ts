/**
 * workflowShowcase.ts — content for the "Showcase" blocks in the Projects
 * section. These are presentation-only showcases (a large screenshot + numbered
 * callouts), NOT interactive React Flow diagrams.
 *
 * To add a showcase: append an object to the `showcases` array.
 * To swap a screenshot: replace the file in /public and update width/height to
 * match the new image's pixel dimensions.
 * `image.placeholder: true` renders a small "Placeholder" badge — use it while
 * the real screenshot is still pending.
 * Omit `live` to hide the live-link button.
 */

export interface ShowcaseCallout {
  n: number;
  label: string;
}

export interface Showcase {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number; placeholder?: boolean };
  callouts: ShowcaseCallout[];
  techStack: string[];
  live?: { label: string; href: string };
}

export const showcases: Showcase[] = [
  {
    id: "lead-results-dashboard",
    eyebrow: "Front-End Development",
    title: "Lead Results Dashboard — interactive front-end",
    summary:
      "An example of production front-end development: a custom, interactive dashboard that gives clients a simple, visual way to see and manipulate their results — without ever digging into the automation behind it. A dark, executive command surface that's searchable, responsive, and fast. Shipped as a real, deployed application, not a mockup — click through to the live build.",
    image: {
      src: "/ops-dashboard.png",
      alt: "A live interactive dashboard front-end: a dark, executive UI with a search bar and categorized cards grouped into sections, each showing live counts and status.",
      width: 1680,
      height: 1050,
    },
    callouts: [
      { n: 1, label: "Dark, executive-grade UI built for fast scanning" },
      { n: 2, label: "Searchable, filterable card directory" },
      { n: 3, label: "Clean information architecture across sections" },
      { n: 4, label: "Live counts and status indicators per card" },
      { n: 5, label: "Responsive, component-driven layout" },
      { n: 6, label: "Single-pane view of every workstream" },
      { n: 7, label: "Built for real operators, not a static report" },
      { n: 8, label: "Deployed and live — a working application" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    live: {
      label: "View live dashboard",
      href: "https://ops-dashboard-ten-woad.vercel.app",
    },
  },
  {
    id: "viral-video-workflow",
    eyebrow: "Featured Workflow",
    title:
      "Generate AI viral videos with NanoBanana & VEO3, shared on socials via Blotato",
    summary:
      "Drop a video idea into Telegram and the system writes the script, generates the visuals and video, captions it, and publishes a finished short-form video across TikTok, YouTube, LinkedIn, and X — then logs every result. A complete, hands-off content engine that turns one message into multi-platform output.",
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
    techStack: [
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
    live: {
      label: "View Live n8n Workflow",
      href: "https://n8n.growthmindsetai.tech/workflow/CwIi4IELhYQA2zyJ",
    },
  },
  {
    // PLACEHOLDER CASE STUDY — replace the image, copy, callouts, tech, and add
    // a `live` link once the real Retell details are ready.
    id: "retell-voice-agent",
    eyebrow: "Featured Example",
    title: "Retell Voice AI — revenue-recovery voice agent",
    summary:
      "A production Retell voice agent built to recover missed revenue — engaging callers naturally, qualifying the opportunity, booking appointments, and handing warm, briefed leads to the team. This is the actual agent: its prompt, conversation logic, speech tuning, and live simulation environment.",
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
    techStack: [
      "Retell AI",
      "OpenAI Realtime",
      "Twilio",
      "n8n",
      "CRM",
      "Google Calendar",
      "Google Sheets",
    ],
    // Add a `live` link here if a public demo URL becomes available.
  },
];
