import DFMGrammarVisitor from '../lib/generated/antlr/DFMGrammarVisitor';
import {
  DescriptiveContext,
  DimensionContext,
  FactContentContext,
  FactContext,
  FactDimensionConnectionContext,
  InputContext,
  MeasureContext,
} from '../lib/generated/antlr/DFMGrammarParser';
import { FactElement } from '../models/factElement';
import { AbstractElement } from '../models/abstractElement';
import { DimensionElement } from '../models/dimensionElement';
import { FactDimensionElement } from '../models/factDimensionElement';

export class BuildASTVisitor extends DFMGrammarVisitor<AbstractElement[]> {
  visitInput = (ctx: InputContext): AbstractElement[] => {
    if (!ctx) {
      return;
    }
    let facts: FactElement[] = [];
    let dimensions: DimensionElement[] = [];
    let connections: FactDimensionElement[] = [];
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof FactContext) {
        facts = facts.concat(this.visitFact(child));
      } else if (child instanceof DimensionContext) {
        dimensions = dimensions.concat(this.visitDimension(child));
      } else if (child instanceof FactDimensionConnectionContext) {
        connections = connections.concat(
          this.visitFactDimensionConnection(child),
        );
      }
    }
    const elements = this.handleConnections(facts, dimensions, connections);
    return elements;
  };

  visitFact = (ctx: FactContext) => {
    if (!ctx) {
      return;
    }
    const factName: string = ctx.name().getText();
    const fact: FactElement = new FactElement(factName);

    //Iterate over the fact itself
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof FactContentContext) {
        //Iterate over the fact content (e.g. measures and descriptives)
        for (let j = 0; j < child.getChildCount(); j++) {
          const factContent = child.getChild(j);
          // Check if the child is an instance of MeasureContext
          if (factContent instanceof MeasureContext) {
            // Extract the measure name and add it to the fact
            const measureName = factContent.name().getText();
            fact.measures.push(measureName);
          }

          // Check if the child is an instance of DescriptiveContext
          if (factContent instanceof DescriptiveContext) {
            // Extract the descriptive name and add it to the fact
            const descriptiveName = factContent.name().getText();
            fact.descriptives.push(descriptiveName);
          }
        }
      }
    }
    return [fact];
  };

  visitDimension = (ctx: DimensionContext) => {
    if (!ctx) {
      return;
    }
    const dimensionName: string = ctx.name().getText();
    const dimension: DimensionElement = new DimensionElement(dimensionName, []);
    // Iterate over the children of the DimensionContext
    /*for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);

      // Check if the child is an instance of HierarchyContext
      if (child instanceof HierarchyContext) {
        // Extract the hierarchy name and add it to the dimension
        const hierarchyName = child.name().getText();
        dimension.hierarchies.push(hierarchyName);
      }

      // Check if the child is an instance of LevelContext
      if (child instanceof LevelContext) {
        // Extract the level name and add it to the dimension
        const levelName = child.name().getText();
        dimension.levels.push(levelName);
      }
    }*/
    return [dimension];
  };

  visitFactDimensionConnection = (ctx: FactDimensionConnectionContext) => {
    const factDimensionConnection: FactDimensionElement =
      new FactDimensionElement(ctx.name(0).getText(), ctx.name(1).getText());
    return [factDimensionConnection];
  };

  private handleConnections(
    facts: FactElement[],
    dimensions: DimensionElement[],
    connections: FactDimensionElement[],
  ): AbstractElement[] {
    // Implement your logic for handling connections
    return facts;
  }
}
