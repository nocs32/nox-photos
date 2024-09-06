"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { bookmarkPostSchema, createPostCommentSchema, createPostSchema, deletePostCommentSchema, deletePostSchema, followUserSchema, likePostSchema, updatePostSchema, updateUserSchema } from "./schemas";
import { getUserId } from "./utils";

export async function createPost(data: z.infer<typeof createPostSchema>) {
    const userId = await getUserId();
    const validatedData = createPostSchema.safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: "Failed to create post due to invalid data",
        }
    }

    const { fileUrl, caption } = validatedData.data;

    try {
        await prisma.post.create({
            data: {
                fileUrl,
                caption,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message: "Failed to create post",
        }
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function deletePost(formData: FormData) {
    const userId = await getUserId();
  
    const { id } = deletePostSchema.parse({
        id: formData.get("id"),
    });
  
    const post = await prisma.post.findUnique({
        where: {
            id,
            userId,
        },
    });
  
    if (!post) {
        throw new Error("Post not found");
    }
  
    try {
        await prisma.post.delete({
            where: {
            id,
            },
        });

        revalidatePath("/dashboard");
        
        return { message: "Deleted Post." };
    } catch (error) {
        return { message: "Database Error: Failed to Delete Post." };
    }
}

export async function likePost(value: FormDataEntryValue | null) {
    const userId = await getUserId();
    const validatedFields = likePostSchema.safeParse({
        postId: value,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Failed to like post due to invalid data",
        }
    }

    const { postId } = validatedFields.data;

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return {
            message: "Post not found",
        }
    }

    const like = await prisma.like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId,
            },
        },
    });

    if (like) {
        try {
            await prisma.like.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId,
                    },
                },
            });

            revalidatePath("/dashboard");

            return { message: "Unliked Post." };
        } catch (error) {
            return { message: "Database Error: Failed to Unlike Post." };
        }
    }

    try {
        await prisma.like.create({
            data: {
                postId,
                userId,
            },
        });

        revalidatePath("/dashboard");

        return { message: "Liked Post." };
    } catch (error) {
        return { message: "Database Error: Failed to Like Post." };
    }
} 

export async function bookmarkPost(value: FormDataEntryValue | null) {
    const userId = await getUserId();
  
    const validatedFields = bookmarkPostSchema.safeParse({ postId: value });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Bookmark Post.",
      };
    }
  
    const { postId } = validatedFields.data;
  
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });
  
    if (!post) {
        throw new Error("Post not found.");
    }
  
    const bookmark = await prisma.savedPost.findUnique({
        where: {
            postId_userId: {
                postId,
                userId,
            },
        },
    });
  
    if (bookmark) {
        try {
            await prisma.savedPost.delete({
                where: {
                    postId_userId: {
                    postId,
                    userId,
                    },
                },
            });

            revalidatePath("/dashboard");

            return { message: "Removed post from bookmarks." };
        } catch (error) {
            return {
            message: "Database Error: Failed to remove post from bookmarks.",
            };
        }
    }
  
    try {
      await prisma.savedPost.create({
            data: {
            postId,
            userId,
            },
      });

      revalidatePath("/dashboard");

      return { message: "Bookmarked Post." };
    } catch (error) {
        return {
            message: "Database Error: Failed to Bookmark Post.",
        };
    }
}

export async function createComment(values: z.infer<typeof createPostCommentSchema>) {
    const userId = await getUserId();
    const validatedFields = createPostCommentSchema.safeParse(values);
  
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Comment",
        };
    }
  
    const { postId, body } = validatedFields.data;
  
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });
  
    if (!post) {
        throw new Error("Post not found");
    }
  
    try {
        await prisma.comment.create({
            data: {
                body,
                postId,
                userId,
            },
        });

        revalidatePath("/dashboard");

        return { 
            message: "Created Comment" 
        };
    } catch (error) {
        return { message: "Database Error: Failed to Create Comment." };
    }
}

export async function deleteComment(formData: FormData) {
    const userId = await getUserId();
  
    const { id } = deletePostCommentSchema.parse({
        id: formData.get("id"),
    });
  
    const comment = await prisma.comment.findUnique({
        where: {
            id,
            userId,
        },
    });
  
    if (!comment) {
        throw new Error("Comment not found");
    }
  
    try {
        await prisma.comment.delete({
            where: {
                id,
            },
        });

        revalidatePath("/dashboard");

        return { 
            message: "Deleted Comment." 
        };
    } catch (error) {
        return { 
            message: "Database Error: Failed to Delete Comment." 
        };
    }
}

export async function updatePost(values: z.infer<typeof updatePostSchema>) {
    const userId = await getUserId();
  
    const validatedFields = updatePostSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update Post.",
      };
    }
  
    const { id, fileUrl, caption } = validatedFields.data;
  
    const post = await prisma.post.findUnique({
        where: {
            id,
            userId
        },
    });
  
    if (!post) {
        throw new Error("Post not found");
    }
  
    try {
        await prisma.post.update({
            where: {
                id
            },
            data: {
                fileUrl,
                caption
            },
        });
    } catch (error) {
        return { 
            message: "Database Error: Failed to Update Post." 
        };
    }
  
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function updateProfile(values: z.infer<typeof updateUserSchema>) {
    const userId = await getUserId();
  
    const validatedFields = updateUserSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update Profile.",
      };
    }
  
    const { bio, gender, image, name, username, website } = validatedFields.data;
  
    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username,
                name,
                image,
                bio,
                gender,
                website,
            },
        });

        revalidatePath("/dashboard");

        return { message: "Updated Profile." };
    } catch (error) {
        return { message: "Database Error: Failed to Update Profile." };
    }
  }
  
  export async function followUser(formData: FormData) {
    const userId = await getUserId();
  
    const { id } = followUserSchema.parse({
      id: formData.get("id"),
    });
  
    const user = await prisma.user.findUnique({
        where: {
            id
        },
    });
  
    if (!user) {
        throw new Error("User not found");
    }
  
    const follows = await prisma.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: userId,
                followingId: id,
            },
        },
    });
  
    if (follows) {
        try {
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: id
                    }
                }
            });

            revalidatePath("/dashboard");

            return { message: "Removed user from followed" };
        } catch (error) {
            return {
                message: "Database Error: Unable to remove user from followed",
            };
        }
    }
  
    try {
        await prisma.follows.create({
            data: {
                followerId: userId,
                followingId: id
            }
        });
        
        revalidatePath("/dashboard");

        return { message: "Followed User." };
    } catch (error) {
        return {
            message: "Database Error: Failed to Follow User.",
        };
    }
}
  