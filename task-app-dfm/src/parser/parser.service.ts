import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';
import { BuildASTVisitor } from '../visitor/buildASTVisitor';

@Injectable()
export class ParserService {
  //TODO: 1. Include the logic in the task service to create a task
  //TODO: 2. Check how to catch the error in the ASTVisitor and alter it depending on the submission type
  getAST(input: string) {
    const inputStream = new CharStream(input);
    const lexer = new DFMGrammarLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new DFMGrammarParser(tokenStream);
    const tree = parser.input();
    const abstractSyntaxTree = tree.accept(new BuildASTVisitor());
    return abstractSyntaxTree;
  }
}
