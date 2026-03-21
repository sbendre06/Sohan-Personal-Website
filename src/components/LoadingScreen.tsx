"use client";

/** Red loading overlay with "LOADING..." and animated red buttons */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-red-950">
      <p className="text-4xl md:text-6xl font-neon font-bold tracking-[0.2em] text-red-500 mb-8">
        LOADING...
      </p>
      <div className="flex gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm bg-red-500 animate-loading-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
