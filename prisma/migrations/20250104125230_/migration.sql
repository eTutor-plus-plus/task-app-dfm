/*
  Warnings:

  - You are about to drop the column `allow_additional_elements` on the `evaluationCriterias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "evaluationCriterias" DROP COLUMN "allow_additional_elements",
ADD COLUMN     "is_partial_solution" BOOLEAN NOT NULL DEFAULT false;
