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
  channelId: string;
};

async function postToLinkedin({
  content,
  accessToken,
  linkedinUserId,
  channelId,
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

  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    const status = data.status;

    if (status === 401) {
      const errorCode = data.serviceErrorCode;

      if (errorCode === 65600) {
        await prisma.channel.update({
          where: {
            id: channelId,
          },
          data: {
            isActive: false,
          },
        });
      }
    }

    console.log("Failed to upload post to linkedin");
    throw new Error("Failed to upload post to linkedin");
  }
}

async function postToTwitter() {

}

async function workerCallback(job: Job) {
  const { channelId, postId } = job.data as UploadPostEventPayload;

  try {
    const channelData = await prisma.channel.findUnique({
      where: {
        id: channelId
      }
    });

    const postData = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!postData || !channelData) {
      throw new Error("Failed to retreive post and channel data");
    }

    if (channelData.platform === "LINKEDIN") {
      await postToLinkedin({
        channelId: channelData.id,
        content: postData.content,
        accessToken: channelData.accessToken,
        linkedinUserId: channelData.platformUserId
      });
    } else if (channelData.platform === "TWITTER") {
      await postToTwitter();
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        status: "PUBLISHED"
      }
    });

    console.log("Upload post successfully");
  } catch (err) {
    console.log("Error occured while processing job: ", err);
    const attemptsMade = job.attemptsMade + 1;
    const maxAttempts = job.opts.attempts ?? 1;

    if (attemptsMade >= maxAttempts) {
      await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          status: "FAILED"
        }
      });
    }

    throw new Error("Error while processing the job");
  }
}

const worker = new Worker('scheduled-posts', workerCallback, {
  connection: redis,
});

worker.on('error', (err) => {
  console.log("Error occured while uploading post", err);
});
