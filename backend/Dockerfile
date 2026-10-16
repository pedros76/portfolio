# Multi-stage Dockerfile for Portfolio Backend (Node.js + Express + TypeScript)
FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy root workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend/package.json ./backend/

# Install dependencies strictly
RUN pnpm install --frozen-lockfile --filter backend

# Copy backend source
COPY backend ./backend

# Build backend TypeScript
RUN pnpm --filter backend build

# Production runner stage
FROM docker.io/library/node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend/package.json ./backend/

RUN pnpm install --prod --frozen-lockfile --filter backend

COPY --from=builder /app/backend/dist ./backend/dist

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "backend/dist/server.js"]
