import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma.service';
import { ParserService } from '../parser/parser.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, ParserService],
})
export class TaskModule {}
