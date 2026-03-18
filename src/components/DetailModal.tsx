import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  tags?: string[];
  children: React.ReactNode;
}

const DetailModal = ({ open, onOpenChange, title, subtitle, tags, children }: DetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display neon-text">{title}</DialogTitle>
          {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}
        </DialogHeader>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 text-muted-foreground leading-relaxed">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
