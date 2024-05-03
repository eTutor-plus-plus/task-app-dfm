import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';

@Injectable()
export class ParserService {
  parse(input: string) {
    const inputStream = new CharStream(input);
    const lexer = new DFMGrammarLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new DFMGrammarParser(tokenStream);
    const tree = parser.input();
    return tree.toStringTree(parser.ruleNames, parser);
  }

  //now get the abstract syntax tree
  getAST(input: string) {
    const inputStream = new CharStream(input);
    const lexer = new DFMGrammarLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new DFMGrammarParser(tokenStream);
    const tree = parser.input();
    return tree;
  }
}
