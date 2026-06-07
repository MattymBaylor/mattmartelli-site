import { Mail, Linkedin, Youtube, Phone, Globe, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Direct email — no form, no backend. The CTA opens the visitor's mail client
// with a pre-filled subject so a message actually reaches Matt.
const MAIL_SUBJECT = "Let's build the system";

export function Contact() {
  const { contact, meta } = site;
  const mailto = `mailto:${meta.email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

  const channelClass =
    "flex items-center gap-3 rounded-lg border border-line bg-surface-elevated/50 px-4 py-3.5 transition-colors hover:border-accent-cyan/40";

  return (
    <section id="contact" className="section border-t border-line/60" aria-labelledby="contact-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title={contact.heading}
          sub={contact.sub}
          headingId="contact-heading"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch">
          {/* Direct contact channels */}
          <Reveal>
            <div className="flex h-full flex-col gap-3">
              <p className="text-sm text-ink-faint">{contact.preferenceNote}</p>

              <a href={mailto} className={channelClass}>
                <Mail size={18} className="text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink">{meta.email}</span>
              </a>
              <a href={meta.phoneHref} className={channelClass}>
                <Phone size={18} className="text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink">{meta.phone}</span>
              </a>
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <Linkedin size={18} className="text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink">{contact.linkedinLabel}</span>
              </a>
              <a
                href={meta.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <Youtube size={18} className="text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink">{meta.youtubeLabel}</span>
              </a>
              <a
                href={meta.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <Globe size={18} className="text-accent-cyan" aria-hidden />
                <span className="text-sm text-ink">
                  {meta.company.name}
                  <span className="text-ink-faint"> · my company</span>
                </span>
              </a>
            </div>
          </Reveal>

          {/* Primary CTA — email me directly */}
          <Reveal delay={0.08}>
            <div className="surface-card flex h-full flex-col justify-center gap-6 p-8 text-center sm:p-10">
              <div>
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  The fastest way to reach me
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                  Send a note about the problem you&apos;re trying to solve — it lands
                  straight in my inbox and I&apos;ll reply with how I&apos;d architect it.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <a
                  href={mailto}
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <Mail size={16} aria-hidden /> Email me
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent-cyan transition-colors hover:text-ink"
                >
                  or connect on LinkedIn
                </a>
              </div>

              <p className="border-l-2 border-warm/50 pl-4 text-left text-sm leading-relaxed text-ink sm:text-base">
                {contact.closingStatement}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
