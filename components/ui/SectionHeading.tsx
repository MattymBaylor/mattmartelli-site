import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  headingId,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  /** id for the <h2>, so a section can reference it via aria-labelledby. */
  headingId?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-4xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={headingId} className="text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{sub}</p>}
        {children}
      </div>
    </Reveal>
  );
}
