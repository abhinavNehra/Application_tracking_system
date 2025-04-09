import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import env from "../env.ts";

import * as schema from "./schema";

const pool = new pg.Pool({
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
  ssl: false,
});

export const db = drizzle({ client: pool, schema });

export async function checkDb() {
  try {
    await db.execute("select 1");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
