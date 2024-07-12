/*
  Warnings:

  - The primary key for the `additionalData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `task_id` on the `grading` table. All the data in the column will be lost.
  - The primary key for the `submission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `evaluationCriteria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "evaluationCriteria" DROP CONSTRAINT "evaluationCriteria_additionalDataId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_additionalDataId_fkey";

-- AlterTable
ALTER TABLE "additionalData" DROP CONSTRAINT "additionalData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "additionalData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "additionalData_id_seq";

-- AlterTable
ALTER TABLE "grading" DROP COLUMN "task_id",
ADD COLUMN     "generalFeedback" VARCHAR(5000),
ALTER COLUMN "submission_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "submission" DROP CONSTRAINT "submission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "input" SET DATA TYPE VARCHAR(5000),
ADD CONSTRAINT "submission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "submission_id_seq";

-- AlterTable
ALTER TABLE "submissions" ALTER COLUMN "submissionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "additionalDataId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "evaluationCriteria";

-- CreateTable
CREATE TABLE "evaluationCriterias" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "points" DOUBLE PRECISION NOT NULL,
    "subtree" VARCHAR(5000) NOT NULL,
    "abstractSyntaxTree" JSON NOT NULL,
    "additionalDataId" TEXT NOT NULL,

    CONSTRAINT "evaluationCriterias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradingCriterias" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "points" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "feedback" VARCHAR(5000),
    "gradingId" TEXT NOT NULL,

    CONSTRAINT "gradingCriterias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluationCriterias" ADD CONSTRAINT "evaluationCriterias_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grading" ADD CONSTRAINT "grading_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradingCriterias" ADD CONSTRAINT "gradingCriterias_gradingId_fkey" FOREIGN KEY ("gradingId") REFERENCES "grading"("id") ON DELETE CASCADE ON UPDATE CASCADE;
