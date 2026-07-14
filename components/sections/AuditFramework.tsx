import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/content/site-alt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const { auditFramework } = site;

/**
 * AuditFramework — NEW section. Establishes that AI output on this site
 * (and in the underlying methodology) is pressure-tested, not taken on
 * faith: independent auditors, a reward engine that filters weak/fabricated
 * claims, and ranked, cross-verified fixes.
 *
 * Two-column on lg: copy leads on the right, a stylized "audit score"
 * visualization sits on the left. Order is reversed on mobile via
 * `lg:order-*` so the copy always reads first on small screens.
 *
 * CTA points at /who-audits-the-robots (rewritten to the Field Notes HTML).
 */
export function AuditFramework() {
  return (
    <section
      id="audit-framework"
      className="section border-t border-line/60"
      aria-labelledby="audit-framework-heading"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          {/* Copy — first on mobile, right column on desktop */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={auditFramework.eyebrow}
              title={auditFramework.heading}
              sub={auditFramework.body}
              headingId="audit-framework-heading"
            />

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3">
                {auditFramework.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden />
                    <span className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8">
                <Link
                  href={auditFramework.cta.href}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  {auditFramework.cta.label}
                  <ArrowUpRight size={16} aria-hidden />
                </Link>
                <p className="mt-3 text-xs text-ink-faint">{auditFramework.ctaSub}</p>
              </div>
            </Reveal>
          </div>

          {/* Visual — second on mobile, left column on desktop */}
          <Reveal className="order-2 lg:order-1" delay={0.1}>
            <div className="surface-card border-accent-cyan/20 p-6 sm:p-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                Sample audit run
              </p>
              <pre className="overflow-x-auto whitespace-pre font-mono text-xs leading-relaxed text-ink-muted">
                <span className="block">
                  <span className="text-ink">AUDITOR_A</span>{"  "}
                  <span className="text-accent-cyan">✓</span>{"  "}score: 0.91{"  "}finding:{" "}
                  <span className="text-accent-cyan">[verified]</span>
                </span>
                <span className="block">
                  <span className="text-ink">AUDITOR_B</span>{"  "}
                  <span className="text-accent-cyan">✓</span>{"  "}score: 0.88{"  "}finding:{" "}
                  <span className="text-accent-cyan">[verified]</span>
                </span>
                <span className="block">
                  <span className="text-ink">AUDITOR_C</span>{"  "}
                  <span className="text-warm">✗</span>{"  "}score: 0.41{"  "}finding:{" "}
                  <span className="text-warm">[rejected]</span>
                </span>
                <span className="mt-2 block text-ink">
                  REWARD_ENGINE{"  "}→{"  "}ranked output: 2 confirmed fixes
                </span>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
