import { SkillCategory } from "@/data/portfolio-data";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const SkillsSection = ({ categories }: SkillsSectionProps) => {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-sm font-mono text-secondary uppercase tracking-wider mb-3">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm font-mono px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border hover:neon-border hover:text-primary transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
