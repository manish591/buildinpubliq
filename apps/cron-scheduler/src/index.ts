import { prisma } from "@buildinpubliq/db";
import { redis } from "@buildinpubliq/redis";
import { Queue } from "bullmq";

const scheduledPostsQueue = new Queue("scheduled-posts", {
  connection: redis
});

async function main() {
  const postsAvailableToPost = await prisma.post.findMany({
    where: {
      status: "SCHEDULED",
      scheduledAt: {
        lte: new Date()
      }
    }
  });

  for (const post of postsAvailableToPost) {
    await scheduledPostsQueue.add("upload-post", {
      userId: post.userId,
      postId: post.id,
      channelId: post.channelId,
    });

    await prisma.post.update({
      where: {
        id: post.id
      },
      data: {
        status: "PUBLISHING"
      }
    });
  }
}

main().catch(console.error);