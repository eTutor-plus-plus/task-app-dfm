/*
  Warnings:

  - You are about to drop the column `allow_additional_elements` on the `gradingCriterias` table. All the data in the column will be lost.
  - You are about to drop the column `allow_incorrect_fact_class` on the `gradingCriterias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "evaluationCriterias" ADD COLUMN     "allow_additional_elements" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allow_incorrect_fact_class" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "gradingCriterias" DROP COLUMN "allow_additional_elements",
DROP COLUMN "allow_incorrect_fact_class";
