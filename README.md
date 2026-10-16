# Peter Kiplagat Misik — Modern Personal Portfolio

A professional, high-performance, dark-mode portfolio platform engineered for **Peter Kiplagat Misik**, an Information Technology student and aspiring Software Developer & Network Engineer at **Taita Taveta University** (Bachelor of Science in Information Technology).

Architected as a modern **decoupled monorepo** separating the **Frontend SPA** from the **Backend REST API Server**.

---

## ⚡ Architecture & Tech Stack

```
portfolio/
├── frontend/             # React 19 + Vite + Tailwind CSS + Framer Motion (SPA)
│   ├── src/              # UI components, pages, hooks, state
│   ├── public/           # Static assets, CV.pdf, favicon
│   └── Dockerfile        # Multi-stage production build + Nginx runner
│
├── backend/              # Node.js + Express + TypeScript (REST API)
│   ├── src/              # API routes, Gemini service, RAG engine, email service
│   └── Dockerfile        # Multi-stage production build + Node 22 runner
│
├── docker-compose.yml    # Orchestrates frontend (port 3000) & backend (port 5000)
├── nginx.conf            # Reverse-proxies /api/ to backend & serves static SPA
└── pnpm-workspace.yaml   # Monorepo workspace configuration
```

### Frontend (`/frontend`)
- **Core Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism + Matrix Grid FX
- **Animations**: Framer Motion 13 (page transitions, typewriter, floating badges)
- **Routing**: React Router DOM v7 (with lazy loading & code splitting)
- **Client Features**:
  - Live search & category filters for projects
  - Deep-dive project case studies (`/project/:id`)
  - Linux terminal avatar visualization
  - In-app PDF resume modal with download and print
  - Interactive AI representative chat window
  - Contact form with validation & confetti celebration

### Backend (`/backend`)
- **Server Framework**: Node.js 22 + Express + TypeScript
- **Validation**: Zod schema validation for all endpoints
- **AI Engine**: Server-side Google Gemini multi-key rotation pool with automatic cooldown circuit breaker & offline RAG fallback
- **Endpoints**:
  - `GET  /api/health` — Service health & uptime
  - `GET  /api/info` — Personal bio, education, contacts
  - `GET  /api/stats` — Metrics and statistics
  - `GET  /api/skills` — Categorized technical skill matrix
  - `GET  /api/projects` — Filterable project catalog
  - `GET  /api/projects/:id` — Case study details
  - `GET  /api/experience` — Work & attachment timeline
  - `GET  /api/education` — Coursework & degree details
  - `GET  /api/certifications` — Industry credentials
  - `GET  /api/testimonials` — Recommendations & reviews
  - `GET  /api/blogs` — Engineering articles
  - `POST /api/chat` — AI Virtual Assistant chat proxy with Gemini key rotation
  - `GET  /api/chat/health` — AI key pool status & health
  - `POST /api/contact` — Secure contact submission & email dispatch

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 20+ or 22+
- pnpm 9+ (`npm install -g pnpm`)

### 1. Install All Dependencies
```bash
pnpm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` in the root (or in `backend/` and `frontend/`):
```bash
cp .env.example .env
```

### 3. Run Development Servers
Run both frontend and backend concurrently:
```bash
pnpm dev
```
Or run individually:
```bash
pnpm dev:backend    # Starts backend at http://localhost:5000
pnpm dev:frontend   # Starts frontend at http://localhost:5173
```

- **Frontend**: http://localhost:5173 (proxies `/api` calls to port 5000)
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📦 Production Build & Testing

### Build both packages:
```bash
pnpm build
```

### Run linter:
```bash
pnpm lint
```

### Start backend in production:
```bash
pnpm start
```

---

## 🐳 Docker Deployment

Deploy both frontend and backend in isolated production containers using Docker Compose:

```bash
chmod +x deploy-docker.sh
./deploy-docker.sh
```

Or manually:
```bash
docker compose up -d --build
```

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

---

## 👤 Author

**Peter Kiplagat Misik**
- **University**: Taita Taveta University (BSc in Information Technology)
- **Email**: petermisik86@gmil.com
- **Phone / WhatsApp**: +254 743 329 366
- **Location**: Kenya (UTC+3)
