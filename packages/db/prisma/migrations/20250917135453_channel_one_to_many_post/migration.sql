/*
  Warnings:

  - You are about to drop the `PostOnChannel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostOnChannel" DROP CONSTRAINT "PostOnChannel_channelId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnChannel" DROP CONSTRAINT "PostOnChannel_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "channelId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ADD COLUMN     "status" "PostStatus" NOT NULL;

-- DropTable
DROP TABLE "PostOnChannel";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
