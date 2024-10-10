import { Injectable } from '@nestjs/common';
import { CharStream, CommonTokenStream } from 'antlr4';
import DFMGrammarLexer from '../lib/generated/antlr/DFMGrammarLexer';
import DFMGrammarParser from '../lib/generated/antlr/DFMGrammarParser';
import { BuildASTVisitor } from '../visitor/buildASTVisitor';
import { AstParsingError } from '../common/errors/ast-parsing.error';
import { AbstractElement } from '../models/ast/abstractElement';
import { FactElement } from '../models/ast/factElement';
import { DimensionElement } from '../models/ast/dimensionElement';
import { I18nService } from 'nestjs-i18n';
import { Language } from '@prisma/client';

@Injectable()
export class ParserService {
  constructor(private readonly i18n: I18nService) {}

  getAST(input: string, lang: Language = 'EN'): AbstractElement[] {
    const inputStream = new CharStream(input);
    const lexer = new DFMGrammarLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new DFMGrammarParser(tokenStream);
    const parserErrors: string[] = [];
    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError: (recognizer, offendingSymbol, line, column, msg) => {
        const errorMsg = this.i18n.t('general.syntax-error.extended', {
          lang: lang.toLowerCase(),
          args: { line, column, offendingSymbol: offendingSymbol.text, msg },
        });
        parserErrors.push(errorMsg);
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
