import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";

const HIGHLIGHT_IDS = ["voice-ecosystem", "revenue-recovery", "seinfeld-hq"] as const;

const RESULTS: Record<(typeof HIGHLIGHT_IDS)[number], string> = {
  "voice-ecosystem": "Missed calls → qualified, scheduled revenue",
  "revenue-recovery": "Speed-to-lead — first responder wins",
  "seinfeld-hq": "Multi-agent OS that runs a real company",
};

export function ProofHighlights() {
  const items = HIGHLIGHT_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section id="proof" className="section border-t border-line/60 bg-surface/20">
      <div className="container-x">
        <p className="eyebrow mb-3">Proof of work</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Three systems that show how I build</h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
          Business outcomes first. Each project below opens to the full story, architecture, and
          live demos in the portfolio section.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {items.map((project, i) => (
            <div key={project.id} className="relative">
              {/* Soft ambient halo — separates cards from the section background */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,211,238,0.20)_0%,rgba(99,102,241,0.10)_42%,transparent_72%)] opacity-95 blur-md"
              />
              <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line/90 bg-surface-elevated/85 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/35 hover:shadow-lift-hover">
              <div className="relative aspect-[16/10] border-b border-line">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute left-3 top-3 rounded-md bg-night/80 px-2 py-1 font-mono text-[10px] text-accent-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {project.flagship && (
                  <span className="absolute right-3 top-3 rounded-md bg-night/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-warm">
                    Flagship
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold text-ink">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{project.outcome}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-warm">
                  {RESULTS[project.id as keyof typeof RESULTS]}
                </p>
                {project.link && (
                  <a
                    href={project.link.href}
                    target={project.link.href.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-cyan transition-colors hover:text-ink"
                  >
                    {project.link.label}
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                )}
              </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-ink"
          >
            View full project library
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}