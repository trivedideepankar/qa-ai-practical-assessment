#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f PrismStructure/package.json ]]; then
  echo "error: PrismStructure/ not found — clone the assessment framework branch or merge it into this revision."
  exit 1
fi

cd PrismStructure

if [[ ! -f package-lock.json ]]; then
  echo "error: PrismStructure/package-lock.json is required for npm ci"
  exit 1
fi

npm ci

if [ ! -f .env ]; then
  cp .env.example .env
fi

# UI tests use channel: "chrome" (system Chrome). Cursor images include Chrome; skip
# playwright install-deps here (it can fail on Ubuntu 24.04 package renames).
npx playwright install chromium
