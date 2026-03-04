"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SCHOOLS = [{ id: "tulane", name: "Tulane University" }];

export default function Home() {
  const [school, setSchool] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-100">
        <span className="text-2xl font-bold tracking-tight">dormie</span>
        <a
          href="https://www.hellodormie.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          Shop Design Kits
        </a>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          Introducing Dormie Studio
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
          Design your dorm room before move-in day.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-12">
          Pick your school, design your room in 3D, and shop every item — all in one place.
        </p>

        {/* School selector + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="flex-1 w-full border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
          >
            <option value="">Select your school</option>
            {SCHOOLS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            disabled={!school}
            onClick={() => router.push(`/studio?school=${school}`)}
            className="w-full sm:w-auto bg-black text-white rounded-full px-8 py-3 text-sm font-medium disabled:opacity-30 hover:bg-gray-800 transition-colors"
          >
            Open Studio
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          One-time access · Design. Shop. Move in.
        </p>
      </section>

      {/* Feature strip */}
      <section className="border-t border-gray-100 px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto w-full">
        {[
          { title: "Your school's exact room", body: "Real dimensions loaded automatically for your dorm." },
          { title: "Design in 3D", body: "Place furniture, swap colors, see it before you pack it." },
          { title: "Shop every item", body: "Every piece links directly to Amazon and top retailers." },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
