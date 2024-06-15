-- CreateTable
CREATE TABLE "grading" (
    "id" TEXT NOT NULL,
    "submission_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "grading_pkey" PRIMARY KEY ("id")
);
