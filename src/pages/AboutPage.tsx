import OverlayLayout from "@/components/OverlayLayout";

const AboutPage = () => {
  return (
    <OverlayLayout title="About" subtitle="The path begins here.">
      <p className="text-foreground leading-relaxed text-lg mb-6">
        I am a creative mathematician, bridging problems across engineering, art, and technology through quantitative practices and design.
        My work primarily revolves around machine learning, probabilistic modeling, and 3D visualization, with applications spanning finance, art and design, biotechnology, and more.
        My approach focuses on building robust systems around underlying mathematical patterns, to find beauty and creativity in problem solving across disciplines.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Replace this with your personal statement. Talk about your journey, what drives you, and where you're
        headed. This is your space to be authentic and compelling.
      </p>
    </OverlayLayout>
  );
};

export default AboutPage;
