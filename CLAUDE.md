# Dormie Studio — Claude Context

## What This Is
Interactive 3D dorm room designer. Users pick their school and customize their room with real shoppable items. Pilot school: Tulane University, Monroe Hall.

**Live site:** Vercel deployment (connected to GitHub: `desolomon/Dormie-Studio`)
**Repo:** https://github.com/desolomon/Dormie-Studio
**Old static site:** hellodormie.com

## Stack
- Next.js 16 + React 19
- React Three Fiber (`@react-three/fiber`) + `@react-three/drei` + Three.js
- Tailwind CSS v4
- Supabase + Stripe (planned, not yet built)

## Key Files

### Studio (`/studio`)
- `app/studio/page.tsx` — IKEA-style top navbar, Add/List/Favorites tabs, activeTab state, selectedItems state, zoom controls, bottom toolbar
- `components/studio/Sidebar.tsx` — 3-tab sidebar: Add (3-col product grid, pill search, category tabs), List (selected items + total), Favorites (empty state)
- `components/studio/StudioCanvas.tsx` — Three.js canvas wrapper
- `components/studio/Room.tsx` — full 3D room, procedural textures, dynamic item rendering
- `lib/products.ts` — flat `Product[]` catalog (Bedding/Furniture/Lighting only, ~30 products, Amazon ASIN thumbnails)
- `lib/schools.ts` — school data (Tulane Monroe Hall dimensions)

### AR Demo (`/ar-demo`)
- `app/ar-demo/page.tsx` — dark AR room designer UI: top bar, view toggle (AR/Plan), furniture sidebar with category chips and scan animation, context card (Duplicate/Remove)
- `app/ar-demo/ThreeRoomCanvas.tsx` — Three.js WebGL room renderer (R3F): wood floor texture, 3 walls, PBR lighting, OrbitControls, spring drop animation, AR/Plan camera modes

### Docs
- `docs/dormieroadmap.md` — full product vision
- `docs/dormieoutline.md` — business model overview

## Current State (as of March 2026) — Last commit: `bad35b3`

### Done
**Studio (`/studio`):**
- IKEA-style top navbar: Add / List (with item count badge) / Favorites tabs; center title; right icons (camera, save, cart + total price, close)
- Sidebar: 420px wide, 3-column product grid, rounded pill search input, hamburger icon, scrollable category tabs
- List tab: "Your room · N items", each item shows color swatch + subcategory + name + price + remove (×); sticky total + ADD ALL TO CART button
- Favorites tab: empty state with heart icon
- Canvas: zoom +/- stacked buttons top-right; bottom toolbar (Dollhouse / Top view / Side views)
- Product catalog (`lib/products.ts`) restructured:
  - Type changed from `Record<string, ColorGroup[]>` → `Record<string, Product[]>` (flat, no color groups)
  - `Product` now has optional `description?: string` field (subtitle under name)
  - Only 3 categories: Bedding (Comforters, Sheets, Pillows, Mattress Toppers), Furniture (Desk Chairs, Shelves, Side Tables), Lighting (Desk Lamps, Floor Lamps, LED Strips)
  - ~30 products total, all with real Amazon ASINs, prices, and links
  - Thumbnails: `https://images-na.ssl-images-amazon.com/images/P/{ASIN}.01.LZZZZZZZ.jpg`
  - IKEA-style ProductCard: white bg, `mix-blend-multiply` image, bold label, description, price — no availability dot, no color swatch

**3D Room (`/studio`):**
- Tulane Monroe Hall (15.92′ × 12′ × 9′) fully rendered with lofted beds, dresser, closets, desks, chairs, wall shelves, windows, HVAC
- Procedural textures: quilted comforter, woven rug, wood desk, carpet floor, wall, 5 poster styles, framed artwork

**AR Demo (`/ar-demo`):**
- Full Three.js WebGL room: procedural wood grain floor (1024×1024 canvas texture), painted walls, baseboards, crown molding
- Furniture as 3D box geometry groups (Sofa, Table, Chair, Lamp, Rug, Shelf meshes) with MeshStandardMaterial
- Spring drop animation via `useFrame` (k=24 stiffness, c=5.5 damping)
- Lighting: ambientLight + directionalLight (shadowMap 2048) + 2× ceiling pointLights (shadowMap 512)
- ACESFilmic tone mapping, CSS vignette overlay
- OrbitControls (target [0,0.8,0], maxPolar π/2.05, minDist 3, maxDist 18, damping 0.06)
- CameraController: AR view `[0,4.5,7.5]` → Plan view `[0,14,0.001]`
- Sidebar: 16 catalog items across 6 categories; AR scan ring animation on add; ContextCard (Duplicate/Remove)
- Dynamic import with `ssr: false` for Three.js component

### Not Yet Built
- Product thumbnail images may not load (Amazon CDN blocks referrers in dev; fallback to color circle works)
- Save Design (no Supabase persistence yet)
- Auth / user accounts (Supabase Auth)
- Payments / access gate (Stripe)
- Multi-school support (only Tulane hardcoded)
- Mobile layout

## Architecture Notes
- `Product` type: `{ id, label, description?, price, color, link?, thumbnail? }`
- `ColorGroup` type kept exported for backwards compatibility (not used in UI)
- `SelectedItems`: `Partial<Record<string, Product>>` — keyed by subcategory name
- `ItemForRender` (ar-demo): `{ placedId, fx, fy, color, accent, category, entering, w, d }`
- Poster artwork: procedural `canvas` → `THREE.CanvasTexture` (no external URLs, avoids CORS)
- No StyleId, no STYLES, no activeStyle anywhere in codebase

## Deployment
- **GitHub:** https://github.com/desolomon/Dormie-Studio (branch: `main`)
- **Vercel:** Connected to GitHub — every push to `main` auto-deploys
- To deploy: `git push origin main`

## Dev Server
```bash
cd "/Users/danielsolomon/Desktop/Correct Dormie Project"
npm run dev
# Studio:  http://localhost:3000/studio
# AR Demo: http://localhost:3000/ar-demo
# or if port 3000 is taken: npm run dev -- --port 3001
```

## Next Priorities (pick up here)
1. Verify AR demo renders correctly in browser (Three.js + R3F packages must be installed)
2. Add real `m.media-amazon.com` CDN URLs for product thumbnails so they load reliably
3. Wire up Save Design (Supabase)
4. Add Desk Setup subcategory products (Monitors, Desk Mats, Organizers, Accessories)
5. Auth / user accounts (Supabase Auth)
6. Mobile layout
