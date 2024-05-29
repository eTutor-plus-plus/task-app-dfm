import { ElementType } from '../enums/elementType';

export abstract class AbstractElement {
  name: string;
  elementType: ElementType;

  constructor(name: string, elementType: ElementType) {
    this.name = name;
    this.elementType = elementType;
  }
}
