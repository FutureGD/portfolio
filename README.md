# Portfolio Website

A single-page personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Static-exported for GitHub Pages — no backend, no database, no CMS.

All content lives in typed TypeScript data files under `src/data/`. Adding, removing, or reordering a project is a one-line change in `src/data/projects.ts` — no component code needs to change.

---

## Stack

- **Next.js 16** (App Router, `output: 'export'`)
- **TypeScript 5** (strict)
- **Tailwind CSS 4** with **shadcn/ui** (New York)
- **next-themes** for dark mode
- Static export → GitHub Pages via GitHub Actions

## Site structure

A single page with anchor navigation, in this order:

```
Hero → About → Education & Experience → Projects → Tech Stack → Contact
```

## Content architecture

Every section's content lives in its own typed data file:

```
src/data/
├── types.ts        # shared types — never duplicate a shape
├── profile.ts      # name, tagline, location, bio (single source), contact info
├── education.ts    # education[] + experience[] (typed)
├── projects.ts     # real projects (currently empty — fills in over time)
└── techstack.ts    # tech stack grouped by category (currently empty)
```

Each array-based file exports a strongly-typed array. The `Project` type is defined once in `types.ts` and imported everywhere.

### Editing workflow

| Operation | What to do | Files touched |
|-----------|------------|---------------|
| Add a project | push one object into `projects[]` | `projects.ts` only |
| Remove a project | delete the object | `projects.ts` only |
| Reorder projects | reorder the array | `projects.ts` only |
| Add a tech skill | push one object into a category's `items[]` | `techstack.ts` only |
| Update bio | edit `profile.bio` | `profile.ts` only |

No component code ever needs to change for content edits.

### Empty states

When `projects.ts` or `techstack.ts` is an empty array, the corresponding section renders a clear "Nothing here yet" empty state — it does not break. This is the current state of both files: real entries will be added by hand once they exist.

---

## Configuration (env vars)

All env vars are read at build time. Set them in `.env.local` for local dev, or as repo Variables / Secrets in GitHub for production (Settings → Secrets and variables → Actions).

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_BASE_PATH` | `""` | Must match your GitHub repo name, e.g. `/portfolio`. Leave empty for `*.github.io` root repos. |
| `NEXT_PUBLIC_SITE_URL` | `""` | Optional canonical URL for openGraph metadata. |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | `""` | Formspree POST URL for the contact form. When empty, the form is visibly disabled with a tooltip. |
| `NEXT_PUBLIC_RESUME_URL` | `""` | Path or URL to your résumé PDF. When empty, the "Download résumé" button is visibly disabled with a tooltip. |

Until `NEXT_PUBLIC_FORMSPREE_ENDPOINT` and `NEXT_PUBLIC_RESUME_URL` are set, the corresponding UI elements are visibly disabled with tooltips — they never appear functional but silently do nothing.

---

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

The dev server runs without a `basePath` (so the preview URL works as expected). The `basePath` only matters for the production static export — see the next section.

### Lint

```bash
npm run lint
```

---

## Deploy to GitHub Pages

### One-time setup

1. Push this repo to GitHub.
2. In your repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. In your repo: **Settings → Secrets and variables → Actions → Variables tab → New variable**:
   - Name: `NEXT_PUBLIC_BASE_PATH`
   - Value: `/<your-repo-name>` (e.g. `/portfolio`)
   - Leave empty if your repo is named `<your-username>.github.io`.
4. (Optional) Add a Variable for the canonical site URL:
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://futuregd.github.io/portfolio`
5. (Optional) Add Secrets for the form and résumé:
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — your Formspree POST URL
   - `NEXT_PUBLIC_RESUME_URL` — path or URL to your résumé PDF

### About `package-lock.json`

The CI workflow uses `npm ci`, which requires a committed `package-lock.json`. This repo ships with one. If you add or upgrade dependencies locally with `bun` (which uses `bun.lock`), regenerate the npm lock file before pushing:

```bash
npm install --no-audit --no-fund
git add package-lock.json
git commit -m "chore: refresh package-lock.json"
```

### On every push to `main`

The `.github/workflows/deploy.yml` workflow:

1. Runs `npm ci`
2. Runs `npm run build` with your repo's variables and secrets
3. Creates `out/.nojekyll` (so GitHub Pages doesn't try to Jekyll-process `_next/`)
4. Uploads `./out` as a Pages artifact
5. Deploys

A failed build blocks the deploy — broken code never ships live.

### Why these config knobs exist

`next.config.ts` sets:

- `output: 'export'` — produces a fully static `out/` directory
- `basePath` (from `NEXT_PUBLIC_BASE_PATH`) — must match your repo name exactly. Without it, every internal link 404s on `https://<user>.github.io/<repo>/`.
- `images.unoptimized: true` — disables Next.js's image optimizer (which needs a server). Required for static export.
- `trailingSlash: true` — avoids 404s on GitHub Pages' static routing for nested paths.

`.nojekyll` in the output — without it, GitHub Pages silently tries to Jekyll-process `_next/` and breaks asset loading.

### basePath-safe asset paths

Next.js's `<Link>` and `next/image` automatically prepend `basePath`. But any string path that bypasses those — a plain `<img src>`, a CSS `url()`, a dynamically-built asset path — will silently break in production.

This project centralizes that rule in `src/lib/asset.ts`:

```ts
import { withBasePath } from "@/lib/asset";

<img src={withBasePath("/projects/foo.gif")} />
```

Every string asset path in the codebase goes through `withBasePath()`. If you add a new asset path, do the same.

---

## Definition of Done — verified

- Every project's `codeUrl` points to that project's own repo, never a shared profile link. (Currently no projects — N/A until real ones exist.)
- The "Download résumé" button is either a real download link or visibly disabled with a tooltip explaining it's not ready yet — never a bare `href="#"`. **Currently disabled** until `NEXT_PUBLIC_RESUME_URL` is set.
- The contact form is wired to Formspree (set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`). When the endpoint is not set, the form is visibly disabled with a tooltip — never a silent no-op. **Currently disabled** until `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set.
- No text content is duplicated verbatim across sections. The hero shows `tagline` and `location` only; the About section shows `bio` (the single source). These are distinct strings.
- Meta tags/description only claim content, sections, or skills that actually exist on the page. With `projects.ts` and `techstack.ts` both empty, the description and keywords intentionally do not mention project titles or specific tech-stack tools.
- Decorative duplicate text (the giant "FUTURE" wordmark behind the hero) is marked `aria-hidden`.
- The site builds cleanly with the current (empty) data files.
- `basePath` resolves correctly for every asset and internal link in the deployed build. Verified previously by building with `NEXT_PUBLIC_BASE_PATH=/portfolio` and grepping the built HTML — all `src`/`href` asset references are correctly prefixed. This includes the favicon, which required running `metadata.icons.icon` through `withBasePath()` because Next.js 16 does not auto-prefix it.
- `.nojekyll` is present in the deployed output. Verified: `out/.nojekyll` exists after `next build` (copied from `public/.nojekyll`), and the workflow also runs `touch out/.nojekyll` as belt-and-suspenders.
- The GitHub Actions workflow runs on push to `main`; a broken build visibly fails instead of deploying.

---

## Future scaling note

If real backend functionality is ever needed (SSR, a database, server actions), Vercel removes the need for the static-export and `basePath` workarounds above. Not required for the current scope — worth knowing only as a ceiling, not a next step.

---

## TODO list (fill in by hand)

These are intentionally left empty until real values exist. Don't invent placeholders.

- [ ] Add real projects to `src/data/projects.ts`
- [ ] Add real tech-stack entries to `src/data/techstack.ts`
- [ ] Add the internship location to the Rural Games entry in `src/data/education.ts` (currently omitted)
- [ ] Add a one-line summary to the Rural Games entry in `src/data/education.ts` (currently omitted)
- [ ] Set `NEXT_PUBLIC_RESUME_URL` (and add a real PDF to `/public/`)
- [ ] Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (and test the contact form end-to-end)
- [ ] Set `NEXT_PUBLIC_SITE_URL` once the GitHub Pages URL is known
- [ ] Replace `public/favicon.svg` with a real favicon if desired
