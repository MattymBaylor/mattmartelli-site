"use client";

import { useState, type FormEvent } from "react";
import { Mail, Linkedin, Phone, Globe, Send, Check, AlertCircle } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

// Set NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree URL) to enable real submission.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function Contact() {
  const { contact, meta } = site;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — if filled, silently succeed (likely a bot).
    if (data.get("company_website")) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!ENDPOINT) {
      // No endpoint configured — fall back to a mailto so the form still works.
      const name = String(data.get("name") || "");
      const email = String(data.get("email") || "");
      const message = String(data.get("message") || "");
      window.location.href = `mailto:${meta.email}?subject=${encodeURIComponent(
        `Inquiry from ${name}`
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      setStatus("success");
      form.reset();
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-md border border-line bg-surface-elevated/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none";

  return (
    <section id="contact" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading eyebrow="Contact" title={contact.heading} sub={contact.sub} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-3">
                <p className="text-sm text-ink-faint">{contact.preferenceNote}</p>
                <a
                  href={`mailto:${meta.email}`}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface-elevated/50 px-4 py-3.5 transition-colors hover:border-accent-cyan/40"
                >
                  <Mail size={18} className="text-accent-cyan" aria-hidden />
                  <span className="text-sm text-ink">{meta.email}</span>
                </a>
                <a
                  href={meta.phoneHref}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface-elevated/50 px-4 py-3.5 transition-colors hover:border-accent-cyan/40"
                >
                  <Phone size={18} className="text-accent-cyan" aria-hidden />
                  <span className="text-sm text-ink">{meta.phone}</span>
                </a>
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface-elevated/50 px-4 py-3.5 transition-colors hover:border-accent-cyan/40"
                >
                  <Linkedin size={18} className="text-accent-cyan" aria-hidden />
                  <span className="text-sm text-ink">{contact.linkedinLabel}</span>
                </a>
                <a
                  href={meta.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface-elevated/50 px-4 py-3.5 transition-colors hover:border-accent-cyan/40"
                >
                  <Globe size={18} className="text-accent-cyan" aria-hidden />
                  <span className="text-sm text-ink">
                    {meta.company.name}
                    <span className="text-ink-faint"> · my company</span>
                  </span>
                </a>
              </div>

              <p className="border-l-2 border-warm/50 pl-4 text-sm leading-relaxed text-ink sm:text-base">
                {contact.closingStatement}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="surface-card space-y-4 p-6" noValidate>
              {/* Honeypot field — hidden from users, visible to bots. */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label htmlFor="company_website">Company website</label>
                <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  What problem are you trying to solve?
                </label>
                <textarea id="message" name="message" required rows={4} className={inputClass} />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                <Send size={15} aria-hidden />
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm text-accent-cyan">
                    <Check size={15} aria-hidden /> Thanks — your message is on its way.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-warm">
                    <AlertCircle size={15} aria-hidden /> Something went wrong. Please email{" "}
                    {meta.email} directly.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
