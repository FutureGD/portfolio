#!/usr/bin/env bash
#
# Send a real test submission to your Formspree endpoint and report
# whether it landed successfully.
#
# Prereqs:
#   - Your Formspree endpoint URL is set in .env.local as
#     NEXT_PUBLIC_FORMSPREE_ENDPOINT
#   - `curl` is installed (it's on every Linux/macOS by default)
#
# What it does:
#   1. Reads NEXT_PUBLIC_FORMSPREE_ENDPOINT from .env.local
#   2. POSTs a clearly-marked test message to that endpoint
#   3. Prints the HTTP status + Formspree's response body
#   4. Tells you to check your email (Formspree forwards submissions
#      to the email you signed up with)
#
# What it does NOT do:
#   - Anything else. No spam, no automation, no scheduled sends.

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

ENV_FILE="$(dirname "$0")/../.env.local"

if [[ ! -f "$ENV_FILE" ]]; then
  printf "${RED}.env.local not found at ${ENV_FILE}${RESET}\n" >&2
  printf "Copy .env.example to .env.local first:\n" >&2
  printf "  cp .env.example .env.local\n" >&2
  exit 1
fi

# Read NEXT_PUBLIC_FORMSPREE_ENDPOINT from .env.local (ignore comments/blanks)
ENDPOINT="$(grep -E '^NEXT_PUBLIC_FORMSPREE_ENDPOINT=' "$ENV_FILE" | sed -E 's/^NEXT_PUBLIC_FORMSPREE_ENDPOINT=//' | tr -d '\"' || true)"

if [[ -z "$ENDPOINT" ]]; then
  printf "${YELLOW}NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set in .env.local${RESET}\n" >&2
  printf "Uncomment the line and paste your Formspree endpoint URL.\n" >&2
  exit 1
fi

printf "${BOLD}Sending test submission to:${RESET} ${ENDPOINT}\n\n"

# Formspree accepts standard form-encoded POSTs. The `name`, `email`,
# `_subject` fields are conventional; Formspree uses them in the
# notification email it forwards to you.
RESPONSE_FILE="$(mktemp)"
HTTP_CODE="$(curl -s -o "$RESPONSE_FILE" -w "%{http_code}" \
  -X POST "$ENDPOINT" \
  -H "Accept: application/json" \
  --data-urlencode "name=Portfolio Test Script" \
  --data-urlencode "email=test@example.com" \
  --data-urlencode "_subject=[Portfolio] Test submission from test-formspree.sh" \
  --data-urlencode "message=This is a test submission from scripts/test-formspree.sh. If you received this, your Formspree endpoint is wired up correctly. You can safely ignore this email.")"

BODY="$(cat "$RESPONSE_FILE")"
rm -f "$RESPONSE_FILE"

printf "${BOLD}HTTP status:${RESET} ${HTTP_CODE}\n"
printf "${BOLD}Response body:${RESET}\n${BODY}\n\n"

case "$HTTP_CODE" in
  200|201|202)
    printf "${GREEN}✓ Submission accepted by Formspree.${RESET}\n"
    printf "  Check the email inbox you signed up to Formspree with — a\n"
    printf "  notification email should arrive within ~1 minute.\n"
    printf "  If it doesn't arrive, check your Formspree dashboard:\n"
    printf "    https://formspree.io/dashboard\n"
    ;;
  *)
    printf "${RED}✗ Submission rejected (HTTP ${HTTP_CODE}).${RESET}\n" >&2
    printf "  Common causes:\n" >&2
    printf "    - Wrong endpoint URL (check for typos in .env.local)\n" >&2
    printf "    - Endpoint disabled in Formspree dashboard\n" >&2
    printf "    - Formspree rate-limit (free tier: 50 submissions/month)\n" >&2
    printf "  Full response body is printed above.\n" >&2
    exit 1
    ;;
esac
