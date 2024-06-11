import DFMGrammarVisitor from '../lib/generated/antlr/DFMGrammarVisitor';
import {
  ConnectionContext,
  DescriptiveContext,
  DimensionContentContext,
  DimensionContext,
  FactContentContext,
  FactContext,
  FactDimensionConnectionContext,
  HierarchyContext,
  InputContext,
  LevelContext,
  MeasureContext,
} from '../lib/generated/antlr/DFMGrammarParser';
import { FactElement } from '../models/ast/factElement';
import { AbstractElement } from '../models/ast/abstractElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { FactDimensionElement } from '../models/ast/factDimensionElement';
import { Hierarchy } from '../models/ast/hierarchy';
import { Level } from '../models/ast/level';
import { ConnectionType } from '../models/enums/connectionType';
import { LevelType } from '../models/enums/levelType';

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
    this.resolveFactDimensionConnections(facts, dimensions, connections);
    return facts;
  };

  visitFact = (ctx: FactContext): FactElement[] => {
    if (!ctx) {
      return;
    }
    const factName: string = ctx.name().getText() || '';
    const fact: FactElement = new FactElement(factName);

    //Iterate over the fact itself
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof FactContentContext) {
        //Iterate over the fact content (e.g. measures and descriptives)
        for (let j = 0; j < child.getChildCount(); j++) {
          const factContent = child.getChild(j);
          if (factContent instanceof MeasureContext) {
            const measureName = factContent.name().getText() || '';
            fact.measures.push(measureName);
          }

          if (factContent instanceof DescriptiveContext) {
            const descriptiveName = factContent.name().getText() || '';
            fact.descriptives.push(descriptiveName);
          }
        }
      }
    }
    return [fact];
  };

  visitDimension = (ctx: DimensionContext): DimensionElement[] => {
    if (!ctx) {
      return;
    }
    const dimensionName: string = ctx.name().getText() || '';
    const dimension: DimensionElement = new DimensionElement(dimensionName, []);
    // Iterate over the children of the DimensionContext
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof DimensionContentContext) {
        // Iterate over all possible hierarchies
        for (let j = 0; j < child.getChildCount(); j++) {
          const hierarchy = child.getChild(j);
          if (hierarchy instanceof HierarchyContext) {
            dimension.hierarchies = dimension.hierarchies.concat(
              this.visitHierarchy(hierarchy),
            );
          }
        }
      }
    }
    return [dimension];
  };

  visitFactDimensionConnection = (
    ctx: FactDimensionConnectionContext,
  ): FactDimensionElement[] => {
    const factDimensionConnection: FactDimensionElement =
      new FactDimensionElement(
        ctx.name(0).getText() || '',
        ctx.name(1).getText() || '',
      );
    return [factDimensionConnection];
  };

  visitHierarchy = (ctx: HierarchyContext) => {
    const hiearchyName = '';
    const hierarchy: Hierarchy = new Hierarchy(hiearchyName);
    let currentTail: Level = null;
    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof LevelContext) {
        const levelName = child.name().getText() || '';
        const level = new Level(levelName, null);
        currentTail = level;
        if (child.getChildCount() > 1) {
          if (
            child.getChild(0).getText() == '(' &&
            child.getChild(child.getChildCount() - 1).getText() == ')'
          ) {
            level.optional = true;
          }
        }
        if (i == 0) {
          hierarchy.head = level;
        } else {
          let currentLevel = hierarchy.head;
          while (currentLevel.nextLevel) {
            currentLevel = currentLevel.nextLevel;
          }
          currentLevel.nextLevel = level;
        }
      }

      if (child instanceof ConnectionContext) {
        const connection = child.connectionType().getText() || '';
        if (child.getChildCount() > 1) {
          if (
            child.getChild(0).getText() == '(' &&
            child.getChild(child.getChildCount() - 1).getText() == ')'
          ) {
            currentTail.connection_optional = true;
          }
        }
        switch (connection) {
          case '-':
            currentTail.connectionType = ConnectionType.SIMPLE;
            break;
          case '=':
            currentTail.connectionType = ConnectionType.MULTIPLE;
            break;
          case '->':
            currentTail.connectionType = ConnectionType.CONVERGENCE;
            break;
          default:
            throw new Error('Unknown connection type');
        }
      }

      if (child instanceof DescriptiveContext) {
        const descriptiveName = child.name().getText() || '';
        const descriptiveLevel = new Level(descriptiveName, null);
        descriptiveLevel.levelType = LevelType.DESCRIPTIVE;
        currentTail.nextLevel = descriptiveLevel;
        currentTail = descriptiveLevel;
      }
    }
    return [hierarchy];
  };

  private resolveFactDimensionConnections(
    facts: FactElement[],
    dimensions: DimensionElement[],
    connections: FactDimensionElement[],
  ) {
    // Implement your logic for handling connections
    for (const connection of connections) {
      const fact = facts.find(
        (fact) => fact.name === connection.relationFromName,
      );
      const dimension = dimensions.find(
        (dimension) => dimension.name === connection.relationToName,
      );
      if (fact && dimension) {
        fact.dimensions.push(dimension);
      }
    }
  }
}
