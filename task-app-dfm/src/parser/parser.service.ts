import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';
import { BuildASTVisitor } from '../visitor/buildASTVisitor';
import { AstParsingError } from '../common/errors/ast-parsing.error';
import { AbstractElement } from '../models/ast/abstractElement';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';

@Injectable()
export class ParserService {
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
      throw new AstParsingError(parserErrors[0]);
    }
    return tree.accept(new BuildASTVisitor());
  }

  extractUniqueNamesFromAST(ast: AbstractElement[]): Set<string> {
    const uniqueNames = new Set<string>();
    let dimensions: DimensionElement[] = [];
    ast.forEach((element) => {
      uniqueNames.add(element.name);
      if (element instanceof FactElement) {
        element.descriptives.forEach((descriptive) => {
          uniqueNames.add(descriptive.toLowerCase());
        });
        element.measures.forEach((measure) => {
          uniqueNames.add(measure.toLowerCase());
        });
        dimensions = dimensions.concat(element.dimensions);
      } else if (element instanceof DimensionElement) {
        dimensions.push(element);
      }
    });
    dimensions.forEach((dimension) => {
      uniqueNames.add(dimension.name);
      dimension.hierarchies.forEach((hierarchy) => {
        let currentLevel = hierarchy.head;
        while (currentLevel) {
          uniqueNames.add(currentLevel.name.toLowerCase());
          currentLevel = currentLevel.nextLevel;
        }
      });
    });
    return uniqueNames;
  }
}
