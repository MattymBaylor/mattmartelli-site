"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;

export function SuhasStyleHero() {
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
      className="relative isolate overflow-hidden border-b border-line/60"
      aria-labelledby="preview-hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-30" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(55%_55%_at_50%_0%,rgba(34,211,238,0.08),transparent_70%)]" />
      </div>

      <div className="container-x scroll-mt-24 pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="eyebrow">
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="preview-hero-heading"
              variants={item}
              className="mt-5 text-balance font-semibold leading-[1.1] tracking-tight text-4xl sm:text-5xl lg:text-[3.25rem]"
            >
              <span className="block text-ink">{hero.headlineLine1}</span>
              <span className="block text-accent-cyan">{hero.headlineLine2}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 font-display text-xl leading-snug text-ink sm:text-2xl"
            >
              {hero.promise}
            </motion.p>

            <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              I&apos;m {hero.name}. {hero.introduction} {hero.experience}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href={hero.ctas.primary.href}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
              >
                {hero.ctas.primary.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href={hero.ctas.secondary.href}
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
              >
                {hero.ctas.secondary.label}
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line/60 pt-8"
            >
              {hero.stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-xl font-semibold text-ink sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {stat.label}
                  </p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-elevated/60 p-2 shadow-elevated">
              <Image
                src="/headshot.jpg"
                alt="Matt Martelli — AI automation architect"
                width={640}
                height={800}
                priority
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint lg:text-left">
              {hero.capabilities}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}