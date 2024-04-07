// Generated from DFMGrammar.g4 by ANTLR 4.13.1

import { ParseTreeListener } from 'antlr4';

import { FactContext } from './DFMGrammarParser';
import { ContentContext } from './DFMGrammarParser';
import { DescriptivesContext } from './DFMGrammarParser';
import { DimensionsContext } from './DFMGrammarParser';
import { NameContext } from './DFMGrammarParser';
import { MeasuresContext } from './DFMGrammarParser';
import { AttributesContext } from './DFMGrammarParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `DFMGrammarParser`.
 */
export default class DFMGrammarListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `DFMGrammarParser.fact`.
   * @param ctx the parse tree
   */
  enterFact?: (ctx: FactContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.fact`.
   * @param ctx the parse tree
   */
  exitFact?: (ctx: FactContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.content`.
   * @param ctx the parse tree
   */
  enterContent?: (ctx: ContentContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.content`.
   * @param ctx the parse tree
   */
  exitContent?: (ctx: ContentContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.descriptives`.
   * @param ctx the parse tree
   */
  enterDescriptives?: (ctx: DescriptivesContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.descriptives`.
   * @param ctx the parse tree
   */
  exitDescriptives?: (ctx: DescriptivesContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.dimensions`.
   * @param ctx the parse tree
   */
  enterDimensions?: (ctx: DimensionsContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.dimensions`.
   * @param ctx the parse tree
   */
  exitDimensions?: (ctx: DimensionsContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.name`.
   * @param ctx the parse tree
   */
  enterName?: (ctx: NameContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.name`.
   * @param ctx the parse tree
   */
  exitName?: (ctx: NameContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.measures`.
   * @param ctx the parse tree
   */
  enterMeasures?: (ctx: MeasuresContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.measures`.
   * @param ctx the parse tree
   */
  exitMeasures?: (ctx: MeasuresContext) => void;
  /**
   * Enter a parse tree produced by `DFMGrammarParser.attributes`.
   * @param ctx the parse tree
   */
  enterAttributes?: (ctx: AttributesContext) => void;
  /**
   * Exit a parse tree produced by `DFMGrammarParser.attributes`.
   * @param ctx the parse tree
   */
  exitAttributes?: (ctx: AttributesContext) => void;
}
