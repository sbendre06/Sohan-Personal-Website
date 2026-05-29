import { ProjectItem } from "@/data/portfolio-data";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  item: ProjectItem;
}

const ProjectCard = ({ item }: ProjectCardProps) => {
  return (
    <div className="w-full cursor-default text-left glass-panel p-6 transition-all duration-300 rounded-xl">
      <div className="min-w-0">
        <div className="flex items-start justify-between mb-1">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {item.title}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary focus-visible:outline-none rounded-sm -m-0.5 p-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  {item.linkLabel ?? "whitepaper"}
                </a>
              )}
              {item.githubLink && (
                <a
                  href={item.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0 -m-0.5 p-0.5"
                  aria-label={`GitHub for ${item.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" aria-hidden />
                </a>
              )}
            </h3>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mb-4 leading-relaxed mt-2 space-y-1">
          {item.bullets.map((bullet, i) => (
            <p key={i}>• {bullet}</p>
          ))}
        </div>
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
  );
};

export default ProjectCard;
