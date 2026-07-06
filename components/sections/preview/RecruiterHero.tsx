"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { recruiterFirst } from "@/content/recruiter-first";

export function RecruiterHero() {
  return (
    <section className="border-b border-line/60 pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[280px] lg:mx-0">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-elevated/60 p-1.5">
              <Image
                src="/headshot.jpg"
                alt="Matt Martelli"
                width={280}
                height={350}
                priority
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint lg:text-left">
              {recruiter.location}
            </p>
          </div>

          <div>
            <p className="eyebrow">{recruiterFirst.primaryRole}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Matt Martelli
            </h1>
            <p className="mt-2 font-display text-lg text-accent-cyan sm:text-xl">
              {recruiterFirst.secondaryRole}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {recruiterFirst.oneLiner}
            </p>
            <p className="mt-3 text-sm text-ink-faint">{recruiter.availability}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={recruiter.resume.href}
                download="Matt_Martelli_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Download size={16} aria-hidden />
                Download résumé
              </a>
              <a
                href={recruiter.links.email.href}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
              >
                <Mail size={16} aria-hidden />
                Email
              </a>
              <a
                href={recruiter.links.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50"
              >
                <Linkedin size={16} aria-hidden />
                LinkedIn
              </a>
              <Link
                href="/recruiter"
                className="inline-flex items-center gap-2 rounded-md border border-warm/30 bg-warm/10 px-5 py-3 text-sm font-medium text-warm transition-colors hover:border-warm/50"
              >
                Full recruiter page
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {recruiter.byNumbers.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-xl font-semibold text-ink">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-faint">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-line bg-surface-elevated/50 p-5 sm:p-6">
          <p className="eyebrow mb-4">Selected accomplishments</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {recruiter.accomplishments.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Best fit for:
          </span>
          {recruiterFirst.targetRolesPrimary.map((role) => (
            <span
              key={role}
              className="rounded-full border border-accent-cyan/25 bg-accent-cyan/5 px-3 py-1.5 text-xs font-medium text-ink"
            >
              {role}
            </span>
          ))}
          <span className="text-xs text-ink-faint">{recruiterFirst.targetRolesNote}</span>
        </div>
      </div>
    </section>
  );
}