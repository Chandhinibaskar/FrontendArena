# GRANTLY — Scholarship World

Discover, match, apply to and track scholarships inside an interactive 3D world.

**Live demo:** _add your Vercel/Netlify link_

## Concept
Discover → Understand → Apply → Track, in one place. Every page has its own 3D background:
- **Dashboard / Deadlines** – low-poly scholarship city with floating gold coins
- **Discover / Detail / Profile** – colourful cosmos with distorted neon shapes
- **Tracker** – sunset hills and clouds

## Features
- Dashboard with stats, top matches, upcoming deadlines and a deadline nudge
- Discover: search, filters (level, field, country) and sorting (match, amount, deadline)
- Match score and eligibility checklist computed from your profile
- Scholarship detail with steps, required documents, Save and Start application
- Kanban tracker (drag and drop, or the “Move to” select) with a document checklist per application
- Deadline timeline with urgency colours
- Coins earned for saving, starting, submitting and winning
- 6 languages with RTL support: English, हिन्दी, தமிழ், Español, Français, العربية
- Responsive, keyboard accessible, respects `prefers-reduced-motion`
- State persisted in localStorage (no backend)

## Tech stack
Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · React Router · three.js / react-three-fiber / drei

## Run locally
```bash
npm install
npm run dev
```
Build: `npm run build`. Deploy to Vercel/Netlify (SPA rewrites are included).

## Structure
```
src/
  scene/      3D worlds
  components/ layout, shared UI
  pages/      route screens
  store/      zustand store (persisted)
  lib/        i18n, match scoring
  data/       mock scholarships
```
