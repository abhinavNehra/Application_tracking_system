import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  orderKey: z.string().optional(),
  orderBy: z.enum(["asc", "desc"]).optional(),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;
