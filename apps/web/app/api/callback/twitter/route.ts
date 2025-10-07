import { prisma } from '@buildinpubliq/db';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { BASE_URL } from '@/constants';

const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const REDIRECT_URI = process.env.TWITTER_REDIRECT_URI as string;
const BASIC_AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json({ message: 'Unauthenticated' });
  }

  const user = req.auth.user;

  if (!user?.id) {
    return NextResponse.json({ message: 'Unauthenticated' });
  }

  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ message: 'Bad Request' });
  }

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', CLIENT_ID ?? '');
  params.append('redirect_uri', REDIRECT_URI);
  params.append('code_verifier', 'challenge');

  const tokenRes = await fetch('https://api.x.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASIC_AUTH}`,
    },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ message: 'Internal server error' });
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  const refreshToken = tokenData.refresh_token;

  const userRes = await fetch(
    'https://api.x.com/2/users/me?user.fields=profile_image_url,confirmed_email',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!userRes.ok) {
    return NextResponse.json({ message: 'Internal server error' });
  }

  const userData = await userRes.json();
  const platformUserId = userData.data.id;
  const platformUserName = userData.data.username;
  const platformUserEmail = userData.data.confirmed_email;
  const platformUserImg = userData.data.profile_image_url;

  await prisma.channel.upsert({
    where: {
      platform: 'TWITTER',
      platformUserId,
    },
    update: {
      accessToken,
      refreshToken,
    },
    create: {
      platform: 'TWITTER',
      accessToken,
      refreshToken,
      platformUserId,
      platformUserName,
      platformUserImg,
      platformUserEmail,
      userId: user.id,
    },
  });

  const redirectTo = JSON.parse(decodeURIComponent(state)) as {
    redirect: string;
  };
  return NextResponse.redirect(`${BASE_URL}${redirectTo.redirect}`);
});
