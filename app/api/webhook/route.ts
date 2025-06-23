import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/prisma/src";
import getProjectDetails from "@/app/actions/projects";
import { generateTwitterPost } from "@/app/actions/langchain";
import { SocialPlatform, Status } from "@prisma/client";

type TConnectedChannel = keyof typeof SocialPlatform;

export async function POST(req: NextRequest) {
  const payload = JSON.stringify(req.body);
  const signature = req.headers.get("X-Hub-Signature-256");
  const webhookSecret = process.env.GITHUB_APP_WEBHOOK_SECRET ?? "";

  if (!signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const expectedSignatureHex = `sha256=${createHmac('sha256', webhookSecret).update(payload).digest('hex')}`;
  const receivedBuffer = Uint8Array.from(Buffer.from(signature, 'hex'));
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

      const allChannels = await prisma.channel.findMany();
      const connectedChannels: TConnectedChannel[] = [];

      if (allChannels.find(
        (channel) =>
          channel.platform == 'LINKEDIN' && channel.expiresIn >= new Date(),
      )) {
        connectedChannels.push(SocialPlatform.LINKEDIN);
      }

      if (allChannels.find(
        (channel) =>
          channel.platform == 'TWITTER' && channel.expiresIn >= new Date(),
      )) {
        connectedChannels.push(SocialPlatform.TWITTER);
      }

      const aiResponse = await generateTwitterPost(title, description, feat_title, feat_desc);

      await prisma.projectUpdate.create({
        data: {
          projectId: projectDetails.id,
          tagline: aiResponse.tagline,
          description: aiResponse.description,
          status: Status.SCHEDULED,
          scheduledAt: new Date(new Date().getTime() + 2 * 1000),
          userId: projectDetails.userId,
          channel: connectedChannels
        }
      });
    }
  }

  return NextResponse.json({ message: "Accepted" }, { status: 202 });
}