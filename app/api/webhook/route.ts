import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import getProjectDetails from "@/app/actions/projects";
import { generateTwitterPost } from "@/app/actions/langchain";
import { SocialPlatform, Status } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const payload = JSON.stringify(req.body);
  const signature = req.headers.get("X-Hub-Signature-256");
  const webhookSecret = process.env.GITHUB_APP_WEBHOOK_SECRET ?? "";

  if (!signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const signatureHex = signature.replace('sha256=', '');
  const expectedSignatureHex = createHmac('sha256', webhookSecret).update(payload).digest('hex');
  const receivedBuffer = Uint8Array.from(Buffer.from(signatureHex, 'hex'));
  const expectedBuffer = Uint8Array.from(Buffer.from(expectedSignatureHex, 'hex'));
  const isValid = timingSafeEqual(receivedBuffer, expectedBuffer);

  if (!isValid) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const githubEvent = req.headers.get("X-Github-Event");
  const data = await req.json();

  if (githubEvent === "installation" && data && data.action === "deleted") {
    const githubInstallationId = String(data.installation.id);

    await prisma.githubIntegration.update({
      data: {
        isActive: false,
      },
      where: {
        installationId: githubInstallationId
      }
    });
  }

  if (githubEvent === "pull_request" && data && data.action === "closed" && data.pull_request.merged) {
    const repositoryId = String(data.repository.id);
    const projectDetails = await getProjectDetails(repositoryId);

    if (projectDetails) {
      const feat_title = data.pull_request.title;
      const feat_desc = data.pull_request.body;
      const title = projectDetails.title;
      const description = projectDetails.description;
      const projectId = projectDetails.repoId;

      const aiResponse = await generateTwitterPost(title, description, feat_title, feat_desc);

      await prisma.projectUpdate.create({
        data: {
          projectId,
          tagline: aiResponse.tagline,
          description: aiResponse.description,
          status: Status.SCHEDULED,
          scheduledAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
          userId: session.user.id ?? "",
          channel: [SocialPlatform.LINKEDIN, SocialPlatform.TWITTER]
        }
      });
    }
  }

  return NextResponse.json({ message: "Accepted" }, { status: 202 });
}