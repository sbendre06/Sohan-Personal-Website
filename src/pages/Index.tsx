import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import JuliaSetScene from "@/components/JuliaSetScene";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen neon-black-bg">
      {/* Julia set fractal background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <JuliaSetScene />
        </Suspense>
      </div>

      {/* Ambient gradient mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="relative z-10 text-center">
          <p className="text-sm font-mono text-secondary tracking-[0.3em] uppercase mb-4 animate-slide-up">
            Applied Mathematics · Computing & The Arts
          </p>
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-slide-up">
            <span className="neon-text">Sohan</span> <span className="text-cream">Bendre</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-slide-up font-light">
            Exploring the intersection of geometric mathematics, machine learning, and spatial computing through code
            and art.
          </p>

          {/* Navigation links — will be replaced by Möbius strip interactions */}
          <div className="flex flex-wrap justify-center gap-3 animate-slide-up">
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

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted-foreground">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
          <span className="text-xs font-mono tracking-widest uppercase animate-pulse-neon">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground font-mono">Sohan Bendre · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
