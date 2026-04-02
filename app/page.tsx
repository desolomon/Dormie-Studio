"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-white flex flex-col items-center justify-center gap-12"
      style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
    >
      {/* Logo */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#aaa] mb-2">Welcome to</p>
        <span className="text-4xl font-bold tracking-tight text-[#111]">dormie studio</span>
      </div>

      {/* Headline */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#111] leading-tight mb-3">
          Design Your Dream Dorm
        </h1>
        <p className="text-lg text-[#484848]">
          Choose your style and see your room come to life
        </p>
      </div>

      {/* Gender cards */}
      <div className="flex gap-8">
        {/* Girls */}
        <button
          onClick={() => router.push("/theme/girls")}
          className="w-60 h-72 rounded-2xl flex flex-col items-center justify-center gap-5 hover:scale-[1.04] transition-all duration-200 shadow-sm hover:shadow-xl cursor-pointer"
          style={{ backgroundColor: "#FFF0F5" }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="14" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="46" cy="22" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="46" cy="42" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="32" cy="50" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="18" cy="42" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="18" cy="22" r="9" fill="#E8A0B4" opacity="0.85" />
            <circle cx="32" cy="32" r="12" fill="#F9D4DF" />
            <circle cx="32" cy="32" r="5" fill="#F2C4CE" />
          </svg>
          <span className="text-2xl font-bold" style={{ color: "#C94080" }}>Girls</span>
        </button>

        {/* Boys */}
        <button
          onClick={() => router.push("/theme/boys")}
          className="w-60 h-72 rounded-2xl flex flex-col items-center justify-center gap-5 hover:scale-[1.04] transition-all duration-200 shadow-sm hover:shadow-xl cursor-pointer"
          style={{ backgroundColor: "#1B2A4A" }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="27" fill="#E8500A" />
            <circle cx="32" cy="32" r="27" stroke="#111" strokeWidth="1.5" />
            <line x1="32" y1="5" x2="32" y2="59" stroke="#111" strokeWidth="1.5" />
            <line x1="5" y1="32" x2="59" y2="32" stroke="#111" strokeWidth="1.5" />
            <path d="M9 12 Q32 22 55 12" stroke="#111" strokeWidth="1.5" fill="none" />
            <path d="M9 52 Q32 42 55 52" stroke="#111" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="text-2xl font-bold text-white">Boys</span>
        </button>
      </div>

      <p className="text-xs text-[#aaa]">Free · Design. Shop. Move in.</p>
    </main>
  );
}
