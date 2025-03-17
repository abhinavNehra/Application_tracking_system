import { z } from 'zod'


export const SignupSchema = z.object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255)
})

export type SignupSchemaType = z.infer<typeof SignupSchema>