"use client";

import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        <p>
          © {year} {profile.name}. Built with Next.js, TypeScript, and Tailwind
          CSS. Deployed to GitHub Pages.
        </p>
        <p>
          <Link href="/#home" className="hover:text-foreground">
            Back to top
          </Link>
        </p>
      </div>
    </footer>
  );
}
