"use server";

import { prisma } from "@buildinpubliq/db";
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import type { GithubRepository } from "./_components/add-repository";
import type { CreateIdeaData } from "./_components/create-idea-form";

export async function addRepository(selectedRepo: GithubRepository) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  if (!selectedRepo) {
    throw new Error("Repository is required to create project");
  }

  const projectWithRepoExists = await prisma.githubRepository.findFirst(
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
    repoId: String(selectedRepo.id),
    fullName: selectedRepo.full_name,
    repositoryUrl: selectedRepo.html_url,
    defaultBranch: selectedRepo.default_branch,
    language: selectedRepo.language,
    repositoryUpdatedAt: selectedRepo.updated_at,
  };

  await prisma.githubRepository.create({
    data: projectData,
  });
}

export async function createIdea(data: CreateIdeaData) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.idea.create({
    data: {
      title: data.title,
      content: data.content,
      userId: user.id,
      isArchived: false,
    }
  });
}