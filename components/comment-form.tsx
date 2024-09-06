"use client";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPostCommentSchema } from "@/lib/schemas";
import { createComment } from "@/lib/actions";

interface CommentFormProps {
    postId: string;
    className?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}

export function CommentForm({ postId, className }: CommentFormProps) {
    const form = useForm<z.infer<typeof createPostCommentSchema>>({
        resolver: zodResolver(createPostCommentSchema),
        defaultValues: {
            body: "",
            postId,
        },
    });

    const body = form.watch("body");
    const isSubmitting = form.formState.isSubmitting;

    return (
        <Form {...form}>
            <form
                className={cn("border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3", className)}
                onSubmit={form.handleSubmit(async (values) => {
                    await createComment(values);
                    form.reset();
                })}
            >
                {isSubmitting && (
                    <div className="flex justify-center items-center w-full absolute">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => {
                        return (
                            <FormItem className="w-full flex">
                                <FormControl>
                                    <input
                                        className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-medium disabled:opacity-30"
                                        disabled={isSubmitting}
                                        type="text"
                                        placeholder="Add a comment..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <button
                    className="text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500"
                    disabled={!body.trim().length || isSubmitting}
                    type="submit"
                >
                    Post
                </button>
            </form>
        </Form>
    );
}