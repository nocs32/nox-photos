import { z } from 'zod';

export const postSchema = z.object({
    id: z.string(),
    fileUrl: z.string().url(),
    caption: z.string().optional(),
});

export const createPostSchema = postSchema.omit({ id: true });

export const updatePostSchema = postSchema;

export const deletePostSchema = postSchema.pick({ id: true });

export const likePostSchema = z.object({
    postId: z.string(),
});

export const bookmarkPostSchema = z.object({
    postId: z.string(),
});
  
export const commentPostSchema = z.object({
    id: z.string(),
    body: z.string(),
    postId: z.string(),
});

export const createPostCommentSchema = commentPostSchema.omit({ id: true });
export const updatePostCommentSchema = commentPostSchema;
export const deletePostCommentSchema = commentPostSchema.pick({ id: true });

export const userSchema = z.object({
    id: z.string(),
    username: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(),
    bio: z.string().max(150).optional(),
    website: z.string().optional(),
    gender: z.string().optional(),
});
  
export const updateUserSchema = userSchema;
export const deleteUserSchema = userSchema.pick({ id: true });
export const followUserSchema = userSchema.pick({ id: true });