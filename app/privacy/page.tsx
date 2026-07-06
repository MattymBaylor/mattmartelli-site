import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { privacyPolicy } from "@/content/legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for mattmartelli.com — how information is collected, used, and protected.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="min-h-screen">
      <div className="container-x max-w-3xl py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent-cyan"
        >
          <ArrowLeft size={15} aria-hidden /> Back to home
        </Link>

        <header className="mt-8 border-b border-line pb-8">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{privacyPolicy.title}</h1>
          <p className="mt-3 text-sm text-ink-faint">Last updated: {privacyPolicy.lastUpdated}</p>
        </header>

        <div className="prose-policy mt-10 space-y-10">
          <p className="text-base leading-relaxed text-ink-muted">{privacyPolicy.intro}</p>

          {privacyPolicy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
              {"paragraphs" in section &&
                section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-base leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              {"list" in section && section.list && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-muted">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-8 text-sm text-ink-faint">
          © {new Date().getFullYear()} {site.meta.name}
        </p>
      </div>
    </main>
  );
}