-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'DE');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('RUN', 'DIAGNOSE', 'SUBMIT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'READY_FOR_APPROVAL', 'APPROVED');

-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL,
    "task_group_id" INTEGER,
    "max_points" DOUBLE PRECISION NOT NULL,
    "task_type" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "additionalDataId" TEXT NOT NULL,
    "uniqueNames" TEXT[],

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalData" (
    "id" TEXT NOT NULL,
    "solution" VARCHAR(5000) NOT NULL,
    "descriptionDe" VARCHAR(5000),
    "descriptionEn" VARCHAR(5000),
    "difficulty" INTEGER,
    "abstractSyntaxTree" JSON NOT NULL,

    CONSTRAINT "additionalData_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "assignment_id" VARCHAR(255) NOT NULL,
    "task_id" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "mode" "Mode" NOT NULL,
    "feedback_level" INTEGER NOT NULL,
    "submissionId" TEXT NOT NULL,
    "grading_available" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" TEXT NOT NULL,
    "input" VARCHAR(5000) NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grading" (
    "id" TEXT NOT NULL,
    "submission_id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "generalFeedback" VARCHAR(5000),

    CONSTRAINT "grading_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "tasks_additionalDataId_key" ON "tasks"("additionalDataId");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_submissionId_key" ON "submissions"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "grading_submission_id_key" ON "grading"("submission_id");

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
