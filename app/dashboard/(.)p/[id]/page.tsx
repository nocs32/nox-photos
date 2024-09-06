import { PostView } from "@/components/post-view";
import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PostModal({ params }: { params: { id: string } }) {
    const post = await getPostById(params.id);

    if (!post) {
        notFound();
    }

    return (
        <PostView id={params.id} post={post} />
    )
}
