import { Injectable } from '@nestjs/common';
import * as d3 from 'd3';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { Hierarchy } from '../models/ast/hierarchy';
import { Level } from '../models/ast/level';
import { ConnectionType } from '../models/enums/connectionType';
import jsdom = require('jsdom');
import puppeteer from 'puppeteer';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { GraphNode } from '../models/graph/graphNode';
import { GraphLink } from '../models/graph/graphLink';
import { GraphNodeType } from '../models/enums/graphNodeType';

const { JSDOM } = jsdom;
@Injectable()
export class VisualizationService {
  generateSVG() {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
      pretendToBeVisual: true,
    });

    const body = d3.select(dom.window.document.querySelector('body'));
    const svg = body
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
      .attr('xmlns', 'http://www.w3.org/2000/svg');
    svg
      .append('rect')
      .attr('x', 20)
      .attr('y', 10)
      .attr('width', 120)
      .attr('height', 80)
      .style('fill', 'orange');
    return body.html();

    /*d3n.createSVG(10, 20).append('g');

    return d3n.svgString();*/
  }

  async generateForceDirectedGraph(): Promise<string> {
    //const test1 = await this.generateGraph();
    const test = await this.generateGraph2();

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

    return facts;
  }

  async generateGraph(): Promise<Buffer> {
    const html = this.getGraphHTML();
    const imageBuffer = await this.renderGraph(html);
    return imageBuffer;
  }

  private getGraphHTML(): string {
    // Simple D3 force-directed graph HTML
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .node {
            stroke: #fff;
            stroke-width: 1.5px;
          }
          .link {
            stroke: #999;
            stroke-opacity: 0.6;
          }
        </style>
      </head>
      <body>
        <svg width="600" height="600"></svg>
        <script src="https://d3js.org/d3.v6.min.js"></script>
        <script>
          const nodes = [
            { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }
          ];
          const links = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'B', target: 'D' },
            { source: 'C', target: 'D' }
          ];

          const svg = d3.select('svg');
          const width = +svg.attr('width');
          const height = +svg.attr('height');

          const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));

          const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('class', 'link');

          const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('class', 'node')
            .attr('r', 5)
            .call(drag(simulation));

          node.append('title')
            .text(d => d.id);

          simulation.on('tick', () => {
            link
              .attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y);

            node
              .attr('cx', d => d.x)
              .attr('cy', d => d.y);
          });

          function drag(simulation) {
            return d3.drag()
              .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              });
          }
        </script>
      </body>
      </html>
    `;
  }

  private async renderGraph(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 600, height: 600 });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();
    return buffer;
  }

  async generateGraph2(): Promise<string> {
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
          .attr('width', 500)
          .attr('height', 500);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            'link',
            d3.forceLink(links).id((d: GraphNode) => d.id),
          )
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(250, 250))
          .force('collide', d3.forceCollide(20));

        const link = svg
          .append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .attr('class', 'link');

        const node = svg
          .append('g')
          .selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
          .attr('r', 5)
          .attr('fill', 'blue');

        simulation.on('tick', () => {
          link
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);

          node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        });
      },
      nodes,
      links,
    );

    const updatedHTML = await page.content();
    await browser.close();

    return updatedHTML;
  }

  private generateGraphNodes(facts: FactElement[]): GraphNode[] {
    const nodes: GraphNode[] = [];
    facts.forEach((fact) => {
      const factNode = new GraphNode();
      factNode.id = fact.name;
      factNode.displayName = fact.name;
      factNode.graphNodeType = GraphNodeType.FACT;
      nodes.push(factNode);

      fact.dimensions.forEach((dimension) => {
        dimension.hierarchies.forEach((hierarchy) => {
          let currentLevel = hierarchy.head;
          while (currentLevel) {
            const dimensionNode = new GraphNode();
            dimensionNode.id = currentLevel.name;
            dimensionNode.displayName = currentLevel.name;
            dimensionNode.graphNodeType = GraphNodeType.LEVEL;
            nodes.push(dimensionNode);
            currentLevel = currentLevel.nextLevel;
          }
        });
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
          );
          factHeadLink.target = graphNodes.find(
            (node) => node.id === currentLevel.name,
          );
          factHeadLink.connectionType = ConnectionType.SIMPLE;
          links.push(factHeadLink);

          while (currentLevel.nextLevel) {
            const link = new GraphLink();
            link.source = graphNodes.find(
              (node) => node.id === currentLevel.name,
            );
            link.target = graphNodes.find(
              (node) => node.id === currentLevel.nextLevel.name,
            );
            link.connectionType = currentLevel.connectionType;
            links.push(link);
            currentLevel = currentLevel.nextLevel;
          }
        });
      });
    });
    return links;
  }
}
