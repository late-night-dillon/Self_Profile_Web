import { z } from "zod";

export const projectCreateSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(10).max(2000),
    url: z.string().url().optional().or(z.literal("")),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
