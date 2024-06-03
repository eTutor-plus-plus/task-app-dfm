import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaService } from '../prisma.service';
import { ParserService } from '../parser/parser.service';
import { VisualizationService } from '../visualization/visualization.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [TestsController],
  providers: [
    TestsService,
    PrismaService,
    ParserService,
    VisualizationService,
    FileService,
  ],
})
export class TestsModule {}
