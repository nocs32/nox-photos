"use client";

import { navLinks } from "@/app/constants";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const LinkIcon = link.icon;

                return (
                    <Link
                        className={buttonVariants({
                            className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
                            variant: isActive ? "secondary" : "ghost",
                            size: "lg",
                        })}
                        key={link.name}
                        href={link.href}
                    >
                        <LinkIcon className="w-6" />
                        <p className={cn("hidden lg:block", { "font-extrabold": isActive })}>
                            {link.name}
                        </p>
                    </Link >
                )
            })}
        </>
    )
}
