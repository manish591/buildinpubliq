import NextAuth from "next-auth/next";
import { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { db } from "@/prisma/src";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    })
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  session: { strategy: "jwt" as SessionStrategy },
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: "/login",
  },
  callbacks: {

  }
};

const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };