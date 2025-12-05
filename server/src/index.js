import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import cors from "cors";
import express from "express";
import multer from "multer";
import { pool } from "./db.js";
import { initializeDatabase } from "./initDb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT || 4000);
const OWNER_PASSWORD = process.env.OWNER_ANALYTICS_PASSWORD || "123";
const CLIENT_ORIGINS = [
  ...(process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  "http://localhost:5173",
  "http://localhost:5174",
  "https://tanvirpr.vercel.app",
  "https://my-website-dusky-delta.vercel.app",
];
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const UPLOADS_DIR = process.env.VERCEL
  ? path.join("/tmp", "portfolio-uploads")
  : path.resolve(__dirname, "../uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_ORIGINS.includes(origin) || /\.vercel\.app$/i.test(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "x-owner-token"],
  })
);
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

let dbReady = null;
export const ensureDatabase = () => {
  if (!dbReady) {
    dbReady = initializeDatabase().catch((error) => {
      dbReady = null;
      throw error;
    });
  }
  return dbReady;
};

app.use(async (_req, _res, next) => {
  try {
    await ensureDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
      const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${safeExt}`);
    },
  }),
  limits: { fileSize: 6 * 1024 * 1024, files: 8 },
  fileFilter: (_req, file, cb) => {
    if (!/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype || "")) {
      return cb(new Error("Only JPG, PNG, WEBP, or GIF images are allowed"));
    }
    cb(null, true);
  },
});


const signOwnerToken = () => {
  const issuedAt = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${issuedAt}.${nonce}`;
  const signature = crypto
    .createHmac("sha256", OWNER_PASSWORD)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
};

const verifyOwnerToken = (token) => {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return false;
  const [issuedAt, nonce, signature] = parts;
  if (!/^\d+$/.test(issuedAt) || !nonce || !signature) return false;
  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age < 0 || age > TOKEN_TTL_MS) return false;
  const payload = `${issuedAt}.${nonce}`;
  const expected = crypto
    .createHmac("sha256", OWNER_PASSWORD)
    .update(payload)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
};

const getOwnerToken = (req) => String(req.headers["x-owner-token"] || "");

const requireOwner = (req, res) => {
  const token = getOwnerToken(req);
  if (!verifyOwnerToken(token)) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
};

const cleanText = (value) => String(value || "").trim();
const cleanNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseStack = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const parseGallery = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => cleanText(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => cleanText(item)).filter(Boolean);
      }
    } catch {
      /* fall through */
    }
    return trimmed
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const ALLOWED_CARD_SIZES = new Set(["sm", "md", "lg", "xl"]);

const readProjectFields = (body) => {
  const title = cleanText(body?.title);
  const description = cleanText(body?.description);
  const about = cleanText(body?.about);
  const roleText = cleanText(body?.role_text || body?.role);
  const stack = parseStack(body?.stack);
  const gallery = parseGallery(body?.gallery);
  const highlights = cleanText(body?.highlights);
  const siteUrl = cleanText(body?.site_url || "#") || "#";
  const githubUrl = cleanText(body?.github_url || "#") || "#";
  const imageKey = cleanText(body?.image_key || "project1") || "project1";
  const imageUrl = cleanText(body?.image_url || "");
  const sortOrder = cleanNumber(body?.sort_order, 0);
  const rawSize = cleanText(body?.card_size || "md").toLowerCase() || "md";
  const cardSize = ALLOWED_CARD_SIZES.has(rawSize) ? rawSize : "md";
  const isFeatured = Boolean(body?.is_featured);
  const isPublished = body?.is_published === undefined ? true : Boolean(body?.is_published);
  return {
    title,
    description,
    about,
    roleText,
    stack,
    gallery,
    highlights,
    siteUrl,
    githubUrl,
    imageKey,
    imageUrl,
    sortOrder,
    cardSize,
    isFeatured,
    isPublished,
  };
};

const PROJECT_COLUMNS = `
  id, title, description, about, role_text, stack, gallery, highlights,
  site_url, github_url, image_key, image_url, card_size, is_featured, is_published, sort_order
`;

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/projects", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT ${PROJECT_COLUMNS}
      FROM projects
      WHERE is_published = TRUE
      ORDER BY is_featured DESC, sort_order ASC, id ASC
      `
    );
    res.json({ projects: result.rows });
  } catch (error) {
    console.error("projects_error", error);
    res.status(500).json({ message: "Failed to load projects" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid project id" });
    const result = await pool.query(
      `SELECT ${PROJECT_COLUMNS} FROM projects WHERE id = $1 AND is_published = TRUE`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error("project_detail_error", error);
    res.status(500).json({ message: "Failed to load project" });
  }
});

app.get("/api/skills", async (_req, res) => {
  try {
    const [groupsResult, skillsResult] = await Promise.all([
      pool.query(
        `SELECT id, name, summary, details, sort_order FROM skill_groups ORDER BY sort_order ASC, id ASC`
      ),
      pool.query(
        `SELECT id, group_name, name, sort_order FROM skills ORDER BY group_name ASC, sort_order ASC, id ASC`
      ),
    ]);

    const topicsByGroup = new Map();
    for (const skill of skillsResult.rows) {
      if (!topicsByGroup.has(skill.group_name)) topicsByGroup.set(skill.group_name, []);
      topicsByGroup.get(skill.group_name).push(skill);
    }

    const groups = groupsResult.rows.map((group) => ({
      ...group,
      topics: topicsByGroup.get(group.name) || [],
    }));

    // Include skill-only groups that do not have a skill_groups row yet
    for (const [name, topics] of topicsByGroup.entries()) {
      if (!groups.some((g) => g.name === name)) {
        groups.push({
          id: null,
          name,
          summary: "",
          details: "",
          sort_order: 999,
          topics,
        });
      }
    }

    res.json({ groups, skills: skillsResult.rows });
  } catch (error) {
    console.error("skills_error", error);
    res.status(500).json({ message: "Failed to load skills" });
  }
});

app.get("/api/skills/groups/:id", async (req, res) => {
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid skill group id" });

    const groupResult = await pool.query(
      `SELECT id, name, summary, details, sort_order FROM skill_groups WHERE id = $1`,
      [id]
    );
    if (groupResult.rowCount === 0) {
      return res.status(404).json({ message: "Skill group not found" });
    }

    const group = groupResult.rows[0];
    const topicsResult = await pool.query(
      `SELECT id, group_name, name, sort_order FROM skills WHERE group_name = $1 ORDER BY sort_order ASC, id ASC`,
      [group.name]
    );

    res.json({
      group: {
        ...group,
        topics: topicsResult.rows,
      },
    });
  } catch (error) {
    console.error("skill_group_detail_error", error);
    res.status(500).json({ message: "Failed to load skill group" });
  }
});

app.get("/api/certificates", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, title, org, year, url, image_url, sort_order
      FROM certificates
      ORDER BY sort_order ASC, id ASC
      `
    );
    res.json({ certificates: result.rows });
  } catch (error) {
    console.error("certificates_error", error);
    res.status(500).json({ message: "Failed to load certificates" });
  }
});

app.get("/api/experiences", async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, title, period, description, image_key, image_url, sort_order
      FROM experiences
      ORDER BY sort_order ASC, id ASC
      `
    );
    res.json({ experiences: result.rows });
  } catch (error) {
    console.error("experiences_error", error);
    res.status(500).json({ message: "Failed to load experiences" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim();
    const message = String(req.body?.message || "").trim();

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: "Name must be between 2 and 50 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({ message: "Message must be between 10 and 1000 characters" });
    }

    await pool.query(
      `
      INSERT INTO contact_messages (name, email, message)
      VALUES ($1, $2, $3)
      `,
      [name, email, message]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("contact_error", error);
    res.status(500).json({ message: "Could not send your message" });
  }
});

app.post("/api/analytics/event", async (req, res) => {
  try {
    const eventName = String(req.body?.eventName || "").trim();
    const path = req.body?.path ? String(req.body.path) : null;
    const title = req.body?.title ? String(req.body.title) : null;
    const payload = req.body?.payload && typeof req.body.payload === "object" ? req.body.payload : {};

    if (!eventName) {
      return res.status(400).json({ message: "eventName is required" });
    }

    await pool.query(
      `
      INSERT INTO analytics_events (event_name, path, title, payload)
      VALUES ($1, $2, $3, $4::jsonb)
      `,
      [eventName, path, title, JSON.stringify(payload)]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("analytics_error", error);
    res.status(500).json({ message: "Failed to store analytics event" });
  }
});

app.post("/api/owner/login", (req, res) => {
  const password = String(req.body?.password || "");
  if (password !== OWNER_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ token: signOwnerToken() });
});

app.get("/api/owner/stats", async (req, res) => {
  if (!requireOwner(req, res)) return;

  try {
    const [pageViewsResult, visitorsResult, clicksResult] = await Promise.all([
      pool.query(
        "SELECT COUNT(*)::int AS count FROM analytics_events WHERE event_name = 'page_view';"
      ),
      pool.query(
        "SELECT COUNT(DISTINCT payload->>'visitorId')::int AS count FROM analytics_events WHERE payload ? 'visitorId';"
      ),
      pool.query(
        "SELECT COUNT(*)::int AS count FROM analytics_events WHERE event_name <> 'page_view';"
      ),
    ]);

    res.json({
      pageViews: pageViewsResult.rows[0].count || 0,
      visitors: visitorsResult.rows[0].count || 0,
      clicks: clicksResult.rows[0].count || 0,
    });
  } catch (error) {
    console.error("owner_stats_error", error);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

app.get("/api/owner/projects", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const result = await pool.query(
      `SELECT ${PROJECT_COLUMNS} FROM projects ORDER BY sort_order ASC, id ASC`
    );
    res.json({ projects: result.rows });
  } catch (error) {
    console.error("owner_projects_error", error);
    res.status(500).json({ message: "Failed to load projects" });
  }
});

app.post("/api/owner/upload", (req, res) => {
  if (!requireOwner(req, res)) return;
  upload.array("files", 8)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Upload failed" });
    }
    const files = Array.isArray(req.files) ? req.files : [];
    if (!files.length) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const urls = files.map((file) => `/uploads/${file.filename}`);
    res.status(201).json({ ok: true, urls, url: urls[0] });
  });
});

app.post("/api/owner/projects", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const fields = readProjectFields(req.body);
    if (!fields.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      `
      INSERT INTO projects (
        title, description, about, role_text, stack, gallery, highlights,
        site_url, github_url, image_key, image_url, card_size, is_featured, is_published, sort_order
      )
      VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING id
      `,
      [
        fields.title,
        fields.description,
        fields.about,
        fields.roleText,
        JSON.stringify(fields.stack),
        JSON.stringify(fields.gallery),
        fields.highlights,
        fields.siteUrl,
        fields.githubUrl,
        fields.imageKey,
        fields.imageUrl,
        fields.cardSize,
        fields.isFeatured,
        fields.isPublished,
        fields.sortOrder,
      ]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error("owner_create_project_error", error);
    res.status(500).json({ message: "Failed to create project" });
  }
});

app.put("/api/owner/projects/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid project id" });

    const fields = readProjectFields(req.body);
    if (!fields.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      `
      UPDATE projects
      SET title = $1, description = $2, about = $3, role_text = $4, stack = $5::jsonb,
          gallery = $6::jsonb, highlights = $7, site_url = $8, github_url = $9, image_key = $10,
          image_url = $11, card_size = $12, is_featured = $13, is_published = $14, sort_order = $15
      WHERE id = $16
      RETURNING id
      `,
      [
        fields.title,
        fields.description,
        fields.about,
        fields.roleText,
        JSON.stringify(fields.stack),
        JSON.stringify(fields.gallery),
        fields.highlights,
        fields.siteUrl,
        fields.githubUrl,
        fields.imageKey,
        fields.imageUrl,
        fields.cardSize,
        fields.isFeatured,
        fields.isPublished,
        fields.sortOrder,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_update_project_error", error);
    res.status(500).json({ message: "Failed to update project" });
  }
});

app.delete("/api/owner/projects/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid project id" });

    const result = await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_delete_project_error", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

app.post("/api/owner/experiences", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const title = cleanText(req.body?.title);
    const period = cleanText(req.body?.period);
    const description = cleanText(req.body?.description);
    const imageKey = cleanText(req.body?.image_key || "profpic");
    const imageUrl = cleanText(req.body?.image_url || "");
    const sortOrder = cleanNumber(req.body?.sort_order, 0);

    if (!title || !period || !description) {
      return res.status(400).json({ message: "Title, period, and description are required" });
    }

    const result = await pool.query(
      `
      INSERT INTO experiences (title, period, description, image_key, image_url, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `,
      [title, period, description, imageKey, imageUrl, sortOrder]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error("owner_create_experience_error", error);
    res.status(500).json({ message: "Failed to create experience" });
  }
});

app.put("/api/owner/experiences/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid experience id" });

    const title = cleanText(req.body?.title);
    const period = cleanText(req.body?.period);
    const description = cleanText(req.body?.description);
    const imageKey = cleanText(req.body?.image_key || "profpic");
    const imageUrl = cleanText(req.body?.image_url || "");
    const sortOrder = cleanNumber(req.body?.sort_order, 0);

    if (!title || !period || !description) {
      return res.status(400).json({ message: "Title, period, and description are required" });
    }

    const result = await pool.query(
      `
      UPDATE experiences
      SET title = $1, period = $2, description = $3, image_key = $4, image_url = $5, sort_order = $6
      WHERE id = $7
      RETURNING id
      `,
      [title, period, description, imageKey, imageUrl, sortOrder, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_update_experience_error", error);
    res.status(500).json({ message: "Failed to update experience" });
  }
});

app.delete("/api/owner/experiences/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    if (!id) return res.status(400).json({ message: "Invalid experience id" });

    const result = await pool.query("DELETE FROM experiences WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_delete_experience_error", error);
    res.status(500).json({ message: "Failed to delete experience" });
  }
});

app.put("/api/owner/skill-groups/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    const name = cleanText(req.body?.name);
    const summary = cleanText(req.body?.summary);
    const details = cleanText(req.body?.details);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!id || !name) {
      return res.status(400).json({ message: "id and name are required" });
    }

    const existing = await pool.query(`SELECT name FROM skill_groups WHERE id = $1`, [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Skill group not found" });
    }
    const oldName = existing.rows[0].name;

    await pool.query(
      `UPDATE skill_groups SET name = $1, summary = $2, details = $3, sort_order = $4 WHERE id = $5`,
      [name, summary, details, sortOrder, id]
    );

    if (oldName !== name) {
      await pool.query(`UPDATE skills SET group_name = $1 WHERE group_name = $2`, [name, oldName]);
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("owner_update_skill_group_error", error);
    res.status(500).json({ message: "Failed to update skill group" });
  }
});

app.post("/api/owner/skill-groups", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const name = cleanText(req.body?.name);
    const summary = cleanText(req.body?.summary);
    const details = cleanText(req.body?.details);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!name) return res.status(400).json({ message: "name is required" });
    const result = await pool.query(
      `INSERT INTO skill_groups (name, summary, details, sort_order) VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, summary, details, sortOrder]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error("owner_create_skill_group_error", error);
    res.status(500).json({ message: "Failed to create skill group" });
  }
});

app.post("/api/owner/skills", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const groupName = cleanText(req.body?.group_name);
    const name = cleanText(req.body?.name);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!groupName || !name) {
      return res.status(400).json({ message: "group_name and name are required" });
    }
    const result = await pool.query(
      `INSERT INTO skills (group_name, name, sort_order) VALUES ($1, $2, $3) RETURNING id`,
      [groupName, name, sortOrder]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error("owner_create_skill_error", error);
    res.status(500).json({ message: "Failed to create skill" });
  }
});

app.put("/api/owner/skills/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    const groupName = cleanText(req.body?.group_name);
    const name = cleanText(req.body?.name);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!id || !groupName || !name) {
      return res.status(400).json({ message: "id, group_name and name are required" });
    }
    const result = await pool.query(
      `UPDATE skills SET group_name = $1, name = $2, sort_order = $3 WHERE id = $4 RETURNING id`,
      [groupName, name, sortOrder, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: "Skill not found" });
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_update_skill_error", error);
    res.status(500).json({ message: "Failed to update skill" });
  }
});

app.delete("/api/owner/skills/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    const result = await pool.query("DELETE FROM skills WHERE id = $1", [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Skill not found" });
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_delete_skill_error", error);
    res.status(500).json({ message: "Failed to delete skill" });
  }
});

app.post("/api/owner/certificates", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const title = cleanText(req.body?.title);
    const org = cleanText(req.body?.org);
    const year = cleanText(req.body?.year);
    const url = cleanText(req.body?.url);
    const imageUrl = cleanText(req.body?.image_url);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!title) return res.status(400).json({ message: "Title is required" });
    const result = await pool.query(
      `
      INSERT INTO certificates (title, org, year, url, image_url, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
      `,
      [title, org, year, url, imageUrl, sortOrder]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error("owner_create_certificate_error", error);
    res.status(500).json({ message: "Failed to create certificate" });
  }
});

app.put("/api/owner/certificates/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    const title = cleanText(req.body?.title);
    const org = cleanText(req.body?.org);
    const year = cleanText(req.body?.year);
    const url = cleanText(req.body?.url);
    const imageUrl = cleanText(req.body?.image_url);
    const sortOrder = cleanNumber(req.body?.sort_order, 0);
    if (!id || !title) return res.status(400).json({ message: "id and title are required" });
    const result = await pool.query(
      `
      UPDATE certificates
      SET title = $1, org = $2, year = $3, url = $4, image_url = $5, sort_order = $6
      WHERE id = $7 RETURNING id
      `,
      [title, org, year, url, imageUrl, sortOrder, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: "Certificate not found" });
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_update_certificate_error", error);
    res.status(500).json({ message: "Failed to update certificate" });
  }
});

app.delete("/api/owner/certificates/:id", async (req, res) => {
  if (!requireOwner(req, res)) return;
  try {
    const id = cleanNumber(req.params.id, 0);
    const result = await pool.query("DELETE FROM certificates WHERE id = $1", [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: "Certificate not found" });
    res.json({ ok: true });
  } catch (error) {
    console.error("owner_delete_certificate_error", error);
    res.status(500).json({ message: "Failed to delete certificate" });
  }
});

export default app;

async function start() {
  try {
    await ensureDatabase();
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("startup_error", error);
    process.exit(1);
  }
}

if (!process.env.VERCEL) {
  start();
}
