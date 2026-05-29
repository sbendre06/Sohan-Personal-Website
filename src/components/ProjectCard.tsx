import { ProjectItem } from "@/data/portfolio-data";
import { FileText, Github } from "lucide-react";

interface ProjectCardProps {
  item: ProjectItem;
}

const ProjectCard = ({ item }: ProjectCardProps) => {
  return (
    <div className="w-full text-left glass-panel p-6 transition-all duration-300 rounded-xl">
      <div className="min-w-0">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
            {item.title}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none rounded-sm -m-0.5 p-0.5"
                aria-label={`Whitepaper for ${item.title}`}
              >
                <FileText className="w-3.5 h-3.5" aria-hidden />
                whitepaper
              </a>
            )}
            {item.githubLink && (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none rounded-sm -m-0.5 p-0.5"
                aria-label={`GitHub for ${item.title}`}
              >
                <Github className="w-3.5 h-3.5" aria-hidden />
                github
              </a>
            )}
          </h3>
        </div>
        <ul className="space-y-1.5 mb-4">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-primary shrink-0 mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
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
