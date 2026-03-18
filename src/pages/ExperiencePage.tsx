import { useState } from "react";
import OverlayLayout from "@/components/OverlayLayout";
import ExperienceCard from "@/components/ExperienceCard";
import DetailModal from "@/components/DetailModal";
import { placeholderExperiences, ExperienceItem } from "@/data/portfolio-data";

const ExperiencePage = () => {
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <OverlayLayout title="Experience" subtitle="Where theory meets practice.">
      <div className="space-y-4">
        {placeholderExperiences.map((exp) => (
          <ExperienceCard key={exp.id} item={exp} onClick={() => setSelected(exp)} />
        ))}
      </div>

      <DetailModal
        open={!!selected}
        onOpenChange={() => setSelected(null)}
        title={selected?.title ?? ""}
        subtitle={selected ? `${selected.company} · ${selected.period}` : ""}
        tags={selected?.tags}
      >
        <p>{selected?.details}</p>
      </DetailModal>
    </OverlayLayout>
  );
};

export default ExperiencePage;
