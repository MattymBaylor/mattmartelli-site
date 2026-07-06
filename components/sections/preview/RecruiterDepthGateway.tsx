import Link from "next/link";
import { ArrowUpRight, Layers, PlayCircle, BookOpen } from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { recruiterFirst } from "@/content/recruiter-first";

const depthLinks = [
  {
    icon: Layers,
    label: "Interactive playbook",
    desc: "Live demos and case studies in one view",
    href: recruiter.playbook.cta.href,
  },
  {
    icon: PlayCircle,
    label: "Flagship case study",
    desc: "Multi-agent system that runs my company",
    href: recruiter.flagship.caseStudy.href,
  },
  {
    icon: BookOpen,
    label: "Tiger Team methodology",
    desc: "How I pressure-test AI before it ships",
    href: "/who-audits-the-robots",
  },
];

export function RecruiterDepthGateway() {
  return (
    <section className="section border-t border-line/60">
      <div className="container-x">
        <div className="rounded-2xl border border-line bg-surface-elevated/40 p-6 sm:p-8">
          <p className="eyebrow mb-3">Optional depth</p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Evaluators who want the full technical story
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
            {recruiterFirst.depthCta.sub}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {depthLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex flex-col rounded-xl border border-line bg-night/40 p-4 transition-colors hover:border-accent-cyan/35"
                >
                  <Icon size={18} className="text-accent-cyan" aria-hidden />
                  <span className="mt-3 font-display text-sm font-semibold text-ink group-hover:text-accent-cyan">
                    {link.label}
                  </span>
                  <span className="mt-1 text-xs text-ink-faint">{link.desc}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href={recruiterFirst.depthCta.href}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-ink"
          >
            {recruiterFirst.depthCta.label}
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}