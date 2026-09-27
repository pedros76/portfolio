# Multi-stage Dockerfile for Peter Kiplagat Misik Portfolio
# Stage 1: Build production bundle
FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies strictly
RUN pnpm install --frozen-lockfile

# Copy source code and config
COPY . .

# Build Vite React app for production
ARG VITE_NVIDIA_API_KEY
ARG VITE_NVIDIA_MODEL=meta/llama-3.2-11b-vision-instruct
ENV VITE_NVIDIA_API_KEY=$VITE_NVIDIA_API_KEY
ENV VITE_NVIDIA_MODEL=$VITE_NVIDIA_MODEL

RUN pnpm build

# Stage 2: Production HTTP server using lightweight Nginx
FROM docker.io/library/nginx:alpine AS runner


# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
