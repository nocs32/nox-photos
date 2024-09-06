import { FollowingModal } from "@/components/following-modal";
import { getProfile } from "@/lib/data";


export default async function FollowingPage({ params: { username } }: { params: { username: string } }) {
    const profile = await getProfile(username);
    const following = profile?.following;

    return <FollowingModal following={following} username={username} />;
}
