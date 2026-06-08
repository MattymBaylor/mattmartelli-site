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
    title: "Designing Multi-Agent Systems Businesses Actually Understand",
    description:
      "A flagship case study: how Matt Martelli turns complex AI workflows into understandable business systems — agent architecture, voice AI, automation, CRM integration, human handoffs, and measurable operating outcomes.",
  },

  links: {
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
  },

  hero: {
    eyebrow: "Flagship Case Study",
    headline: "Designing Multi-Agent Systems Businesses Actually Understand",
    subheadline:
      "A flagship case study showing how I turn complex AI workflows into understandable business systems — combining agent architecture, voice AI, automation, CRM integration, human handoffs, and measurable operating outcomes.",
    coreMessage: "The theme is optional. The architecture is the product.",
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
    quote: "Two leaders. Nine specialists. One QA gate. Every request routed, executed, and signed off before it ships.",
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
    hint: "Hover, tap, or use arrow keys to explore",
    // The two roles that make the whole thing work — shown above the specialists.
    leadership: [
      {
        id: "jerry",
        name: "Jerry",
        role: "The Conductor",
        img: "/agents/jerry.png",
        duties:
          "The only agent I talk to directly. Jerry receives the request, understands intent, confirms scope, and decides what the job requires — then hands it off. He doesn't do the work himself; he decides who does. Nothing goes out without his quality check.",
        points: [
          "Single entry point — the only agent I talk to",
          "Interprets intent, confirms scope, decides what's required",
          "Owns the final QA gate — nothing ships unchecked",
        ],
        proof: "One front door = a system you can reason about, not a prompt soup.",
      },
      {
        id: "devola",
        name: "Joe Devola",
        role: "Traffic Manager",
        img: "/agents/devola.png",
        duties:
          "The operations backbone. Devola breaks the job into discrete tasks, routes each to the right agent, manages sequencing (what runs first, what runs in parallel), and tracks completion. When everything's done and QA'd, he triggers the ping back to me.",
        points: [
          "Decomposes the job into discrete tasks",
          "Routes each to the right specialist, sequences parallel vs serial",
          "Tracks completion, triggers the ping-back",
        ],
        proof: "This is orchestration — the layer that makes multi-agent actually work.",
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
            points: [
              "Owns brand-voice consistency across every channel",
              "Works from Puddy's research, never a blank page",
              "Drafts → routes to Mickey (QA) before anything ships",
            ],
            proof: "Content as a pipeline stage with an owner, not an afterthought.",
          },
          {
            id: "kramer",
            name: "Kramer",
            role: "Automation",
            img: "/agents/kramer.png",
            duties:
              "n8n workflows, webhook triggers, API integrations, system architecture — Kramer builds the pipes that connect everything.",
            points: [
              "Builds the n8n workflows, webhooks, API integrations",
              "Connects the systems the other agents depend on",
              "Owns the 'pipes' so specialists stay focused",
            ],
            proof: "The integration layer is a role, not an accident.",
          },
          {
            id: "george",
            name: "George",
            role: "SEO & Efficiency",
            img: "/agents/george.png",
            duties:
              "Keyword research, competitive SEO, pricing models, cost analysis — George finds the angles and optimizes the numbers.",
            points: [
              "Keyword/competitive SEO + pricing and cost models",
              "Finds the angles and optimizes the numbers",
              "Feeds efficiency data back into decisions",
            ],
            proof: "Growth and unit economics, owned in one place.",
          },
          {
            id: "puddy",
            name: "Puddy",
            role: "Research",
            img: "/agents/puddy.png",
            duties:
              "Market research, competitor deep-dives, industry analysis, client discovery — Puddy digs until there's nothing left to find.",
            points: [
              "Market, competitor, and client-discovery deep-dives",
              "Verifies before it synthesizes",
              "Hands decision-ready inputs to Elaine/Frank",
            ],
            proof: "Upstream rigor is why downstream output is trustworthy.",
          },
          {
            id: "peterman",
            name: "Peterman",
            role: "Creative",
            img: "/agents/peterman.png",
            duties:
              "Visual concepts, mockups, design direction, video scripts, brand aesthetics — Peterman handles everything visual and creative.",
            points: [
              "Visual concepts, mockups, design direction, video scripts",
              "Owns brand aesthetics end to end",
              "Translates strategy into something people see",
            ],
            proof: "Creative as a defined function, not a freelance scramble.",
          },
          {
            id: "frank",
            name: "Frank",
            role: "Sales",
            img: "/agents/frank.png",
            duties:
              "Sales collateral, objection handlers, one-pagers, follow-up sequences, pitch decks — Frank closes the deal.",
            points: [
              "Collateral, objection handlers, one-pagers, follow-up sequences",
              "Turns research + content into closing assets",
              "Aligned to the pipeline, not generic decks",
            ],
            proof: "The revenue-facing output of the whole system.",
          },
          {
            id: "newman",
            name: "Newman",
            role: "Watchdog",
            img: "/agents/newman.png",
            duties:
              "24/7 monitoring, failure alerts, system health checks, uptime tracking — Newman watches everything so nothing slips through.",
            points: [
              "24/7 monitoring, failure alerts, uptime tracking",
              "Catches problems before humans notice",
              "Health checks across every agent",
            ],
            proof: "Observability is a first-class role — that's how you trust automation.",
          },
          {
            id: "mickey",
            name: "Mickey",
            role: "QA",
            img: "/agents/mickey.png",
            duties:
              "Test calls, link checks, formatting reviews, edge-case testing — nothing ships until Mickey signs off on it.",
            points: [
              "Test calls, link checks, formatting, edge-case testing",
              "Nothing ships until it signs off",
              "Independent of the agents producing the work",
            ],
            proof: "A real QA gate is the difference between a demo and a system.",
          },
          {
            id: "jackie",
            name: "Jackie",
            role: "Operations",
            img: "/agents/jackie.png",
            duties:
              "Structured reports, action items, operational formatting, compliance checks — Jackie makes sure everything is buttoned up.",
            points: [
              "Structured reports, action items, compliance checks",
              "Buttons up everything before delivery",
              "Keeps the operating record clean",
            ],
            proof: "Ops discipline is designed in, not bolted on.",
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
      "The complexity of the request doesn't change the process. Jerry confirms scope, Devola routes, the specialists execute, and I get a ping when it's done. This is the operating model I run my own company on — designed to re-skin for any team that needs the same routing, accountability, and human-in-the-loop discipline underneath.",
  },

  whyThisMatters: {
    eyebrow: "Why This Matters",
    heading: "Businesses don't need another chatbot",
    body: [
      "Most AI projects fail because they're built as isolated tools. A chatbot answers one question at a time; it doesn't move a workflow forward.",
      "Businesses need systems that route work, coordinate teams, enforce process, maintain context across handoffs, trigger follow-up, and drive measurable outcomes — not a smarter prompt box.",
      "This is what I design and ship: AI operating models that non-technical teams can actually understand, trust, debug, and improve.",
    ],
    emphasis: "Anyone can buy ChatGPT seats. Designing the operating model that turns AI into actual leverage is the work.",
  },

  architecture: {
    eyebrow: "Architecture",
    heading: "How every request flows",
    aboveLine: "Not a script. An operating model: 2 leadership agents, 9 specialist agents, one QA gate, and a single human in the loop.",
    belowLine: "Each layer makes the system easier to explain, easier to debug, and easier to scale.",
    layers: [
      { name: "Theme Layer", note: "The legible skin — naming and UX that make the system understandable" },
      { name: "Agent Orchestration", note: "Routes each request to the right specialist and sequences the work" },
      { name: "Specialized Agents", note: "Each owns one responsibility, with its own tools and memory" },
      { name: "Tools & APIs", note: "The capabilities agents call to actually get work done" },
      { name: "CRM / Scheduling / SMS / Voice", note: "The systems of record and channels the work touches" },
      { name: "Business Outcomes", note: "Booked jobs, recovered revenue, faster response, less manual work" },
    ],
    stack: {
      label: "Built with",
      items: [
        "n8n",
        "HubSpot",
        "Retell",
        "ElevenLabs",
        "OpenAI",
        "Anthropic",
        "Supabase",
        "Vercel",
      ],
    },
  },

  demo: {
    eyebrow: "Interactive Demo",
    heading: "Explore the Interactive Prototype",
    body: [
      "Click through the live presentation layer: specialized agents, visible roles, routing logic, and an interactive walk-through of how a request moves through the system.",
      "This is the proof-of-thinking layer — the part that makes complex orchestration visible to a non-engineer in under a minute.",
    ],
    previewSrc: "/seinfeld-demo.png",
    previewAlt:
      "Seinfeld HQ AI Command Center landing screen: a row of specialized agent characters and an 'Enter the Apartment' call to action.",
  },

  skins: {
    eyebrow: "One Architecture, Many Skins",
    heading: "The Theme Changes. The Operating Model Does Not.",
    body: "The theme is the glitter — an internal engagement layer that helps the team operating the system reason about it at a glance and actually enjoy using it. Customers never see the characters; they experience a professional system doing real work. The same architecture re-skins for any organization. What actually matters underneath never changes: role clarity, state management, routing, QA, handoffs, and measurable outcomes.",
    examples: [
      "Seinfeld",
      "Marvel",
      "The Office",
      "Star Wars",
      "Ocean's Eleven",
      "NFL / NBA Roster",
      "Your Own Departments",
      "Plain Job Titles",
    ],
    stat: {
      value: "23%",
      label:
        "the profitability gap Gallup found between the most-engaged teams and the least. The theme isn't decoration — it's how I make a complex system one a team actually wants to operate. Engagement is a performance multiplier, and naming each role after a character buys it cheaply.",
      footnote: "Gallup, State of the Global Workplace meta-analysis — 3.3M+ employees across 183,000+ teams.",
    },
  },

  hiringManager: {
    eyebrow: "For Hiring Managers",
    heading: "If You're a Hiring Manager",
    body: [
      "The Seinfeld theme is intentional, but it isn't the point — and it's an internal engagement layer. The cast keeps the team running the system oriented because the roles have memorable names they can hold in their head; customers experience a professional system doing real work and never see the wrapper.",
      "The same operating model re-skins cleanly to business departments, sales and service teams, or plain operational job titles. The branding changes. The orchestration — routing, specialists, QA gate, human-in-the-loop — doesn't.",
      "What you're evaluating here isn't the joke. You're evaluating my ability to design AI systems people can understand, adopt, debug, and operate.",
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
