import 'server-only';
import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';

export async function hasGithubIntegration() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return null;
  }

  const data = await prisma.githubIntegration.findFirst({
    where: {
      userId: user.id,
      isActive: true,
    },
  });

  return data;
}
