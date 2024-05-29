import { Level } from './level';
import { AbstractElement } from './abstractElement';
import { ElementType } from '../enums/elementType';

export class Hierarchy extends AbstractElement {
  head: Level = null;

  constructor(name: string) {
    super(name, ElementType.HIERARCHY);
  }
}
