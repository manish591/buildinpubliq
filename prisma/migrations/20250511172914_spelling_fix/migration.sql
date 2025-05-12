/*
  Warnings:

  - The `channel` column on the `ProjectUpdate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `platform` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('TWITTER', 'LINKEDIN');

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "platform",
ADD COLUMN     "platform" "SocialPlatform" NOT NULL;

-- AlterTable
ALTER TABLE "ProjectUpdate" DROP COLUMN "channel",
ADD COLUMN     "channel" "SocialPlatform"[];

-- DropEnum
DROP TYPE "SocialPlateform";
