import { ProjectItem } from "@/data/portfolio-data";

interface ProjectCardProps {
  item: ProjectItem;
  onClick: () => void;
}

const ProjectCard = ({ item, onClick }: ProjectCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-panel p-6 hover:neon-border transition-all duration-300 group cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

export default ProjectCard;
