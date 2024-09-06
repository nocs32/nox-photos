"use client";

import { createComment } from "@/lib/actions";
import { CommentWithExtras } from "@/lib/definitions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostCommentSchema } from "@/lib/schemas";

interface CommentsProps {
    postId: string;
    comments: CommentWithExtras[];
    user?: User | null;
}

export function Comments({ postId, comments, user }: CommentsProps) {
    const form = useForm<z.infer<typeof createPostCommentSchema>>({
        resolver: zodResolver(createPostCommentSchema),
        defaultValues: {
            body: "",
            postId,
        },
    });
    let [isPending, startTransition] = useTransition();
    const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithExtras[]>(
        comments,
        // @ts-ignore
        (state: Comment[], newComment: string) => [
            { body: newComment, userId: user?.id, postId, user },
            ...state,
        ]
    );
    const body = form.watch("body");
    const commentsCount = optimisticComments.length;

    return (
        <div className="space-y-0.5 px-3 sm:px-0">
            {commentsCount > 1 && (
                <Link
                    className="text-sm font-medium text-neutral-500"
                    scroll={false}
                    href={`/dashboard/p/${postId}`}
                >
                    View all {commentsCount} comments
                </Link>
            )}

            {optimisticComments.slice(0, 3).map((comment, i) => {
                const username = comment.user?.username;

                return (
                    <div className="text-sm flex items-center space-x-2 font-medium mx-1" key={i}>
                        <Link href={`/dashboard/${username}`} className="font-semibold">
                            {username}:
                        </Link>
                        <p>{comment.body}</p>
                    </div>
                );
            })}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(async (values) => {
                        const valuesCopy = { ...values };
                        form.reset();
                        startTransition(() => {
                            addOptimisticComment(valuesCopy.body);
                        });

                        await createComment(valuesCopy);
                    })}
                    className="border-b border-gray-300 dark:border-neutral-800 pb-3 py-1 flex items-center space-x-2"
                >
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field, fieldState }) => (
                            <FormItem className="w-full flex">
                                <FormControl>
                                    <input
                                        className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
                                        type="text"
                                        placeholder="Add a comment..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {body.trim().length > 0 && (
                        <button
                            className="text-sky-500 text-sm pr-2 font-semibold dark:hover:text-white hover:text-black disabled:hover:text-sky-500 disabled:cursor-not-allowed"
                            type="submit"
                        >
                            Post
                        </button>
                    )}
                </form>
            </Form>
        </div>
    );
}