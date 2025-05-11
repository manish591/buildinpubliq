/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `expiresIn` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "expiredAt",
ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "accountName" DROP NOT NULL;
