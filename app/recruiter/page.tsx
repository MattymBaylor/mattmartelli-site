import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Check,
  Mail,
  Linkedin,
  ArrowUpRight,
  Play,
  Github,
  Star,
} from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Recruiter Fast Path",
  description:
    "Matt Martelli — executive summary, accomplishments, and featured AI systems work, readable in under 60 seconds.",
  alternates: { canonical: "/recruiter" },
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

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={recruiter.resume.href}
              download="Matt_Martelli_Resume.pdf"
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

        {/* Featured Flagship Project */}
        <section
          aria-labelledby="flagship"
          className="mt-8 rounded-2xl border border-accent-cyan/30 bg-surface-elevated/60 p-6 shadow-glow sm:p-8"
        >
          <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
            <Star size={11} aria-hidden /> Featured Flagship Project
          </p>
          <h2 id="flagship" className="font-display text-2xl font-semibold sm:text-3xl">
            {recruiter.flagship.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {recruiter.flagship.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={recruiter.flagship.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
            >
              <Play size={15} aria-hidden /> {recruiter.flagship.demo.label}
            </a>
            <a
              href={recruiter.flagship.repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              <Github size={15} aria-hidden /> {recruiter.flagship.repo.label}
            </a>
            <Link
              href={recruiter.flagship.caseStudy.href}
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
            >
              {recruiter.flagship.caseStudy.label}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
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

            <section aria-labelledby="featured">
              <h2 id="featured" className="text-xl font-semibold">
                Featured projects
              </h2>
              <ul className="mt-4 space-y-4">
                {recruiter.featured.map((f) => (
                  <li key={f.title} className="surface-card p-4">
                    <p className="font-display font-semibold text-ink">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.line}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/#projects"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan"
              >
                Explore the interactive versions <ArrowUpRight size={14} aria-hidden />
              </Link>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
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
              </div>
            </div>

            <p className="text-xs leading-relaxed text-ink-faint">
              {site.contact.closingStatement}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
