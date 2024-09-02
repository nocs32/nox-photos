import { SwitchCamera } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link
            className="hidden md:flex w-full justify-center items-center mb-10"
            href="/"
        >
            <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
            <h1 className="text-primary font-bold text-xl lg:text-2xl hidden lg:block">
                <span className="text-red-500">NOX</span>PHOTOS
            </h1>
        </Link>
    )
}
