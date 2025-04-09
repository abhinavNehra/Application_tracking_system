import { defineConfig } from 'drizzle-kit';
import env from './src/env.ts';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT,
    ssl: false,
  },
});
