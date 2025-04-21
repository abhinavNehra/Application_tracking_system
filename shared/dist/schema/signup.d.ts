import { z } from 'zod';
export declare const SignupSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    verifyPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    verifyPassword: string;
}, {
    email: string;
    username: string;
    password: string;
    verifyPassword: string;
}>, {
    email: string;
    username: string;
    password: string;
    verifyPassword: string;
}, {
    email: string;
    username: string;
    password: string;
    verifyPassword: string;
}>;
export type SignupSchemaType = z.infer<typeof SignupSchema>;
//# sourceMappingURL=signup.d.ts.map