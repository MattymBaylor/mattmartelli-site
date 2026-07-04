"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { ConstellationBackground } from "@/components/hero/ConstellationBackground";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;
const TIGER_VIDEO_ID = "1oojonDDqek";
const TIGER_EMBED = `https://www.youtube-nocookie.com/embed/${TIGER_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${TIGER_VIDEO_ID}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0`;

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
      {/* Layered background — the Tiger Team film (muted, looping) behind a scrim.
          The video sits in a container-relative 16:9 wrapper so it always COVERS
          the hero band (viewport-unit sizing only covers a full-height hero).
          Reduced-motion users get the calm constellation instead. */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {reduced ? (
          <ConstellationBackground />
        ) : (
          <div className="absolute left-1/2 top-1/2 aspect-video w-full min-h-full -translate-x-1/2 -translate-y-1/2">
            <iframe
              aria-hidden
              tabIndex={-1}
              title="Tiger Team — ambient background"
              src={TIGER_EMBED}
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none h-full w-full"
            />
          </div>
        )}
        {/* scrims — overall dim + a left-weighted wash so the headline/body stay
            crisp while the film shows through on the right. */}
        <div className="absolute inset-0 bg-night/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/75 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-25" />
      </div>

      <div className="container-x scroll-mt-24 pb-20 pt-28 text-left sm:pb-28 sm:pt-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          {/* Kicker keeps the original positioning line. */}
          <motion.p
            variants={item}
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-cyan/85"
          >
            {hero.headlineLine1} {hero.headlineLine2}
          </motion.p>

          {/* Headline — Tiger finds faults; Sentinel ships fixes. */}
          <motion.h1
            id="hero-heading"
            variants={item}
            className="max-w-4xl text-balance font-semibold leading-[1.1] tracking-tight text-4xl sm:text-5xl lg:text-[3.5rem] [text-shadow:0_2px_22px_rgba(2,4,10,0.7)]"
          >
            <span className="block">
              <span className="text-[#ffb020]">Tiger Team</span> <span className="text-ink">finds faults.</span>
            </span>
            <span className="block">
              <span className="text-[#5fd39b]">Sentinel Team</span> <span className="text-ink">ships fixes.</span>
            </span>
          </motion.h1>

          {/* Capabilities line — the three pillars */}
          <motion.p
            variants={item}
            className="mt-6 max-w-3xl font-display text-lg leading-snug text-ink sm:text-xl [text-shadow:0_1px_12px_rgba(2,4,10,0.6)]"
          >
            {hero.capabilities}
          </motion.p>

          {/* Body — the supporting detail */}
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg [text-shadow:0_1px_12px_rgba(2,4,10,0.6)]"
          >
            {hero.introduction}
          </motion.p>

          {/* Experience line */}
          <motion.p
            variants={item}
            className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg [text-shadow:0_1px_12px_rgba(2,4,10,0.6)]"
          >
            {hero.experience}
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
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-night/40 px-5 py-3 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              {hero.ctas.secondary.label}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/seinfeld-hq"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FACC15] px-5 py-3 text-sm font-semibold text-night shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_16px_-8px_rgba(250,204,21,0.4)] transition-transform hover:scale-[1.03]"
            >
              Read the Flagship Case Study
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
