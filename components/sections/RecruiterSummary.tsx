import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function RecruiterSummary() {
  return (
    <section
      id="recruiter"
      className="section border-t border-line/60 bg-surface/30"
      aria-labelledby="recruiter-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Recruiter Fast Path"
          title="For hiring managers who want the highlights"
          sub="The 60-second version. The full fast-path page has the résumé, accomplishments, and condensed projects."
          headingId="recruiter-heading"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="surface-card h-full p-6">
              <p className="eyebrow mb-3">Executive summary</p>
              <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                {recruiter.executiveSummary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {recruiter.expertise.map((e) => (
                  <span
                    key={e}
                    className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card flex h-full flex-col p-6">
              <p className="eyebrow mb-3">Selected accomplishments</p>
              <ul className="space-y-3">
                {recruiter.accomplishments.slice(0, 4).map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                    <span className="text-sm leading-relaxed text-ink-muted">{a}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/recruiter"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
              >
                Open the Recruiter Fast Path
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
