import { z } from "zod";
export const LoginSchema = z.object({
    username: z.string(),
    password: z.string().min(6).max(50),
});
//# sourceMappingURL=login.js.map