import { ExperienceItem } from "@/data/portfolio-data";

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
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-secondary">{item.company}</p>
        </div>
        <span className="text-xs font-mono text-muted-foreground shrink-0 ml-4">{item.period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
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
    </button>
  );
};

export default ExperienceCard;
