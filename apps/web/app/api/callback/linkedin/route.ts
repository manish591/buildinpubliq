import { prisma } from '@buildinpubliq/db';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { BASE_URL } from '@/constants';
import { BuildinpubliqError } from '@/lib/buildinpubliq-error';

const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID as string;
const REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI as string;

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    throw new BuildinpubliqError(401, "Unauthenticated");
  }

  const user = req.auth.user;

  if (!user?.id) {
    throw new BuildinpubliqError(401, "Unauthenticated");
  }

  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    throw new BuildinpubliqError(400, "Bad request");
  }

  const tokenData = await getAccessToken(code);
  const accessToken = tokenData.access_token;
  const accessTokenExpiresIn = new Date(Date.now() + tokenData.expires_in * 1000);

  const userData = await getUserData(accessToken);
  const platformUserId = userData.sub;
  const platformUserName = userData.name;
  const platformUserImg = userData.picture;
  const platformUserEmail = userData.email;

  await prisma.channel.upsert({
    where: {
      platform: "LINKEDIN",
      platformUserId
    },
    update: {
      accessToken,
      accessTokenExpiresIn,
    },
    create: {
      platform: "LINKEDIN",
      accessToken,
      accessTokenExpiresIn,
      platformUserId,
      platformUserName,
      platformUserImg,
      platformUserEmail,
      userId: user.id,
      isActive: true,
    }
  })

  const redirectTo = JSON.parse(decodeURIComponent(state)) as { redirect: string };
  return NextResponse.redirect(`${BASE_URL}${redirectTo.redirect}`);
});

async function getAccessToken(code: string) {
  const params = new URLSearchParams();
  params.set("grant_type", "authorization_code");
  params.set("code", code);
  params.set("client_id", CLIENT_ID);
  params.set("redirect_uri", REDIRECT_URI);
  params.set("client_secret", CLIENT_SECRET);
  const url = "https://www.linkedin.com/oauth/v2/accessToken";
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new BuildinpubliqError(res.status, res.statusText);
  }

  return await res.json();
}

async function getUserData(accessToken: string) {
  const url = "https://api.linkedin.com/v2/userinfo";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new BuildinpubliqError(res.status, res.statusText);
  }

  return await res.json();
}