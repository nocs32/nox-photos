import { MorePosts } from "@/components/more-posts";
import { SinglePost } from "@/components/single-post";
import { SinglePostSkeleton } from "@/components/skeletons";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function PostPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div>
            <Suspense fallback={<SinglePostSkeleton />}>
                <SinglePost id={id} />
            </Suspense>
            <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />
            <Suspense>
                <MorePosts postId={id} />
            </Suspense>
        </div>
    );
}