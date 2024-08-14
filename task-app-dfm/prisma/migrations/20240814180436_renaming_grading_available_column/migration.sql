/*
  Warnings:

  - You are about to drop the column `gradingAvailable` on the `submissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "gradingAvailable",
ADD COLUMN     "grading_available" BOOLEAN NOT NULL DEFAULT false;
