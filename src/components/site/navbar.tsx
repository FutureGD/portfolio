"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/data/profile";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#education-experience", label: "Education & Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Logo wordmark: prefer the display name (nickname), fall back to initials.
  const logoText = profile.displayName ?? profile.name;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-tight hover:opacity-80"
        >
          {logoText}
          <span className="text-muted-foreground">.dev</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div
          className="md:hidden border-t border-border bg-background"
          role="dialog"
          aria-modal="true"
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-md px-3 py-2 text-base text-foreground/90 hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
