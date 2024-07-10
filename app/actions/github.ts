"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { db } from "@/prisma/src";
import { generateJWT } from "@/utils/github";

export interface Repository {
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

export async function getInstallationAccessToken(installationId: string) {
  try {
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


    if(!response.ok) {
      return "";
    }

    return data.token;
  } catch(err) {
    return "";
  }
};

export async function getGithubRepositries() {
  try {
    const session = await getServerSession(authOptions);

    if(!session) {
      return [];
    }

    const githubData = await db.githubIntegration.findFirst({
      where: {
        userId: session?.userId,
        isActive: true,
      }
    });

    if(!githubData) {
      return [];
    }

    const installationId = githubData.installationId;
    const installationToken = await getInstallationAccessToken(installationId);

    if(!installationToken) {
      return [];
    }

    // when you will access the last page it will not have the link header of next

    const response = await fetch(`https://api.github.com/installation/repositories?page=${1}&per_page=${100}`, {
      headers: {
        Authorization: `Bearer ${installationToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const data = await response.json();
    return data.repositories;
  } catch(err) {
    return [];
  }
}

export async function isGithubIntegrationInstalled(userId: string) {
  const githubDetails = await db.githubIntegration.findFirst({
    where: {
      userId: userId,
      isActive: true,
    }
  });

  if(githubDetails) {
    return true;
  }

  return false;
}