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

function StudioContent() {
  const params = useSearchParams();
  const schoolId = params.get("school") ?? "tulane";
  const school = SCHOOLS[schoolId] ?? SCHOOLS["tulane"];

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

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

  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}>
      {/* Top bar — IKEA style */}
      <header className="flex items-center justify-between px-6 py-0 border-b border-[#dfdfdf] bg-white z-10" style={{ minHeight: 56 }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xl font-bold tracking-tight text-[#111]">dormie</a>
          <span className="text-[#dfdfdf]">|</span>
          <span className="text-sm text-[#484848]">{school.dorm}</span>
          <span className="text-[#dfdfdf]">·</span>
          <span className="text-sm text-[#484848]">{school.name}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[#767676] text-xs">
            {school.dimensions.width}′ × {school.dimensions.depth}′ room
          </span>
          <button className="border border-[#111] text-[#111] text-xs font-bold px-5 py-2 hover:bg-[#111] hover:text-white transition-colors tracking-wide">
            SAVE DESIGN
          </button>
          <a
            href="https://www.hellodormie.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0058a3] text-white text-xs font-bold px-5 py-2 hover:bg-[#004f93] transition-colors tracking-wide"
          >
            SHOP KITS
          </a>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedItems={selectedItems}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />
        {/* Canvas wrapper with IKEA light gray background */}
        <div className="flex-1 relative bg-[#e8e8e8]">
          <StudioCanvas school={school} selectedItems={selectedItems} />
          {/* Room label overlay */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-[#dfdfdf] px-3 py-1.5">
            <p className="text-[10px] text-[#484848] font-medium">
              3D Preview · Click and drag to rotate
            </p>
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
