import { useState } from "react";
import OverlayLayout from "@/components/OverlayLayout";
import ProjectCard from "@/components/ProjectCard";
import DetailModal from "@/components/DetailModal";
import { placeholderProjects, ProjectItem } from "@/data/portfolio-data";

const ProjectsPage = () => {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <OverlayLayout title="Projects" subtitle="Building at the boundaries.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {placeholderProjects.map((proj) => (
          <ProjectCard key={proj.id} item={proj} onClick={() => setSelected(proj)} />
        ))}
      </div>

      <DetailModal
        open={!!selected}
        onOpenChange={() => setSelected(null)}
        title={selected?.title ?? ""}
        tags={selected?.tags}
      >
        <p>{selected?.details}</p>
      </DetailModal>
    </OverlayLayout>
  );
};

export default ProjectsPage;
