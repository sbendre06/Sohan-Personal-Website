import OverlayLayout from "@/components/OverlayLayout";
import SkillsSection from "@/components/SkillsSection";
import { Button } from "@/components/ui/button";
import { placeholderSkills } from "@/data/portfolio-data";

const SkillsPage = () => {
  return (
    <OverlayLayout title="Skills & Tools" subtitle="The toolkit.">
      <SkillsSection categories={placeholderSkills} />
      <div className="mt-10 pt-6 border-t border-border">
        <Button variant="neon" size="lg">
          Download Resume
        </Button>
      </div>
    </OverlayLayout>
  );
};

export default SkillsPage;
