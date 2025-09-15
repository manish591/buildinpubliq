import 'server-only';
import { z } from 'zod';
import { Prisma, prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '../users/verify-auth-session';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';

const channelFilterSchema = z.object({
  platform: z
    .string()
    .transform((val) => (val ? val.toUpperCase() : undefined))
    .pipe(z.nativeEnum(Prisma.$Enums.Platform))
    .optional(),
});

export async function getAllChannels(
  options?: Readonly<{ platform?: Prisma.Platform }>,
) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error('Unauthenticated');
  }

  const isValidated = await channelFilterSchema.safeParseAsync(options);

  if (isValidated.error) {
    throw new BuildinpubliqError(400, 'Bad request');
  }

  const data = await prisma.channel.findMany({
    where: {
      userId: user.id,
      ...(options?.platform && {
        platform: isValidated.data.platform,
      }),
    },
  });

  return data;
}
