"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { ConstellationBackground } from "@/components/hero/ConstellationBackground";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;

export function Hero() {
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

      <div className="container-x flex min-h-[92vh] flex-col justify-center pb-20 pt-28 sm:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.p
            variants={item}
            className="eyebrow"
          >
            {hero.titleLine}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.07] tracking-tight sm:text-5xl lg:text-6xl"
          >
            I don&apos;t specialize in AI tools.{" "}
            <span className="accent-text">
              I specialize in designing business systems powered by AI.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-display text-lg text-ink-muted sm:text-xl"
          >
            {hero.subLine}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl border-l-2 border-accent-cyan/50 pl-4 text-base leading-relaxed text-ink sm:text-lg"
          >
            {hero.introduction}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base"
          >
            {hero.positioning}
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

          {/* Flagship teaser — the one artifact that proves the whole thesis */}
          <motion.div variants={item} className="mt-7">
            <Link
              href={hero.flagshipTeaser.href}
              className="group inline-flex max-w-2xl items-start gap-3 rounded-xl border border-line bg-surface-elevated/50 px-4 py-3 transition-colors hover:border-accent-cyan/40"
            >
              <span className="mt-0.5 shrink-0 rounded-md bg-accent-cyan/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan/90">
                Flagship
              </span>
              <span className="text-sm leading-relaxed">
                <span className="font-medium text-ink transition-colors group-hover:text-accent-cyan">
                  {hero.flagshipTeaser.lead}
                </span>{" "}
                <span className="text-ink-muted">{hero.flagshipTeaser.detail}</span>
                <ArrowRight
                  size={14}
                  className="ml-1 inline-block align-[-1px] text-accent-cyan transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
