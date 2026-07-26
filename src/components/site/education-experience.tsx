"use client";

import { GraduationCap, Briefcase } from "lucide-react";
import { education, experience } from "@/data/education";

export function EducationExperience() {
  return (
    <section
      id="education-experience"
      className="border-y border-border bg-muted/30"
      aria-label="Education and Experience"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <header className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-sm text-muted-foreground">02</span>
          <h2 className="text-3xl font-bold tracking-tight">
            Education &amp; Experience
          </h2>
        </header>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <GraduationCap className="h-4 w-4" aria-hidden />
              Education
            </div>
            <ol className="relative border-l border-border pl-6">
              {education.map((e, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <span
                    className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-foreground"
                    aria-hidden
                  />
                  <h3 className="font-semibold leading-tight">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {e.org}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {e.dateRange}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Briefcase className="h-4 w-4" aria-hidden />
              Experience
            </div>
            <ol className="relative border-l border-border pl-6">
              {experience.map((e, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <span
                    className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background bg-foreground"
                    aria-hidden
                  />
                  <h3 className="font-semibold leading-tight">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {e.org}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {e.dateRange}
                  </p>
                  {e.summary && (
                    <p className="mt-2 text-sm">{e.summary}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
