// Generated from DFMGrammar.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link DFMGrammarParser}.
 */
public interface DFMGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#fact}.
	 * @param ctx the parse tree
	 */
	void enterFact(DFMGrammarParser.FactContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#fact}.
	 * @param ctx the parse tree
	 */
	void exitFact(DFMGrammarParser.FactContext ctx);
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#content}.
	 * @param ctx the parse tree
	 */
	void enterContent(DFMGrammarParser.ContentContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#content}.
	 * @param ctx the parse tree
	 */
	void exitContent(DFMGrammarParser.ContentContext ctx);
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#descriptives}.
	 * @param ctx the parse tree
	 */
	void enterDescriptives(DFMGrammarParser.DescriptivesContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#descriptives}.
	 * @param ctx the parse tree
	 */
	void exitDescriptives(DFMGrammarParser.DescriptivesContext ctx);
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#dimensions}.
	 * @param ctx the parse tree
	 */
	void enterDimensions(DFMGrammarParser.DimensionsContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#dimensions}.
	 * @param ctx the parse tree
	 */
	void exitDimensions(DFMGrammarParser.DimensionsContext ctx);
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#name}.
	 * @param ctx the parse tree
	 */
	void enterName(DFMGrammarParser.NameContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#name}.
	 * @param ctx the parse tree
	 */
	void exitName(DFMGrammarParser.NameContext ctx);
	/**
	 * Enter a parse tree produced by {@link DFMGrammarParser#measures}.
	 * @param ctx the parse tree
	 */
	void enterMeasures(DFMGrammarParser.MeasuresContext ctx);
	/**
	 * Exit a parse tree produced by {@link DFMGrammarParser#measures}.
	 * @param ctx the parse tree
	 */
	void exitMeasures(DFMGrammarParser.MeasuresContext ctx);
}