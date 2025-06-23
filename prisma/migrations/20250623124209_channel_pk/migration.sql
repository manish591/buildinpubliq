/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `GithubIntegration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("userId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "GithubIntegration_userId_key" ON "GithubIntegration"("userId");
