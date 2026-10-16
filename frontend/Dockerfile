# Multi-stage Dockerfile for Portfolio Frontend (React 19 + Vite)
FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy root workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY frontend/package.json ./frontend/

# Install dependencies strictly
RUN pnpm install --frozen-lockfile --filter frontend

# Copy frontend source and configs
COPY frontend ./frontend

# Build Vite React app for production
RUN pnpm --filter frontend build

# Stage 2: Production HTTP server using lightweight Nginx
FROM docker.io/library/nginx:alpine AS runner

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts from builder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
