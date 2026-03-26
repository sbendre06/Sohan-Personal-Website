import { useState } from "react";
import OverlayLayout from "@/components/OverlayLayout";
import ExperienceCard from "@/components/ExperienceCard";
import DetailModal from "@/components/DetailModal";
import { placeholderExperiences, ExperienceItem } from "@/data/portfolio-data";

/** Set `true` when experience detail write-ups are ready (card → modal). */
const EXPERIENCE_LONG_FORM_ENABLED = false;

const ExperiencePage = () => {
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <OverlayLayout title="Experience" subtitle="Where theory meets practice.">
      <div className="space-y-4">
        {placeholderExperiences.map((exp) => (
          <ExperienceCard
            key={exp.id}
            item={exp}
            detailOpenable={EXPERIENCE_LONG_FORM_ENABLED}
            onClick={() => setSelected(exp)}
          />
        ))}
      </div>

      {EXPERIENCE_LONG_FORM_ENABLED && (
      <DetailModal
        open={!!selected}
        onOpenChange={() => setSelected(null)}
        title={selected?.title ?? ""}
        subtitle={selected ? `${selected.company} · ${selected.period}` : ""}
        tags={selected?.tags}
      >
        {selected?.details && (
          <div className="space-y-2">
            {selected.details.split("\n\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
        {selected?.link && (
          <a
            href={selected.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-mono text-primary hover:underline"
          >
            View Publication →
          </a>
        )}
      </DetailModal>
      )}
    </OverlayLayout>
  );
};

export default ExperiencePage;
