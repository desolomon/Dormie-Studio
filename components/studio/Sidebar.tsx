"use client";

import { useState, useMemo } from "react";
import { ColorGroup, PRODUCTS, Product, SelectedItems } from "@/lib/products";

const CATEGORIES = [
  { label: "All",        subcategories: [] as string[] },
  { label: "Bedding",    subcategories: ["Comforters", "Sheets", "Pillows", "Mattress Toppers"] },
  { label: "Furniture",  subcategories: ["Desk Chairs", "Shelves", "Bed Risers", "Side Tables"] },
  { label: "Decor",      subcategories: ["Posters", "String Lights", "Mirrors", "Rugs"] },
  { label: "Lighting",   subcategories: ["Desk Lamps", "Floor Lamps", "LED Strips"] },
  { label: "Storage",    subcategories: ["Under-Bed", "Closet Organizers", "Bins", "Hooks"] },
  { label: "Desk",       subcategories: ["Monitors", "Desk Mats", "Organizers", "Accessories"] },
];

type SidebarProps = {
  selectedItems: SelectedItems;
  onSelect: (subcategory: string, product: Product) => void;
  onDeselect: (subcategory: string) => void;
};

function getAllProducts(): { subcategory: string; product: Product }[] {
  const results: { subcategory: string; product: Product }[] = [];
  for (const [subcategory, groups] of Object.entries(PRODUCTS)) {
    for (const group of groups as ColorGroup[]) {
      for (const product of group.variants) {
        results.push({ subcategory, product });
      }
    }
  }
  return results;
}

function ProductCard({
  subcategory,
  product,
  isSelected,
  onSelect,
  onDeselect,
}: {
  subcategory: string;
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={`group relative bg-white border transition-all duration-150 cursor-pointer ${
        isSelected
          ? "border-[#0058a3] shadow-[0_0_0_2px_#0058a3]"
          : "border-[#dfdfdf] hover:border-[#929292]"
      }`}
      onClick={() => (isSelected ? onDeselect() : onSelect())}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-[#0058a3] rounded-full flex items-center justify-center shadow-sm">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center overflow-hidden">
        {product.thumbnail && !imgFailed ? (
          <img
            src={product.thumbnail}
            alt={product.label}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain p-3 mix-blend-multiply"
          />
        ) : (
          <div className="w-14 h-14 rounded" style={{ backgroundColor: product.color }} />
        )}
      </div>

      <div className="p-2.5 pt-2">
        <p className="text-[10px] font-bold text-[#111] uppercase tracking-wide leading-none mb-0.5">
          {subcategory}
        </p>
        <p className="text-[11px] text-[#484848] leading-snug line-clamp-2 mb-1.5">
          {product.label}
        </p>
        <p className="text-sm font-bold text-[#111]">{product.price}</p>

        <div className="mt-1.5 space-y-0.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#767676] flex-shrink-0" />
            <span className="text-[10px] text-[#767676] truncate">Delivery availability un...</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#767676] flex-shrink-0" />
            <span className="text-[10px] text-[#767676] truncate">Stock availability unk...</span>
          </div>
        </div>

        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 block text-[10px] text-[#0058a3] hover:underline font-medium"
          >
            View product ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ selectedItems, onSelect, onDeselect }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = useMemo(() => getAllProducts(), []);

  const filteredProducts = useMemo(() => {
    let items = allProducts;

    if (activeCategory !== "All") {
      const cat = CATEGORIES.find((c) => c.label === activeCategory);
      if (cat && cat.subcategories.length > 0) {
        items = items.filter((i) => cat.subcategories.includes(i.subcategory));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.product.label.toLowerCase().includes(q) ||
          i.subcategory.toLowerCase().includes(q)
      );
    }

    return items;
  }, [allProducts, activeCategory, searchQuery]);

  const selectedCount = Object.keys(selectedItems).length;
  const totalPrice = Object.values(selectedItems).reduce((sum, p) => {
    if (!p) return sum;
    const n = parseFloat(p.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <aside
      className="w-[340px] h-full bg-white border-r border-[#dfdfdf] flex flex-col"
      style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#dfdfdf]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-[#111]">Featured items</h2>
          <button className="text-xs text-[#111] underline hover:no-underline font-medium">
            Show more products
          </button>
        </div>

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767676] pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#929292] focus:outline-none focus:border-[#111] bg-white placeholder-[#767676]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] hover:text-[#111] text-sm leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center border-b border-[#dfdfdf] overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`px-3 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0 border-b-2 ${
              activeCategory === cat.label
                ? "border-[#111] text-[#111]"
                : "border-transparent text-[#484848] hover:text-[#111] hover:border-[#dfdfdf]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 py-2 bg-white border-b border-[#dfdfdf]">
        <p className="text-[10px] text-[#767676]">
          {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
          {searchQuery ? ` for "${searchQuery}"` : ""}
        </p>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-xs text-[#767676]">No products found</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-2 text-xs text-[#0058a3] underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.slice(0, 60).map(({ subcategory, product }) => {
              const isSelected = selectedItems[subcategory]?.id === product.id;
              return (
                <ProductCard
                  key={product.id}
                  subcategory={subcategory}
                  product={product}
                  isSelected={isSelected}
                  onSelect={() => onSelect(subcategory, product)}
                  onDeselect={() => onDeselect(subcategory)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Cart summary */}
      {selectedCount > 0 && (
        <div className="border-t border-[#dfdfdf] px-4 py-3 bg-[#f5f5f5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#111]">
              {selectedCount} item{selectedCount !== 1 ? "s" : ""} in room
            </span>
            <span className="text-sm font-bold text-[#111]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2.5">
            {Object.entries(selectedItems).map(([sub, product]) =>
              product ? (
                <div
                  key={sub}
                  className="flex items-center gap-1 bg-white border border-[#dfdfdf] px-2 py-0.5"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                  <span className="text-[10px] text-[#111] max-w-[72px] truncate">{sub}</span>
                  <button
                    onClick={() => onDeselect(sub)}
                    className="text-[#767676] hover:text-[#111] ml-0.5 text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ) : null
            )}
          </div>
          <button className="w-full bg-[#0058a3] text-white text-xs font-bold py-2.5 hover:bg-[#004f93] transition-colors tracking-wide">
            ADD ALL TO CART
          </button>
        </div>
      )}
    </aside>
  );
}
