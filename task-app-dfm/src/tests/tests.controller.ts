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

  @Post('/parse')
  parseContent(@Body() content: CreateTestDto) {
    return this.testsService.parseContent(content.content);
  }

  @Post('generate-force-directed-graph')
  @Header('content-type', 'image/svg+xml')
  generateForceDirectedGraph() {
    return this.visualizationService.getVisualization();
  }
}
