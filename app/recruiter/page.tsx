import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Check,
  Mail,
  Linkedin,
  Youtube,
  Globe,
  ArrowUpRight,
  Star,
  Quote,
  PlayCircle,
} from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { site } from "@/content/site";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Capabilities } from "@/components/sections/Capabilities";
import { DeferredYouTubeEmbed } from "@/components/ui/DeferredYouTubeEmbed";

export const metadata: Metadata = {
  title: "Recruiter Fast Path",
  description:
    "Matt Martelli — executive summary, accomplishments, and featured AI systems work, readable in under 60 seconds.",
  alternates: { canonical: "/recruiter" },
  openGraph: {
    type: "profile",
    title: "Recruiter Fast Path · Matt Martelli",
    description:
      "Matt Martelli — executive summary, accomplishments, and featured AI systems work, readable in under 60 seconds.",
    url: "/recruiter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Fast Path · Matt Martelli",
    description:
      "Matt Martelli — executive summary, accomplishments, and featured AI systems work, readable in under 60 seconds.",
  },
};

export default function RecruiterPage() {
  return (
    <main id="main" className="min-h-screen">
      <div className="container-x py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent-cyan"
        >
          <ArrowLeft size={15} aria-hidden /> Back to the full site
        </Link>

        <header className="mt-8 border-b border-line pb-8">
          <p className="eyebrow mb-3">Recruiter Fast Path</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{recruiter.heading}</h1>
          <p className="mt-3 text-ink-muted">{recruiter.sub}</p>
          <p className="mt-2 text-sm text-ink-faint">
            {recruiter.location} · {recruiter.availability}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={recruiter.resume.href}
              download={recruiter.resume.filename}
              className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Download size={15} aria-hidden /> {recruiter.resume.label}
            </a>
            <a
              href={recruiter.links.email.href}
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              <Mail size={15} aria-hidden /> Email
            </a>
            <a
              href={recruiter.links.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              <Linkedin size={15} aria-hidden /> LinkedIn
            </a>
            <a
              href={recruiter.links.youtube.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              <Youtube size={15} aria-hidden /> YouTube
            </a>
            <a
              href={recruiter.links.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              <Globe size={15} aria-hidden /> Website
            </a>
          </div>
        </header>

        {/* Target Roles */}
        <section aria-labelledby="target-roles" className="mt-8">
          <h2 id="target-roles" className="eyebrow mb-3">
            Target Roles
          </h2>
          <ul className="flex flex-wrap gap-2">
            {recruiter.targetRoles.map((r) => (
              <li
                key={r}
                className="rounded-md border border-line bg-surface-elevated/50 px-3 py-1.5 text-sm text-ink-muted"
              >
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Field Note — game theory, the eval-design methodology on film */}
        <section aria-labelledby="field-note" className="mt-8">
          <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
            <PlayCircle size={11} aria-hidden /> {recruiter.fieldNote.eyebrow}
          </p>
          <h2 id="field-note" className="font-display text-2xl font-semibold sm:text-3xl">
            {recruiter.fieldNote.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {recruiter.fieldNote.description}
          </p>
          <DeferredYouTubeEmbed
            id={recruiter.fieldNote.youtubeId}
            title={recruiter.fieldNote.videoTitle}
            hoverAudio
            className="mt-6"
          />
        </section>

        {/* Featured Flagship Project */}
        <section
          aria-labelledby="flagship"
          className="mt-8 overflow-hidden rounded-2xl border border-accent-cyan/30 bg-surface-elevated/60 p-6 shadow-glow sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="lg:flex-1">
              <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
                <Star size={11} aria-hidden /> Featured Flagship Project
              </p>
              <h2 id="flagship" className="font-display text-2xl font-semibold sm:text-3xl">
                {recruiter.flagship.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                {recruiter.flagship.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={recruiter.flagship.caseStudy.href}
                  className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                >
                  {recruiter.flagship.caseStudy.label}
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              </div>
            </div>
            <Image
              src="/flagship-seinfeld.png"
              alt="A multi-agent system cast as Seinfeld characters"
              width={520}
              height={620}
              className="mx-auto h-auto w-44 shrink-0 sm:w-52 lg:w-64"
              priority
            />
          </div>
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <section aria-labelledby="exec-summary">
              <h2 id="exec-summary" className="text-xl font-semibold">
                Executive summary
              </h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {recruiter.executiveSummary}
              </p>
            </section>

            <section aria-labelledby="experience">
              <h2 id="experience" className="text-xl font-semibold">
                Experience
              </h2>
              <ul className="mt-4 space-y-4">
                {recruiter.experience.map((e) => (
                  <li
                    key={e.company}
                    className="border-l-2 border-line pl-4 sm:flex sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <div>
                      <p className="font-medium">{e.company}</p>
                      <p className="text-sm text-ink-muted">{e.role}</p>
                      <p className="mt-0.5 text-sm text-ink-faint">{e.note}</p>
                    </div>
                    <p className="mt-1 shrink-0 font-mono text-xs text-ink-faint sm:mt-0">
                      {e.dates}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="accomplishments">
              <h2 id="accomplishments" className="text-xl font-semibold">
                Key accomplishments
              </h2>
              <ul className="mt-4 space-y-3">
                {recruiter.accomplishments.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                    <span className="leading-relaxed text-ink-muted">{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="capabilities">
              <h2 id="capabilities" className="text-xl font-semibold">
                Capabilities at a glance
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                What I do across marketing, AI, and revenue operations — and the proof behind each. Framework-agnostic by design; the system and the result come first.
              </p>
              <Capabilities />
            </section>

            <section aria-labelledby="featured">
              <h2 id="featured" className="text-xl font-semibold">
                Featured projects
              </h2>
              <FeaturedProjects />
              <Link
                href="/#projects"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan"
              >
                Explore the interactive versions <ArrowUpRight size={14} aria-hidden />
              </Link>
            </section>

            <section
              aria-labelledby="recruiter-cta"
              className="rounded-2xl border border-accent-cyan/30 bg-surface-elevated/60 p-6 shadow-glow"
            >
              <h2 id="recruiter-cta" className="text-lg font-semibold">
                {recruiter.closingCta.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {recruiter.closingCta.sub}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={recruiter.links.email.href}
                  className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <Mail size={15} aria-hidden /> {recruiter.closingCta.label}
                </a>
                <a
                  href={recruiter.links.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
                >
                  <Linkedin size={15} aria-hidden /> LinkedIn
                </a>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card flex items-center gap-4 p-5">
              <Image
                src="/headshot.jpg"
                alt="Matt Martelli"
                width={160}
                height={160}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top"
                priority
              />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-ink">Matt Martelli</p>
                <p className="mt-0.5 text-xs leading-snug text-ink-muted">
                  AI Automation Architect | Marketing Automation Architect
                </p>
              </div>
            </div>

            <div className="surface-card p-5">
              <p className="eyebrow mb-3">By the numbers</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-5">
                {recruiter.byNumbers.map((s) => (
                  <div key={s.label}>
                    <dt className="accent-text font-display text-2xl font-semibold">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-ink-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="surface-card p-5">
              <p className="eyebrow mb-3">Core expertise</p>
              <ul className="flex flex-wrap gap-2">
                {recruiter.expertise.map((e) => (
                  <li
                    key={e}
                    className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-5">
              <p className="eyebrow mb-3">Contact</p>
              <div className="space-y-2 text-sm">
                <a
                  href={recruiter.links.email.href}
                  className="flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Mail size={15} aria-hidden /> {site.meta.email}
                </a>
                <a
                  href={recruiter.links.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Linkedin size={15} aria-hidden /> LinkedIn
                </a>
                <a
                  href={recruiter.links.youtube.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Youtube size={15} aria-hidden /> YouTube
                </a>
                <a
                  href={recruiter.links.website.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Globe size={15} aria-hidden /> growthmindset.ai
                </a>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-ink-faint">
              {site.contact.closingStatement}
            </p>
          </aside>
        </div>

        {/* Testimonial */}
        <figure className="mt-12 rounded-2xl border border-line bg-surface-elevated/60 p-6 sm:p-8">
          <Quote size={22} className="text-accent-cyan/50" aria-hidden />
          <blockquote className="mt-3 max-w-3xl text-lg leading-relaxed text-ink sm:text-xl">
            {recruiter.testimonial.quote}
          </blockquote>
          <figcaption className="mt-4 text-sm">
            <span className="font-semibold text-ink">{recruiter.testimonial.name}</span>
            <span className="text-ink-muted"> · {recruiter.testimonial.title}</span>
          </figcaption>
        </figure>

        {/* Interactive Playbook — full-screen, two-pane walkthrough */}
        <section
          aria-labelledby="playbook-cta"
          className="mt-12 overflow-hidden rounded-2xl border border-accent-cyan/30 bg-surface-elevated/60 p-6 shadow-glow sm:p-8"
        >
          <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
            <PlayCircle size={11} aria-hidden /> {recruiter.playbook.eyebrow}
          </p>
          <h2 id="playbook-cta" className="font-display text-2xl font-semibold sm:text-3xl">
            {recruiter.playbook.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {recruiter.playbook.description}
          </p>
          <div className="mt-6">
            <Link
              href={recruiter.playbook.cta.href}
              className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
            >
              {recruiter.playbook.cta.label}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </section>

        <p className="mt-10 text-sm leading-relaxed text-ink-faint">
          {recruiter.thoughtLeadership.line}{" "}
          <a
            href={recruiter.thoughtLeadership.youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent-cyan"
          >
            {recruiter.thoughtLeadership.youtube.label}
          </a>
          {" · "}
          <a
            href={recruiter.thoughtLeadership.podcast.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent-cyan"
          >
            {recruiter.thoughtLeadership.podcast.label}
          </a>
        </p>
      </div>
    </main>
  );
}
