import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const searchParams = new URL(req.url).searchParams;
  const installationId = searchParams.get("installation_id");
  const setupAction = searchParams.get("setup_action");

  if (setupAction === "install" && installationId) {
    await prisma.githubIntegration.create({
      data: {
        installationId,
        userId: req.auth.user.id ?? "",
        isActive: true
      }
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
  } else {
    return NextResponse.json({ message: "Unsupported action" }, { status: 400 });
  }
});