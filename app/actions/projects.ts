"use server";

import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/prisma/src";
import { Repository } from "@/app/actions/github";
import { STATUS } from "@/constants/response";

export async function createProject(title: string, description: string, selectedRepo: Repository) {
  try {
    const session = await getServerSession(authOptions);

    if(!session?.user || !session?.userId) {
      return {
        status: STATUS.ERROR,
        message: "Unauthorized"
      }
    }

    const projectData = {
      title,
      description,
      repoId: String(selectedRepo.id),
      fullName: selectedRepo.full_name,
      repositoryUrl: selectedRepo.html_url,
      defaultBranch: selectedRepo.default_branch,
      language: selectedRepo.language,
      repositoryUpdatedAt: selectedRepo.pushed_at,
      userId: session.userId,
    }

    await db.project.create({
      data: projectData
    });

    return {
      status: STATUS.SUCCESS,
      message: "Successfully created project"
    }
  } catch(err) {
    if(err instanceof Prisma.PrismaClientKnownRequestError) {
      if(err.code === "P2002") {
        return {
          status: STATUS.ERROR,
          message: "Project corresponds to repository exits"
        }
      }
    }

    return {
      status: STATUS.ERROR,
      message: "An internal server erorr occured"
    }
  }
}

export async function getAllProjects() {
  try {
    const session = await getServerSession(authOptions);

    if(!session?.user || !session?.userId) {
      return {
        status: STATUS.ERROR,
        message: "Unauthorized",
        data: [],
      }
    }

    const projects = await db.project.findMany({
      where: {
        userId: session.userId
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "Successfully returned the data",
      data: projects
    }
  } catch(err) {
    return {
      status: STATUS.ERROR,
      message: "An internal Server error occured",
      data: []
    }
  }
}

export default async function getProjectDetails(id: string) {
  try {
    const data = await db.project.findFirst({
      where: {
        OR: [
          { repoId: id },
          { id }
        ]
      }
    });

    if(!data) {
      return {
        status: STATUS.ERROR,
        message: "Not found",
        data: null
      }
    }

    return {
      status: STATUS.SUCCESS,
      message: "successfully returned project details",
      data
    }
  } catch(err) {
    return {
      status: STATUS.ERROR,
      message: "An internal server error occured",
      data: null
    }
  }
}