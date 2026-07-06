import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";
import { StatCallout } from "@/components/ui/StatCallout";
import { Footnotes } from "@/components/ui/Footnotes";

export function VoiceAI() {
  const { voice } = site;
  return (
    <section id="voice-ai" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading eyebrow="Production Quality" title={voice.heading} sub={voice.copy} />

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
          <div className="mt-12 mb-28 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
            <div className="flex h-full flex-col">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                {voice.demo.eyebrow}
              </p>
              {/* Interactive call visualizer — plays a real recorded AI voice-agent
                  call with a loudness-driven waveform + synced transcript. Served as
                  a self-contained page from /public/voice. */}
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
                <iframe
                  src="/voice/call-visualizer.html?embed=1"
                  title="Interactive AI voice-agent call — play a real recorded outbound call"
                  className="pointer-events-auto absolute inset-0 h-full w-full border-0"
                  allow="autoplay"
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl lg:text-[1.65rem]">
                {voice.demo.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {voice.demo.craft}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {voice.demo.stack}
              </p>
              <p className="mt-6 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-cyan">
                <ArrowLeft size={18} aria-hidden className="shrink-0 animate-pulse" />
                {voice.demo.cta}
              </p>
            </div>
          </div>
        </Reveal>

        <Footnotes numbers={[1, 3, 4, 5, 6]} />
      </div>
    </section>
  );
}
