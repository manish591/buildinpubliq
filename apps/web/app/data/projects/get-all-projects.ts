import "server-only";
import { prisma } from "@buildinpubliq/db";
import { verifyAuthSession } from "../users/verify-auth-session";

export async function getAllProjects() {
  const user = await verifyAuthSession();
  const userId = user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await prisma.project.findMany({
    where: {
      userId
    },
  });

  return data;
}