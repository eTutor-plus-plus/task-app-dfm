import { Injectable } from '@nestjs/common';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../prisma.service';
import { ParserService } from '../parser/parser.service';

@Injectable()
export class TestsService {
  constructor(
    private prisma: PrismaService,
    private readonly praserService: ParserService,
  ) {}

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test of ` + updateTestDto.toString();
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }

  parseContent(content: string) {
    return this.praserService.getAST(content);
  }
}
