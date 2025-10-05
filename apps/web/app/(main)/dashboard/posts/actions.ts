'use server';

import { Prisma, prisma } from '@buildinpubliq/db';
import { z } from 'zod';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';

const schema = z
  .object({
    status: z.nativeEnum(Prisma.PostStatus),
    scheduledAt: z.date().nullable(),
    selectedChannels: z.array(z.string()).min(1),
    channelsContent: z
      .array(
        z.object({
          content: z.string(),
          channelId: z.string(),
        }),
      )
      .min(1),
  })
  .refine(
    (val) =>
      val.channelsContent.every((item) =>
        val.selectedChannels.includes(item.channelId),
      ),
    {
      message: 'Channels ids mismatch',
    },
  );

export type CreatePostData = z.infer<typeof schema>;

export async function createPost(data: CreatePostData) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthenticated');
  }

  const userId = user.id;

  const validationResult = await schema.safeParseAsync(data);

  if (validationResult.error) {
    throw new BuildinpubliqError(400, 'Bad request');
  }

  const { channelsContent, scheduledAt, selectedChannels, status } =
    validationResult.data;

  await prisma.post.createMany({
    data: selectedChannels.map((channelId) => {
      const content = channelsContent.find(
        (item) => item.channelId === channelId,
      )?.content as string;

      return {
        userId,
        channelId,
        status,
        content,
        scheduledAt,
      };
    }),
  });
}

export async function editPost(data: {
  id: string;
  content: string;
  status: Prisma.PostStatus;
  scheduledAt: null | Date;
}) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthenticated');
  }

  await prisma.post.update({
    where: {
      id: data.id,
    },
    data: {
      content: data.content,
      status: data.status,
      scheduledAt: data.scheduledAt,
    },
  });
}

export async function deletePost(postId: string) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthenticated');
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}
