import type { KeyboardEvent } from "react";
import { ExperienceItem } from "@/data/portfolio-data";
import { ExternalLink } from "lucide-react";

interface ExperienceCardProps {
  item: ExperienceItem;
  onClick: () => void;
  /** Explore panel: match serif body copy; default keeps global/tech styling */
  readable?: boolean;
}

const ExperienceCard = ({ item, onClick, readable }: ExperienceCardProps) => {
  const openDetail = () => onClick();

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDetail();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={handleCardKeyDown}
      className={
        readable
          ? "w-full text-left glass-panel p-6 transition-all duration-300 group cursor-pointer hover:border-[hsl(var(--explore-blue-deep)/0.45)] hover:shadow-[0_0_24px_hsl(var(--explore-blue)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--explore-blue-deep)/0.5)] rounded-xl"
          : "w-full text-left glass-panel p-6 hover:neon-border transition-all duration-300 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
      }
    >
      <div className="min-w-0">
        <div className="flex items-start justify-between mb-1">
          <div className="min-w-0">
            <h3
              className={
                readable
                  ? "text-lg font-semibold text-slate-800 group-hover:text-[hsl(var(--explore-blue-deep))] transition-colors flex items-center gap-2"
                  : "text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2"
              }
            >
              {item.title}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    readable
                      ? "inline-flex rounded-sm text-[hsl(var(--explore-blue-muted))] hover:text-[hsl(var(--explore-blue-deep))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--explore-blue-deep)/0.45)] shrink-0 -m-0.5 p-0.5"
                      : "inline-flex rounded-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0 -m-0.5 p-0.5"
                  }
                  aria-label={`Open external link for ${item.title}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              )}
            </h3>
            <p className="text-sm text-secondary">{item.company}</p>
          </div>
          <span
            className={
              readable
                ? "text-xs font-sans tabular-nums text-muted-foreground shrink-0 ml-4"
                : "text-xs font-mono text-muted-foreground shrink-0 ml-4"
            }
          >
            {item.period}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed mt-2">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={
                readable
                  ? "text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--explore-blue-deep)/0.1)] text-[hsl(var(--explore-blue-deep))] border border-[hsl(var(--explore-blue-deep)/0.22)]"
                  : "text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
