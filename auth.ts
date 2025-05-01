import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/prisma/src";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  pages: {
    signIn: "/login",
  },
});