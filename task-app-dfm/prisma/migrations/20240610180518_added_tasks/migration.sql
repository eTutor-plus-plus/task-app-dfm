-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'READY_FOR_APPROVAL', 'APPROVED');

-- CreateTable
CREATE TABLE "tests" (
    "id" VARCHAR(50) NOT NULL,
    "_content" VARCHAR(100) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL,
    "task_group_id" INTEGER,
    "max_points" DOUBLE PRECISION NOT NULL,
    "task_type" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "additionalDataId" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additionalData" (
    "id" SERIAL NOT NULL,
    "solution" VARCHAR(1000) NOT NULL,

    CONSTRAINT "additionalData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_additionalDataId_key" ON "tasks"("additionalDataId");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
