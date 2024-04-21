import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaService } from '../prisma.service';
import { ParserService } from '../parser/parser.service';

@Module({
  controllers: [TestsController],
  providers: [TestsService, PrismaService, ParserService],
})
export class TestsModule {}
