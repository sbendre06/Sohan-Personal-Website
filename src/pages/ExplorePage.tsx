import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OverlayLayout from "@/components/OverlayLayout";

const LINKS = [
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
];

const ExplorePage = () => {
  const navigate = useNavigate();

  return (
    <OverlayLayout title="Explore" subtitle="Choose a path.">
      <div className="flex flex-wrap justify-center gap-3">
        {LINKS.map((item) => (
          <Button
            key={item.path}
            variant="outline"
            size="lg"
            className="font-mono text-sm border-border/50 hover:neon-border hover:text-primary transition-all"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </OverlayLayout>
  );
};

export default ExplorePage;
