import 'server-only';
import { prisma } from '@buildinpubliq/db';
import { getCurrentUser } from './verify-auth-session';

export async function getUserDetails() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return null;
  }

  const data = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  return data;
}
