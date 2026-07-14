import Image from "next/image";
import { projects } from "@/content/projects";

const PROOF_IDS = ["voice-ecosystem", "revenue-recovery", "client-dashboard"] as const;

const RESULTS: Record<(typeof PROOF_IDS)[number], string> = {
  "voice-ecosystem": "Missed calls → qualified, scheduled revenue",
  "revenue-recovery": "Speed-to-lead automation — first responder wins",
  "client-dashboard": "Client-facing ops visibility without touching the CLI",
};

export function RecruiterProof() {
  const items = PROOF_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section className="section border-t border-line/60">
      <div className="container-x">
        <p className="eyebrow mb-3">Proof of work</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Three systems that show how I build</h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
          Business outcomes first — not screenshots for their own sake. Click through on the full site
          for architecture depth, demos, and case studies.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((project, i) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface-elevated/60"
            >
              {project.image.src && (
                <div className="relative aspect-[16/10] border-b border-line">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-night/80 px-2 py-1 font-mono text-[10px] text-accent-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold text-ink">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{project.outcome}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-warm">
                  {RESULTS[project.id as keyof typeof RESULTS]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}