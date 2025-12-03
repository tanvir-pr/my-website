/** Central site copy & links — edit here when profiles change */
export const site = {
  name: "Tanvir Hasan",
  shortName: "Tanvir H",
  role: "AI/ML Engineer",
  secondaryRole: "Full-Stack Developer",
  location: "Budapest, Hungary",
  email: "tanvirhasaneror@gmail.com",
  phone: "+36 70 145 7156",
  phoneHref: "tel:+36701457156",
  github: "https://github.com/tanvir-pr",
  linkedin: "https://www.linkedin.com/in/tanvir-hasan",
  cvUrl: "/cv.pdf",
  cvFilename: "Tanvir_Hasan_CV.pdf",
  /** @deprecated use cvUrl — kept so older imports still resolve */
  resumeUrl: "/cv.pdf",
  resumeFilename: "Tanvir_Hasan_CV.pdf",
  headline:
    "CSE student targeting junior AI/ML roles — GenAI, RAG, and LLM apps, with 2+ years shipping full-stack products.",
  about: [
    "I'm a Computer Science & Engineering student at John von Neumann University (graduating Oct 2027), based in Budapest.",
    "My focus is GenAI: LLM-powered apps, RAG pipelines, semantic search, and automation — backed by Python, PyTorch, and scikit-learn.",
    "I also ship production web apps with React, Next.js, Node.js, Express, FastAPI, MongoDB, and SQL, so models can become real products.",
  ],
  availability: "Open to junior AI/ML or full-stack roles · Budapest / remote",
  education: {
    degree: "BSc in Computer Science and Engineering",
    school: "John von Neumann University",
    period: "2024 – Oct 2027",
    detail: "Software development major · currently 5th semester",
  },
  certifications: [
    {
      title: "Web Developer Certification",
      org: "Programming Hero Co.",
    },
  ],
  activities: ["Programming Club — John von Neumann University", "University Hackathon"],
};

/** Prefer Vite proxy (`/api`) so frontend always reaches the local server */
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/** Resolve uploaded `/uploads/...` paths through API base / Vite proxy */
export const mediaUrl = (url) => {
  const trimmed = String(url || "").trim();
  if (!trimmed) return "";
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;
  // Only accept real paths (drop junk like "fd" typed into image_url)
  if (!trimmed.startsWith("/")) return "";
  return `${API_BASE}${trimmed}`;
};
