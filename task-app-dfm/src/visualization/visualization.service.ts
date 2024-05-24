import { Injectable } from '@nestjs/common';
import * as d3 from 'd3';
import { FactElement } from '../models/factElement';
import { DimensionElement } from '../models/dimensionElement';
import { Hierarchy } from '../models/hierarchy';
import { Level } from '../models/level';
import { ConnectionType } from '../models/enums/connectionType';
import jsdom = require('jsdom');
import puppeteer from 'puppeteer';
import * as fs from 'node:fs';
import * as path from 'node:path';

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
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
      pretendToBeVisual: true,
    });

    const test = await this.generateGraph();

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

    const mainFrame = await page.mainFrame().content();

    const body = d3.create(mainFrame);
    //body.html(htmlTemplate);

    interface Node extends d3.SimulationNodeDatum {
      id: string;
    }

    interface Link extends d3.SimulationLinkDatum<Node> {
      source: Node;
      target: Node;
    }

    // Define the data for the nodes and links.
    const nodes: Node[] = [
      {
        id: 'Node 1',
        x: Math.random() * 500,
        y: Math.random() * 500,
        vx: 0,
        vy: 0,
      },
      {
        id: 'Node 2',
        x: Math.random() * 500,
        y: Math.random() * 500,
        vx: 0,
        vy: 0,
      },
      {
        id: 'Node 3',
        x: Math.random() * 500,
        y: Math.random() * 500,
        vx: 0,
        vy: 0,
      },
    ];

    const links: Link[] = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
    ];

    // Create the SVG.
    const svg = body.append('svg').attr('width', 500).attr('height', 500);

    // Create the force simulation.
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: Node) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(250, 250))
      .force('collide', d3.forceCollide(20));

    simulation.alpha(1).restart();

    // Create the link elements.
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    // Create the node elements.
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', 'blue');

    // Define the tick function.
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    const html = body.html();

    const updatedHTML = await page.content();

    //await page.close();
    //await browser.close();

    return updatedHTML;
  }

  getMockData(): FactElement {
    const salesFact: FactElement = new FactElement('Sales');

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

    return salesFact;
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

          <!--function drag(simulation) {
            return d3.drag()
              .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
              })
              .on('end', (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              });
          }-->
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
}
