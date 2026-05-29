export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  details?: string;
  link?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  bullets: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
  githubLink?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export type ContactSocialId = "email" | "linkedin" | "instagram" | "github";

export interface ContactSocialLink {
  id: ContactSocialId;
  label: string;
  href: string;
}

export const contactSocialLinks: ContactSocialLink[] = [
  { id: "email", label: "Email", href: "mailto:sohan.bendre@yale.edu" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sohan-bendre/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/sohanbendre/" },
  { id: "github", label: "GitHub", href: "https://github.com/sbendre06" },
];

export const placeholderExperiences: ExperienceItem[] = [
  /*
  {
    id: "exp-1",
    title: "ML + 3D Parametric Modeling Research Assistant",
    company: "Hong Kong University of Science and Technology (HKUST)",
    period: "Summer 2026",
    description:
      "Incoming research assistant working at the intersection of machine learning and 3D parametric modeling.",
    tags: ["Rhino", "Grasshopper"],
    details:
      "Incoming research assistant under the advising of Professor Rob Scharff, working at the intersection of machine learning and 3D parametric modeling.",
  },*/
  {
    id: "exp-2",
    title: "Machine Learning Engineer Intern",
    company: "PsiThera (Psivant Therapeutics)",
    period: "March 2026 - April 2026",
    description:
      "Devised binding affinity regression pipelines for $47.5M Series A AI drug discovery firm, learning molecular dynamics libraries and data structures (MDAnalysis, ProLIF, h5py) from scratch",
    tags: ["PyTorch", "JAX", "scikit-learn", "MDAnalysis", "ProLIF", "Git"],
    details:
      "Working on a binding affinity machine learning project for computational drug discovery firm.\n\nTech stack: PyTorch, JAX, scikit-learn + molecular dynamics libraries (MDAnalysis, ProLIF, h5py).",
  },
  {
    id: "exp-3",
    title: "Quantitative Research Intern",
    company: "RCM Alternatives",
    period: "May 2025 — August 2025",
    description:
      "Created supervised ML models for price direction prediction on messy time series data, with specific focus on DL architectures like recurrent neural networks (RNNs) and long short-term memory (LSTM) complexes, to generate signals for traders on options desks.",
    tags: ["scikit-learn", "TensorFlow", "BeautifulSoup", "SciPy", "Git"],
    details:
      "• Designed supervised machine learning models for price direction prediction on messy time series data\n\n• Implemented logistic regression, random forests, support vector machines, and LSTM neural networks\n\n• Feature engineering on market, on-chain, and macroeconomic data\n\n• Wrote a 28-page technical white paper on ML mathematics and methods (under internal review)",
    link: "https://github.com/sbendre06/Supervised-Learning-BTC-Price-Direction",
  },
  {
    id: "exp-4",
    title: "Machine Learning Research Assistant",
    company: "Map of Life - Yale Center for Biodiversity, Jetz Lab",
    period: "October 2025 —",
    description:
      "Implementing pool-based active learning (AL) strategies for optimization of biodiversity sampling by expected information gain (EIG); running experiments on Yale's high performance computing cluster.",
    tags: ["R", "terra / sf", "Bash", "Conda", "HPC"],
    details:
      "• Conducting research with Dr. Kevin Winner on pool-based active learning strategies for optimization of biodiversity sampling, under limited survey budgets\n\n• Integrated functions of entropy / expected information gain into active learning loop to prioritize high-value ecological sites through AUC plots, running on Yale's high performance computing cluster",
  },
  {
    id: "exp-5",
    title: "Published Academic Research",
    company: "University of Chicago Booth School of Business",
    period: "January 2022 — February 2024",
    description:
      'Evaluation of Elo chess rating system using a Brownian motion model; Wiley peer-reviewed, top 10% most viewed papers for 2023.',
    tags: ["R", "Excel"],
    details:
      '• "On the probability of Magnus Carlsen reaching 2900" published in Applied Stochastic Models in Business and Industry Wiley Peer-Reviewed Journal\n\n• Evaluated chess Elo rating system by learning probabilistic modeling (Brownian motion model)\n\n• Top 10% most viewed papers in Wiley for 2023',
    link: "https://doi.org/10.1002/asmb.2745",
  },
];

export const placeholderProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Options Hedging Tradeoffs: Slippage Costs vs. Directional Risk",
    bullets: [
      "Built C++ simulation engine processing 400K+ NASDAQ tick events to model delta-hedging of a short straddle, constructing efficient frontier for transaction costs against directional risk across eight hedging threshold values",
      "Demonstrated a statistically significant 15.3% slippage reduction (p=0.002) by timing hedge execution against Order Flow Imbalance (OFI) signals, validated volatility assumption using Ornstein-Uhlenbeck stochastic process",
    ],
    tags: ["C++", "numpy", "pandas", "options theory"],
    link: "https://drive.google.com/file/d/1bDdtx1xOZu7XO7yXZam7B0faHWd-X5EJ/view?usp=drive_link",
    githubLink: "https://github.com/sbendre06/delta-rehedge-simulator",
  },
  {
    id: "proj-2",
    title: "Art Restoration via Latent Rectified Flow",
    bullets: [
      "Worked w/ friends from DL theory class to fine-tune a 4B param FLUX.2 diffusion transformer for painting restoration using conditional latent rectified flow, training on ~80K synthetically corrupted WikiArt images using 4 GPUs",
      "Architecting training loop code (DeepSpeed ZeRO-2) + HuggingFace for model, wandb.ai for tracking",
    ],
    tags: ["PyTorch", "HuggingFace", "DeepSpeed", "wandb.ai"],
    link: "https://drive.google.com/file/d/1lzQMC_aeLje2jlOUOGvVb6Aqv0tWrZT8/view?usp=sharing",
    githubLink: "https://github.com/calderkatyal/Art-Restoration",
  },
  {
    id: "proj-3",
    title: "Mario Animation with Forward Kinematics",
    bullets: [
      "Applied forward kinematics (FK) + quaternion SLERP (Lie group theory) to create interactive animations from scratch",
      "Designed full character in Blender with kinematic hierarchy, exported to Three.js for Lie group mechanics and GUI",
    ],
    tags: ["Blender", "Three.js", "3D Spatial Computing"],
    link: "https://glaze-professor-f1a.notion.site/Mario-Forward-Kinematics-FK-Animation-Engine-359a63a6a56e8016bd24c6746bd9edb0?source=copy_link",
    linkLabel: "notion",
    githubLink: "https://github.com/sbendre06/Mario-Animation-Engine",
  },
];

export const placeholderSkills: SkillCategory[] = [
  { name: "Languages", skills: ["Python", "JavaScript", "HTML", "CSS", "C", "R", "SQL", "Git"] },
  { name: "ML / AI", skills: ["PyTorch", "TensorFlow", "Scikit-learn", "SciPy", "JAX"] },
  { name: "3D / Creative", skills: ["Adobe Creative Suite", "Blender", "Unity", "WebGL"] },
  { name: "Web / Full-Stack", skills: ["React", "Next.js", "Three.js"]},
];
