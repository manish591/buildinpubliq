"use server";

import { STATUS } from "@/constants/response";
import { db } from "@/prisma/src";

export default async function getAllProjectUpdates(repoId: string) {
  try {
    const data = await db.projectUpdate.findMany({
      where: {
        projectId: repoId,
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "Data returned successfully",
      data
    }
  } catch(err) {
    return {
      status: STATUS.ERROR,
      message: "An internal server error occured",
      data: []
    }
  }
}