"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Room from "./Room";
import { SCHOOLS } from "@/lib/schools";
import { Theme } from "@/lib/themes";
import * as THREE from "three";

type StudioCanvasProps = {
  theme: Theme;
};

export default function StudioCanvas({ theme }: StudioCanvasProps) {
  const school = SCHOOLS["tulane"];
  const { width, depth, height } = school.dimensions;
  const { lighting, colors } = theme;

  const dirX = lighting.dirFromRight ? width * 1.5 : -width * 1.5;

  return (
    <div className="w-full h-full">
      <Canvas
        shadows="soft"
        camera={{
          position: [0, height * 0.85, depth * 1.1],
          fov: 58,
          near: 0.1,
          far: 300,
        }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Ambient fill */}
        <ambientLight intensity={lighting.ambientIntensity} color={lighting.ambientColor} />

        {/* Ceiling point light */}
        <pointLight
          position={[0, height - 0.3, 0]}
          intensity={3.0}
          color="#fffcf0"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-radius={3}
        />

        {/* Directional key light */}
        <directionalLight
          position={[dirX, height * 0.7, -depth * 0.3]}
          intensity={lighting.dirIntensity}
          color={lighting.dirColor}
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

        {/* Soft bounce from floor */}
        <hemisphereLight args={[lighting.ambientColor as THREE.ColorRepresentation, "#c0b8a8", 0.35]} />

        <Room width={width} depth={depth} height={height} themeColors={colors} />

        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.4}
          scale={35}
          blur={2.5}
          far={8}
          color="#3a3028"
        />

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
