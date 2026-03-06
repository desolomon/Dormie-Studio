# Dormie Studio

Interactive 3D dorm room designer for college students. Users select their school, furnish a realistic virtual dorm room, and shop every item directly.

**Live site:** [hellodormie.com](https://www.hellodormie.com)

## Stack

- **Next.js** — routing, pages, API routes
- **React Three Fiber + Three.js** — 3D room builder
- **Tailwind CSS** — UI/sidebar styling
- **Supabase** — database + auth (planned)
- **Stripe / Shop** — payments (planned)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to see the 3D room builder.

## Project Docs

- [`docs/dormieoutline.md`](docs/dormieoutline.md) — product overview
- [`docs/dormieroadmap.md`](docs/dormieroadmap.md) — development roadmap
- [`docs/Tulane_Monroe_Room_Plan.pdf`](docs/Tulane_Monroe_Room_Plan.pdf) — pilot school floor plan

## Current Status

- 3D room rendering complete (Tulane Monroe Hall, accurate dimensions)
- Sidebar UI shell built with categories
- Item selection/placement logic not yet connected
- Product catalog, auth, and payments not yet built
