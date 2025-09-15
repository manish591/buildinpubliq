import 'server-only';
import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '../users/verify-auth-session';

export async function getAllChannels() {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthenticated');
  }

  const data = await prisma.channel.findMany({
    where: {
      userId: user.id,
    },
  });

  return data;
}
