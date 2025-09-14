/*
  Warnings:

  - You are about to drop the column `platformIDToken` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "platformIDToken",
ALTER COLUMN "refreshToken" DROP NOT NULL;
