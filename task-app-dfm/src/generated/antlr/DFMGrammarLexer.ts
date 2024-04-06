// Generated from DFMGrammar.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class DFMGrammarLexer extends Lexer {
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

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'fact:'", 
                                                            "'{'", "'}'", 
                                                            "'descriptives:'", 
                                                            "'dimensions:'", 
                                                            "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "ID", 
                                                             "DIGIT", "LETTER", 
                                                             "WS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "ID", "DIGIT", "LETTER", 
		"WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, DFMGrammarLexer._ATN, DFMGrammarLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "DFMGrammar.g4"; }

	public get literalNames(): (string | null)[] { return DFMGrammarLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return DFMGrammarLexer.symbolicNames; }
	public get ruleNames(): string[] { return DFMGrammarLexer.ruleNames; }

	public get serializedATN(): number[] { return DFMGrammarLexer._serializedATN; }

	public get channelNames(): string[] { return DFMGrammarLexer.channelNames; }

	public get modeNames(): string[] { return DFMGrammarLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,10,73,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,
	9,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,8,1,8,1,9,4,9,68,8,9,11,9,12,9,69,1,9,1,
	9,0,0,10,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,1,0,3,1,0,48,57,
	2,0,65,90,97,122,3,0,9,10,13,13,32,32,73,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,
	0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,
	17,1,0,0,0,0,19,1,0,0,0,1,21,1,0,0,0,3,27,1,0,0,0,5,29,1,0,0,0,7,31,1,0,
	0,0,9,45,1,0,0,0,11,57,1,0,0,0,13,59,1,0,0,0,15,62,1,0,0,0,17,64,1,0,0,
	0,19,67,1,0,0,0,21,22,5,102,0,0,22,23,5,97,0,0,23,24,5,99,0,0,24,25,5,116,
	0,0,25,26,5,58,0,0,26,2,1,0,0,0,27,28,5,123,0,0,28,4,1,0,0,0,29,30,5,125,
	0,0,30,6,1,0,0,0,31,32,5,100,0,0,32,33,5,101,0,0,33,34,5,115,0,0,34,35,
	5,99,0,0,35,36,5,114,0,0,36,37,5,105,0,0,37,38,5,112,0,0,38,39,5,116,0,
	0,39,40,5,105,0,0,40,41,5,118,0,0,41,42,5,101,0,0,42,43,5,115,0,0,43,44,
	5,58,0,0,44,8,1,0,0,0,45,46,5,100,0,0,46,47,5,105,0,0,47,48,5,109,0,0,48,
	49,5,101,0,0,49,50,5,110,0,0,50,51,5,115,0,0,51,52,5,105,0,0,52,53,5,111,
	0,0,53,54,5,110,0,0,54,55,5,115,0,0,55,56,5,58,0,0,56,10,1,0,0,0,57,58,
	5,44,0,0,58,12,1,0,0,0,59,60,3,15,7,0,60,61,3,15,7,0,61,14,1,0,0,0,62,63,
	7,0,0,0,63,16,1,0,0,0,64,65,7,1,0,0,65,18,1,0,0,0,66,68,7,2,0,0,67,66,1,
	0,0,0,68,69,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,71,1,0,0,0,71,72,6,9,
	0,0,72,20,1,0,0,0,2,0,69,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DFMGrammarLexer.__ATN) {
			DFMGrammarLexer.__ATN = new ATNDeserializer().deserialize(DFMGrammarLexer._serializedATN);
		}

		return DFMGrammarLexer.__ATN;
	}


	static DecisionsToDFA = DFMGrammarLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}