/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Channel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isActive` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("id");
