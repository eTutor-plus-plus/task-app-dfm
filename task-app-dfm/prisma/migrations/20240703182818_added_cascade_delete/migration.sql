-- DropForeignKey
ALTER TABLE "evaluationCriteria" DROP CONSTRAINT "evaluationCriteria_additionalDataId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_additionalDataId_fkey";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluationCriteria" ADD CONSTRAINT "evaluationCriteria_additionalDataId_fkey" FOREIGN KEY ("additionalDataId") REFERENCES "additionalData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
