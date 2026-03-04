"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Room from "./Room";
import { School } from "@/lib/schools";

type StudioCanvasProps = {
  school: School;
};

export default function StudioCanvas({ school }: StudioCanvasProps) {
  const { width, depth, height } = school.dimensions;

  return (
    <div className="flex-1 h-full bg-[#2a2a2a]">
      <Canvas
        shadows="soft"
        camera={{
          position: [0, height * 0.85, depth * 1.1],
          fov: 58,
          near: 0.1,
          far: 300,
        }}
        gl={{ antialias: true }}
      >
        {/* Warm ambient fill */}
        <ambientLight intensity={0.55} color="#fff8f0" />

        {/* Main ceiling fluorescent light (cool white) */}
        <pointLight
          position={[0, height - 0.3, 0]}
          intensity={3.5}
          color="#fffcf0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-radius={3}
        />

        {/* Natural light from window (left wall, cool daylight) */}
        <directionalLight
          position={[-width * 1.5, height * 0.7, -depth * 0.3]}
          intensity={1.8}
          color="#d8ecf8"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={1}
          shadow-camera-far={80}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.001}
        />

        {/* Soft bounce light from floor */}
        <hemisphereLight
          args={["#fff8f0", "#c0b8a8", 0.4]}
        />

        {/* Room */}
        <Room width={width} depth={depth} height={height} />

        {/* Soft contact shadows on carpet */}
        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.5}
          scale={35}
          blur={2.5}
          far={8}
          color="#3a3028"
        />

        {/* Controls: left-drag to orbit, right-drag to pan, scroll to zoom */}
        <OrbitControls
          target={[0, height * 0.22, -depth * 0.1]}
          maxPolarAngle={Math.PI / 1.95}
          minPolarAngle={0.08}
          minDistance={4}
          maxDistance={32}
          enablePan
          panSpeed={0.7}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
