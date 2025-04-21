import { z } from "zod";
export declare const SearchSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    orderKey: z.ZodOptional<z.ZodString>;
    orderBy: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    orderKey?: string | undefined;
    orderBy?: "asc" | "desc" | undefined;
}, {
    search?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    orderKey?: string | undefined;
    orderBy?: "asc" | "desc" | undefined;
}>;
export type SearchSchemaType = z.infer<typeof SearchSchema>;
//# sourceMappingURL=common.d.ts.map