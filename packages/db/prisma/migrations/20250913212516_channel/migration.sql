/*
  Warnings:

  - You are about to drop the column `IDToken` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `accountEmail` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `accountImg` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `accountName` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `expiresIn` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platformUserId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessTokenExpiresIn` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformUserId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExpiresIn` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `platform` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('TWITTER', 'LINKEDIN');

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "IDToken",
DROP COLUMN "accountEmail",
DROP COLUMN "accountImg",
DROP COLUMN "accountName",
DROP COLUMN "expiresIn",
ADD COLUMN     "accessTokenExpiresIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "platformIDToken" TEXT,
ADD COLUMN     "platformUserEmail" TEXT,
ADD COLUMN     "platformUserId" TEXT NOT NULL,
ADD COLUMN     "platformUserImg" TEXT,
ADD COLUMN     "platformUserName" TEXT,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
ADD COLUMN     "refreshTokenExpiresIn" TIMESTAMP(3) NOT NULL,
DROP COLUMN "platform",
ADD COLUMN     "platform" "Platform" NOT NULL;

-- DropEnum
DROP TYPE "SocialPlatform";

-- CreateIndex
CREATE UNIQUE INDEX "Channel_platformUserId_key" ON "Channel"("platformUserId");
