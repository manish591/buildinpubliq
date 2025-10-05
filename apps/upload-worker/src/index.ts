import 'dotenv/config';
import { prisma } from '@buildinpubliq/db';
import { redis } from '@buildinpubliq/redis';
import { type Job, Worker } from 'bullmq';

type UploadPostEventPayload = {
  postId: string;
  channelId: string;
};

type PostToLinkedinData = {
  content: string;
  accessToken: string;
  linkedinUserId: string;
};

type PostToTwitterData = {
  content: string;
  accessToken: string;
  channelId: string;
  refreshToken: string;
};

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

async function refreshTwitterAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null> {
  if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
    console.log('Invalid client id and client secert');
    return null;
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: TWITTER_CLIENT_ID,
  });

  const basicAuth = Buffer.from(
    `${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`,
  ).toString('base64');

  try {
    const res = await fetch('https://api.x.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error while refreshing twitter/x token:', errorData);
      return null;
    }

    const data = await res.json();
    console.log('Token refreshed successfully');
    return data;
  } catch (err) {
    console.log('Failed to refresh twitter access token', err);
    return null;
  }
}

async function postToLinkedin({
  content,
  accessToken,
  linkedinUserId,
}: PostToLinkedinData) {
  const url = 'https://api.linkedin.com/v2/ugcPosts';
  const body = JSON.stringify({
    author: `urn:li:person:${linkedinUserId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: content,
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  });
  const options = {
    method: 'post',
    maxBodyLength: Infinity,
    headers: {
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Failed to upload post to linkedin', errorData);
      const message = errorData.message;
      throw new Error(message);
    }

    console.log('Successfully published post to linkedin');
  } catch (err) {
    console.log('Error occured while publishing post to linkedin', err);
    const errMessage = err instanceof Error ? err.message : String(err);
    throw new Error(errMessage);
  }
}

async function postToTwitter({
  content,
  channelId,
  accessToken,
  refreshToken,
}: PostToTwitterData) {
  const url = 'https://api.x.com/2/tweets';
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      text: content,
    }),
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json();
      const status = errorData.status;

      if (status === 401) {
        const refreshTokenData = await refreshTwitterAccessToken(refreshToken);

        if (refreshTokenData) {
          await prisma.channel.update({
            where: {
              id: channelId,
            },
            data: {
              accessToken: refreshTokenData.access_token,
              refreshToken: refreshTokenData.refresh_token,
            },
          });

          postToTwitter({
            content,
            channelId,
            refreshToken,
            accessToken,
          });
        } else {
          const errorMessage = 'Failed to refresh twitter/x access token';
          throw new Error(errorMessage);
        }
      } else {
        const errorMessage = errorData.detail ?? 'Unexpected error occcured';
        throw new Error(errorMessage);
      }
    }

    console.log('Published the post to twitter/x successfully');
  } catch (err) {
    console.log('Error occured while publishing post to twitter/x', err);
    const errMessage = err instanceof Error ? err.message : String(err);
    throw new Error(errMessage);
  }
}

async function workerCallback(job: Job) {
  const { channelId, postId } = job.data as UploadPostEventPayload;

  try {
    const channelData = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    const postData = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postData || !channelData) {
      throw new Error('Failed to retrieve post and channel data');
    }

    if (channelData.platform === 'LINKEDIN') {
      await postToLinkedin({
        content: postData.content,
        accessToken: channelData.accessToken,
        linkedinUserId: channelData.platformUserId,
      });
    } else if (channelData.platform === 'TWITTER') {
      await postToTwitter({
        content: postData.content,
        accessToken: channelData.accessToken,
        channelId: channelData.id,
        refreshToken: channelData.refreshToken as string,
      });
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    console.log('Published the post successfully');
  } catch (err) {
    const attemptsMade = job.attemptsMade + 1;
    const maxAttempts = job.opts.attempts ?? 1;

    if (attemptsMade >= maxAttempts) {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          status: 'FAILED',
        },
      });
    }

    const errMessage = err instanceof Error ? err.message : String(err);
    throw new Error(errMessage);
  }
}

const worker = new Worker('scheduled-posts', workerCallback, {
  connection: redis,
});

worker.on('error', (err) => {
  console.log('Error occured while publishing post', err.message);
});
