# Résumé folder

Drop your real résumé PDF in this folder, named `resume.pdf`.

```
public/resume/
└── resume.pdf   ← you provide this
```

Then uncomment the corresponding line in `.env.local`:

```env
NEXT_PUBLIC_RESUME_URL=/resume/resume.pdf
```

Restart the dev server (`npm run dev`) and the "Download résumé" button in the hero will switch from disabled-with-tooltip to a working download link.

## For deployment

The file in this folder is shipped as-is in the static export. No additional setup needed — once you've added the PDF locally, committed it, and set `NEXT_PUBLIC_RESUME_URL=/resume/resume.pdf` as a GitHub Secret, the deployed site will serve it at `https://<your-username>.github.io/<repo>/resume/resume.pdf`.

## What NOT to do

- Don't name the file anything other than `resume.pdf` unless you also update `NEXT_PUBLIC_RESUME_URL` to match.
- Don't put the file at `/public/resume.pdf` (root of public) — keeping it in this subfolder leaves room for future files like `cover-letter.pdf` without cluttering the root.
- Don't link to a Google Drive or Dropbox URL via `NEXT_PUBLIC_RESUME_URL` — those URLs are unreliable (they change visibility rules, require login, get rate-limited). Always ship the actual PDF file.
