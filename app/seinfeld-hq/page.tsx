import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Play,
  ChevronDown,
  Check,
  AlertTriangle,
  Boxes,
  Briefcase,
} from "lucide-react";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { AgentOrgChart } from "@/components/flow/AgentOrgChart";
import { caseStudy as cs } from "@/content/caseStudy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: cs.meta.title,
  description: cs.meta.description,
  alternates: { canonical: "/seinfeld-hq" },
  openGraph: {
    title: cs.meta.title,
    description: cs.meta.description,
    url: `${site.meta.url}/seinfeld-hq`,
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

export default function CaseStudyPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* 1. HERO */}
        <section className="relative isolate overflow-hidden border-b border-line">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-30" />
            <div className="absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]" />
          </div>
          <div className="container-x pb-14 pt-28 sm:pt-32">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent-cyan"
            >
              <ArrowLeft size={15} aria-hidden /> Back to projects
            </Link>
            <p className="eyebrow mt-8">{cs.hero.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {cs.hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {cs.hero.subheadline}
            </p>
            <p className="mt-8 max-w-2xl border-l-2 border-accent-cyan/60 pl-4 font-display text-xl text-ink sm:text-2xl">
              {cs.hero.coreMessage}
            </p>

            {/* My Role strip */}
            <div className="mt-9">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                My role
              </p>
              <ul className="flex flex-wrap gap-2">
                {cs.hero.roleStrip.map((r) => (
                  <li
                    key={r}
                    className="rounded-md border border-line bg-surface-elevated/50 px-3 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM */}
        <section className="section border-b border-line/60">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <div>
                <Eyebrow>{cs.problem.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.problem.heading}</h2>
                <div className="mt-5 space-y-4">
                  {cs.problem.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="surface-card p-6">
                <div className="flex items-center gap-2.5 text-warm">
                  <AlertTriangle size={18} aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-[0.16em]">Monolithic assistant</span>
                </div>
                <div className="mt-5 rounded-lg border border-dashed border-warm/40 bg-warm/[0.05] p-5 text-center">
                  <p className="font-display text-lg text-ink">One giant prompt</p>
                  <p className="mt-1 text-sm text-ink-faint">does everything</p>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {cs.problem.failModes.map((x) => (
                    <li key={x} className="flex items-center gap-2.5 text-sm text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-warm/70" aria-hidden /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. THE SOLUTION */}
        <section className="section border-b border-line/60 bg-surface/30">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.solution.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.solution.heading}</h2>
                <div className="mt-5 space-y-4">
                  {cs.solution.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Interactive agent org chart — the centerpiece */}
            <Reveal delay={0.08}>
              <div className="mt-10">
                <p className="eyebrow mb-2">{cs.orgChart.eyebrow}</p>
                <h3 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
                  {cs.orgChart.heading}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                  {cs.orgChart.intro}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6">
                <AgentOrgChart />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-3xl border-l-2 border-accent-cyan/60 pl-5 font-display text-2xl text-ink sm:text-3xl">
                {cs.solution.quote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4. WHY THIS MATTERS */}
        <section className="section border-b border-line/60">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.whyThisMatters.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.whyThisMatters.heading}</h2>
                <div className="mt-5 space-y-4">
                  {cs.whyThisMatters.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-3xl font-display text-xl text-ink sm:text-2xl">
                {cs.whyThisMatters.emphasis}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4b. PROOF IN PRACTICE — real examples */}
        <section className="section border-b border-line/60 bg-surface/30">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.examples.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.examples.heading}</h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                  {cs.examples.intro}
                </p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cs.examples.cards.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col rounded-xl border border-line bg-surface-elevated/70 p-5 transition-colors hover:border-accent-cyan/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan/80">
                      {c.tag}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.request}</p>
                    <p className="mt-auto pt-4 font-mono text-[11px] leading-relaxed text-ink-faint">
                      {c.agents}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink-muted">
                {cs.examples.closer}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 5. MY ROLE */}
        <section className="section border-b border-line/60 bg-surface/30">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.myRole.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.myRole.heading}</h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">{cs.myRole.intro}</p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cs.myRole.items.map((item, i) => (
                <Reveal key={item} delay={(i % 4) * 0.05}>
                  <div className="flex h-full items-start gap-2.5 rounded-xl border border-line bg-surface-elevated/70 p-4">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ARCHITECTURE */}
        <section className="section border-b border-line/60">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.architecture.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.architecture.heading}</h2>
                <p className="mt-5 font-display text-lg text-ink sm:text-xl">{cs.architecture.aboveLine}</p>
              </div>
            </Reveal>
            <div className="mx-auto mt-8 max-w-2xl">
              {cs.architecture.layers.map((layer, i) => (
                <Reveal key={layer.name} delay={i * 0.04}>
                  <div className="surface-card flex items-center gap-4 p-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent-gradient font-mono text-xs font-bold text-night">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-ink">{layer.name}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{layer.note}</p>
                    </div>
                  </div>
                  {i < cs.architecture.layers.length - 1 && (
                    <div className="flex h-6 items-center justify-center" aria-hidden>
                      <ChevronDown size={18} className="text-accent-cyan/60" />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
                {cs.architecture.belowLine}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 7. INTERACTIVE DEMO */}
        <section className="section border-b border-line/60 bg-surface/30">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.demo.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.demo.heading}</h2>
                <div className="mt-5 space-y-4">
                  {cs.demo.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={cs.links.demo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Launch the interactive demo in a new tab"
                className="group relative mt-8 block overflow-hidden rounded-2xl border border-line shadow-elevated"
              >
                <Image
                  src={cs.demo.previewSrc}
                  alt={cs.demo.previewAlt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 76rem, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 grid place-items-center bg-night/30 transition-colors group-hover:bg-night/45">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow">
                    <Play size={16} aria-hidden /> {cs.links.demo.label}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={cs.links.demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <Play size={16} aria-hidden /> {cs.links.demo.label}
                </a>
                <a
                  href={cs.links.repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
                >
                  <Github size={16} aria-hidden /> {cs.links.repo.label}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. ONE ARCHITECTURE, MANY SKINS */}
        <section className="section border-b border-line/60">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.skins.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.skins.heading}</h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">{cs.skins.body}</p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cs.skins.examples.map((ex, i) => (
                <Reveal key={ex} delay={(i % 3) * 0.05}>
                  <div className="flex items-center justify-between rounded-xl border border-line bg-surface-elevated/70 px-5 py-4">
                    <span className="font-display text-base font-medium text-ink">{ex}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">skin</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-dashed border-accent-cyan/30 bg-accent-cyan/[0.04] px-5 py-4 text-center">
                <Boxes size={16} className="shrink-0 text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink-muted">
                  Same orchestration underneath — only the branding changes.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9. IF YOU'RE A HIRING MANAGER */}
        <section className="section border-b border-line/60 bg-surface/30">
          <div className="container-x">
            <Reveal>
              <div className="surface-card border-accent-cyan/30 p-8 shadow-glow sm:p-10">
                <p className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan">
                  <Briefcase size={13} aria-hidden /> {cs.hiringManager.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.hiringManager.heading}</h2>
                <div className="mt-5 max-w-3xl space-y-4">
                  {cs.hiringManager.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 10. WHAT THIS PROJECT DEMONSTRATES */}
        <section className="section border-b border-line/60">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl">
                <Eyebrow>{cs.demonstrates.eyebrow}</Eyebrow>
                <h2 className="text-3xl font-semibold sm:text-4xl">{cs.demonstrates.heading}</h2>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cs.demonstrates.cards.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 0.06}>
                  <div className="flex h-full flex-col rounded-xl border border-line bg-surface-elevated/70 p-5 transition-colors hover:border-accent-cyan/40">
                    <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <div className="surface-card flex flex-col gap-6 p-8 sm:p-10">
                <h2 className="max-w-3xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
                  {cs.cta.heading}
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {cs.cta.buttons.map((b) => (
                    <Link
                      key={b.label}
                      href={b.href}
                      className={
                        b.primary
                          ? "inline-flex items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                          : "inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
                      }
                    >
                      {b.label}
                      {b.primary ? (
                        <ArrowUpRight size={15} aria-hidden />
                      ) : (
                        <ArrowRight size={15} aria-hidden />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
