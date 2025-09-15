import { prisma } from '@buildinpubliq/db';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { BASE_URL } from '@/constants';

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ message: 'Unauthenticated' });
  }

  const user = req.auth.user;

  if (!user?.id) {
    return NextResponse.json({ message: 'Unauthenticated' });
  }

  const searchParams = new URL(req.url).searchParams;
  const installationId = searchParams.get('installation_id');
  const setupAction = searchParams.get('setup_action');
  const state = searchParams.get('state');

  if (!state || !setupAction || !installationId) {
    return NextResponse.json({ message: 'Bad request' });
  }

  if (setupAction !== 'install') {
    return NextResponse.json({ message: 'Bad request' });
  }

  await prisma.githubIntegration.create({
    data: {
      installationId,
      userId: user.id,
      isActive: true,
    },
  });

  const redirectTo = JSON.parse(decodeURIComponent(state)) as {
    redirect: string;
  };
  return NextResponse.redirect(`${BASE_URL}${redirectTo.redirect}`);
});
