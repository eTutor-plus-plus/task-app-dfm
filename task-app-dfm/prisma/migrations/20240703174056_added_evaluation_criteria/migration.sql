-- AlterTable
ALTER TABLE "additionalData" ALTER COLUMN "solution" SET DATA TYPE VARCHAR(5000);

-- CreateTable
CREATE TABLE "evaluationCriteria" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "points" DOUBLE PRECISION NOT NULL,
    "subtree" VARCHAR(5000) NOT NULL,
    "additionalDataId" INTEGER NOT NULL,

    CONSTRAINT "evaluationCriteria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "evaluationCriteria" ADD CONSTRAINT "evaluationCriteria_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
