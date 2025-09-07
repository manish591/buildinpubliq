'use server';

import { auth } from '@/auth';
import { prisma } from '@buildinpubliq/db';

export async function getAllProjectUpdates(projectId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('unauthenticated');
  }

  const data = await prisma.projectUpdate.findMany({
    where: {
      projectId,
      userId: session.user.id,
    },
    include: {
      project: true,
    },
  });

  return data;
}
