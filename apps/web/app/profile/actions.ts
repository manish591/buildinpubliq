'use server';

import { auth } from '@/auth';
import { prisma } from '@buildinpubliq/db';

export async function getConnectedChannels(userId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('unauthenticated');
  }

  const data = await prisma.channel.findMany({
    where: {
      userId,
      isActive: true,
    },
  });

  return data;
}
