"use client";

// Purple / pink range: cool violets → plum → rose → warm magenta (readable on mars)
const COLORS = [
  "rgb(72, 52, 118)",   // blue-violet
  "rgb(94, 48, 102)",   // cool purple
  "rgb(118, 55, 108)",  // orchid mauve
  "rgb(132, 58, 95)",   // rose plum
  "rgb(86, 42, 78)",    // deep aubergine
  "rgb(150, 70, 110)",  // dusty rose pink
  "rgb(110, 48, 92)",   // raspberry purple
  "rgb(68, 44, 72)",    // dusky neutral purple
  "rgb(128, 72, 128)",  // balanced purple-magenta
  "rgb(140, 85, 118)",  // warm heather
  "rgb(98, 58, 105)",   // violet plum
  "rgb(152, 92, 122)", // lighter smoky pink
];

const TRAIL_COUNT = 3;
const TRAIL_SPACING_PX = 24;

/** Deterministic “random” 0–1 from index + salt */
function rnd(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Angles in degrees for each cluster square: consistent across renders */
function rotationDeg(clusterIndex: number, regionSalt: number): number {
  return rnd(clusterIndex, regionSalt) * 360 - 180;
}

/** Unit vector for trail direction (behind the square in screen space) */
function trailDirectionDeg(clusterIndex: number, regionSalt: number): number {
  return rnd(clusterIndex, regionSalt + 1) * 360;
}

type Offset = { x: number; y: number; size: string; maxSize: number; rotateDeg?: number };

// Top-left: anchored at corner, then spaced wider toward center / down-right
const TOP_LEFT_OFFSETS: Offset[] = [
  { x: 3, y: 0.5, size: "10.67vw", maxSize: 127, rotateDeg: 45 },
  { x: 22, y: 2, size: "8.67vw", maxSize: 100 },
  { x: 2, y: 20, size: "9.33vw", maxSize: 107 },
  { x: 42, y: 8, size: "7.33vw", maxSize: 87 },
  { x: 14, y: 13, size: "10vw", maxSize: 117 },
  { x: 36, y: 28, size: "8vw", maxSize: 93 },
  { x: 52, y: 14, size: "6.67vw", maxSize: 80 },
  { x: 8, y: 38, size: "6vw", maxSize: 73 },
];

const BOTTOM_RIGHT_OFFSETS: Offset[] = [
  { x: 92, y: 94, size: "11.33vw", maxSize: 133 },
  { x: 84, y: 98, size: "9.33vw", maxSize: 103 },
  { x: 96, y: 85, size: "10vw", maxSize: 113 },
  { x: 82, y: 82, size: "8vw", maxSize: 90 },
  { x: 88, y: 91, size: "10.67vw", maxSize: 120 },
  { x: 68, y: 82, size: "8.67vw", maxSize: 97 },
  { x: 88, y: 72, size: "7.33vw", maxSize: 83 },
  { x: 80, y: 96, size: "6.67vw", maxSize: 77 },
  { x: 64, y: 95, size: "8vw", maxSize: 93 },
  { x: 58, y: 86, size: "7.33vw", maxSize: 87 },
  { x: 50, y: 82, size: "6.67vw", maxSize: 80 },
  { x: 62, y: 72, size: "6vw", maxSize: 73 },
  { x: 44, y: 90, size: "5.33vw", maxSize: 67 },
  { x: 70, y: 72, size: "8.67vw", maxSize: 100 },
  { x: 94, y: 62, size: "7.33vw", maxSize: 87 },
  { x: 96, y: 68, size: "6vw", maxSize: 73 },
];

function SquareWithTrail({
  leftPct,
  topPct,
  size,
  maxSize,
  colorIndex,
  clusterIndex,
  regionSalt,
  rotationDegOverride,
}: {
  leftPct: number;
  topPct: number;
  size: string;
  maxSize: number;
  colorIndex: number;
  clusterIndex: number;
  regionSalt: number;
  rotationDegOverride?: number;
}) {
  const color = COLORS[colorIndex % COLORS.length];
  const angle = rotationDegOverride ?? rotationDeg(clusterIndex, regionSalt);
  const trailDeg = trailDirectionDeg(clusterIndex, regionSalt);
  const rx = Math.cos((trailDeg * Math.PI) / 180);
  const ry = Math.sin((trailDeg * Math.PI) / 180);

  return (
    <div
      className="absolute"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: size,
        height: size,
        maxWidth: maxSize,
        maxHeight: maxSize,
        transform: "translate(-50%, -50%)",
      }}
    >
      {Array.from({ length: TRAIL_COUNT + 1 }, (_, i) => {
        const t = i / (TRAIL_COUNT + 1);
        const opacity = (0.55 - t * 0.5) * (1 - t * 0.25);
        const offsetX = -i * TRAIL_SPACING_PX * rx;
        const offsetY = -i * TRAIL_SPACING_PX * ry;
        return (
          <div
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2"
            style={{
              width: "100%",
              height: "100%",
              marginLeft: "calc(-50% + " + offsetX + "px)",
              marginTop: "calc(-50% + " + offsetY + "px)",
              backgroundColor: color,
              opacity: Math.max(0, opacity),
              transform: `rotate(${angle}deg)`,
              transformOrigin: "center center",
              zIndex: TRAIL_COUNT + 1 - i,
            }}
          />
        );
      })}
    </div>
  );
}

export default function TrailingSquares() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {TOP_LEFT_OFFSETS.map((o, i) => (
        <SquareWithTrail
          key={`tl-${i}`}
          leftPct={o.x}
          topPct={o.y}
          size={o.size}
          maxSize={o.maxSize}
          colorIndex={i % COLORS.length}
          clusterIndex={i}
          regionSalt={0}
          rotationDegOverride={o.rotateDeg}
        />
      ))}
      {BOTTOM_RIGHT_OFFSETS.map((o, i) => (
        <SquareWithTrail
          key={`br-${i}`}
          leftPct={o.x}
          topPct={o.y}
          size={o.size}
          maxSize={o.maxSize}
          colorIndex={(i + 4) % COLORS.length}
          clusterIndex={i + 100}
          regionSalt={1}
          rotationDegOverride={o.rotateDeg}
        />
      ))}
    </div>
  );
}
