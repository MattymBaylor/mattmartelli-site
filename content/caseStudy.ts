/**
 * caseStudy.ts — content for the flagship case study page at /seinfeld-hq.
 *
 * Recruiter-focused: leads with how Matt thinks, designs, and ships business AI
 * systems. The Seinfeld theme is the wrapper; the architecture is the product.
 * Edit copy here; the page reads entirely from this file.
 */

export const caseStudy = {
  slug: "seinfeld-hq",
  meta: {
    title: "Designing Multi-Agent Systems Humans Actually Understand",
    description:
      "A flagship case study: how Matt Martelli turns complex AI workflows into understandable business systems — agent architecture, voice AI, automation, CRM integration, human handoffs, and measurable operating outcomes.",
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
      "A flagship case study showing how I turn complex AI workflows into understandable business systems — combining agent architecture, voice AI, automation, CRM integration, human handoffs, and measurable operating outcomes.",
    coreMessage: "The theme is optional. The architecture is the product.",
    roleStrip: [
      "Solution Architecture",
      "Agent Design",
      "Workflow Orchestration",
      "Voice AI Design",
      "Prompt Engineering",
      "CRM Integration",
      "UX Strategy",
      "Deployment Planning",
    ],
  },

  problem: {
    heading: "One assistant can't do everything",
    eyebrow: "The Problem",
    body: [
      "One giant AI assistant sounds simple — until you have to run it. A single monolithic prompt trying to do everything becomes hard to maintain, risky to change, and difficult to scale.",
      "Every new capability competes for the same context. Failures are opaque. And no one on the team can see why the system did what it did — which means they can't trust it, debug it, or improve it.",
    ],
    failModes: ["Hard to maintain", "Risky to change", "Opaque failures", "Doesn't scale"],
  },

  solution: {
    heading: "Specialized agents, one orchestrator",
    eyebrow: "The Solution",
    body: [
      "Instead of one assistant that does everything, the work is split across specialized agents that each own a clear responsibility — routed by an orchestrator, checked by QA gates, and handed to a human when judgment is required.",
      "The theme is just a memorable way to make the org chart legible: each character is a role, each role is an agent. Strip the names away and what's left is a clean, inspectable operating model.",
    ],
    quote: "The characters are optional. The architecture is the product.",
  },

  /**
   * orgChart — the interactive centerpiece. The Seinfeld cast mapped to the
   * ~15-agent business operating model. Each character = one role = one clear
   * set of duties. `tier` drives the visual grouping (orchestrator → core
   * specialists → operations/customer → safeguards → bench).
   */
  orgChart: {
    eyebrow: "The Operating Model",
    heading: "Each character is a role. Each role is an agent.",
    intro:
      "Hover or tap any agent to see what it owns. Strip the names away and what's left is a clean, inspectable org chart: one orchestrator, specialized workers, real operations, and human-in-the-loop safeguards.",
    hint: "Hover or tap an agent",
    orchestrator: {
      id: "jerry",
      name: "Jerry",
      role: "Orchestrator / Supervisor",
      duties:
        "The connective tissue. Routes every request to the right specialist, sequences the work, catches anything that stalls, and stays the point of contact when a human needs to step in. The reason it's a system and not a pile of bots tripping over each other.",
    },
    groups: [
      {
        label: "Core Specialists",
        agents: [
          {
            id: "elaine",
            name: "Elaine",
            role: "Content & Social",
            duties:
              "Owns everything that goes out the door in words — blogs, posts, SEO copy, and the review request, sent at the right moment on the customer's preferred channel.",
          },
          {
            id: "george",
            name: "George",
            role: "Budget & Rankings",
            duties:
              "Watches every dollar and every keyword position. Conservative and analytical by design — flags budget and ranking issues before they cost you.",
          },
          {
            id: "kramer",
            name: "Kramer",
            role: "Automation Builder",
            duties:
              "The ideas-and-workflows agent, tuned to be exploratory. Builds the automations that connect the rest of the system together.",
          },
          {
            id: "puddy",
            name: "Puddy",
            role: "Data & Market Intel",
            duties:
              "Stares at the data. Surfaces the competitor intelligence and market trends the rest of the team acts on.",
          },
        ],
      },
      {
        label: "Operations & Customer",
        agents: [
          {
            id: "joe",
            name: "Joe",
            role: "Traffic Router",
            duties:
              "Sequences the follow-ups. A sale is never one call — it's a chain of them, and Joe makes sure they happen in the right order.",
          },
          {
            id: "whatley",
            name: "Whatley",
            role: "Operations",
            duties:
              "Keeps operations on schedule and runs the post-job satisfaction check — catching a small concern before it becomes a one-star review.",
          },
          {
            id: "leo",
            name: "Uncle Leo",
            role: "Customer Concierge",
            duties:
              "Answers the question every customer is secretly asking: where am I, and what's next? Sends proactive milestone updates on the exact channel the customer chose.",
          },
          {
            id: "frank",
            name: "Frank",
            role: "Sales & Referrals",
            duties:
              "Pushes hard on outreach and makes the referral ask with real money attached — then makes sure the credit actually gets applied.",
          },
          {
            id: "peterman",
            name: "J. Peterman",
            role: "Creative",
            duties:
              "Owns the creative voice — the distinctive, on-brand framing that makes the output feel human instead of generated.",
          },
        ],
      },
      {
        label: "Safeguards",
        agents: [
          {
            id: "mickey",
            name: "Mickey",
            role: "QA Gates",
            duties:
              "Small, fierce, and does not care about your feelings — only whether the step actually completed. Verifies each gate before the next stage is allowed to start.",
          },
          {
            id: "newman",
            name: "Newman",
            role: "Watchdog / Monitoring",
            duties:
              "Sees everything — uptime, error logs, broken links. Here, being the guy who notices every flaw is a feature.",
          },
          {
            id: "lloyd",
            name: "Lloyd Braun",
            role: "Compliance",
            duties:
              "Stays current on the rules — codes, regulations, and requirements that change constantly — and answers them live, pulling the latest version instead of stale training data.",
          },
        ],
      },
    ],
    footnote:
      "Plus a bench — Bania, Sue Ellen, and others — ready to take on roles as the operating model expands. The cast is the wrapper; single-responsibility agents, gated hand-offs, and a supervisor are the architecture.",
  },

  whyThisMatters: {
    eyebrow: "Why This Matters",
    heading: "Businesses don't need another chatbot",
    body: [
      "Most AI projects fail because they are built as isolated tools. Businesses do not need another chatbot.",
      "They need systems that can route work, coordinate teams, enforce process, maintain context, trigger follow-up, and drive measurable outcomes.",
      "This project demonstrates how complex AI architectures can be transformed into operating models that people actually understand, trust, and improve.",
    ],
    emphasis: "The Seinfeld theme is just the wrapper. The architecture underneath is the product.",
  },

  myRole: {
    eyebrow: "My Role",
    heading: "My Role",
    intro:
      "I designed this as a working example of how multi-agent systems can be made understandable for non-technical teams without watering down the architecture underneath.",
    items: [
      "Solution architecture",
      "Agent role design",
      "Workflow orchestration",
      "Prompt and behavior design",
      "QA gates and human handoffs",
      "CRM / automation thinking",
      "UX and presentation layer",
      "Business translation for non-technical stakeholders",
    ],
  },

  architecture: {
    eyebrow: "Architecture",
    heading: "How every request flows",
    aboveLine: "This is not a script. It is an operating model.",
    belowLine: "Each layer makes the system easier to explain, easier to debug, and easier to scale.",
    layers: [
      { name: "Theme Layer", note: "The legible skin — naming and UX that make the system understandable" },
      { name: "Agent Orchestration", note: "Routes each request to the right specialist and sequences the work" },
      { name: "Specialized Agents", note: "Each owns one responsibility, with its own tools and memory" },
      { name: "Tools & APIs", note: "The capabilities agents call to actually get work done" },
      { name: "CRM / Scheduling / SMS / Voice", note: "The systems of record and channels the work touches" },
      { name: "Business Outcomes", note: "Booked jobs, recovered revenue, faster response, less manual work" },
    ],
  },

  demo: {
    eyebrow: "Interactive Demo",
    heading: "Explore the Interactive Prototype",
    body: [
      "The demo shows the presentation layer of the system: specialized agents, visible roles, routing logic, and an interactive way to understand how the workflow works.",
      "This is not the final product. It is the proof-of-thinking layer — a way to make complex orchestration visible.",
    ],
    previewSrc: "/seinfeld-demo.png",
    previewAlt:
      "Seinfeld HQ AI Command Center landing screen: a row of specialized agent characters and an 'Enter the Apartment' call to action.",
  },

  skins: {
    eyebrow: "One Architecture, Many Skins",
    heading: "The Theme Changes. The Operating Model Does Not.",
    body: "The same architecture can be re-skinned for any organization. The important parts are role clarity, state management, routing, QA, handoffs, and measurable outcomes.",
    examples: [
      "Seinfeld HQ",
      "Marvel HQ",
      "Sales Team",
      "Customer Service Team",
      "Recruiting Team",
      "Home Services Company",
    ],
  },

  hiringManager: {
    eyebrow: "For Hiring Managers",
    heading: "If You're a Hiring Manager",
    body: [
      "The Seinfeld theme is intentional, but it is not the point. I have built similar frameworks using other themes, business departments, sales teams, service teams, and operational roles.",
      "The branding changes. The orchestration does not.",
      "What you are evaluating here is not the joke. You are evaluating my ability to design AI systems people can understand, adopt, debug, and operate.",
    ],
  },

  demonstrates: {
    eyebrow: "Proof of Work",
    heading: "What This Project Demonstrates",
    cards: [
      {
        title: "How I decompose complex business problems",
        body: "Breaking large, messy workflows into clear owners, responsibilities, and handoffs.",
      },
      {
        title: "How I design specialized AI agents",
        body: "Giving each agent a role, toolset, memory context, permissions, and success criteria.",
      },
      {
        title: "How I orchestrate workflows",
        body: "Routing work through the right sequence instead of relying on one giant prompt.",
      },
      {
        title: "How I connect AI to operations",
        body: "Designing systems that connect to CRM, scheduling, SMS, voice, reporting, and business workflows.",
      },
      {
        title: "How I build human-in-the-loop safeguards",
        body: "Knowing when automation should continue and when a person needs to step in.",
      },
      {
        title: "How I make technical systems usable",
        body: "Using storytelling, UX, and visual structure so teams can understand and adopt complex systems.",
      },
    ],
  },

  cta: {
    heading:
      "From voice AI to marketing automation to multi-agent systems, I design business architectures that connect AI, automation, and human teams into measurable outcomes.",
    buttons: [
      { label: "View More Projects", href: "/#projects", primary: false },
      { label: "Recruiter Fast Path", href: "/recruiter", primary: false },
      { label: "Contact Matt", href: "/#contact", primary: true },
    ],
  },
} as const;
