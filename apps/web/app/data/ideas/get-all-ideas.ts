import 'server-only';
import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '../users/verify-auth-session';

export async function getAllIdeas() {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  const data = await prisma.idea.findMany({
    where: {
      userId: user.id,
    },
  });

  return data;
}
