import { PostsGrid } from "@/components/posts-grid";
import { getUserPosts } from "@/lib/data";

export default async function ProfilePage({ params: { username } }: { params: { username: string } }) {
    const posts = await getUserPosts(username);

    return <PostsGrid posts={posts} />;
}