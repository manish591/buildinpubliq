'use server';

import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import type { CreateIdeaData } from './_components/create-idea-form';

export async function createIdea(data: CreateIdeaData) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.idea.create({
    data: {
      title: data.title,
      content: data.content,
      userId: user.id,
      isArchived: false,
    },
  });
}
