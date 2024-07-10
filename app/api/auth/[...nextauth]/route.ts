import NextAuth from "next-auth/next";
import { authOptions } from "@/auth";

const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };

declare module "next-auth" {
  interface Session {
    accessToken?: string
    userId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}