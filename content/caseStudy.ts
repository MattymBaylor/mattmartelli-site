/**
 * caseStudy.ts — content for the flagship case study page at /seinfeld-hq.
 *
 * Recruiter-focused: leads with architecture and business outcomes, not the
 * Seinfeld theme. Edit copy here; the page reads entirely from this file.
 */

export const caseStudy = {
  slug: "seinfeld-hq",
  meta: {
    title: "Designing Multi-Agent Systems Humans Actually Understand",
    description:
      "A flagship case study: how AI agents, voice AI, workflow automation, and orchestration combine into a multi-agent system people actually understand and use.",
  },

  links: {
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
    repo: {
      label: "View GitHub Repository",
      href: "https://github.com/MattymBaylor/gms-website-3.0-perplexity",
    },
  },

  hero: {
    eyebrow: "Flagship Case Study",
    headline: "Designing Multi-Agent Systems Humans Actually Understand",
    subheadline:
      "A real-world example of how AI agents, voice AI, workflow automation, and orchestration can be combined into a system people actually understand and use.",
    coreMessage: "The theme is optional. The architecture is the product.",
  },

  problem: {
    heading: "The Problem",
    body: [
      "One giant AI assistant sounds simple — until you have to run it. A single monolithic prompt trying to do everything becomes hard to maintain, risky to change, and difficult to scale.",
      "Every new capability competes for the same context. Failures are opaque. And no one on the team can see why the system did what it did — which means they can't trust it, debug it, or improve it.",
    ],
  },

  solution: {
    heading: "The Solution",
    body: [
      "Instead of one assistant that does everything, the work is split across specialized agents that each own a clear responsibility — routed by an orchestrator, checked by QA gates, and handed to a human when judgment is required.",
      "The theme is just a memorable way to make the org chart legible: each character is a role, each role is an agent. Strip the names away and what's left is a clean, inspectable operating model.",
    ],
    quote: "The characters are optional. The architecture is the product.",
  },

  demo: {
    heading: "Interactive Demo",
    note: "Explore the working system — specialized agents, routing, and real workflow execution. Opens in a new tab.",
    previewSrc: "/seinfeld-demo.png",
    previewAlt:
      "Seinfeld HQ AI Command Center landing screen: a row of specialized agent characters and an 'Enter the Apartment' call to action.",
  },

  architecture: {
    heading: "Architecture",
    intro: "Every request flows through the same layered system, top to bottom.",
    // Rendered as a vertical stack of connected layers.
    layers: [
      { name: "Theme Layer", note: "The legible skin — naming and UX that make the system understandable" },
      { name: "Agent Orchestration", note: "Routes each request to the right specialist and sequences the work" },
      { name: "Specialized Agents", note: "Each owns one responsibility, with its own tools and memory" },
      { name: "Tools & APIs", note: "The capabilities agents call to actually get work done" },
      { name: "CRM / Scheduling / SMS / Voice", note: "The systems of record and channels the work touches" },
      { name: "Business Outcomes", note: "Booked jobs, recovered revenue, faster response, less manual work" },
    ],
  },

  skins: {
    heading: "One Architecture, Many Skins",
    body: "The branding changes; the orchestration doesn't. The same multi-agent system runs underneath, whatever you name it.",
    examples: [
      "Seinfeld HQ",
      "Marvel HQ",
      "Sales Team",
      "Customer Service Team",
      "Recruiting Team",
      "Home Services Company",
    ],
  },

  demonstrates: {
    heading: "What This Demonstrates",
    cards: [
      "AI Strategy",
      "Multi-Agent Systems",
      "Voice AI",
      "Workflow Automation",
      "n8n",
      "CRM Architecture",
      "Revenue Operations",
      "Product Design",
      "Human-in-the-Loop Systems",
    ],
  },

  tech: {
    heading: "Technology",
    items: [
      "OpenAI",
      "Claude",
      "Gemini",
      "HubSpot",
      "Salesforce",
      "n8n",
      "APIs",
      "Voice Platforms",
      "Python",
    ],
  },

  cta: {
    heading: "Architecture that works for real businesses.",
    primary: { label: "View More Projects", href: "/#projects" },
    secondary: { label: "Contact Matt", href: "/#contact" },
  },
} as const;
