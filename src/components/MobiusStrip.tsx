"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

/**
 * Parametric Möbius strip geometry (elliptical in xy plane).
 * x = (radiusX + v/2·cos(u/2))·cos(u), y = (radiusY + v/2·cos(u/2))·sin(u), z = v/2·sin(u/2)
 * u ∈ [0, 2π] around the loop, v ∈ [-1, 1] across the strip width
 * radiusX > radiusY makes the strip wider in the x-direction (horizontal on screen)
 */
function createMobiusGeometry(
  radiusX: number = 2.5,
  radiusY: number = 1.5,
  width: number = 0.4,
  uSegments: number = 64,
  vSegments: number = 16
): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= uSegments; i++) {
    for (let j = 0; j <= vSegments; j++) {
      const u = (i / uSegments) * Math.PI * 2;
      const v = (j / vSegments) * 2 - 1; // -1 to 1

      const rX = radiusX + (width * v * 0.5 * Math.cos(u / 2));
      const rY = radiusY + (width * v * 0.5 * Math.cos(u / 2));
      const x = rX * Math.cos(u);
      const y = rY * Math.sin(u);
      const z = (width * v * 0.5 * Math.sin(u / 2));

      positions.push(x, y, z);
      uvs.push(i / uSegments, j / vSegments);
      normals.push(0, 0, 0); // Placeholder; computeVertexNormals will overwrite
    }
  }

  for (let i = 0; i < uSegments; i++) {
    for (let j = 0; j < vSegments; j++) {
      const a = i * (vSegments + 1) + j;
      const b = a + vSegments + 1;
      const c = a + 1;
      const d = b + 1;
      indices.push(a, b, c, c, b, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/** Midline of Möbius strip (v=0): ellipse in xy plane */
function createMidlineCurve(radiusX: number, radiusY: number, segments: number = 128) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const u = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      radiusX * Math.cos(u),
      radiusY * Math.sin(u),
      0
    ));
  }
  return new THREE.CatmullRomCurve3(points, true);
}

// Axis protruding from screen, tilted 15° upward (in world space)
const ROTATION_AXIS = new THREE.Vector3(
  0,
  Math.sin(Math.PI / 180),
  Math.cos(Math.PI / 180)
).normalize();

interface MobiusStripProps {
  /** Rotation speed (rad/s) around central axis */
  rotationSpeed?: number;
  /** Whether to rotate (when false, strip stays flush with xy plane) */
  isRotating?: boolean;
  /** Scale factor */
  scale?: number;
}

const RADIUS_X = 1.4;
const RADIUS_Y = 1.0;

export default function MobiusStrip({
  rotationSpeed = 0.9,
  isRotating = false,
  scale = 1,
}: MobiusStripProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rotationGroupRef = useRef<THREE.Group>(null);
  const pointPhase = useRef(0);
  const sphereRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () => createMobiusGeometry(RADIUS_X, RADIUS_Y, 0.18, 64, 16),
    []
  );
  const midlineCurve = useMemo(
    () => createMidlineCurve(RADIUS_X, RADIUS_Y),
    []
  );
  const lineGeometry = useMemo(() => {
    const pts = midlineCurve.getPoints(128);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [midlineCurve]);

  // GSAP entrance animation: scale in with elastic ease
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(0);
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1.8,
        ease: "back.out(1.4)",
        overwrite: true,
      });
    }
  }, [scale]);

  // Rotation around axis when enabled; animate white point along midline
  useFrame((_, delta) => {
    if (rotationGroupRef.current && isRotating) {
      rotationGroupRef.current.rotateOnWorldAxis(ROTATION_AXIS, rotationSpeed * delta);
    }
    pointPhase.current += delta * 0.5;
    if (pointPhase.current > 1) pointPhase.current -= 1;
    if (sphereRef.current) {
      sphereRef.current.position.copy(midlineCurve.getPoint(pointPhase.current));
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={rotationGroupRef}>
        <mesh ref={meshRef} geometry={geometry} scale={1}>
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#0a0a0f"
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

        {/* Neon orange midline */}
        <line geometry={lineGeometry}>
          <lineBasicMaterial color="#ff6b35" />
        </line>

        {/* Bright white point rotating along midline — radius is first arg */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Wireframe overlay for a more geometric / mathematical aesthetic
 */
export function MobiusStripWireframe({ scale = 1 }: { scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () => createMobiusGeometry(1.4, 1.0, 0.18, 48, 12),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={scale}>
      <meshBasicMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
