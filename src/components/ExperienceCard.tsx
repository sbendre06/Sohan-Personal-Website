import { ExperienceItem } from "@/data/portfolio-data";
import { ExternalLink } from "lucide-react";

interface ExperienceCardProps {
  item: ExperienceItem;
  onClick: () => void;
}

const ExperienceCard = ({ item, onClick }: ExperienceCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-panel p-6 hover:neon-border transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Logo placeholder */}
        <div className="shrink-0 w-12 h-12 rounded-lg bg-muted border border-border/50 flex items-center justify-center overflow-hidden">
          {item.logo ? (
            <img src={item.logo} alt={`${item.company} logo`} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-lg font-display font-bold text-primary/60">
              {item.company.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {item.title}
                {item.link && (
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                )}
              </h3>
              <p className="text-sm text-secondary">{item.company}</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground shrink-0 ml-4">
              {item.period}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed mt-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ExperienceCard;
