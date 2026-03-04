"use client";

import { useMemo } from "react";
import * as THREE from "three";

type RoomProps = {
  width: number;  // 15.92
  depth: number;  // 12.0
  height: number; // 9.0
};

const OAK      = "#c8a060";
const OAK_DARK = "#a07840";
const WALL     = "#eeebe5";
const METAL    = "#909090";

// ─────────────────────────────────────────────────────────────
//  Layout (top-down, door at front z=+hd, back wall z=-hd)
//
//  Each side wall (L and R) from front → back:
//   [CLOSET 3.8ft] → [BED 5.8ft along wall] → [DESK 2ft + WINDOW]
//
//  Shelves: on side wall above desk (2-tier, white metal)
//  Windows: on side wall, over desk area (back section)
//  HVAC: right side wall, front section
// ─────────────────────────────────────────────────────────────

function useCarpetTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#a8a49e";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 5000; i++) {
      const v = 128 + Math.random() * 52;
      ctx.fillStyle = `rgba(${v},${v},${v-3},0.35)`;
      ctx.fillRect(Math.random()*256, Math.random()*256, 2, 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 4);
    return t;
  }, []);
}

function useWoodTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#bf9448";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 60; i++) {
      const y = (i / 60) * 256;
      ctx.strokeStyle = `rgba(${100+Math.random()*40},${50+Math.random()*20},20,0.28)`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(0, y + Math.random()*4);
      ctx.lineTo(256, y + Math.random()*4);
      ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }, []);
}

export default function Room({ width, depth, height }: RoomProps) {
  const carpet = useCarpetTexture();
  const wood   = useWoodTexture();

  const hw = width / 2;   // 7.96
  const hd = depth / 2;   // 6.0

  // Along each side wall (z-axis), from front door (z=+hd) toward back (z=-hd):
  const CW = 3.8;   // closet length along wall
  const CD = 2.0;   // closet depth into room
  const closetZ = hd - CW / 2;            // closet center z = +4.1

  const BL = 5.8;   // bed length along wall
  const BW = 3.0;   // bed width (sticks into room from side wall)
  const bedZ = closetZ - CW / 2 - BL / 2 - 0.05;  // right behind closet ≈ +0.25

  // Desks on back wall, one per student side
  const DD = 1.8;   // desk depth (away from back wall)
  const deskX = width / 4;  // x offset per student (±)
  const deskZ = -hd + DD / 2 + 0.05;

  const shelfZ = bedZ - BL / 2 + 0.8;   // shelves on side wall, above bed/desk transition

  return (
    <group>
      {/* ── FLOOR ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={carpet} roughness={0.95} />
      </mesh>

      {/* ── CEILING ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#f5f3f0" roughness={0.9} />
      </mesh>

      {/* ── WALLS (all white) ── */}
      {/* Back */}
      <mesh position={[0, height/2, -hd]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={WALL} roughness={0.85} />
      </mesh>
      {/* Left */}
      <mesh rotation={[0, Math.PI/2, 0]} position={[-hw, height/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={WALL} roughness={0.85} />
      </mesh>
      {/* Right */}
      <mesh rotation={[0, -Math.PI/2, 0]} position={[hw, height/2, 0]} receiveShadow>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial color={WALL} roughness={0.85} />
      </mesh>
      {/* Front (partial — just floor-level strip so room feels enclosed) */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, height/2, hd]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={WALL} roughness={0.85} transparent opacity={0.15} />
      </mesh>

      {/* ── CEILING LIGHT ── */}
      <FluorescentLight position={[0, height - 0.05, 0]} />

      {/* ════ LEFT STUDENT SETUP ════ */}
      <Closet position={[-hw + CD/2, 0, closetZ]} cw={CW} cd={CD} ch={height * 0.94} side="left" />
      <LoftedBed position={[-hw + BW/2, 0, bedZ]} bl={BL} bw={BW} wood={wood} />
      <Desk position={[-deskX, 0, deskZ]} dd={DD} wood={wood} />
      <WallShelf position={[-hw + 0.08, 5.8, shelfZ]} side="left" />

      {/* ════ RIGHT STUDENT SETUP (mirrored) ════ */}
      <Closet position={[hw - CD/2, 0, closetZ]} cw={CW} cd={CD} ch={height * 0.94} side="right" />
      <LoftedBed position={[hw - BW/2, 0, bedZ]} bl={BL} bw={BW} wood={wood} />
      <Desk position={[deskX, 0, deskZ]} dd={DD} wood={wood} />
      <WallShelf position={[hw - 0.08, 5.8, shelfZ]} side="right" />

      {/* ════ BACK WALL — two windows above desks ════ */}
      <BackWindow position={[-deskX, height * 0.6, -hd + 0.06]} />
      <BackWindow position={[ deskX, height * 0.6, -hd + 0.06]} />

      {/* HVAC — right wall near front */}
      <HVAC position={[hw - 0.14, 0.5, hd - 5.5]} />
    </group>
  );
}

// ── Fluorescent ceiling light ─────────────────────────────────────────────────
function FluorescentLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[5.2, 0.07, 1.1]} />
        <meshStandardMaterial color="#e5e3de" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <planeGeometry args={[4.9, 0.95]} />
        <meshStandardMaterial color="#fffae8" emissive="#fffae8" emissiveIntensity={1.1} roughness={1} />
      </mesh>
    </group>
  );
}

// ── Built-in closet (flush to side wall, bi-fold double doors) ───────────────
function Closet({
  position, cw, cd, ch, side,
}: {
  position: [number, number, number];
  cw: number; cd: number; ch: number;
  side: "left" | "right";
}) {
  const flip = side === "left" ? 1 : -1;

  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, ch / 2, 0]} castShadow>
        <boxGeometry args={[cd, ch, cw]} />
        <meshStandardMaterial color="#d8d6d0" roughness={0.7} />
      </mesh>
      {/* Two large door panels (bi-fold style) */}
      {[-cw/4, cw/4].map((z, i) => (
        <mesh key={i} position={[flip * (cd/2 + 0.025), ch/2, z]} castShadow>
          <boxGeometry args={[0.04, ch - 0.1, cw/2 - 0.06]} />
          <meshStandardMaterial color="#ececea" roughness={0.3} metalness={0.02} />
        </mesh>
      ))}
      {/* Center door divider line */}
      <mesh position={[flip * (cd/2 + 0.03), ch/2, 0]}>
        <boxGeometry args={[0.02, ch - 0.1, 0.03]} />
        <meshStandardMaterial color="#c8c5c0" roughness={0.5} />
      </mesh>
      {/* Door handles */}
      {[-cw/4, cw/4].map((z, i) => (
        <mesh key={i} position={[flip * (cd/2 + 0.06), ch * 0.48, z * 0.35]}>
          <boxGeometry args={[0.05, 0.05, 0.45]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.25} />
        </mesh>
      ))}
      {/* Top trim */}
      <mesh position={[0, ch + 0.04, 0]}>
        <boxGeometry args={[cd + 0.05, 0.08, cw + 0.05]} />
        <meshStandardMaterial color="#ccc9c3" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── Lofted bed with dresser underneath, drawers facing carpet ─────────────────
function LoftedBed({
  position, bl, bw, wood,
}: {
  position: [number, number, number];
  bl: number; bw: number;
  wood: THREE.CanvasTexture;
}) {
  const LOFT = 2.6;
  const SLATS = 5;
  // Dresser dimensions (under bed, drawers face toward room center = +x for left bed, -x for right)
  const DRW = bw * 0.75;
  const DRH = LOFT - 0.15;
  const DRD = bl * 0.55;

  return (
    <group position={position}>
      {/* 4 corner posts */}
      {([ [-bw/2+0.1, -bl/2+0.1], [bw/2-0.1, -bl/2+0.1],
          [-bw/2+0.1,  bl/2-0.1], [bw/2-0.1,  bl/2-0.1] ] as [number,number][])
        .map(([x, z], i) => (
          <mesh key={i} position={[x, LOFT/2, z]} castShadow>
            <boxGeometry args={[0.14, LOFT, 0.14]} />
            <meshStandardMaterial color={OAK_DARK} roughness={0.65} />
          </mesh>
        ))}

      {/* Side rails */}
      {[-bw/2+0.1, bw/2-0.1].map((x, i) => (
        <mesh key={i} position={[x, LOFT - 0.15, 0]} castShadow>
          <boxGeometry args={[0.08, 0.12, bl - 0.2]} />
          <meshStandardMaterial color={OAK_DARK} roughness={0.65} />
        </mesh>
      ))}

      {/* Horizontal slats */}
      {Array.from({ length: SLATS }).map((_, i) => {
        const z = -bl/2 + 0.6 + (i * (bl - 1.2) / (SLATS - 1));
        return (
          <mesh key={i} position={[0, LOFT - 0.3, z]} castShadow>
            <boxGeometry args={[bw - 0.1, 0.06, 0.1]} />
            <meshStandardMaterial color={OAK} roughness={0.7} />
          </mesh>
        );
      })}

      {/* Bed platform */}
      <mesh position={[0, LOFT + 0.05, 0]} castShadow>
        <boxGeometry args={[bw, 0.1, bl]} />
        <meshStandardMaterial map={wood} roughness={0.5} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, LOFT + 0.4, 0]} castShadow>
        <boxGeometry args={[bw - 0.06, 0.58, bl - 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* ── Dresser under bed, drawers facing carpet center ── */}
      <mesh position={[0, DRH/2, bl/2 - DRD/2 - 0.1]} castShadow>
        <boxGeometry args={[DRW, DRH, DRD]} />
        <meshStandardMaterial map={wood} color={OAK} roughness={0.6} />
      </mesh>
      {/* Drawer fronts — face toward room center (positive z = toward carpet) */}
      {[0.55, 0, -0.55].map((dy, i) => (
        <group key={i}>
          <mesh position={[0, DRH/2 + dy * (DRH/3.2), bl/2 - 0.08]} castShadow>
            <boxGeometry args={[DRW - 0.12, DRH/3.2 - 0.06, 0.05]} />
            <meshStandardMaterial color={OAK_DARK} roughness={0.5} />
          </mesh>
          <mesh position={[0, DRH/2 + dy * (DRH/3.2), bl/2 - 0.03]}>
            <boxGeometry args={[0.38, 0.06, 0.04]} />
            <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Desk (against back wall, student faces window) ────────────────────────────
function Desk({
  position, dd, wood,
}: {
  position: [number, number, number];
  dd: number;
  wood: THREE.CanvasTexture;
}) {
  const DW = 3.6; // desk width (x-axis)
  return (
    <group position={position}>
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[DW, 0.1, dd]} />
        <meshStandardMaterial map={wood} roughness={0.45} />
      </mesh>
      {([ [-DW/2+0.1,-dd/2+0.1],[DW/2-0.1,-dd/2+0.1],
          [-DW/2+0.1, dd/2-0.1],[DW/2-0.1, dd/2-0.1] ] as [number,number][]).map(([x,z],i)=>(
        <mesh key={i} position={[x, 1.25, z]} castShadow>
          <boxGeometry args={[0.1, 2.5, 0.1]} />
          <meshStandardMaterial color={OAK_DARK} roughness={0.7} />
        </mesh>
      ))}
      {/* Chair pulled out toward room center (+z) */}
      <TaskChair position={[0, 0, dd/2 + 1.0]} />
    </group>
  );
}

// ── Back wall window (above desk, facing outward) ─────────────────────────────
function BackWindow({ position }: { position: [number, number, number] }) {
  const W = 3.8, H = 3.2;
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[W + 0.2, H + 0.2, 0.1]} />
        <meshStandardMaterial color="#c8c4bc" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#b8d8f2" transparent opacity={0.28} roughness={0} emissive="#c8e8ff" emissiveIntensity={0.45} />
      </mesh>
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0, H/2 - (H/14)*(i+0.5), 0.09]}>
          <planeGeometry args={[W - 0.06, 0.18]} />
          <meshStandardMaterial color="#dedad2" roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ── Task chair ────────────────────────────────────────────────────────────────
function TaskChair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[1.3, 0.1, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.2, -0.46]} castShadow>
        <boxGeometry args={[1.2, 1.2, 0.09]} />
        <meshStandardMaterial color="#111" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.35, 8]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.07, 5]} />
        <meshStandardMaterial color="#333" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ── 2-tier wall shelf with triangle brackets (like in photo) ──────────────────
function WallShelf({
  position, side,
}: {
  position: [number, number, number];
  side: "left" | "right";
}) {
  const SW = 2.8;  // shelf length along z-axis
  const SD = 0.85; // shelf depth (sticks out from wall)
  const flip = side === "left" ? 1 : -1;

  return (
    <group position={position}>
      {/* Two shelf tiers */}
      {[0, 1.5].map((dy, ti) => (
        <group key={ti} position={[0, dy, 0]}>
          {/* Shelf board */}
          <mesh castShadow>
            <boxGeometry args={[SD, 0.06, SW]} />
            <meshStandardMaterial color="#e2dfda" roughness={0.5} />
          </mesh>
          {/* Triangle brackets (2 per shelf) */}
          {[-SW/2 + 0.3, SW/2 - 0.3].map((z, bi) => (
            <group key={bi} position={[flip * SD/2 - flip*0.06, -0.06, z]}>
              {/* Vertical arm */}
              <mesh position={[0, -0.28, 0]}>
                <boxGeometry args={[0.05, 0.5, 0.05]} />
                <meshStandardMaterial color="#b0b0a8" metalness={0.5} roughness={0.4} />
              </mesh>
              {/* Horizontal arm */}
              <mesh position={[flip * SD/2 - flip*0.04, -0.52, 0]}>
                <boxGeometry args={[SD - 0.08, 0.05, 0.05]} />
                <meshStandardMaterial color="#b0b0a8" metalness={0.5} roughness={0.4} />
              </mesh>
              {/* Diagonal brace */}
              <mesh
                position={[flip * SD/4, -0.28, 0]}
                rotation={[0, 0, flip * Math.PI * 0.28]}
              >
                <boxGeometry args={[0.04, 0.6, 0.04]} />
                <meshStandardMaterial color="#b0b0a8" metalness={0.5} roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

// ── HVAC ─────────────────────────────────────────────────────────────────────
function HVAC({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 1.1, 2.5]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.7} />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[-0.07, -0.3 + i*0.11, 0]}>
          <boxGeometry args={[0.08, 0.03, 2.3]} />
          <meshStandardMaterial color="#b8b4ae" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
