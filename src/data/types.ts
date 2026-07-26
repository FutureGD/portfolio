/**
 * Shared types for all portfolio content.
 *
 * Every data file imports from here — shape definitions are NEVER
 * duplicated across files. Adding a field to a type is a one-line
 * change here, and TypeScript will tell every data file that needs
 * to supply the new field.
 */

export type ProjectStatus = "completed" | "in-progress" | "prototype";

export type ProjectMedia = {
  /** Optional gameplay clip / GIF / video — NOT required per project. */
  type: "gif" | "video";
  /** Path is basePath-aware at consumption time via the asset helper. */
  src: string;
};

export type ProjectCaseStudy = {
  problem: string;
  approach: string;
  challenge: string;
  outcome: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  /** 1–2 sentences, plain text — shown on the card itself. */
  description: string;
  /** Optional deep-dive shown in the "View details" expansion. */
  caseStudy?: ProjectCaseStudy;
  tech: string[];
  /** Static image path (basePath-aware at consumption time). */
  thumbnail: string;
  /** Optional gameplay clip / GIF. Projects without this render an empty state. */
  media?: ProjectMedia;
  /**
   * Link to THIS project's own repo. NEVER a generic profile link.
   * If a project has no public repo, omit the field entirely.
   */
  codeUrl?: string;
  /** Playable / WebGL build link, if one exists. */
  demoUrl?: string;
};

export type EducationEntry = {
  title: string;
  org: string;
  /** Optional — omit if not applicable or not yet known. */
  location?: string;
  dateRange: string;
};

export type ExperienceEntry = EducationEntry & {
  /** Optional one-line summary of the role. Omit if a real one isn't ready. */
  summary?: string;
};

export type TechStackItem = {
  name: string;
  /** basePath-aware path to an SVG/PNG icon in /public. */
  iconPath: string;
};

export type TechStackCategory = {
  category: string;
  items: TechStackItem[];
};

export type Profile = {
  name: string;
  /** Optional nickname / handle shown in the navbar logo. */
  displayName?: string;
  /** Short role/title shown as the hero H1 — distinct from `bio`. */
  tagline: string;
  /** City, State/Country — shown in the hero. */
  location: string;
  /**
   * Single source of truth for the About section. Each array entry is
   * rendered as its own paragraph.
   *
   * The hero does NOT duplicate this text — it shows `tagline` and
   * `location` only. This is intentional: the Definition of Done
   * forbids verbatim-duplicated text across sections.
   */
  bio: string[];
  /** Contact channels rendered in the Contact section. */
  contact: {
    email: string;
    github: string;
    linkedin?: string;
    bluesky?: string;
  };
  /** Where the site is deployed — used in openGraph. Optional. */
  siteUrl?: string;
  /**
   * Real resume file path. Empty string => resume button is visibly
   * disabled with a tooltip. Until a real PDF exists, this stays empty.
   */
  resumeUrl: string;
  /**
   * Formspree endpoint. Empty string => contact form is visibly disabled
   * with a tooltip. Until a real endpoint exists, this stays empty.
   */
  formspreeEndpoint: string;
};
