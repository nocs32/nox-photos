import { EditPost } from "@/components/edit-post";
import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

export default async function EditPostPage({ params: { id } }: Props) {
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return <EditPost id={id} post={post} />;
}