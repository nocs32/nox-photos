import { auth } from "@/auth";
import { ProfileForm } from "@/components/profile-form";
import { getProfile } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit profile",
    description: "Edit profile",
};

export default async function EditProfile() {
    const session = await auth();
    const profile = await getProfile(session?.user.username!);

    if (!profile) {
        notFound();
    }

    return (
        <div className="px-12">
            <h1 className="text-2xl font-medium">Edit profile</h1>
            <ProfileForm profile={profile} />
        </div>
    );
}