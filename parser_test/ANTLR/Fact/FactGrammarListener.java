// Generated from FactGrammar.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link FactGrammarParser}.
 */
public interface FactGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link FactGrammarParser#fact}.
	 * @param ctx the parse tree
	 */
	void enterFact(FactGrammarParser.FactContext ctx);
	/**
	 * Exit a parse tree produced by {@link FactGrammarParser#fact}.
	 * @param ctx the parse tree
	 */
	void exitFact(FactGrammarParser.FactContext ctx);
	/**
	 * Enter a parse tree produced by {@link FactGrammarParser#name}.
	 * @param ctx the parse tree
	 */
	void enterName(FactGrammarParser.NameContext ctx);
	/**
	 * Exit a parse tree produced by {@link FactGrammarParser#name}.
	 * @param ctx the parse tree
	 */
	void exitName(FactGrammarParser.NameContext ctx);
	/**
	 * Enter a parse tree produced by {@link FactGrammarParser#measures}.
	 * @param ctx the parse tree
	 */
	void enterMeasures(FactGrammarParser.MeasuresContext ctx);
	/**
	 * Exit a parse tree produced by {@link FactGrammarParser#measures}.
	 * @param ctx the parse tree
	 */
	void exitMeasures(FactGrammarParser.MeasuresContext ctx);
}