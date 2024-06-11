import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsModule } from './tests/tests.module';
import { PrismaService } from './prisma.service';
import { ParserService } from './parser/parser.service';
import { VisualizationService } from './visualization/visualization.service';
import { FileService } from './file/file.service';
import { TaskGroupModule } from './task-group/task-group.module';
import { TaskModule } from './task/task.module';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';

@Module({
  imports: [TestsModule, TaskGroupModule, TaskModule],
  controllers: [AppController, SubmissionController],
  providers: [
    AppService,
    PrismaService,
    ParserService,
    VisualizationService,
    FileService,
    SubmissionService,
  ],
})
export class AppModule {}
