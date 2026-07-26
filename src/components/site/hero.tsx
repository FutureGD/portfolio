"use client";

import Link from "next/link";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { ResumeButton } from "./resume-button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6"
      aria-label="Hero"
    >
      {/* Decorative wordmark duplicated in the background — pure decoration,
          hidden from assistive tech to avoid screen-reader echo. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none font-mono text-[28vw] font-black leading-none text-foreground/[0.03] sm:text-[20vw]">
          FUTURE
        </span>
      </span>

      <div className="relative flex flex-col gap-6">
        <p className="font-mono text-sm text-muted-foreground">
          {profile.name}
          {profile.displayName && (
            <span className="text-muted-foreground/70"> ({profile.displayName})</span>
          )}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {profile.tagline}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          {profile.location}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="#projects">
              View projects
              <ArrowDown className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          {/* The résumé button only renders when a real resume URL is
              configured. Until then, no locked/disabled placeholder
              shows in the hero — cleaner UX. Add a PDF at
              public/resume/resume.pdf and set NEXT_PUBLIC_RESUME_URL
              to make it appear. */}
          {profile.resumeUrl && <ResumeButton />}
          <div className="ml-1 flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Email">
              <a href={`mailto:${profile.contact.email}`}>
                <Mail className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href={profile.contact.github} target="_blank" rel="noreferrer noopener">
                <Github className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            {profile.contact.linkedin && (
              <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
