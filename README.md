# Peter Kiplagat Misik — Modern Personal Portfolio

A professional, high-performance, dark-mode portfolio website engineered for **Peter Kiplagat Misik**, an Information Technology student and aspiring Software Developer & Network Engineer at **Taita Taveta University** (Bachelor of Science in Information Technology).

![Portfolio Preview](https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Tech Stack

- **Core Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism + Matrix Grid FX
- **Animations**: Framer Motion (page transitions, typing typewriter, floating tech badges, card lifts)
- **Routing**: React Router DOM (with route-level code splitting & lazy loading)
- **Icons**: Lucide React + Custom SVG Brand Badges
- **Form Handling & Messaging**: EmailJS (`@emailjs/browser`) + Canvas Confetti celebration
- **Scroll Observation**: `react-intersection-observer` + custom scroll spy navigation highlighting

---

## ✨ Features

- **Responsive Matrix UI/UX**: Designed for mobile, tablet, and desktop with sleek dark green, emerald, black, and slate accents.
- **Dark / Light Mode**: Defaults to an immersive dark theme with immediate persistence in local storage.
- **Dynamic Typewriter Header**: Rotating developer roles (*Full Stack Developer*, *Python Developer*, *React Developer*, *Network Engineer*, *Data Analyst*).
- **Linux Terminal Avatar**: Realistic Linux terminal visualizer displaying system architecture, kernel uptime, and quick bash diagnostics.
- **Projects Showcase & Live Search**:
  - Category filters (*All*, *Full Stack*, *Cisco Networking*, *Backend & Data*)
  - Real-time search query filtering by keywords, titles, or stack tags
  - Individual project case study pages (`/project/:id`) detailing:
    - Problem scope & architecture
    - Key features & code structure
    - Technical challenges & solutions
    - Takeaways & metrics
- **Integrated CV / Resume**:
  - Includes real CV (`CV.pdf`) in `public/`
  - In-app **Resume Preview Modal** with download and print options
  - Direct 1-click download button in Hero and Navbar
- **Cisco Networking Showcase**: Dedicated focus on Cisco Packet Tracer, multi-department VLAN segmentation, 802.1Q trunking, router-on-a-stick, and access control lists.
- **Interactive Experience & Education**:
  - Vertical timeline covering ICT Industrial Attachment
  - Detailed academic modules from Taita Taveta University
- **Accredited Certifications**: Cisco Networking, Python Programming, Full-Stack Web Development, and Relational Databases.
- **Testimonials Carousel**: Autoplaying peer & supervisor endorsements with pause on hover and star ratings.
- **Open Source / GitHub Heatmap**: Commit streak tracker, activity heatmap visualization, and pinned repositories.
- **AI-Powered Virtual Assistant (RAG Engine)**:
  - Interactive representative trained on Peter's BSc in IT degree, Cisco network designs, software stack, attachment at EmgTTI, and availability.
  - Interactive suggested prompt chips, conversation memory, typing indicator, and direct action buttons (*Download CV*, *Chat on WhatsApp (0743329366)*, *View Case Studies*).
- **EmailJS Contact Form**: Full validation, friendly fallback simulation, and celebratory confetti animation upon message dispatch.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── CV.pdf                  # Peter Kiplagat Misik's Resume
│   └── favicon.svg
├── src/
│   ├── assets/                 # Static media and illustrations
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed responsive glass navbar with active spy
│   │   ├── Hero.tsx            # Typewriter header, Linux avatar, and CTAs
│   │   ├── About.tsx           # Bio, stats counter, and profile snapshot
│   │   ├── Skills.tsx          # Categorized animated tech & toolchain grid
│   │   ├── Experience.tsx      # Vertical timeline for ICT attachment
│   │   ├── Education.tsx       # Taita Taveta University degree & coursework
│   │   ├── Projects.tsx        # Filterable project catalog with live search
│   │   ├── Certifications.tsx  # Cisco, Python, Web, & Database badges
│   │   ├── Testimonials.tsx    # Endorsements carousel
│   │   ├── Contact.tsx         # Contact form with validation & EmailJS
│   │   ├── Footer.tsx          # Navigation links, copyright & socials
│   │   ├── ScrollToTop.tsx     # Animated smooth scroll button
│   │   ├── ResumeModal.tsx     # In-app CV previewer
│   │   ├── GitHubActivity.tsx  # Heatmap & contribution metrics
│   │   ├── BlogSection.tsx     # Technical engineering notes
│   │   └── SocialIcons.tsx     # Brand SVG components
│   ├── context/
│   │   └── ResumeContext.tsx   # Global resume modal state
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio data
│   ├── hooks/
│   │   ├── useTheme.ts         # Dark/light theme management
│   │   ├── useScrollSpy.ts     # Active section detector
│   │   └── useResume.ts        # Fast Refresh-compliant resume hook
│   ├── layouts/
│   │   └── MainLayout.tsx      # Master layout container
│   ├── pages/
│   │   ├── Home.tsx            # Aggregated one-page portfolio
│   │   ├── ProjectDetails.tsx  # Dynamic deep-dive case study page
│   │   └── NotFound.tsx        # Terminal-themed 404 page
│   ├── routes/
│   │   └── AppRoutes.tsx       # Lazy-loaded route table
│   ├── services/
│   │   └── emailService.ts     # EmailJS handler & confetti trigger
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Root component
│   ├── index.css               # Tailwind CSS v4 & custom utilities
│   └── main.tsx                # Entry mount
├── index.html                  # SEO & OpenGraph tags
├── package.json
├── tsconfig.json
└── vite.config.ts              # Vite 8 + Tailwind v4 build configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node 20+)
- **pnpm** (or **npm** / **yarn**)

### 2. Installation
```bash
# Navigate to project directory
cd portfolio

# Install dependencies
pnpm install
# or: npm install
```

### 3. Local Development Server
```bash
pnpm dev
# or: npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

### 4. Production Build
```bash
pnpm build
# or: npm run build
```
The optimized static bundle is compiled into the `dist/` directory.

### 5. Preview Production Build
```bash
pnpm preview
# or: npm run preview
```

---

## 🐳 Docker Containerization

The project is fully containerized using a multi-stage Alpine build (`Node.js 22` build stage + `Nginx Alpine` high-performance HTTP server).

### Quick Start with Docker Compose
```bash
# Option 1: Using the convenience script
./deploy-docker.sh

# Option 2: Using docker compose directly
docker compose up -d --build
```
Your containerized portfolio will be accessible at **[http://localhost:3000](http://localhost:3000)**.

### Useful Docker Commands
```bash
# View running container status
docker compose ps

# View container logs
docker compose logs -f

# Stop container
docker compose down

# Standalone Docker build & run
docker build -t peter-portfolio .
docker run -d -p 3000:80 --name peter-portfolio peter-portfolio
```

---

## 📬 EmailJS Configuration (Optional)

To receive contact form submissions directly in your inbox:
1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service (e.g. Gmail) and an Email Template.
3. Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
*Note: If no `.env` keys are supplied, the portfolio automatically executes an instantaneous local simulation with confetti, allowing instant client-side testing without setup!*

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Visit [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Framework Preset: **Vite**.
5. Build Command: `pnpm build` (or `npm run build`).
6. Output Directory: `dist`.
7. Click **Deploy**.

*For Single Page Application routing on Vercel, a `vercel.json` rewrite file is already supported:*
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` containing:
```
/*    /index.html   200
```
5. Deploy.

### Deploy to GitHub Pages
1. In `vite.config.ts`, add `base: '/<REPO_NAME>/'`.
2. Run `pnpm build`.
3. Push the `dist` folder to your `gh-pages` branch or configure GitHub Actions.

---

## 📄 License
MIT License. Free to use, adapt, and build upon.
