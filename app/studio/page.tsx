"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { THEMES } from "@/lib/themes";

const StudioCanvas = dynamic(() => import("@/components/studio/StudioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#F7F7F7]">
      <p className="text-sm text-[#767676]">Loading room...</p>
    </div>
  ),
});

function StudioContent() {
  const params = useSearchParams();
  const router = useRouter();

  const gender = params.get("gender") ?? "girls";
  const themeId = params.get("theme") ?? "floral";
  const theme = THEMES[themeId] ?? THEMES["floral"];

  const displayGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const kitTotal = theme.kit.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
    >
      {/* Top navbar */}
      <header
        className="flex items-center justify-between px-6 bg-white border-b border-[#dfdfdf] flex-shrink-0"
        style={{ height: 56 }}
      >
        {/* Logo */}
        <span className="text-xl font-bold text-[#111] tracking-tight">dormie studio</span>

        {/* Theme + gender */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#111]">{theme.name}</span>
          <span className="text-[#dfdfdf] select-none">·</span>
          <span className="text-sm text-[#484848]">{displayGender}</span>
        </div>

        {/* Change theme */}
        <button
          onClick={() => router.push(`/theme/${gender}`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#dfdfdf] text-sm font-medium text-[#484848] hover:bg-[#f5f5f5] hover:border-[#bbb] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Change Theme
        </button>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Canvas — 70% */}
        <div className="flex-[7] min-w-0 bg-[#F7F7F7]">
          <StudioCanvas theme={theme} />
        </div>

        {/* Kit Sidebar — 30% */}
        <aside className="flex-[3] min-w-0 flex flex-col bg-white border-l border-[#dfdfdf]" style={{ minWidth: 260, maxWidth: 380 }}>
          {/* Sidebar header */}
          <div className="px-5 py-4 border-b border-[#dfdfdf] flex-shrink-0">
            <h2 className="text-base font-bold text-[#111]">Your Room Kit</h2>
            <p className="text-xs text-[#767676] mt-0.5">
              {theme.kit.length} items · {theme.name} theme
            </p>
          </div>

          {/* Item list */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f2f2f2]">
            {theme.kit.map((item, i) => (
              <div key={i} className="px-5 py-3.5">
                <p className="text-sm font-semibold text-[#111] leading-snug">{item.name}</p>
                <p className="text-xs text-[#767676] mt-0.5 leading-snug">{item.description}</p>
                <p className="text-sm font-bold mt-1.5" style={{ color: theme.colors.accent }}>
                  ${item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Footer: total + CTA */}
          <div className="px-5 py-4 border-t border-[#dfdfdf] flex-shrink-0 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#484848]">Complete Kit</span>
              <span className="text-base font-bold text-[#111]">${kitTotal}</span>
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: theme.colors.accent }}
            >
              Shop This Look
            </button>
          </div>
        </aside>
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
