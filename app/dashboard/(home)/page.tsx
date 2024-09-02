import { Posts } from "@/components/posts";
import { Suspense } from "react";

export default function Dashboard() {
    return (
        <main className="flex w-full flex-grow">
            <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
                <Suspense>
                    <Posts />
                </Suspense>
            </div>
        </main>
    )
}