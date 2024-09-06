"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FollowingWithExtras } from "@/lib/definitions";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import useMount from "@/hooks/use-mount";
import { Following } from "./following";

interface FollowingModalProps {
    following: FollowingWithExtras[] | undefined;
    username: string;
}

export function FollowingModal({ following, username }: FollowingModalProps) {
    const mount = useMount();
    const pathname = usePathname();
    const router = useRouter();
    const isFollowingPage = pathname === `/dashboard/${username}/following`;

    if (!mount) return null;

    return (
        <Dialog
            open={isFollowingPage}
            onOpenChange={(isOpen) => !isOpen && router.back()}
        >
            <DialogContent className="dialogContent">
                <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full">
                    <DialogTitle className="mx-auto font-bold text-base">
                        Following
                    </DialogTitle>
                </DialogHeader>
                {following?.length === 0 && <p className="p-4 text-sm font-medium">This user does not have any followers</p>}
                <ScrollArea className="min-h-fit max-h-[350px]">
                    {following?.map((following) => <Following key={following.followingId} following={following} />)}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}