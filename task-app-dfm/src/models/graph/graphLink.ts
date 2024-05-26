import * as d3 from 'd3';
import { GraphNode } from './graphNode';

export class GraphLink implements d3.SimulationLinkDatum<GraphNode> {
  source: GraphNode;
  target: GraphNode;
  index?: number | undefined;
}
