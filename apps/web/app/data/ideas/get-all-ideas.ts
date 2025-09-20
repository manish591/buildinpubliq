import { prisma } from '@buildinpubliq/db';
import { z } from "zod";
import { getCurrentUser } from '../users/verify-auth-session';
import 'server-only';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';

const schema = z.object({
  query: z.string().optional(),
});

export async function getAllIdeas(options?: { query?: string }) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthenticated');
  }

  const validationResult = await schema.safeParseAsync(options);

  if (validationResult.error) {
    throw new BuildinpubliqError(400, "Bad request");
  }

  const { query } = validationResult.data;

  const data = await prisma.idea.findMany({
    where: {
      userId: user.id,
      ...(query && {
        OR: [
          {
            content: {
              contains: query
            }
          },
          {
            title: {
              contains: query
            }
          }
        ]
      }),
    },
  });

  return data;
}
