import { pool } from "./db.js";

const seedProjects = [
  {
    title: "Project slot 1",
    description: "Short summary for the homepage card.",
    about: "Longer about text for the detail page. Edit from /owner.",
    role: "What this project does / your role.",
    stack: ["React", "Node.js"],
    highlights: "",
    siteUrl: "#",
    githubUrl: "#",
    imageKey: "project1",
    imageUrl: "",
    cardSize: "lg",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    title: "Project slot 2",
    description: "Short summary for the homepage card.",
    about: "Edit details from the owner panel.",
    role: "What this project does.",
    stack: ["Python", "FastAPI"],
    highlights: "",
    siteUrl: "#",
    githubUrl: "#",
    imageKey: "project2",
    imageUrl: "",
    cardSize: "md",
    isFeatured: false,
    sortOrder: 2,
  },
  {
    title: "Project slot 3",
    description: "Short summary for the homepage card.",
    about: "Edit details from the owner panel.",
    role: "What this project does.",
    stack: ["PyTorch", "PostgreSQL"],
    highlights: "",
    siteUrl: "#",
    githubUrl: "#",
    imageKey: "project4",
    imageUrl: "",
    cardSize: "md",
    isFeatured: false,
    sortOrder: 3,
  },
];

const seedSkills = [
  // Machine Learning
  { groupName: "Machine Learning", name: "scikit-learn", sortOrder: 1 },
  { groupName: "Machine Learning", name: "pandas", sortOrder: 2 },
  { groupName: "Machine Learning", name: "NumPy", sortOrder: 3 },
  { groupName: "Machine Learning", name: "Feature engineering", sortOrder: 4 },
  { groupName: "Machine Learning", name: "Model evaluation", sortOrder: 5 },
  // Deep Learning
  { groupName: "Deep Learning", name: "PyTorch", sortOrder: 1 },
  { groupName: "Deep Learning", name: "CNN", sortOrder: 2 },
  { groupName: "Deep Learning", name: "RNN", sortOrder: 3 },
  { groupName: "Deep Learning", name: "Transfer learning", sortOrder: 4 },
  { groupName: "Deep Learning", name: "NLP", sortOrder: 5 },
  // Gen AI
  { groupName: "Gen AI", name: "LLMs", sortOrder: 1 },
  { groupName: "Gen AI", name: "RAG pipelines", sortOrder: 2 },
  { groupName: "Gen AI", name: "Semantic search", sortOrder: 3 },
  { groupName: "Gen AI", name: "Prompt engineering", sortOrder: 4 },
  { groupName: "Gen AI", name: "LangChain / agents", sortOrder: 5 },
  // Programming
  { groupName: "Programming", name: "Python", sortOrder: 1 },
  { groupName: "Programming", name: "JavaScript", sortOrder: 2 },
  { groupName: "Programming", name: "TypeScript", sortOrder: 3 },
  { groupName: "Programming", name: "C / C++", sortOrder: 4 },
  { groupName: "Programming", name: "C#", sortOrder: 5 },
  // Frontend
  { groupName: "Frontend", name: "React", sortOrder: 1 },
  { groupName: "Frontend", name: "Next.js", sortOrder: 2 },
  { groupName: "Frontend", name: "Tailwind CSS", sortOrder: 3 },
  { groupName: "Frontend", name: "HTML / CSS", sortOrder: 4 },
  // Backend
  { groupName: "Backend", name: "Node.js", sortOrder: 1 },
  { groupName: "Backend", name: "Express", sortOrder: 2 },
  { groupName: "Backend", name: "FastAPI", sortOrder: 3 },
  { groupName: "Backend", name: "REST APIs", sortOrder: 4 },
  // Databases
  { groupName: "Databases", name: "PostgreSQL", sortOrder: 1 },
  { groupName: "Databases", name: "MongoDB", sortOrder: 2 },
  { groupName: "Databases", name: "SQL", sortOrder: 3 },
  // Soft Skills
  { groupName: "Soft Skills", name: "Problem solving", sortOrder: 1 },
  { groupName: "Soft Skills", name: "Communication", sortOrder: 2 },
  { groupName: "Soft Skills", name: "Teamwork", sortOrder: 3 },
  { groupName: "Soft Skills", name: "Continuous learning", sortOrder: 4 },
];

const seedSkillGroups = [
  {
    name: "Machine Learning",
    summary: "Classical ML for tabular problems, evaluation, and feature work.",
    details:
      "I cover supervised learning workflows: cleaning data, feature engineering, training with scikit-learn, and measuring models with the right metrics before shipping.",
    sortOrder: 1,
  },
  {
    name: "Deep Learning",
    summary: "Neural nets with PyTorch — vision, sequences, and transfer learning.",
    details:
      "I work with CNNs/RNNs in PyTorch, reuse pretrained models, and focus on practical training loops rather than notebook-only experiments.",
    sortOrder: 2,
  },
  {
    name: "Gen AI",
    summary: "LLMs, RAG, semantic search, and agent-style workflows.",
    details:
      "I build GenAI features end-to-end: prompts, retrieval pipelines, embeddings/semantic search, and lightweight agent flows that connect to real apps.",
    sortOrder: 3,
  },
  {
    name: "Programming",
    summary: "Core languages I use to build and ship systems.",
    details:
      "Python for ML/backends, TypeScript/JavaScript for product UI, plus C/C++ and C# from coursework and systems practice.",
    sortOrder: 4,
  },
  {
    name: "Frontend",
    summary: "Modern React UIs with strong UX and performance.",
    details:
      "I ship responsive interfaces with React, Next.js, and Tailwind — clean components, accessible interactions, and production-ready polish.",
    sortOrder: 5,
  },
  {
    name: "Backend",
    summary: "APIs and services that sit behind products and ML features.",
    details:
      "Node/Express and FastAPI for REST APIs, auth, and integrating models or databases into reliable services.",
    sortOrder: 6,
  },
  {
    name: "Databases",
    summary: "SQL and document stores for app and analytics data.",
    details:
      "PostgreSQL and SQL for structured data; MongoDB when flexible documents fit the product. I design schemas and queries that stay maintainable.",
    sortOrder: 7,
  },
  {
    name: "Soft Skills",
    summary: "How I collaborate and keep learning on a team.",
    details:
      "Clear communication, structured problem solving, teamwork on projects/hackathons, and continuous learning as stacks move fast.",
    sortOrder: 8,
  },
];

const seedCertificates = [
  {
    title: "Web Developer Certification",
    org: "Programming Hero Co.",
    year: "2024",
    url: "",
    imageUrl: "",
    sortOrder: 1,
  },
];

const seedExperiences = [
  {
    title: "BSc in Computer Science and Engineering",
    period: "2024 - Oct 2027",
    description: "John von Neumann University · Software development · 5th semester.",
    imageKey: "profpic",
    imageUrl: "",
    sortOrder: 1,
  },
];

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      site_url TEXT NOT NULL DEFAULT '#',
      github_url TEXT NOT NULL DEFAULT '#',
      image_key TEXT NOT NULL DEFAULT 'project1',
      image_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS about TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS role_text TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS stack JSONB NOT NULL DEFAULT '[]'::jsonb;`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS highlights TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS card_size TEXT NOT NULL DEFAULT 'md';`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT TRUE;`);
  await pool.query(`ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB NOT NULL DEFAULT '[]'::jsonb;`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id SERIAL PRIMARY KEY,
      event_name TEXT NOT NULL,
      path TEXT,
      title TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      image_key TEXT NOT NULL DEFAULT 'profpic',
      image_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS skill_groups (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      summary TEXT NOT NULL DEFAULT '',
      details TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      group_name TEXT NOT NULL,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS certificates (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      org TEXT NOT NULL DEFAULT '',
      year TEXT NOT NULL DEFAULT '',
      url TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const projectsExisting = await pool.query("SELECT COUNT(*)::int AS count FROM projects;");
  if (projectsExisting.rows[0].count === 0) {
    for (const project of seedProjects) {
      await pool.query(
        `
          INSERT INTO projects (
            title, description, about, role_text, stack, highlights,
            site_url, github_url, image_key, image_url, card_size, is_featured, sort_order
          )
          VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9,$10,$11,$12,$13)
        `,
        [
          project.title,
          project.description,
          project.about,
          project.role,
          JSON.stringify(project.stack),
          project.highlights,
          project.siteUrl,
          project.githubUrl,
          project.imageKey,
          project.imageUrl,
          project.cardSize,
          project.isFeatured,
          project.sortOrder,
        ]
      );
    }
  }

  const experiencesExisting = await pool.query("SELECT COUNT(*)::int AS count FROM experiences;");
  if (experiencesExisting.rows[0].count === 0) {
    for (const experience of seedExperiences) {
      await pool.query(
        `
          INSERT INTO experiences (title, period, description, image_key, image_url, sort_order)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          experience.title,
          experience.period,
          experience.description,
          experience.imageKey,
          experience.imageUrl,
          experience.sortOrder,
        ]
      );
    }
  }

  const skillGroupsExisting = await pool.query("SELECT COUNT(*)::int AS count FROM skill_groups;");
  if (skillGroupsExisting.rows[0].count === 0) {
    for (const group of seedSkillGroups) {
      await pool.query(
        `INSERT INTO skill_groups (name, summary, details, sort_order) VALUES ($1, $2, $3, $4)`,
        [group.name, group.summary, group.details, group.sortOrder]
      );
    }
  }

  const skillsExisting = await pool.query("SELECT COUNT(*)::int AS count FROM skills;");
  if (skillsExisting.rows[0].count === 0) {
    for (const skill of seedSkills) {
      await pool.query(
        `INSERT INTO skills (group_name, name, sort_order) VALUES ($1, $2, $3)`,
        [skill.groupName, skill.name, skill.sortOrder]
      );
    }
  }

  const certsExisting = await pool.query("SELECT COUNT(*)::int AS count FROM certificates;");
  if (certsExisting.rows[0].count === 0) {
    for (const cert of seedCertificates) {
      await pool.query(
        `
          INSERT INTO certificates (title, org, year, url, image_url, sort_order)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [cert.title, cert.org, cert.year, cert.url, cert.imageUrl, cert.sortOrder]
      );
    }
  }
}
