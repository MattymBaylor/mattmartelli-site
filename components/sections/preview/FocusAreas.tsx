import Link from "next/link";
import { site } from "@/content/site";

export function FocusAreas() {
  return (
    <section aria-label="Focus areas" className="pb-6">
      <div className="container-x">
        <div className="grid gap-3 sm:grid-cols-3">
          {site.focusAreas.map((area) => (
            <Link
              key={area.n}
              href={area.href}
              className="group flex items-center gap-4 rounded-xl border border-line bg-surface-elevated/40 px-5 py-4 transition-colors hover:border-accent-cyan/40 hover:bg-surface-elevated/80"
            >
              <span className="font-mono text-sm text-accent-cyan/80">{area.n}</span>
              <span className="font-display text-sm font-medium text-ink group-hover:text-accent-cyan sm:text-base">
                {area.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}