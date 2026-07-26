"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      aria-label="Contact"
    >
      <header className="mb-8 flex items-baseline gap-3">
        <span className="font-mono text-sm text-muted-foreground">05</span>
        <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Best for collaboration on Unity projects, gameplay questions, or
            just to swap notes. I read every message and reply within a couple
            of days.
          </p>
        </div>

        <ul className="space-y-3 text-sm">
          <ContactLink
            icon={<Mail className="h-4 w-4" aria-hidden />}
            label={profile.contact.email}
            href={`mailto:${profile.contact.email}`}
            hint="Email"
          />
          <ContactLink
            icon={<Github className="h-4 w-4" aria-hidden />}
            label="github.com/FutureGD"
            href={profile.contact.github}
            hint="GitHub"
            external
          />
          {profile.contact.linkedin && (
            <ContactLink
              icon={<Linkedin className="h-4 w-4" aria-hidden />}
              label="linkedin.com/in/future-ji"
              href={profile.contact.linkedin}
              hint="LinkedIn"
              external
            />
          )}
        </ul>
      </div>
    </section>
  );
}

function ContactLink({
  icon,
  label,
  href,
  hint,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  hint: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        className="group flex items-center gap-3 rounded-md border border-border bg-background p-3 transition-colors hover:border-foreground/30 hover:bg-muted/40"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {hint}
          </span>
          <span className="text-foreground underline-offset-4 group-hover:underline">
            {label}
          </span>
        </span>
      </a>
    </li>
  );
}
