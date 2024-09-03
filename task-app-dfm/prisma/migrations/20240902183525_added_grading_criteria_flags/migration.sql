-- AlterTable
ALTER TABLE "gradingCriterias" ADD COLUMN     "allow_additional_elements" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allow_incorrect_fact_class" BOOLEAN NOT NULL DEFAULT false;
