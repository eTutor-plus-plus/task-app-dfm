import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { VisualizationService } from '../visualization/visualization.service';
import { Header } from '@nestjs/common';

@Controller('tests')
export class TestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly visualizationService: VisualizationService,
  ) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id);
  }

  @Post('/parse')
  parseContent(@Body() content: CreateTestDto) {
    return this.testsService.parseContent(content.content);
  }

  @Post('generate-svg')
  @Header('content-type', 'image/svg+xml')
  generateSVG() {
    return this.visualizationService.generateSVG();
  }

  @Post('generate-force-directed-graph')
  @Header('content-type', 'image/svg+xml')
  generateForceDirectedGraph() {
    return this.visualizationService.generateForceDirectedGraph();
  }
}
