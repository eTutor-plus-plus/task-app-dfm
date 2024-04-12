// Generated from DFMGrammar.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { InputContext } from "./DFMGrammarParser";
import { FactContext } from "./DFMGrammarParser";
import { FactContentContext } from "./DFMGrammarParser";
import { DescriptiveContext } from "./DFMGrammarParser";
import { DimensionContext } from "./DFMGrammarParser";
import { DimensionContentContext } from "./DFMGrammarParser";
import { HierarchyContext } from "./DFMGrammarParser";
import { LevelContext } from "./DFMGrammarParser";
import { ConnectionContext } from "./DFMGrammarParser";
import { ConnectionTypeContext } from "./DFMGrammarParser";
import { FactDimensionConnectionContext } from "./DFMGrammarParser";
import { NameContext } from "./DFMGrammarParser";
import { MeasureContext } from "./DFMGrammarParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `DFMGrammarParser`.
 */
export default class DFMGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.input`.
	 * @param ctx the parse tree
	 */
	enterInput?: (ctx: InputContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.input`.
	 * @param ctx the parse tree
	 */
	exitInput?: (ctx: InputContext) => void;
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
	 * Enter a parse tree produced by `DFMGrammarParser.factContent`.
	 * @param ctx the parse tree
	 */
	enterFactContent?: (ctx: FactContentContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.factContent`.
	 * @param ctx the parse tree
	 */
	exitFactContent?: (ctx: FactContentContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.descriptive`.
	 * @param ctx the parse tree
	 */
	enterDescriptive?: (ctx: DescriptiveContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.descriptive`.
	 * @param ctx the parse tree
	 */
	exitDescriptive?: (ctx: DescriptiveContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.dimension`.
	 * @param ctx the parse tree
	 */
	enterDimension?: (ctx: DimensionContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.dimension`.
	 * @param ctx the parse tree
	 */
	exitDimension?: (ctx: DimensionContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.dimensionContent`.
	 * @param ctx the parse tree
	 */
	enterDimensionContent?: (ctx: DimensionContentContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.dimensionContent`.
	 * @param ctx the parse tree
	 */
	exitDimensionContent?: (ctx: DimensionContentContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.hierarchy`.
	 * @param ctx the parse tree
	 */
	enterHierarchy?: (ctx: HierarchyContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.hierarchy`.
	 * @param ctx the parse tree
	 */
	exitHierarchy?: (ctx: HierarchyContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.level`.
	 * @param ctx the parse tree
	 */
	enterLevel?: (ctx: LevelContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.level`.
	 * @param ctx the parse tree
	 */
	exitLevel?: (ctx: LevelContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.connection`.
	 * @param ctx the parse tree
	 */
	enterConnection?: (ctx: ConnectionContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.connection`.
	 * @param ctx the parse tree
	 */
	exitConnection?: (ctx: ConnectionContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.connectionType`.
	 * @param ctx the parse tree
	 */
	enterConnectionType?: (ctx: ConnectionTypeContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.connectionType`.
	 * @param ctx the parse tree
	 */
	exitConnectionType?: (ctx: ConnectionTypeContext) => void;
	/**
	 * Enter a parse tree produced by `DFMGrammarParser.factDimensionConnection`.
	 * @param ctx the parse tree
	 */
	enterFactDimensionConnection?: (ctx: FactDimensionConnectionContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.factDimensionConnection`.
	 * @param ctx the parse tree
	 */
	exitFactDimensionConnection?: (ctx: FactDimensionConnectionContext) => void;
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
	 * Enter a parse tree produced by `DFMGrammarParser.measure`.
	 * @param ctx the parse tree
	 */
	enterMeasure?: (ctx: MeasureContext) => void;
	/**
	 * Exit a parse tree produced by `DFMGrammarParser.measure`.
	 * @param ctx the parse tree
	 */
	exitMeasure?: (ctx: MeasureContext) => void;
}

