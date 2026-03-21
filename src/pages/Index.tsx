import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Suspense, useState, useEffect, useCallback } from "react";
import JuliaSetScene from "@/components/JuliaSetScene";
import PaintSplats from "@/components/PaintSplats";
import CursorLight from "@/components/CursorLight";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const hideLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const handler = () => {
      if (!document.hidden) {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen neon-black-bg">
      {loading && <LoadingScreen />}
      {/* Julia set fractal background */}
      <div className="absolute inset-0 z-0 bg-transparent">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <JuliaSetScene onReady={hideLoading} />
        </Suspense>
      </div>

      {/* Ambient gradient mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Small light attached to cursor */}
      <CursorLight />

      {/* Paint splats in corners without fractals */}
      <PaintSplats />

      {/* Hero Section — pointer-events-none so fractal receives hover; only buttons capture clicks */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pointer-events-none pt-16">
        {/* -translate-y-* shifts name + reflection + button up together; increase value to move higher */}
        <div className="relative z-10 text-center pointer-events-none -translate-y-16">
          <div className="mb-2 animate-slide-up flex flex-col items-center leading-none">
            <h1 className="text-5xl md:text-8xl font-neon font-bold uppercase tracking-[0.15em] italic">
              <span className="neon-text">Sohan</span>{" "}
              <span className="text-cream">Bendre</span>
            </h1>
            {/* Reflection */}
            <h1
              aria-hidden="true"
              className="text-5xl md:text-8xl font-neon font-bold uppercase tracking-[0.15em] italic select-none pointer-events-none"
              style={{
                transform: 'scaleY(-1)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 60%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 60%)',
                marginTop: '0px',
                lineHeight: '0.9',
                opacity: 0.3,
                filter: 'blur(1px)',
              }}
            >
              <span className="neon-text">Sohan</span>{" "}
              <span className="text-cream">Bendre</span>
            </h1>
          </div>

          {/* Explore button — aligned with reflection */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up pointer-events-auto -mt-20">
            <Button
              variant="outline"
              size="lg"
              className="h-24 min-w-[200px] px-12 py-2 text-8xl font-neon leading-none neon-text hover:text-primary bg-transparent border-2 border-black hover:bg-transparent hover:border-primary/60 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all"
              onClick={() => navigate("/explore")}
            >
              <span className="inline-block -translate-y-2.5">&gt;&gt;&gt;&gt;</span>
            </Button>
          </div>
        </div>

      </section>

    </div>
  );
};

export default Index;
