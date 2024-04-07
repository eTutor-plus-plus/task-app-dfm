// Generated from DFMGrammar.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  DecisionState,
  DFA,
  FailedPredicateException,
  RecognitionException,
  NoViableAltException,
  BailErrorStrategy,
  Parser,
  ParserATNSimulator,
  RuleContext,
  ParserRuleContext,
  PredictionMode,
  PredictionContextCache,
  TerminalNode,
  RuleNode,
  Token,
  TokenStream,
  Interval,
  IntervalSet,
} from 'antlr4';
import DFMGrammarListener from './DFMGrammarListener.js';
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class DFMGrammarParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly ID = 7;
  public static readonly DIGIT = 8;
  public static readonly LETTER = 9;
  public static readonly WS = 10;
  public static readonly EOF = Token.EOF;
  public static readonly RULE_fact = 0;
  public static readonly RULE_content = 1;
  public static readonly RULE_descriptives = 2;
  public static readonly RULE_dimensions = 3;
  public static readonly RULE_name = 4;
  public static readonly RULE_measures = 5;
  public static readonly RULE_attributes = 6;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'fact:'",
    "'{'",
    "'}'",
    "'descriptives:'",
    "'dimensions:'",
    "','",
  ];
  public static readonly symbolicNames: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'ID',
    'DIGIT',
    'LETTER',
    'WS',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'fact',
    'content',
    'descriptives',
    'dimensions',
    'name',
    'measures',
    'attributes',
  ];
  public get grammarFileName(): string {
    return 'DFMGrammar.g4';
  }
  public get literalNames(): (string | null)[] {
    return DFMGrammarParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return DFMGrammarParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return DFMGrammarParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return DFMGrammarParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(
      this,
      DFMGrammarParser._ATN,
      DFMGrammarParser.DecisionsToDFA,
      new PredictionContextCache(),
    );
  }
  // @RuleVersion(0)
  public fact(): FactContext {
    let localctx: FactContext = new FactContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, DFMGrammarParser.RULE_fact);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 14;
        this.match(DFMGrammarParser.T__0);
        this.state = 15;
        this.name();
        this.state = 16;
        this.match(DFMGrammarParser.T__1);
        this.state = 17;
        this.content();
        this.state = 18;
        this.match(DFMGrammarParser.T__2);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public content(): ContentContext {
    let localctx: ContentContext = new ContentContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 2, DFMGrammarParser.RULE_content);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 24;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 4 || _la === 9) {
          {
            this.state = 22;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case 4:
                {
                  this.state = 20;
                  this.descriptives();
                }
                break;
              case 9:
                {
                  this.state = 21;
                  this.measures();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          this.state = 26;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public descriptives(): DescriptivesContext {
    let localctx: DescriptivesContext = new DescriptivesContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 4, DFMGrammarParser.RULE_descriptives);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 27;
        this.match(DFMGrammarParser.T__3);
        this.state = 28;
        this.match(DFMGrammarParser.T__1);
        this.state = 30;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 9) {
          {
            this.state = 29;
            this.attributes();
          }
        }

        this.state = 32;
        this.match(DFMGrammarParser.T__2);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public dimensions(): DimensionsContext {
    let localctx: DimensionsContext = new DimensionsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 6, DFMGrammarParser.RULE_dimensions);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 34;
        this.match(DFMGrammarParser.T__4);
        this.state = 36;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 9) {
          {
            this.state = 35;
            this.name();
          }
        }

        this.state = 38;
        this.match(DFMGrammarParser.T__1);
        this.state = 39;
        this.match(DFMGrammarParser.T__2);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public name(): NameContext {
    let localctx: NameContext = new NameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, DFMGrammarParser.RULE_name);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 41;
        this.match(DFMGrammarParser.LETTER);
        this.state = 45;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 42;
                _la = this._input.LA(1);
                if (!(_la === 8 || _la === 9)) {
                  this._errHandler.recoverInline(this);
                } else {
                  this._errHandler.reportMatch(this);
                  this.consume();
                }
              }
            }
          }
          this.state = 47;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public measures(): MeasuresContext {
    let localctx: MeasuresContext = new MeasuresContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 10, DFMGrammarParser.RULE_measures);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 48;
        this.name();
        this.state = 53;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 6) {
          {
            {
              this.state = 49;
              this.match(DFMGrammarParser.T__5);
              this.state = 50;
              this.name();
            }
          }
          this.state = 55;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public attributes(): AttributesContext {
    let localctx: AttributesContext = new AttributesContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 12, DFMGrammarParser.RULE_attributes);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 56;
        this.name();
        this.state = 61;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 6) {
          {
            {
              this.state = 57;
              this.match(DFMGrammarParser.T__5);
              this.state = 58;
              this.name();
            }
          }
          this.state = 63;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 10, 65, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2,
    5, 7, 5, 2, 6, 7, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 5, 1,
    23, 8, 1, 10, 1, 12, 1, 26, 9, 1, 1, 2, 1, 2, 1, 2, 3, 2, 31, 8, 2, 1, 2, 1,
    2, 1, 3, 1, 3, 3, 3, 37, 8, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 5, 4, 44, 8, 4,
    10, 4, 12, 4, 47, 9, 4, 1, 5, 1, 5, 1, 5, 5, 5, 52, 8, 5, 10, 5, 12, 5, 55,
    9, 5, 1, 6, 1, 6, 1, 6, 5, 6, 60, 8, 6, 10, 6, 12, 6, 63, 9, 6, 1, 6, 0, 0,
    7, 0, 2, 4, 6, 8, 10, 12, 0, 1, 1, 0, 8, 9, 64, 0, 14, 1, 0, 0, 0, 2, 24, 1,
    0, 0, 0, 4, 27, 1, 0, 0, 0, 6, 34, 1, 0, 0, 0, 8, 41, 1, 0, 0, 0, 10, 48, 1,
    0, 0, 0, 12, 56, 1, 0, 0, 0, 14, 15, 5, 1, 0, 0, 15, 16, 3, 8, 4, 0, 16, 17,
    5, 2, 0, 0, 17, 18, 3, 2, 1, 0, 18, 19, 5, 3, 0, 0, 19, 1, 1, 0, 0, 0, 20,
    23, 3, 4, 2, 0, 21, 23, 3, 10, 5, 0, 22, 20, 1, 0, 0, 0, 22, 21, 1, 0, 0, 0,
    23, 26, 1, 0, 0, 0, 24, 22, 1, 0, 0, 0, 24, 25, 1, 0, 0, 0, 25, 3, 1, 0, 0,
    0, 26, 24, 1, 0, 0, 0, 27, 28, 5, 4, 0, 0, 28, 30, 5, 2, 0, 0, 29, 31, 3,
    12, 6, 0, 30, 29, 1, 0, 0, 0, 30, 31, 1, 0, 0, 0, 31, 32, 1, 0, 0, 0, 32,
    33, 5, 3, 0, 0, 33, 5, 1, 0, 0, 0, 34, 36, 5, 5, 0, 0, 35, 37, 3, 8, 4, 0,
    36, 35, 1, 0, 0, 0, 36, 37, 1, 0, 0, 0, 37, 38, 1, 0, 0, 0, 38, 39, 5, 2, 0,
    0, 39, 40, 5, 3, 0, 0, 40, 7, 1, 0, 0, 0, 41, 45, 5, 9, 0, 0, 42, 44, 7, 0,
    0, 0, 43, 42, 1, 0, 0, 0, 44, 47, 1, 0, 0, 0, 45, 43, 1, 0, 0, 0, 45, 46, 1,
    0, 0, 0, 46, 9, 1, 0, 0, 0, 47, 45, 1, 0, 0, 0, 48, 53, 3, 8, 4, 0, 49, 50,
    5, 6, 0, 0, 50, 52, 3, 8, 4, 0, 51, 49, 1, 0, 0, 0, 52, 55, 1, 0, 0, 0, 53,
    51, 1, 0, 0, 0, 53, 54, 1, 0, 0, 0, 54, 11, 1, 0, 0, 0, 55, 53, 1, 0, 0, 0,
    56, 61, 3, 8, 4, 0, 57, 58, 5, 6, 0, 0, 58, 60, 3, 8, 4, 0, 59, 57, 1, 0, 0,
    0, 60, 63, 1, 0, 0, 0, 61, 59, 1, 0, 0, 0, 61, 62, 1, 0, 0, 0, 62, 13, 1, 0,
    0, 0, 63, 61, 1, 0, 0, 0, 7, 22, 24, 30, 36, 45, 53, 61,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!DFMGrammarParser.__ATN) {
      DFMGrammarParser.__ATN = new ATNDeserializer().deserialize(
        DFMGrammarParser._serializedATN,
      );
    }

    return DFMGrammarParser.__ATN;
  }

  static DecisionsToDFA = DFMGrammarParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}

export class FactContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public name(): NameContext {
    return this.getTypedRuleContext(NameContext, 0) as NameContext;
  }
  public content(): ContentContext {
    return this.getTypedRuleContext(ContentContext, 0) as ContentContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_fact;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterFact) {
      listener.enterFact(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitFact) {
      listener.exitFact(this);
    }
  }
}

export class ContentContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public descriptives_list(): DescriptivesContext[] {
    return this.getTypedRuleContexts(
      DescriptivesContext,
    ) as DescriptivesContext[];
  }
  public descriptives(i: number): DescriptivesContext {
    return this.getTypedRuleContext(
      DescriptivesContext,
      i,
    ) as DescriptivesContext;
  }
  public measures_list(): MeasuresContext[] {
    return this.getTypedRuleContexts(MeasuresContext) as MeasuresContext[];
  }
  public measures(i: number): MeasuresContext {
    return this.getTypedRuleContext(MeasuresContext, i) as MeasuresContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_content;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterContent) {
      listener.enterContent(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitContent) {
      listener.exitContent(this);
    }
  }
}

export class DescriptivesContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public attributes(): AttributesContext {
    return this.getTypedRuleContext(AttributesContext, 0) as AttributesContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_descriptives;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterDescriptives) {
      listener.enterDescriptives(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitDescriptives) {
      listener.exitDescriptives(this);
    }
  }
}

export class DimensionsContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public name(): NameContext {
    return this.getTypedRuleContext(NameContext, 0) as NameContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_dimensions;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterDimensions) {
      listener.enterDimensions(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitDimensions) {
      listener.exitDimensions(this);
    }
  }
}

export class NameContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public LETTER_list(): TerminalNode[] {
    return this.getTokens(DFMGrammarParser.LETTER);
  }
  public LETTER(i: number): TerminalNode {
    return this.getToken(DFMGrammarParser.LETTER, i);
  }
  public DIGIT_list(): TerminalNode[] {
    return this.getTokens(DFMGrammarParser.DIGIT);
  }
  public DIGIT(i: number): TerminalNode {
    return this.getToken(DFMGrammarParser.DIGIT, i);
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_name;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterName) {
      listener.enterName(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitName) {
      listener.exitName(this);
    }
  }
}

export class MeasuresContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public name_list(): NameContext[] {
    return this.getTypedRuleContexts(NameContext) as NameContext[];
  }
  public name(i: number): NameContext {
    return this.getTypedRuleContext(NameContext, i) as NameContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_measures;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterMeasures) {
      listener.enterMeasures(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitMeasures) {
      listener.exitMeasures(this);
    }
  }
}

export class AttributesContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public name_list(): NameContext[] {
    return this.getTypedRuleContexts(NameContext) as NameContext[];
  }
  public name(i: number): NameContext {
    return this.getTypedRuleContext(NameContext, i) as NameContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_attributes;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterAttributes) {
      listener.enterAttributes(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitAttributes) {
      listener.exitAttributes(this);
    }
  }
}
