import { prisma } from "@buildinpubliq/db";
import { redis } from "@buildinpubliq/redis";
import { Queue } from "bullmq";
import cron from "node-cron";

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

  await scheduledPostsQueue.close();
}

cron.schedule('*/1 * * * *', () => {
  main().catch(console.error);
});