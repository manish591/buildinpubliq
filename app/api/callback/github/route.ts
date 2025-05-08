import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  if (!session) {
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
        userId,
        isActive: true
      }
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
  } else {
    return NextResponse.json({ message: "Unsupported action" }, { status: 400 });
  }
}