import { FollowersModal } from "@/components/followers-modal";
import { getProfile } from "@/lib/data";

export default async function FollowersPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const followers = profile?.followedBy;

    return <FollowersModal followers={followers} username={username} />;
}