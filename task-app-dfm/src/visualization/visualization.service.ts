import { Injectable } from '@nestjs/common';
import * as d3 from 'd3';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { Hierarchy } from '../models/ast/hierarchy';
import { Level } from '../models/ast/level';
import { ConnectionType } from '../models/enums/connectionType';
import puppeteer from 'puppeteer';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { GraphNode } from '../models/graph/graphNode';
import { GraphLink } from '../models/graph/graphLink';
import { GraphNodeType } from '../models/enums/graphNodeType';

@Injectable()
export class VisualizationService {
  async generateForceDirectedGraph(): Promise<string> {
    //const test1 = await this.generateGraph();
    const test = await this.generateGraph();

    return test;
  }

  getMockData(): FactElement[] {
    const salesFact: FactElement = new FactElement('Sales');
    const productFact: FactElement = new FactElement('Product');

    const facts = [salesFact, productFact];

    // Create the ProductDim dimension
    const productHierarchy = new Hierarchy('');
    const firstLevel = new Level('product', ConnectionType.SIMPLE);
    const secondLevel = new Level('category', ConnectionType.SIMPLE);
    secondLevel.optional = true;
    const thirdLevel = new Level('family', null);
    productHierarchy.head = firstLevel;
    firstLevel.nextLevel = secondLevel;
    secondLevel.nextLevel = thirdLevel;
    productHierarchy.head = firstLevel;
    const productDim = new DimensionElement('ProductDim', [productHierarchy]);

    // Create the CityDim dimension
    const cityHierarchy = new Hierarchy('');
    const cityLevel = new Level('city', ConnectionType.MULTIPLE);
    cityHierarchy.head = cityLevel;
    const countryLevel = new Level('country', null);
    cityLevel.nextLevel = countryLevel;

    const cityDim = new DimensionElement('CityDim', [cityHierarchy]);

    // Add the dimensions to the salesFact
    salesFact.dimensions.push(productDim, cityDim);

    //Add the measures to the salesFact
    salesFact.measures.push(
      'sales',
      'quantity',
      'revenue',
      'thisisaverylarged',
    );
    salesFact.descriptives.push('accountant', 'salesman');

    //Add the measures to the productFact
    productFact.measures.push('productID', 'productName');

    return facts;
  }

  private async renderGraph(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 1000, height: 1000 });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();
    return buffer;
  }

  async generateGraph(): Promise<string> {
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'lib',
      'templates',
      'DFMTemplate.html',
    );
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(htmlTemplate);
    await page.setViewport({ width: 1000, height: 1000 });

    await page.addScriptTag({ url: 'https://d3js.org/d3.v6.min.js' });
    const facts = this.getMockData();
    let nodes: GraphNode[] = [];
    const factNodes = this.generateGraphNodes(facts);
    nodes = nodes.concat(factNodes);
    let links: GraphLink[] = [];
    const factLinks = this.generateGraphLinks(facts, nodes);
    links = links.concat(factLinks);

    await page.evaluate(
      (nodes, links) => {
        const svg = d3
          .select('body')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 1000);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            'link',
            d3.forceLink(links).id((d: GraphNode) => d.id),
          )
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(250, 250))
          .force(
            'collide',
            d3.forceCollide((d: GraphNode) => {
              if (d.graphNodeType === 'FACT') {
                return 120 / 1.5; // half of the width of the rectangle
              } else if (d.graphNodeType === 'LEVEL') {
                return 35; // radius of the circle
              } else {
                return 45;
              }
            }),
          );

        const link = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .attr('class', 'link');

        // In case of a multiple connection, add a second line to the link that is parallel to the current one
        /*link
          .filter(
            (d: GraphLink) => d.connectionType === ConnectionType.MULTIPLE,
          )
          .each(function (d: GraphLink) {
            const line = d3.select(this);
            const sourceNode = nodes.find((node) => node.id === d.source);
            const targetNode = nodes.find((node) => node.id === d.target);
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const angle = Math.atan2(dy, dx);
            const x1 = sourceNode.x + Math.cos(angle) * 10;
            const y1 = sourceNode.y + Math.sin(angle) * 10;
            const x2 = targetNode.x - Math.cos(angle) * 10;
            const y2 = targetNode.y - Math.sin(angle) * 10;
            svg
              .append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2)
              .attr('stroke', 'black');
          });*/

        const node = svg
          .append('g')
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round')
          .selectAll('g')
          .data(nodes)
          .join('g');

        // Create the fact node
        const factNode = node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('rect')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1.5)
          .attr('fill', 'white')
          .attr('width', 120)
          .attr('height', (d: GraphNode) => 35 + d.measures.length * 20)
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('x', -60)
          .attr('y', (d: GraphNode) => -(35 + d.measures.length * 20) / 2);

        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0) // Center the text horizontally
          .attr('y', (d: GraphNode) => -(10 + d.measures.length * 20) / 2) // Center the text vertically based on the height of the rectangle
          .attr('text-anchor', 'middle') // Ensure the text is centered
          .attr('dominant-baseline', 'middle') // Ensure the text is vertically centered
          .attr('fill', 'blue') // Change the fill color to blue
          .style('font-weight', 'bold'); // Make the text bold

        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .append('line')
          .attr('x1', -60) // Start the line at the left edge of the rectangle
          .attr('y1', (d: GraphNode) => -(50 + d.measures.length * 20) / 2 + 30) // Position the line just below the text
          .attr('x2', 60) // Draw the line to the right edge of the rectangle
          .attr('y2', (d: GraphNode) => -(50 + d.measures.length * 20) / 2 + 30) // Keep the line straight
          .attr('stroke', 'blue'); // Set the color of the line to blue

        node
          .filter((d: GraphNode) => d.graphNodeType === 'FACT')
          .each(function (d: GraphNode) {
            let y = 30; // Start position for the measures
            d.measures.forEach((measure) => {
              const textElement = d3
                .select(this)
                .append('text')
                .text(measure)
                .attr('x', -45) // Center the text horizontally
                .attr(
                  'y',
                  (d: GraphNode) => -(35 + d.measures.length * 20) / 2 + y + 10,
                ) // Position the text below the previous line
                .attr('text-anchor', 'start') // Ensure the text is centered
                .attr('dominant-baseline', 'start') // Ensure the text is vertically centered
                .attr('fill', 'grey'); // Change the fill color to black

              // Get the length of the text
              const textLength = textElement.node().getComputedTextLength();

              // If the text length is greater than the rectangle width, shrink the text
              if (textLength > 90) {
                textElement
                  .attr('textLength', '90') // Set the width of the area into which the text will be rendered
                  .attr('lengthAdjust', 'spacing'); // Specify that the spaces between the characters should be adjusted to fit into the area
              }

              if (measure !== d.measures[d.measures.length - 1]) {
                d3.select(this)
                  .append('line')
                  .attr('x1', -50) // Start the line at the left edge of the rectangle
                  .attr(
                    'y1',
                    (d: GraphNode) =>
                      -(35 + d.measures.length * 20) / 2 + y + 15,
                  ) // Position the line just below the text
                  .attr('x2', 50) // Draw the line to the right edge of the rectangle
                  .attr(
                    'y2',
                    (d: GraphNode) =>
                      -(35 + d.measures.length * 20) / 2 + y + 15,
                  ) // Keep the line straight
                  .attr('stroke', 'blue'); // Set the color of the line to blue
              }

              y += 20; // Increase the y-coordinate for the next measure
            });
          });

        const levelNode = node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL')
          .append('circle')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1.5)
          .attr('fill', 'white')
          .attr('r', 10);

        node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0)
          .attr('y', 20)
          .attr('text-anchor', 'middle') // Ensure the text is centered
          .attr('dominant-baseline', 'middle') // Ensure the text is vertically centered
          .attr('fill', 'black'); // Change the fill color to black

        node
          .filter((d: GraphNode) => d.graphNodeType === 'LEVEL' && d.optional)
          .append('line')
          .attr('x1', -15) // Start the line at the left edge of the text
          .attr('y1', 0) // Position the line just below the text
          .attr('x2', 15) // Draw the line to the right edge of the text
          .attr('y2', 0)
          .attr('stroke', 'black'); // Keep the line straight

        const descriptiveNode = node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('rect')
          .attr('fill', 'white') // Set the fill color to white
          .attr('width', 100) // Set the width of the rectangle
          .attr('height', 20) // Set the height of the rectangle
          .attr('x', -50) // Center the rectangle horizontally
          .attr('y', -10); // Center the rectangle vertically

        // Add a new block of code to create a text element for the descriptive node
        node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('text')
          .text((d: GraphNode) => d.displayName)
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle') // Ensure the text is centered
          .attr('dominant-baseline', 'middle') // Ensure the text is vertically centered
          .attr('fill', 'black'); // Change the fill color to black

        // Add another block of code to create a line below the text
        node
          .filter((d: GraphNode) => d.graphNodeType === 'DESCRIPTIVE')
          .append('line')
          .attr('x1', -50) // Start the line at the left edge of the text
          .attr('y1', 10) // Position the line just below the text
          .attr('x2', 50) // Draw the line to the right edge of the text
          .attr('y2', 10) // Keep the line straight
          .attr('stroke', 'black'); // Set the color of the line to black

        simulation.on('tick', () => {
          link
            .attr('x1', (d) => (d.source as GraphNode).x)
            .attr('y1', (d) => (d.source as GraphNode).y)
            .attr('x2', (d) => (d.target as GraphNode).x)
            .attr('y2', (d) => (d.target as GraphNode).y);

          node.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
        });
      },
      nodes,
      links,
    );

    const updatedHTML = await page.content();
    await browser.close();

    return updatedHTML;
  }

  //Check if this can be integrated into the page.evaluate function.
  createFactNode(node: d3.Selection<SVGGElement, GraphNode, null, undefined>) {
    node
      .append((d: GraphNode) => {
        return d.graphNodeType === 'FACT'
          ? document.createElementNS('http://www.w3.org/2000/svg', 'rect')
          : document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      })
      .attr('stroke', 'blue')
      .attr('stroke-width', 1.5)
      .attr('fill', 'white')
      .attr('r', (d: GraphNode) => (d.graphNodeType === 'FACT' ? null : 4))
      .attr('width', (d: GraphNode) => (d.graphNodeType === 'FACT' ? 20 : null))
      .attr('height', (d: GraphNode) =>
        d.graphNodeType === 'FACT' ? 10 : null,
      );
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
