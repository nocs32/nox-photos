import Link from "next/link";
import { getPostById, getUserPosts } from "@/lib/data";
import { PostsGrid } from "./posts-grid";

export async function MorePosts({ postId }: { postId: string }) {
    const post = await getPostById(postId);
    const postUsername = post?.user.username;
    const posts = await getUserPosts(postUsername!, postId);

    return (
        <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
            <p className="font-semibold text-sm text-neutral-600 dark:text-neutral-400">
                More posts from{" "}
                <Link
                    href={`/dashboard/${postUsername}`}
                    className="dark:text-white text-black hover:opacity-50"
                >
                    {postUsername}
                </Link>{" "}
            </p>

            <PostsGrid posts={posts} />
        </div>
    );
}