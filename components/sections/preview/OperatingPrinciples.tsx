import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function OperatingPrinciples() {
  const { operatingPrinciples } = site;

  return (
    <section id="principles" className="section border-t border-line/60 bg-surface/30">
      <div className="container-x">
        <SectionHeading
          eyebrow={operatingPrinciples.eyebrow}
          title={operatingPrinciples.heading}
          sub={operatingPrinciples.sub}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {operatingPrinciples.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06} as="article">
              <div className="h-full rounded-xl border border-line bg-surface-elevated/50 p-6">
                <span className="font-mono text-sm text-accent-cyan/80">{item.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}