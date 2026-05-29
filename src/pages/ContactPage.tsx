import OverlayLayout from "@/components/OverlayLayout";
import { ContactSkillsContent } from "@/components/ContactSkillsContent";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <OverlayLayout title="Contact" subtitle="Get in touch.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {/* Left: social links + skills */}
        <div>
          <ContactSkillsContent />
          <div className="mt-10 pt-6 border-t border-border">
            <Button variant="neon" size="lg">
              Download Resume
            </Button>
          </div>
        </div>

        {/* Right: contact form */}
        <div>
          <h3 className="text-lg font-mono text-secondary mb-6 uppercase tracking-wider">
            Send a message
          </h3>
          <ContactForm />
        </div>
      </div>
    </OverlayLayout>
  );
};

export default ContactPage;
