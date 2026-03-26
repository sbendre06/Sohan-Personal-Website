import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  tags?: string[];
  /** Serif, high-legibility styling for Explore (dialogs portal outside section panels) */
  readable?: boolean;
  children: React.ReactNode;
}

const DetailModal = ({ open, onOpenChange, title, subtitle, tags, children, readable }: DetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "glass-panel border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto",
          readable && "font-read",
        )}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(
              "text-2xl",
              readable
                ? "font-read font-semibold text-foreground tracking-tight"
                : "font-display neon-text",
            )}
          >
            {title}
          </DialogTitle>
          {subtitle && (
            <p className={cn("text-sm text-secondary mt-1", readable && "font-read")}>{subtitle}</p>
          )}
        </DialogHeader>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20",
                  readable ? "font-sans font-medium" : "font-mono",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className={cn(
            "mt-4 text-muted-foreground leading-relaxed",
            readable && "font-read text-base [&_p]:leading-[1.65]",
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
