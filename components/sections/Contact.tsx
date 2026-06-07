import { Mail, Linkedin, Youtube, Phone, Globe } from "lucide-react";
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

        <div className="mt-10 max-w-xl">
          {/* Direct contact channels */}
          <Reveal>
            <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </section>
  );
}
