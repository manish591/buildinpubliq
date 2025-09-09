import "server-only";
import { prisma } from "@buildinpubliq/db";
import { verifyAuthSession } from "@/app/data/users/verify-auth-session";

export async function hasGithubIntegration() {
  const user = await verifyAuthSession();

  if (!user) {
    return null;
  }

  const data = await prisma.githubIntegration.findFirst({
    where: {
      userId: user.id,
      isActive: true,
    },
  });

  if (!data) {
    return null;
  }

  return data;
}