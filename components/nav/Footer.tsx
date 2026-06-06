import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-md bg-accent-gradient font-display text-xs font-bold text-base"
            >
              M
            </span>
            <span className="font-display text-sm font-semibold">Matt Martelli</span>
          </div>
          <p className="mt-3 text-sm text-ink-muted">{site.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={`mailto:${site.meta.email}`}
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Mail size={15} aria-hidden /> {site.meta.email}
          </a>
          <a
            href={site.meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Linkedin size={15} aria-hidden /> LinkedIn
          </a>
          <Link
            href="/recruiter"
            className="text-ink-muted transition-colors hover:text-accent-cyan"
          >
            Recruiter Fast Path
          </Link>
        </div>
      </div>
      <div className="container-x border-t border-line py-6">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Matt Martelli. Designing business systems powered by AI.
        </p>
      </div>
    </footer>
  );
}
