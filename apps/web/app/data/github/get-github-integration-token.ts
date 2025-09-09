import "server-only";
import jwt from 'jsonwebtoken';
import { getCurrentUser } from "@/app/data/users/verify-auth-session";
import { redirect } from "next/navigation";

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
const GITHUB_APP_PRIVATE_KEY =
  process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '';

export async function getGithubIntegrationToken(installationId: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;
  const bearerToken = jwt.sign({
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
    iss: GITHUB_APP_ID,
  }, GITHUB_APP_PRIVATE_KEY, { algorithm: 'RS256' });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get github integration access token");
  }

  const data = await res.json();
  return data.token as string;
}
