import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ParserService } from '../parser/parser.service';

@Injectable()
export class TestsService {
  constructor(
    private prisma: PrismaService,
    private readonly praserService: ParserService,
  ) {}
  parseContent(content: string) {
    return this.praserService.getAST(content);
  }
}
