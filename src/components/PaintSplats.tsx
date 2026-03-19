"use client";

const COLORS = [
  "rgb(255, 80, 100)",
  "rgb(255, 140, 50)",
  "rgb(180, 80, 255)",
  "rgb(255, 120, 180)",
  "rgb(255, 90, 130)",
  "rgb(200, 100, 255)",
  "rgb(255, 160, 80)",
  "rgb(220, 100, 200)",
];

// Stochastic offsets from center in vw/vh (top-left cluster: center 14vw, 14vh)
const TOP_LEFT_OFFSETS: { x: number; y: number; size: string; maxSize: number; rot: number }[] = [
  { x: 6, y: 4, size: "32vw", maxSize: 380, rot: -12 },
  { x: 16, y: 0, size: "26vw", maxSize: 300, rot: 8 },
  { x: 2, y: 14, size: "28vw", maxSize: 320, rot: -5 },
  { x: 16, y: 18, size: "22vw", maxSize: 260, rot: 15 },
  { x: 10, y: 8, size: "30vw", maxSize: 350, rot: 3 },
  { x: 20, y: 12, size: "24vw", maxSize: 280, rot: -8 },
  { x: 4, y: 10, size: "20vw", maxSize: 240, rot: 10 },
  { x: 12, y: 6, size: "18vw", maxSize: 220, rot: -3 },
];

// Stochastic offsets (bottom-right cluster + along bottom edge + upwards)
const BOTTOM_RIGHT_OFFSETS: { x: number; y: number; size: string; maxSize: number; rot: number }[] = [
  // Original cluster
  { x: 92, y: 94, size: "34vw", maxSize: 400, rot: 7 },
  { x: 84, y: 98, size: "27vw", maxSize: 310, rot: -10 },
  { x: 96, y: 85, size: "29vw", maxSize: 340, rot: 12 },
  { x: 82, y: 82, size: "23vw", maxSize: 270, rot: -6 },
  { x: 88, y: 91, size: "31vw", maxSize: 360, rot: 4 },
  { x: 74, y: 88, size: "25vw", maxSize: 290, rot: -14 },
  { x: 94, y: 92, size: "21vw", maxSize: 250, rot: 9 },
  { x: 80, y: 96, size: "19vw", maxSize: 230, rot: 5 },
  // Along bottom edge towards center
  { x: 68, y: 95, size: "24vw", maxSize: 280, rot: -7 },
  { x: 58, y: 96, size: "22vw", maxSize: 260, rot: 11 },
  { x: 50, y: 94, size: "20vw", maxSize: 240, rot: -4 },
  { x: 62, y: 92, size: "18vw", maxSize: 220, rot: 8 },
  { x: 44, y: 97, size: "16vw", maxSize: 200, rot: -9 },
  // Upwards from bottom-right
  { x: 90, y: 72, size: "26vw", maxSize: 300, rot: 6 },
  { x: 94, y: 62, size: "22vw", maxSize: 260, rot: -11 },
  { x: 88, y: 52, size: "20vw", maxSize: 240, rot: 9 },
  { x: 96, y: 68, size: "18vw", maxSize: 220, rot: -5 },
];

const splatMask = {
  maskImage: "url(/splat2-mask.svg)",
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: "url(/splat2-mask.svg)",
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
};

/** Generates a 3D-protruding effect using layered drop-shadows matching the splat color */
function get3DStyle(color: string, depth: number = 6) {
  const shadows = [];
  for (let i = 1; i <= depth; i++) {
    shadows.push(`drop-shadow(${i}px ${i}px ${i * 0.5}px rgba(0,0,0,0.25))`);
  }
  // Add a highlight glow on top
  shadows.unshift(`drop-shadow(-1px -1px 2px rgba(255,255,255,0.15))`);
  return {
    filter: shadows.join(" "),
  };
}

/** Big paint splats stochastically overlaid from center of top-left and bottom-right */
export default function PaintSplats() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {/* Top-left cluster — 7 splats from center ~14vw, 14vh */}
      {TOP_LEFT_OFFSETS.map((splat, i) => (
        <div
          key={`tl-${i}`}
          className="absolute"
          style={{
            left: `${splat.x}vw`,
            top: `${splat.y}vh`,
            width: splat.size,
            height: splat.size,
            maxWidth: splat.maxSize,
            maxHeight: splat.maxSize,
            transform: `translate(-50%, -50%) rotate(${splat.rot}deg)`,
            ...get3DStyle(COLORS[i % COLORS.length], 4 + (i % 3) * 2),
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: COLORS[i % COLORS.length],
              opacity: 0.55 + (i % 3) * 0.03,
              ...splatMask,
            }}
          />
        </div>
      ))}
      {/* Bottom-right cluster */}
      {BOTTOM_RIGHT_OFFSETS.map((splat, i) => (
        <div
          key={`br-${i}`}
          className="absolute"
          style={{
            left: `${splat.x}vw`,
            top: `${splat.y}vh`,
            width: splat.size,
            height: splat.size,
            maxWidth: splat.maxSize,
            maxHeight: splat.maxSize,
            transform: `translate(-50%, -50%) rotate(${splat.rot}deg)`,
            ...get3DStyle(COLORS[(i + 4) % COLORS.length], 4 + (i % 3) * 2),
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: COLORS[(i + 4) % COLORS.length],
              opacity: 0.55 + (i % 3) * 0.03,
              ...splatMask,
            }}
          />
        </div>
      ))}
    </div>
  );
}
