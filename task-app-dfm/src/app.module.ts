import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ParserService } from './parser/parser.service';
import { VisualizationService } from './visualization/visualization.service';
import { FileService } from './file/file.service';
import { TaskModule } from './task/task.module';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';
import { EvaluationService } from './evaluation/evaluation.service';
import { TaskService } from './task/task.service';
import { ExecutionService } from './execution/execution.service';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { HealthControllerController } from './health-controller/health-controller.controller';
import * as path from 'path';

@Module({
  imports: [
    TaskModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  controllers: [
    AppController,
    SubmissionController,
    HealthControllerController,
  ],

  providers: [
    AppService,
    PrismaService,
    ParserService,
    VisualizationService,
    FileService,
    SubmissionService,
    EvaluationService,
    TaskService,
    ExecutionService,
  ],
})
export class AppModule {}
