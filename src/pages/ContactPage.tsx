import OverlayLayout from "@/components/OverlayLayout";
import { ContactSkillsContent } from "@/components/ContactSkillsContent";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <OverlayLayout title="Contact" subtitle="Get in touch.">
      <ContactSkillsContent />
      <div className="mt-10 pt-6 border-t border-border">
        <Button variant="neon" size="lg">
          Download Resume
        </Button>
      </div>
    </OverlayLayout>
  );
};

export default ContactPage;
