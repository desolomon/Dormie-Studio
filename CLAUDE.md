# Dormie Studio — Claude Context

## What This Is
Themed 3D dorm room visualizer. Users pick a gender, then a theme, and see a fully pre-styled 3D dorm room — already furnished — so they can visualize what they'd be buying as a complete kit. No drag and drop. No free placement.

**Live site:** Vercel deployment (connected to GitHub: `desolomon/Dormie-Studio`)
**Repo:** https://github.com/desolomon/Dormie-Studio

## Stack
- Next.js 16 + React 19
- React Three Fiber (`@react-three/fiber`) + `@react-three/drei` + Three.js
- Tailwind CSS v4
- Supabase + Stripe (planned, not yet built)

## User Flow
1. `/` — Gender selection: Girls (pink card) or Boys (navy card)
2. `/theme/[gender]` — Theme selection: 2 large cards with color swatches
   - Girls: **Floral** | **Pink**
   - Boys: **Blue** | **Sports**
3. `/studio?gender=...&theme=...` — 3D room viewer (70%) + "Your Room Kit" sidebar (30%)

## Key Files

### Theme Config
- `lib/themes.ts` — `Theme` type + `THEMES` record with 4 themes (floral, pink, blue, sports)
  - Each theme has: `colors` (ThemeColors), `lighting` (ThemeLighting), `kit` (KitItem[]), `palette`, `description`
  - ThemeColors: wall, floor, floorRoughness, floorIsMarble, bedFrame, bedding, pillow1/2, desk, chair, dresser, dresserFace, bookshelf, rug, accent
  - ThemeLighting: ambientColor, ambientIntensity, dirColor, dirIntensity, dirFromRight

### Pages
- `app/page.tsx` — Gender selection landing (Girls/Boys cards with SVG icons)
- `app/theme/[gender]/page.tsx` — Theme selection (uses `useParams()`, filters THEMES by gender, shows palette swatches)
- `app/studio/page.tsx` — Studio shell: reads `?gender=&theme=` params, 70/30 flex layout, kit sidebar with total + "Shop This Look" button

### 3D Room
- `components/studio/StudioCanvas.tsx` — R3F Canvas: per-theme ambient/directional/hemisphere lighting, passes `themeColors` to Room
- `components/studio/Room.tsx` — Full Tulane dorm room: all furniture colors from `ThemeColors`, rug + comforter always rendered, desk lamp always shown with `colors.accent`. Procedural textures: wood floor (tiled 5×4), wall texture with color param, comforter quilted, rug woven.

### Unchanged / Legacy
- `lib/schools.ts` — Tulane Monroe Hall (15.92 × 12 × 9 ft) — still used for room dimensions
- `lib/products.ts` — old product catalog (not used in current flow, kept for reference)
- `components/studio/Sidebar.tsx` — old 3-tab sidebar (not used, kept)
- `app/ar-demo/` — AR demo (unchanged)

## Current State (as of April 2026) — Last commit: `57d7863`

### Done
- Full gender → theme → studio flow
- 4 complete themes with distinct color palettes and lighting rigs
- 3D room: walls, floor (wood or marble per theme), lofted beds ×2, desks ×2, closets ×2, wall shelves ×2, rug, windows, HVAC, ceiling light
- All furniture materials (bedFrame, bedding, pillows, desk, chair, dresser, dresserFace, bookshelf, rug, accent lamp) driven by theme config
- "Your Room Kit" sidebar: 8 items per theme, accent-colored prices, computed total, "Shop This Look" CTA

### Not Yet Built
- Save Design (no Supabase persistence)
- Auth / user accounts
- Payments / Stripe
- Real product links in sidebar (placeholder prices only)
- Mobile layout
- Multi-school support (only Tulane hardcoded)

## Next Priorities (pick up here)
1. Add real Amazon product links to kit items in `lib/themes.ts`
2. "Shop This Look" button — wire up to an affiliate cart or link list
3. Save Design with Supabase (persist theme + school selection)
4. Auth / user accounts (Supabase Auth)
5. Stripe paywall / access gate
6. Add more schools beyond Tulane

## Deployment
- **GitHub:** https://github.com/desolomon/Dormie-Studio (branch: `main`)
- **Vercel:** Connected — every push to `main` auto-deploys
- To deploy: `git push origin main`

## Dev Server
```bash
cd "/Users/danielsolomon/Desktop/Correct Dormie Project"
npm run dev
# Landing:        http://localhost:3000/
# Theme (girls):  http://localhost:3000/theme/girls
# Theme (boys):   http://localhost:3000/theme/boys
# Studio:         http://localhost:3000/studio?gender=girls&theme=floral
# AR Demo:        http://localhost:3000/ar-demo
# or if port 3000 is taken: npm run dev -- --port 3001
```
