// Generated from DFMGrammar.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
  ATN,
  ATNDeserializer,
  CharStream,
  DecisionState,
  DFA,
  Lexer,
  LexerATNSimulator,
  RuleContext,
  PredictionContextCache,
  Token,
} from 'antlr4';
export default class DFMGrammarLexer extends Lexer {
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

  public static readonly channelNames: string[] = [
    'DEFAULT_TOKEN_CHANNEL',
    'HIDDEN',
  ];
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
  public static readonly modeNames: string[] = ['DEFAULT_MODE'];

  public static readonly ruleNames: string[] = [
    'T__0',
    'T__1',
    'T__2',
    'T__3',
    'T__4',
    'T__5',
    'T__6',
    'ID',
    'SIMPLE_CONNECTION',
    'CONVERGENCE',
    'MULTIPLE_CONNECTION',
    'SEPARATOR',
    'DIGIT',
    'LETTER',
    'WS',
  ];

  constructor(input: CharStream) {
    super(input);
    this._interp = new LexerATNSimulator(
      this,
      DFMGrammarLexer._ATN,
      DFMGrammarLexer.DecisionsToDFA,
      new PredictionContextCache(),
    );
  }

  public get grammarFileName(): string {
    return 'DFMGrammar.g4';
  }

  public get literalNames(): (string | null)[] {
    return DFMGrammarLexer.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return DFMGrammarLexer.symbolicNames;
  }
  public get ruleNames(): string[] {
    return DFMGrammarLexer.ruleNames;
  }

  public get serializedATN(): number[] {
    return DFMGrammarLexer._serializedATN;
  }

  public get channelNames(): string[] {
    return DFMGrammarLexer.channelNames;
  }

  public get modeNames(): string[] {
    return DFMGrammarLexer.modeNames;
  }

  public static readonly _serializedATN: number[] = [
    4, 0, 15, 91, 6, -1, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4,
    7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7,
    10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 1, 0, 1, 0, 1,
    0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3,
    1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1,
    4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7,
    1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1,
    13, 1, 13, 1, 14, 4, 14, 86, 8, 14, 11, 14, 12, 14, 87, 1, 14, 1, 14, 0, 0,
    15, 1, 1, 3, 2, 5, 3, 7, 4, 9, 5, 11, 6, 13, 7, 15, 8, 17, 9, 19, 10, 21,
    11, 23, 12, 25, 13, 27, 14, 29, 15, 1, 0, 3, 1, 0, 48, 57, 2, 0, 65, 90, 97,
    122, 3, 0, 9, 10, 13, 13, 32, 32, 91, 0, 1, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0,
    5, 1, 0, 0, 0, 0, 7, 1, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 11, 1, 0, 0, 0, 0, 13,
    1, 0, 0, 0, 0, 15, 1, 0, 0, 0, 0, 17, 1, 0, 0, 0, 0, 19, 1, 0, 0, 0, 0, 21,
    1, 0, 0, 0, 0, 23, 1, 0, 0, 0, 0, 25, 1, 0, 0, 0, 0, 27, 1, 0, 0, 0, 0, 29,
    1, 0, 0, 0, 1, 31, 1, 0, 0, 0, 3, 36, 1, 0, 0, 0, 5, 38, 1, 0, 0, 0, 7, 40,
    1, 0, 0, 0, 9, 50, 1, 0, 0, 0, 11, 64, 1, 0, 0, 0, 13, 66, 1, 0, 0, 0, 15,
    68, 1, 0, 0, 0, 17, 71, 1, 0, 0, 0, 19, 73, 1, 0, 0, 0, 21, 76, 1, 0, 0, 0,
    23, 78, 1, 0, 0, 0, 25, 80, 1, 0, 0, 0, 27, 82, 1, 0, 0, 0, 29, 85, 1, 0, 0,
    0, 31, 32, 5, 102, 0, 0, 32, 33, 5, 97, 0, 0, 33, 34, 5, 99, 0, 0, 34, 35,
    5, 116, 0, 0, 35, 2, 1, 0, 0, 0, 36, 37, 5, 123, 0, 0, 37, 4, 1, 0, 0, 0,
    38, 39, 5, 125, 0, 0, 39, 6, 1, 0, 0, 0, 40, 41, 5, 100, 0, 0, 41, 42, 5,
    105, 0, 0, 42, 43, 5, 109, 0, 0, 43, 44, 5, 101, 0, 0, 44, 45, 5, 110, 0, 0,
    45, 46, 5, 115, 0, 0, 46, 47, 5, 105, 0, 0, 47, 48, 5, 111, 0, 0, 48, 49, 5,
    110, 0, 0, 49, 8, 1, 0, 0, 0, 50, 51, 5, 123, 0, 0, 51, 52, 5, 100, 0, 0,
    52, 53, 5, 101, 0, 0, 53, 54, 5, 115, 0, 0, 54, 55, 5, 99, 0, 0, 55, 56, 5,
    114, 0, 0, 56, 57, 5, 105, 0, 0, 57, 58, 5, 112, 0, 0, 58, 59, 5, 116, 0, 0,
    59, 60, 5, 105, 0, 0, 60, 61, 5, 118, 0, 0, 61, 62, 5, 101, 0, 0, 62, 63, 5,
    125, 0, 0, 63, 10, 1, 0, 0, 0, 64, 65, 5, 40, 0, 0, 65, 12, 1, 0, 0, 0, 66,
    67, 5, 41, 0, 0, 67, 14, 1, 0, 0, 0, 68, 69, 3, 25, 12, 0, 69, 70, 3, 25,
    12, 0, 70, 16, 1, 0, 0, 0, 71, 72, 5, 45, 0, 0, 72, 18, 1, 0, 0, 0, 73, 74,
    5, 45, 0, 0, 74, 75, 5, 62, 0, 0, 75, 20, 1, 0, 0, 0, 76, 77, 5, 61, 0, 0,
    77, 22, 1, 0, 0, 0, 78, 79, 5, 59, 0, 0, 79, 24, 1, 0, 0, 0, 80, 81, 7, 0,
    0, 0, 81, 26, 1, 0, 0, 0, 82, 83, 7, 1, 0, 0, 83, 28, 1, 0, 0, 0, 84, 86, 7,
    2, 0, 0, 85, 84, 1, 0, 0, 0, 86, 87, 1, 0, 0, 0, 87, 85, 1, 0, 0, 0, 87, 88,
    1, 0, 0, 0, 88, 89, 1, 0, 0, 0, 89, 90, 6, 14, 0, 0, 90, 30, 1, 0, 0, 0, 2,
    0, 87, 1, 6, 0, 0,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!DFMGrammarLexer.__ATN) {
      DFMGrammarLexer.__ATN = new ATNDeserializer().deserialize(
        DFMGrammarLexer._serializedATN,
      );
    }

    return DFMGrammarLexer.__ATN;
  }

  static DecisionsToDFA = DFMGrammarLexer._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}