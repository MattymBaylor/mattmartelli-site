import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Linkedin, Youtube, Globe, Mic, FileDown } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-m-geometric.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-display text-sm font-semibold">Matt Martelli</span>
          </div>
          <p className="mt-3 text-sm text-ink-muted">{site.footer.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
          <a
            href={`mailto:${site.meta.email}`}
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Mail size={15} aria-hidden /> {site.meta.email}
          </a>
          <a
            href={site.meta.phoneHref}
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Phone size={15} aria-hidden /> {site.meta.phone}
          </a>
          <a
            href={site.meta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Linkedin size={15} aria-hidden /> LinkedIn
          </a>
          <a
            href={site.meta.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Youtube size={15} aria-hidden /> YouTube
          </a>
          <a
            href={site.meta.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Globe size={15} aria-hidden /> {site.meta.company.name}
          </a>
          <a
            href={site.meta.podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <Mic size={15} aria-hidden /> {site.meta.podcast.name}
          </a>
          <Link
            href="/recruiter"
            className="text-ink-muted transition-colors hover:text-accent-cyan"
          >
            Recruiter Fast Path
          </Link>
          <a
            href="/resume.pdf"
            download="Matt_Martelli_Resume.pdf"
            className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-accent-cyan"
          >
            <FileDown size={15} aria-hidden /> Download Résumé
          </a>
        </div>
      </div>
      <div className="container-x border-t border-line py-5">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Matt Martelli. Designing business systems powered by AI.
        </p>
      </div>
    </footer>
  );
}
