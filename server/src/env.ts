import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_SSL: z.coerce.boolean().default(false),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  DOMAIN_NAME: z.string(),
});

function getEnv() {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default getEnv();
