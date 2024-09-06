import { auth } from "@/auth";
import { PostWithExtras } from "@/lib/definitions";
import { UserAvatar } from "./user-avatar";
import { Timestamp } from "./timestamp";
import { PostOptions } from "./post-options";
import Image from "next/image";
import { Card } from "./ui/card";
import { PostActions } from "./post-actions";
import Link from "next/link";
import { Comments } from "./comments";

interface PostProps {
    post: PostWithExtras;
}

export async function Post({ post }: PostProps) {
    const session = await auth();
    const userId = session?.user?.id;
    const userName = post.user.username;

    if (!session?.user) return null;

    return (
        <div className="flex flex-col space-y-2.5">
            <div className="flex items-center justify-between px-3 sm:px-0">
                <div className="flex space-x-3 items-center">
                    <UserAvatar user={post.user} />
                    <div className="text-sm">
                        <p className="space-x-1">
                            <span className="font-semibold">{userName}</span>
                            <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">•</span>
                            <Timestamp createdAt={post.createdAt} />
                        </p>
                        <p className="text-xs text-black dark:text-white font-medium">Location</p>
                    </div>
                </div>
                <PostOptions post={post} userId={userId} />
            </div>
            <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
                <Image
                    className="sm:rounded-md object-cover"
                    src={post.fileUrl}
                    alt="Post image"
                    fill
                />
            </Card>
            <PostActions
                className="px-3 sm:px-0"
                post={post}
                userId={userId}
            />
            {post.caption && (
                <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
                    <Link className="font-bold" href={`/dashboard/${userName}`}>{userName}</Link>
                    <p>{post.caption}</p>
                </div>
            )}
            <Comments
                postId={post.id}
                user={session?.user}
                comments={post.comments}
            />
        </div>
    )
}
