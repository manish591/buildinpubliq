import { cache } from "react";
import { auth } from "@/auth";
import "server-only";
import { redirect } from "next/navigation";

export const verifyAuthSession = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return session.user;
});