import * as d3 from 'd3';
import { GraphNodeType } from '../enums/graphNodeType';

export class GraphNode implements d3.SimulationNodeDatum {
  id: string;
  displayName: string = '';
  index?: number | undefined;
  x?: number | undefined;
  y?: number | undefined;
  vx?: number | undefined;
  vy?: number | undefined;
  fx?: number | undefined;
  fy?: number | undefined;
  graphNodeType: GraphNodeType;
  optional: boolean = false;
  measures: string[] = [];
}
