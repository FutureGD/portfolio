import type { Profile } from "./types";

/**
 * Single source of truth for personal info.
 *
 * Editing workflow:
 *   - Update a field here → it propagates everywhere it's used.
 *   - `bio` is the ONLY bio on the site. The hero uses `tagline` and
 *     `location` instead — never a copy of `bio`.
 *
 * `resumeUrl` and `formspreeEndpoint` are read from environment variables
 * so the deployed build never accidentally ships a bare `href="#"` resume
 * link or a contact form with no handler. When the env var is missing,
 * the field stays `""` and the corresponding UI is *visibly disabled* with
 * a tooltip explaining it's not ready yet — never a silent no-op.
 */
export const profile: Profile = {
  name: "Bhavishya Gupta",
  // Goes by "Future" online — shown in the navbar logo.
  displayName: "Future",
  tagline: "Game Developer / Gameplay Programmer",
  location: "Roorkee, Uttarakhand",
  // Single bio, used ONLY in the About section. Honest and understated —
  // reflects what's actually on the résumé without inflating it.
  bio: [
    "I'm Bhavishya — most people online know me as Future. I'm a B.Tech Computer Science student at Haridwar University in Roorkee, and I build games in Unity (C#) on the side.",
    "Right now I'm a Unity Developer Intern at Rural Games, an indie studio, where I work on gameplay scripting and helping keep the codebase clean as the game grows. The work is mostly refactoring systems so the team can build on them more easily and fixing bugs that come up during playtesting.",
    "Before the internship I cut my teeth on a series of personal projects — a 3D endless runner, classic-game prototypes like Pong and Brick Breaker, and a 2D platformer shooter. The biggest one I've taken on is Arena Survivor, a scalable multiplayer arena game built with Unity 6, Netcode for GameObjects, Firebase, and a C++ native plugin for A* pathfinding that's roughly 2x faster than the equivalent C# implementation.",
    "I got into game development because I wanted to understand how the games I enjoyed actually worked. That's still what pulls me in — the engineering behind game feel, character controllers, and the systems that make a player's inputs land the way they should. This site is a place to keep track of what I'm working on as that list grows over time.",
  ],
  contact: {
    email: "futureji2025@gmail.com",
    github: "https://github.com/FutureGD",
    linkedin: "https://www.linkedin.com/in/future-ji",
    // No Bluesky account to link yet. Omit the field entirely rather
    // than leaving a placeholder URL.
  },
  // TODO: set NEXT_PUBLIC_SITE_URL once the GitHub Pages URL is known
  // (likely https://futuregd.github.io/portfolio or similar). Until
  // then, openGraph `url` is omitted from the metadata.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  // Résumé PDF lives at public/resume/resume.pdf. The env var is set
  // in .env.local and (for production) as a GitHub Secret.
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "",
  // Contact form was removed from the site — direct email/GitHub/LinkedIn
  // links are used instead. The endpoint field stays for type completeness
  // but is unused by any component now.
  formspreeEndpoint: "",
};
