# VOSS Model Management - Replit Agent Guide

## Overview

VOSS Model Management is a premium, luxury-themed model management agency website. It's a full-stack web application with 4 main pages (Home, Models, About, Contact) built with a dark editorial aesthetic featuring champagne gold accents, cinematic animations, and an ultra-premium feel inspired by high-fashion editorial magazines.

The app uses a React frontend with Framer Motion animations, a Node.js/Express backend, and PostgreSQL for data storage. Models (fashion talent) are stored in the database with their profiles, measurements, and gallery images. The site also handles contact form submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router) with `AnimatePresence` for animated page transitions
- **Styling**: Tailwind CSS with CSS variables for the dark luxury theme (near-black backgrounds, champagne gold `#C9A84C`, warm ivory `#F5EDD6`)
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives — components live in `client/src/components/ui/`
- **Animations**: Framer Motion for page transitions, scroll animations, parallax effects, typewriter text, and custom cursor
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Fonts**: Cormorant Garamond (serif display) + Josefin Sans (thin sans-serif body)
- **Build**: Vite with React plugin, outputs to `dist/public/`

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Backend (`server/`)
- **Framework**: Express 5 running on Node.js
- **Language**: TypeScript, executed via `tsx`
- **API Structure**: RESTful JSON API under `/api/` prefix
- **Routes defined in**: `shared/routes.ts` (shared contract between frontend and backend with Zod schemas)
- **Development**: Vite dev server middleware integrated with Express for HMR
- **Production**: Static file serving from `dist/public/`, SPA fallback to `index.html`

### API Endpoints
- `GET /api/models` — List all models
- `GET /api/models/:id` — Get a single model by ID
- `POST /api/contact` — Submit a contact form

### Shared Code (`shared/`)
- `schema.ts` — Drizzle ORM table definitions and Zod insert schemas
- `routes.ts` — API route contracts with Zod response/input schemas (used by both client and server)

### Database
- **Database**: PostgreSQL (required, via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation bridging
- **Schema push**: `npm run db:push` (uses drizzle-kit)
- **Tables**:
  - `models` — id, name, category, gender, height, eyes, location, imageUrl, isNewFace, bio, measurements (jsonb), gallery (text array), instagram, stats (jsonb)
  - `contact_submissions` — id, name, email, category, message
- **Seeding**: The server auto-seeds model data on startup if the models table is empty (handled in `server/routes.ts`)

### Build System (`script/build.ts`)
- Client: Built with Vite → `dist/public/`
- Server: Built with esbuild → `dist/index.cjs`
- Server dependencies are bundled for faster cold starts, with an allowlist of deps to include
- Production start: `node dist/index.cjs`

### Key Design Decisions
1. **Shared schema/routes pattern**: The `shared/` directory contains both database schemas and API contracts, ensuring type safety across the full stack. The frontend imports Zod schemas from `shared/routes.ts` to validate API responses.
2. **No authentication**: This is a public-facing portfolio/agency site with no user login required.
3. **Database storage only**: The `IStorage` interface in `server/storage.ts` is implemented by `DatabaseStorage` using PostgreSQL — there is no in-memory fallback.
4. **SPA architecture**: All routes fall through to `index.html` in production, with client-side routing handled by Wouter.
5. **Custom cursor**: A custom animated hollow circle cursor that expands on hover over interactive elements, replacing the default browser cursor on desktop.

## External Dependencies

### Required Services
- **PostgreSQL Database**: Must be provisioned and connected via `DATABASE_URL` environment variable. The app will crash on startup without it.

### Key NPM Packages
- `express` (v5) — HTTP server
- `drizzle-orm` + `drizzle-kit` — Database ORM and migrations
- `pg` — PostgreSQL client
- `@tanstack/react-query` — Client-side data fetching/caching
- `framer-motion` — Animation library (critical for the luxury feel)
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Schema validation
- `react-hook-form` + `@hookform/resolvers` — Form handling
- `lucide-react` — Icon library
- shadcn/ui components (via Radix UI primitives)
- `connect-pg-simple` — PostgreSQL session store (available but sessions not currently used)

### External Assets
- **Google Fonts**: Cormorant Garamond, Josefin Sans (loaded via CSS import and HTML link)
- **Unsplash Images**: Model photos sourced from Unsplash URLs (stored as URLs in the database)
- **Video Asset**: Hero video stored locally in `attached_assets/`