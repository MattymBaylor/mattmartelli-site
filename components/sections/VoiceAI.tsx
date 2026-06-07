import Link from "next/link";
import { ArrowDown, Youtube } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";
import { LiteYouTube } from "@/components/ui/LiteYouTube";
import { StatCallout } from "@/components/ui/StatCallout";
import { Footnotes } from "@/components/ui/Footnotes";

export function VoiceAI() {
  const { voice } = site;
  return (
    <section id="voice-ai" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading eyebrow="Production voice" title={voice.heading} sub={voice.copy} />

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap gap-2">
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

        <Reveal delay={0.11}>
          <StatCallout value="38%" kind="owned" footnote={site.footnotes[3]}>
            automated appointment-confirmation calls cut cancellations — in a
            home-services workflow I built; the pattern fits any business that
            books appointments.
          </StatCallout>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                See it in action
              </p>
              <LiteYouTube
                id={site.meta.videoId}
                title="Never Miss Another Call: How AI Books Jobs While You Sleep"
              />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                Productized voice AI, in plain English
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The explainer that fronts my company&apos;s live voice-agent offering — the
                same architecture shown above, told as the business case: every call
                answered, qualified, booked, and followed up automatically.
              </p>
              <a
                href={site.meta.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
              >
                <Youtube size={16} className="text-accent-cyan" aria-hidden />
                More on {site.meta.youtubeLabel}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                Part of my channel — daily, plain-English AI briefings for business leaders.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Link
            href="#proof-of-work"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan"
          >
            <ArrowDown size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            {voice.diagramRef}
          </Link>
        </Reveal>

        <Footnotes numbers={[1, 3, 4, 5, 6]} />
      </div>
    </section>
  );
}
