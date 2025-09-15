import { z } from 'zod';
import 'server-only';
import { Prisma, prisma } from '@buildinpubliq/db';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';
import { getCurrentUser } from '../users/verify-auth-session';

const schema = z.object({
  platform: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.nativeEnum(Prisma.$Enums.Platform))
    .optional(),
  status: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.nativeEnum(Prisma.$Enums.PostStatus))
    .optional(),
});

export async function getAllPosts(options?: {
  platform?: string;
  status?: string;
}) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthenticated');
  }

  const validationResult = await schema.safeParseAsync(options);

  if (validationResult.error) {
    throw new BuildinpubliqError(400, 'Bad request');
  }

  const validatedData = validationResult.data;

  const data = await prisma.post.findMany({
    where: {
      userId: user.id,
      ...(validatedData.platform && {
        postOnChannel: {
          some: {
            postStatus: validatedData.status,
            channel: {
              platform: validatedData.platform,
            },
          },
        },
      }),
    },
    include: {
      _count: true,
      postOnChannel: true,
    },
  });

  return data;
}
