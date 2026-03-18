import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface OverlayLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const OverlayLayout = ({ title, subtitle, children }: OverlayLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => navigate("/")}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel neon-border p-8 md:p-10 animate-slide-up">
        {/* Close button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold neon-text mb-3">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground font-light">{subtitle}</p>
          )}
          <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-4" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default OverlayLayout;
