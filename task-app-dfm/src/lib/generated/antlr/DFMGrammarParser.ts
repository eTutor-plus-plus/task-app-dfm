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
import DFMGrammarVisitor from './DFMGrammarVisitor.js';

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
  public static readonly T__6 = 7;
  public static readonly ID = 8;
  public static readonly SIMPLE_CONNECTION = 9;
  public static readonly CONVERGENCE = 10;
  public static readonly MULTIPLE_CONNECTION = 11;
  public static readonly SEPARATOR = 12;
  public static readonly DIGIT = 13;
  public static readonly LETTER = 14;
  public static readonly WS = 15;
  public static readonly EOF = Token.EOF;
  public static readonly RULE_input = 0;
  public static readonly RULE_fact = 1;
  public static readonly RULE_factContent = 2;
  public static readonly RULE_dimension = 3;
  public static readonly RULE_descriptive = 4;
  public static readonly RULE_dimensionContent = 5;
  public static readonly RULE_hierarchy = 6;
  public static readonly RULE_level = 7;
  public static readonly RULE_connection = 8;
  public static readonly RULE_connectionType = 9;
  public static readonly RULE_factDimensionConnection = 10;
  public static readonly RULE_name = 11;
  public static readonly RULE_measure = 12;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'fact'",
    "'{'",
    "'}'",
    "'dimension'",
    "'{descriptive}'",
    "'('",
    "')'",
    null,
    "'-'",
    "'->'",
    "'='",
    "';'",
  ];
  public static readonly symbolicNames: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'ID',
    'SIMPLE_CONNECTION',
    'CONVERGENCE',
    'MULTIPLE_CONNECTION',
    'SEPARATOR',
    'DIGIT',
    'LETTER',
    'WS',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'input',
    'fact',
    'factContent',
    'dimension',
    'descriptive',
    'dimensionContent',
    'hierarchy',
    'level',
    'connection',
    'connectionType',
    'factDimensionConnection',
    'name',
    'measure',
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
  public input(): InputContext {
    let localctx: InputContext = new InputContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, DFMGrammarParser.RULE_input);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 29;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            this.state = 29;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case 1:
                {
                  this.state = 26;
                  this.fact();
                }
                break;
              case 4:
                {
                  this.state = 27;
                  this.dimension();
                }
                break;
              case 14:
                {
                  this.state = 28;
                  this.factDimensionConnection();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          this.state = 31;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while ((_la & ~0x1f) === 0 && ((1 << _la) & 16402) !== 0);
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
  public fact(): FactContext {
    let localctx: FactContext = new FactContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, DFMGrammarParser.RULE_fact);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 33;
        this.match(DFMGrammarParser.T__0);
        this.state = 34;
        this.name();
        this.state = 35;
        this.match(DFMGrammarParser.T__1);
        this.state = 36;
        this.factContent();
        this.state = 37;
        this.match(DFMGrammarParser.T__2);
        this.state = 38;
        this.match(DFMGrammarParser.SEPARATOR);
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
  public factContent(): FactContentContext {
    let localctx: FactContentContext = new FactContentContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 4, DFMGrammarParser.RULE_factContent);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 48;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 5 || _la === 14) {
          {
            {
              this.state = 42;
              this._errHandler.sync(this);
              switch (this._input.LA(1)) {
                case 14:
                  {
                    this.state = 40;
                    this.measure();
                  }
                  break;
                case 5:
                  {
                    this.state = 41;
                    this.descriptive();
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 44;
              this.match(DFMGrammarParser.SEPARATOR);
            }
          }
          this.state = 50;
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
  public dimension(): DimensionContext {
    let localctx: DimensionContext = new DimensionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 6, DFMGrammarParser.RULE_dimension);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 51;
        this.match(DFMGrammarParser.T__3);
        this.state = 52;
        this.name();
        this.state = 53;
        this.match(DFMGrammarParser.T__1);
        this.state = 54;
        this.dimensionContent();
        this.state = 55;
        this.match(DFMGrammarParser.T__2);
        this.state = 56;
        this.match(DFMGrammarParser.SEPARATOR);
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
  public descriptive(): DescriptiveContext {
    let localctx: DescriptiveContext = new DescriptiveContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 8, DFMGrammarParser.RULE_descriptive);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 58;
        this.match(DFMGrammarParser.T__4);
        this.state = 59;
        this.name();
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
  public dimensionContent(): DimensionContentContext {
    let localctx: DimensionContentContext = new DimensionContentContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 10, DFMGrammarParser.RULE_dimensionContent);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 62;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 61;
              this.hierarchy();
            }
          }
          this.state = 64;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === 6 || _la === 14);
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
  public hierarchy(): HierarchyContext {
    let localctx: HierarchyContext = new HierarchyContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 12, DFMGrammarParser.RULE_hierarchy);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 66;
        this.level();
        this.state = 72;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 67;
                this.connection();
                this.state = 68;
                this.level();
              }
            }
          }
          this.state = 74;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
        }
        this.state = 77;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 9) {
          {
            this.state = 75;
            this.match(DFMGrammarParser.SIMPLE_CONNECTION);
            this.state = 76;
            this.descriptive();
          }
        }

        this.state = 79;
        this.match(DFMGrammarParser.SEPARATOR);
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
  public level(): LevelContext {
    let localctx: LevelContext = new LevelContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, DFMGrammarParser.RULE_level);
    try {
      this.state = 86;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 14:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 81;
            this.name();
          }
          break;
        case 6:
          this.enterOuterAlt(localctx, 2);
          {
            {
              this.state = 82;
              this.match(DFMGrammarParser.T__5);
              this.state = 83;
              this.name();
              this.state = 84;
              this.match(DFMGrammarParser.T__6);
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
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
  public connection(): ConnectionContext {
    let localctx: ConnectionContext = new ConnectionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 16, DFMGrammarParser.RULE_connection);
    try {
      this.state = 93;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 6:
          this.enterOuterAlt(localctx, 1);
          {
            {
              this.state = 88;
              this.match(DFMGrammarParser.T__5);
            }
            this.state = 89;
            this.connectionType();
            {
              this.state = 90;
              this.match(DFMGrammarParser.T__6);
            }
          }
          break;
        case 9:
        case 10:
        case 11:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 92;
            this.connectionType();
          }
          break;
        default:
          throw new NoViableAltException(this);
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
  public connectionType(): ConnectionTypeContext {
    let localctx: ConnectionTypeContext = new ConnectionTypeContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 18, DFMGrammarParser.RULE_connectionType);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 95;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 3584) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
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
  public factDimensionConnection(): FactDimensionConnectionContext {
    let localctx: FactDimensionConnectionContext =
      new FactDimensionConnectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, DFMGrammarParser.RULE_factDimensionConnection);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 97;
        this.name();
        this.state = 98;
        this.match(DFMGrammarParser.SIMPLE_CONNECTION);
        this.state = 99;
        this.name();
        this.state = 100;
        this.match(DFMGrammarParser.SEPARATOR);
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
    this.enterRule(localctx, 22, DFMGrammarParser.RULE_name);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 102;
        this.match(DFMGrammarParser.LETTER);
        this.state = 106;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === 13 || _la === 14) {
          {
            {
              this.state = 103;
              _la = this._input.LA(1);
              if (!(_la === 13 || _la === 14)) {
                this._errHandler.recoverInline(this);
              } else {
                this._errHandler.reportMatch(this);
                this.consume();
              }
            }
          }
          this.state = 108;
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
  public measure(): MeasureContext {
    let localctx: MeasureContext = new MeasureContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 24, DFMGrammarParser.RULE_measure);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 109;
        this.name();
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
    4, 1, 15, 112, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2,
    11, 7, 11, 2, 12, 7, 12, 1, 0, 1, 0, 1, 0, 4, 0, 30, 8, 0, 11, 0, 12, 0, 31,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 3, 2, 43, 8, 2, 1, 2,
    1, 2, 5, 2, 47, 8, 2, 10, 2, 12, 2, 50, 9, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 5, 4, 5, 63, 8, 5, 11, 5, 12, 5, 64, 1, 6,
    1, 6, 1, 6, 1, 6, 5, 6, 71, 8, 6, 10, 6, 12, 6, 74, 9, 6, 1, 6, 1, 6, 3, 6,
    78, 8, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 3, 7, 87, 8, 7, 1, 8, 1,
    8, 1, 8, 1, 8, 1, 8, 3, 8, 94, 8, 8, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10,
    1, 10, 1, 11, 1, 11, 5, 11, 105, 8, 11, 10, 11, 12, 11, 108, 9, 11, 1, 12,
    1, 12, 1, 12, 0, 0, 13, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 0, 2,
    1, 0, 9, 11, 1, 0, 13, 14, 109, 0, 29, 1, 0, 0, 0, 2, 33, 1, 0, 0, 0, 4, 48,
    1, 0, 0, 0, 6, 51, 1, 0, 0, 0, 8, 58, 1, 0, 0, 0, 10, 62, 1, 0, 0, 0, 12,
    66, 1, 0, 0, 0, 14, 86, 1, 0, 0, 0, 16, 93, 1, 0, 0, 0, 18, 95, 1, 0, 0, 0,
    20, 97, 1, 0, 0, 0, 22, 102, 1, 0, 0, 0, 24, 109, 1, 0, 0, 0, 26, 30, 3, 2,
    1, 0, 27, 30, 3, 6, 3, 0, 28, 30, 3, 20, 10, 0, 29, 26, 1, 0, 0, 0, 29, 27,
    1, 0, 0, 0, 29, 28, 1, 0, 0, 0, 30, 31, 1, 0, 0, 0, 31, 29, 1, 0, 0, 0, 31,
    32, 1, 0, 0, 0, 32, 1, 1, 0, 0, 0, 33, 34, 5, 1, 0, 0, 34, 35, 3, 22, 11, 0,
    35, 36, 5, 2, 0, 0, 36, 37, 3, 4, 2, 0, 37, 38, 5, 3, 0, 0, 38, 39, 5, 12,
    0, 0, 39, 3, 1, 0, 0, 0, 40, 43, 3, 24, 12, 0, 41, 43, 3, 8, 4, 0, 42, 40,
    1, 0, 0, 0, 42, 41, 1, 0, 0, 0, 43, 44, 1, 0, 0, 0, 44, 45, 5, 12, 0, 0, 45,
    47, 1, 0, 0, 0, 46, 42, 1, 0, 0, 0, 47, 50, 1, 0, 0, 0, 48, 46, 1, 0, 0, 0,
    48, 49, 1, 0, 0, 0, 49, 5, 1, 0, 0, 0, 50, 48, 1, 0, 0, 0, 51, 52, 5, 4, 0,
    0, 52, 53, 3, 22, 11, 0, 53, 54, 5, 2, 0, 0, 54, 55, 3, 10, 5, 0, 55, 56, 5,
    3, 0, 0, 56, 57, 5, 12, 0, 0, 57, 7, 1, 0, 0, 0, 58, 59, 5, 5, 0, 0, 59, 60,
    3, 22, 11, 0, 60, 9, 1, 0, 0, 0, 61, 63, 3, 12, 6, 0, 62, 61, 1, 0, 0, 0,
    63, 64, 1, 0, 0, 0, 64, 62, 1, 0, 0, 0, 64, 65, 1, 0, 0, 0, 65, 11, 1, 0, 0,
    0, 66, 72, 3, 14, 7, 0, 67, 68, 3, 16, 8, 0, 68, 69, 3, 14, 7, 0, 69, 71, 1,
    0, 0, 0, 70, 67, 1, 0, 0, 0, 71, 74, 1, 0, 0, 0, 72, 70, 1, 0, 0, 0, 72, 73,
    1, 0, 0, 0, 73, 77, 1, 0, 0, 0, 74, 72, 1, 0, 0, 0, 75, 76, 5, 9, 0, 0, 76,
    78, 3, 8, 4, 0, 77, 75, 1, 0, 0, 0, 77, 78, 1, 0, 0, 0, 78, 79, 1, 0, 0, 0,
    79, 80, 5, 12, 0, 0, 80, 13, 1, 0, 0, 0, 81, 87, 3, 22, 11, 0, 82, 83, 5, 6,
    0, 0, 83, 84, 3, 22, 11, 0, 84, 85, 5, 7, 0, 0, 85, 87, 1, 0, 0, 0, 86, 81,
    1, 0, 0, 0, 86, 82, 1, 0, 0, 0, 87, 15, 1, 0, 0, 0, 88, 89, 5, 6, 0, 0, 89,
    90, 3, 18, 9, 0, 90, 91, 5, 7, 0, 0, 91, 94, 1, 0, 0, 0, 92, 94, 3, 18, 9,
    0, 93, 88, 1, 0, 0, 0, 93, 92, 1, 0, 0, 0, 94, 17, 1, 0, 0, 0, 95, 96, 7, 0,
    0, 0, 96, 19, 1, 0, 0, 0, 97, 98, 3, 22, 11, 0, 98, 99, 5, 9, 0, 0, 99, 100,
    3, 22, 11, 0, 100, 101, 5, 12, 0, 0, 101, 21, 1, 0, 0, 0, 102, 106, 5, 14,
    0, 0, 103, 105, 7, 1, 0, 0, 104, 103, 1, 0, 0, 0, 105, 108, 1, 0, 0, 0, 106,
    104, 1, 0, 0, 0, 106, 107, 1, 0, 0, 0, 107, 23, 1, 0, 0, 0, 108, 106, 1, 0,
    0, 0, 109, 110, 3, 22, 11, 0, 110, 25, 1, 0, 0, 0, 10, 29, 31, 42, 48, 64,
    72, 77, 86, 93, 106,
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

export class InputContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public fact_list(): FactContext[] {
    return this.getTypedRuleContexts(FactContext) as FactContext[];
  }
  public fact(i: number): FactContext {
    return this.getTypedRuleContext(FactContext, i) as FactContext;
  }
  public dimension_list(): DimensionContext[] {
    return this.getTypedRuleContexts(DimensionContext) as DimensionContext[];
  }
  public dimension(i: number): DimensionContext {
    return this.getTypedRuleContext(DimensionContext, i) as DimensionContext;
  }
  public factDimensionConnection_list(): FactDimensionConnectionContext[] {
    return this.getTypedRuleContexts(
      FactDimensionConnectionContext,
    ) as FactDimensionConnectionContext[];
  }
  public factDimensionConnection(i: number): FactDimensionConnectionContext {
    return this.getTypedRuleContext(
      FactDimensionConnectionContext,
      i,
    ) as FactDimensionConnectionContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_input;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterInput) {
      listener.enterInput(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitInput) {
      listener.exitInput(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitInput) {
      return visitor.visitInput(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
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
  public factContent(): FactContentContext {
    return this.getTypedRuleContext(
      FactContentContext,
      0,
    ) as FactContentContext;
  }
  public SEPARATOR(): TerminalNode {
    return this.getToken(DFMGrammarParser.SEPARATOR, 0);
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
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitFact) {
      return visitor.visitFact(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FactContentContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SEPARATOR_list(): TerminalNode[] {
    return this.getTokens(DFMGrammarParser.SEPARATOR);
  }
  public SEPARATOR(i: number): TerminalNode {
    return this.getToken(DFMGrammarParser.SEPARATOR, i);
  }
  public measure_list(): MeasureContext[] {
    return this.getTypedRuleContexts(MeasureContext) as MeasureContext[];
  }
  public measure(i: number): MeasureContext {
    return this.getTypedRuleContext(MeasureContext, i) as MeasureContext;
  }
  public descriptive_list(): DescriptiveContext[] {
    return this.getTypedRuleContexts(
      DescriptiveContext,
    ) as DescriptiveContext[];
  }
  public descriptive(i: number): DescriptiveContext {
    return this.getTypedRuleContext(
      DescriptiveContext,
      i,
    ) as DescriptiveContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_factContent;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterFactContent) {
      listener.enterFactContent(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitFactContent) {
      listener.exitFactContent(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitFactContent) {
      return visitor.visitFactContent(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DimensionContext extends ParserRuleContext {
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
  public dimensionContent(): DimensionContentContext {
    return this.getTypedRuleContext(
      DimensionContentContext,
      0,
    ) as DimensionContentContext;
  }
  public SEPARATOR(): TerminalNode {
    return this.getToken(DFMGrammarParser.SEPARATOR, 0);
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_dimension;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterDimension) {
      listener.enterDimension(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitDimension) {
      listener.exitDimension(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitDimension) {
      return visitor.visitDimension(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DescriptiveContext extends ParserRuleContext {
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
    return DFMGrammarParser.RULE_descriptive;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterDescriptive) {
      listener.enterDescriptive(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitDescriptive) {
      listener.exitDescriptive(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitDescriptive) {
      return visitor.visitDescriptive(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DimensionContentContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public hierarchy_list(): HierarchyContext[] {
    return this.getTypedRuleContexts(HierarchyContext) as HierarchyContext[];
  }
  public hierarchy(i: number): HierarchyContext {
    return this.getTypedRuleContext(HierarchyContext, i) as HierarchyContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_dimensionContent;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterDimensionContent) {
      listener.enterDimensionContent(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitDimensionContent) {
      listener.exitDimensionContent(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitDimensionContent) {
      return visitor.visitDimensionContent(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class HierarchyContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public level_list(): LevelContext[] {
    return this.getTypedRuleContexts(LevelContext) as LevelContext[];
  }
  public level(i: number): LevelContext {
    return this.getTypedRuleContext(LevelContext, i) as LevelContext;
  }
  public SEPARATOR(): TerminalNode {
    return this.getToken(DFMGrammarParser.SEPARATOR, 0);
  }
  public connection_list(): ConnectionContext[] {
    return this.getTypedRuleContexts(ConnectionContext) as ConnectionContext[];
  }
  public connection(i: number): ConnectionContext {
    return this.getTypedRuleContext(ConnectionContext, i) as ConnectionContext;
  }
  public SIMPLE_CONNECTION(): TerminalNode {
    return this.getToken(DFMGrammarParser.SIMPLE_CONNECTION, 0);
  }
  public descriptive(): DescriptiveContext {
    return this.getTypedRuleContext(
      DescriptiveContext,
      0,
    ) as DescriptiveContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_hierarchy;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterHierarchy) {
      listener.enterHierarchy(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitHierarchy) {
      listener.exitHierarchy(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitHierarchy) {
      return visitor.visitHierarchy(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LevelContext extends ParserRuleContext {
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
    return DFMGrammarParser.RULE_level;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterLevel) {
      listener.enterLevel(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitLevel) {
      listener.exitLevel(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitLevel) {
      return visitor.visitLevel(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConnectionContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public connectionType(): ConnectionTypeContext {
    return this.getTypedRuleContext(
      ConnectionTypeContext,
      0,
    ) as ConnectionTypeContext;
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_connection;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterConnection) {
      listener.enterConnection(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitConnection) {
      listener.exitConnection(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitConnection) {
      return visitor.visitConnection(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConnectionTypeContext extends ParserRuleContext {
  constructor(
    parser?: DFMGrammarParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SIMPLE_CONNECTION(): TerminalNode {
    return this.getToken(DFMGrammarParser.SIMPLE_CONNECTION, 0);
  }
  public MULTIPLE_CONNECTION(): TerminalNode {
    return this.getToken(DFMGrammarParser.MULTIPLE_CONNECTION, 0);
  }
  public CONVERGENCE(): TerminalNode {
    return this.getToken(DFMGrammarParser.CONVERGENCE, 0);
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_connectionType;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterConnectionType) {
      listener.enterConnectionType(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitConnectionType) {
      listener.exitConnectionType(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitConnectionType) {
      return visitor.visitConnectionType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FactDimensionConnectionContext extends ParserRuleContext {
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
  public SIMPLE_CONNECTION(): TerminalNode {
    return this.getToken(DFMGrammarParser.SIMPLE_CONNECTION, 0);
  }
  public SEPARATOR(): TerminalNode {
    return this.getToken(DFMGrammarParser.SEPARATOR, 0);
  }
  public get ruleIndex(): number {
    return DFMGrammarParser.RULE_factDimensionConnection;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterFactDimensionConnection) {
      listener.enterFactDimensionConnection(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitFactDimensionConnection) {
      listener.exitFactDimensionConnection(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitFactDimensionConnection) {
      return visitor.visitFactDimensionConnection(this);
    } else {
      return visitor.visitChildren(this);
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
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitName) {
      return visitor.visitName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MeasureContext extends ParserRuleContext {
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
    return DFMGrammarParser.RULE_measure;
  }
  public enterRule(listener: DFMGrammarListener): void {
    if (listener.enterMeasure) {
      listener.enterMeasure(this);
    }
  }
  public exitRule(listener: DFMGrammarListener): void {
    if (listener.exitMeasure) {
      listener.exitMeasure(this);
    }
  }
  // @Override
  public accept<Result>(visitor: DFMGrammarVisitor<Result>): Result {
    if (visitor.visitMeasure) {
      return visitor.visitMeasure(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
