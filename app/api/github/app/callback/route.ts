import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/prisma/src";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.userId ?? "";

  if(!session) {
    return NextResponse.json(
      { message: "Unauthorized" }, 
      { status: 401 }
    );
  }

  const searchParams = new URL(req.url).searchParams;
  const installationId = searchParams.get("installation_id");
  const setupAction = searchParams.get("setup_action");

  if(setupAction === "install" && installationId) {
    await db.githubIntegration.create({
      data: {
        installationId,
        userId,
        isActive: true
      }
    });
    
    return NextResponse.redirect("http://localhost:3000/dashboard/projects");
  } else {
    return NextResponse.json({ message: "Unsupported action" }, { status: 400 });
  }
}