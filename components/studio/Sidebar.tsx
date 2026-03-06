"use client";

import { useState } from "react";
import { PRODUCTS, Product, SelectedItems, StyleId, STYLES } from "@/lib/products";

const CATEGORIES = [
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

type SidebarProps = {
  selectedItems: SelectedItems;
  onSelect: (subcategory: string, product: Product) => void;
  activeStyle: StyleId | null;
  onStyleSelect: (styleId: StyleId) => void;
};

export default function Sidebar({ selectedItems, onSelect, activeStyle, onStyleSelect }: SidebarProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  function handleSubClick(sub: string) {
    if (!PRODUCTS[sub]) return;
    setOpenSub(openSub === sub ? null : sub);
  }

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto">
      {/* ── Style toggles ── */}
      <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Style</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(STYLES) as [StyleId, typeof STYLES[StyleId]][]).map(([id, style]) => (
            <button
              key={id}
              onClick={() => onStyleSelect(id)}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border text-xs font-medium transition-all ${
                activeStyle === id
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              <span className="text-base mb-0.5">{style.emoji}</span>
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Category label ── */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-xs uppercase tracking-widest text-gray-400">Customize</h2>
      </div>

      <nav className="flex-1 py-2">
        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <button
              onClick={() => {
                setOpen(open === cat.label ? null : cat.label);
                setOpenSub(null);
              }}
              className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {cat.label}
              <span className="text-gray-400 text-xs">{open === cat.label ? "▲" : "▼"}</span>
            </button>

            {open === cat.label && (
              <div className="bg-gray-50 border-t border-gray-100">
                {cat.subcategories.map((sub) => {
                  const hasProducts = !!PRODUCTS[sub];
                  const isOpenSub = openSub === sub;
                  const selected = selectedItems[sub];

                  return (
                    <div key={sub}>
                      <button
                        onClick={() => handleSubClick(sub)}
                        disabled={!hasProducts}
                        className={`w-full flex items-center justify-between px-8 py-2.5 text-sm transition-colors ${
                          hasProducts
                            ? "text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                            : "text-gray-400 cursor-default"
                        } ${isOpenSub ? "bg-gray-100 font-medium" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          {selected && (
                            <span
                              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: selected.color }}
                            />
                          )}
                          {sub}
                        </span>
                        {hasProducts && (
                          <span className="text-gray-400 text-xs">{isOpenSub ? "▲" : "▼"}</span>
                        )}
                      </button>

                      {isOpenSub && PRODUCTS[sub] && (
                        <div className="bg-white border-t border-gray-100 px-8 py-2 space-y-1">
                          {PRODUCTS[sub].map((product) => {
                            const isSelected = selectedItems[sub]?.id === product.id;
                            return (
                              <button
                                key={product.id}
                                onClick={() => onSelect(sub, product)}
                                className={`w-full flex items-center gap-3 py-2 px-2 rounded-lg text-left transition-colors ${
                                  isSelected
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-full flex-shrink-0 border-2 ${
                                    isSelected ? "border-black" : "border-gray-200"
                                  }`}
                                  style={{ backgroundColor: product.color }}
                                />
                                <span className="flex-1 text-xs text-gray-700">{product.label}</span>
                                <span className="text-xs text-gray-400">{product.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
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
