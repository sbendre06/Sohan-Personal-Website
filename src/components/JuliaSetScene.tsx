"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { C_DEFAULT, type Complex } from "@/lib/julia-set";

const HOVER_RADIUS = 0.27; // NDC units, ~25% of screen
const FAR = 10; // Cursor "off" position
const TRAIL_MAX = 16;
const HOLD_TIME = 1; // seconds before fade starts
const FADE_TIME = 0.8; // seconds to fade out
const TRAIL_INTERVAL = 0.2; // add position every 80ms

/** Convert screen coords to NDC (-1 to 1) for a given rect */
function screenToNDC(clientX: number, clientY: number, rect: DOMRect): { x: number; y: number } {
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
}

interface TrailPoint {
  x: number;
  y: number;
  birthTime: number;
}

/** Manages trail and renders fractals — lives inside Canvas for useFrame */
function FractalWithTrail({
  c,
  mouse,
}: {
  c: Complex;
  mouse: { x: number; y: number };
}) {
  const trailRef = useRef<TrailPoint[]>([]);
  const lastAddRef = useRef(0);

  useFrame((state) => {
    const now = state.clock.elapsedTime;
    const isActive = Math.abs(mouse.x) < 5 && Math.abs(mouse.y) < 5;

    if (isActive && now - lastAddRef.current > TRAIL_INTERVAL) {
      trailRef.current.push({ x: mouse.x, y: mouse.y, birthTime: now });
      lastAddRef.current = now;
    }

    trailRef.current = trailRef.current.filter(
      (p) => now - p.birthTime < HOLD_TIME + FADE_TIME
    );
  });

  return (
    <>
      <JuliaSetShader c={c} position="topLeft" mouse={mouse} trailRef={trailRef} />
      <JuliaSetShader c={c} position="bottomRight" mouse={mouse} trailRef={trailRef} />
    </>
  );
}

/** Julia set fractal — position: "topLeft" | "bottomRight" */
function JuliaSetShader({
  c,
  position,
  mouse,
  trailRef,
}: {
  c: Complex;
  position: "topLeft" | "bottomRight";
  mouse: { x: number; y: number };
  trailRef: React.RefObject<TrailPoint[]>;
}) {
  const trailVecs = useRef(
    Array.from({ length: TRAIL_MAX }, () => new THREE.Vector2(0, 0))
  ).current;
  const trailAges = useRef(new Float32Array(TRAIL_MAX)).current;

  const uniforms = useRef({
    uC: { value: new THREE.Vector2(c.re, c.im) },
    uMaxIter: { value: 96 },
    uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
    uRadius: { value: HOVER_RADIUS },
    uTrail: { value: trailVecs },
    uTrailAge: { value: trailAges },
    uTrailCount: { value: 0 },
    uHoldTime: { value: HOLD_TIME },
    uFadeTime: { value: FADE_TIME },
    uTime: { value: 0 },
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;
    uniforms.current.uMouse.value.set(mouse.x, mouse.y);
    const now = state.clock.elapsedTime;
    const trail = trailRef.current;
    const n = Math.min(trail.length, TRAIL_MAX);
    uniforms.current.uTrailCount.value = n;
    for (let i = 0; i < n; i++) {
      const p = trail[i];
      trailVecs[i].set(p.x, p.y);
      trailAges[i] = now - p.birthTime;
    }
  });

  const pos = position === "topLeft" ? [-0.4, 0.5, 0] as const : [0.42, -0.35, 0] as const;

  return (
    <mesh position={pos}>
      <planeGeometry args={[1.1, 1.1]} />
      <shaderMaterial
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          varying vec2 vNDC;
          void main() {
            vUv = uv;
            vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vNDC = clip.xy / clip.w;
            gl_Position = clip;
          }
        `}
        fragmentShader={`
          uniform vec2 uC;
          uniform float uMaxIter;
          uniform vec2 uMouse;
          uniform float uRadius;
          uniform vec2 uTrail[16];
          uniform float uTrailAge[16];
          uniform int uTrailCount;
          uniform float uHoldTime;
          uniform float uFadeTime;
          uniform float uTime;
          varying vec2 vUv;
          varying vec2 vNDC;

          // Cycle: red → orange → purple → pink → red
          vec3 cycleColor(float t) {
            t = mod(t, 1.0);
            vec3 red = vec3(1.0, 0.2, 0.3);
            vec3 orange = vec3(1.0, 0.5, 0.1);
            vec3 purple = vec3(0.7, 0.25, 1.0);
            vec3 pink = vec3(1.0, 0.4, 0.7);
            float s = 1.0 / 4.0;
            if (t < s) return mix(red, orange, smoothstep(0.0, s, t));
            if (t < 2.0*s) return mix(orange, purple, smoothstep(s, 2.0*s, t));
            if (t < 3.0*s) return mix(purple, pink, smoothstep(2.0*s, 3.0*s, t));
            return mix(pink, red, smoothstep(3.0*s, 1.0, t));
          }

          void main() {
            float s = 1.45;
            float cx = (vUv.x - 0.5) * s + (vUv.y - 0.5) * s;
            float cy = -(vUv.x - 0.5) * s + (vUv.y - 0.5) * s;

            float zx = cx;
            float zy = cy;
            float iter = 0.0;

            for (int i = 0; i < 128; i++) {
              if (zx * zx + zy * zy > 4.0) break;
              float tx = zx * zx - zy * zy + uC.x;
              zy = 2.0 * zx * zy + uC.y;
              zx = tx;
              iter = iter + 1.0;
            }

            float t = iter / uMaxIter;

            // Swapped: cyan on boundary, rotating colors in inner gradient
            vec3 neonCyan = vec3(0.25, 0.95, 0.9);
            vec3 cycleColorVal = cycleColor(uTime * 0.125);
            vec3 accent = vec3(0.95, 0.6, 0.5);
            vec3 cream = vec3(0.95, 0.9, 0.8);

            vec3 col;
            float alpha;
            if (t < 0.02) {
              col = vec3(0.0);
              alpha = 0.0;
            } else if (t < 0.08) {
              col = neonCyan;
              alpha = smoothstep(0.02, 0.08, t) * 0.35;
            } else if (t < 0.35) {
              col = mix(vec3(0.0), neonCyan, smoothstep(0.08, 0.35, t));
              alpha = smoothstep(0.08, 0.2, t);
            } else if (t < 0.65) {
              col = mix(neonCyan, cycleColorVal, (t - 0.35) / 0.3);
              alpha = 1.0;
            } else {
              col = mix(cycleColorVal, accent, (t - 0.65) / 0.35);
              alpha = 1.0;
            }

            float bright = 0.4 + 0.6 * smoothstep(0.08, 0.2, t);
            if (iter >= uMaxIter - 1.0) {
              bright = 1.0;
              col = cream;
            }
            col *= bright;

            // Cursor or trail within radius — trail stays lit 1s then fades
            float dist = length(vNDC - uMouse);
            float blend = 1.0 - smoothstep(uRadius * 0.6, uRadius, dist);

            for (int i = 0; i < 16; i++) {
              if (i >= uTrailCount) continue;
              float d = length(vNDC - uTrail[i]);
              float r = 1.0 - smoothstep(uRadius * 0.6, uRadius, d);
              float age = uTrailAge[i];
              float trailBlend = r * (age < uHoldTime ? 1.0 : max(0.0, 1.0 - (age - uHoldTime) / uFadeTime));
              blend = max(blend, trailBlend);
            }

            vec3 grey = vec3(0.35, 0.35, 0.38);
            col = mix(grey, col, blend);

            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  );
}

export default function JuliaSetScene() {
  const c = C_DEFAULT;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: FAR, y: FAR });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const ndc = screenToNDC(e.clientX, e.clientY, rect);
      setMouse(ndc);
    };

    const onLeave = () => setMouse({ x: FAR, y: FAR });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-transparent fractal-glow">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        dpr={[2, 3]}
      >
        <FractalWithTrail c={c} mouse={mouse} />
      </Canvas>
    </div>
  );
}
