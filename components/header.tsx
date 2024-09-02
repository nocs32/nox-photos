import { Heart, Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Header() {
    return (
        <header className="fixed md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-6">
            <Link
                className="w-full justify-center items-center"
                href="/"
            >
                <h1 className="text-primary font-bold text-xl lg:text-2xl">
                    <span className="text-red-500">NOX</span>PHOTOS
                </h1>
            </Link>
            <div className="flex items-center space-x-2">
                <div className="flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5">
                    <Search className="h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none"
                    />
                </div>
                <Button size={"icon"} variant={"ghost"}>
                    <Heart />
                </Button>
            </div>
        </header>
    );
}