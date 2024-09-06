import { PostsGrid } from "@/components/posts-grid";
import { fetchSavedPostsByUsername } from "@/lib/data";

export default async function SavedPosts({ params: { username } }: { params: { username: string } }) {
    const savedPosts = await fetchSavedPostsByUsername(username);
    const posts = savedPosts?.map((savedPost) => savedPost.post);

    return <PostsGrid posts={posts} />;
}