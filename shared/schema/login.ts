import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(6).max(50),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
