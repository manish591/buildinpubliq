/*
  Warnings:

  - Made the column `scheduledAt` on table `ProjectUpdate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProjectUpdate" ALTER COLUMN "scheduledAt" SET NOT NULL;
