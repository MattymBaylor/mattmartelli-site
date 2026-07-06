import { recruiter } from "@/content/recruiter";

export function ExperienceStrip() {
  return (
    <section id="experience" className="section border-t border-line/60">
      <div className="container-x">
        <p className="eyebrow mb-3">Experience</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Where I&apos;ve shipped</h2>

        <ol className="mt-10 divide-y divide-line/60">
          {recruiter.experience.map((job) => (
            <li key={job.company} className="grid gap-2 py-5 sm:grid-cols-[130px_1fr] sm:gap-6">
              <p className="font-mono text-xs text-ink-faint">{job.dates}</p>
              <div>
                <p className="font-display font-semibold text-ink">
                  {job.role}
                  <span className="font-normal text-ink-muted"> · {job.company}</span>
                </p>
                <p className="mt-1 text-sm text-ink-muted">{job.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-2">
          {recruiter.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}