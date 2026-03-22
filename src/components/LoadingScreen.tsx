"use client";

/** Black and white loading overlay with "LOADING..." and animated buttons */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <p className="text-4xl md:text-6xl font-neon font-bold tracking-[0.2em] text-white mb-8">
        LOADING...
      </p>
      <div className="flex gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm bg-white animate-loading-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
