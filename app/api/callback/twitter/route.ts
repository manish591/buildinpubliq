import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { SocialPlatform } from "@prisma/client";
import { BASE_URL } from "@/constants";

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const REDIRECT_URI = `${BASE_URL}/api/callback/twitter`;
const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json(
      { message: "unauthenticated" },
      { status: 401 }
    );
  }

  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "unauthenticated" },
      { status: 401 }
    );
  }

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', CLIENT_ID!);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('code_verifier', 'challenge');

  const res = await fetch(`https://api.x.com/2/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${basicAuth}`
    },
    body: params.toString()
  });

  const data = await res.json();

  await prisma.channel.upsert({
    where: {
      userId_platform: {
        userId: req.auth.user.id ?? "",
        platform: SocialPlatform.TWITTER
      }
    },
    update: {
      accessToken: data.access_token,
      expiresIn: new Date(Date.now() + data.expires_in * 1000),
    },
    create: {
      platform: SocialPlatform.TWITTER,
      accessToken: data.access_token,
      expiresIn: new Date(Date.now() + data.expires_in * 1000),
      accountName: req.auth.user.name ?? "",
      userId: req.auth.user.id ?? "",
    }
  });

  return NextResponse.redirect(`${BASE_URL}/profile`);
});