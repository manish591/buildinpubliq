/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postContent` to the `PostOnChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postStatus` to the `PostOnChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postTitle` to the `PostOnChannel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'FAILED');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
DROP COLUMN "postedAt",
DROP COLUMN "projectId",
DROP COLUMN "scheduledAt",
DROP COLUMN "status",
DROP COLUMN "tagline";

-- AlterTable
ALTER TABLE "PostOnChannel" ADD COLUMN     "postContent" TEXT NOT NULL,
ADD COLUMN     "postPublishedAt" TIMESTAMP(3),
ADD COLUMN     "postScheduledAt" TIMESTAMP(3),
ADD COLUMN     "postStatus" "PostStatus" NOT NULL,
ADD COLUMN     "postTitle" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Status";
