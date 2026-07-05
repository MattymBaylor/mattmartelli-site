"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site-alt";
import { ConstellationBackground } from "@/components/hero/ConstellationBackground";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;

/**
 * HeroAlt — the alternate homepage's Hero. Streamlined to one body paragraph
 * and exactly two CTAs (plus a quiet mono flagship teaser).
 *
 * Changes from the original Hero:
 *   - Dropped the second "experience" paragraph; merged into
 *     `hero.introduction` in content/site-alt.ts.
 *   - Removed the hardcoded yellow "Read the Flagship Case Study" button.
 *     The flagship story is now a low-emphasis mono-text teaser below the
 *     CTA row — not a third competing CTA.
 *   - CTA row is exactly two buttons: primary (gradient, explore work) and
 *     secondary (bordered, recruiter path).
 *
 * This lives alongside the original `Hero` so the current homepage (`/`) and
 * the alternate (`/alt`) can be compared side by side.
 */
export function HeroAlt() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
        },
      };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Layered background */}
      <div className="absolute inset-0 -z-10">
        <ConstellationBackground />
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
      </div>

      <div className="container-x scroll-mt-24 pb-20 pt-28 text-left sm:pb-28 sm:pt-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          {/* Headline — two stacked lines, both the same size. Line 1 is the
              accent color, line 2 is ink; size is uniform so it reads as one H1. */}
          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-balance font-semibold leading-[1.12] tracking-tight text-4xl sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="block text-accent-cyan">{hero.headlineLine1}</span>
            <span className="block text-ink">{hero.headlineLine2}</span>
          </motion.h1>

          {/* Capabilities line — the three pillars */}
          <motion.p
            variants={item}
            className="mt-6 font-display text-lg leading-snug text-ink sm:text-xl"
          >
            {hero.capabilities}
          </motion.p>

          {/* Body — single paragraph, merges the old intro + experience lines */}
          <motion.p
            variants={item}
            className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {hero.introduction}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={hero.ctas.primary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
            >
              {hero.ctas.primary.label}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href={hero.ctas.secondary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              {hero.ctas.secondary.label}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>

          {/* Flagship teaser — quiet, low-emphasis, mono. Not a third CTA. */}
          <motion.p variants={item} className="mt-5">
            <Link
              href={hero.flagshipTeaser.href}
              className="group inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors hover:text-accent-cyan"
            >
              {hero.flagshipTeaser.text}
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
