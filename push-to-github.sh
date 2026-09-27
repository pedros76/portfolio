#!/usr/bin/env bash
set -e

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo "Usage: ./push-to-github.sh <GITHUB_REPO_URL>"
  echo "Example: ./push-to-github.sh git@github.com:yourusername/portfolio.git"
  echo "     or: ./push-to-github.sh https://github.com/yourusername/portfolio.git"
  exit 1
fi

echo "🔗 Setting up GitHub remote origin -> $REPO_URL..."

if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo "🚀 Pushing branch 'main' to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
