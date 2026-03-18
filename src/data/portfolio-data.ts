export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  details?: string;
  logo?: string; // placeholder for future logo integration
  link?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  details?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const placeholderExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "ML + 3D Parametric Modeling Research Assistant",
    company: "Hong Kong University of Science and Technology (HKUST)",
    period: "Summer 2026",
    description:
      "Incoming research assistant under the advising of Professor Rob Scharff, working at the intersection of machine learning and 3D parametric modeling.",
    tags: ["Rhino", "Grasshopper"],
    logo: undefined, // replace with logo path
  },
  {
    id: "exp-2",
    title: "Biomedical Machine Learning Intern",
    company: "PsiThera (Psivant Therapeutics)",
    period: "March 2026",
    description:
      "Working on a binding affinity machine learning project for a computational drug discovery firm.",
    tags: ["PyTorch", "JAX", "scikit-learn", "MDAnalysis", "ProLIF", "h5py"],
    logo: undefined,
  },
  {
    id: "exp-3",
    title: "Quantitative Research Assistant",
    company: "Map of Life / Jetz Lab",
    period: "Fall 2025 —",
    description:
      "Conducting research with Dr. Kevin Winner on pool-based active learning strategies for optimization of biodiversity sampling under limited survey budgets. Integrated functions of entropy / expected information gain into active learning loop to prioritize high-value ecological sites through AUC plots, running on Yale's high performance computing cluster.",
    tags: ["R", "terra / sf", "Conda", "HPC"],
    logo: undefined,
  },
  {
    id: "exp-4",
    title: "Machine Learning Research Intern",
    company: "RCM Alternatives",
    period: "Summer 2025",
    description:
      "Designed supervised ML models for price direction prediction on messy time series data. Implemented logistic regression, random forests, SVMs, and LSTM neural networks. Feature engineering on market, on-chain, and macroeconomic data. Authored a 28-page technical white paper on ML mathematics and methods (under internal review).",
    tags: ["TensorFlow", "scikit-learn", "numpy", "pandas"],
    logo: undefined,
  },
  {
    id: "exp-5",
    title: "Published Academic Research",
    company: "Applied Stochastic Models in Business and Industry — Wiley",
    period: "2023",
    description:
      '"On the probability of Magnus Carlsen reaching 2900" published in a Wiley peer-reviewed journal. Evaluated chess Elo rating system by learning probabilistic modeling (Brownian motion model). Top 10% most viewed papers in Wiley for 2023.',
    tags: ["R", "Excel"],
    link: "https://doi.org/10.1002/asmb.2745",
    logo: undefined,
  },
];

export const placeholderProjects: ProjectItem[] = [];

export const placeholderSkills: SkillCategory[] = [
  { name: "Languages", skills: ["Python", "TypeScript", "C++", "GLSL", "C#", "SQL"] },
  { name: "ML / AI", skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "JAX"] },
  { name: "3D / Creative", skills: ["Three.js", "Blender", "Unity", "Houdini", "WebGL"] },
  { name: "Web / Full-Stack", skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"] },
  { name: "Math", skills: ["Linear Algebra", "Differential Geometry", "Topology", "Optimization", "Probability"] },
];
