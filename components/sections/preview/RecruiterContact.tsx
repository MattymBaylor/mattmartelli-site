import { recruiter } from "@/content/recruiter";
import { site } from "@/content/site";

export function RecruiterContact() {
  return (
    <section className="section border-t border-line/60 pb-24">
      <div className="container-x max-w-2xl text-center">
        <p className="eyebrow mb-3">{recruiter.closingCta.heading}</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Let&apos;s talk about the role</h2>
        <p className="mt-4 text-sm text-ink-muted sm:text-base">{recruiter.closingCta.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={recruiter.links.email.href}
            className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-night shadow-glow"
          >
            {recruiter.closingCta.label}
          </a>
          <a
            href={site.meta.phoneHref}
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink"
          >
            {site.meta.phone}
          </a>
        </div>
      </div>
    </section>
  );
}