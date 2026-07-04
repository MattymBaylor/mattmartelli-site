/**
 * orchestrationTools.ts — popup copy for the "supporting tooling layer" cards in
 * the Orchestration section. Kept here (not hardcoded in the component) so the
 * copy stays content-driven and easy to edit. Keys must match the tool names in
 * content/site.ts → orchestration.tools[].name.
 */
export const orchestrationToolBlurbs: Record<string, string> = {
  OpenClaw:
    "A local agent gateway that lets me run and coordinate a whole council of specialized agents from a single control point — the backbone of my personal AI operating system.",
  CrewAI:
    "A Python framework for role-based agent crews that hand work off to each other. I reach for it when a job needs a team of specialists rather than one model.",
  "OpenAI Agents":
    "OpenAI's agent runtime and tool-calling SDK. My pick when a workflow lives close to the OpenAI stack and needs dependable function calling.",
  "Microsoft Copilot Studio & Agent Framework":
    "Microsoft's enterprise agent stack. I use it when a client is standardized on Microsoft 365 and needs governed, in-tenant agents with SSO and audit trails.",
  "Anthropic Claude":
    "Claude for deep reasoning and reliable tool use — my default brain for agents that have to plan carefully, follow policy, and call tools without going off the rails.",
  "Google Gemini":
    "Gemini for multimodal, long-context work — pulling signal out of documents, images, and mixed media inside a larger pipeline.",
  "MCP Architectures":
    "The Model Context Protocol is the connective tissue between agents and the tools and data they touch — how I give any agent secure, uniform access to real systems.",
  "Custom Python Agent Systems":
    "When off-the-shelf frameworks get in the way, I build agents in plain Python for full control over state, retries, memory, and orchestration.",
  n8n:
    "Self-hosted n8n is my automation backbone. I migrated a 300,000+ task/month footprint onto it with zero downtime, saving over $90K a year.",
};
