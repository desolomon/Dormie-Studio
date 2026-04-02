"use client";

import { useParams, useRouter } from "next/navigation";
import { THEMES, Theme } from "@/lib/themes";

export default function ThemePage() {
  const params = useParams();
  const router = useRouter();

  const gender = (params.gender ?? "girls") as string;
  const displayGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const themes = Object.values(THEMES).filter((t) => t.gender === gender);

  return (
    <main
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#dfdfdf]">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-[#484848] hover:text-[#111] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <span className="text-xl font-bold text-[#111]">dormie studio</span>
        <div className="w-16" />
      </nav>

      {/* Header */}
      <div className="text-center px-6 pt-14 pb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#999] mb-3">{displayGender}</p>
        <h1 className="text-4xl font-bold text-[#111] mb-3">Choose Your Theme</h1>
        <p className="text-base text-[#484848]">Pick a style that matches your vibe</p>
      </div>

      {/* Theme cards */}
      <div className="flex gap-8 justify-center px-8 pb-16">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onClick={() => router.push(`/studio?gender=${gender}&theme=${theme.id}`)}
          />
        ))}
      </div>
    </main>
  );
}

function ThemeCard({ theme, onClick }: { theme: Theme; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-80 rounded-2xl border border-[#dfdfdf] p-7 text-left hover:shadow-lg hover:border-[#bbb] transition-all duration-200 cursor-pointer bg-white group"
    >
      {/* Color swatches */}
      <div className="flex gap-2.5 mb-6">
        {theme.palette.map((color, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full border border-[#ebebeb] shadow-sm group-hover:scale-110 transition-transform duration-150"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <h2 className="text-xl font-bold text-[#111] mb-2">{theme.name}</h2>
      <p className="text-sm text-[#484848] leading-relaxed">{theme.description}</p>

      <div
        className="mt-6 flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: theme.colors.accent }}
      >
        <span>View Room</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
