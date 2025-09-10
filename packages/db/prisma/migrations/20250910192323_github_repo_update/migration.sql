/*
  Warnings:

  - You are about to drop the column `description` on the `GithubRepository` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `GithubRepository` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GithubRepository" DROP COLUMN "description",
DROP COLUMN "title";
