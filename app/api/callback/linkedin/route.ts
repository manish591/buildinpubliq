import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { SocialPlatform } from "@prisma/client";
import { BASE_URL } from "@/constants";

const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = `${BASE_URL}/callback/linkedin`;

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json(
      { message: "unauthenticated" },
      { status: 401 }
    );
  }

  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get("code");

  const res = await fetch(`
    https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });

  const data = await res.json();

  await prisma.channel.create({
    data: {
      platform: SocialPlatform.LINKEDIN,
      accessToken: data.access_token,
      expiresIn: new Date(Date.now() + data.expires_in * 1000),
      accountName: req.auth.user.name ?? "",
      userId: req.auth.user.id ?? "",
      IDToken: data.id_token
    }
  });

  return NextResponse.redirect(`${BASE_URL}/profile`);
});