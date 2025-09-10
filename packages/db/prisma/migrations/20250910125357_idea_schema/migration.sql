/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectUpdate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectUpdateOnChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdate" DROP CONSTRAINT "ProjectUpdate_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdate" DROP CONSTRAINT "ProjectUpdate_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdateOnChannel" DROP CONSTRAINT "ProjectUpdateOnChannel_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpdateOnChannel" DROP CONSTRAINT "ProjectUpdateOnChannel_projectUpdateId_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectUpdate";

-- DropTable
DROP TABLE "ProjectUpdateOnChannel";

-- CreateTable
CREATE TABLE "GithubRepository" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "defaultBranch" TEXT NOT NULL,
    "language" TEXT,
    "repositoryUpdatedAt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "githubRepositoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "postedAt" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostOnChannel" (
    "channelId" TEXT NOT NULL,
    "projectUpdateId" TEXT NOT NULL,

    CONSTRAINT "PostOnChannel_pkey" PRIMARY KEY ("channelId","projectUpdateId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepository_repoId_key" ON "GithubRepository"("repoId");

-- AddForeignKey
ALTER TABLE "GithubRepository" ADD CONSTRAINT "GithubRepository_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_githubRepositoryId_fkey" FOREIGN KEY ("githubRepositoryId") REFERENCES "GithubRepository"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnChannel" ADD CONSTRAINT "PostOnChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnChannel" ADD CONSTRAINT "PostOnChannel_projectUpdateId_fkey" FOREIGN KEY ("projectUpdateId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
