"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/studio/Sidebar";
import { SCHOOLS } from "@/lib/schools";
import { Product, SelectedItems, StyleId, STYLES } from "@/lib/products";

// Load 3D canvas client-side only (no SSR)
const StudioCanvas = dynamic(() => import("@/components/studio/StudioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <p className="text-sm text-gray-400">Loading room...</p>
    </div>
  ),
});

function StudioContent() {
  const params = useSearchParams();
  const schoolId = params.get("school") ?? "tulane";
  const school = SCHOOLS[schoolId] ?? SCHOOLS["tulane"];

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [activeStyle, setActiveStyle] = useState<StyleId | null>(null);

  function handleSelect(subcategory: string, product: Product) {
    setActiveStyle(null); // deselect style when manually overriding
    setSelectedItems((prev) => ({ ...prev, [subcategory]: product }));
  }

  function handleStyleSelect(styleId: StyleId) {
    if (activeStyle === styleId) {
      // toggle off — clear everything
      setActiveStyle(null);
      setSelectedItems({});
    } else {
      setActiveStyle(styleId);
      setSelectedItems(STYLES[styleId].items);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white z-10">
        <div className="flex items-center gap-3">
          <a href="/" className="text-xl font-bold tracking-tight">dormie</a>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-500">{school.dorm} — {school.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">
            {school.dimensions.width}′ × {school.dimensions.depth}′
          </span>
          <button className="bg-black text-white rounded-full px-5 py-2 text-xs font-medium hover:bg-gray-800 transition-colors">
            Save Design
          </button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedItems={selectedItems}
          onSelect={handleSelect}
          activeStyle={activeStyle}
          onStyleSelect={handleStyleSelect}
        />
        <StudioCanvas school={school} selectedItems={selectedItems} />
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
