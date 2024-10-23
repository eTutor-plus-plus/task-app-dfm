import { Injectable } from '@nestjs/common';
import * as d3 from 'd3';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { ConnectionType } from '../models/enums/connectionType';
import puppeteer from 'puppeteer';
import { GraphNode } from '../models/graph/graphNode';
import { GraphLink } from '../models/graph/graphLink';
import { GraphNodeType } from '../models/enums/graphNodeType';
import { FileService } from '../file/file.service';
import { AbstractElement } from '../models/ast/abstractElement';
import { LevelType } from '../models/enums/levelType';

@Injectable()
export class VisualizationService {
  constructor(private readonly fileService: FileService) {}

  hash = require('object-hash');

  async getVisualization(abstractElements: AbstractElement[]): Promise<string> {
    if (!abstractElements) {
      return '';
    }
    const hashInput = this.hash(abstractElements);
    const cachedSVG = await this.fileService.getFile(hashInput);
    if (cachedSVG) {
      return cachedSVG;
    }
    const generatedSVG = await this.generateGraph(abstractElements);
    await this.fileService.saveFile(hashInput, generatedSVG);
    return generatedSVG;
  }

  async generateGraph(abstractElements: AbstractElement[]): Promise<string> {
    const isDocker = process.env.IS_DOCKER === 'true';
    const browser = await puppeteer.launch({
      defaultViewport: null,
      executablePath: isDocker ? '/usr/bin/google-chrome' : undefined,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--single-process',
        '--disable-gpu',
      ],
    });
    const [page] = await browser.pages();
    await page.addScriptTag({ url: 'https://d3js.org/d3.v6.min.js' });

    const nodes = this.generateGraphNodes(abstractElements);
    let links: GraphLink[] = [];
    const factLinks = this.generateGraphLinks(abstractElements, nodes);
    links = links.concat(factLinks);

    const simulationEndPromise = new Promise<string>((resolve) => {
      page.exposeFunction('simulationEnded', (generatedSVG: string) => {
        return resolve(generatedSVG);
      });
    });

    await page.evaluate(
      (nodes, links) => {
        const SVG_WIDTH = window.innerWidth;
        const SVG_HEIGHT = window.innerHeight;
        const FACT_NODE_BASE_WIDTH = 120;
        const FACT_NODE_BASE_HEIGHT = 35;
        const LEVEL_NODE_RADIUS = 10;
        const DESCR_NODE_BASE_WIDTH = 100;
        const DESCR_NODE_BASE_HEIGHT = 20;
        const LINES_OPTIONAL_DISTANCE = 5;
        const LINES_DISTANCE_OFFSET = 2.5;

        const svg = d3
          .select('body')
          .append('svg')
          .attr('width', SVG_WIDTH)
          .attr('height', SVG_HEIGHT)
          .attr('xmlns', 'http://www.w3.org/2000/svg');

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            'link',
            d3
              .forceLink(links)
              .id((d: d3.SimulationNodeDatum) => {
                const graphNode = d as GraphNode;
                return graphNode.id;
              })
              .distance(50)
              .strength(1),
          )
          .force('center', d3.forceCenter(SVG_WIDTH / 2, SVG_HEIGHT / 2))
          .force(
            'collide',
            d3.forceCollide((d: GraphNode) => {
              if (d.graphNodeType === 'FACT') {
                return FACT_NODE_BASE_WIDTH / 2;
              } else if (d.graphNodeType === 'LEVEL') {
                return LEVEL_NODE_RADIUS * 7;
              } else {
                return DESCR_NODE_BASE_WIDTH / 2;
              }
            }),
          )
          .force('x', d3.forceX(SVG_WIDTH / 2).strength(0.1))
          .force('y', d3.forceY(SVG_HEIGHT / 2).strength(0.1));

        svg
          .append('defs')
          .append('marker')
          .attr('id', 'arrow')
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 5)
          .attr('refY', 5)
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('orient', 'auto-start-reverse')
          .append('path')
          .attr('d', 'M 0 0 L 10 5 L 0 10 z');

        const link = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .filter(
            (d: GraphLink) =>
              d.connectionType !== '=' && d.linkType === 'default',
          )
          .append('line')
          .attr('stroke-opacity', 0.8)
          .attr('stroke', 'gray');

        // Add invisible links between the facts to force the elements into the center when there are multiple facts
        const factLink = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .filter((d: GraphLink) => d.linkType === 'factLink')
          .append('line')
          .attr('stroke-opacity', 0)
          .attr('stroke', 'white')
          .attr('stroke-width', 0);

        // Add the upper part of the multi link
        const multiLinkUp = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .filter((d: GraphLink) => d.connectionType === '=')
          .append('line')
          .attr('stroke-opacity', 0.8)
          .attr('stroke', 'gray');

        const multiLinkDown = multiLinkUp.clone(true);

        const optionalLink = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .filter((d: GraphLink) => d.optional)
          .append('line')
          .attr('stroke-opacity', 0.8)
          .attr('stroke', 'gray');

        const convergenceLinkClones = link
          .filter((d: GraphLink) => d.connectionType === '->')
          .clone(true);

        const convergenceLink = link
          .filter((d: GraphLink) => d.connectionType === '->')
          .attr('stroke', 'gray')
          .attr('marker-end', 'url(#arrow)');

        const node = svg
          .append('g')
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round')
          .selectAll('g')
          .data(nodes)
          .join('g');

        // Create the fact node
        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('rect')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1.5)
          .attr('fill', 'white')
          .attr('width', FACT_NODE_BASE_WIDTH)
          .attr(
            'height',
            (d: GraphNode) => FACT_NODE_BASE_HEIGHT + d.measures.length * 20,
          )
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('x', -60)
          .attr(
            'y',
            (d: GraphNode) =>
              -(FACT_NODE_BASE_HEIGHT + d.measures.length * 20) / 2,
          );

        //Create fact node text
        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0)
          .attr('y', (d: GraphNode) => -(10 + d.measures.length * 20) / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', 'blue')
          .style('font-weight', 'bold');

        //Append the line below the fact node
        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('line')
          .attr('x1', -60)
          .attr('y1', (d: GraphNode) => -(50 + d.measures.length * 20) / 2 + 30)
          .attr('x2', 60)
          .attr('y2', (d: GraphNode) => -(50 + d.measures.length * 20) / 2 + 30)
          .attr('stroke', 'blue');

        // Create the measures
        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .each(function (d: GraphNode) {
            let y = 30;
            d.measures.forEach((measure) => {
              const textElement = d3
                .select(this)
                .append('text')
                .text(measure)
                .attr('x', -45)
                .attr(
                  'y',
                  () =>
                    -(FACT_NODE_BASE_HEIGHT + d.measures.length * 20) / 2 +
                    y +
                    10,
                )
                .attr('text-anchor', 'start')
                .attr('dominant-baseline', 'auto')
                .attr('fill', 'grey');

              const textLength = textElement.node().getComputedTextLength();

              if (textLength > 90) {
                textElement
                  .attr('textLength', '90')
                  .attr('lengthAdjust', 'spacing');
              }

              if (measure !== d.measures[d.measures.length - 1]) {
                d3.select(this)
                  .append('line')
                  .attr('x1', -50)
                  .attr(
                    'y1',
                    () =>
                      -(FACT_NODE_BASE_HEIGHT + d.measures.length * 20) / 2 +
                      y +
                      15,
                  )
                  .attr('x2', 50)
                  .attr(
                    'y2',
                    () =>
                      -(FACT_NODE_BASE_HEIGHT + d.measures.length * 20) / 2 +
                      y +
                      15,
                  )
                  .attr('stroke', 'blue');
              }

              y += 20;
            });
          });

        // Create the level nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL')
          .append('circle')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1.5)
          .attr('fill', 'white')
          .attr('r', LEVEL_NODE_RADIUS);

        // Add the text element for the level nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0)
          .attr('y', 20)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', 'black');

        // Add the crossing line for the optional level nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL' && d.optional)
          .append('line')
          .attr('x1', -15)
          .attr('y1', 0)
          .attr('x2', 15)
          .attr('y2', 0)
          .attr('stroke', 'black');

        // Create the descriptive nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('rect')
          .attr('fill', 'white')
          .attr('width', DESCR_NODE_BASE_WIDTH)
          .attr('height', DESCR_NODE_BASE_HEIGHT)
          .attr('x', -50)
          .attr('y', -10);

        // Add the text element for the descriptive nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', 'black');

        // Add the line below the descriptive nodes
        node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('line')
          .attr('x1', -50)
          .attr('y1', 10)
          .attr('x2', 50)
          .attr('y2', 10)
          .attr('stroke', 'black');

        // The tick function is needed to update the position of the nodes and links
        simulation.on('tick', () => {
          link
            .attr('x1', (d) => (d.source as GraphNode).x)
            .attr('y1', (d) => (d.source as GraphNode).y)
            .attr('x2', (d) => (d.target as GraphNode).x)
            .attr('y2', (d) => (d.target as GraphNode).y);

          factLink
            .attr('x1', (d) => (d.source as GraphNode).x)
            .attr('y1', (d) => (d.source as GraphNode).y)
            .attr('x2', (d) => (d.target as GraphNode).x)
            .attr('y2', (d) => (d.target as GraphNode).y);

          multiLinkUp.each(function (d: GraphLink) {
            const sourceNode = d.source as GraphNode;
            const targetNode = d.target as GraphNode;

            const slope =
              (targetNode.y - sourceNode.y) / (targetNode.x - sourceNode.x);

            const perpendicularSlope = -1 / slope;
            const deltaX =
              LINES_DISTANCE_OFFSET /
              Math.sqrt(1 + perpendicularSlope * perpendicularSlope);
            const deltaY = deltaX * perpendicularSlope;

            const multiLinkUPSourceX = sourceNode.x + deltaX;
            const multiLinkUPSourceY = sourceNode.y + deltaY;

            const multiLinkUPTargetX = targetNode.x + deltaX;
            const multiLinkUPTargetY = targetNode.y + deltaY;

            d3.select(this)
              .attr('x1', multiLinkUPSourceX)
              .attr('y1', multiLinkUPSourceY)
              .attr('x2', multiLinkUPTargetX)
              .attr('y2', multiLinkUPTargetY);
          });

          multiLinkDown.each(function (d: GraphLink) {
            const sourceNode = d.source as GraphNode;
            const targetNode = d.target as GraphNode;

            const slope =
              (targetNode.y - sourceNode.y) / (targetNode.x - sourceNode.x);

            const perpendicularSlope = -1 / slope;
            const deltaX =
              LINES_DISTANCE_OFFSET /
              Math.sqrt(1 + perpendicularSlope * perpendicularSlope);
            const deltaY = deltaX * perpendicularSlope;

            const multiLinkDownSourceX = sourceNode.x - deltaX;
            const multiLinkDownSourceY = sourceNode.y - deltaY;

            const multiLinkDownTargetX = targetNode.x - deltaX;
            const multiLinkDownTargetY = targetNode.y - deltaY;

            d3.select(this)
              .attr('x1', multiLinkDownSourceX)
              .attr('y1', multiLinkDownSourceY)
              .attr('x2', multiLinkDownTargetX)
              .attr('y2', multiLinkDownTargetY);
          });

          optionalLink.each(function (d: GraphLink) {
            const sourceNode = d.source as GraphNode;
            const targetNode = d.target as GraphNode;

            const middleX = (sourceNode.x + targetNode.x) / 2;
            const middleY = (sourceNode.y + targetNode.y) / 2;
            const slope =
              (targetNode.y - sourceNode.y) / (targetNode.x - sourceNode.x);

            const perpendicularSlope = -1 / slope;

            const deltaX =
              LINES_OPTIONAL_DISTANCE /
              Math.sqrt(1 + perpendicularSlope * perpendicularSlope);
            const deltaY = deltaX * perpendicularSlope;

            const aboveX = middleX + deltaX;
            const aboveY = middleY + deltaY;

            const belowX = middleX - deltaX;
            const belowY = middleY - deltaY;

            d3.select(this)
              .attr('x1', aboveX)
              .attr('y1', aboveY)
              .attr('x2', belowX)
              .attr('y2', belowY);
          });

          convergenceLink.each(function (d: GraphLink) {
            const sourceNode = d.source as GraphNode;
            const targetNode = d.target as GraphNode;

            const middleX = (sourceNode.x + targetNode.x) / 2;
            const middleY = (sourceNode.y + targetNode.y) / 2;

            convergenceLinkClones
              .attr('x1', middleX)
              .attr('y1', middleY)
              .attr('x2', targetNode.x)
              .attr('y2', targetNode.y);

            d3.select(this)
              .attr('x1', sourceNode.x)
              .attr('y1', sourceNode.y)
              .attr('x2', middleX)
              .attr('y2', middleY);
          });
          node.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
        });

        // The end event is triggered when the simulation is done
        simulation.on('end', () => {
          (window as any).simulationEnded(d3.select('body').html());
        });
      },
      nodes,
      links,
    );
    const generatedSVG = await simulationEndPromise;
    await browser.close();

    return generatedSVG;
  }

  private containsId(nodes: GraphNode[], id: string): boolean {
    return nodes.some((node) => node.id === id);
  }

  private generateGraphNodes(abstractElements: AbstractElement[]): GraphNode[] {
    const nodes: GraphNode[] = [];
    const yPosition = 1000 / 2;
    const xPosition = 1000 / 2;
    let dimensions: DimensionElement[] = [];

    abstractElements.forEach((element) => {
      if (element instanceof FactElement) {
        const factNode = new GraphNode();
        factNode.id = element.name;
        factNode.displayName = element.name;
        factNode.graphNodeType = GraphNodeType.FACT;
        factNode.x = xPosition;
        factNode.y = yPosition;
        nodes.push(factNode);
        factNode.measures = element.measures;
        dimensions = dimensions.concat(element.dimensions);

        element.descriptives.forEach((descriptive) => {
          const descriptiveNode = new GraphNode();
          descriptiveNode.id = descriptive;
          descriptiveNode.displayName = descriptive;
          descriptiveNode.graphNodeType = GraphNodeType.DESCRIPTIVE;
          nodes.push(descriptiveNode);
        });
      } else if (element instanceof DimensionElement) {
        dimensions.push(element);
      }
    });
    dimensions.forEach((dimension) => {
      dimension.hierarchies.forEach((hierarchy) => {
        let currentLevel = hierarchy.head;
        while (currentLevel) {
          const levelNode = new GraphNode();
          levelNode.id = currentLevel.name + dimension.name;
          levelNode.displayName = currentLevel.name;
          levelNode.graphNodeType =
            currentLevel.levelType === LevelType.LEVEL
              ? GraphNodeType.LEVEL
              : GraphNodeType.DESCRIPTIVE;
          levelNode.optional = currentLevel.optional;
          if (!this.containsId(nodes, levelNode.id)) {
            nodes.push(levelNode);
          }
          currentLevel = currentLevel.nextLevel;
        }
      });
    });
    return Array.from(nodes);
  }

  private generateGraphLinks(
    elements: AbstractElement[],
    graphNodes: GraphNode[],
  ): GraphLink[] {
    const links: GraphLink[] = [];
    let dimensions: DimensionElement[] = [];
    const factNodes: FactElement[] = [];
    elements.forEach((element) => {
      if (element instanceof FactElement) {
        factNodes.push(element);
        dimensions = dimensions.concat(element.dimensions);
        element.descriptives.forEach((descriptive) => {
          const link = new GraphLink();
          link.source = graphNodes.find((node) => node.id === element.name).id;
          link.target = graphNodes.find((node) => node.id === descriptive).id;
          link.connectionType = ConnectionType.SIMPLE;
          links.push(link);
        });
        element.dimensions.forEach((dimension) => {
          const currentLevel = dimension.hierarchies[0].head;
          const factHeadLink = new GraphLink();
          const graphNodeSource = graphNodes.find(
            (node) => node.id === element.name,
          );
          const graphNodeTarget = graphNodes.find(
            (node) => node.id === currentLevel.name,
          );
          if (graphNodeSource && graphNodeTarget) {
            factHeadLink.source = graphNodeSource.id;
            factHeadLink.target = graphNodeTarget.id;
            factHeadLink.connectionType = ConnectionType.SIMPLE;
            //Cannot be optional
            //factHeadLink.optional = currentLevel.connection_optional;
            links.push(factHeadLink);
          }
        });
      } else if (element instanceof DimensionElement) {
        dimensions.push(element);
      }
    });

    dimensions.forEach((dimension) => {
      dimension.hierarchies.forEach((hierarchy) => {
        let currentLevel = hierarchy.head;
        while (currentLevel.nextLevel) {
          const link = new GraphLink();
          link.source = graphNodes.find(
            (node) => node.id === currentLevel.name + dimension.name,
          ).id;
          link.target = graphNodes.find(
            (node) => node.id === currentLevel.nextLevel.name + dimension.name,
          ).id;
          link.connectionType = currentLevel.connectionType;
          link.optional = currentLevel.connection_optional;
          links.push(link);
          currentLevel = currentLevel.nextLevel;
        }
      });
    });

    for (let i = 0; i < factNodes.length; i++) {
      for (let j = i + 1; j < factNodes.length; j++) {
        const link = new GraphLink();
        link.source = graphNodes.find(
          (node) => node.id === factNodes[i].name,
        ).id;
        link.target = graphNodes.find(
          (node) => node.id === factNodes[j].name,
        ).id;
        link.connectionType = ConnectionType.SIMPLE;
        link.linkType = 'factLink';
        links.push(link);
      }
    }
    return links;
  }
}
