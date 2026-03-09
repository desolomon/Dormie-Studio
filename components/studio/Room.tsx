"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { SelectedItems } from "@/lib/products";

type RoomProps = {
  width: number;  // 15.92
  depth: number;  // 12.0
  height: number; // 9.0
  selectedItems: SelectedItems;
};

const OAK      = "#c8a060";
const OAK_DARK = "#8a6030";
const WALL     = "#edeae3";
const METAL    = "#909090";
const FRAME    = "#1a1a1a";

// ─── Procedural textures ─────────────────────────────────────────────────────

function makeCarpetTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#a0a098";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * 512, y = Math.random() * 512;
    const v = 130 + Math.random() * 50;
    ctx.fillStyle = `rgba(${v},${v},${v - 4},0.25)`;
    ctx.fillRect(x, y, 1 + Math.random(), 1 + Math.random());
  }
  // Subtle grid for tile carpet
  ctx.strokeStyle = "rgba(0,0,0,0.04)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 32) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(8, 6);
  return t;
}

function makeWoodTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#b08438";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i++) {
    const y = (i / 80) * 256;
    ctx.strokeStyle = `rgba(${90 + Math.random() * 40},${45 + Math.random() * 20},12,0.3)`;
    ctx.lineWidth = 0.8 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y + Math.random() * 3);
    ctx.lineTo(256, y + Math.random() * 3);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function makeComforterTexture(color: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 512);
  const G = 72; // quilt square size
  // Quilt squares with puff highlight
  for (let x = 0; x < 512; x += G) {
    for (let y = 0; y < 512; y += G) {
      // Darker seam
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x, y, G, G);
      // Puff highlight (radial gradient per square)
      const grd = ctx.createRadialGradient(x + G / 2, y + G / 2, 2, x + G / 2, y + G / 2, G * 0.52);
      grd.addColorStop(0, "rgba(255,255,255,0.18)");
      grd.addColorStop(1, "rgba(0,0,0,0.07)");
      ctx.fillStyle = grd;
      ctx.fillRect(x + 2, y + 2, G - 4, G - 4);
      // Center diamond stitch
      ctx.beginPath();
      ctx.moveTo(x + G / 2, y + 10);
      ctx.lineTo(x + G - 10, y + G / 2);
      ctx.lineTo(x + G / 2, y + G - 10);
      ctx.lineTo(x + 10, y + G / 2);
      ctx.closePath();
      ctx.strokeStyle = "rgba(0,0,0,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 3);
  return t;
}

function makeRugTexture(color: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 512);
  // Woven fiber effect
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * 512, y = Math.random() * 512;
    const len = 4 + Math.random() * 7;
    const angle = Math.random() * Math.PI;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.strokeStyle = `rgba(0,0,0,${0.04 + Math.random() * 0.1})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
  // Border
  ctx.strokeStyle = "rgba(0,0,0,0.22)";
  ctx.lineWidth = 14;
  ctx.strokeRect(14, 14, 512 - 28, 512 - 28);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, 512 - 52, 512 - 52);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 1);
  return t;
}

// ─── Poster artwork generator ─────────────────────────────────────────────────

function makePosterTexture(posterId: string, color: string): THREE.CanvasTexture {
  const W = 512, H = 768;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;

  const id = posterId.toLowerCase();

  if (id.includes("botanical") || id.includes("nature") || id.includes("tropical")) {
    // ── Botanical print ──────────────────────────────────
    ctx.fillStyle = "#faf7f1";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#c8b888";
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.strokeStyle = "#e0d0a8";
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    const drawLeaf = (x: number, y: number, size: number, angle: number, col: string) => {
      ctx.save();
      ctx.translate(x, y); ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.55, -size * 0.5, size * 0.55, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.55, size * 0.5, -size * 0.55, -size * 0.5, 0, -size);
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.82;
      ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(0, size);
      ctx.strokeStyle = "rgba(0,0,0,0.15)"; ctx.lineWidth = 2; ctx.stroke();
      // Veins
      for (let i = 1; i <= 4; i++) {
        const vy = -size + (2 * size * i) / 5;
        ctx.beginPath(); ctx.moveTo(0, vy);
        ctx.lineTo(size * 0.3 * (Math.random() > 0.5 ? 1 : -1), vy + size * 0.15);
        ctx.strokeStyle = "rgba(0,0,0,0.10)"; ctx.lineWidth = 1.2; ctx.stroke();
      }
      ctx.globalAlpha = 1; ctx.restore();
    };

    const darken = (hex: string, amt: number) => {
      const n = parseInt(hex.slice(1), 16);
      const r = Math.max(0, (n >> 16) - amt);
      const g = Math.max(0, ((n >> 8) & 0xff) - amt);
      const b = Math.max(0, (n & 0xff) - amt);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    };

    const c2 = darken(color, 30);
    drawLeaf(W / 2, H * 0.45, 100, 0, color);
    drawLeaf(W / 2 - 110, H * 0.38, 70, -0.7, c2);
    drawLeaf(W / 2 + 110, H * 0.38, 70, 0.7, color);
    drawLeaf(W / 2 - 80, H * 0.58, 60, -0.35, c2);
    drawLeaf(W / 2 + 80, H * 0.58, 60, 0.35, color);
    drawLeaf(W / 2, H * 0.27, 80, 0.1, c2);
    drawLeaf(W / 2, H * 0.65, 75, -0.1, color);
    drawLeaf(W / 2 - 155, H * 0.5, 50, -1.0, c2);
    drawLeaf(W / 2 + 155, H * 0.5, 50, 1.0, color);

    ctx.fillStyle = "#7a6a40";
    ctx.font = "italic 20px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("BOTANICAL", W / 2, H - 48);
    ctx.font = "13px Georgia, serif";
    ctx.fillStyle = "#9a8a60";
    ctx.fillText("Foliage Collection", W / 2, H - 30);

  } else if (id.includes("abstract") || id.includes("watercolor") || id.includes("boho")) {
    // ── Abstract art ─────────────────────────────────────
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, W, H);

    const shapes = [
      { x: W * 0.35, y: H * 0.28, rx: 110, ry: 90, rot: 0.3 },
      { x: W * 0.62, y: H * 0.42, rx: 90, ry: 70, rot: -0.5 },
      { x: W * 0.45, y: H * 0.58, rx: 130, ry: 100, rot: 0.8 },
      { x: W * 0.28, y: H * 0.65, rx: 70, ry: 60, rot: 0.2 },
      { x: W * 0.72, y: H * 0.68, rx: 80, ry: 65, rot: -0.3 },
      { x: W * 0.5, y: H * 0.38, rx: 60, ry: 50, rot: 1.2 },
    ];

    shapes.forEach((s, i) => {
      ctx.save();
      ctx.translate(s.x, s.y); ctx.rotate(s.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? color : "#d8c8b8";
      ctx.globalAlpha = 0.35 + (i % 3) * 0.1;
      ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha = 1;

    // Gestural lines
    [[W * 0.2, H * 0.2, W * 0.8, H * 0.75], [W * 0.75, H * 0.18, W * 0.2, H * 0.78]].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = color; ctx.globalAlpha = 0.18; ctx.lineWidth = 3; ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // Dot cluster
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(W * 0.1 + Math.random() * W * 0.8, H * 0.1 + Math.random() * H * 0.8,
        1.5 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.globalAlpha = 0.3; ctx.fill();
    }
    ctx.globalAlpha = 1;

  } else if (id.includes("city") || id.includes("skyline") || id.includes("new_york") || id.includes("nyc")) {
    // ── City skyline ──────────────────────────────────────
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
    sky.addColorStop(0, "#0a0f25");
    sky.addColorStop(0.5, "#151e45");
    sky.addColorStop(1, "#1e2e5a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.72);

    // Stars
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H * 0.6, 0.5 + Math.random() * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,250,230,${0.4 + Math.random() * 0.6})`; ctx.fill();
    }
    // Moon
    ctx.beginPath(); ctx.arc(W * 0.8, H * 0.12, 32, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,248,190,0.95)"; ctx.fill();

    // Water
    const water = ctx.createLinearGradient(0, H * 0.72, 0, H);
    water.addColorStop(0, "#111830"); water.addColorStop(1, "#080d18");
    ctx.fillStyle = water; ctx.fillRect(0, H * 0.72, W, H * 0.28);
    // Ripples
    for (let i = 0; i < 12; i++) {
      const wy = H * 0.74 + Math.random() * H * 0.22;
      ctx.beginPath(); ctx.moveTo(0, wy); ctx.lineTo(W, wy);
      ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.04})`; ctx.lineWidth = 1; ctx.stroke();
    }

    // Buildings silhouette
    const bldgs = [
      [0, 240], [40, 195], [80, 270], [130, 185], [162, 310],
      [195, 225], [225, 290], [270, 250], [305, 175], [335, 265],
      [375, 210], [408, 195], [438, 310], [475, 235], [510, 160], [535, 200],
    ];
    ctx.fillStyle = "#060a16";
    bldgs.forEach(([bx, bh], i) => {
      const bw = 32 + (i % 3) * 8;
      ctx.fillRect(bx, H * 0.72 - bh, bw, bh);
      // Windows
      for (let wy = H * 0.72 - bh + 12; wy < H * 0.72 - 8; wy += 18) {
        for (let wx = bx + 5; wx < bx + bw - 5; wx += 11) {
          if (Math.random() > 0.3) {
            ctx.fillStyle = `rgba(255,235,120,${0.6 + Math.random() * 0.4})`;
            ctx.fillRect(wx, wy, 5, 8);
            ctx.fillStyle = "#060a16";
          }
        }
      }
      ctx.fillStyle = "#060a16";
    });

  } else if (id.includes("vintage") || id.includes("retro") || id.includes("travel")) {
    // ── Vintage poster ───────────────────────────────────
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#f5e8cc"); bg.addColorStop(1, "#e0ceaa");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#7a5c30"; ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    ctx.strokeStyle = "#9a7c50"; ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, W - 64, H - 64);

    // Vintage sun
    ctx.beginPath(); ctx.arc(W / 2, H * 0.38, 88, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(W / 2, H * 0.38, 65, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,200,0.3)"; ctx.fill();
    // Rays
    for (let i = 0; i < 18; i++) {
      const ang = (i / 18) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 + Math.cos(ang) * 96, H * 0.38 + Math.sin(ang) * 96);
      ctx.lineTo(W / 2 + Math.cos(ang) * 140, H * 0.38 + Math.sin(ang) * 140);
      ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.globalAlpha = 0.5; ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Mountains
    ctx.fillStyle = "rgba(100,70,40,0.5)";
    ctx.beginPath(); ctx.moveTo(0, H * 0.72); ctx.lineTo(W * 0.25, H * 0.54); ctx.lineTo(W * 0.5, H * 0.68); ctx.lineTo(W, H * 0.56); ctx.lineTo(W, H * 0.72); ctx.closePath(); ctx.fill();

    ctx.fillStyle = "#4a3018";
    ctx.font = "bold 38px Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText("EXPLORE", W / 2, H * 0.82);
    ctx.font = "italic 20px Georgia, serif"; ctx.fillStyle = "#6a4828";
    ctx.fillText("Adventure Awaits", W / 2, H * 0.88);
    ctx.font = "14px Georgia, serif"; ctx.fillStyle = "#8a6840";
    ctx.fillText("EST. 1924", W / 2, H - 48);

  } else {
    // ── Minimalist / default ─────────────────────────────
    ctx.fillStyle = "#fefefe"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#eeebe5"; ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    // Geometric composition
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.2);
    ctx.lineTo(W * 0.72, H * 0.48);
    ctx.lineTo(W * 0.6, H * 0.7);
    ctx.lineTo(W * 0.4, H * 0.7);
    ctx.lineTo(W * 0.28, H * 0.48);
    ctx.closePath();
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();

    ctx.beginPath(); ctx.arc(W / 2, H * 0.45, 42, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.globalAlpha = 0.12; ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

    [0.76, 0.80, 0.84].forEach((yf, i) => {
      ctx.beginPath();
      ctx.moveTo(W * (0.22 + i * 0.05), H * yf);
      ctx.lineTo(W * (0.78 - i * 0.05), H * yf);
      ctx.strokeStyle = "#d0ccc8"; ctx.lineWidth = 1.5; ctx.stroke();
    });
  }

  return new THREE.CanvasTexture(c);
}

// ─── Wall texture ─────────────────────────────────────────────────────────────
function makeWallTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = WALL;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 600; i++) {
    const v = 200 + Math.random() * 30;
    ctx.fillStyle = `rgba(${v},${v},${v - 2},0.08)`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 3, 1 + Math.random() * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 3);
  return t;
}

// ─── Main Room component ──────────────────────────────────────────────────────
export default function Room({ width, depth, height, selectedItems }: RoomProps) {
  const carpet   = useMemo(() => makeCarpetTexture(), []);
  const wood     = useMemo(() => makeWoodTexture(), []);
  const wallTex  = useMemo(() => makeWallTexture(), []);

  const comforterItem = selectedItems["Comforters"];
  const sheetsColor   = selectedItems["Sheets"]?.color;
  const rugItem       = selectedItems["Rugs"];
  const posterItem    = selectedItems["Posters"];
  const lampColor     = selectedItems["Desk Lamps"]?.color;
  const chairColor    = selectedItems["Desk Chairs"]?.color;

  const comforterTex = useMemo(
    () => comforterItem ? makeComforterTexture(comforterItem.color) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comforterItem?.id]
  );

  const rugTex = useMemo(
    () => rugItem ? makeRugTexture(rugItem.color) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rugItem?.id]
  );

  const posterTex = useMemo(
    () => posterItem ? makePosterTexture(posterItem.id, posterItem.color) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posterItem?.id]
  );

  const stringLightsItem = selectedItems["String Lights"];
  const stringLightColor = stringLightsItem?.id !== "lights-none" ? stringLightsItem?.color : undefined;
  const ledItem  = selectedItems["LED Strips"];
  const ledColor = ledItem?.id !== "led-none" ? ledItem?.color : undefined;

  const hw = width / 2;
  const hd = depth / 2;

  const CW = 3.8, CD = 2.0;
  const closetZ = hd - CW / 2;

  const BL = 5.8, BW = 3.0;
  const bedZ = closetZ - CW / 2 - BL / 2 - 0.05;

  const DD = 1.8;
  const deskX = width / 4;
  const deskZ = -hd + DD / 2 + 0.05;
  const shelfZ = bedZ - BL / 2 + 0.8;

  return (
    <group>
      {/* ── FLOOR ──────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={carpet} roughness={0.95} />
      </mesh>

      {/* ── CEILING ─────────────────────────────────────────────── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#f2f0eb" roughness={0.9} />
      </mesh>

      {/* ── WALLS ───────────────────────────────────────────────── */}
      {/* Back */}
      <mesh position={[0, height / 2, -hd]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={wallTex} roughness={0.85} />
      </mesh>
      {/* Left */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-hw, height / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={wallTex} roughness={0.85} />
      </mesh>
      {/* Right */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[hw, height / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={wallTex} roughness={0.85} />
      </mesh>
      {/* Front (very transparent) */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, height / 2, hd]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={WALL} roughness={0.85} transparent opacity={0.08} />
      </mesh>

      {/* ── BASEBOARDS ──────────────────────────────────────────── */}
      <mesh position={[0, 0.06, -hd + 0.02]}>
        <boxGeometry args={[width, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0ddd6" roughness={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-hw + 0.02, 0.06, 0]}>
        <boxGeometry args={[depth, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0ddd6" roughness={0.5} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[hw - 0.02, 0.06, 0]}>
        <boxGeometry args={[depth, 0.12, 0.04]} />
        <meshStandardMaterial color="#e0ddd6" roughness={0.5} />
      </mesh>

      {/* ── RUG ─────────────────────────────────────────────────── */}
      {rugItem && rugTex && (
        <mesh position={[0, 0.022, 0.5]} receiveShadow>
          <boxGeometry args={[6.2, 0.06, 4.2]} />
          <meshStandardMaterial map={rugTex} roughness={0.88} />
        </mesh>
      )}

      {/* ── POSTER ──────────────────────────────────────────────── */}
      {posterItem && (
        <group position={[0, height * 0.3, -hd + 0.01]}>
          {/* Frame */}
          <mesh>
            <boxGeometry args={[2.5, 3.3, 0.05]} />
            <meshStandardMaterial color={FRAME} roughness={0.4} metalness={0.05} />
          </mesh>
          {/* Mat */}
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[2.28, 3.08, 0.015]} />
            <meshStandardMaterial color="#f8f5ee" roughness={0.9} />
          </mesh>
          {/* Artwork */}
          {posterTex ? (
            <mesh position={[0, 0, 0.038]}>
              <planeGeometry args={[2.1, 2.9]} />
              <meshStandardMaterial map={posterTex} roughness={0.85} />
            </mesh>
          ) : (
            <mesh position={[0, 0, 0.038]}>
              <planeGeometry args={[2.1, 2.9]} />
              <meshStandardMaterial color={posterItem.color} roughness={0.85} />
            </mesh>
          )}
        </group>
      )}

      {/* ── STRING LIGHTS ───────────────────────────────────────── */}
      {stringLightColor && (
        <group>
          {/* Wire */}
          <mesh position={[0, height - 0.52, -hd + 0.15]}>
            <boxGeometry args={[width - 2, 0.012, 0.012]} />
            <meshStandardMaterial color="#888" roughness={0.7} />
          </mesh>
          {Array.from({ length: 16 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                -hw + 1.2 + (i * (width - 2.4)) / 15,
                height - 0.62,
                -hd + 0.15,
              ]}
            >
              <sphereGeometry args={[0.075, 10, 10]} />
              <meshStandardMaterial
                color={stringLightColor}
                emissive={stringLightColor}
                emissiveIntensity={3.5}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ── LED STRIPS ──────────────────────────────────────────── */}
      {ledColor && (
        <group>
          {[
            { pos: [0, height - 0.06, -hd + 0.04] as [number, number, number], args: [width - 0.1, 0.04, 0.04] as [number, number, number] },
            { pos: [0, height - 0.06, hd - 0.04] as [number, number, number], args: [width - 0.1, 0.04, 0.04] as [number, number, number] },
            { pos: [-hw + 0.04, height - 0.06, 0] as [number, number, number], args: [0.04, 0.04, depth - 0.1] as [number, number, number] },
            { pos: [hw - 0.04, height - 0.06, 0] as [number, number, number], args: [0.04, 0.04, depth - 0.1] as [number, number, number] },
          ].map((s, i) => (
            <mesh key={i} position={s.pos}>
              <boxGeometry args={s.args} />
              <meshStandardMaterial color={ledColor} emissive={ledColor} emissiveIntensity={5} />
            </mesh>
          ))}
        </group>
      )}

      {/* ── CEILING LIGHT ───────────────────────────────────────── */}
      <FluorescentLight position={[0, height - 0.05, 0]} />

      {/* ── LEFT SETUP ──────────────────────────────────────────── */}
      <Closet position={[-hw + CD / 2, 0, closetZ]} cw={CW} cd={CD} ch={height * 0.94} side="left" />
      <LoftedBed
        position={[-hw + BW / 2, 0, bedZ]}
        bl={BL} bw={BW} wood={wood}
        comforterColor={comforterItem?.color}
        comforterTex={comforterTex}
        sheetsColor={sheetsColor}
      />
      <Desk position={[-deskX, 0, deskZ]} dd={DD} wood={wood} lampColor={lampColor} chairColor={chairColor} />
      <WallShelf position={[-hw + 0.08, 5.8, shelfZ]} side="left" />

      {/* ── RIGHT SETUP ─────────────────────────────────────────── */}
      <Closet position={[hw - CD / 2, 0, closetZ]} cw={CW} cd={CD} ch={height * 0.94} side="right" />
      <LoftedBed
        position={[hw - BW / 2, 0, bedZ]}
        bl={BL} bw={BW} wood={wood}
        comforterColor={comforterItem?.color}
        comforterTex={comforterTex}
        sheetsColor={sheetsColor}
      />
      <Desk position={[deskX, 0, deskZ]} dd={DD} wood={wood} lampColor={lampColor} chairColor={chairColor} />
      <WallShelf position={[hw - 0.08, 5.8, shelfZ]} side="right" />

      {/* ── BACK WALL WINDOWS ───────────────────────────────────── */}
      <BackWindow position={[-deskX, height * 0.6, -hd + 0.06]} />
      <BackWindow position={[deskX, height * 0.6, -hd + 0.06]} />

      {/* HVAC */}
      <HVAC position={[hw - 0.14, 0.5, hd - 5.5]} />
    </group>
  );
}

// ─── Fluorescent ceiling light ────────────────────────────────────────────────
function FluorescentLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[5.0, 0.08, 1.0]} />
        <meshStandardMaterial color="#d8d5cf" roughness={0.5} />
      </mesh>
      {/* Diffuser panel */}
      <mesh position={[0, -0.045, 0]}>
        <planeGeometry args={[4.7, 0.9]} />
        <meshStandardMaterial color="#fff8e8" emissive="#fff8e8" emissiveIntensity={1.4} roughness={1} />
      </mesh>
    </group>
  );
}

// ─── Closet ───────────────────────────────────────────────────────────────────
function Closet({ position, cw, cd, ch, side }: {
  position: [number, number, number]; cw: number; cd: number; ch: number; side: "left" | "right";
}) {
  const flip = side === "left" ? 1 : -1;
  return (
    <group position={position}>
      <mesh position={[0, ch / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[cd, ch, cw]} />
        <meshStandardMaterial color="#d0cdc7" roughness={0.7} />
      </mesh>
      {/* Door panels */}
      {[-cw / 4, cw / 4].map((z, i) => (
        <mesh key={i} position={[flip * (cd / 2 + 0.025), ch / 2, z]} castShadow>
          <boxGeometry args={[0.04, ch - 0.08, cw / 2 - 0.06]} />
          <meshStandardMaterial color="#eceae6" roughness={0.25} metalness={0.02} />
        </mesh>
      ))}
      {/* Door frame */}
      <mesh position={[flip * (cd / 2 + 0.03), ch / 2, 0]}>
        <boxGeometry args={[0.02, ch - 0.08, 0.03]} />
        <meshStandardMaterial color="#c5c2bc" roughness={0.5} />
      </mesh>
      {/* Handles */}
      {[-cw / 4, cw / 4].map((z, i) => (
        <mesh key={i} position={[flip * (cd / 2 + 0.065), ch * 0.48, z * 0.35]}>
          <boxGeometry args={[0.05, 0.05, 0.4]} />
          <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Top trim */}
      <mesh position={[0, ch + 0.04, 0]}>
        <boxGeometry args={[cd + 0.06, 0.08, cw + 0.06]} />
        <meshStandardMaterial color="#c8c5bf" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Lofted bed ───────────────────────────────────────────────────────────────
function LoftedBed({ position, bl, bw, wood, comforterColor, comforterTex, sheetsColor }: {
  position: [number, number, number];
  bl: number; bw: number;
  wood: THREE.CanvasTexture;
  comforterColor?: string;
  comforterTex?: THREE.CanvasTexture | null;
  sheetsColor?: string;
}) {
  const LOFT = 2.6;
  const SLATS = 7;
  const DRW = bw * 0.75;
  const DRH = LOFT - 0.15;
  const DRD = bl * 0.55;

  return (
    <group position={position}>
      {/* 4 corner posts */}
      {([-bw / 2 + 0.1, bw / 2 - 0.1] as number[]).flatMap(x =>
        ([-bl / 2 + 0.1, bl / 2 - 0.1] as number[]).map(z => ({ x, z }))
      ).map(({ x, z }, i) => (
        <mesh key={i} position={[x, LOFT / 2, z]} castShadow>
          <boxGeometry args={[0.14, LOFT, 0.14]} />
          <meshStandardMaterial color={OAK_DARK} roughness={0.6} />
        </mesh>
      ))}

      {/* Side rails */}
      {[-bw / 2 + 0.1, bw / 2 - 0.1].map((x, i) => (
        <mesh key={i} position={[x, LOFT - 0.14, 0]} castShadow>
          <boxGeometry args={[0.09, 0.13, bl - 0.2]} />
          <meshStandardMaterial color={OAK_DARK} roughness={0.6} />
        </mesh>
      ))}

      {/* Safety guardrail (front half only) */}
      <mesh position={[0, LOFT + 0.18, bl / 4]}>
        <boxGeometry args={[bw + 0.1, 0.07, 0.06]} />
        <meshStandardMaterial color={OAK_DARK} roughness={0.6} />
      </mesh>

      {/* Bed slats */}
      {Array.from({ length: SLATS }).map((_, i) => {
        const z = -bl / 2 + 0.6 + (i * (bl - 1.2)) / (SLATS - 1);
        return (
          <mesh key={i} position={[0, LOFT - 0.28, z]} castShadow>
            <boxGeometry args={[bw - 0.1, 0.055, 0.08]} />
            <meshStandardMaterial color={OAK} roughness={0.7} map={wood} />
          </mesh>
        );
      })}

      {/* Bed platform */}
      <mesh position={[0, LOFT + 0.05, 0]} castShadow>
        <boxGeometry args={[bw, 0.09, bl]} />
        <meshStandardMaterial map={wood} roughness={0.5} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, LOFT + 0.4, 0]} castShadow>
        <boxGeometry args={[bw - 0.06, 0.56, bl - 0.04]} />
        <meshStandardMaterial color="#d5d1c9" roughness={0.85} />
      </mesh>
      {/* Mattress edge stripe */}
      <mesh position={[0, LOFT + 0.67, 0]}>
        <boxGeometry args={[bw - 0.06, 0.02, bl - 0.04]} />
        <meshStandardMaterial color="#c8c4bc" roughness={0.9} />
      </mesh>

      {/* Sheets */}
      {sheetsColor && (
        <mesh position={[0, LOFT + 0.69, 0]} castShadow>
          <boxGeometry args={[bw - 0.07, 0.04, bl - 0.05]} />
          <meshStandardMaterial color={sheetsColor} roughness={0.88} />
        </mesh>
      )}

      {/* Comforter — quilted texture */}
      {comforterColor && (
        <mesh position={[0, LOFT + 0.78, 0]} castShadow>
          <boxGeometry args={[bw - 0.07, 0.22, bl - 0.05]} />
          <meshStandardMaterial
            color={comforterColor}
            map={comforterTex ?? undefined}
            roughness={0.92}
          />
        </mesh>
      )}

      {/* Pillows */}
      {[bw * 0.18, -bw * 0.18].map((px, i) => (
        <mesh key={i} position={[px, LOFT + (comforterColor ? 0.9 : 0.77), -bl / 2 + 0.55]} castShadow>
          <boxGeometry args={[bw * 0.38, 0.14, 0.54]} />
          <meshStandardMaterial color={sheetsColor ?? "#e5e0d8"} roughness={0.9} />
        </mesh>
      ))}

      {/* ── Dresser under bed ── */}
      <mesh position={[0, DRH / 2, bl / 2 - DRD / 2 - 0.1]} castShadow>
        <boxGeometry args={[DRW, DRH, DRD]} />
        <meshStandardMaterial map={wood} color={OAK} roughness={0.6} />
      </mesh>
      {[0.55, 0, -0.55].map((dy, i) => (
        <group key={i}>
          <mesh position={[0, DRH / 2 + dy * (DRH / 3.2), bl / 2 - 0.09]} castShadow>
            <boxGeometry args={[DRW - 0.12, DRH / 3.2 - 0.06, 0.05]} />
            <meshStandardMaterial color={OAK_DARK} roughness={0.5} />
          </mesh>
          <mesh position={[0, DRH / 2 + dy * (DRH / 3.2), bl / 2 - 0.04]}>
            <boxGeometry args={[0.36, 0.055, 0.04]} />
            <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Desk + chair + lamp ──────────────────────────────────────────────────────
function Desk({ position, dd, wood, lampColor, chairColor }: {
  position: [number, number, number]; dd: number;
  wood: THREE.CanvasTexture; lampColor?: string; chairColor?: string;
}) {
  const DW = 3.6;
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[DW, 0.09, dd]} />
        <meshStandardMaterial map={wood} roughness={0.4} />
      </mesh>
      {/* Legs */}
      {([-DW / 2 + 0.1, DW / 2 - 0.1] as number[]).flatMap(x =>
        ([-dd / 2 + 0.1, dd / 2 - 0.1] as number[]).map(z => ({ x, z }))
      ).map(({ x, z }, i) => (
        <mesh key={i} position={[x, 1.25, z]} castShadow>
          <boxGeometry args={[0.09, 2.5, 0.09]} />
          <meshStandardMaterial color={OAK_DARK} roughness={0.7} />
        </mesh>
      ))}
      {/* Modesty panel / back */}
      <mesh position={[0, 1.25, -dd / 2 + 0.03]}>
        <boxGeometry args={[DW - 0.2, 1.8, 0.04]} />
        <meshStandardMaterial map={wood} roughness={0.55} color={OAK} />
      </mesh>
      {/* Laptop suggestion */}
      <mesh position={[-0.4, 2.56, 0]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.1, 0.025, 0.75]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.4, 2.62, -0.35]} rotation={[-1.1, 0, 0]}>
        <boxGeometry args={[1.1, 0.62, 0.018]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>
      <TaskChair position={[0, 0, dd / 2 + 1.0]} color={chairColor} />
      {lampColor && <DeskLamp position={[DW / 2 - 0.5, 2.55, -dd / 2 + 0.32]} color={lampColor} />}
    </group>
  );
}

// ─── Desk lamp ────────────────────────────────────────────────────────────────
function DeskLamp({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.14, 0.17, 0.05, 14]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.05, 8]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.23, 0.34, 14, 1, true]} />
        <meshStandardMaterial color={color} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 1.03, 0]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color="#fffbe0" emissive="#fffbe0" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

// ─── Back wall window ─────────────────────────────────────────────────────────
function BackWindow({ position }: { position: [number, number, number] }) {
  const W = 3.8, H = 3.2;
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[W + 0.24, H + 0.24, 0.12]} />
        <meshStandardMaterial color="#c5c0b8" roughness={0.5} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#b5d5ee" transparent opacity={0.22} roughness={0} metalness={0.1}
          emissive="#c8e8ff" emissiveIntensity={0.5} />
      </mesh>
      {/* Exterior view (sky gradient feel) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[W - 0.1, H - 0.1]} />
        <meshStandardMaterial color="#a8d0f0" transparent opacity={0.12} roughness={0} />
      </mesh>
      {/* Window mullions */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.06, H, 0.04]} />
        <meshStandardMaterial color="#d0ccC4" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[W, 0.06, 0.04]} />
        <meshStandardMaterial color="#d0ccc4" roughness={0.5} />
      </mesh>
      {/* Blinds (horizontal slats) */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[0, H / 2 - (H / 16) * (i + 0.5), 0.09]}>
          <planeGeometry args={[W - 0.08, 0.15]} />
          <meshStandardMaterial color="#dedad2" roughness={0.7} side={THREE.DoubleSide} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Task chair ───────────────────────────────────────────────────────────────
function TaskChair({ position, color }: { position: [number, number, number]; color?: string }) {
  const col = color ?? "#1a1a1a";
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[1.3, 0.1, 1.2]} />
        <meshStandardMaterial color={col} roughness={0.85} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 2.22, -0.46]} castShadow>
        <boxGeometry args={[1.2, 1.25, 0.09]} />
        <meshStandardMaterial color={col} roughness={0.85} />
      </mesh>
      {/* Lumbar support */}
      <mesh position={[0, 1.82, -0.48]}>
        <boxGeometry args={[0.8, 0.22, 0.06]} />
        <meshStandardMaterial color={col} roughness={0.85} />
      </mesh>
      {/* Gas cylinder */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.35, 10]} />
        <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Base star */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.07, 5]} />
        <meshStandardMaterial color="#333" roughness={0.6} />
      </mesh>
      {/* Armrests */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 1.75, -0.15]}>
          <boxGeometry args={[0.07, 0.07, 0.7]} />
          <meshStandardMaterial color={col} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Wall shelf ───────────────────────────────────────────────────────────────
function WallShelf({ position, side }: { position: [number, number, number]; side: "left" | "right" }) {
  const SW = 2.8, SD = 0.85;
  const flip = side === "left" ? 1 : -1;
  return (
    <group position={position}>
      {[0, 1.5].map((dy, ti) => (
        <group key={ti} position={[0, dy, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[SD, 0.06, SW]} />
            <meshStandardMaterial color="#e0ddd7" roughness={0.5} />
          </mesh>
          {[-SW / 2 + 0.3, SW / 2 - 0.3].map((z, bi) => (
            <group key={bi} position={[flip * SD / 2 - flip * 0.06, -0.06, z]}>
              <mesh position={[0, -0.28, 0]}>
                <boxGeometry args={[0.05, 0.5, 0.05]} />
                <meshStandardMaterial color="#a8a8a0" metalness={0.5} roughness={0.4} />
              </mesh>
              <mesh position={[flip * SD / 2 - flip * 0.04, -0.52, 0]}>
                <boxGeometry args={[SD - 0.08, 0.05, 0.05]} />
                <meshStandardMaterial color="#a8a8a0" metalness={0.5} roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

// ─── HVAC ─────────────────────────────────────────────────────────────────────
function HVAC({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 1.1, 2.5]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.7} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.07, -0.35 + i * 0.1, 0]}>
          <boxGeometry args={[0.08, 0.025, 2.3]} />
          <meshStandardMaterial color="#b8b4ae" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
