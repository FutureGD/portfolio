import type { EducationEntry, ExperienceEntry } from "./types";

/**
 * Real education and experience entries.
 *
 * Editing workflow:
 *   - Add an entry = push an object into the relevant array
 *   - Remove an entry = delete the object
 *   - Reorder = reorder the array; the UI renders in array order
 *
 * Optional fields (`location`, `summary`) are omitted entirely when a
 * real value isn't available yet, rather than filled with placeholder
 * text. The component renders conditionally on field presence.
 */
export const education: EducationEntry[] = [
  {
    title: "B.Tech, Computer Science & Engineering",
    org: "Haridwar University (Roorkee College of Engineering)",
    location: "Roorkee, Uttarakhand",
    dateRange: "2023 — 2027 (expected) · 78% aggregate",
  },
  {
    title: "Senior Secondary (XII), Science",
    org: "Kendriya Vidyalaya DVC BTPS",
    location: "Bokaro Thermal, Jharkhand",
    dateRange: "2023 (CBSE)",
  },
  {
    title: "Secondary (X)",
    org: "Kendriya Vidyalaya DVC BTPS",
    location: "Bokaro Thermal, Jharkhand",
    dateRange: "2021 (CBSE)",
  },
];

export const experience: ExperienceEntry[] = [
  {
    title: "Unity Developer Intern",
    org: "Rural Games (Indie Game Studio)",
    location: "Remote",
    dateRange: "Jul 2026 — Present",
    summary:
      "Working on gameplay scripting in Unity. Most of my time goes into cleaning up how the game's systems are wired together so the team can build on them more easily, and fixing bugs that come up during playtesting.",
  },
];
