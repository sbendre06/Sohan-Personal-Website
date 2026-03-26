import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Binary,
  Box,
  Brackets,
  Brain,
  ChartScatter,
  CodeXml,
  Cuboid,
  Database,
  FileCode,
  Flame,
  Gamepad2,
  GitBranch,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Github,
  Paintbrush,
  Palette,
  Sigma,
  Terminal,
  Triangle,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contactSocialLinks,
  placeholderSkills,
  type ContactSocialId,
  type SkillCategory,
} from "@/data/portfolio-data";

const SOCIAL_ICON_MAP: Record<ContactSocialId, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Languages: Terminal,
  "ML / AI": Brain,
  "3D / Creative": Palette,
  "Web / Full-Stack": Globe,
};

/** Per-skill icons (fallback: CodeXml) */
const SKILL_ICON: Record<string, LucideIcon> = {
  Python: CodeXml,
  JavaScript: Brackets,
  HTML: FileCode,
  CSS: Paintbrush,
  C: Binary,
  R: Sigma,
  SQL: Database,
  Git: GitBranch,
  PyTorch: Flame,
  TensorFlow: Workflow,
  "Scikit-learn": ChartScatter,
  SciPy: Sigma,
  JAX: Zap,
  "Adobe Creative Suite": Palette,
  Blender: Box,
  Unity: Gamepad2,
  WebGL: Cuboid,
  React: Atom,
  "Next.js": Triangle,
  "Three.js": Box,
};

function categoryIcon(cat: SkillCategory): LucideIcon {
  return CATEGORY_ICON[cat.name] ?? Terminal;
}

function skillIcon(skill: string): LucideIcon {
  return SKILL_ICON[skill] ?? CodeXml;
}

interface ContactSkillsContentProps {
  /** Explore light panel: deeper blues / slate chips */
  exploreMode?: boolean;
  className?: string;
}

export function ContactSkillsContent({ exploreMode = false, className }: ContactSkillsContentProps) {
  const socialWrap = cn(
    "flex flex-wrap gap-3",
    exploreMode ? "justify-start" : "justify-start md:justify-center",
  );

  const socialBtn = cn(
    "inline-flex items-center justify-center rounded-xl border transition-all",
    exploreMode
      ? "size-12 border-slate-200 bg-white/80 text-[hsl(var(--explore-blue-deep))] hover:border-[hsl(var(--explore-blue-deep)/0.45)] hover:bg-[hsl(var(--explore-blue)/0.06)] shadow-sm"
      : "size-12 border-border/60 bg-muted/40 text-foreground hover:border-primary/50 hover:text-primary hover:neon-border",
  );

  /* Match page “Contact” title: OverlayLayout h2 vs Explore panel h3 */
  const skillsHeading = cn(
    exploreMode
      ? "text-3xl md:text-4xl font-semibold text-[hsl(var(--explore-blue-deep))]"
      : "text-4xl md:text-5xl font-display font-bold neon-text",
  );

  const categoryLabel = cn(
    "text-sm uppercase tracking-wider mb-3 flex items-center gap-2",
    exploreMode ? "font-sans text-slate-600" : "font-mono text-secondary",
  );

  const chipBase = "inline-flex items-center gap-2 rounded-lg border text-sm transition-all duration-300";

  const chipClass = exploreMode
    ? cn(
        chipBase,
        "px-3 py-1.5 font-sans font-medium bg-[hsl(var(--explore-blue-deep)/0.08)] text-[hsl(var(--explore-blue-deep))] border-[hsl(var(--explore-blue-deep)/0.2)]",
      )
    : cn(
        chipBase,
        "px-3 py-1.5 font-mono bg-muted text-foreground border border-border hover:neon-border hover:text-primary cursor-default",
      );

  return (
    <div className={cn("space-y-0", className)}>
      <div className={socialWrap}>
        {contactSocialLinks.map(({ id, href, label }) => {
          const Icon = SOCIAL_ICON_MAP[id];
          return (
            <a
              key={id}
              href={href}
              target={id === "email" ? undefined : "_blank"}
              rel={id === "email" ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={socialBtn}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
            </a>
          );
        })}
      </div>

      {/* Clear but modest gap between social row and Skills */}
      <div className="h-10 w-full md:h-14" aria-hidden />

      <div className="space-y-8">
        <h3 className={skillsHeading}>Skills</h3>

        {placeholderSkills.map((cat) => {
          const CatIcon = categoryIcon(cat);
          return (
            <div key={cat.name}>
              <h4 className={categoryLabel}>
                <CatIcon className="size-4 shrink-0 opacity-80" aria-hidden />
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const Icon = skillIcon(skill);
                  return (
                    <span key={skill} className={chipClass}>
                      <Icon className="size-3.5 shrink-0 opacity-90" aria-hidden />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
