# Dormie Studio — Claude Context

## What This Is
Interactive 3D dorm room designer. Users pick their school and customize their room with real shoppable items. Pilot school: Tulane University, Monroe Hall.

**Live site:** Vercel deployment (connected to GitHub: `desolomon/Dormie-Studio`)
**Repo:** https://github.com/desolomon/Dormie-Studio
**Old static site:** hellodormie.com

## Stack
- Next.js 16 + React 19
- React Three Fiber + Three.js — 3D room builder
- Tailwind CSS v4
- Supabase + Stripe (planned, not yet built)

## Key Files
- `app/studio/page.tsx` — studio page, holds selectedItems state, handleSelect/handleDeselect
- `components/studio/Sidebar.tsx` — 3-level accordion product picker (Category > Subcategory > ColorGroup > variants)
- `components/studio/StudioCanvas.tsx` — Three.js canvas wrapper
- `components/studio/Room.tsx` — full 3D room, procedural textures, dynamic item rendering
- `lib/products.ts` — product catalog (ColorGroup type, all subcategories populated), NO more StyleId/STYLES
- `lib/schools.ts` — school data (Tulane Monroe Hall dimensions)
- `docs/dormieroadmap.md` — full product vision
- `docs/dormieoutline.md` — business model overview

## Current State (as of March 2026)
### Done
- 3D room fully rendered: Tulane Monroe Hall (15.92′ × 12′ × 9′), accurate layout
  - Lofted beds with dresser underneath, closets, desks, chairs, wall shelves, windows, HVAC
- **No style toggles** — sidebar is pure product picker only
- Sidebar: 3-level accordion → Category → Subcategory → Color Group → 2 product variants
  - Each variant: thumbnail image (with onError color fallback), price, checkbox select, "Shop This Item" link
  - Deselect: clicking checked checkbox or "Remove" button removes item from room
- Product catalog fully populated in lib/products.ts:
  - All subcategories have real products with accurate prices and Amazon/retailer links
  - Subcategories: Comforters, Sheets, Pillows, Mattress Toppers, Desk Chairs, Shelves, Bed Risers, Side Tables, Posters, String Lights, Mirrors, Rugs, Desk Lamps, Floor Lamps, LED Strips, Under-Bed, Closet Organizers, Bins, Hooks
  - Desk Setup subcategory items (Monitors, Desk Mats, Organizers, Accessories) still "coming soon"
- Dynamic 3D rendering with procedural canvas textures:
  - Quilted comforter texture (color-keyed per selection)
  - Woven rug texture (color-keyed per selection)
  - Wood desk texture, carpet floor texture, subtle wall texture
  - 5 poster artwork styles (botanical, abstract, city skyline, vintage, minimalist) — procedurally drawn
  - Posters render as framed artwork on wall (black frame + white mat)
  - Colored task chair from Desk Chairs selection
  - String lights, LED strips, desk lamps all update live

### Not Yet Built
- Product thumbnail images: most use ASIN-based URL format that may not load (fallback to color swatch works)
  - Real m.media-amazon.com CDN URLs needed for full image fidelity
- Save Design button is a placeholder (no Supabase persistence)
- Auth / user accounts
- Payments / access gate
- Multi-school support (only Tulane hardcoded)
- Mobile layout
- Desk Setup subcategory products

## Architecture Notes
- `ColorGroup` type: `{ id, label, color, variants: Product[] }` — 2 products per color group
- `Product` type: `{ id, label, price, color, link?, thumbnail? }`
- `SelectedItems`: `Partial<Record<string, Product>>` — keyed by subcategory name
- Poster artwork: procedural `canvas` → `THREE.CanvasTexture` (no external image URLs, avoids CORS)
- Amazon thumbnails: `https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01.LZZZZZZZ.jpg`
- No StyleId, no STYLES, no activeStyle anywhere in codebase

## Deployment
- **GitHub:** https://github.com/desolomon/Dormie-Studio (branch: `main`)
- **Vercel:** Connected to GitHub — every push to `main` auto-deploys
- To deploy: `git push origin main` (Vercel picks it up automatically)

## Dev Server
```bash
cd "/Users/danielsolomon/Desktop/Correct Dormie Project"
npm run dev
# → http://localhost:3000/studio
# or if port 3000 is taken: npm run dev -- --port 3001
```

## Next Priorities (pick up here)
1. Add real product thumbnail images (find actual m.media-amazon.com CDN URLs per ASIN)
2. Wire up Save Design (Supabase)
3. Add Desk Setup subcategory products (Monitors, Desk Mats, Organizers, Accessories)
4. Auth / user accounts (Supabase Auth)
5. Mobile layout
