"use server";

import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { Repository } from "@/app/actions/github";
import { STATUS } from "@/constants/response";

export async function createProject(title: string, description: string, selectedRepo: Repository) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
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
      userId: session.user.id,
    }

    await prisma.project.create({
      data: projectData
    });

    return {
      status: STATUS.SUCCESS,
      message: "Successfully created project"
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
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

export async function editProject(id: string, title: string, description: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        status: STATUS.ERROR,
        message: "Unauthorized"
      }
    }

    await prisma.project.update({
      where: {
        id
      },
      data: {
        title,
        description
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "successfully edited project"
    }
  } catch (err) {
    return {
      status: STATUS.ERROR,
      message: "An internal server erorr occured"
    }
  }
}

export async function getAllProjects() {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        status: STATUS.ERROR,
        message: "Unauthorized",
        data: [],
      }
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id
      }
    });

    return {
      status: STATUS.SUCCESS,
      message: "Successfully returned the data",
      data: projects
    }
  } catch (err) {
    return {
      status: STATUS.ERROR,
      message: "An internal Server error occured",
      data: []
    }
  }
}

export default async function getProjectDetails(id: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const data = await prisma.project.findFirst({
    where: {
      OR: [
        { repoId: id },
        { id }
      ]
    }
  });

  return data;
}