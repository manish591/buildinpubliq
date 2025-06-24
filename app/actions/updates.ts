"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { SocialPlatform, Status } from "@prisma/client";
import { TProjectUpdate } from "@/components/project-update-form";

export type TUpdate = {
  tagline: string,
  description: string,
  platform: SocialPlatform[],
  status: keyof typeof Status,
  scheduledDate: Date | null,
  projectId: string
}

export default async function getAllProjectUpdates(repoId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const data = await prisma.projectUpdate.findMany({
    where: {
      projectId: repoId,
    }
  });

  return data;
}

export async function getAllUpdates() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }


  const data = await prisma.projectUpdate.findMany({
    include: {
      project: true
    }
  });

  return data;
}

export async function createNewUpdate(data: TProjectUpdate) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  await prisma.projectUpdate.create({
    data: {
      tagline: data.tagline,
      description: data.description,
      projectId: data.projectId,
      userId: session.user.id as string,
      status: data.status,
      channel: data.platform,
      scheduledAt: data.scheduledAt!
    }
  });
}

export async function editProjectUpdate(data: TProjectUpdate) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  await prisma.projectUpdate.update({
    where: {
      id: data.id,
      projectId: data.projectId,
      userId: session.user.id
    },
    data: {
      tagline: data.tagline,
      description: data.description,
      projectId: data.projectId,
      userId: session.user.id as string,
      status: data.status,
      channel: data.platform,
      scheduledAt: data.scheduledAt
    }
  });
}

export async function deleteProjectUpdate(projectUpdateId: string, projectId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated")
  }

  const isProjectUpdateExists = await prisma.projectUpdate.findFirst({
    where: {
      id: projectUpdateId,
      projectId,
      userId: session.user.id
    }
  });

  if (!isProjectUpdateExists) {
    throw new Error("project doesn't exists");
  }

  await prisma.projectUpdate.delete({
    where: {
      id: isProjectUpdateExists.id
    }
  });
}