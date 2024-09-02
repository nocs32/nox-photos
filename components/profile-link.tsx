"use client";

import { cn } from '@/lib/utils'
import type { User } from 'next-auth';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/button';
import { UserAvatar } from './user-avatar';

interface ProfileLinkProps {
    user: User;
}

export default function ProfileLink({ user }: ProfileLinkProps) {
    const pathname = usePathname();
    const href = `/dashboard/${user.username}`;
    const isActive = pathname === href;

    return (
        <Link
            className={buttonVariants({
                className: "navLink",
                variant: isActive ? "secondary" : "ghost",
                size: "lg"
            })}
            href={href}
        >
            <UserAvatar user={user} />
            <p className={cn("hidden lg:block", { "font-extrabold": isActive })}>Profile</p>
        </Link>
    )
}
