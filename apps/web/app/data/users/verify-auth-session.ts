import { cache } from 'react';
import { auth } from '@/auth';
import 'server-only';

export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return session.user;
});
