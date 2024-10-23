-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_task_id_fkey";

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
