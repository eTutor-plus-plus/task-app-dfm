import { Injectable } from '@nestjs/common';
import * as d3 from 'd3';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { Hierarchy } from '../models/ast/hierarchy';
import { Level } from '../models/ast/level';
import { ConnectionType } from '../models/enums/connectionType';
import puppeteer from 'puppeteer';
import { GraphNode } from '../models/graph/graphNode';
import { GraphLink } from '../models/graph/graphLink';
import { GraphNodeType } from '../models/enums/graphNodeType';
import { FileService } from '../file/file.service';

@Injectable()
export class VisualizationService {
  constructor(private readonly fileService: FileService) {}

  hash = require('object-hash');

  async getVisualization(): Promise<string> {
    const facts = this.getMockData();
    const hashInput = this.hash(facts);
    const cachedSVG = await this.fileService.getFile(hashInput);
    if (cachedSVG) {
      return cachedSVG;
    }
    const rawSVG = await this.generateGraph(facts);
    await this.fileService.saveFile(hashInput, rawSVG);
    return rawSVG;
  }

  getMockData(): FactElement[] {
    const salesFact: FactElement = new FactElement('Sales');
    const productFact: FactElement = new FactElement('Product');

    const facts = [salesFact, productFact];

    const productHierarchy = new Hierarchy('');
    const firstLevel = new Level('product', ConnectionType.MULTIPLE);
    const secondLevel = new Level('category', ConnectionType.SIMPLE);
    secondLevel.optional = true;
    secondLevel.connection_optional = true;
    const thirdLevel = new Level('family', null);
    productHierarchy.head = firstLevel;
    firstLevel.nextLevel = secondLevel;
    secondLevel.nextLevel = thirdLevel;
    productHierarchy.head = firstLevel;
    const productDim = new DimensionElement('ProductDim', [productHierarchy]);

    const cityHierarchy = new Hierarchy('');
    const cityLevel = new Level('city', ConnectionType.MULTIPLE);
    cityHierarchy.head = cityLevel;
    const countryLevel = new Level('country', null);
    cityLevel.nextLevel = countryLevel;

    const cityDim = new DimensionElement('CityDim', [cityHierarchy]);

    salesFact.dimensions.push(productDim, cityDim);

    salesFact.measures.push(
      'sales',
      'quantity',
      'revenue',
      'thisisaverylarged',
    );
    salesFact.descriptives.push('accountant', 'salesman');
    productFact.measures.push('productID', 'productName');

    const productHierarchyForProductFact = new Hierarchy('NewHierarchy');
    const firstLevelForProductFact = new Level(
      'newProduct',
      ConnectionType.SIMPLE,
    );
    const secondLevelForProductFact = new Level(
      'newCategory',
      ConnectionType.CONVERGENCE,
    );
    const thirdLevelForProductFact = new Level('newFamily', null);
    productHierarchyForProductFact.head = firstLevelForProductFact;
    firstLevelForProductFact.nextLevel = secondLevelForProductFact;
    secondLevelForProductFact.nextLevel = thirdLevelForProductFact;
    const productDimForProductFact = new DimensionElement('NewProductDim', [
      productHierarchyForProductFact,
    ]);

    productFact.dimensions.push(productDimForProductFact);

    return facts;
  }

  async generateGraph(factElements: FactElement[]): Promise<string> {
    const browser = await puppeteer.launch({ headless: true });
    const [page] = await browser.pages();
    await page.setViewport({ width: 1000, height: 1000 });
    await page.addScriptTag({ url: 'https://d3js.org/d3.v6.min.js' });

    const nodes = this.generateGraphNodes(factElements);
    let links: GraphLink[] = [];
    const factLinks = this.generateGraphLinks(factElements, nodes);
    links = links.concat(factLinks);

    const simulationEndPromise = new Promise<string>((resolve) => {
      page.exposeFunction('simulationEnded', (rawSVG: string) => {
        return resolve(rawSVG);
      });
    });

    await page.evaluate(
      (nodes, links) => {
        const SVG_WIDTH = 1000;
        const SVG_HEIGHT = 1000;
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
            d3.forceLink(links).id((d: d3.SimulationNodeDatum) => {
              const graphNode = d as GraphNode;
              return graphNode.id;
            }),
          )
          .force('center', d3.forceCenter(SVG_WIDTH / 2, SVG_HEIGHT / 2))
          .force(
            'collide',
            d3.forceCollide((d: GraphNode) => {
              if (d.graphNodeType === 'FACT') {
                return FACT_NODE_BASE_WIDTH / 1.5;
              } else if (d.graphNodeType === 'LEVEL') {
                return LEVEL_NODE_RADIUS * 5;
              } else {
                return DESCR_NODE_BASE_WIDTH / 1.5;
              }
            }),
          );

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
          .filter((d: GraphLink) => d.connectionType !== '=')
          .append('line')
          .attr('stroke-opacity', 0.8)
          .attr('stroke', 'gray');

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
    const rawSVG = await simulationEndPromise;
    await browser.close();

    return rawSVG;
  }

  private generateGraphNodes(facts: FactElement[]): GraphNode[] {
    const nodes: GraphNode[] = [];
    let yPosition = 50;
    let xPosition = 50;

    facts.forEach((fact) => {
      const factNode = new GraphNode();
      factNode.id = fact.name;
      factNode.displayName = fact.name;
      factNode.graphNodeType = GraphNodeType.FACT;
      //factNode.x = Math.random() * 300; // Set the x property to a random value within the width of the SVG
      factNode.x = xPosition;
      factNode.y = yPosition; // Set the y property to the current y position
      nodes.push(factNode);
      factNode.measures = fact.measures;
      yPosition += 100;
      xPosition += 100;

      fact.dimensions.forEach((dimension) => {
        dimension.hierarchies.forEach((hierarchy) => {
          let currentLevel = hierarchy.head;
          while (currentLevel) {
            const levelNode = new GraphNode();
            levelNode.id = currentLevel.name;
            levelNode.displayName = currentLevel.name;
            levelNode.graphNodeType = GraphNodeType.LEVEL;
            levelNode.optional = currentLevel.optional;

            nodes.push(levelNode);
            currentLevel = currentLevel.nextLevel;
          }
        });
      });

      fact.descriptives.forEach((descriptive) => {
        const descriptiveNode = new GraphNode();
        descriptiveNode.id = descriptive;
        descriptiveNode.displayName = descriptive;
        descriptiveNode.graphNodeType = GraphNodeType.DESCRIPTIVE;
        nodes.push(descriptiveNode);
      });
    });
    return nodes;
  }

  private generateGraphLinks(
    facts: FactElement[],
    graphNodes: GraphNode[],
  ): GraphLink[] {
    const links: GraphLink[] = [];
    facts.forEach((fact) => {
      fact.dimensions.forEach((dimension) => {
        dimension.hierarchies.forEach((hierarchy) => {
          let currentLevel = hierarchy.head;
          const factHeadLink = new GraphLink();
          factHeadLink.source = graphNodes.find(
            (node) => node.id === fact.name,
          ).id;
          factHeadLink.target = graphNodes.find(
            (node) => node.id === currentLevel.name,
          ).id;
          factHeadLink.connectionType = ConnectionType.SIMPLE;
          factHeadLink.optional = currentLevel.connection_optional;
          links.push(factHeadLink);

          while (currentLevel.nextLevel) {
            const link = new GraphLink();
            link.source = graphNodes.find(
              (node) => node.id === currentLevel.name,
            ).id;
            link.target = graphNodes.find(
              (node) => node.id === currentLevel.nextLevel.name,
            ).id;
            link.connectionType = currentLevel.connectionType;
            link.optional = currentLevel.connection_optional;
            links.push(link);
            currentLevel = currentLevel.nextLevel;
          }
        });
      });
      fact.descriptives.forEach((descriptive) => {
        const link = new GraphLink();
        link.source = graphNodes.find((node) => node.id === fact.name).id;
        link.target = graphNodes.find((node) => node.id === descriptive).id;
        link.connectionType = ConnectionType.SIMPLE;
        links.push(link);
      });
    });
    return links;
  }
}
