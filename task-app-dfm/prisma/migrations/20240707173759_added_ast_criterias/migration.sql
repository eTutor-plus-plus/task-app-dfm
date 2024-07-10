/*
  Warnings:

  - Added the required column `abstractSyntaxTree` to the `evaluationCriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluationCriteria" ADD COLUMN     "abstractSyntaxTree" JSON NOT NULL;
