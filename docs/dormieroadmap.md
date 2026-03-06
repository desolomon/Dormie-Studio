# Dormie Redesign Roadmap

## Core Vision
Transform Dormie from a static PDF kit model into a fully interactive, 360-degree dorm room design experience — think Nike's shoe customizer, but for dorm rooms.

---

## Phase 1: Landing Page Redesign

### Concept
Simple, clean, compelling homepage that immediately communicates the interactive experience.

### Key Element
A bold hero statement along the lines of:
> "Interactive Dorm Design at [school dropdown] — design your room and shop every item, all in one place."

- School dropdown lets users select their university upfront
- Sets the tone that this is personalized to *their* school
- Clear CTA to enter the interactive workspace

---

## Phase 2: The Interactive Dormie Workspace

### Concept
A fully realistic 3D dorm room builder — like designing your Barbie dreamhouse, but for real dorm rooms. The experience is gamified and visual-first, built for a generation that learns and shops through immersive, interactive media. Users get a 3D layout specific to their school with real dimensions.

**Name: Dormie Studio**

### How It Works
1. User selects their school → Dormie Studio loads with that school's actual dorm room layout and real dimensions rendered in 3D
2. User sees a virtual, realistic dorm room they can furnish and decorate in real time
3. Left sidebar navigation with categories:
   - **Style** (Boys / Girls / Neutral / etc.)
     - Bedding
     - Sheets
     - Pillows
     - Posters
     - Lighting
     - Storage
     - Desk setup
     - Rugs
     - Decor
     - *(more subcategories)*
4. Selecting an item places it realistically into the virtual room
5. Items are linked directly to purchase pages (primarily Amazon, streamlined retailers)
6. End result: a fully designed virtual dorm room where every item is shoppable

### Key Experience Goal
Seamless, visual, fun — the user designs first, then shops. Every item in the room is a direct purchase link.

---

## Monetization
- **One-time access fee** to unlock the interactive workspace
- Users pay once to design their room and access all shoppable links
- Potential upsell: school-specific design packs, featured/sponsored products

---

## Development Approach
- **Pilot school: Tulane University — Monroe Hall**
  - Room dimensions (double occupancy): **15'11" wide x 12'0" deep**
  - Each room includes: 2 beds, 2 desks, 2 wardrobes/closets (4'5" wide each) along the right wall
  - Floor plan sourced from official Tulane Monroe Hall room plan PDF
- Build core 3D experience first, then layer in more schools/products over time

---

## Tech Stack

| Layer | Tech | Why |
|---|---|---|
| 3D Engine | React Three Fiber + Three.js | Browser-native 3D, React ecosystem |
| Frontend | Next.js | Routing, SEO, API routes in one framework |
| Styling | Tailwind CSS | Fast to build UI, sidebars/panels |
| Database | Supabase (PostgreSQL) | Simple, free tier, handles auth + data |
| Payments | Shop (primary) + Stripe (secondary) | Matches current Dormie payment setup |
| 3D Models | GLTF/GLB format | Web-standard 3D asset format |

### Payment Notes
- Current hellodormie.com uses **Shop** (Shopify's payment processor) as primary
- Stripe may also be in use — support both to keep continuity for existing customers
- One-time access fee processed through existing payment infrastructure where possible

---

## Inspiration
- Nike shoe customizer (360-degree interactive product design)
- Barbie / The Sims (place furniture, see it in real space, gamified)
- Current Dormie model (curated items + purchase links) as the product backbone
