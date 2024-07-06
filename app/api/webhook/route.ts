import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/prisma/src";
import getProjectDetails from "@/app/actions/projects";
import { STATUS } from "@/constants/response";
import { Type } from "@prisma/client";
import { generateTwitterPost } from "@/app/actions/langchain";

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

  if(githubEvent === "pull_request" && data && data.action === "closed" && data.pull_request.merged) {
    const repositoryId = String(data.repository.id);
    const projectDetails = await getProjectDetails(repositoryId);

    if(projectDetails.status === STATUS.SUCCESS && projectDetails.data) {
      const feat_title = data.pull_request.title;
      const feat_desc = data.pull_request.body;
      const title = projectDetails.data.title;
      const description = projectDetails.data.description;
      const projectId = projectDetails.data.repoId;

      const aiResponse = await generateTwitterPost(title, description, feat_title, feat_desc);

      const projectUpdateData = {
        tagline: aiResponse.tagline,
        description: aiResponse.description,
        type: Type.PULL_REQUEST,
        projectId
      }

      await db.projectUpdate.create({
        data: projectUpdateData
      });
    }
  }

  return NextResponse.json({ message: "Accepted" }, { status: 202 });
}