import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import { ContactSkillsContent } from "@/components/ContactSkillsContent";
import { placeholderExperiences, placeholderProjects, ExperienceItem } from "@/data/portfolio-data";

type Section = "about" | "experience" | "projects" | "contact";

// Pearl aqua, tea green, tangerine dream, bubblegum pink palette
const SHAPE_COLORS = [
  "rgba(109, 211, 206, 0.4)",   // pearl aqua
  "rgba(200, 233, 160, 0.35)",  // tea green
  "rgba(247, 162, 120, 0.35)",  // tangerine dream
  "rgba(239, 98, 108, 0.35)",   // bubblegum pink
  "rgba(90, 185, 180, 0.4)",    // deeper pearl aqua
  "rgba(175, 218, 135, 0.35)",  // deeper tea green
  "rgba(245, 140, 95, 0.35)",   // softer tangerine
  "rgba(220, 85, 95, 0.35)",    // deeper bubblegum
  "rgba(70, 165, 160, 0.4)",    // dark pearl aqua
  "rgba(155, 200, 120, 0.3)",   // tea green dark
  "rgba(235, 115, 75, 0.35)",   // tangerine dark
  "rgba(255, 130, 140, 0.3)",   // bubblegum light
];

// Background shapes: circles + ellipses; some have buttons inside
type Shape = {
  x: number;
  y: number;
  w: string;
  h: string;
  color: string;
  blur?: number;
  rot?: number;
  section?: Section;
  label?: string;
};
const BG_SHAPES: Shape[] = [
  // Large overlapping shapes
  { x: 5, y: 5, w: "45vmin", h: "45vmin", color: SHAPE_COLORS[0], blur: 0 },
  { x: 35, y: 8, w: "55vmin", h: "40vmin", color: SHAPE_COLORS[2], blur: 2, rot: -12 },
  { x: 70, y: 12, w: "50vmin", h: "48vmin", color: SHAPE_COLORS[1], blur: 0, rot: 8, section: "about", label: "About" },
  { x: 95, y: 18, w: "40vmin", h: "38vmin", color: SHAPE_COLORS[3], blur: 3 },
  { x: 15, y: 35, w: "42vmin", h: "52vmin", color: SHAPE_COLORS[4], blur: 0, rot: 15, section: "contact", label: "Contact" },
  { x: 50, y: 42, w: "60vmin", h: "55vmin", color: SHAPE_COLORS[5], blur: 0, rot: -5 },
  { x: 82, y: 38, w: "48vmin", h: "45vmin", color: SHAPE_COLORS[8], blur: 2, rot: 10 },
  { x: 8, y: 65, w: "55vmin", h: "42vmin", color: SHAPE_COLORS[6], blur: 1, rot: -8 },
  { x: 42, y: 72, w: "52vmin", h: "58vmin", color: SHAPE_COLORS[7], blur: 0, rot: 12, section: "experience", label: "Experience" },
  { x: 78, y: 68, w: "45vmin", h: "50vmin", color: SHAPE_COLORS[0], blur: 0, rot: -15, section: "projects", label: "Projects" },
  { x: 92, y: 85, w: "38vmin", h: "40vmin", color: SHAPE_COLORS[9], blur: 3 },
  // Medium shapes - fill gaps
  { x: 22, y: 18, w: "28vmin", h: "35vmin", color: SHAPE_COLORS[1], blur: 2, rot: 5 },
  { x: 58, y: 22, w: "32vmin", h: "28vmin", color: SHAPE_COLORS[3], blur: 1, rot: -10 },
  { x: 18, y: 55, w: "30vmin", h: "32vmin", color: SHAPE_COLORS[2], blur: 0, rot: 8 },
  { x: 65, y: 58, w: "35vmin", h: "30vmin", color: SHAPE_COLORS[6], blur: 2, rot: -7 },
  { x: 88, y: 48, w: "25vmin", h: "32vmin", color: SHAPE_COLORS[4], blur: 1, rot: 15 },
  // Smaller accent shapes
  { x: 30, y: 45, w: "20vmin", h: "24vmin", color: SHAPE_COLORS[10], blur: 2, rot: -20 },
  { x: 72, y: 78, w: "22vmin", h: "18vmin", color: SHAPE_COLORS[11], blur: 1, rot: 25 },
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null);

  useEffect(() => {
    if (selectedSection) setPopupPosition(null);
  }, [selectedSection]);

  useEffect(() => {
    if (selectedSection !== "experience") setSelectedExp(null);
  }, [selectedSection]);

  useEffect(() => {
    if (selectedExp) popupRef.current?.scrollTo({ top: 0 });
  }, [selectedExp]);

  const clampToViewport = (x: number, y: number) => {
    const rect = popupRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    const minX = rect.width / 2;
    const maxX = window.innerWidth - rect.width / 2;
    const minY = rect.height / 2;
    const maxY = window.innerHeight - rect.height / 2;
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const raw = { x: dragRef.current.startLeft + dx, y: dragRef.current.startTop + dy };
      setPopupPosition(clampToViewport(raw.x, raw.y));
    };
    const handleUp = () => {
      dragRef.current = null;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current || !e.touches[0]) return;
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      const raw = { x: dragRef.current.startLeft + dx, y: dragRef.current.startTop + dy };
      setPopupPosition(clampToViewport(raw.x, raw.y));
    };
    const handleTouchEnd = () => {
      dragRef.current = null;
      setIsDragging(false);
    };
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isDragging]);

  const startDrag = (clientX: number, clientY: number) => {
    const rect = popupRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      startLeft: popupPosition ? popupPosition.x : centerX,
      startTop: popupPosition ? popupPosition.y : centerY,
    };
    setIsDragging(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0a0e17]">
      {/* Backdrop - tap to close */}
      <div
        className="absolute inset-0"
        onClick={() => navigate("/")}
        aria-hidden
      />

      {/* Overlapping circles + ellipses - bokeh-style, full coverage */}
      <div className="absolute inset-0 overflow-hidden">
        {BG_SHAPES.map((s, i) => {
          const isButton = s.section && s.label;
          const glowR = 110 + (s.blur ?? 0) * 25;
          const glowOuter = 200 + (s.blur ?? 0) * 30;
          const baseShadow = `0 12px 24px -8px rgba(0,0,0,0.5), 0 6px 12px -4px rgba(0,0,0,0.35), 0 0 ${glowR}px ${s.color}, 0 0 ${glowOuter}px ${s.color}`;
          const hoverShadow = `0 24px 48px -12px rgba(0,0,0,0.5), 0 12px 24px -8px rgba(0,0,0,0.4), 0 0 150px ${s.color}, 0 0 250px ${s.color}`;
          const sharedStyle = {
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.w,
            height: s.h,
            transform: `translate(-50%, -50%) rotate(${s.rot ?? 0}deg)`,
            backgroundColor: s.color,
            boxShadow: isButton ? baseShadow : `0 0 ${glowR}px ${s.color}, 0 0 ${glowOuter}px ${s.color}`,
            filter: s.blur ? `blur(${s.blur}px)` : undefined,
          };
          return isButton ? (
            <button
              key={`bg-${i}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSection(s.section!);
              }}
              className="absolute rounded-full flex items-center justify-center font-neon font-semibold text-foreground hover:ring-2 hover:ring-white/40 transition-all pointer-events-auto z-10 text-xl md:text-2xl lg:text-3xl tracking-wider uppercase"
              style={{
                ...sharedStyle,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) translateY(-8px) rotate(${s.rot ?? 0}deg) scale(1.02)`;
                e.currentTarget.style.boxShadow = hoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) rotate(${s.rot ?? 0}deg)`;
                e.currentTarget.style.boxShadow = baseShadow;
              }}
            >
              <span className="drop-shadow-lg" style={{ transform: `rotate(${-(s.rot ?? 0)}deg)` }}>
                {s.label}
              </span>
            </button>
          ) : (
            <div
              key={`bg-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={sharedStyle}
            />
          );
        })}
        {/* Tiny speckles for depth (dust) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle 2px at 15% 25%, rgba(255,255,255,0.9), transparent),
              radial-gradient(circle 2px at 85% 15%, rgba(200,230,255,0.9), transparent),
              radial-gradient(circle 1.5px at 45% 55%, rgba(255,255,255,0.7), transparent),
              radial-gradient(circle 2px at 72% 82%, rgba(220,235,255,0.8), transparent),
              radial-gradient(circle 1.5px at 30% 70%, rgba(255,255,255,0.6), transparent),
              radial-gradient(circle 2px at 60% 35%, rgba(200,220,255,0.8), transparent)`,
          }}
        />
        {/* Star points - soft pearl aqua tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle 1.5px at 8% 12%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 22% 8%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 45% 15%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 68% 22%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1.5px at 88% 10%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 12% 45%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 35% 55%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1px at 58% 48%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 78% 42%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 95% 55%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1.5px at 5% 78%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 28% 72%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1.5px at 55% 85%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 82% 78%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 18% 5%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 52% 5%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1px at 92% 28%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 3% 32%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 38% 38%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1.5px at 72% 62%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 15% 62%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 62% 18%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1px at 48% 72%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 25% 28%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 85% 65%, rgba(165, 218, 213, 0.8), transparent),
              radial-gradient(circle 1.5px at 10% 92%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 42% 92%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 75% 88%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 95% 38%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 2% 55%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 58% 75%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 32% 42%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 88% 52%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 18% 88%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 65% 8%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 8% 35%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 45% 62%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1.5px at 78% 25%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 35% 18%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 92% 72%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 5% 48%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 52% 38%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1px at 72% 92%, rgba(180, 230, 225, 0.9), transparent),
              radial-gradient(circle 1.5px at 28% 52%, rgba(180, 230, 225, 0.85), transparent),
              radial-gradient(circle 1px at 88% 18%, rgba(180, 230, 225, 0.9), transparent)`,
          }}
        />
      </div>

      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate("/"); }}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all z-40 pointer-events-auto"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Back button - bottom left */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate("/"); }}
        className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all z-40 pointer-events-auto text-sm font-medium"
      >
        ← Back
      </button>

      <footer
        className="absolute bottom-4 right-4 z-40 text-right text-[0.65rem] sm:text-xs leading-snug text-white/65 pointer-events-none select-text"
        aria-label="Site credits"
      >
        <div className="m-0 flex flex-col items-end gap-1">
          <span className="flex items-start gap-1.5 text-left max-sm:max-w-[min(100%,18rem)]">
            <span className="mt-px shrink-0 font-mono text-white/55 leading-none" aria-hidden>
              &gt;
            </span>
            <span>designed and built by Sohan Bendre, made with React, TypeScript and Three.js</span>
          </span>
          <span className="flex items-start gap-1.5 text-left max-sm:max-w-[min(100%,18rem)]">
            <span className="mt-px shrink-0 font-mono text-white/55 leading-none" aria-hidden>
              &gt;
            </span>
            <span>mainpage features a Julia Set with escape-time coloring and animated palette</span>
          </span>
        </div>
      </footer>

      {/* Content panel — nearly full viewport with small inset (draggable) */}
      {selectedSection && (
        <div
          className="pointer-events-none z-30"
          style={
            popupPosition
              ? {
                  position: "fixed",
                  left: popupPosition.x,
                  top: popupPosition.y,
                  transform: "translate(-50%, -50%)",
                  width: "calc(100vw - 6rem)",
                  height: "calc(100vh - 6rem)",
                  maxWidth: "calc(100vw - 6rem)",
                  maxHeight: "calc(100vh - 6rem)",
                }
              : {
                  position: "fixed",
                  inset: "3rem",
                  transform: "none",
                }
          }
        >
          <div
            ref={popupRef}
            className="explore-panel-copy pointer-events-auto h-full w-full min-h-0 overflow-y-auto animate-slide-up rounded-2xl p-6 md:p-8 bg-white/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.5)_inset] [&_.glass-panel]:bg-slate-100/70 [&_.glass-panel]:border-slate-200/50 [&_.glass-panel]:hover:border-[hsl(var(--explore-blue-deep)/0.55)] [&_.glass-panel:hover]:shadow-[0_0_20px_hsl(var(--explore-blue)/0.18)] [&_.text-foreground]:text-slate-800 [&_.text-muted-foreground]:text-slate-600 [&_.text-secondary]:text-slate-700 border-2 border-amber-400/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle - header bar */}
            <div
              className="flex items-center gap-4 mb-4 cursor-grab active:cursor-grabbing touch-none select-none"
              onMouseDown={(e) => e.button === 0 && startDrag(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  e.preventDefault();
                  startDrag(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedExp) setSelectedExp(null);
                  else setSelectedSection(null);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="text-sm text-slate-500 hover:text-[hsl(var(--explore-blue-deep))] shrink-0"
              >
                ← Back
              </button>
              <span className="text-xs text-slate-400">Drag to move</span>
            </div>

          {selectedSection === "about" && (
            <div className="space-y-4 select-text">
              <h3 className="text-3xl md:text-4xl font-semibold text-[hsl(var(--explore-blue-deep))]">About</h3>
              <p className="text-slate-700 leading-relaxed">
                I'm a student double majoring in Applied Mathematics and Computing & The Arts,
                fascinated by the places where rigorous mathematical thinking meets creative
                expression. My work spans machine learning research, 3D art, and spatial computing
                — always searching for the geometric structures that connect them.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Replace this with your personal statement. Talk about your journey, what drives you,
                and where you're headed.
              </p>
            </div>
          )}

          {selectedSection === "experience" && (
            <div className="space-y-4 select-text">
              {!selectedExp ? (
                <>
                  <h3 className="text-3xl md:text-4xl font-semibold text-[hsl(var(--explore-blue-deep))]">
                    Experience
                  </h3>
                  <div className="space-y-3">
                    {placeholderExperiences.map((exp) => (
                      <ExperienceCard key={exp.id} item={exp} readable onClick={() => setSelectedExp(exp)} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-5 pb-4">
                  <p className="text-xs font-sans uppercase tracking-wider text-slate-500">Experience</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[hsl(var(--explore-blue-deep))] leading-snug">
                    {selectedExp.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedExp.company} · {selectedExp.period}
                  </p>
                  {selectedExp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--explore-blue-deep)/0.1)] text-[hsl(var(--explore-blue-deep))] border border-[hsl(var(--explore-blue-deep)/0.22)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {selectedExp.details && (
                    <div className="space-y-3 text-slate-700 leading-[1.65] text-base">
                      {selectedExp.details.split("\n\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                  {selectedExp.link && (
                    <a
                      href={selectedExp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-semibold text-[hsl(var(--explore-blue-deep))] hover:underline"
                    >
                      View publication →
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedSection === "projects" && (
            <div className="flex min-h-0 flex-col gap-4 select-text">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <h3 className="text-3xl md:text-4xl font-semibold text-[hsl(var(--explore-blue-deep))]">
                  Projects
                </h3>
                <img
                  src="/under-construction-banner.png"
                  alt="Under construction"
                  className="h-10 w-auto max-w-[min(100%,20rem)] origin-center rotate-[-25deg] -translate-x-12 translate-y-10 object-contain object-center sm:h-16 md:h-[3.25rem]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {placeholderProjects.length === 0 ? (
                <div className="box-border w-[calc(100%+1rem)] max-w-none -mx-2 px-0.5 pb-1 pt-0 sm:w-[calc(100%+1.5rem)] sm:-mx-3 md:w-[calc(100%+2.5rem)] md:-mx-5">
                  <img
                    src="/about-artwork.png"
                    alt="Mixed-media charcoal and paper collage: profile and geometric color emerging from labeled emotion boxes."
                    className="mx-auto block h-auto max-h-[min(84vh,calc(100vh-10rem))] w-full rounded-md object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {placeholderProjects.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60">
                      <h4 className="font-semibold text-slate-800">{p.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedSection === "contact" && (
            <div className="space-y-4 select-text">
              <h3 className="text-3xl md:text-4xl font-semibold text-[hsl(var(--explore-blue-deep))]">Contact</h3>
              <ContactSkillsContent exploreMode />
            </div>
          )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ExplorePage;
