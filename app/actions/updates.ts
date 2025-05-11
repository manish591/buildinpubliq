"use server";

import { auth } from "@/auth";
import { STATUS } from "@/constants/response";
import { prisma } from "@/prisma/src";

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

export async function createNewUpdate() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }


}