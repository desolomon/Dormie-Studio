"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";

// ─── Room dimensions ──────────────────────────────────────────────────────────
const RW = 8, RD = 8, RH = 3.6;

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ItemForRender {
  placedId: string;
  fx: number;
  fy: number;
  color: string;
  accent: string;
  category: string;
  entering: boolean;
  w: number;
  d: number;
}

// ─── Wood floor texture (canvas-generated) ────────────────────────────────────
function createWoodTexture() {
  const sz = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = sz;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#9c7248";
  ctx.fillRect(0, 0, sz, sz);

  // Plank rows
  const plankH = sz / 5;
  for (let row = 0; row < 5; row++) {
    const y0 = row * plankH;
    ctx.fillStyle = `rgba(${row % 2 === 0 ? "150,108,62" : "120,85,48"},0.18)`;
    ctx.fillRect(0, y0, sz, plankH);
    ctx.strokeStyle = "rgba(35,15,5,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(sz, y0); ctx.stroke();
  }

  // Vertical plank gaps
  for (let i = 0; i < 4; i++) {
    const x = (i + 1) * (sz / 4);
    ctx.strokeStyle = "rgba(35,15,5,0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, sz); ctx.stroke();
  }

  // Wood grain
  for (let i = 0; i < 90; i++) {
    const y = Math.random() * sz;
    const w = Math.random() * 4 - 2;
    ctx.strokeStyle = `rgba(55,28,8,${0.04 + Math.random() * 0.09})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(sz * 0.33, y + w, sz * 0.66, y - w, sz, y + w * 0.6);
    ctx.stroke();
  }

  // Knots
  for (let i = 0; i < 4; i++) {
    const x = Math.random() * sz, y = Math.random() * sz, r = 8 + Math.random() * 14;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(45,20,8,0.55)");
    g.addColorStop(1, "rgba(45,20,8,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

// ─── Room geometry ────────────────────────────────────────────────────────────
function WoodFloor() {
  const texture = useMemo(createWoodTexture, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[RW, RD, 1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.78} metalness={0.04} />
    </mesh>
  );
}

function Room() {
  const wallColor = "#eae5de";
  return (
    <group>
      <WoodFloor />

      {/* Back wall */}
      <mesh position={[0, RH / 2, -RD / 2]} receiveShadow>
        <planeGeometry args={[RW, RH]} />
        <meshStandardMaterial color={wallColor} roughness={0.92} metalness={0} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-RW / 2, RH / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[RD, RH]} />
        <meshStandardMaterial color={wallColor} roughness={0.92} metalness={0} />
      </mesh>

      {/* Right wall */}
      <mesh position={[RW / 2, RH / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[RD, RH]} />
        <meshStandardMaterial color={wallColor} roughness={0.92} metalness={0} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, RH, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[RW, RD]} />
        <meshStandardMaterial color="#f3f0ea" roughness={0.95} metalness={0} />
      </mesh>

      {/* Baseboard back */}
      <mesh position={[0, 0.045, -RD / 2 + 0.015]} castShadow receiveShadow>
        <boxGeometry args={[RW, 0.09, 0.03]} />
        <meshStandardMaterial color="#d6d0c8" roughness={0.65} metalness={0.08} />
      </mesh>
      {/* Baseboard left */}
      <mesh position={[-RW / 2 + 0.015, 0.045, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[RD, 0.09, 0.03]} />
        <meshStandardMaterial color="#d6d0c8" roughness={0.65} metalness={0.08} />
      </mesh>
      {/* Baseboard right */}
      <mesh position={[RW / 2 - 0.015, 0.045, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[RD, 0.09, 0.03]} />
        <meshStandardMaterial color="#d6d0c8" roughness={0.65} metalness={0.08} />
      </mesh>

      {/* Crown molding back */}
      <mesh position={[0, RH - 0.04, -RD / 2 + 0.015]}>
        <boxGeometry args={[RW, 0.07, 0.03]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.8} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ─── Furniture mesh components ────────────────────────────────────────────────
function SofaMesh({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[1.72, 0.44, 0.82]} />
        <meshStandardMaterial color={color} roughness={0.83} metalness={0.04} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.63, -0.35]}>
        <boxGeometry args={[1.72, 0.52, 0.17]} />
        <meshStandardMaterial color={color} roughness={0.83} metalness={0.04} />
      </mesh>
      {([-0.8, 0.8] as number[]).map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.4, 0]}>
          <boxGeometry args={[0.17, 0.52, 0.82]} />
          <meshStandardMaterial color={color} roughness={0.83} metalness={0.04} />
        </mesh>
      ))}
      {([-0.43, 0.43] as number[]).map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.48, 0.06]}>
          <boxGeometry args={[0.8, 0.11, 0.66]} />
          <meshStandardMaterial color={accent} roughness={0.88} metalness={0} />
        </mesh>
      ))}
      {([[-0.72, -0.3], [0.72, -0.3], [-0.72, 0.3], [0.72, 0.3]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 0.04, z]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#3a2010" roughness={0.48} metalness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function TableMesh({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.755, 0]}>
        <boxGeometry args={[1.22, 0.06, 0.66]} />
        <meshStandardMaterial color={color} roughness={0.58} metalness={0.12} />
      </mesh>
      <mesh castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[1.1, 0.06, 0.54]} />
        <meshStandardMaterial color={accent} roughness={0.62} metalness={0.1} />
      </mesh>
      {([[-0.55, -0.28], [0.55, -0.28], [-0.55, 0.28], [0.55, 0.28]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.37, z]}>
          <boxGeometry args={[0.055, 0.74, 0.055]} />
          <meshStandardMaterial color={color} roughness={0.58} metalness={0.12} />
        </mesh>
      ))}
    </group>
  );
}

function ChairMesh({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.46, 0.02]}>
        <boxGeometry args={[0.62, 0.08, 0.57]} />
        <meshStandardMaterial color={color} roughness={0.82} metalness={0.04} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.78, -0.25]}>
        <boxGeometry args={[0.62, 0.56, 0.09]} />
        <meshStandardMaterial color={accent} roughness={0.85} metalness={0.04} />
      </mesh>
      {([[-0.27, 0.25], [0.27, 0.25], [-0.27, -0.25], [0.27, -0.25]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.23, z]}>
          <boxGeometry args={[0.05, 0.46, 0.05]} />
          <meshStandardMaterial color="#4a3020" roughness={0.52} metalness={0.16} />
        </mesh>
      ))}
    </group>
  );
}

function LampMesh({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        <meshStandardMaterial color="#252525" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh castShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[0.045, 1.42, 0.045]} />
        <meshStandardMaterial color="#353535" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 1.52, 0]}>
        <boxGeometry args={[0.4, 0.28, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.68} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

function RugMesh({ color, accent, fw, fd }: { color: string; accent: string; fw: number; fd: number }) {
  const w = Math.max(0.9, fw * 0.022);
  const d = Math.max(0.7, fd * 0.022);
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.009, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={color} roughness={0.96} metalness={0} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[w * 0.84, d * 0.84]} />
        <meshStandardMaterial color={accent} roughness={0.96} metalness={0} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function ShelfMesh({ color, accent }: { color: string; accent: string }) {
  const shelfYs = [0.3, 0.72, 1.14, 1.56];
  return (
    <group>
      {([-0.53, 0.53] as number[]).map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 0.8, 0]}>
          <boxGeometry args={[0.045, 1.6, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.68} metalness={0.06} />
        </mesh>
      ))}
      {shelfYs.map((y, i) => (
        <mesh key={i} castShadow receiveShadow position={[0, y, 0]}>
          <boxGeometry args={[1.02, 0.045, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.68} metalness={0.06} />
        </mesh>
      ))}
      {shelfYs.slice(0, 3).map((y, row) =>
        ([-0.32, -0.18, -0.05, 0.09, 0.22, 0.36] as number[]).map((x, col) => (
          <mesh key={`${row}-${col}`} castShadow position={[x, y + 0.02 + 0.05 + (col % 3) * 0.015, 0.01]}>
            <boxGeometry args={[0.065, 0.1 + (col % 3) * 0.03, 0.22]} />
            <meshStandardMaterial color={col % 2 === 0 ? accent : color} roughness={0.7} />
          </mesh>
        ))
      )}
    </group>
  );
}

function FurnitureMesh3D({ item }: { item: ItemForRender }) {
  const p = { color: item.color, accent: item.accent };
  switch (item.category) {
    case "Sofas":   return <SofaMesh   {...p} />;
    case "Tables":  return <TableMesh  {...p} />;
    case "Chairs":  return <ChairMesh  {...p} />;
    case "Lamps":   return <LampMesh   {...p} />;
    case "Rugs":    return <RugMesh    {...p} fw={item.w} fd={item.d} />;
    default:        return <ShelfMesh  {...p} />;
  }
}

// ─── Furniture item with spring drop animation ────────────────────────────────
function FurnitureItem({
  item, isSelected, onItemClick,
}: {
  item: ItemForRender;
  isSelected: boolean;
  onItemClick: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spring = useRef({ y: 0, vy: 0, settled: true });

  // On mount: if entering, drop from above
  useEffect(() => {
    if (item.entering && groupRef.current) {
      groupRef.current.position.y = 8;
      spring.current = { y: 8, vy: 0, settled: false };
    }
  }, []); // eslint-disable-line

  useFrame((_, delta) => {
    if (spring.current.settled || !groupRef.current) return;
    const s = spring.current;
    const k = 24, c = 5.5;
    const force = -k * (s.y - 0) - c * s.vy;
    s.vy += force * delta;
    s.y += s.vy * delta;
    if (Math.abs(s.y) < 0.004 && Math.abs(s.vy) < 0.004) {
      s.y = 0; s.settled = true;
    }
    groupRef.current.position.y = s.y;
  });

  const wx = (item.fx - 0.5) * (RW - 1.8);
  const wz = (0.5 - item.fy) * (RD - 1.8);

  return (
    <group
      ref={groupRef}
      position={[wx, 0, wz]}
      onClick={(e) => { e.stopPropagation(); onItemClick(item.placedId); }}
    >
      <FurnitureMesh3D item={item} />

      {/* Selection ring on floor */}
      {isSelected && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
            <ringGeometry args={[0.6, 0.78, 48]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.85} />
          </mesh>
          <pointLight color="#00d4ff" intensity={0.9} distance={2.5} position={[0, 0.6, 0]} />
        </>
      )}
    </group>
  );
}

// ─── Camera controller for AR vs Plan toggle ──────────────────────────────────
function CameraController({ viewMode }: { viewMode: "ar" | "plan" }) {
  const { camera } = useThree();
  useEffect(() => {
    if (viewMode === "plan") {
      camera.position.set(0, 14, 0.001);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(0, 4.5, 7.5);
      camera.lookAt(0, 0.6, 0);
    }
  }, [viewMode, camera]);
  return null;
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function ThreeRoomCanvas({
  placedItems,
  selectedId,
  viewMode,
  onItemClick,
}: {
  placedItems: ItemForRender[];
  selectedId: string | null;
  viewMode: "ar" | "plan";
  onItemClick: (id: string) => void;
}) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Canvas
        shadows
        camera={{ position: [0, 4.5, 7.5], fov: 48, near: 0.1, far: 60 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          scene.background = new THREE.Color("#1e1810");
          scene.fog = new THREE.Fog("#f0ece4", 14, 28);
        }}
      >
        <CameraController viewMode={viewMode} />

        {/* Lighting */}
        <ambientLight intensity={0.42} color="#dde8ff" />
        <directionalLight
          position={[4, 10, 5]}
          intensity={1.35}
          color="#fff6e8"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-camera-near={0.5}
          shadow-camera-far={24}
          shadow-bias={-0.0008}
        />
        {/* Ceiling point lights */}
        <pointLight
          position={[-2.2, 3.5, -1.8]}
          intensity={1.2}
          color="#ffeedd"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[2.2, 3.5, 1.8]} intensity={1.0} color="#fff4e8" />
        {/* Fill light from front-left */}
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#e8f0ff" />

        {/* Room */}
        <Room />

        {/* Furniture */}
        {placedItems.map((item) => (
          <FurnitureItem
            key={item.placedId}
            item={item}
            isSelected={item.placedId === selectedId}
            onItemClick={onItemClick}
          />
        ))}

        <OrbitControls
          target={[0, 0.8, 0]}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.15}
          minDistance={3}
          maxDistance={18}
          enableDamping
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.42) 100%)",
      }} />

      {/* View label */}
      <div style={{
        position: "absolute", top: 16, left: 20,
        fontSize: 10, fontWeight: 500, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.22)", pointerEvents: "none",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        {viewMode === "ar" ? "3D VIEW — DRAG TO ORBIT" : "PLAN VIEW — TOP DOWN"}
      </div>
    </div>
  );
}
