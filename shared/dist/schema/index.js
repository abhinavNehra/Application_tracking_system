import { z } from 'zod';
export const SignupSchema = z
    .object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    verifyPassword: z.string().min(6).max(50),
})
    .refine((val) => val.password === val.verifyPassword, {
    message: 'Password and Verify Password not matched',
    path: ['verifyPassword'], // path of error
});
//# sourceMappingURL=index.js.map