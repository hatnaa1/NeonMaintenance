# Maintenance Page Application

## Overview

This is an ultra-minimalist cyberpunk-themed maintenance page built with React, TypeScript, and Express. The application displays a stunning starfall particle animation with glassmorphism UI, social media links, and switchable theme variants. No database, no backend APIs - pure frontend focus.

The tech stack includes:
- **Frontend**: React with TypeScript, Vite build tool, TailwindCSS for styling
- **Backend**: Express.js server with TypeScript (serves static files only)
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Animations**: CSS keyframes with 80 animated starfall particles

## User Preferences

Preferred communication style: Simple, everyday language (Mongolian preferred).

## Recent Changes

**November 15, 2025 - Final Clean Version**
- **Ultra-minimal design**: Removed rotating hexagon and status text for cleaner aesthetic
- **Starfall particles**: 80 vertical streaks with gradual appearance (0-20s delay) to prevent "ice curtain" effect
- Particles originate from top of viewport with invisible spawn point
- Natural, continuous starfall animation with staggered timing
- **Background**: Fixed purple-to-magenta gradient (#1a0033 → #2d1b4e → #5e2563)
- **Social links**: 4 icons with neon hover effects (GitHub, Discord, X, Facebook)
- **Theme system**: 4 cyberpunk color variants (Default, Matrix, Vaporwave, Sunset)
- Particles and UI elements respond to active theme; background remains fixed
- Theme switcher with localStorage persistence
- Glassmorphism card with gradient headline and subtext
- **Removed all database dependencies**: Deleted schema.ts, storage.ts, /api/subscribe endpoint
- No countdown timer, no email signup, no status indicators, no database
- Pure focus on cyberpunk starfall aesthetic

## System Architecture

### Frontend Architecture

**Build System**: The application uses Vite as the build tool and development server. The frontend code lives in the `client/` directory with a clear separation between source code (`client/src/`) and the HTML entry point (`client/index.html`).

**Routing Strategy**: Uses Wouter for lightweight client-side routing. Currently configured to show the maintenance page for all routes.

**Component System**: Implements shadcn/ui's "New York" style variant, which provides a comprehensive set of pre-built accessible components based on Radix UI primitives. Components are organized in `client/src/components/ui/` and use class-variance-authority for variant management.

**Styling Approach**: TailwindCSS with a custom cyberpunk-inspired dark theme. The design system features:
- Dark navy/black base colors
- Neon accent colors (electric blue, magenta, purple)
- Glassmorphism effects with backdrop blur
- Custom CSS variables for consistent theming
- Responsive design with mobile-first breakpoints

**Design Philosophy**: The maintenance page follows a "Cyberpunk-Inspired Minimalism" approach with animated particles, geometric shapes, and neon gradient effects, as documented in `design_guidelines.md`.

**Animation System**: 80 CSS-animated starfall particles with:
- Gradual appearance (0-20s staggered delays)
- Theme-aware colors (particles use current theme's primary/secondary/accent)
- Motion blur and neon glow effects
- Natural, organic flow from top to bottom
- Infinite loop animation

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured for both development and production environments. The server serves static files only - no API routes, no database operations.

**Development Workflow**: Uses tsx for running TypeScript directly in development mode. The server integrates with Vite's middleware in development for hot module replacement.

**API Structure**: No API routes. The `registerRoutes` function in `server/routes.ts` creates an HTTP server for static file serving only.

**Static File Serving**: In production, the server serves the built React application from the `dist/public` directory.

### External Dependencies

**UI Component Libraries**:
- Radix UI: Provides unstyled, accessible component primitives for dialogs, dropdowns, tooltips, and more
- shadcn/ui: Pre-styled component system built on Radix UI
- Lucide React: Icon library for consistent iconography
- React Icons (Simple Icons): For social media logos (GitHub, Discord, X, Facebook)
- class-variance-authority: Type-safe variant system for components

**State Management**:
- React useState/useEffect for theme switching and localStorage persistence
- No TanStack React Query needed (no API calls)
- No form libraries needed (no forms)

**Development Tools**:
- Replit-specific plugins: Vite plugins for error overlays, cartographer, and dev banners when running on Replit
- ESBuild: Bundles the server code for production deployment

**Styling & Animation**:
- TailwindCSS: Utility-first CSS framework
- PostCSS with Autoprefixer: CSS processing pipeline
- Custom CSS keyframes for particle animations

**Routing**: Wouter is used instead of React Router for a smaller bundle size while maintaining similar functionality.

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   └── maintenance.tsx    # Main maintenance page with particles
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── index.css              # TailwindCSS + theme variables
│   └── App.tsx                # Root component with routing
server/
├── routes.ts                  # Empty routes (HTTP server only)
└── index.ts                   # Express server
design_guidelines.md           # Cyberpunk design system
```

## Key Features

1. **80 Animated Starfall Particles** - Natural, organic flow with gradual appearance
2. **4 Theme Variants** - Cyberpunk (default), Matrix, Vaporwave, Sunset
3. **Glassmorphism Card** - Frosted glass effect with backdrop blur
4. **Social Media Links** - GitHub, Discord, X, Facebook with neon hover effects
5. **Theme Persistence** - localStorage saves user's theme preference
6. **Fully Responsive** - Works on all device sizes
7. **Zero Database** - No backend storage, pure frontend experience
8. **Lightweight** - Fast loading, minimal dependencies
