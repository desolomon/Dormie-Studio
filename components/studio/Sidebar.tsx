"use client";

import { useState } from "react";

const CATEGORIES = [
  {
    label: "Style",
    subcategories: ["Boys", "Girls", "Neutral", "Aesthetic"],
  },
  {
    label: "Bedding",
    subcategories: ["Comforters", "Sheets", "Pillows", "Mattress Toppers"],
  },
  {
    label: "Furniture",
    subcategories: ["Desk Chairs", "Shelves", "Bed Risers", "Side Tables"],
  },
  {
    label: "Decor",
    subcategories: ["Posters", "String Lights", "Mirrors", "Rugs"],
  },
  {
    label: "Lighting",
    subcategories: ["Desk Lamps", "Floor Lamps", "LED Strips", "String Lights"],
  },
  {
    label: "Storage",
    subcategories: ["Under-Bed", "Closet Organizers", "Bins", "Hooks"],
  },
  {
    label: "Desk Setup",
    subcategories: ["Monitors", "Desk Mats", "Organizers", "Accessories"],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
      <div className="px-5 py-5 border-b border-gray-100">
        <h2 className="text-xs uppercase tracking-widest text-gray-400">Categories</h2>
      </div>
      <nav className="flex-1 py-2">
        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <button
              onClick={() => setOpen(open === cat.label ? null : cat.label)}
              className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {cat.label}
              <span className="text-gray-400 text-xs">{open === cat.label ? "▲" : "▼"}</span>
            </button>
            {open === cat.label && (
              <div className="bg-gray-50 border-t border-gray-100">
                {cat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">Dormie Studio · Tulane University</p>
      </div>
    </aside>
  );
}
