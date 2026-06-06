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
      "I don't manage AI tools — I manage a team of AI agents. One instruction routes through an orchestrator to specialists who execute in parallel. Hover or tap any agent to see what it owns.",
    hint: "Hover or tap an agent",
    // The two roles that make the whole thing work — shown above the specialists.
    leadership: [
      {
        id: "jerry",
        name: "Jerry",
        role: "The Conductor",
        img: "/agents/jerry.png",
        duties:
          "The only agent I talk to directly. Jerry receives the request, understands intent, confirms scope, and decides what the job requires — then hands it off. He doesn't do the work himself; he decides who does. Nothing goes out without his quality check.",
      },
      {
        id: "devola",
        name: "Joe Devola",
        role: "Traffic Manager",
        img: "/agents/devola.png",
        duties:
          "The operations backbone. Devola breaks the job into discrete tasks, routes each to the right agent, manages sequencing (what runs first, what runs in parallel), and tracks completion. When everything's done and QA'd, he triggers the ping back to me.",
      },
    ],
    groups: [
      {
        label: "The Specialists — Execute in Parallel",
        agents: [
          {
            id: "elaine",
            name: "Elaine",
            role: "Content",
            img: "/agents/elaine.png",
            duties:
              "Blog posts, email sequences, social copy, landing pages, brand voice — all written content flows through Elaine.",
          },
          {
            id: "kramer",
            name: "Kramer",
            role: "Automation",
            img: "/agents/kramer.png",
            duties:
              "n8n workflows, webhook triggers, API integrations, system architecture — Kramer builds the pipes that connect everything.",
          },
          {
            id: "george",
            name: "George",
            role: "SEO & Efficiency",
            img: "/agents/george.png",
            duties:
              "Keyword research, competitive SEO, pricing models, cost analysis — George finds the angles and optimizes the numbers.",
          },
          {
            id: "puddy",
            name: "Puddy",
            role: "Research",
            img: "/agents/puddy.png",
            duties:
              "Market research, competitor deep-dives, industry analysis, client discovery — Puddy digs until there's nothing left to find.",
          },
          {
            id: "peterman",
            name: "Peterman",
            role: "Creative",
            img: "/agents/peterman.png",
            duties:
              "Visual concepts, mockups, design direction, video scripts, brand aesthetics — Peterman handles everything visual and creative.",
          },
          {
            id: "frank",
            name: "Frank",
            role: "Sales",
            img: "/agents/frank.png",
            duties:
              "Sales collateral, objection handlers, one-pagers, follow-up sequences, pitch decks — Frank closes the deal.",
          },
          {
            id: "newman",
            name: "Newman",
            role: "Watchdog",
            img: "/agents/newman.png",
            duties:
              "24/7 monitoring, failure alerts, system health checks, uptime tracking — Newman watches everything so nothing slips through.",
          },
          {
            id: "mickey",
            name: "Mickey",
            role: "QA",
            img: "/agents/mickey.png",
            duties:
              "Test calls, link checks, formatting reviews, edge-case testing — nothing ships until Mickey signs off on it.",
          },
          {
            id: "jackie",
            name: "Jackie",
            role: "Operations",
            img: "/agents/jackie.png",
            duties:
              "Structured reports, action items, operational formatting, compliance checks — Jackie makes sure everything is buttoned up.",
          },
        ],
      },
    ],
    footnote:
      "Jerry decides what needs to happen. Devola decides how it gets done and who does it. Between them, any request — from a quick question to a multi-week project — gets routed, executed, and delivered without me managing the middle.",
  },

  /**
   * examples — concrete proof the operating model does real work. Condensed
   * from the live "What This Actually Looks Like" section: one instruction in,
   * a coordinated team out. Shows range, not depth.
   */
  examples: {
    eyebrow: "Proof in Practice",
    heading: "What this actually looks like",
    intro:
      "Not one deep dive — the range. How many different kinds of work flow through the same system in a given week. One instruction in; a coordinated team out.",
    cards: [
      {
        tag: "Product Development",
        title: "“Build me a SaaS product”",
        request:
          "Come up with 10 SaaS ideas, research each, then fully develop the top three — mockups, social assets, landing copy, positioning, pricing. Present all three.",
        agents: "Puddy research · George pricing · Elaine copy · Peterman mockups · Kramer landing pages · Mickey QA",
      },
      {
        tag: "Content & Marketing",
        title: "“Launch a content campaign this week”",
        request:
          "A full content push for the new voice AI offering — blog post, LinkedIn carousel, three email sequences, a sales one-pager. Aligned, SEO-optimized, ready to publish.",
        agents: "Elaine all copy · George SEO · Peterman visuals · Frank sales one-pager · Mickey QA",
      },
      {
        tag: "Research & Intelligence",
        title: "“What are our competitors doing?”",
        request:
          "A competitive intelligence report — who's doing multi-agent voice AI, what they charge, where the gaps are, where we're stronger and where we're exposed.",
        agents: "Puddy deep-dive · George analysis · Elaine brief · Jackie report & action items",
      },
      {
        tag: "Automation & Systems",
        title: "“Automate this entire workflow”",
        request:
          "Every closed deal in HubSpot should trigger a welcome sequence, a Slack ping, an onboarding-board add, and a personalized video intro. Build the whole thing.",
        agents: "Kramer automation · Elaine sequence · Peterman video script · Newman monitoring · Mickey testing",
      },
      {
        tag: "Client Delivery",
        title: "“Set up a voice agent for a client”",
        request:
          "New client, a dental practice — a voice agent for appointment scheduling, insurance questions, and after-hours triage, on their existing CRM. Go.",
        agents: "Puddy research · Kramer integration · Elaine scripts · Frank follow-up · Mickey test calls · Newman monitoring",
      },
    ],
    closer:
      "The complexity of the request doesn't change the process. Jerry confirms scope, Devola routes, the specialists execute, and I get a ping when it's done. The same architecture I run my own company on is the one each client gets — battle-tested internally, purpose-built per client.",
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
