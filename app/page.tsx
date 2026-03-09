"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SCHOOLS = [{ id: "tulane", name: "Tulane University" }];

export default function Home() {
  const [school, setSchool] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Noto Sans', Arial, sans-serif" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#dfdfdf]">
        <span className="text-2xl font-bold tracking-tight text-[#111]">dormie</span>
        <a
          href="https://www.hellodormie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#111] hover:underline tracking-wide"
        >
          SHOP DESIGN KITS
        </a>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-[#f5f5f5]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#767676] mb-4 font-medium">
          Introducing Dormie Studio
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-5 text-[#111]">
          Design your dorm room before move-in day.
        </h1>
        <p className="text-base text-[#484848] max-w-md mb-10">
          Pick your school, design your room in 3D, and shop every item — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="flex-1 w-full border border-[#929292] px-4 py-3 text-sm focus:outline-none focus:border-[#111] bg-white text-[#111]"
          >
            <option value="">Select your school</option>
            {SCHOOLS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            disabled={!school}
            onClick={() => router.push(`/studio?school=${school}`)}
            className="w-full sm:w-auto bg-[#0058a3] text-white px-8 py-3 text-xs font-bold disabled:opacity-30 hover:bg-[#004f93] transition-colors tracking-widest"
          >
            OPEN STUDIO
          </button>
        </div>

        <p className="text-xs text-[#767676] mt-4">
          Free · Design. Shop. Move in.
        </p>
      </section>

      {/* Feature strip */}
      <section className="border-t border-[#dfdfdf] px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto w-full">
        {[
          { title: "Your school's exact room", body: "Real dimensions loaded automatically for your dorm." },
          { title: "Design in 3D", body: "Place furniture, swap colors, see it before you pack it." },
          { title: "Shop every item", body: "Every piece links directly to Amazon and top retailers." },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="font-bold text-sm mb-1 text-[#111]">{f.title}</h3>
            <p className="text-sm text-[#484848]">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
