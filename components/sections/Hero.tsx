"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, CheckCircle2, Mail } from "lucide-react";
import { site } from "@/content/site";
import { ConstellationBackground } from "@/components/hero/ConstellationBackground";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const { hero } = site;
const TIGER_VIDEO_ID = "1oojonDDqek";
// Ambient clip — muted, looped, chromeless, and INTERACTIVE (a click plays /
// pauses in place; it never navigates away to YouTube).
const TIGER_EMBED = `https://www.youtube-nocookie.com/embed/${TIGER_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${TIGER_VIDEO_ID}&controls=0&modestbranding=1&rel=0&playsinline=1`;
// Reduced motion — no autoplay; shows the thumbnail + play button and plays
// inline on click (still on-page), with controls.
const TIGER_EMBED_STATIC = `https://www.youtube-nocookie.com/embed/${TIGER_VIDEO_ID}?controls=1&modestbranding=1&rel=0&playsinline=1`;

// Live demo (vertical YouTube Short) shown on the left of the hero.
// Chromeless autoplay loop (muted) — matches the Tiger film treatment: no
// click-to-play, no YouTube UI. Reduced motion falls back to click-to-play.
const DEMO_VIDEO_ID = "chaXY24gZpA";
const DEMO_EMBED = `https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${DEMO_VIDEO_ID}&controls=0&modestbranding=1&rel=0&playsinline=1`;
const DEMO_EMBED_STATIC = `https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?controls=1&modestbranding=1&rel=0&playsinline=1`;

const leadPoints = [
  "Reward engineering makes AI fight for truth instead of gaming the metric.",
  "Rival auditors from different labs collide to uncover failure modes most teams never see.",
  "Cross-verified findings become ranked fixes, not vague AI opinions.",
];

export function Hero() {
  const reduced = usePrefersReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          source: "reward-engineering-framework",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setStatus("error");
        setFormError(body?.error || "Something went wrong. Try again.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setFormError("Something went wrong. Try again.");
    }
  };

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
      {/* Layered background — spans both hero sub-sections. */}
      <div className="absolute inset-0 -z-10">
        <ConstellationBackground />
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
      </div>

      {/* ══ SECTION 1 — hero: live demo (left) + headline & CTAs pushed to the
          right margin (right). ════════════════════ */}
      <div className="container-x scroll-mt-24 pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
          {/* LEFT — the live demo (vertical Short). Chromeless autoplay loop;
              never navigates to YouTube. Reduced motion → click-to-play. */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="order-2 mx-auto w-full max-w-[300px] lg:order-1 lg:mx-0"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
              <iframe
                title="Live system demo"
                src={reduced ? DEMO_EMBED_STATIC : DEMO_EMBED}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              Live demo of an AI powered estimator app
            </p>
          </motion.div>

          {/* RIGHT — headline, promise, credentials, body, CTAs; aligned to the
              right margin on desktop. */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-1 lg:order-2 lg:text-right"
          >
            {/* Brand headline */}
            <motion.h1
              id="hero-heading"
              variants={item}
              className="text-balance font-semibold leading-[1.06] tracking-tight text-4xl sm:text-5xl lg:text-[3.5rem]"
            >
              <span className="block text-accent-cyan">AI is the tool.</span>
              <span className="block text-ink">The system is the product.</span>
            </motion.h1>

            {/* Promise line */}
            <motion.p
              variants={item}
              className="mt-5 font-display text-xl leading-snug text-ink sm:text-2xl"
            >
              I build AI systems that find flaws, fix fast, and scale revenue.
            </motion.p>

            {/* Credentials line */}
            <motion.p
              variants={item}
              className="mt-4 text-base font-medium text-ink-muted sm:text-lg"
            >
              AI Automation Architect | RevOps &amp; CRM Systems | Marketing
              Automation | HubSpot Certified | Remote
            </motion.p>

            {/* Body paragraph */}
            <motion.p
              variants={item}
              className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg lg:ml-auto lg:max-w-2xl"
            >
              I design production AI systems that connect voice agents, automation,
              CRM platforms, and human teams into measurable operating systems for
              growth. My work is built for the real world: pressure-tested,
              failure-aware, and designed to turn weak spots into fix-ready
              execution.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end"
            >
              <Link
                href={hero.ctas.secondary.href}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FACC15] px-5 py-3 text-sm font-semibold text-night shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_16px_-8px_rgba(250,204,21,0.4)] transition-transform hover:scale-[1.03]"
              >
                {hero.ctas.secondary.label}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ SECTION 2 — the header + the film ═════════════════════════════════
          Header matches the shared SectionHeading pattern (blue eyebrow +
          text-3xl sm:text-4xl h2 + mt-4 sub) so it's consistent with the rest
          of the page's sections. */}
      <div className="section border-t border-line/60">
        <div className="container-x">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            {/* Blue eyebrow — matches the other sections. */}
            <motion.p variants={item} className="eyebrow mb-3">
              AI Evaluation · Reward Engineering
            </motion.p>

            {/* Header (Matt's copy) — consistent section-h2 size. */}
            <motion.h2
              variants={item}
              className="text-3xl font-semibold leading-tight sm:text-4xl"
            >
              A system builder who pressure-tests AI before it ships.
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Here&rsquo;s how I design production AI systems with real safeguards,
              not just prompts and demos. Three independent auditors attack the
              same workflow, a reward engine filters weak or fabricated claims,
              and confirmed findings come out as ranked, ready-to-run fixes.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <ul className="space-y-2.5">
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
              </ul>

              {/* Three stacked CTAs — same size/style, colored yellow → blue →
                  teal. Yellow: Tiger (offense) → the article. Blue: Sentinel
                  (defense) — article still being written. Teal (hero cyan):
                  the head-to-head field note. */}
              <div className="mt-1 flex w-full flex-col gap-3 sm:w-72">
                <a
                  href="/who-audits-the-robots"
                  className="group flex w-full flex-col items-start rounded-md bg-[#FACC15] px-5 py-2.5 text-night shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_18px_-8px_rgba(250,204,21,0.5)] transition-transform hover:scale-[1.02]"
                >
                  <span className="text-sm font-bold leading-tight">Tiger Team Plays Offense</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold [text-shadow:0_0_10px_rgba(255,255,255,0.35)]">
                    Learn how
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </a>

                <span
                  aria-disabled="true"
                  className="flex w-full cursor-default flex-col items-start rounded-md bg-accent-gradient px-5 py-2.5 text-night shadow-glow"
                >
                  <span className="text-sm font-bold leading-tight">Sentinel Team Plays Defense</span>
                  <span className="mt-1 text-sm font-semibold text-night/75">Coming soon</span>
                </span>

                <a
                  href="/field-notes/tiger-sentinel"
                  className="group flex w-full flex-col items-start rounded-md bg-accent-cyan px-5 py-2.5 text-night shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_18px_-8px_rgba(34,211,238,0.55)] transition-transform hover:scale-[1.02]"
                >
                  <span className="text-sm font-bold leading-tight">Tiger vs. Sentinel</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold [text-shadow:0_0_10px_rgba(255,255,255,0.35)]">
                    Learn why
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* The film — plays inline; a click never leaves the page. Fills
                its 16:9 card exactly (no overscan) so nothing is cropped. */}
            <motion.div variants={item} className="mt-10">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
                <iframe
                  title="Tiger Team — the film"
                  src={reduced ? TIGER_EMBED_STATIC : TIGER_EMBED}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </motion.div>

            {/* Takeaway line — white, H3 scale, semibold. */}
            <motion.p
              variants={item}
              className="mt-8 font-display text-lg font-semibold leading-snug text-ink sm:text-xl"
            >
              Reward engineering is how you make AI tell the truth instead of
              game the score.
            </motion.p>

            {/* Email capture — we email the framework (no instant download) so
                only deliverable addresses get captured. Mirrors the
                growthmindset.ai mechanism: POST /api/subscribe -> n8n. */}
            <motion.div variants={item} className="mt-5 max-w-xl">
              {status === "ok" ? (
                <div
                  className="flex items-center gap-2 rounded-md bg-accent-cyan/10 px-4 py-3 text-accent-cyan"
                  role="status"
                >
                  <CheckCircle2 size={18} aria-hidden />
                  <span className="text-sm font-medium">
                    You&rsquo;re in — check your inbox. The framework is on its
                    way.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                  noValidate
                >
                  <label htmlFor="framework-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="framework-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 rounded-md border border-line-strong bg-surface-elevated px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint hover:border-accent-cyan/50 focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#FACC15] px-5 py-3 text-sm font-semibold text-night shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_16px_-8px_rgba(250,204,21,0.4)] transition-transform hover:scale-[1.03] disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Email Me the Framework"}
                    <Mail
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </button>
                </form>
              )}
              {formError && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {formError}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
