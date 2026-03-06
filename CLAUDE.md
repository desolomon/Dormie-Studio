# Dormie Studio — Claude Context

## What This Is
Interactive 3D dorm room designer. Users pick their school, select a style preset, and customize their room with real shoppable items. Pilot school: Tulane University, Monroe Hall.

**Live site:** hellodormie.com (current static version)

## Stack
- Next.js 16 + React 19
- React Three Fiber + Three.js — 3D room builder
- Tailwind CSS v4
- Supabase + Stripe (planned, not yet built)

## Key Files
- `app/studio/page.tsx` — studio page, holds all state (selectedItems, activeStyle)
- `components/studio/Sidebar.tsx` — style toggles + category accordion + product picker
- `components/studio/StudioCanvas.tsx` — Three.js canvas wrapper
- `components/studio/Room.tsx` — full 3D room, all furniture, dynamic item rendering
- `lib/products.ts` — product catalog, style presets, types
- `lib/schools.ts` — school data (Tulane Monroe Hall dimensions)
- `docs/dormieroadmap.md` — full product vision
- `docs/dormieoutline.md` — business model overview

## Current State (as of March 2026)
### Done
- 3D room fully rendered: Tulane Monroe Hall (15.92′ × 12′ × 9′), accurate layout
  - Lofted beds with dresser underneath, closets, desks, chairs, wall shelves, windows, HVAC
- Sidebar with style toggles (Girls/Boys/Neutral/Aesthetic) that apply full presets
- Style presets wire up: comforter, sheets, rug, poster, string lights, desk lamps, LED strips
- Individual item customization (override any item after picking a style)
- Product catalog in lib/products.ts with colors/prices
- Dynamic 3D rendering: comforter color, sheets, rug, poster, string lights, desk lamps, LED strips all update live

### Not Yet Built
- Clicking items does NOT show product images or Amazon links yet (just color swatches)
- No real product photos or thumbnails
- Save Design button is a placeholder (no persistence)
- Auth / user accounts
- Payments / access gate
- Multi-school support (only Tulane hardcoded)
- Pillows, Mattress Toppers, Furniture subcategories have no products yet
- Mobile layout

## Next Priorities (pick up here)
1. Add product thumbnails/images to the sidebar product list
2. Add "Shop This Item" links (Amazon affiliate links) to each product
3. Wire up Save Design (Supabase)
4. Add more products to empty subcategories (Pillows, Furniture, Storage)

## Dev Server
```bash
cd "/Users/danielsolomon/Desktop/Correct Dormie Project"
npm run dev
# → http://localhost:3000/studio
```
