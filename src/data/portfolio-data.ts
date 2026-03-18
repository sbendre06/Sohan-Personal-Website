export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  details?: string;
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
    title: "Machine Learning Research Intern",
    company: "Research Lab — University",
    period: "Summer 2025",
    description: "Developed novel approaches to geometric deep learning, applying differential geometry concepts to graph neural networks.",
    tags: ["PyTorch", "Python", "GNNs", "Research"],
    details: "Detailed description of your work, methodologies, and outcomes. Replace this with your actual experience.",
  },
  {
    id: "exp-2",
    title: "3D Artist & Technical Director",
    company: "Creative Studio",
    period: "2024 — Present",
    description: "Created immersive 3D environments and procedural art installations exploring mathematical structures in visual form.",
    tags: ["Blender", "Unity", "Houdini", "GLSL"],
    details: "Detailed description of your creative and technical work. Replace this with your actual experience.",
  },
  {
    id: "exp-3",
    title: "Software Engineering Intern",
    company: "Tech Company",
    period: "Summer 2024",
    description: "Built full-stack features for a spatial computing platform, working across the frontend and backend.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    details: "Detailed description of your engineering contributions. Replace this with your actual experience.",
  },
];

export const placeholderProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Geometric Neural Networks",
    description: "A framework for applying Riemannian geometry to neural network architectures, enabling learning on non-Euclidean manifolds.",
    tags: ["Python", "PyTorch", "Differential Geometry"],
    details: "Full project writeup with technical details, architecture decisions, and results.",
  },
  {
    id: "proj-2",
    title: "Procedural Möbius Worlds",
    description: "Interactive 3D experience where users traverse procedurally generated landscapes on non-orientable surfaces.",
    tags: ["Three.js", "WebGL", "GLSL", "React"],
    details: "Full project writeup with creative process and technical implementation.",
  },
  {
    id: "proj-3",
    title: "Spatial Computing Toolkit",
    description: "An open-source toolkit for building mixed-reality experiences with hand tracking and spatial anchoring.",
    tags: ["Unity", "C#", "ARKit", "Computer Vision"],
    details: "Full project writeup with architecture and demo videos.",
  },
  {
    id: "proj-4",
    title: "Topological Data Analysis",
    description: "Visualization tool for persistent homology, making abstract algebraic topology concepts tangible and interactive.",
    tags: ["D3.js", "Python", "Topology", "React"],
    details: "Full project writeup with mathematical foundations and visualization approach.",
  },
];

export const placeholderSkills: SkillCategory[] = [
  { name: "Languages", skills: ["Python", "TypeScript", "C++", "GLSL", "C#", "SQL"] },
  { name: "ML / AI", skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "JAX"] },
  { name: "3D / Creative", skills: ["Three.js", "Blender", "Unity", "Houdini", "WebGL"] },
  { name: "Web / Full-Stack", skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"] },
  { name: "Math", skills: ["Linear Algebra", "Differential Geometry", "Topology", "Optimization", "Probability"] },
];
