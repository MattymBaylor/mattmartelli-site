import { ArrowUpRight, ChevronRight, Star } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Showcases } from "@/components/sections/WorkflowShowcase";

function FlowMotif({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2" aria-hidden>
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-1">
          <span className="rounded border border-line bg-surface-raised/60 px-2 py-1 font-mono text-[10px] text-ink-muted">
            {s}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight size={12} className="text-accent-cyan/60" />
          )}
        </span>
      ))}
    </div>
  );
}

function LinkSlot({ project }: { project: Project }) {
  if (project.link) {
    return (
      <a
        href={project.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-indigo"
      >
        {project.link.label}
        <ArrowUpRight size={15} aria-hidden />
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint/50" aria-hidden />
      Live demo / repo link coming soon
    </span>
  );
}

function ProjectCard({ project, flagship }: { project: Project; flagship?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-xl border bg-surface-elevated/70 p-6 transition-all hover:-translate-y-1 hover:shadow-glow ${
        flagship ? "border-accent-cyan/40 shadow-glow" : "border-line hover:border-accent-cyan/40"
      }`}
    >
      {flagship && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-warm/40 bg-warm/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
          <Star size={11} aria-hidden /> Flagship demonstration
        </span>
      )}

      <h3 className={`font-display font-semibold ${flagship ? "text-2xl" : "text-lg"}`}>
        {project.title}
      </h3>

      {/* Business outcome leads */}
      <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">{project.outcome}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.description}</p>

      <div className="mt-5">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          Architecture
        </p>
        <FlowMotif steps={project.flow} />
      </div>

      {project.skills && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-line/70 px-2 py-1 text-[11px] text-ink-muted"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-line pt-4">
        <LinkSlot project={project} />
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Systems, not screenshots"
          sub="Each project leads with the business outcome it produced — and hints at the architecture that made it possible."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {flagship && (
            <Reveal className="lg:col-span-2">
              <ProjectCard project={flagship} flagship />
            </Reveal>
          )}
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {/* Screenshot-based work examples (n8n workflow, voice AI, etc.) */}
        <Showcases />
      </div>
    </section>
  );
}
