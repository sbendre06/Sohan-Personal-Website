import OverlayLayout from "@/components/OverlayLayout";
import ProjectCard from "@/components/ProjectCard";
import { placeholderProjects } from "@/data/portfolio-data";

const ProjectsPage = () => {
  return (
    <OverlayLayout title="Projects" subtitle="Building at the boundaries.">
      <div className="space-y-4">
        {placeholderProjects.map((proj) => (
          <ProjectCard key={proj.id} item={proj} />
        ))}
      </div>
    </OverlayLayout>
  );
};

export default ProjectsPage;
