import z from "zod";
import { STATUS_VALUES } from "../constant";
export const CreatePosition = z.object({
    name: z
        .string()
        .min(2, { message: "Must be 2 or more character long" })
        .max(50, { message: "Must be less than 50 character" }),
    managerId: z.number(),
    positions: z.number(),
});
export const PositionSearchSchema = z.object({
    status: z.enum(STATUS_VALUES).optional(),
    managerId: z.number().optional(),
});
export const ParamSchema = z.object({
    id: z.coerce.number(),
});
export const PositionCollectionSchema = z.object({
    positionId: z.number(),
    candidateId: z.number(),
});
//# sourceMappingURL=position.js.map