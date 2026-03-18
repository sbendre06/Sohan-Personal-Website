import { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionShell from "@/components/SectionShell";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import SkillsSection from "@/components/SkillsSection";
import DetailModal from "@/components/DetailModal";
import {
  placeholderExperiences,
  placeholderProjects,
  placeholderSkills,
  ExperienceItem,
  ProjectItem,
} from "@/data/portfolio-data";

const Index = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [selectedProj, setSelectedProj] = useState<ProjectItem | null>(null);

  return (
    <div className="relative bg-background geometric-grid">
      {/* Ambient gradient mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Hero Section — placeholder for 3D Möbius strip */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* 3D scene will go here — this is a visual placeholder */}
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
          <Button variant="neon" size="lg" className="animate-slide-up">
            ENTER
          </Button>
        </div>

        {/* Decorative geometric elements */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted-foreground">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
          <span className="text-xs font-mono tracking-widest uppercase animate-pulse-neon">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
        </div>
      </section>

      {/* About Section */}
      <SectionShell id="about" title="About" subtitle="The path begins here.">
        <div className="glass-panel p-8 md:p-10">
          <p className="text-foreground leading-relaxed text-lg mb-6">
            I'm a student double majoring in Applied Mathematics and Computing & The Arts, fascinated by the places
            where rigorous mathematical thinking meets creative expression. My work spans machine learning research, 3D
            art, and spatial computing — always searching for the geometric structures that connect them.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Replace this with your personal statement. Talk about your journey, what drives you, and where you're
            headed. This is your space to be authentic and compelling.
          </p>
        </div>
      </SectionShell>

      {/* Experience Section */}
      <SectionShell id="experience" title="Experience" subtitle="Where theory meets practice.">
        <div className="space-y-4">
          {placeholderExperiences.map((exp) => (
            <ExperienceCard key={exp.id} item={exp} onClick={() => setSelectedExp(exp)} />
          ))}
        </div>
      </SectionShell>

      {/* Projects Section */}
      <SectionShell id="projects" title="Projects" subtitle="Building at the boundaries.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placeholderProjects.map((proj) => (
            <ProjectCard key={proj.id} item={proj} onClick={() => setSelectedProj(proj)} />
          ))}
        </div>
      </SectionShell>

      {/* Skills / Resume Section */}
      <SectionShell id="skills" title="Skills & Tools" subtitle="The toolkit.">
        <div className="glass-panel p-8 md:p-10">
          <SkillsSection categories={placeholderSkills} />
          <div className="mt-10 pt-6 border-t border-border">
            <Button variant="neon" size="lg">
              Download Resume
            </Button>
          </div>
        </div>
      </SectionShell>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-border/30">
        <p className="text-sm text-muted-foreground font-mono">Sohan Bendre · {new Date().getFullYear()}</p>
      </footer>

      {/* Detail Modals */}
      <DetailModal
        open={!!selectedExp}
        onOpenChange={() => setSelectedExp(null)}
        title={selectedExp?.title ?? ""}
        subtitle={selectedExp ? `${selectedExp.company} · ${selectedExp.period}` : ""}
        tags={selectedExp?.tags}
      >
        <p>{selectedExp?.details}</p>
      </DetailModal>

      <DetailModal
        open={!!selectedProj}
        onOpenChange={() => setSelectedProj(null)}
        title={selectedProj?.title ?? ""}
        tags={selectedProj?.tags}
      >
        <p>{selectedProj?.details}</p>
      </DetailModal>
    </div>
  );
};

export default Index;
