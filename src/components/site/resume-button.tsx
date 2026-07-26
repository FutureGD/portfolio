"use client";

import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

/**
 * Resume download button.
 *
 * Only rendered by the hero when `profile.resumeUrl` is truthy — so this
 * component always has a real URL to link to. No disabled/locked state,
 * no tooltip, no bare `href="#"`.
 *
 * To enable: drop a real PDF at `public/resume/resume.pdf` and set
 * `NEXT_PUBLIC_RESUME_URL=/resume/resume.pdf` (locally in `.env.local`,
 * or as a repo Secret for production).
 */
export function ResumeButton() {
  if (!profile.resumeUrl) return null;
  return (
    <Button asChild size="lg" variant="outline">
      <a href={profile.resumeUrl} download>
        <FileDown className="mr-2 h-4 w-4" aria-hidden />
        Download résumé
      </a>
    </Button>
  );
}
