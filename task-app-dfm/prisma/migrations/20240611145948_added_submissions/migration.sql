-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'DE');

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "assignment_id" VARCHAR(255) NOT NULL,
    "task_id" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "feedback_level" INTEGER NOT NULL,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" SERIAL NOT NULL,
    "input" VARCHAR(1000) NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "submissions_submissionId_key" ON "submissions"("submissionId");

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
