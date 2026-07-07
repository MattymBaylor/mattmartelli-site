"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { recruiter } from "@/content/recruiter";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero, hiring } = site;

export function HiringHero() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.07, delayChildren: 0.04 } },
  };
  const item = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
        },
      };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-line/60"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-25" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(34,211,238,0.09),transparent_70%)]" />
      </div>

      <div className="container-x scroll-mt-24 pb-14 pt-28 sm:pb-16 sm:pt-36">
        <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[260px] lg:mx-0"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-elevated/60 shadow-glow">
              <div className="p-1.5">
                <Image
                  src="/headshot.jpg"
                  alt="Matt Martelli — AI Systems Architect"
                  width={260}
                  height={325}
                  priority
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                />
              </div>
              <div className="border-t border-line/60 bg-night/50 px-4 py-4">
                <Image
                  src="/hubspot-certified-partner.webp"
                  alt="HubSpot Certified Partner"
                  width={690}
                  height={336}
                  className="mx-auto block h-auto w-[85%]"
                />
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint lg:text-left">
              {hiring.availability}
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              variants={item}
              className="rounded-2xl border border-line bg-surface-elevated/80 p-6 shadow-glow sm:p-7"
            >
              <p className="eyebrow">{hiring.primaryRole}</p>

              <h1
                id="hero-heading"
                className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]"
              >
                {hero.name}
              </h1>

              <p className="mt-3 font-display text-lg text-accent-cyan sm:text-xl">
                {hiring.secondaryRole}
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 text-balance font-semibold leading-snug text-2xl text-ink sm:mt-10 sm:text-3xl"
            >
              <span className="text-accent-cyan">{hero.headlineLine1}</span>{" "}
              <span>{hero.headlineLine2}</span>
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {hero.promise}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {hiring.oneLiner}
            </motion.p>

            <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
              <a
                href={hero.ctas.primary.href}
                download={site.nav.cta.resume.filename}
                className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Download size={16} aria-hidden />
                {hero.ctas.primary.label}
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
                href={hero.ctas.recruiter.href}
                className="btn-recruiter px-5 py-3 text-sm"
              >
                {hero.ctas.recruiter.label}
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-9 grid gap-4 border-t border-line/60 pt-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {recruiter.byNumbers.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-xl font-semibold text-ink">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-faint">{stat.label}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-xl border border-line bg-surface-elevated/50 p-5 shadow-glow sm:p-6"
        >
          <p className="eyebrow mb-4">Selected accomplishments</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {recruiter.accomplishments.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Best fit for:
          </span>
          {hiring.targetRoles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-accent-cyan/25 bg-accent-cyan/5 px-3 py-1.5 text-xs font-medium text-ink"
            >
              {role}
            </span>
          ))}
          <span className="text-xs text-ink-faint">{hiring.targetRolesNote}</span>
        </div>
      </div>
    </section>
  );
}