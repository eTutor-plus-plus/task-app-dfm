/*
  Warnings:

  - Added the required column `mode` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('RUN', 'DIAGNOSE', 'SUBMIT');

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "mode" "Mode" NOT NULL;
