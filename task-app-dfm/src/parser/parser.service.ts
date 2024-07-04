import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';
import { BuildASTVisitor } from '../visitor/buildASTVisitor';
import { AstParsingError } from '../common/errors/ast-parsing.error';

@Injectable()
export class ParserService {
  //TODO: 1. Include the logic in the task service to create a task
  //TODO: 2. Check how to catch the error in the ASTVisitor and alter it depending on the submission type
  getAST(input: string) {
    const inputStream = new CharStream(input);
    const lexer = new DFMGrammarLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new DFMGrammarParser(tokenStream);
    const parserErrors: string[] = [];
    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        parserErrors.push(
          `Syntax error at line ${line}:${column} at ${offendingSymbol.text} - ${msg}`,
        );
      },
    });
    const tree = parser.input();
    if (parserErrors.length > 0) {
      throw new AstParsingError(parserErrors[0]);
    }
    return tree.accept(new BuildASTVisitor());
  }
}
