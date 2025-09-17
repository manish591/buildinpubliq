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

  const userId = user.id;

  const validationResult = await schema.safeParseAsync(options);

  if (validationResult.error) {
    throw new BuildinpubliqError(400, 'Bad request');
  }

  const { status, platform } = validationResult.data;

  const data = await prisma.post.findMany({
    where: {
      userId,
      ...(status && {
        status,
      }),
      ...(platform && {
        channel: {
          platform,
        },
      }),
    },
    include: {
      channel: true,
    },
  });

  return data;
}
