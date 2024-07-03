/*
  Warnings:

  - Added the required column `abstractSyntaxTree` to the `additionalData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "additionalData" ADD COLUMN     "abstractSyntaxTree" JSON NOT NULL;
