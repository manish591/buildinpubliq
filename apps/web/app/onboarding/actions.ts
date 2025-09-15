'use server';

import { prisma } from '@buildinpubliq/db';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';
import { getCurrentUser } from '../data/users/verify-auth-session';

export async function finishOnboarding() {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new BuildinpubliqError(401, 'Unauthorized');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isOnboardingCompleted: true,
    },
  });
}
