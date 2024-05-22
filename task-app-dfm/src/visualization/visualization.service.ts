import {Injectable} from '@nestjs/common';
import * as d3 from 'd3';
import {FactElement} from "../models/factElement";
import {DimensionElement} from "../models/dimensionElement";
import {Hierarchy} from "../models/hierarchy";
import {Level} from "../models/level";
import {ConnectionType} from "../models/enums/connectionType";
import jsdom = require('jsdom');

const { JSDOM } = jsdom;
const D3Node = require('d3-node');
const d3n = new D3Node(); // initializes D3 with container element
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

  generateForceDirectedGraph(): string {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
      pretendToBeVisual: true,
    });

    const body = d3.select(dom.window.document.querySelector('body'));


    interface Node extends d3.SimulationNodeDatum {
      id: string;
    }

    interface Link extends d3.SimulationLinkDatum<Node> {
      source: Node;
      target: Node;
    }

    // Define the data for the nodes and links.
    const nodes: Node[] = [
      { id: "Node 1", x: Math.random() * 500, y: Math.random() * 500, vx: 0, vy: 0 },
      { id: "Node 2", x: Math.random() * 500, y: Math.random() * 500, vx: 0, vy: 0 },
      { id: "Node 3", x: Math.random() * 500, y: Math.random() * 500, vx: 0, vy: 0 }
    ];

    const links: Link[] = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] }
    ]

    // Create the SVG.
    const svg = body
        .append('svg')
        .attr('width', 500)
        .attr('height', 500);

    // Create the force simulation.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id((d: Node) => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(250, 250));

    simulation.alpha(1).restart();

    // Create the link elements.
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 2);

    // Create the node elements.
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 20)
        .attr("fill", "blue");

    // Define the tick function.
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });

    return svg.html();
  }

  getMockData(): FactElement {
    const salesFact: FactElement = new FactElement("Sales");

    // Create the ProductDim dimension
    const productHierarchy = new Hierarchy("");
    const firstLevel = new Level("product", ConnectionType.SIMPLE);
    const secondLevel = new Level("category", ConnectionType.SIMPLE);
    const thirdLevel = new Level("family", null);
    productHierarchy.head = firstLevel;
    firstLevel.nextLevel = secondLevel;
    secondLevel.nextLevel = thirdLevel;
    productHierarchy.head = firstLevel;
    const productDim = new DimensionElement("ProductDim", [productHierarchy]);

    // Create the CityDim dimension
    const cityHierarchy = new Hierarchy("");
    const cityLevel = new Level("city", ConnectionType.MULTIPLE);
    cityHierarchy.head = cityLevel;
    const countryLevel = new Level("country", null);
    cityLevel.nextLevel = countryLevel;

    const cityDim = new DimensionElement("CityDim", [cityHierarchy]);

    // Add the dimensions to the salesFact
    salesFact.dimensions.push(productDim, cityDim);

    return salesFact;
  }
}
