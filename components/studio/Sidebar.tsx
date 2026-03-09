"use client";

import { useState } from "react";
import { ColorGroup, PRODUCTS, Product, SelectedItems } from "@/lib/products";

const CATEGORIES = [
  { label: "Bedding",    subcategories: ["Comforters", "Sheets", "Pillows", "Mattress Toppers"] },
  { label: "Furniture",  subcategories: ["Desk Chairs", "Shelves", "Bed Risers", "Side Tables"] },
  { label: "Decor",      subcategories: ["Posters", "String Lights", "Mirrors", "Rugs"] },
  { label: "Lighting",   subcategories: ["Desk Lamps", "Floor Lamps", "LED Strips"] },
  { label: "Storage",    subcategories: ["Under-Bed", "Closet Organizers", "Bins", "Hooks"] },
  { label: "Desk Setup", subcategories: ["Monitors", "Desk Mats", "Organizers", "Accessories"] },
];

type SidebarProps = {
  selectedItems: SelectedItems;
  onSelect: (subcategory: string, product: Product) => void;
  onDeselect: (subcategory: string) => void;
};

// Thumbnail with color fallback
function ProductThumb({ thumbnail, color, label }: { thumbnail?: string; color: string; label: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (thumbnail && !imgFailed) {
    return (
      <img
        src={thumbnail}
        alt={label}
        onError={() => setImgFailed(true)}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border border-black/10"
      />
    );
  }
  return (
    <div
      className="w-20 h-20 rounded-lg flex-shrink-0 border border-black/10 flex items-center justify-center"
      style={{ backgroundColor: color }}
    />
  );
}

export default function Sidebar({ selectedItems, onSelect, onDeselect }: SidebarProps) {
  const [openCat,   setOpenCat]   = useState<string | null>("Bedding");
  const [openSub,   setOpenSub]   = useState<string | null>("Comforters");
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleCat(cat: string) {
    setOpenCat(openCat === cat ? null : cat);
    setOpenSub(null);
    setOpenGroup(null);
  }

  function toggleSub(sub: string) {
    if (!PRODUCTS[sub]) return;
    setOpenSub(openSub === sub ? null : sub);
    setOpenGroup(null);
  }

  function toggleGroup(key: string) {
    setOpenGroup(openGroup === key ? null : key);
  }

  return (
    <aside className="w-72 h-full bg-white border-r border-gray-100 flex flex-col overflow-y-auto">

      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Customize Your Room</h2>
      </div>

      <nav className="flex-1 py-1">
        {CATEGORIES.map((cat) => {
          const isCatOpen = openCat === cat.label;

          return (
            <div key={cat.label}>
              {/* ── Category ── */}
              <button
                onClick={() => toggleCat(cat.label)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                {cat.label}
                <span className="text-gray-400 text-[10px]">{isCatOpen ? "▲" : "▼"}</span>
              </button>

              {isCatOpen && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {cat.subcategories.map((sub) => {
                    const groups: ColorGroup[] | undefined = PRODUCTS[sub];
                    const isSubOpen = openSub === sub;
                    const hasProducts = !!groups;

                    // Any product in this sub selected?
                    const selectedInSub = selectedItems[sub];

                    return (
                      <div key={sub}>
                        {/* ── Subcategory ── */}
                        <button
                          onClick={() => toggleSub(sub)}
                          disabled={!hasProducts}
                          className={`w-full flex items-center justify-between px-7 py-2.5 text-sm transition-colors ${
                            hasProducts
                              ? "text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                              : "text-gray-400 cursor-default"
                          } ${isSubOpen ? "bg-gray-100 font-medium" : ""}`}
                        >
                          <span className="flex items-center gap-2">
                            {selectedInSub && (
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: selectedInSub.color }}
                              />
                            )}
                            {sub}
                            {!hasProducts && (
                              <span className="text-[10px] text-gray-300">coming soon</span>
                            )}
                          </span>
                          {hasProducts && (
                            <span className="text-gray-400 text-[10px]">{isSubOpen ? "▲" : "▼"}</span>
                          )}
                        </button>

                        {/* ── Color groups ── */}
                        {isSubOpen && groups && (
                          <div className="bg-white border-t border-gray-100">
                            {groups.map((group) => {
                              const groupKey = `${sub}-${group.id}`;
                              const isGroupOpen = openGroup === groupKey;
                              const selectedVariant = selectedItems[sub];
                              const groupIsActive = group.variants.some(v => v.id === selectedVariant?.id);

                              return (
                                <div key={group.id}>
                                  {/* ── Color group header ── */}
                                  <button
                                    onClick={() => toggleGroup(groupKey)}
                                    className={`w-full flex items-center gap-3 px-9 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                                      isGroupOpen ? "bg-gray-50 font-medium" : ""
                                    }`}
                                  >
                                    {/* Color swatch */}
                                    <span
                                      className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                                        groupIsActive ? "border-black" : "border-gray-300"
                                      }`}
                                      style={{ backgroundColor: group.color }}
                                    />
                                    <span className={`flex-1 text-left ${groupIsActive ? "text-black font-semibold" : "text-gray-600"}`}>
                                      {group.label}
                                    </span>
                                    {groupIsActive && (
                                      <span className="text-[10px] text-gray-500 mr-1">selected</span>
                                    )}
                                    <span className="text-gray-400 text-[10px]">{isGroupOpen ? "▲" : "▼"}</span>
                                  </button>

                                  {/* ── Product variants ── */}
                                  {isGroupOpen && (
                                    <div className="px-3 pb-3 bg-white border-t border-gray-100 space-y-2.5 pt-2.5">
                                      {group.variants.map((product) => {
                                        const isSelected = selectedItems[sub]?.id === product.id;

                                        return (
                                          <div
                                            key={product.id}
                                            className={`rounded-xl border overflow-hidden transition-all ${
                                              isSelected
                                                ? "border-black shadow-sm"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                          >
                                            {/* Product info row */}
                                            <div className="flex gap-3 p-2.5">
                                              <ProductThumb
                                                thumbnail={product.thumbnail}
                                                color={product.color}
                                                label={product.label}
                                              />
                                              <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                  <p className="text-xs font-semibold text-gray-800 leading-snug">{product.label}</p>
                                                  <p className="text-sm font-bold text-gray-700 mt-1">{product.price}</p>
                                                </div>
                                                {/* Checkbox / select + deselect */}
                                                <div className="mt-2 flex items-center gap-2">
                                                  <button
                                                    onClick={() => isSelected ? onDeselect(sub) : onSelect(sub, product)}
                                                    className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                                                      isSelected ? "text-black" : "text-gray-500 hover:text-black"
                                                    }`}
                                                  >
                                                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                      isSelected ? "bg-black border-black" : "border-gray-300"
                                                    }`}>
                                                      {isSelected && (
                                                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                      )}
                                                    </span>
                                                    {isSelected ? "Applied" : "Add to room"}
                                                  </button>
                                                  {isSelected && (
                                                    <button
                                                      onClick={() => onDeselect(sub)}
                                                      className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                      Remove
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Shop link */}
                                            {product.link && (
                                              <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors border-t border-gray-100"
                                              >
                                                Shop This Item
                                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                                  <path d="M1.5 7.5L7.5 1.5M7.5 1.5H2.5M7.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                              </a>
                                            )}
                                          </div>
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
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">Dormie Studio · Tulane University</p>
      </div>
    </aside>
  );
}
