import { google } from '@ai-sdk/google';
import { prisma } from '@buildinpubliq/db';
import { redis } from '@buildinpubliq/redis';
import { generateObject } from 'ai';
import { type Job, Worker } from 'bullmq';
import { z } from 'zod';

type UninstallGithubIntegrationEventPayload = {
  installationId: string;
};

type GenerateIdeaEventPayload = {
  repoId: string;
  title: string;
  description: string;
};

type GenerateIdeaUsingAIPayload = {
  repoName: string;
  pullRequestTitle: string;
  pullRequestDescription: string;
};

type CreateIdeaData = {
  userId: string;
  title: string;
  content: string;
};

async function generateIdeaUsingAI(payload: GenerateIdeaUsingAIPayload) {
  const { object } = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: z.object({
      title: z.string(),
      content: z.string(),
    }),
    system: `You are a professional social media manager and content 
            strategist with years of experience creating viral posts for developers and tech 
            communities. You know how to write posts that grab attention, feel casual and fun, 
            and naturally include emojis. You are excellent at crafting posts that are shareable, 
            engaging, and include the right hashtags.`,
    prompt: `I will provide you with the following GitHub repository information:
            - Repository Name: ${payload.repoName}
            - Pull Request Title: ${payload.pullRequestTitle}
            - Pull Request Description: ${payload.pullRequestDescription}

            Your task is to create a single viral-ready social media post based on this information.

            Guidelines:
            1. Keep it casual, friendly, and engaging.
            2. Include emojis naturally where they fit, but don't overdo it.
            3. Make the post catchy and potentially shareable to go viral.
            4. Include 3-5 relevant hashtags at the end.`,
  });

  return object;
}

async function createIdea({ title, content, userId }: CreateIdeaData) {
  await prisma.idea.create({
    data: {
      title,
      content,
      userId,
      isArchived: false,
    },
  });
}

async function handleGenerateIdeaEvent(payload: GenerateIdeaEventPayload) {
  const repoData = await prisma.githubRepository.findUnique({
    where: {
      repoId: payload.repoId,
    },
  });

  if (!repoData) {
    throw new Error("Repo with repo id does not exists");
  }

  const userId = repoData.userId;
  const repoName = repoData.fullName;
  const pullRequestTitle = payload.title;
  const pullRequestDescription = payload.description;

  const { title, content } = await generateIdeaUsingAI({
    repoName,
    pullRequestTitle,
    pullRequestDescription,
  });

  await createIdea({ title, content, userId });
}

async function handleUninstallGithubIntegrationEvent(
  payload: UninstallGithubIntegrationEventPayload,
) {
  const installationId = payload.installationId;

  await prisma.githubIntegration.update({
    where: {
      installationId,
    },
    data: {
      isActive: false,
    },
  });
}

async function workerCallback(job: Job) {
  const jobName = job.name;

  if (jobName === 'uninstall-github-integration') {
    const jobData = job.data as UninstallGithubIntegrationEventPayload;
    await handleUninstallGithubIntegrationEvent(jobData);
    return;
  }

  if (jobName === 'generate-idea') {
    const jobData = job.data as GenerateIdeaEventPayload;
    await handleGenerateIdeaEvent(jobData);
    return;
  }

  console.log("Unknown job name: ", jobName);
}

const worker = new Worker('github-events', workerCallback, {
  connection: redis
});

worker.on('error', console.error);
