#!/usr/bin/env bash
set -e

echo "🚀 Building and deploying Peter Kiplagat Misik Portfolio Docker Container..."

# Load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

DOCKER_BIN=$(command -v docker || command -v podman)

echo "📦 Using Engine: $DOCKER_BIN"

# Build image with native engine
$DOCKER_BIN build -t peter-portfolio:latest \
  --build-arg VITE_GEMINI_API_KEYS="${VITE_GEMINI_API_KEYS}" \
  --build-arg VITE_GEMINI_MODEL="${VITE_GEMINI_MODEL:-gemini-3.5-flash-lite}" \
  .

# Run container via Compose or standalone Docker
if command -v docker-compose &> /dev/null; then
  docker-compose up -d
elif docker compose version &> /dev/null; then
  docker compose up -d
else
  $DOCKER_BIN stop peter-portfolio 2>/dev/null || true
  $DOCKER_BIN rm peter-portfolio 2>/dev/null || true
  $DOCKER_BIN run -d --name peter-portfolio -p 3000:80 --restart unless-stopped peter-portfolio:latest
fi

echo ""
echo "✅ Portfolio is running in Docker!"
echo "🌐 Access URL: http://localhost:3000"
echo "📊 Container status: $DOCKER_BIN ps"
