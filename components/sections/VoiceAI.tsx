import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";

export function VoiceAI() {
  const { voice } = site;
  return (
    <section id="voice-ai" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading eyebrow="Production voice" title={voice.heading} sub={voice.copy} />

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap gap-2">
            {voice.platforms.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-baseline gap-2 rounded-md border border-line bg-surface-elevated/50 px-3 py-1.5"
                title={p.note}
              >
                <span className="font-mono text-xs text-ink">{p.name}</span>
                <span className="text-[10px] text-ink-faint">{p.note}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              Capabilities — select to explore
            </p>
            <Explorable items={voice.capabilities} ariaLabel="Voice AI capabilities" />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Link
            href="#proof-of-work"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan"
          >
            <ArrowDown size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            {voice.diagramRef}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
