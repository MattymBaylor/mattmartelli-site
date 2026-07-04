"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { ConstellationBackground } from "@/components/hero/ConstellationBackground";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;
const TIGER_VIDEO_ID = "1oojonDDqek";
const TIGER_EMBED = `https://www.youtube-nocookie.com/embed/${TIGER_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${TIGER_VIDEO_ID}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0`;

const leadPoints = [
  "Designs AI, automation, and CRM systems for real operating environments.",
  "Builds in validation, scoring, and failure detection from the start.",
  "Turns audit findings into practical, reviewable fixes.",
];

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
      {/* Layered background — clean constellation field (the film lives in a
          contained card below, not as a full-bleed background). */}
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
          {/* Kicker keeps the original positioning line. */}
          <motion.p
            variants={item}
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-cyan/85"
          >
            {hero.headlineLine1} {hero.headlineLine2}
          </motion.p>

          {/* ── TOP HEADER SLOT ─────────────────────────────────────────
              New top headline copy from Matt drops in right here (still
              pending). The lead-in headline + film sit below. ──────────── */}

          {/* Capabilities line — the three pillars */}
          <motion.p
            variants={item}
            className="mt-4 font-display text-lg leading-snug text-ink sm:text-xl"
          >
            {hero.capabilities}
          </motion.p>

          {/* Body — the supporting detail */}
          <motion.p
            variants={item}
            className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {hero.introduction}
          </motion.p>

          {/* Experience line */}
          <motion.p
            variants={item}
            className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg"
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
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
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

          {/* ── Lead-in explainer ───────────────────────────────────────
              Sits below the header/copy section and above the film.
              This is now the page's single H1. ──────────────────────────── */}
          <motion.div variants={item} className="mt-20 max-w-3xl sm:mt-24">
            <motion.h1
              id="hero-heading"
              variants={item}
              className="text-balance font-semibold leading-[1.12] tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem]"
            >
              A system builder who pressure-tests AI before it ships.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Here&rsquo;s how I design production AI systems with real safeguards,
              not just prompts and demos. Three independent auditors attack the
              same workflow, a reward engine filters weak or fabricated claims,
              and confirmed findings come out as ranked, ready-to-run fixes.
            </motion.p>

            <motion.ul variants={item} className="mt-6 space-y-2.5">
              {leadPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-base leading-relaxed text-ink sm:text-lg"
                >
                  <Check
                    size={18}
                    className="mt-1 shrink-0 text-accent-cyan"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── The film — captioned by the Tiger/Sentinel tagline that moved
              down from the top. Fills its 16:9 card exactly (no overscan) so
              nothing is cropped; scales cleanly to mobile. ─────────────────── */}
          <motion.div variants={item} className="mt-12 max-w-4xl sm:mt-14">
            <p className="mb-4 font-semibold tracking-tight text-xl sm:text-2xl">
              <span className="text-[#ffb020]">Tiger Team</span>{" "}
              <span className="text-ink">finds faults.</span>{" "}
              <span className="text-[#5fd39b]">Sentinel Team</span>{" "}
              <span className="text-ink">ships fixes.</span>
            </p>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
              {reduced ? (
                <a
                  href="https://youtu.be/1oojonDDqek"
                  target="_blank"
                  rel="noopener"
                  className="relative block h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://img.youtube.com/vi/1oojonDDqek/maxresdefault.jpg"
                    alt="Tiger Team — watch the film"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/30">
                    <span className="rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
                      ▶ Play on YouTube
                    </span>
                  </span>
                </a>
              ) : (
                <>
                  <iframe
                    title="Tiger Team — the film"
                    src={TIGER_EMBED}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="pointer-events-none absolute inset-0 h-full w-full border-0"
                  />
                  <a
                    href="https://youtu.be/1oojonDDqek"
                    target="_blank"
                    rel="noopener"
                    aria-label="Watch the Tiger Team film on YouTube"
                    className="absolute inset-0 z-10"
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
