import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
});

export const db = drizzle({ client: pool });

export async function checkDb() {
  try {
    await db.execute("select 1");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
