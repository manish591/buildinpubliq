"use server";

import { prisma } from "@buildinpubliq/db";
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import type { CreateProjectData, GithubRepository } from "./new/_components/create-project-form";

export async function createProject(
  data: Omit<CreateProjectData, "repository"> & { selectedRepo?: GithubRepository }
) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const selectedRepo = data.selectedRepo;

  if (!selectedRepo) {
    throw new Error("Repository is required to create project");
  }

  const projectWithRepoExists = await prisma.project.findFirst(
    {
      where: {
        repoId: String(selectedRepo.id),
      },
    },
  );

  if (projectWithRepoExists) {
    throw new Error('project with selected repo already exists');
  }

  const projectData = {
    userId: user.id,
    title: data.title,
    description: data.description,
    repoId: String(selectedRepo.id),
    fullName: selectedRepo.full_name,
    repositoryUrl: selectedRepo.html_url,
    defaultBranch: selectedRepo.default_branch,
    language: selectedRepo.language,
    repositoryUpdatedAt: selectedRepo.updated_at,
  };

  await prisma.project.create({
    data: projectData,
  });
}

export async function editProject(
  id: string,
  title: string,
  description: string,
) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.project.update({
    where: {
      id,
      userId: user.id
    },
    data: {
      title,
      description,
    },
  });
}