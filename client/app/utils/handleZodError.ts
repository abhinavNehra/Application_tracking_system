import z from 'zod';

export const ErrorSchema = z.object({
    code: z.string(),
    path: z.array(z.string()),
    message: z.string(),
});

export type ErrorSchemaType = z.infer<typeof ErrorSchema>;

export async function handleZodError(errors: ErrorSchemaType[]) {
    console.log('error ----', errors)
    return errors?.map((error) => ({
        [error.path[0]]: { message: error.message },
    }));
}
