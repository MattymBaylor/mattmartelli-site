"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const FEATURED_IDS = ["voice-ecosystem", "revenue-recovery", "viral-video-workflow"] as const;

const TAGS: Record<(typeof FEATURED_IDS)[number], string[]> = {
  "voice-ecosystem": ["Voice AI", "Lead Qualification", "CRM"],
  "revenue-recovery": ["Speed-to-Lead", "Automation", "RevOps"],
  "viral-video-workflow": ["Content Automation", "Multi-Platform", "n8n"],
};

const BADGES: Record<(typeof FEATURED_IDS)[number], string> = {
  "voice-ecosystem": "Never miss a call",
  "revenue-recovery": "Hours → seconds",
  "viral-video-workflow": "One message → four platforms",
};

export function SelectedWork() {
  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const { selectedWork } = site;

  return (
    <section id="selected-work" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow={selectedWork.eyebrow}
          title={selectedWork.heading}
          sub={selectedWork.sub}
        />

        <div className="mt-12 flex flex-col gap-8">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article className="group overflow-hidden rounded-2xl border border-line bg-surface-elevated/60 transition-colors hover:border-accent-cyan/30">
                <div className="grid lg:grid-cols-[1.15fr_1fr]">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line lg:border-b-0 lg:border-r">
                    {project.image.src && (
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={project.image.width}
                        height={project.image.height}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-md bg-night/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-md bg-night/80 px-2.5 py-1 font-mono text-[10px] text-ink-muted backdrop-blur-sm">
                        {BADGES[project.id as keyof typeof BADGES]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      {TAGS[project.id as keyof typeof TAGS]?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {project.outcome}
                    </p>
                    {project.link && (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-ink"
                      >
                        Explore system
                        <ArrowUpRight size={15} aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={selectedWork.cta.href}
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            {selectedWork.cta.label}
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}