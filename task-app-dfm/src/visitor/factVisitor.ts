import DFMGrammarVisitor from '../lib/generated/antlr/DFMGrammarVisitor';
import {
  DescriptiveContext,
  DimensionContext,
  FactContext,
  FactDimensionConnectionContext,
  InputContext,
  MeasureContext,
} from '../lib/generated/antlr/DFMGrammarParser';

class DFMVisitor extends DFMGrammarVisitor<AbstractElement[]> {
  visitInput = (ctx: InputContext): AbstractElement[] => {
    const facts: FactElement[] = [];
    const dimensions: DimensionElement[] = [];
    const connections: FactDimensionElement[] = [];
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof FactContext) {
        facts.concat(this.visitFact(child));
      } else if (child instanceof DimensionContext) {
        dimensions.concat(this.visitDimension(child));
      } else if (child instanceof FactDimensionConnectionContext) {
        connections.concat(this.visitFactDimensionConnection(child));
      }
    }
    const elements = this.handleConnections(facts, dimensions, connections);
    return elements;
  };

  visitFact = (ctx: FactContext) => {
    const fact: FactElement = new FactElement(ctx.name().getText(), [], []);

    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);

      // Check if the child is an instance of MeasureContext
      if (child instanceof MeasureContext) {
        // Extract the measure name and add it to the fact
        const measureName = child.name().getText();
        fact.measures.push(measureName);
      }

      // Check if the child is an instance of DescriptiveContext
      if (child instanceof DescriptiveContext) {
        // Extract the descriptive name and add it to the fact
        const descriptiveName = child.name().getText();
        fact.descriptives.push(descriptiveName);
      }
    }
    return [fact];
  };

  visitDimension = (ctx: DimensionContext) => {
    const dimension: DimensionElement = new DimensionElement(
      ctx.name().getText(),
      [],
    );
    //Implement your logic for visiting a dimension node
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
    return [];
  }
}
