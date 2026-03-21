"use client";

import { useRef, useEffect } from "react";

const RADIUS = 14;

/** Small light attached to cursor — uses direct DOM updates to avoid React re-renders */
export default function CursorLight() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.display = "";
    };
    const onLeave = () => {
      el.style.display = "none";
    };

    el.style.display = "none";
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="fixed pointer-events-none z-[2]"
      style={{
        width: RADIUS * 2,
        height: RADIUS * 2,
        marginLeft: -RADIUS,
        marginTop: -RADIUS,
        background: `radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
      }}
    />
  );
}
