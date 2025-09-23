/*
  Warnings:

  - You are about to drop the column `accessTokenExpiresIn` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "accessTokenExpiresIn";
