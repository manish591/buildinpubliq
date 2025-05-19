"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { Repository } from "@/app/actions/github";

export async function createProject(title: string, description: string, selectedRepo: Repository) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
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
    userId: session.user.id ?? "",
  }

  await prisma.project.create({
    data: projectData
  });
}

export async function editProject(id: string, title: string, description: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
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
}

export async function getAllProjects() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const data = await prisma.project.findMany({
    where: {
      userId: session.user.id
    }
  });

  return data;
}

export default async function getProjectDetails(id: string) {
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