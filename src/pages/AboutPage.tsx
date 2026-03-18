import OverlayLayout from "@/components/OverlayLayout";

const AboutPage = () => {
  return (
    <OverlayLayout title="About" subtitle="The path begins here.">
      <p className="text-foreground leading-relaxed text-lg mb-6">
        I'm a student double majoring in Applied Mathematics and Computing & The Arts, fascinated by the places
        where rigorous mathematical thinking meets creative expression. My work spans machine learning research, 3D
        art, and spatial computing — always searching for the geometric structures that connect them.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Replace this with your personal statement. Talk about your journey, what drives you, and where you're
        headed. This is your space to be authentic and compelling.
      </p>
    </OverlayLayout>
  );
};

export default AboutPage;
