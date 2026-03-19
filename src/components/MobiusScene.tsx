"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import MobiusStrip from "./MobiusStrip";
import SceneBackground from "./SceneBackground";

export { gsap };

interface MobiusSceneProps {
  /** Whether the strip should rotate */
  isRotating?: boolean;
  /** Whether to show orbit controls (for dev/debug) */
  showControls?: boolean;
  /** Callback when scene is ready */
  onReady?: () => void;
}

/**
 * Full 3D scene containing the Möbius strip with lighting and camera.
 * Uses GSAP for smooth rotation tweens when transitioning between states.
 */
export default function MobiusScene({
  isRotating = false,
  showControls = false,
  onReady,
}: MobiusSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        dpr={[1, 2]}
      >
        <SceneBackground />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -2, 2]} intensity={0.5} />
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#22d3ee" />

        <Suspense fallback={null}>
          <group ref={groupRef}>
            <MobiusStrip rotationSpeed={0.7} scale={1.1} isRotating={isRotating} />
          </group>
          {showControls && <OrbitControls enableZoom={false} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

