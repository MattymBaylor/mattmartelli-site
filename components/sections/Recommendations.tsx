import { Linkedin } from "lucide-react";
import { recruiter } from "@/content/recruiter";

const { recommendations } = recruiter;

export function Recommendations() {
  return (
    <section id="recommendations" className="section border-t border-line/60">
      <div className="container-x">
        <p className="eyebrow mb-3">Vouching</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">{recommendations.heading}</h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted">{recommendations.sub}</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {recommendations.quotes.map((rec) => (
            <figure
              key={rec.name}
              className="flex flex-col rounded-xl border border-line bg-surface-elevated/50 p-6 shadow-glow"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-ink">
                &ldquo;{rec.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line/60 pt-4">
                <p className="font-display font-semibold text-ink">{rec.name}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{rec.title}</p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                  {rec.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={recommendations.linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-ink"
        >
          <Linkedin size={16} aria-hidden />
          {recommendations.linkLabel}
        </a>
      </div>
    </section>
  );
}
