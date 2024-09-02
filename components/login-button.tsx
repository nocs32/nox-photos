import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="mt-4 w-full border"
            variant={"secondary"}
            aria-disabled={pending}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
            Log in with Google
        </Button>
    );
}