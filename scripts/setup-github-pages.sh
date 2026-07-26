#!/usr/bin/env bash
#
# Interactive setup checklist for deploying this portfolio to GitHub Pages.
#
# Run it:  bash scripts/setup-github-pages.sh
#
# This script does NOT execute the deploy steps for you — too much
# irreversible action on your GitHub account for a script to take
# silently. Instead it prints each step, asks you to confirm you've done
# it, and gives the exact `gh` CLI command (or web-UI click path) to
# accomplish it.
#
# Prereqs:
#   - The GitHub CLI (`gh`) installed and authenticated
#     (https://cli.github.com). Verify with:  gh auth status
#   - Git installed and this repo initialized as a git repo.

set -euo pipefail

BOLD="\033[1m"
DIM="\033[2m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

confirm() {
  local prompt="$1"
  local default="${2:-y}"
  local hint
  if [[ "$default" == "y" ]]; then hint="[Y/n]"; else hint="[y/N]"; fi
  read -r -p "$(printf "${BOLD}${prompt}${RESET} ${hint} ")" answer
  answer="${answer:-$default}"
  case "$answer" in
    y|Y|yes|YES) return 0 ;;
    *) return 1 ;;
  esac
}

step() {
  echo
  printf "${GREEN}${BOLD}▶ $1${RESET}\n"
}

pause() {
  echo
  read -r -p "$(printf "${DIM}Press Enter when you've done the above…${RESET}")" _
}

# ---------------------------------------------------------------------------
# 0. Preflight
# ---------------------------------------------------------------------------

step "0. Preflight checks"

if ! command -v gh >/dev/null 2>&1; then
  printf "${YELLOW}gh CLI is not installed.${RESET}\n"
  echo "  Install it from https://cli.github.com and run:"
  echo "    gh auth login"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  printf "${YELLOW}gh is not authenticated.${RESET}\n"
  echo "  Run:  gh auth login"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf "${YELLOW}This directory is not a git repo yet.${RESET}\n"
  echo "  Run:  git init && git add -A && git commit -m 'initial commit'"
  exit 1
fi

GH_USER="$(gh api user --jq '.login')"
echo "  ✓ Authenticated as: ${GH_USER}"

# ---------------------------------------------------------------------------
# 1. Create the GitHub repo (if not already pushed)
# ---------------------------------------------------------------------------

step "1. Create + push the GitHub repo"

REMOTE_URL="$(git remote get-url origin 2>/dev/null || echo '')"
if [[ -z "$REMOTE_URL" ]]; then
  echo "  No 'origin' remote found. To create a new repo and push:"
  echo
  echo "    ${BOLD}gh repo create portfolio --public --source=. --remote=origin --push${RESET}"
  echo
  echo "  (Replace 'portfolio' with whatever name you want. The repo name"
  echo "   becomes part of the deployed URL: https://${GH_USER}.github.io/portfolio)"
  echo
  echo "  If your repo name is <your-username>.github.io, the site deploys"
  echo "  to the root URL https://${GH_USER}.github.io/ instead."
  pause
else
  echo "  ✓ origin remote already set: ${REMOTE_URL}"
fi

# ---------------------------------------------------------------------------
# 2. Configure Pages source = GitHub Actions
# ---------------------------------------------------------------------------

step "2. Set Pages source to GitHub Actions"

echo "  In your browser, open:"
echo
echo "    ${BOLD}https://github.com/${GH_USER}/portfolio/settings/pages${RESET}"
echo
echo "  (Adjust 'portfolio' to your actual repo name.)"
echo
echo "  Under 'Build and deployment → Source', select:"
echo "    ${BOLD}GitHub Actions${RESET}"
echo
echo "  This lets the .github/workflows/deploy.yml workflow deploy on push."
pause

# ---------------------------------------------------------------------------
# 3. Set NEXT_PUBLIC_BASE_PATH as a repo Variable
# ---------------------------------------------------------------------------

step "3. Set NEXT_PUBLIC_BASE_PATH repo Variable"

echo "  This MUST match your repo name exactly. The site breaks at every"
echo "  internal link without it."
echo
echo "  If your repo is named 'portfolio':"
echo
echo "    ${BOLD}gh variable set NEXT_PUBLIC_BASE_PATH --body '/portfolio'${RESET}"
echo
echo "  If your repo is named '<your-username>.github.io' (root deploy):"
echo
echo "    ${BOLD}gh variable set NEXT_PUBLIC_BASE_PATH --body ''${RESET}"
echo
echo "  (Use 'gh variable set' for non-secret values, 'gh secret set' for"
echo "   values you don't want visible in the Actions log.)"
pause

# ---------------------------------------------------------------------------
# 4. Set NEXT_PUBLIC_SITE_URL as a repo Variable (optional)
# ---------------------------------------------------------------------------

step "4. Set NEXT_PUBLIC_SITE_URL repo Variable (optional)"

echo "  The canonical deployed URL. Used in openGraph metadata so link"
echo "  previews on social media point to the right place."
echo
echo "    ${BOLD}gh variable set NEXT_PUBLIC_SITE_URL --body 'https://${GH_USER}.github.io/portfolio'${RESET}"
echo
echo "  (Adjust the URL to match your repo name.)"
pause

# ---------------------------------------------------------------------------
# 5. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT as a Secret
# ---------------------------------------------------------------------------

step "5. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT Secret (optional, enables contact form)"

echo "  1. Go to https://formspree.io and sign up with your email."
echo "  2. Click 'New Project' → name it 'Portfolio contact form'."
echo "  3. On the project page, copy the endpoint URL — it looks like:"
echo "       https://formspree.io/f/abcdwxyz"
echo "  4. Set it as a Secret in your repo:"
echo
echo "    ${BOLD}gh secret set NEXT_PUBLIC_FORMSPREE_ENDPOINT${RESET}"
echo "    ${DIM}(prompts you to paste the endpoint URL, hidden from terminal history)${RESET}"
echo
echo "  5. (Optional but recommended) Test end-to-end with:"
echo "       bash scripts/test-formspree.sh"
pause

# ---------------------------------------------------------------------------
# 6. Set NEXT_PUBLIC_RESUME_URL as a Secret (optional, enables resume button)
# ---------------------------------------------------------------------------

step "6. Add résumé PDF + set NEXT_PUBLIC_RESUME_URL Secret (optional)"

echo "  1. Drop your résumé PDF at:"
echo
echo "       ${BOLD}public/resume/resume.pdf${RESET}"
echo
echo "  2. Commit it:"
echo
echo "    ${BOLD}git add public/resume/resume.pdf && git commit -m 'add resume'${RESET}"
echo
echo "  3. Set the Secret:"
echo
echo "    ${BOLD}gh secret set NEXT_PUBLIC_RESUME_URL --body '/resume/resume.pdf'${RESET}"
pause

# ---------------------------------------------------------------------------
# 7. Push to main → first deploy
# ---------------------------------------------------------------------------

step "7. Push to main → first deploy"

echo "  Push to main:"
echo
echo "    ${BOLD}git push -u origin main${RESET}"
echo
echo "  Then watch the workflow:"
echo
echo "    ${BOLD}gh run watch${RESET}"
echo
echo "  When it finishes, your site is live at:"
echo "    https://${GH_USER}.github.io/portfolio"
echo "  (or https://${GH_USER}.github.io/ if your repo is a root repo)"
echo
echo "  A broken build will fail the workflow and NOT deploy. Fix the"
echo "  error, push again, repeat."

echo
printf "${GREEN}${BOLD}Setup checklist complete.${RESET}\n"
echo "  Re-run this script any time to walk through it again."
