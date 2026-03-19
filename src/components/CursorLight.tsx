"use client";

import { useState, useEffect } from "react";

const RADIUS = 14; // extremely small radius in px

/** Small light attached to cursor over the black background */
export default function CursorLight() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onLeave = () => setPos(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      className="fixed pointer-events-none z-[2]"
      style={{
        left: pos.x,
        top: pos.y,
        width: RADIUS * 2,
        height: RADIUS * 2,
        marginLeft: -RADIUS,
        marginTop: -RADIUS,
        background: `radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
      }}
    />
  );
}
