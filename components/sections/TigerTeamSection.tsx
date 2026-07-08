"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, Mail } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { DeferredYouTubeEmbed } from "@/components/ui/DeferredYouTubeEmbed";

const TIGER_VIDEO_ID = "1oojonDDqek";

const leadPoints = [
  "Reward engineering makes AI fight for truth instead of gaming the metric.",
  "Rival auditors from different labs collide to uncover failure modes most teams never see.",
  "Cross-verified findings become ranked fixes, not vague AI opinions.",
];

export function TigerTeamSection() {
  const reduced = usePrefersReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
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
        body: JSON.stringify({ email, source: "reward-engineering-framework" }),
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

  return (
    <section id="tiger-team" className="section border-t border-line/60 bg-surface/20">
      <div className="container-x">
        <p className="eyebrow mb-3">Differentiator · AI Evaluation</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">
          A system builder who pressure-tests AI before it ships
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Three independent auditors attack the same workflow. A reward engine filters weak or
          fabricated claims. Confirmed findings come out as ranked, ready-to-run fixes — not vague
          AI opinions.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <ul className="space-y-3">
            {leadPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink-muted sm:text-base">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <a
              href="/who-audits-the-robots"
              className="group flex flex-col rounded-md bg-[#FACC15] px-5 py-3 text-night shadow-[0_0_0_1px_rgba(250,204,21,0.35)] transition-transform hover:scale-[1.02]"
            >
              <span className="text-sm font-bold">Tiger Team Plays Offense</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold">
                Read the article
                <ArrowUpRight size={14} aria-hidden />
              </span>
            </a>
            <a
              href="/field-notes/tiger-sentinel"
              className="group flex flex-col rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-5 py-3 shadow-glow transition-transform hover:scale-[1.02]"
            >
              <span className="text-sm font-bold text-ink">Tiger vs. Sentinel</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan">
                Field note
                <ArrowUpRight size={14} aria-hidden />
              </span>
            </a>
            <Link
              href="/playbook"
              className="group flex flex-col rounded-md border border-line px-5 py-3 shadow-glow transition-colors hover:border-accent-cyan/40"
            >
              <span className="text-sm font-bold text-ink">Interactive Playbook</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm text-ink-muted">
                Live system demos
                <ArrowUpRight size={14} aria-hidden />
              </span>
            </Link>
          </div>
        </div>

        <DeferredYouTubeEmbed
          id={TIGER_VIDEO_ID}
          title="Tiger Team — the film"
          autoplay={!reduced}
          hoverAudio
          className="mt-10"
        />

        <div className="mt-8 max-w-xl">
          <p className="text-sm font-medium text-ink">Want the reward-engineering framework?</p>
          {status === "ok" ? (
            <div
              className="mt-3 flex items-center gap-2 rounded-md bg-accent-cyan/10 px-4 py-3 text-accent-cyan"
              role="status"
            >
              <CheckCircle2 size={18} aria-hidden />
              <span className="text-sm">Check your inbox — the framework is on its way.</span>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row" noValidate>
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
                className="flex-1 rounded-md border border-line-strong bg-surface-elevated px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Email me the framework"}
                <Mail size={15} aria-hidden />
              </button>
            </form>
          )}
          {formError && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {formError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}