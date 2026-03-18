"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Colorful Three.js background for the scene.
 * Renders a fullscreen gradient mesh — easily extensible for particles, shaders, etc.
 */
export default function SceneBackground() {
  const { texture, material } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Radial gradient: deep center to vibrant edges
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    gradient.addColorStop(0, "#0f172a");   // deep center
    gradient.addColorStop(0.3, "#1e1b4b");  // indigo
    gradient.addColorStop(0.6, "#312e81");  // purple
    gradient.addColorStop(0.8, "#0c4a6e");  // cyan
    gradient.addColorStop(1, "#134e4a");    // teal

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      depthWrite: false,
      side: THREE.BackSide,
    });

    return { texture, material };
  }, []);

  const geometry = useMemo(() => {
    // Large sphere behind everything — camera sees the inside
    return new THREE.SphereGeometry(50, 32, 32);
  }, []);

  return (
    <mesh geometry={geometry} material={material} dispose={null} />
  );
}
