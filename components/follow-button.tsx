import { followUser } from "@/lib/actions";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";

interface FollowButtonProps {
    profileId: string;
    isFollowing?: boolean;
    className?: string;
    buttonClassName?: string;
}

export function FollowButton({ profileId, isFollowing, className, buttonClassName }: FollowButtonProps) {
    return (
        <form action={followUser} className={className}>
            <input type="hidden" value={profileId} name="id" />
            <SubmitButton
                className={buttonVariants({
                    variant: isFollowing ? "secondary" : "default",
                    className: cn("!font-bold w-full", buttonClassName),
                    size: "sm",
                })}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </SubmitButton>
        </form>
    );
}