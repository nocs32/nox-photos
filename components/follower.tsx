"use client";

import { FollowerWithExtras } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { FollowButton } from "./follow-button";

interface FollowerProps {
    follower: FollowerWithExtras;
}

export function Follower({ follower }: FollowerProps) {
    const { data: session } = useSession();
    const isFollowing = follower.follower.followedBy.some(user => user.followerId === session?.user.id);
    const isCurrentUser = session?.user.id === follower.followerId;

    if (!session) return null;

    return (
        <div className="p-4 flex items-center justify-between gap-x-3">
            <Link
                className="flex items-center gap-x-3"
                href={`/dashboard/${follower.follower.username}`}
            >
                <UserAvatar user={follower.follower} className="h-10 w-10" />
                <p className="font-bold text-sm">{follower.follower.username}</p>
            </Link>
            {!isCurrentUser && (
                <FollowButton
                    profileId={follower.followerId}
                    isFollowing={isFollowing}
                    buttonClassName={isFollowing ? "bg-neutral-700 dark:hover:bg-neutral-700/40" : ""}
                />
            )}
        </div>
    );
}