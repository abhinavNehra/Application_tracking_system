import z from "zod";
export declare const CreatePosition: z.ZodObject<{
    name: z.ZodString;
    managerId: z.ZodNumber;
    positions: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    managerId: number;
    positions: number;
}, {
    name: string;
    managerId: number;
    positions: number;
}>;
export type CreatePositionType = z.infer<typeof CreatePosition>;
export declare const PositionSearchSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["active", "on hold", "closed"]>>;
    managerId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    managerId?: number | undefined;
    status?: "active" | "on hold" | "closed" | undefined;
}, {
    managerId?: number | undefined;
    status?: "active" | "on hold" | "closed" | undefined;
}>;
export declare const ParamSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const PositionCollectionSchema: z.ZodObject<{
    positionId: z.ZodNumber;
    candidateId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    positionId: number;
    candidateId: number;
}, {
    positionId: number;
    candidateId: number;
}>;
//# sourceMappingURL=position.d.ts.map