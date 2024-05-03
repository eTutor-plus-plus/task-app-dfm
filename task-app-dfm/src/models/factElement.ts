import { AbstractElement } from './abstractElement';
import { ElementType } from './enums/elementType';

export class FactElement extends AbstractElement {
  descriptives: string[] = [];
  measures: string[] = [];

  constructor(name: string) {
    super(name, ElementType.FACT);
  }
}
