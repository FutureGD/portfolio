"use client";

import { useState } from "react";
import Image from "next/image";
import { Film, ImageIcon, Play, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/asset";
import type { ProjectMedia } from "@/data/types";

/**
 * Media player for a project's optional gameplay clip / GIF / video.
 *
 * Renders a hover-to-play GIF (lazy-loaded), a `<video>` for clip files,
 * or a graceful empty-state if the source fails to load — which exercises
 * the "project has media declared, but the file is missing/invalid" path
 * that ships with placeholder assets.
 *
 * IMPORTANT: the parent MUST pass a stable `key` (e.g. `key={media.src}`)
 * so React remounts this component when the source changes. That lets us
 * reset the internal `failed` state via remount instead of via an effect,
 * which is the React-recommended pattern for "reset state on prop change".
 */
export function ProjectMedia({
  media,
  thumbnail,
  title,
}: {
  media: ProjectMedia;
  thumbnail: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (failed) {
    return (
      <FailedMediaFallback
        thumbnail={thumbnail}
        title={title}
        message={`${media.type.toUpperCase()} could not be loaded. Replace the placeholder file in /public/projects/ with a real clip.`}
      />
    );
  }

  if (media.type === "gif") {
    // Lazy-load the GIF: only mount the <img> when the user hovers. Avoids
    // autoplaying 50MB of GIFs on a 5-card grid.
    return (
      <div
        className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted"
        onMouseEnter={() => setPlaying(true)}
        onFocus={() => setPlaying(true)}
        onMouseLeave={() => setPlaying(false)}
        onBlur={() => setPlaying(false)}
      >
        <Image
          src={withBasePath(thumbnail)}
          alt={`${title} thumbnail`}
          fill
          unoptimized
          className={cn(
            "object-cover transition-opacity",
            playing ? "opacity-0" : "opacity-100"
          )}
          sizes="(min-width: 768px) 400px, 100vw"
        />
        {playing && (
          <img
            src={withBasePath(media.src)}
            alt={`${title} gameplay GIF`}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        )}
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
          <ImageIcon className="h-3 w-3" aria-hidden />
          GIF · hover to play
        </span>
      </div>
    );
  }

  // video
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-black">
      <video
        src={withBasePath(media.src)}
        poster={withBasePath(thumbnail)}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full"
        onError={() => setFailed(true)}
      >
        Your browser does not support the video tag.
      </video>
      <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
        <Film className="h-3 w-3" aria-hidden />
        Video
      </span>
    </div>
  );
}

/**
 * Empty-state for projects that declare media but whose file failed to load
 * (the placeholder .gif / .mp4 files in /public trigger this intentionally
 * so the fallback layout is visually verifiable).
 */
function FailedMediaFallback({
  thumbnail,
  title,
  message,
}: {
  thumbnail: string;
  title: string;
  message: string;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-dashed border-amber-500/50 bg-muted">
      <Image
        src={withBasePath(thumbnail)}
        alt={`${title} thumbnail`}
        fill
        unoptimized
        className="object-cover opacity-50"
        sizes="(min-width: 768px) 400px, 100vw"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 p-4 text-center">
        <AlertCircle className="h-6 w-6 text-amber-500" aria-hidden />
        <p className="text-xs text-foreground/80">{message}</p>
      </div>
      <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
        <Play className="h-3 w-3" aria-hidden />
        Media unavailable
      </span>
    </div>
  );
}

/**
 * Empty-state for projects that declare NO media field at all. Renders
 * only the thumbnail with a small badge so the card has visual weight
 * equivalent to media-bearing cards.
 */
export function NoMedia({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
      <Image
        src={withBasePath(thumbnail)}
        alt={`${title} thumbnail`}
        fill
        unoptimized
        className="object-cover"
        sizes="(min-width: 768px) 400px, 100vw"
      />
      <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
        <ImageIcon className="h-3 w-3" aria-hidden />
        No clip
      </span>
    </div>
  );
}
