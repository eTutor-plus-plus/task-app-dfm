// Generated from DFMGrammar.g4 by ANTLR 4.13.1

import { ParseTreeVisitor } from 'antlr4';

import { InputContext } from './DFMGrammarParser';
import { FactContext } from './DFMGrammarParser';
import { FactContentContext } from './DFMGrammarParser';
import { DimensionContext } from './DFMGrammarParser';
import { DescriptiveContext } from './DFMGrammarParser';
import { DimensionContentContext } from './DFMGrammarParser';
import { HierarchyContext } from './DFMGrammarParser';
import { LevelContext } from './DFMGrammarParser';
import { ConnectionContext } from './DFMGrammarParser';
import { ConnectionTypeContext } from './DFMGrammarParser';
import { FactDimensionConnectionContext } from './DFMGrammarParser';
import { NameContext } from './DFMGrammarParser';
import { MeasureContext } from './DFMGrammarParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `DFMGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class DFMGrammarVisitor<
  Result,
> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `DFMGrammarParser.input`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInput?: (ctx: InputContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.fact`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFact?: (ctx: FactContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.factContent`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFactContent?: (ctx: FactContentContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.dimension`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDimension?: (ctx: DimensionContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.descriptive`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescriptive?: (ctx: DescriptiveContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.dimensionContent`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDimensionContent?: (ctx: DimensionContentContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.hierarchy`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHierarchy?: (ctx: HierarchyContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.level`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLevel?: (ctx: LevelContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.connection`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConnection?: (ctx: ConnectionContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.connectionType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConnectionType?: (ctx: ConnectionTypeContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.factDimensionConnection`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFactDimensionConnection?: (
    ctx: FactDimensionConnectionContext,
  ) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.name`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitName?: (ctx: NameContext) => Result;
  /**
   * Visit a parse tree produced by `DFMGrammarParser.measure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMeasure?: (ctx: MeasureContext) => Result;
}
