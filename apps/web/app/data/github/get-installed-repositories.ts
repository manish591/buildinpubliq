import "server-only";
import { prisma } from "@buildinpubliq/db";
import { redirect } from "next/navigation";
import type { GithubRepository } from "@/app/(main)/dashboard/(pages)/ideas/_components/add-repo-form";
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import { getGithubIntegrationToken } from "./get-github-integration-token";

export async function getInstalledRepositories(): Promise<GithubRepository[]> {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/auth");
  }

  const githubIntegrationData = await prisma.githubIntegration.findFirst({
    where: {
      userId: user.id,
      isActive: true,
    },
  });

  if (!githubIntegrationData) {
    throw new Error('Github integration not found');
  }

  const installationId = githubIntegrationData.installationId;
  const installationToken = await getGithubIntegrationToken(installationId);

  let allRepositories: GithubRepository[] = [];
  let pageNumber = 1;

  while (true) {
    const res = await fetch(
      `https://api.github.com/installation/repositories?page=${pageNumber}&per_page=${100}`,
      {
        headers: {
          Authorization: `Bearer ${installationToken}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    const data = await res.json();

    if (data.repositories.length === 0) {
      break;
    }

    allRepositories = [...allRepositories, ...data.repositories];
    pageNumber++;
  }

  return allRepositories.sort((repoOne, repoTwo) => repoOne.updated_at > repoTwo.updated_at ? -1 : 1);
}