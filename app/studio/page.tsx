"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/studio/Sidebar";
import { SCHOOLS } from "@/lib/schools";
import { Product, SelectedItems } from "@/lib/products";

const StudioCanvas = dynamic(() => import("@/components/studio/StudioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#e8e8e8]">
      <p className="text-sm text-[#767676]">Loading room...</p>
    </div>
  ),
});

type ActiveTab = "add" | "list" | "favorites";

function TabButton({
  label,
  active,
  onClick,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-4 h-full text-sm font-medium transition-colors border-b-2 ${
        active
          ? "border-[#111] text-[#111]"
          : "border-transparent text-[#767676] hover:text-[#111]"
      }`}
    >
      {label}
      {badge !== undefined && (
        <span className="ml-0.5 bg-[#0058a3] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function ViewButton({
  label,
  icon,
  active,
  hasChevron,
}: {
  label: string;
  icon: "dollhouse" | "top" | "side";
  active?: boolean;
  hasChevron?: boolean;
}) {
  const color = active ? "white" : "#484848";
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        active ? "bg-[#111] text-white" : "text-[#484848] hover:bg-[#f5f5f5]"
      }`}
    >
      {icon === "dollhouse" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )}
      {icon === "top" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      )}
      {icon === "side" && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
      )}
      {label}
      {hasChevron && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function StudioContent() {
  const params = useSearchParams();
  const schoolId = params.get("school") ?? "tulane";
  const school = SCHOOLS[schoolId] ?? SCHOOLS["tulane"];

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [activeTab, setActiveTab] = useState<ActiveTab>("add");

  function handleSelect(subcategory: string, product: Product) {
    setSelectedItems((prev) => ({ ...prev, [subcategory]: product }));
  }

  function handleDeselect(subcategory: string) {
    setSelectedItems((prev) => {
      const next = { ...prev };
      delete next[subcategory];
      return next;
    });
  }

  const selectedCount = Object.keys(selectedItems).length;
  const totalPrice = Object.values(selectedItems).reduce((sum, p) => {
    if (!p) return sum;
    const n = parseFloat(p.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}>
      {/* Top navbar */}
      <header
        className="flex items-center justify-between px-4 bg-white border-b border-[#dfdfdf] z-10 flex-shrink-0"
        style={{ height: 52 }}
      >
        {/* Left: tabs */}
        <div className="flex items-center h-full">
          <TabButton label="+ Add" active={activeTab === "add"} onClick={() => setActiveTab("add")} />
          <TabButton
            label="≡ List"
            active={activeTab === "list"}
            onClick={() => setActiveTab("list")}
            badge={selectedCount > 0 ? selectedCount : undefined}
          />
          <TabButton
            label="♡ Favorites"
            active={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
          />
        </div>

        {/* Center: back + title */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="w-7 h-7 rounded-full border border-[#dfdfdf] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="text-sm font-medium text-[#111] whitespace-nowrap">
            {school.dorm} · {school.name}
          </span>
        </div>

        {/* Right: icons + price + link + close */}
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] rounded transition-colors"
            title="Screenshot"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] rounded transition-colors"
            title="Save"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </button>
          <button
            className="flex items-center gap-1.5 h-8 px-2 hover:bg-[#f5f5f5] rounded transition-colors"
            onClick={() => setActiveTab("list")}
            title="View cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-sm font-bold text-[#111]">${totalPrice.toFixed(2)}</span>
          </button>
          <a
            href="https://www.hellodormie.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-[#929292] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
            title="hellodormie.com"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/"
            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] rounded transition-colors"
            title="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          selectedItems={selectedItems}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />

        {/* Canvas + controls */}
        <div className="flex-1 relative bg-[#e8e8e8] flex flex-col">
          <div className="flex-1 relative">
            <StudioCanvas school={school} selectedItems={selectedItems} />

            {/* Zoom controls — top right */}
            <div className="absolute top-4 right-4 flex flex-col z-10 shadow-sm">
              <button className="w-9 h-9 bg-white border border-[#dfdfdf] rounded-t-lg flex items-center justify-center hover:bg-[#f5f5f5] transition-colors text-lg font-medium text-[#111] leading-none">
                +
              </button>
              <button className="w-9 h-9 bg-white border border-[#dfdfdf] border-t-0 rounded-b-lg flex items-center justify-center hover:bg-[#f5f5f5] transition-colors text-lg font-medium text-[#111] leading-none">
                −
              </button>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div
            className="flex-shrink-0 bg-white border-t border-[#dfdfdf] flex items-center gap-1 px-4"
            style={{ height: 52 }}
          >
            <ViewButton label="Dollhouse" icon="dollhouse" active />
            <ViewButton label="Top view" icon="top" />
            <ViewButton label="Side views" icon="side" hasChevron />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense>
      <StudioContent />
    </Suspense>
  );
}
