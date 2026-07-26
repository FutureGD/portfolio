"use client";

import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      aria-label="About"
    >
      <header className="mb-8 flex items-baseline gap-3">
        <span className="font-mono text-sm text-muted-foreground">01</span>
        <h2 className="text-3xl font-bold tracking-tight">About</h2>
      </header>

      {/* Single bio source of truth — `profile.bio`. The hero does NOT
          duplicate this text; it uses `tagline` and `location` only. */}
      <div className="max-w-3xl space-y-4">
        {profile.bio.map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-muted-foreground">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
