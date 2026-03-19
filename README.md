# Thndr AI -- Automated AI Governance
By Jesaya David

This is a production-ready implementation of the Thndr AI homepage, built as a full-stack application demonstrating modern frontend engineering, responsive design, and containerized deployment.

## Tech Stack

| Layer          | Technology                                            |
|----------------|-------------------------------------------------------|
| Frontend       | React 19, TypeScript, Vite                            |
| Styling        | Vanilla CSS (modular, per-component)                  |
| Icons          | Lucide (`react-icons/lu`)                             |
| Backend        | Node.js, Express, Drizzle ORM                         |
| Database       | NeonDB (serverless Postgres via `@neondatabase/serverless`) |
| Containerization | Docker multi-stage builds, Nginx, docker-compose    |

## Quick Start

(Note: For ease-of-access, I have also deployed the frontend part on Vercel, 
so you can test without docker building locally.
Link: https://thndr-testweb.vercel.app/) <-- Not connected to backend since my Railway trial expired 😅

**Prerequisites:** Docker and Docker Compose installed.

```bash
# Clone and enter the project
cd Thndr-Testweb

# Build and start
docker compose up --build

# or docker-compose up --build in case of older Docker versions

# Access the app
# Frontend:  http://localhost:3000
# API:       http://localhost:3001/api/health

# Note: The website can run without a backend connection using fallback data,
but the login/signup, book demo, and admin page CMS (/admin) only works with a database connection string.
Set the DATABASE_URL in a .env file for full functionality.

# Note 2: Book Demo still requires SMTP provider credentials to send actual emails,
but the success message will display regardless of email delivery
for demonstration purposes.
```

To stop: `docker compose down`

## Project Structure

```
.
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── components/     # Reusable UI (Button, Navbar, Footer, SectionHeader, etc.)
│   │   ├── sections/       # Page sections (Hero, TrustedBy, PainPoints, IntroVideo,
│   │   │                   #   Foundation, LiveStats, GovernLayers, ComparisonTable,
│   │   │                   #   CustomerStories, Services, CTABanner)
│   │   ├── cms/            # CMS-managed content defaults
│   │   ├── hooks/          # Custom hooks (useStats, useCmsContent, etc.)
│   │   ├── services/       # API client
│   │   └── types/          # Shared TypeScript interfaces
│   ├── public/             # Static assets (logos, favicon)
│   ├── nginx.conf          # Production Nginx config (gzip, caching, API proxy)
│   └── Dockerfile          # Multi-stage: node build -> nginx:alpine
├── backend/                # Express API server
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API route definitions
│   │   ├── db/             # Drizzle schema and connection
│   │   ├── middleware/     # CORS, helmet, validation
│   │   └── services/       # Business logic
│   └── Dockerfile          # Multi-stage: node build -> node:alpine (non-root)
├── docker-compose.yml      # Orchestrates frontend + backend with healthchecks
└── Task.md                 # Original assignment brief
```

## Architecture Decisions

**Frontend architecture:**  Each homepage section is an isolated component (`sections/Hero`, `sections/LiveStats`, etc.) with co-located CSS. This keeps each feature self-contained and easy to modify independently. I separated shared UI primitives (`Button`, `SectionHeader`, `Navbar`) are extracted into `components/` for reuse.

**Styling approach:**  I used vanilla CSS with CSS custom properties for a consistent design system (colors, spacing, typography, transitions). Direct CSS gives precise control over the design-heavy mockup while keeping the dependency footprint minimal.

**Backend as a thin API:**  Even though the homepage is mostly static, the Express backend demonstrates full-stack thinking. It serves dynamic data (platform stats, customer stories) and handles form submissions (demo requests). The API is designed to gracefully degrade, and the frontend uses fallback data if the backend is unreachable.

**CMS-ready content layer:**  Section content is managed through a `cms/managedSections.ts` defaults file with a `useCmsContent` hook. This enables a future admin panel to override content via the API without code changes. An admin panel prototype exists at `/admin`.

**Docker setup:**
- Frontend uses a two-stage build (Node -> Nginx Alpine) for a minimal production image. I split the build and runtime stages to ensure only static assets are in the final image, and Nginx handles serving with optimal caching and compression.
- Nginx handles gzip compression, static asset caching (1yr immutable), security headers (X-Frame-Options, X-Content-Type-Options), SPA routing, and reverse-proxies `/api/` to the backend
- Backend runs as non-root user with `--omit=dev` production dependencies
- Healthcheck on the backend ensures the frontend container only starts after the API is ready

## Key Frontend Features

- **Spotlight hero background** with subtle animated radial gradients and a grid pattern overlay
- **Text cycling animation** that periodically blurs the heading and flashes the Thndr logo
- **Company logo marquee** with infinite scroll and gradient edge fading
- **6-card pain points grid** with gradient borders highlighting on hover
- **YouTube video embed** with autoplay/loop in the intro section
- **Frosted glass cards** with `backdrop-filter` blur for the foundation pillars
- **Interactive SVG graph** with grid lines, dual gradient-filled curves, data point dots, and a mouse-tracking radial spotlight effect
- **Animated stat counters** triggered on scroll via Intersection Observer
- **Tabbed governance layers** in a three-column layout with contextual images and icon overlays
- **Feature comparison table** with check/cross icons and descriptive Thndr AI capabilities
- **Fully responsive** -- tested across mobile, tablet, and desktop breakpoints

## SEO & Performance

- Semantic HTML5 with proper heading hierarchy (`h1` > `h2` > `h3`)
- Meta description, Open Graph, and Twitter Card tags
- `robots` meta allowing indexing, canonical URL
- Nginx gzip compression and immutable cache headers for static assets
- Images use `loading="lazy"` where appropriate
- ARIA labels and roles on interactive elements (tabs, buttons, navigation)

## Tradeoffs

- **CSS over UI libraries** 

Chose modular vanilla CSS over Tailwind/MUI to match the design precisely without configuration overhead. Tradeoff is more CSS to maintain, but each section's styles are co-located and isolated.

- **Fallback data strategy** 

The frontend ships with hardcoded fallback data for stats and content. If the API is down, the page renders fully, no blank sections. This prioritizes user experience over strict data freshness.

- **Static company logos** 

The trusted-by marquee uses fixed image assets rather than CMS-driven data, since partner logos rarely change and need precise sizing control.

- **YouTube iframe embed** 

Used an iframe embed rather than a self-hosted video to avoid large media files in the Docker image and leverage YouTube's CDN/adaptive streaming.

- **No authentication** 

The admin panel is a simple password-protected route without full auth, since the focus is on the homepage. In a real app, this would be expanded with proper user management and security.

- **Simpler visual components**

To make the web run smoothly on lower end devices, I opted for CSS-based animations rather than heavier JavaScript animation libraries. I also avoided using too many transitions and animations for the project.

## AI Tools & Validation

- **Gemini (via Antigravity):** Used for scaffolding component structures, CSS layout patterns, and iterating on design polish. Each generated output was reviewed, refined, and tested against the mockup.
- **Validation process:**
  - Visual diff against the design mockup at each major section
  - Responsive testing across breakpoints (mobile 375px, tablet 768px, desktop 1200px+)
  - Docker build verification to ensure production parity
  - Browser DevTools network inspection for CORS and API connectivity
  - Accessibility audit for ARIA attributes and keyboard navigation

---

*Built for the Thndr AI technical assessment. Thank you very much for reviewing!*
