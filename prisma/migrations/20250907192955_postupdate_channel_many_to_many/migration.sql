/*
  Warnings:

  - You are about to drop the column `channel` on the `ProjectUpdate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectUpdate" DROP COLUMN "channel";

-- CreateTable
CREATE TABLE "ProjectUpdateOnChannel" (
    "channelId" TEXT NOT NULL,
    "projectUpdateId" TEXT NOT NULL,

    CONSTRAINT "ProjectUpdateOnChannel_pkey" PRIMARY KEY ("channelId","projectUpdateId")
);

-- AddForeignKey
ALTER TABLE "ProjectUpdateOnChannel" ADD CONSTRAINT "ProjectUpdateOnChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdateOnChannel" ADD CONSTRAINT "ProjectUpdateOnChannel_projectUpdateId_fkey" FOREIGN KEY ("projectUpdateId") REFERENCES "ProjectUpdate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
