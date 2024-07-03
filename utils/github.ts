import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/prisma/src';

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
let GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, '\n');

if(!GITHUB_APP_PRIVATE_KEY) {
  GITHUB_APP_PRIVATE_KEY = "";
}

export const generateJWT = () => {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (10 * 60),
    iss: GITHUB_APP_ID,
  };

  return jwt.sign(payload, GITHUB_APP_PRIVATE_KEY, { algorithm: 'RS256' });
};

export const getInstallationAccessToken = async (installationId: string) => {
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

export async function removeGithubInstallationId() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
  } catch(err) {

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