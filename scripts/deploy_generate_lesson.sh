#!/usr/bin/env bash
set -euo pipefail

# One-click deploy script for the `generate-lesson` Supabase Edge Function
# Usage:
#   OPENAI_API_KEY="sk-..." bash scripts/deploy_generate_lesson.sh
# Or run interactively and follow prompts.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_REF="srojyfmzydftmuemlciz"

echo "Starting deploy script for generate-lesson function"

if ! command -v npx >/dev/null 2>&1; then
  echo "ERROR: 'npx' not found. Please install Node.js/npm or run the install step below."
  echo "To install Node/npm on Debian/Ubuntu: sudo apt install nodejs npm"
  exit 1
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "Supabase CLI not found — using 'npx supabase' for a one-shot run."
  SUPABASE_CLI_CMD="npx supabase"
else
  SUPABASE_CLI_CMD="supabase"
fi

# Allow overriding project ref via env
if [ -n "${PROJECT_REF_OVERRIDE:-}" ]; then
  PROJECT_REF="$PROJECT_REF_OVERRIDE"
fi

echo "Using Supabase project ref: $PROJECT_REF"

# Ensure OPENAI_API_KEY is set
if [ -z "${OPENAI_API_KEY:-}" ]; then
  read -r -p "OPENAI_API_KEY not set. Enter it now (will be stored as a project secret): " -s OPENAI_API_KEY
  echo
  if [ -z "$OPENAI_API_KEY" ]; then
    echo "No API key provided — aborting."
    exit 1
  fi
fi

echo "Setting OpenAI secret in Supabase (will overwrite existing value)..."
${SUPABASE_CLI_CMD} secrets set OPENAI_API_KEY="$OPENAI_API_KEY" --project-ref $PROJECT_REF

echo "Deploying function 'generate-lesson'..."
${SUPABASE_CLI_CMD} functions deploy generate-lesson --project-ref $PROJECT_REF

echo "Deployment complete. You can test the function with:"
echo "  ${SUPABASE_CLI_CMD} functions invoke generate-lesson --project-ref $PROJECT_REF --body '{\"topic\":\"Photosynthesis\",\"subject\":\"Biology\",\"exam_type\":\"neet\"}'"

echo "Done."
