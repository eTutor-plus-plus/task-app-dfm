import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { ParserService } from '../parser/parser.service';

@Injectable()
export class TestsService {
  constructor(
    private prisma: PrismaService,
    private readonly praserService: ParserService,
  ) {}
  async create(createTestDto: CreateTestDto) {
    const myuuid = uuidv4();
    return this.prisma.tests.create({
      data: {
        id: myuuid,
        content: createTestDto.content,
      },
    });
  }

  async findAll() {
    return this.prisma.tests.findMany();
  }
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
    return this.praserService.parse(content);
  }
}
