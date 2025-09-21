import 'server-only';
import { z } from "zod";
import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from '../users/verify-auth-session';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';

const schema = z.object({
  query: z.string().optional()
});

export async function getConnectedRepositories(options?: { query?: string }) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, "Unauthorized");
  }

  const validationResult = await schema.safeParseAsync(options ?? {});

  if (validationResult.error) {
    throw new BuildinpubliqError(400, "Bad request");
  }

  const { query } = validationResult.data;

  const data = await prisma.githubRepository.findMany({
    where: {
      userId: user.id,
      ...(query && {
        fullName: {
          contains: query,
          mode: "insensitive"
        }
      })
    },
  });

  return data;
}
