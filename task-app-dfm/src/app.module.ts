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

@Module({
  imports: [TestsModule, TaskGroupModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ParserService, VisualizationService, FileService],
})
export class AppModule {}
