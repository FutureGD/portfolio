import type { TechStackCategory } from "./types";

/**
 * Tech stack rendered as grouped categories.
 *
 * Every entry below is a real tool I've actually worked with — not a
 * concept, not a Unity subsystem, not a generic CS term. Each entry has
 * a recognizable official brand icon (sourced from simpleicons.org or
 * the vendor's official brand assets).
 *
 * `iconPath` is a static asset path. At render time it goes through
 * the `withBasePath()` helper so it resolves correctly under GitHub
 * Pages' basePath. SVG icons live in `/public/icons/`.
 *
 * Editing workflow:
 *   - Add a tool = push one object into a category's `items[]`
 *   - Remove a tool = delete the object
 *   - Reorder = reorder the array
 */
export const techstack: TechStackCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "C#", iconPath: "/icons/csharp.svg" },
      { name: "C++", iconPath: "/icons/cpp.svg" },
      { name: "Python", iconPath: "/icons/python.svg" },
    ],
  },
  {
    category: "Game Engine & Tools",
    items: [
      { name: "Unity", iconPath: "/icons/unity.svg" },
      { name: "Blender", iconPath: "/icons/blender.svg" },
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      { name: "Firebase", iconPath: "/icons/firebase.svg" },
    ],
  },
  {
    category: "Version Control & DevOps",
    items: [
      { name: "Git", iconPath: "/icons/git.svg" },
      { name: "GitHub", iconPath: "/icons/github.svg" },
      { name: "GitHub Actions", iconPath: "/icons/github-actions.svg" },
    ],
  },
];
