# Thndr AI - Automated AI Governance

This project is a complete, production-ready implementation of the Thndr AI homepage design, fulfilling the technical requirements of the assignment. 

It consists of:
- **Frontend**: A responsive React + TypeScript application built using Vite.
- **Backend**: A mock JSON/Express backend with DrizzleORM acting as a lightweight API (serving statistics, customer stories, and handling demo requests).
- **Containerization**: A full Docker & `docker-compose` setup for local development and demonstration.

---

## 🏃‍♂️ Setup and Run Instructions

You only need Docker and Docker Compose installed on your machine.

1. **Clone the repository** (or unzip the source code):
   ```bash
   # navigate into the directory
   cd Pliswok
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   *Note: Add `-d` to run it in detached mode.*

3. **Access the application**:
   - **Frontend application**: Open your browser and navigate to `http://localhost:3000`.
   - **Backend API**: The API is bound to `http://localhost:3001` (e.g. `http://localhost:3001/api/stats`).

4. **Stopping the application**:
   ```bash
   docker-compose down
   ```

---

## 🏗️ Architecture Decisions

- **React + Vite + TypeScript**: Chosen for modern frontend development. Vite offers extremely fast build times and HMR, while TypeScript enforces strict type safety across both frontend components and API payload structures, reducing runtime errors.
- **Component-based structure**: The layout is split into logical sections (Hero, PainPoints, LiveStats, etc.) to promote reusability and maintainability.
- **Backend structure**: Even though the initial page is mostly static, a lightweight Node+Express backend was implemented alongside DrizzleORM. This satisfies the "full-stack thinking" requirement and establishes a pattern for future dynamic data (like submitting customer leads for demo requests).
- **Docker Multi-Stage Builds**: 
  - The frontend Dockerfile uses a `node` build stage followed by a minimal `nginx:alpine` stage. This keeps the production image extremely small and secure.
  - The backend Dockerfile similarly uses a build stage before running the optimized `dist/index.js` payload.

## ⚖️ Tradeoffs Made

- **CSS over Heavy UI Libraries**: Implemented layout with standard/modular CSS (`App.css`, `Hero.css`, etc.) instead of introducing heavy UI libraries (like MUI or Chakra) or utility-first frameworks (like Tailwind). This was chosen to demonstrate direct UI implementation matching the specific design mockups, avoiding the overhead of configuring a new toolkit. 
- **Mock Data Layer**: For demo purposes, the backend does not rely on a heavy external database (e.g., PostgreSQL instance in Docker). While the ORM tool (Drizzle) is configured, the data layer utilizes a simplistic / in-memory setup so reviewers can run the project without extensive database configuration.
- **Minimal Error Handling UI**: Simulated backend calls fetch loading/error states, but advanced fallback UIs (like detailed skeletons loaders) were kept lightweight to reduce visual complication and focus purely on the homepage translation.

## 🤖 AI Tools Used & Validation

- **GitHub Copilot / Claude**: Used to scaffold out repetitive layout patterns and CSS griding for the components. 
- **Validation**: 
  - Validated AI-generated CSS layouts locally, iterating through different responsive breakpoints to ensure the design worked flawlessly on mobile, tablet, and desktop views.
  - Corrected overly-verbose AI outputs (particularly avoiding excessive inline-styles) and extracted them into semantic external CSS blocks.
  - Validated API hooks (`useStats`, etc.) by inspecting the browser network tab to ensure cross-origin resource sharing (CORS) and port bindings in the `docker-compose` were correctly resolved.

---

*Thank you for reviewing the submission!*