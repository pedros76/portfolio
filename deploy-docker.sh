#!/usr/bin/env bash
set -e

echo "🚀 Building and starting Peter Kiplagat Misik Portfolio Docker Container..."

# Load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Determine docker compose command
if command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
  COMPOSE_CMD="docker compose"
elif command -v podman-compose &> /dev/null; then
  COMPOSE_CMD="podman-compose"
else
  COMPOSE_CMD="docker compose"
fi

echo "📦 Using Compose Command: $COMPOSE_CMD"

# Build and start container in detached mode
$COMPOSE_CMD up -d --build

echo ""
echo "✅ Portfolio is running in Docker!"
echo "🌐 Access URL: http://localhost:3000"
echo "📊 Container status: $COMPOSE_CMD ps"
echo "📜 View logs:       $COMPOSE_CMD logs -f"
