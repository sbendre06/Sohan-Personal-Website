"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import {
  generateJuliaPoints,
  C_DEFAULT,
  type Complex,
} from "@/lib/julia-set";

const GRID_RES = 70;
const MAX_ITER = 256;
const SIGMA = 0.015;
const POINT_SCALE = 0.065;
const MIN_ITER_THRESHOLD = 2;

/** Map iteration count to color (reference: purple exterior → blue transition → orange core) */
function iterationToColor(iter: number, maxIter: number): THREE.Color {
  const t = iter / maxIter;
  if (t < 0.35) {
    return new THREE.Color().setHSL(0.78, 0.65, 0.4); // Purple, misty (darker = more faint)
  }
  if (t < 0.65) {
    return new THREE.Color().setHSL(0.58, 0.85, 0.52); // Blue, transition
  }
  return new THREE.Color().setHSL(0.08, 0.92, 0.62); // Orange, core/spiral centers (saturated)
}

function JuliaSetPoints({ c }: { c: Complex }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const pts = generateJuliaPoints(c, GRID_RES, MAX_ITER, SIGMA, MIN_ITER_THRESHOLD, {
      xMin: -1.7,
      xMax: 1.7,
      yMin: -1.15,
      yMax: 1.15,
    });
    const pos = new Float32Array(pts.length * 3);
    const col = new Float32Array(pts.length * 3);
    const color = new THREE.Color();
    for (let i = 0; i < pts.length; i++) {
      pos[i * 3] = pts[i].x;
      pos[i * 3 + 1] = pts[i].y;
      pos[i * 3 + 2] = 0;
      color.copy(iterationToColor(pts[i].iteration, pts[i].maxIter));
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [c.re, c.im]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => {
    // High-res soft circle texture for crisp rendering
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.8)");
    g.addColorStop(0.7, "rgba(255,255,255,0.3)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;

    return new THREE.PointsMaterial({
      size: POINT_SCALE * 2.2,
      map: tex,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
  }, []);

  useEffect(() => {
    if (!pointsRef.current) return;
    pointsRef.current.scale.setScalar(0);
    gsap.to(pointsRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.2,
      ease: "back.out(1.6)",
    });
  }, []);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export default function JuliaSetScene() {
  const [c, setC] = useState<Complex>({ ...C_DEFAULT });

  // GSAP: animate c value for bloom/pulse effect (throttled to avoid heavy regeneration)
  useEffect(() => {
    const obj = { re: C_DEFAULT.re, im: C_DEFAULT.im };
    let lastUpdate = 0;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(obj, {
      re: C_DEFAULT.re + 0.03,
      im: C_DEFAULT.im + 0.02,
      duration: 8,
      ease: "sine.inOut",
      onUpdate: () => {
        const now = Date.now();
        if (now - lastUpdate > 800) {
          lastUpdate = now;
          setC({ ...obj });
        }
      },
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[2, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <JuliaSetPoints c={c} />
      </Canvas>
      {/* Vignette: fade to black at screen edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, transparent 50%, rgba(10,10,10,0.3) 80%, rgba(10,10,10,0.95) 100%)",
        }}
      />
    </div>
  );
}
