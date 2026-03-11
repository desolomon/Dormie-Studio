"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { ItemForRender } from "./ThreeRoomCanvas";

const ThreeRoomCanvas = dynamic(() => import("./ThreeRoomCanvas"), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────
type FurnitureDef = {
  id: string;
  name: string;
  price: number;
  color: string;
  accent: string;
  w: number;
  d: number;
  category: string;
};

type PlacedItem = FurnitureDef & {
  placedId: string;
  fx: number;   // 0=left  1=right
  fy: number;   // 0=front 1=back
  entering: boolean;
};

// ─── Catalog ──────────────────────────────────────────────────────────────────
const CATEGORIES = ["Sofas", "Tables", "Chairs", "Lamps", "Rugs", "Shelves"];

const CATALOG: Record<string, FurnitureDef[]> = {
  Sofas: [
    { id: "s1", name: "Arc Cloud Sofa",    price: 1299, color: "#7a6548", accent: "#c4a882", w: 100, d: 44, category: "Sofas" },
    { id: "s2", name: "Velvet Sectional",  price: 2499, color: "#4a3060", accent: "#7a50a0", w: 120, d: 52, category: "Sofas" },
    { id: "s3", name: "Linen 3-Seater",    price:  899, color: "#c0ae94", accent: "#e8ddd0", w:  90, d: 40, category: "Sofas" },
    { id: "s4", name: "Bouclé Love Seat",  price:  749, color: "#d4c5b0", accent: "#f0e8dc", w:  76, d: 38, category: "Sofas" },
  ],
  Tables: [
    { id: "t1", name: "Marble Coffee Table", price:  649, color: "#c8c0b8", accent: "#e8e4e0", w: 72, d: 42, category: "Tables" },
    { id: "t2", name: "Oak Side Table",       price:  299, color: "#a0702a", accent: "#c8963a", w: 42, d: 42, category: "Tables" },
    { id: "t3", name: "Glass Dining Table",   price: 1199, color: "#80b0c8", accent: "#b8d8e8", w: 104, d: 58, category: "Tables" },
  ],
  Chairs: [
    { id: "c1", name: "Bouclé Armchair", price: 599, color: "#e8ddd0", accent: "#f8f0e8", w: 52, d: 52, category: "Chairs" },
    { id: "c2", name: "Wicker Lounge",   price: 449, color: "#8b6040", accent: "#c89050", w: 52, d: 58, category: "Chairs" },
    { id: "c3", name: "Accent Chair",    price: 349, color: "#2a5050", accent: "#3a8078", w: 50, d: 50, category: "Chairs" },
  ],
  Lamps: [
    { id: "l1", name: "Arc Floor Lamp",   price: 349, color: "#d4a820", accent: "#f0d050", w: 32, d: 32, category: "Lamps" },
    { id: "l2", name: "Linen Pendant",    price: 249, color: "#e0d080", accent: "#f8f0b0", w: 26, d: 26, category: "Lamps" },
    { id: "l3", name: "Marble Table Lamp",price: 199, color: "#c0b8b0", accent: "#e8e0d8", w: 22, d: 22, category: "Lamps" },
  ],
  Rugs: [
    { id: "r1", name: "Moroccan 8×10",    price: 799, color: "#8b4040", accent: "#c06858", w: 114, d: 84, category: "Rugs" },
    { id: "r2", name: "Shag Circle Rug",  price: 499, color: "#d0c0a8", accent: "#e8ddd0", w:  94, d: 94, category: "Rugs" },
    { id: "r3", name: "Geo Runner",       price: 299, color: "#4a5060", accent: "#7080a0", w: 124, d: 44, category: "Rugs" },
  ],
  Shelves: [
    { id: "sh1", name: "Floating Shelf Set",    price: 299, color: "#6b4c30", accent: "#a07040", w: 84, d: 18, category: "Shelves" },
    { id: "sh2", name: "Industrial Bookcase", price: 449, color: "#3a3a3a", accent: "#686868", w: 58, d: 32, category: "Shelves" },
  ],
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function SofaIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 80 48" fill="none">
      <rect x="4" y="20" width="72" height="20" rx="5" fill={c} />
      <rect x="4" y="9"  width="72" height="14" rx="4" fill={a} opacity="0.85" />
      <rect x="1" y="18" width="9"  height="22" rx="3" fill={c} />
      <rect x="70" y="18" width="9" height="22" rx="3" fill={c} />
      <rect x="7"  y="22" width="29" height="14" rx="3" fill={a} opacity="0.2" />
      <rect x="44" y="22" width="29" height="14" rx="3" fill={a} opacity="0.2" />
      <rect x="8"  y="40" width="5" height="6" rx="2" fill={c} opacity="0.6" />
      <rect x="67" y="40" width="5" height="6" rx="2" fill={c} opacity="0.6" />
    </svg>
  );
}

function TableIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 80 48" fill="none">
      <rect x="4"  y="16" width="72" height="8" rx="3" fill={c} />
      <rect x="4"  y="16" width="72" height="4" rx="3" fill={a} opacity="0.35" />
      <rect x="8"  y="24" width="4" height="18" rx="2" fill={c} opacity="0.75" />
      <rect x="68" y="24" width="4" height="18" rx="2" fill={c} opacity="0.75" />
      <rect x="22" y="24" width="3" height="14" rx="1.5" fill={c} opacity="0.5" />
      <rect x="55" y="24" width="3" height="14" rx="1.5" fill={c} opacity="0.5" />
    </svg>
  );
}

function ChairIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none">
      <rect x="4" y="8"  width="48" height="16" rx="4" fill={a} opacity="0.85" />
      <rect x="4" y="26" width="48" height="14" rx="3" fill={c} />
      <rect x="6"  y="40" width="4" height="13" rx="2" fill={c} opacity="0.7" />
      <rect x="46" y="40" width="4" height="13" rx="2" fill={c} opacity="0.7" />
      <rect x="16" y="40" width="3" height="10" rx="1.5" fill={c} opacity="0.5" />
      <rect x="37" y="40" width="3" height="10" rx="1.5" fill={c} opacity="0.5" />
    </svg>
  );
}

function LampIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none">
      <ellipse cx="20" cy="12" rx="14" ry="9" fill={a} opacity="0.6" />
      <polygon points="8,12 32,12 26,28 14,28" fill={c} />
      <rect x="18" y="28" width="4" height="22" rx="2" fill={c} opacity="0.8" />
      <ellipse cx="20" cy="52" rx="9" ry="3.5" fill={c} opacity="0.5" />
      <ellipse cx="20" cy="10" rx="10" ry="5" fill={a} opacity="0.45" />
    </svg>
  );
}

function RugIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none">
      <ellipse cx="40" cy="30" rx="37" ry="26" fill={c} />
      <ellipse cx="40" cy="30" rx="28" ry="19" fill={a} opacity="0.28" />
      <ellipse cx="40" cy="30" rx="18" ry="12" fill={c} opacity="0.45" />
      <ellipse cx="40" cy="30" rx="9"  ry="6"  fill={a} opacity="0.3" />
      <line x1="3"  y1="30" x2="77" y2="30" stroke={a} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="4"  x2="40" y2="56" stroke={a} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function ShelfIcon({ c, a }: { c: string; a: string }) {
  return (
    <svg viewBox="0 0 72 60" fill="none">
      <rect x="2" y="4"  width="68" height="5" rx="2" fill={c} />
      <rect x="2" y="28" width="68" height="5" rx="2" fill={c} />
      <rect x="2" y="51" width="68" height="5" rx="2" fill={c} />
      <rect x="2" y="4"  width="4"  height="52" rx="2" fill={c} opacity="0.7" />
      <rect x="66" y="4" width="4"  height="52" rx="2" fill={c} opacity="0.7" />
      <rect x="9"  y="9"  width="5" height="17" rx="1" fill={a} opacity="0.8" />
      <rect x="16" y="11" width="5" height="15" rx="1" fill={a} opacity="0.55" />
      <rect x="23" y="7"  width="4" height="19" rx="1" fill={a} opacity="0.7" />
      <rect x="29" y="10" width="6" height="16" rx="1" fill={a} opacity="0.5" />
      <rect x="8"  y="33" width="5" height="16" rx="1" fill={a} opacity="0.65" />
      <rect x="15" y="35" width="6" height="14" rx="1" fill={a} opacity="0.5" />
      <rect x="23" y="32" width="4" height="17" rx="1" fill={a} opacity="0.7" />
    </svg>
  );
}

function FurnitureIcon({ item }: { item: FurnitureDef }) {
  const p = { c: item.color, a: item.accent };
  switch (item.category) {
    case "Sofas":   return <SofaIcon  {...p} />;
    case "Tables":  return <TableIcon {...p} />;
    case "Chairs":  return <ChairIcon {...p} />;
    case "Lamps":   return <LampIcon  {...p} />;
    case "Rugs":    return <RugIcon   {...p} />;
    default:        return <ShelfIcon {...p} />;
  }
}


// ─── Furniture Card ───────────────────────────────────────────────────────────
function FurnitureCard({ item, isScanning, onAdd }: {
  item: FurnitureDef; isScanning: boolean; onAdd: () => void;
}) {
  return (
    <button
      onClick={onAdd}
      disabled={isScanning}
      className="w-full text-left relative overflow-hidden transition-all duration-200"
      style={{
        padding: "10px 12px", borderRadius: 12,
        background: isScanning ? "rgba(0,212,255,0.07)" : "rgba(255,255,255,0.04)",
        border: isScanning ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
        cursor: isScanning ? "wait" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isScanning) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        if (!isScanning) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
      }}
    >
      {/* AR scan rings */}
      {isScanning && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
          {[0, 220, 440].map((delay) => (
            <div key={delay} style={{
              position: "absolute", width: 46, height: 46, borderRadius: "50%",
              border: "1.5px solid rgba(0,212,255,0.9)",
              animation: `scanRing 1.2s ${delay}ms ease-out infinite`,
            }} />
          ))}
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 10px #00d4ff" }} />
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 9, flexShrink: 0, overflow: "hidden", padding: 5,
          background: `${item.color}18`, border: `1px solid ${item.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}>
          <FurnitureIcon item={item} />
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.name}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            ${item.price.toLocaleString()}
          </div>
        </div>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
          background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, color: "rgba(0,212,255,0.7)",
        }}>
          +
        </div>
      </div>
    </button>
  );
}

// ─── Context Card ─────────────────────────────────────────────────────────────
function ContextCard({ item, onRemove, onDuplicate, onClose }: {
  item: PlacedItem; onRemove: () => void; onDuplicate: () => void; onClose: () => void;
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute", bottom: 80, left: 20, zIndex: 100,
        background: "rgba(8,8,24,0.92)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(0,212,255,0.22)", borderRadius: 16,
        padding: "14px 16px", minWidth: 230,
        boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.08)",
        animation: "slideIn 0.18s ease",
      }}
    >
      <button onClick={onClose} style={{
        position: "absolute", top: 10, right: 12,
        background: "none", border: "none", color: "rgba(255,255,255,0.3)",
        cursor: "pointer", fontSize: 18, lineHeight: 1,
      }}>×</button>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#00d4ff", letterSpacing: "0.12em", marginBottom: 4 }}>SELECTED</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{item.name}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>${item.price.toLocaleString()}</div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {[
          { label: "Duplicate", action: onDuplicate, bg: "rgba(0,212,255,0.09)", border: "rgba(0,212,255,0.25)", color: "#00d4ff" },
          { label: "Remove",    action: onRemove,    bg: "rgba(255,80,80,0.09)",  border: "rgba(255,80,80,0.25)",  color: "#ff6060" },
        ].map(({ label, action, bg, border, color }) => (
          <button key={label} onClick={action} style={{
            flex: 1, padding: "8px 0", borderRadius: 9, fontSize: 11, fontWeight: 600,
            background: bg, border: `1px solid ${border}`, color, cursor: "pointer",
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ARRoomDesigner() {
  const [activeCategory, setActiveCategory] = useState("Sofas");
  const [placedItems, setPlacedItems]       = useState<PlacedItem[]>([]);
  const [selectedId, setSelectedId]         = useState<string | null>(null);
  const [scanningId, setScanningId]         = useState<string | null>(null);
  const [viewMode, setViewMode]             = useState<"ar" | "plan">("ar");

  const totalCost = placedItems.reduce((s, i) => s + i.price, 0);
  const selectedItem = placedItems.find((p) => p.placedId === selectedId) ?? null;

  // Add item with AR scan animation
  function handleAdd(item: FurnitureDef) {
    if (scanningId) return;
    setScanningId(item.id);
    setTimeout(() => {
      setScanningId(null);
      const placedId = `${item.id}-${Date.now()}`;
      setPlacedItems((prev) => [...prev, {
        ...item, placedId,
        fx: 0.3 + Math.random() * 0.4,
        fy: 0.25 + Math.random() * 0.45,
        entering: true,
      }]);
      setTimeout(() => setPlacedItems((prev) =>
        prev.map((p) => p.placedId === placedId ? { ...p, entering: false } : p)
      ), 60);
    }, 1350);
  }

  function handleRemove(placedId: string) {
    setPlacedItems((prev) => prev.filter((p) => p.placedId !== placedId));
    setSelectedId(null);
  }

  function handleDuplicate(placedId: string) {
    const src = placedItems.find((p) => p.placedId === placedId);
    if (!src) return;
    const newId = `${src.id}-${Date.now()}`;
    setPlacedItems((prev) => [...prev, {
      ...src, placedId: newId,
      fx: Math.min(0.93, src.fx + 0.06),
      fy: Math.min(0.93, src.fy + 0.04),
      entering: true,
    }]);
    setTimeout(() => setPlacedItems((prev) =>
      prev.map((p) => p.placedId === newId ? { ...p, entering: false } : p)
    ), 60);
    setSelectedId(newId);
  }


  return (
    <div
      className="flex flex-col h-screen overflow-hidden select-none"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#070710" }}
    >
      {/* Styles + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes scanRing {
          0%   { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0" style={{
        borderColor: "rgba(255,255,255,0.07)",
        background: "rgba(6,6,18,0.96)", backdropFilter: "blur(20px)",
      }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#0070cc)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-white text-sm tracking-wide">AR Room Studio</span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
          {(["ar", "plan"] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: viewMode === mode ? "rgba(0,212,255,0.16)" : "transparent",
                color: viewMode === mode ? "#00d4ff" : "rgba(255,255,255,0.4)",
                border: viewMode === mode ? "1px solid rgba(0,212,255,0.28)" : "1px solid transparent",
              }}
            >
              {mode === "ar" ? "⬡ AR View" : "⊞ Plan View"}
            </button>
          ))}
        </div>

        <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          {placedItems.length} items ·{" "}
          <span style={{ color: "#00d4ff" }}>${totalCost.toLocaleString()}</span>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Canvas ────────────────────────────────────────────────── */}
        <div
          className="flex-1 relative"
          onClick={() => setSelectedId(null)}
        >
          <ThreeRoomCanvas
            placedItems={placedItems as ItemForRender[]}
            selectedId={selectedId}
            viewMode={viewMode}
            onItemClick={(id) => setSelectedId((prev) => prev === id ? null : id)}
          />

          {/* Context card */}
          {selectedItem && (
            <ContextCard
              item={selectedItem}
              onRemove={() => handleRemove(selectedItem.placedId)}
              onDuplicate={() => handleDuplicate(selectedItem.placedId)}
              onClose={() => setSelectedId(null)}
            />
          )}
        </div>

        {/* ── Furniture panel ───────────────────────────────────────── */}
        <aside className="flex flex-col border-l" style={{
          width: 284,
          borderColor: "rgba(255,255,255,0.07)",
          background: "rgba(6,6,18,0.92)", backdropFilter: "blur(20px)",
        }}>
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em" }}>FURNITURE</p>
            <p className="text-sm font-medium text-white">Browse catalog</p>
          </div>

          {/* Category chips */}
          <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "rgba(0,212,255,0.14)" : "rgba(255,255,255,0.05)",
                  color: activeCategory === cat ? "#00d4ff" : "rgba(255,255,255,0.45)",
                  border: activeCategory === cat ? "1px solid rgba(0,212,255,0.28)" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Item list */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2" style={{ scrollbarWidth: "none" }}>
            {CATALOG[activeCategory]?.map((item) => (
              <FurnitureCard
                key={item.id}
                item={item}
                isScanning={scanningId === item.id}
                onAdd={() => handleAdd(item)}
              />
            ))}
          </div>

          {/* Summary + CTA */}
          <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.32)" }}>
                {placedItems.length} item{placedItems.length !== 1 ? "s" : ""} placed
              </span>
              <span className="text-sm font-bold" style={{ color: "#00d4ff" }}>
                ${totalCost.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all" style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,110,200,0.12))",
              border: "1px solid rgba(0,212,255,0.24)", color: "#00d4ff",
            }}>
              Save Design →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
