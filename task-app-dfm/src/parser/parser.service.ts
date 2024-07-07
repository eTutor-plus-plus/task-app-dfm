import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';
import { BuildASTVisitor } from '../visitor/buildASTVisitor';
import { AstParsingError } from '../common/errors/ast-parsing.error';
import { AbstractElement } from '../models/ast/abstractElement';

@Injectable()
export class ParserService {
  //TODO: 1. Include the logic in the task service when creating a task
  //TODO: 2. Check how to catch the error in the ASTVisitor and alter it depending on the submission type
  getAST(input: string): AbstractElement[] {
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
      //TODO: Run through the message handler service to generate the error message
      throw new AstParsingError(parserErrors[0]);
    }
    return tree.accept(new BuildASTVisitor());
  }

  extractUniqueNamesFromAST(ast: AbstractElement[]): Set<string> {
    const uniqueNames = new Set<string>();
    ast.forEach((element) => {
      uniqueNames.add(element.name);
      //TODO: Add the logic to extract all unique child names as well (descriptives, measures, etc.)
    });
    return uniqueNames;
  }
}
