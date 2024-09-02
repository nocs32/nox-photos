"use client";

import { LoginButton } from "./login-button";

export function LoginForm() {
    return (
        <div className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl dark:text-black">
                    Please log in to continue.
                </h1>

                <LoginButton />
            </div>
        </div>
    );
}