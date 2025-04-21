import { z } from "zod";
const EducationSchema = z.array(z.object({
    school: z.string().optional(),
    date: z.string().optional(),
    description: z.array(z.string()),
    gpa: z.string(),
}));
const WorkSchema = z.array(z.object({
    company: z.string().optional(),
    date: z.string().optional(),
    description: z.array(z.string()),
    jobTitle: z.string().optional(),
}));
const ProjectSchema = z.array(z.object({
    name: z.string().optional(),
}));
export const CandidateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    summary: z.string().max(1000).optional(),
    url: z.string().url(),
    phone: z.string().max(10).optional(),
    address: z.string().optional(),
    education: EducationSchema,
    skills: z.array(z.string()),
    featuredSkills: z.array(z.string()),
    workExperiences: WorkSchema,
    projects: ProjectSchema,
});
export const CandidateSearchSchema = z.object({
    email: z.string().email().optional(),
    skills: z.array(z.string()).optional(),
});
//# sourceMappingURL=candidate.js.map