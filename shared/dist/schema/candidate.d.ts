import { z } from "zod";
export declare const CandidateSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    education: z.ZodArray<z.ZodObject<{
        school: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        description: z.ZodArray<z.ZodString, "many">;
        gpa: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string[];
        gpa: string;
        date?: string | undefined;
        school?: string | undefined;
    }, {
        description: string[];
        gpa: string;
        date?: string | undefined;
        school?: string | undefined;
    }>, "many">;
    skills: z.ZodArray<z.ZodString, "many">;
    featuredSkills: z.ZodArray<z.ZodString, "many">;
    workExperiences: z.ZodArray<z.ZodObject<{
        company: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        description: z.ZodArray<z.ZodString, "many">;
        jobTitle: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description: string[];
        date?: string | undefined;
        company?: string | undefined;
        jobTitle?: string | undefined;
    }, {
        description: string[];
        date?: string | undefined;
        company?: string | undefined;
        jobTitle?: string | undefined;
    }>, "many">;
    projects: z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
    }, {
        name?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    url: string;
    education: {
        description: string[];
        gpa: string;
        date?: string | undefined;
        school?: string | undefined;
    }[];
    skills: string[];
    featuredSkills: string[];
    workExperiences: {
        description: string[];
        date?: string | undefined;
        company?: string | undefined;
        jobTitle?: string | undefined;
    }[];
    projects: {
        name?: string | undefined;
    }[];
    summary?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
}, {
    name: string;
    email: string;
    url: string;
    education: {
        description: string[];
        gpa: string;
        date?: string | undefined;
        school?: string | undefined;
    }[];
    skills: string[];
    featuredSkills: string[];
    workExperiences: {
        description: string[];
        date?: string | undefined;
        company?: string | undefined;
        jobTitle?: string | undefined;
    }[];
    projects: {
        name?: string | undefined;
    }[];
    summary?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
}>;
export declare const CandidateSearchSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    skills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    skills?: string[] | undefined;
}, {
    email?: string | undefined;
    skills?: string[] | undefined;
}>;
//# sourceMappingURL=candidate.d.ts.map