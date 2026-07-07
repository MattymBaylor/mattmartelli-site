import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Linkedin,
  Youtube,
  Globe,
  Mic,
  FileDown,
  ArrowUpRight,
} from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  const { footer, meta, nav } = site;

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line bg-surface/40">
      <div className="container-x py-12">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-m-geometric.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="font-display text-sm font-semibold">{meta.name}</span>
        </div>
        <p className="mt-3 max-w-md text-sm text-ink-muted">{footer.tagline}</p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">Contact &amp; hiring</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${meta.email}`}
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Mail size={15} aria-hidden />
                  {meta.email}
                </a>
              </li>
              <li>
                <a
                  href={meta.phoneHref}
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Phone size={15} aria-hidden />
                  {meta.phone}
                </a>
              </li>
              <li>
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Linkedin size={15} aria-hidden />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={nav.cta.resume.href}
                  download={nav.cta.resume.filename}
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <FileDown size={15} aria-hidden />
                  {nav.cta.resume.label}
                </a>
              </li>
              <li>
                <Link
                  href={nav.cta.recruiter.href}
                  className="btn-recruiter px-4 py-2.5 text-sm"
                >
                  {nav.cta.recruiter.label}
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-2">{footer.thoughtLeadership.eyebrow}</p>
            <p className="mb-4 text-xs leading-relaxed text-ink-faint">
              {footer.thoughtLeadership.note}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={meta.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Youtube size={15} aria-hidden />
                  {meta.youtubeLabel}
                </a>
              </li>
              <li>
                <a
                  href={meta.podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Mic size={15} aria-hidden />
                  {meta.podcast.name}
                </a>
              </li>
              <li>
                <a
                  href={meta.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Globe size={15} aria-hidden />
                  {meta.company.name}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:pt-8">
            <p className="text-sm text-ink-faint">
              Portfolio = hire Matt.{" "}
              <a
                href={meta.company.url}
                className="text-ink-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent-cyan"
              >
                {meta.company.name}
              </a>{" "}
              = buy voice AI and consulting.
            </p>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {meta.name}. {footer.tagline}
        </p>
        <Link
          href={footer.privacy.href}
          className="text-xs text-ink-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent-cyan"
        >
          {footer.privacy.label}
        </Link>
      </div>
    </footer>
  );
}