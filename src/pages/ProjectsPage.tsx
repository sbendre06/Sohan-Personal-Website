import OverlayLayout from "@/components/OverlayLayout";
import { Construction, Wrench, Sparkles } from "lucide-react";

const ProjectsPage = () => {
  return (
    <OverlayLayout title="Projects" subtitle="Building at the boundaries.">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* Fun construction graphic */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse-neon">
            <Construction className="w-14 h-14 text-primary" />
          </div>
          {/* Floating tool icons */}
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center animate-bounce" style={{ animationDelay: "0.2s" }}>
            <Wrench className="w-5 h-5 text-accent" />
          </div>
          <div className="absolute -bottom-1 -left-3 w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center animate-bounce" style={{ animationDelay: "0.5s" }}>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold neon-text mb-3">Under Construction</h3>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Cool things are being built behind the scenes. Check back soon for projects spanning ML research,
          3D art, and everything in between.
        </p>

        {/* Decorative geometric element */}
        <div className="mt-10 flex items-center gap-3 text-muted-foreground/40">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span className="text-xs font-mono tracking-widest">COMING SOON</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </OverlayLayout>
  );
};

export default ProjectsPage;
