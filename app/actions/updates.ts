"use server";

import { auth } from "@/auth";
import { STATUS } from "@/constants/response";
import { prisma } from "@/prisma/src";
import { SocialPlatform, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type TUpdate = {
  tagline: string,
  description: string,
  platform: SocialPlatform[],
  status: keyof typeof Status,
  scheduledDate: Date | null,
  projectId: string
}

export default async function getAllProjectUpdates(repoId: string) {
  try {
    const data = await prisma.projectUpdate.findMany({
      where: {
        projectId: repoId,
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "Data returned successfully",
      data
    }
  } catch (err) {
    return {
      status: STATUS.ERROR,
      message: "An internal server error occured",
      data: []
    }
  }
}

export async function getAllUpdates() {
  try {
    const data = await prisma.projectUpdate.findMany({
      include: {
        project: true
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "Data returned successfully",
      data
    }
  } catch (err) {
    return {
      status: STATUS.ERROR,
      message: "An internal server error occured",
      data: []
    }
  }
}

export async function createNewUpdate(data: TUpdate) {
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
      scheduledAt: data.scheduledDate
    }
  });

  revalidatePath(`/dashboard/projects/${data.projectId}`);
}