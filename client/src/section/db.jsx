import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import {
  SiMongodb,
  SiNextdotjs,
  SiTypescript,
  SiPytorch,
  SiScikitlearn,
  SiFastapi,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

/** Marquee / high-signal stack */
export const skills = [
  { id: 1, skill: "Python", icon: <FaPython /> },
  { id: 2, skill: "PyTorch", icon: <SiPytorch /> },
  { id: 3, skill: "scikit-learn", icon: <SiScikitlearn /> },
  { id: 4, skill: "TypeScript", icon: <SiTypescript /> },
  { id: 5, skill: "React", icon: <FaReact /> },
  { id: 6, skill: "Next.js", icon: <SiNextdotjs /> },
  { id: 7, skill: "Node.js", icon: <FaNodeJs /> },
  { id: 8, skill: "FastAPI", icon: <SiFastapi /> },
  { id: 9, skill: "PostgreSQL", icon: <SiPostgresql /> },
  { id: 10, skill: "MongoDB", icon: <SiMongodb /> },
  { id: 11, skill: "SQL", icon: <TbSql /> },
  { id: 12, skill: "Tailwind", icon: <SiTailwindcss /> },
];

export const SKILL_GROUP_ORDER = [
  "Machine Learning",
  "Deep Learning",
  "Gen AI",
  "Programming",
  "Frontend",
  "Backend",
  "Databases",
  "Soft Skills",
];

export const skillGroups = [
  {
    title: "Machine Learning",
    summary: "Classical ML for tabular problems, evaluation, and feature work.",
    details:
      "I cover supervised learning workflows: cleaning data, feature engineering, training with scikit-learn, and measuring models with the right metrics before shipping.",
    items: ["scikit-learn", "pandas", "NumPy", "Feature engineering", "Model evaluation"],
  },
  {
    title: "Deep Learning",
    summary: "Neural nets with PyTorch — vision, sequences, and transfer learning.",
    details:
      "I work with CNNs/RNNs in PyTorch, reuse pretrained models, and focus on practical training loops rather than notebook-only experiments.",
    items: ["PyTorch", "CNN", "RNN", "Transfer learning", "NLP"],
  },
  {
    title: "Gen AI",
    summary: "LLMs, RAG, semantic search, and agent-style workflows.",
    details:
      "I build GenAI features end-to-end: prompts, retrieval pipelines, embeddings/semantic search, and lightweight agent flows that connect to real apps.",
    items: ["LLMs", "RAG pipelines", "Semantic search", "Prompt engineering", "LangChain / agents"],
  },
  {
    title: "Programming",
    summary: "Core languages I use to build and ship systems.",
    details:
      "Python for ML/backends, TypeScript/JavaScript for product UI, plus C/C++ and C# from coursework and systems practice.",
    items: ["Python", "JavaScript", "TypeScript", "C / C++", "C#"],
  },
  {
    title: "Frontend",
    summary: "Modern React UIs with strong UX and performance.",
    details:
      "I ship responsive interfaces with React, Next.js, and Tailwind — clean components, accessible interactions, and production-ready polish.",
    items: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    title: "Backend",
    summary: "APIs and services that sit behind products and ML features.",
    details:
      "Node/Express and FastAPI for REST APIs, auth, and integrating models or databases into reliable services.",
    items: ["Node.js", "Express", "FastAPI", "REST APIs"],
  },
  {
    title: "Databases",
    summary: "SQL and document stores for app and analytics data.",
    details:
      "PostgreSQL and SQL for structured data; MongoDB when flexible documents fit the product.",
    items: ["PostgreSQL", "MongoDB", "SQL"],
  },
  {
    title: "Soft Skills",
    summary: "How I collaborate and keep learning on a team.",
    details:
      "Clear communication, structured problem solving, teamwork on projects/hackathons, and continuous learning.",
    items: ["Problem solving", "Communication", "Teamwork", "Continuous learning"],
  },
];
