import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Add it to server/.env");
}

const connectionString = process.env.DATABASE_URL;
const needsSsl =
  /sslmode=require/i.test(connectionString) ||
  /\.neon\.tech/i.test(connectionString) ||
  process.env.PGSSL === "true";

export const pool = new Pool({
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  max: process.env.VERCEL ? 2 : 10,
});
