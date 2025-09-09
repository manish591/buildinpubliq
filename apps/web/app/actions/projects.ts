'use server';

import { prisma } from '@buildinpubliq/db';
import { auth } from '@/auth';

export async function editProject(
  id: string,
  title: string,
  description: string,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('unauthenticated');
  }

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });
}

export default async function getProjectDetails(id: string) {
  const data = await prisma.project.findFirst({
    where: {
      OR: [{ repoId: id }, { id }],
    },
  });

  return data;
}
