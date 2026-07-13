import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";
import { StatCallout } from "@/components/ui/StatCallout";
import { Footnotes } from "@/components/ui/Footnotes";
import { CallVisualizer } from "@/components/ui/CallVisualizer";

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
          <div className="mt-12 mb-28 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:items-stretch">
            <div className="flex h-full flex-col">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                {voice.demo.eyebrow}
              </p>
              {/* Interactive call visualizer — plays a real recorded AI voice-agent
                  call with a loudness-driven waveform + synced transcript. Served as
                  a self-contained page from /public/voice. Wrapped in CallVisualizer
                  so the audio pauses when it scrolls off-screen or the tab is hidden. */}
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
                <CallVisualizer />
              </div>
            </div>
            <div className="flex flex-col justify-center lg:py-4">
              <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl lg:text-[1.65rem]">
                {voice.demo.headline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                {voice.demo.craft}
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                {voice.demo.stackLead}
              </p>
              <ul className="mt-3 space-y-2">
                {voice.demo.stackItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base leading-relaxed text-ink-muted"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/60"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                {voice.demo.stackClose}
              </p>
              <p className="mt-8 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-cyan">
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
