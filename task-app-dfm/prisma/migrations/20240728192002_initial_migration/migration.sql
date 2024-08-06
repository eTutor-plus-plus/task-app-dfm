/*
  Warnings:

  - A unique constraint covering the columns `[submission_id]` on the table `grading` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "grading_submission_id_key" ON "grading"("submission_id");
