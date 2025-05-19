import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { SocialPlatform } from "@prisma/client";

const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/callback/linkedin";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get("code");

  const res = await fetch(`
    https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`, {
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
      accountName: session.user.name ?? "",
      userId: session.user.id ?? "",
      IDToken: data.id_token
    }
  });

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile`);
}