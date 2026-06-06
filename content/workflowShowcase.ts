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
    title: "Retell Voice AI — inbound call handling & appointment booking",
    summary:
      "A production voice agent answers every inbound call, understands intent, qualifies the caller, and books appointments against live availability — then hands a warm, fully-briefed opportunity to the team. 24/7 coverage that converts calls instead of losing them to voicemail.",
    image: {
      // Temporary placeholder image — swap for the real Retell screenshot.
      src: "/workflow-viral-video.png",
      alt: "Placeholder image — a Retell Voice AI call-handling diagram will be added here.",
      width: 3700,
      height: 1902,
      placeholder: true,
    },
    callouts: [
      { n: 1, label: "Inbound caller dials in (any hour)" },
      { n: 2, label: "Retell voice agent answers and understands intent" },
      { n: 3, label: "Agent qualifies the lead in real time" },
      { n: 4, label: "Live calendar checked; appointment booked" },
      { n: 5, label: "CRM updated with structured call data" },
      { n: 6, label: "SMS confirmation and reminders sent" },
      { n: 7, label: "Warm handoff to the human team" },
      { n: 8, label: "Outcome logged for reporting and attribution" },
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
    // No live link yet — add one when available.
  },
];
