import type { NextConfig } from "next";

/**
 * Static-export configuration for GitHub Pages.
 *
 * - `output: 'export'` produces a fully static `out/` directory.
 * - `basePath` MUST match the GitHub repo name exactly (e.g. `/portfolio`).
 *   It is read from `NEXT_PUBLIC_BASE_PATH` so the same code runs cleanly
 *   in local dev (where basePath must be empty) and in production.
 *   Set `NEXT_PUBLIC_BASE_PATH=/your-repo-name` as a repository-level
 *   variable in GitHub before deploying.
 * - `images.unoptimized: true` is required because GitHub Pages has no
 *   Next.js image optimizer.
 * - `trailingSlash: true` avoids 404s on GitHub Pages' static routing.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  // Static export cannot rely on build-time type-inference safety net
  // because the user will run `npm run build` themselves; surface real
  // type errors so a broken build visibly fails in CI.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
