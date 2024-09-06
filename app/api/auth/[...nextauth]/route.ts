import { config } from "@/auth"
import NextAuth, { AuthOptions } from "next-auth"
import { Adapter } from "@auth/core/adapters"

const handler = NextAuth(config as AuthOptions & { adapter: Adapter });

export { handler as GET, handler as POST }