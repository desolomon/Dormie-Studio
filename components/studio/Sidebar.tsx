"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, Product, SelectedItems } from "@/lib/products";

const CATEGORIES = [
  { label: "All",       subcategories: [] as string[] },
  { label: "Bedding",   subcategories: ["Comforters", "Sheets", "Pillows", "Mattress Toppers"] },
  { label: "Furniture", subcategories: ["Desk Chairs", "Shelves", "Side Tables"] },
  { label: "Lighting",  subcategories: ["Desk Lamps", "Floor Lamps", "LED Strips"] },
];

type ActiveTab = "add" | "list" | "favorites";

type SidebarProps = {
  activeTab: ActiveTab;
  selectedItems: SelectedItems;
  onSelect: (subcategory: string, product: Product) => void;
  onDeselect: (subcategory: string) => void;
};

function getAllProducts(): { subcategory: string; product: Product }[] {
  const results: { subcategory: string; product: Product }[] = [];
  for (const [subcategory, products] of Object.entries(PRODUCTS)) {
    for (const product of products as Product[]) {
      results.push({ subcategory, product });
    }
  }
  return results;
}

function ProductCard({
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
      className={`relative cursor-pointer bg-white transition-all duration-150 ${
        isSelected
          ? "ring-2 ring-[#0058a3]"
          : "hover:shadow-lg"
      }`}
      onClick={() => (isSelected ? onDeselect() : onSelect())}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-[#0058a3] rounded-full flex items-center justify-center shadow-sm">
          <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Image area — white bg, product on transparent like IKEA */}
      <div className="bg-white w-full aspect-square flex items-center justify-center overflow-hidden p-3">
        {product.thumbnail && !imgFailed ? (
          <img
            src={product.thumbnail}
            alt={product.label}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full opacity-60"
            style={{ backgroundColor: product.color }}
          />
        )}
      </div>

      {/* Text — IKEA style */}
      <div className="px-2 pb-3 pt-1">
        <p className="text-[11px] font-bold text-[#111] leading-snug line-clamp-2">
          {product.label}
        </p>
        {product.description && (
          <p className="text-[10px] text-[#767676] mt-0.5 leading-snug line-clamp-1">
            {product.description}
          </p>
        )}
        <p className="text-[12px] font-bold text-[#111] mt-1.5">{product.price}</p>
      </div>
    </div>
  );
}

export default function Sidebar({ activeTab, selectedItems, onSelect, onDeselect }: SidebarProps) {
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
      className="w-[420px] h-full bg-white border-r border-[#dfdfdf] flex flex-col"
      style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}
    >
      {/* ── ADD TAB ── */}
      {activeTab === "add" && (
        <>
          {/* Hamburger + pill search */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center flex-shrink-0 hover:bg-[#f5f5f5] rounded transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </svg>
              </button>
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#767676] pointer-events-none"
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs border border-[#dfdfdf] rounded-full focus:outline-none focus:border-[#111] bg-white placeholder-[#767676]"
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
          </div>

          {/* Featured items heading */}
          <div className="flex items-center justify-between px-3 pb-2">
            <h2 className="text-sm font-bold text-[#111]">Featured items</h2>
            <button className="text-xs text-[#111] underline hover:no-underline font-medium">
              Show more products
            </button>
          </div>

          {/* Category tabs */}
          <div
            className="flex items-center border-b border-[#dfdfdf] overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-3 py-2 text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0 border-b-2 -mb-px ${
                  activeCategory === cat.label
                    ? "border-[#111] text-[#111]"
                    : "border-transparent text-[#484848] hover:text-[#111] hover:border-[#dfdfdf]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-y-auto p-2.5">
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
              <div className="grid grid-cols-3 gap-2">
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
        </>
      )}

      {/* ── LIST TAB ── */}
      {activeTab === "list" && (
        <>
          <div className="px-4 pt-4 pb-3 border-b border-[#dfdfdf]">
            <h2 className="text-sm font-bold text-[#111]">
              Your room · {selectedCount} item{selectedCount !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {selectedCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center px-4">
                <p className="text-xs text-[#767676]">No items selected yet.</p>
                <p className="text-xs text-[#767676] mt-1">Switch to Add to browse products.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#dfdfdf]">
                {Object.entries(selectedItems).map(([sub, product]) =>
                  product ? (
                    <div key={sub} className="flex items-center gap-3 px-4 py-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-[#dfdfdf]"
                        style={{ backgroundColor: product.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#111] uppercase tracking-wide">{sub}</p>
                        <p className="text-xs text-[#484848] truncate">{product.label}</p>
                        <p className="text-xs font-bold text-[#111]">{product.price}</p>
                      </div>
                      <button
                        onClick={() => onDeselect(sub)}
                        className="w-6 h-6 flex items-center justify-center text-[#767676] hover:text-[#111] flex-shrink-0 rounded hover:bg-[#f5f5f5] transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>

          {selectedCount > 0 && (
            <div className="border-t border-[#dfdfdf] px-4 py-3 bg-white flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#484848]">Total</span>
                <span className="text-sm font-bold text-[#111]">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-[#0058a3] text-white text-xs font-bold py-3 hover:bg-[#004f93] transition-colors tracking-wide rounded">
                ADD ALL TO CART
              </button>
            </div>
          )}
        </>
      )}

      {/* ── FAVORITES TAB ── */}
      {activeTab === "favorites" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dfdfdf" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-sm text-[#767676]">Save items to your favorites</p>
        </div>
      )}
    </aside>
  );
}
