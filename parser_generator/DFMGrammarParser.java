// Generated from DFMGrammar.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class DFMGrammarParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, ID=7, DIGIT=8, LETTER=9, 
		WS=10;
	public static final int
		RULE_fact = 0, RULE_content = 1, RULE_descriptives = 2, RULE_dimensions = 3, 
		RULE_name = 4, RULE_measures = 5;
	private static String[] makeRuleNames() {
		return new String[] {
			"fact", "content", "descriptives", "dimensions", "name", "measures"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'fact:'", "'{'", "'}'", "'descriptives:'", "'dimensions:'", "','"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, "ID", "DIGIT", "LETTER", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "DFMGrammar.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public DFMGrammarParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FactContext extends ParserRuleContext {
		public NameContext name() {
			return getRuleContext(NameContext.class,0);
		}
		public ContentContext content() {
			return getRuleContext(ContentContext.class,0);
		}
		public FactContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_fact; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterFact(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitFact(this);
		}
	}

	public final FactContext fact() throws RecognitionException {
		FactContext _localctx = new FactContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_fact);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(12);
			match(T__0);
			setState(13);
			name();
			setState(14);
			match(T__1);
			setState(15);
			content();
			setState(16);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ContentContext extends ParserRuleContext {
		public List<DescriptivesContext> descriptives() {
			return getRuleContexts(DescriptivesContext.class);
		}
		public DescriptivesContext descriptives(int i) {
			return getRuleContext(DescriptivesContext.class,i);
		}
		public List<MeasuresContext> measures() {
			return getRuleContexts(MeasuresContext.class);
		}
		public MeasuresContext measures(int i) {
			return getRuleContext(MeasuresContext.class,i);
		}
		public ContentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_content; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterContent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitContent(this);
		}
	}

	public final ContentContext content() throws RecognitionException {
		ContentContext _localctx = new ContentContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_content);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__3 || _la==LETTER) {
				{
				setState(20);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case T__3:
					{
					setState(18);
					descriptives();
					}
					break;
				case LETTER:
					{
					setState(19);
					measures();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(24);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DescriptivesContext extends ParserRuleContext {
		public MeasuresContext measures() {
			return getRuleContext(MeasuresContext.class,0);
		}
		public DescriptivesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_descriptives; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterDescriptives(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitDescriptives(this);
		}
	}

	public final DescriptivesContext descriptives() throws RecognitionException {
		DescriptivesContext _localctx = new DescriptivesContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_descriptives);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(25);
			match(T__3);
			setState(26);
			match(T__1);
			setState(28);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LETTER) {
				{
				setState(27);
				measures();
				}
			}

			setState(30);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DimensionsContext extends ParserRuleContext {
		public NameContext name() {
			return getRuleContext(NameContext.class,0);
		}
		public DimensionsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dimensions; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterDimensions(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitDimensions(this);
		}
	}

	public final DimensionsContext dimensions() throws RecognitionException {
		DimensionsContext _localctx = new DimensionsContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_dimensions);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(32);
			match(T__4);
			setState(34);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LETTER) {
				{
				setState(33);
				name();
				}
			}

			setState(36);
			match(T__1);
			setState(37);
			match(T__2);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class NameContext extends ParserRuleContext {
		public List<TerminalNode> LETTER() { return getTokens(DFMGrammarParser.LETTER); }
		public TerminalNode LETTER(int i) {
			return getToken(DFMGrammarParser.LETTER, i);
		}
		public List<TerminalNode> DIGIT() { return getTokens(DFMGrammarParser.DIGIT); }
		public TerminalNode DIGIT(int i) {
			return getToken(DFMGrammarParser.DIGIT, i);
		}
		public NameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_name; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterName(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitName(this);
		}
	}

	public final NameContext name() throws RecognitionException {
		NameContext _localctx = new NameContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_name);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(39);
			match(LETTER);
			setState(43);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(40);
					_la = _input.LA(1);
					if ( !(_la==DIGIT || _la==LETTER) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					}
					} 
				}
				setState(45);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MeasuresContext extends ParserRuleContext {
		public List<NameContext> name() {
			return getRuleContexts(NameContext.class);
		}
		public NameContext name(int i) {
			return getRuleContext(NameContext.class,i);
		}
		public MeasuresContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_measures; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).enterMeasures(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DFMGrammarListener ) ((DFMGrammarListener)listener).exitMeasures(this);
		}
	}

	public final MeasuresContext measures() throws RecognitionException {
		MeasuresContext _localctx = new MeasuresContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_measures);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(46);
			name();
			setState(51);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__5) {
				{
				{
				setState(47);
				match(T__5);
				setState(48);
				name();
				}
				}
				setState(53);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\n7\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001"+
		"\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0005\u0001\u0015\b\u0001\n"+
		"\u0001\f\u0001\u0018\t\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u001d\b\u0002\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0003"+
		"\u0003#\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0004\u0001"+
		"\u0004\u0005\u0004*\b\u0004\n\u0004\f\u0004-\t\u0004\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0005\u00052\b\u0005\n\u0005\f\u00055\t\u0005\u0001"+
		"\u0005\u0000\u0000\u0006\u0000\u0002\u0004\u0006\b\n\u0000\u0001\u0001"+
		"\u0000\b\t6\u0000\f\u0001\u0000\u0000\u0000\u0002\u0016\u0001\u0000\u0000"+
		"\u0000\u0004\u0019\u0001\u0000\u0000\u0000\u0006 \u0001\u0000\u0000\u0000"+
		"\b\'\u0001\u0000\u0000\u0000\n.\u0001\u0000\u0000\u0000\f\r\u0005\u0001"+
		"\u0000\u0000\r\u000e\u0003\b\u0004\u0000\u000e\u000f\u0005\u0002\u0000"+
		"\u0000\u000f\u0010\u0003\u0002\u0001\u0000\u0010\u0011\u0005\u0003\u0000"+
		"\u0000\u0011\u0001\u0001\u0000\u0000\u0000\u0012\u0015\u0003\u0004\u0002"+
		"\u0000\u0013\u0015\u0003\n\u0005\u0000\u0014\u0012\u0001\u0000\u0000\u0000"+
		"\u0014\u0013\u0001\u0000\u0000\u0000\u0015\u0018\u0001\u0000\u0000\u0000"+
		"\u0016\u0014\u0001\u0000\u0000\u0000\u0016\u0017\u0001\u0000\u0000\u0000"+
		"\u0017\u0003\u0001\u0000\u0000\u0000\u0018\u0016\u0001\u0000\u0000\u0000"+
		"\u0019\u001a\u0005\u0004\u0000\u0000\u001a\u001c\u0005\u0002\u0000\u0000"+
		"\u001b\u001d\u0003\n\u0005\u0000\u001c\u001b\u0001\u0000\u0000\u0000\u001c"+
		"\u001d\u0001\u0000\u0000\u0000\u001d\u001e\u0001\u0000\u0000\u0000\u001e"+
		"\u001f\u0005\u0003\u0000\u0000\u001f\u0005\u0001\u0000\u0000\u0000 \""+
		"\u0005\u0005\u0000\u0000!#\u0003\b\u0004\u0000\"!\u0001\u0000\u0000\u0000"+
		"\"#\u0001\u0000\u0000\u0000#$\u0001\u0000\u0000\u0000$%\u0005\u0002\u0000"+
		"\u0000%&\u0005\u0003\u0000\u0000&\u0007\u0001\u0000\u0000\u0000\'+\u0005"+
		"\t\u0000\u0000(*\u0007\u0000\u0000\u0000)(\u0001\u0000\u0000\u0000*-\u0001"+
		"\u0000\u0000\u0000+)\u0001\u0000\u0000\u0000+,\u0001\u0000\u0000\u0000"+
		",\t\u0001\u0000\u0000\u0000-+\u0001\u0000\u0000\u0000.3\u0003\b\u0004"+
		"\u0000/0\u0005\u0006\u0000\u000002\u0003\b\u0004\u00001/\u0001\u0000\u0000"+
		"\u000025\u0001\u0000\u0000\u000031\u0001\u0000\u0000\u000034\u0001\u0000"+
		"\u0000\u00004\u000b\u0001\u0000\u0000\u000053\u0001\u0000\u0000\u0000"+
		"\u0006\u0014\u0016\u001c\"+3";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}