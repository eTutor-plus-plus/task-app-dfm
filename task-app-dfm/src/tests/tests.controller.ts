import { Controller, Post, Body } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { VisualizationService } from '../visualization/visualization.service';
import { Header } from '@nestjs/common';
import { ParserService } from '../parser/parser.service';
import { FactElement } from '../models/ast/factElement';

@Controller('tests')
export class TestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly visualizationService: VisualizationService,
    private readonly parserService: ParserService,
  ) {}

  @Post('/parse')
  parseContent(@Body() content: CreateTestDto) {
    return this.testsService.parseContent(content.content);
  }

  @Post('generate-force-directed-graph')
  @Header('content-type', 'image/svg+xml')
  generateForceDirectedGraph(@Body() content: CreateTestDto) {
    if (content.content) {
      return this.visualizationService.getVisualization(
        this.parserService.getAST(content.content) as FactElement[],
      );
    }
    return this.visualizationService.getVisualization(null);
  }
}
