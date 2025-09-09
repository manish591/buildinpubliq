'use server';

import { prisma } from '@buildinpubliq/db';

export default async function getProjectDetails(id: string) {
  const data = await prisma.project.findFirst({
    where: {
      OR: [{ repoId: id }, { id }],
    },
  });

  return data;
}
