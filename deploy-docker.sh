#!/usr/bin/env bash
set -e

echo "🚀 Building and deploying Peter Kiplagat Misik Portfolio (Frontend & Backend)..."

# Load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Detect Compose or Container engine
if command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
  COMPOSE_CMD="docker compose"
elif podman compose version &> /dev/null; then
  COMPOSE_CMD="podman compose"
else
  COMPOSE_CMD=""
fi

if [ -n "$COMPOSE_CMD" ]; then
  echo "📦 Using Compose engine: $COMPOSE_CMD"
  $COMPOSE_CMD build
  $COMPOSE_CMD up -d
else
  DOCKER_BIN=$(command -v docker || command -v podman)
  echo "📦 Using Container engine: $DOCKER_BIN"
  $DOCKER_BIN build -f backend/Dockerfile -t peter-portfolio-backend:latest .
  $DOCKER_BIN build -f frontend/Dockerfile -t peter-portfolio-frontend:latest .
  $DOCKER_BIN stop peter-portfolio-backend peter-portfolio-frontend 2>/dev/null || true
  $DOCKER_BIN rm peter-portfolio-backend peter-portfolio-frontend 2>/dev/null || true
  $DOCKER_BIN run -d --name peter-portfolio-backend -p 5000:5000 --restart unless-stopped peter-portfolio-backend:latest
  $DOCKER_BIN run -d --name peter-portfolio-frontend -p 3000:80 --restart unless-stopped peter-portfolio-frontend:latest
fi

echo ""
echo "✅ Portfolio services are running!"
echo "🌐 Frontend URL: http://localhost:3000"
echo "🔌 Backend API URL: http://localhost:5000/api/health"
