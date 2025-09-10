"use server";

import { prisma } from "@buildinpubliq/db";
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import type { AddRepoData, GithubRepository } from "./_components/add-repo-form";

export async function addRepo(
  data: Omit<AddRepoData, "repository"> & { selectedRepo?: GithubRepository }
) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const selectedRepo = data.selectedRepo;

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
    title: data.title,
    description: data.description,
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