import { z } from 'zod';

export const postSchema = z.object({
    id: z.string(),
    fileUrl: z.string().url(),
    caption: z.string().optional(),
});

export const createPostSchema = postSchema.omit({ id: true });

export const updatePostSchema = postSchema;

export const deletePostSchema = postSchema.pick({ id: true });