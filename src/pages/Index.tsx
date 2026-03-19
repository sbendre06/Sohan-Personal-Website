import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import JuliaSetScene from "@/components/JuliaSetScene";
import PaintSplats from "@/components/PaintSplats";
import CursorLight from "@/components/CursorLight";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen neon-black-bg">
      {/* Julia set fractal background */}
      <div className="absolute inset-0 z-0 bg-transparent">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <JuliaSetScene />
        </Suspense>
      </div>

      {/* Ambient gradient mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Small light attached to cursor */}
      <CursorLight />

      {/* Paint splats in corners without fractals */}
      <PaintSplats />

      {/* Hero Section — pointer-events-none so fractal receives hover; only buttons capture clicks */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pointer-events-none">
        <div className="relative z-10 text-center pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-slide-up">
            <span className="neon-text">Sohan</span> <span className="text-cream">Bendre</span>
          </h1>

          {/* Navigation links — will be replaced by Möbius strip interactions */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up pointer-events-auto">
            {[
              { label: "About", path: "/about" },
              { label: "Experience", path: "/experience" },
              { label: "Projects", path: "/projects" },
              { label: "Skills", path: "/skills" },
            ].map((item) => (
              <Button
                key={item.path}
                variant="outline"
                size="lg"
                className="font-mono text-sm border-border/50 hover:neon-border hover:text-primary transition-all"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};

export default Index;
