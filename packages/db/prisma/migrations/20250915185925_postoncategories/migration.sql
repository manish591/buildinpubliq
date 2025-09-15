/*
  Warnings:

  - The primary key for the `PostOnChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectUpdateId` on the `PostOnChannel` table. All the data in the column will be lost.
  - Added the required column `postId` to the `PostOnChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostOnChannel" DROP CONSTRAINT "PostOnChannel_projectUpdateId_fkey";

-- AlterTable
ALTER TABLE "PostOnChannel" DROP CONSTRAINT "PostOnChannel_pkey",
DROP COLUMN "projectUpdateId",
ADD COLUMN     "postId" TEXT NOT NULL,
ADD CONSTRAINT "PostOnChannel_pkey" PRIMARY KEY ("channelId", "postId");

-- AddForeignKey
ALTER TABLE "PostOnChannel" ADD CONSTRAINT "PostOnChannel_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
