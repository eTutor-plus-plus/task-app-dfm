import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsModule } from './tests/tests.module';
import { PrismaService } from './prisma.service';
import { ParserService } from './parser/parser.service';
import { VisualizationService } from './visualization/visualization.service';
import { FileService } from './file/file.service';
import { TaskModule } from './task/task.module';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';
import { EvaluationService } from './evaluation/evaluation.service';

@Module({
  imports: [TestsModule, TaskModule],
  controllers: [AppController, SubmissionController],
  providers: [
    AppService,
    PrismaService,
    ParserService,
    VisualizationService,
    FileService,
    SubmissionService,
    EvaluationService,
  ],
})
export class AppModule {}
