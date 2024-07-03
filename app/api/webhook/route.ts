import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/prisma/src";

// implement redis to handle the webhook asynchonously and respond within 10 seconds

export async function POST(req: NextRequest) {
  const payload = JSON.stringify(req.body);
  const signature = req.headers.get("X-Hub-Signature-256");
  const webhookSecret = process.env.GITHUB_APP_WEBHOOK_SECRET ?? "";
  
  if(!signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const expectedSignature = `sha256=${createHmac('sha256', webhookSecret).update(payload).digest('hex')}`;
  const receivedBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const isValid = timingSafeEqual(receivedBuffer, expectedBuffer);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const githubEvent = req.headers.get("X-Github-Event");
  const data = await req.json();

  if(githubEvent === "installation" && data && data.action === "deleted") {
    const githubInstallationId = String(data.installation.id);

    await db.githubIntegration.update({
      data: {
        isActive: false,
      },
      where: {
        installationId: githubInstallationId
      }
    });
  }

  return NextResponse.json({ message: "Accepted" }, { status: 202 });
}