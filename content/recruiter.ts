/**
 * recruiter.ts — content for the /recruiter fast-path page and the
 * homepage Recruiter summary. Optimized to be read in under 60 seconds.
 */

export const recruiter = {
  heading: "For hiring managers who want the highlights",
  sub: "Everything that matters in under 60 seconds.",

  location: "Naples, FL · Remote",
  availability: "Open to senior IC, architect/lead, or consulting engagements",

  targetRoles: [
    "Forward Deployed Engineer",
    "Founding Applied AI Engineer",
    "AI Agent Engineer",
    "Senior AI Engineer",
    "AI Systems Architect",
    "Revenue Operations & Systems Leader",
    "Marketing Automation Leader",
    "Customer Journey Infrastructure Owner",
    "Lifecycle Marketing & Automation Executive",
  ],

  // Field-note video — sits between Target Roles and the flagship card.
  fieldNote: {
    eyebrow: "Field Note Nº 01 · Game Theory",
    title: "Is your architecture Battle Tested?",
    description: [
      "Before AI agents can be trusted, someone has to watch them. Most companies are racing to deploy AI. Far fewer are asking a harder question: Who audits the robots? This field note is the opening paper in my ongoing research into production AI governance, reward engineering, and agent reliability. It explains why the most dangerous AI failures rarely look like dramatic crashes—they quietly pass health checks while drifting farther from the outcomes they were designed to produce.",
      "The ideas in this paper aren't theoretical. They're the same principles I use when designing production AI systems for enterprise organizations: adversarial testing, independent verification, continuous observability, and reward engineering that encourages truth instead of good-looking metrics. If you're hiring someone to build AI that can be trusted in production—not just impressive demos—this is the best place to start.",
      "Watch the 100-second field note below to see how I pressure-test AI systems before they ship.",
    ],
    videoTitle: "The Battle for Your Company's Profitability — Field Notes Nº 01, Game Theory",
    youtubeId: "X5q5sgkwMP4",
  },

  flagship: {
    title: "A Multi-Agent Company, Cast as Seinfeld",
    description:
      "This is the real operating system that runs my own company — and the clearest proof of how I make complex AI legible. Every specialized agent (planner, router, specialists, critic, memory) is cast as a Seinfeld character with a defined job. The casting is the actual innovation, not set dressing: multi-agent architecture is abstract and easy to tune out, but a familiar ensemble makes it instantly clear who does what and why — for engineers and executives alike. That's why the case study shows a cast of characters instead of boxes labeled \"Agent 1\": they run real workflows end to end — lead capture, qualification, follow-up, QA, and human handoffs.",
    caseStudy: { label: "Read the Case Study", href: "/seinfeld-hq" },
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
  },

  // Interactive, full-screen playbook (its own route at /playbook).
  playbook: {
    eyebrow: "Interactive",
    title: "The Strategic Alignment Playbook",
    description:
      "A live, two-pane walkthrough of my production systems. Pick any project on the left and its live demo or full case study loads in the panel beside it — the Zapier-to-n8n migration, the real-time operations dashboard, voice AI agents, the multi-agent operating system, and customer-journey automation, all in one interactive view.",
    cta: { label: "Launch the Interactive Playbook", href: "/playbook" },
  },

  executiveSummary:
    "AI Automation Architect and Marketing Automation Architect — 25 years in marketing, the last 15+ building AI and automation systems at the intersection of technology, operations, and customer experience. I design and build production AI systems — voice agents, multi-agent workflows, CRM and lifecycle automation — that connect data, automation, and human teams to deliver measurable business outcomes. I'm framework-agnostic by design: the system and the result come first, the tooling follows.",

  resume: {
    label: "Download Résumé (PDF)",
    href: "/matt_martelli_resume.pdf",
    filename: "matt_martelli_resume.pdf",
  },

  experience: [
    {
      company: "growthmindset.ai",
      role: "Founder & AI Systems Architect",
      dates: "2023–Present",
      note: "Production voice AI, multi-agent operating systems, and revenue automation — designed, built, and shipped as the growthmindset.ai platform.",
    },
    {
      company: "Home Genius Exteriors",
      role: "AI Integration Strategist",
      dates: "2025–2026",
      note: "Enterprise AI and automation across recruiting, sales, customer experience, and operations — production voice agents, multi-agent workflows, and a zero-downtime Zapier-to-n8n migration.",
    },
    {
      company: "Expo Home Improvement",
      role: "Marketing Automation Specialist | Business Analyst",
      dates: "2020–2025",
      note: "Lifecycle, CRM, and speed-to-lead automation on HubSpot + Salesforce.",
    },
    {
      company: "Flywheel360",
      role: "Co-Founder & Chief Marketing Officer",
      dates: "2010–2020",
      note: "MarTech and automation strategy for clients up to Fortune 400/500.",
    },
    {
      company: "Cambium Learning Group",
      role: "Email Marketing Manager | Senior Copywriter",
      dates: "2007–2010",
      note: "First-of-its-kind personalization pilot that drove $3.1M in six months.",
    },
  ],

  accomplishments: [
    "Generate $750K/month in attributed pipeline through AI-driven initiatives and campaigns.",
    "Drove $3.1M in new revenue within six months with a first-of-its-kind personalization pilot.",
    "Saved $90K+/year by re-architecting enterprise automation from Zapier to self-hosted n8n — with zero downtime.",
    "Led CRM and lifecycle transformations across databases of 500,000+ records, with TCPA/CAN-SPAM governance.",
    "Advised Fortune 400/500 organizations on automation architecture; co-founder and one of the First 100 HubSpot Partners.",
    "Designed and deployed production AI voice agents and multi-agent systems (Claude, OpenClaw, CrewAI) that run real workflows 24/7.",
  ],

  expertise: [
    "AI Automation",
    "Agentic Systems",
    "Multi-Agent Architecture",
    "Voice AI",
    "Marketing Operations",
    "CRM Architecture",
    "Workflow Automation",
    "Revenue Operations",
  ],

  // Quantified impact for the recruiter right-rail "By the numbers" card.
  byNumbers: [
    { value: "25 yrs", label: "Marketing — last 15+ in AI & automation" },
    { value: "$90K+/yr", label: "Saved via a zero-downtime Zapier-to-n8n migration" },
    { value: "$750K+/mo", label: "Attributed pipeline from lifecycle automation" },
    { value: "500K+", label: "CRM records architected and kept compliant" },
  ],

  // Condensed featured projects (full versions live in projects.ts).
  featured: [
    {
      title: "Multi-Agent Command Center",
      line: "The system that runs my own company — every agent cast as a Seinfeld character so a complex orchestration reads like an ensemble, not a wiring diagram.",
      points: [
        "Each agent is a named Seinfeld character with one clear job",
        "Planner, router, specialists, critic, and memory, coordinated as a cast",
        "Runs real workflows end to end — humans in the loop where judgment matters",
      ],
      result:
        "Proof a multi-agent system can run real workflows end to end — and stay legible to everyone.",
    },
    {
      title: "AI Voice Agent Ecosystem",
      line: "Recovers the revenue that leaks after hours — missed calls answered, qualified, and booked before the lead goes cold.",
      points: [
        "Answers, qualifies, and books 24/7 — including after hours",
        "Connects voice to CRM, scheduling, and follow-up",
        "Turns missed and after-hours calls into booked revenue",
      ],
      result: "The revenue-recovery layer most businesses leak the most through.",
    },
    {
      title: "Revenue Recovery Platform",
      line: "Automation that reclaims missed calls, after-hours inquiries, and delayed follow-up.",
      points: [
        "Detects missed calls, abandoned forms, stalled deals",
        "Re-engages automatically before the lead goes cold",
        "Hands warm, context-rich leads back to the team",
      ],
      result: "Built around speed-to-lead: first responder wins the deal.",
    },
    {
      title: "Marketing Automation Transformation",
      line: "Enterprise CRM and lifecycle programs driving measurable, attributable pipeline.",
      points: [
        "Enterprise CRM + lifecycle programs across the funnel",
        "Lead scoring, segmentation, revenue attribution",
        "Turns fragmented data into measurable, attributable pipeline",
      ],
      result: "25 years of marketing-ops depth, applied as a system.",
    },
    {
      title: "Interactive Operations Dashboard",
      line: "A live, single-pane command center unifying dashboards, agents, and workflows — built and deployed.",
      points: [
        "Single pane unifying dashboards, agents, and workflows",
        "Live status the operating team actually uses",
        "Built front-end-first for non-technical clients",
      ],
      result: "Clarity instead of complexity — built and deployed.",
    },
  ],

  testimonial: {
    quote:
      "Matt is a visionary, yet has his eye on the present. His ideas and creativity are at the pinnacle of his field. I often ask Matt his opinions in business needs outside of his scope, knowing that he will produce an option I would never think of.",
    name: "Kelly Clark",
    title: "Sr. Business Development Manager, ACS Group",
  },

  thoughtLeadership: {
    line: "I also publish The 60-Second AI Brief on YouTube and co-host The Matt & Maya Show — linked in the site footer, not part of the hiring evaluation.",
    youtube: { label: "The 60-Second AI Brief", href: "https://www.youtube.com/@matt_martelli" },
    podcast: { label: "The Matt & Maya Show", href: "https://mattandmayashow.com" },
  },

  closingCta: {
    heading: "Tell me about the role",
    sub: "Email or a text reaches me fastest — give me the business problem and I'll tell you how I'd architect the system that solves it.",
    label: "Email Matt",
  },

  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/mattmartelli/" },
    youtube: { label: "YouTube", href: "https://www.youtube.com/@matt_martelli" },
    email: { label: "Email", href: "mailto:mattmartelli@mac.com" },
    website: { label: "Website", href: "https://growthmindset.ai" },
  },
} as const;
