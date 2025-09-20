'use server';

import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import type { CreateIdeaData } from './_components/create-idea-form';
import type { EditIdeaData } from './_components/edit-idea-modal';

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

export async function editIdea(data: EditIdeaData) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.idea.update({
    where: {
      id: data.id
    },
    data: {
      title: data.title,
      content: data.content
    }
  });
}

export async function deleteIdea(id: string) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.idea.delete({
    where: {
      id
    }
  })
}