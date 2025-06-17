"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { generateJWT } from "@/lib/github";

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
}

export async function getInstallationAccessToken(installationId: string): Promise<string | null> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const jwt = generateJWT();
  const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: 'application/vnd.github+json',
    },
  });

  const data = await response.json();

  return data.token ?? null;
};

export async function getGithubRepositories() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const githubData = await prisma.githubIntegration.findFirst({
    where: {
      userId: session?.user?.id,
      isActive: true,
    }
  });

  if (!githubData) {
    throw new Error("github data not found");
  }

  const installationId = githubData.installationId;
  const installationToken = await getInstallationAccessToken(installationId);

  if (!installationToken) {
    throw new Error("installation token not found");
  }

  let allRepositories: Repository[] = [];
  let pageNumber = 1;

  while (true) {
    const response = await fetch(`https://api.github.com/installation/repositories?page=${pageNumber}&per_page=${10}`, {
      headers: {
        Authorization: `Bearer ${installationToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const data = await response.json();

    if (data.repositories.length == 0) {
      break;
    }

    allRepositories = [...allRepositories, ...data.repositories];
    pageNumber++;
  }

  return allRepositories;
}

export async function isGithubIntegrationInstalled(userId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const githubDetails = await prisma.githubIntegration.findFirst({
    where: {
      userId: userId,
      isActive: true,
    }
  });

  return githubDetails;
}