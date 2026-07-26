/**
 * Asset path helpers that respect the configured `basePath`.
 *
 * Why this exists: Next.js's `<Link>` and `next/image` automatically
 * prepend `basePath`. But any string path that bypasses those — an
 * `<img src>`, a CSS `url()`, a dynamically-built asset path — will
 * silently break in production because it skips `basePath`. Hardcoded
 * absolute paths that skip basePath are the most common
 * "works locally, breaks live" bug on GitHub Pages deployments.
 *
 * Rule: every string asset path goes through `withBasePath()`.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepend the configured basePath to a string asset path.
 *
 * Pass `/foo.png` and get back `/foo.png` locally or
 * `/your-repo-name/foo.png` in production.
 *
 * Idempotent: if the path already starts with the basePath it is
 * returned untouched, so it is safe to call on paths that may or may
 * not have been pre-prefixed.
 */
export function withBasePath(path: string): string {
  if (!path) return path;
  if (!BASE_PATH) return path;
  if (path.startsWith(BASE_PATH)) return path;
  // External URLs (http/https/data/protocol-relative) must not be prefixed.
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  // Ensure exactly one slash between basePath and the path.
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
